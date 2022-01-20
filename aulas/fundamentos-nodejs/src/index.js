const { response } = require('express');
const express = require('express');

const app = express();

app.use(express.json);

/**
 * GET - buscar uma informacao
 * POST - salvar uma informacao
 * PUT - alterar uma informacao
 * PATCH -alterar uma informacao especifica
 * DELETE - deletar uma informacao
 */

/**
 * Tipos de parametros:
 * 
 * Route Params => identificar um rescurso editar/buscar/deletar
 * Query Params => Paginacao / Filtro (exemplo: /courses?name=matematica?page=1)
 * Body Params => Objetos insercao / alteracao
 */

app.get('/courses', (resquest, response) => {
    const query = resquest.query;
    console.log(query);
    return response.json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.post('/courses', (request, response) => {
    const body = request.body;
    console.log(body);
    return response.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"]);
});

app.put('/courses/:id', (request, response) => {
    const params = request.params;
    console.log(params);
    return response.json(["Curso 1", "Curso 2", "Curso 8", "Curso 4"]);
});

app.patch('/courses/:id', () => {
    return response.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"]);
});

app.delete('/courses/:id', (request, response) => {
    return response.json(["Curso 1", "Curso 2", "Curso 4"]);
});

app.listen(3333);