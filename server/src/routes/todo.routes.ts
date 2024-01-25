import express from 'express';
import { type RxDatabase } from 'rxdb';
import { TodoModel } from '../schemas/todo.schema';

export const todoRoutes = express.Router();

todoRoutes.get('/api/todos', async (req, res) => {
    const rxDatabase = res.locals.rxDatabase as RxDatabase;

    const todos = await rxDatabase.todos.find().exec();

    res.json(todos.map((i) => ({ id: parseInt(i.id, 10), text: i.text, completed: i.completed })));
});

todoRoutes.post('/api/todos', async (req, res) => {
    const rxDatabase = res.locals.rxDatabase as RxDatabase;

    const model = req.body as TodoModel;

    const todos = await rxDatabase.todos.find().exec();
    const maxId = todos.reduce((p, v) => Math.max(p, parseInt(v.id, 10)), 0);

    const newModel: TodoModel = {
        id: (maxId + 1).toString(),
        text: model.text,
        completed: false,
    };

    const document = await rxDatabase.todos.insert(newModel);
    res.json({ id: document.id, text: document.text, completed: document.completed });
});

todoRoutes.put('/api/todos/:id', async (req, res) => {
    const rxDatabase = res.locals.rxDatabase as RxDatabase;

    const model = req.body as TodoModel;
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id) || model.id.toString() !== id.toString()) {
        res.status(400).send('Bad data');
        return;
    }

    const dbModel = await rxDatabase.todos.findOne({ selector: { id: model.id.toString() } }).exec();

    if (dbModel == null) {
        res.status(404).send('Not found');
        return;
    }

    const result = await dbModel.patch({
        completed: model.completed,
    });

    res.json({ id: parseInt(result.id, 10), text: result.text, completed: result.completed });
});

todoRoutes.delete('/api/todos/:id', async (req, res) => {
    const rxDatabase = res.locals.rxDatabase as RxDatabase;

    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
        res.status(400).send('Bad data');
        return;
    }

    const dbModel = await rxDatabase.todos.findOne({ selector: { id: id.toString() } }).exec();

    if (dbModel == null) {
        res.status(404).send('Not found');
        return;
    }

    await dbModel.remove();

    res.status(410).send('OK');
});