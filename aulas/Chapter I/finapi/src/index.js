const { response, request } = require('express');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const { date_formatted_pt_br } = require('./utils');

const app = express();

app.use(express.json());

const customers = [];

function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers;

    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
        return response.status(400).json({ message: "Customer not found" });
    }

    request.customer = customer;

    return next();
}

function getBalance(statement) {
    return balance = statement.reduce((acc, statement) => {
        if (statement.type === "credit")
            return acc + statement.amount;

        return acc - statement.amount;
    }, 0)
}

app.post("/account", (request, response) => {
    const { cpf, name } = request.body;

    const customerAlreayExists = customers.some(customer => customer.cpf === cpf);

    if (customerAlreayExists) {
        return response.status(400).json({ error: "Customer Already Exists" });
    }

    const id = uuidv4();

    customer = {
        name,
        cpf,
        id,
        statement: []
    }

    customers.push(customer);

    response.status(201).json(customer);
});

app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    return response.json(customer.statement);
});

app.get("/statement/date", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    const { date } = request.query;

    const statement = customer.statement.filter(statement => {
        return date_formatted_pt_br(statement.created_at) === date;
    });

    return response.json(statement);
});

app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
    const { description, amount } = request.body;

    const { customer } = request;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    };

    customer.statement.push(statementOperation);

    return response.status(201).json(statementOperation);
});

app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    const { amount } = request.body;

    const balance = getBalance(customer.statement);

    if (amount > balance) {
        return response.status(400).json({ error: "Insufficient funds" });
    }

    if (amount <= 0) {
        return response.status(400).json({ error: "The withdrawal amount must be greater than zero" });
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit"
    };

    customer.statement.push(statementOperation);

    return response.status(201).json(statementOperation);
});

app.put("/account", verifyIfExistsAccountCPF, (request, response) => {
    const { name } = request.body;
    const { customer } = request;
 
    customer.name = name;

    return response.json(customer);
});

app.get("/account", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    return response.json(customer);
});

app.get("/accounts", (request, response) => {
    return response.json(customers);
});

app.delete("/account", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    customers.splice(customer, 1);

    response.json(customers);
});

app.get("/balance", verifyIfExistsAccountCPF, (request, response) => {
    const { customer} = request;

    const balance = getBalance(customer.statement);

    return response.json({ balance: balance })
});

app.listen(3333);