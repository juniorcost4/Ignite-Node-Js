const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checkIfAlreadyExistsUserAccount(request, response, next) {
  const { username } = request.body;

  const user = users.find(user => user.username === username);

  if (user) {
    return response.status(400).json({ error: "User already exists" });
  }

  next();
}

function checkExistsTodo(request, response, next) {
  const { id } = request.params;
  const { user } = request;

  const todoExists = user.todos.find(todo => todo.id === id);

  if (!todoExists) {
    return response.status(404).json({ error: "Todo not exists" });
  }

  next();
}

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find(user => user.username === username);

  if (!user) {
    return response.status(400).json({ error: "User not exists" });
  }

  request.user = user;

  next();
}

app.post('/users', checkIfAlreadyExistsUserAccount, (request, response) => {
  const { name, username } = request.body;
  
  const newUser = {
    id: uuidv4(),
    name,
    username,
    todos: []
  }

  users.push(newUser);

  return response.status(201).json(newUser);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { user } = request;

  const newTodo = { 
    id: uuidv4(),
    title,
    done: false, 
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(newTodo);

  return response.status(201).json(newTodo);
});

app.put('/todos/:id', checksExistsUserAccount, checkExistsTodo, (request, response) => {
  const { title, deadline } = request.body;
  const { id } = request.params;
  const { user } = request;

  let todoUpdated = {};

  const todosUpdated = user.todos.map(todo => {
    if (todo.id === id) {
      todoUpdated = {
        ...todo,
        title,
        deadline: new Date(deadline)
      }

      return todoUpdated;
    }

    return todo;
  });

  user.todos = todosUpdated;

  return response.json(todoUpdated);
});

app.patch('/todos/:id/done', checksExistsUserAccount, checkExistsTodo, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  let todoUpdated = {};

  const todosUpdated = user.todos.map(todo => {
    if (todo.id === id) {
      todoUpdated = {
        ...todo,
        done: true
      }

      return todoUpdated;
    }

    return todo;
  });

  user.todos = todosUpdated;

  return response.json(todoUpdated);
});

app.delete('/todos/:id', checksExistsUserAccount, checkExistsTodo, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const todo = user.todos.find(todo => todo.id === id);

  user.todos.splice(todo, 1);

  return response.status(204).send();
});

module.exports = app;