import bodyParser from 'body-parser';
import express from 'express';
import { addRxPlugin, type RxDatabase, createRxDatabase } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';

import { todoRoutes } from './routes/todo.routes';
import { todoSchema } from './schemas/todo.schema';

const app = express();
app.use(bodyParser.json());

let rxDatabase: RxDatabase;

const prepareDatabase = async () => {
    addRxPlugin(RxDBDevModePlugin);

    rxDatabase = await createRxDatabase({
        name: 'todo-db',
        storage: getRxStorageMemory(),
    });

    await rxDatabase.addCollections({
        todos: {
            schema: todoSchema,
        },
    });

    // Set up initial data
    let id = 1;
    await rxDatabase.todos.insert({
        id: (id++).toString(),
        text: 'Write API Server for TODO application',
        completed: false,
    });

    await rxDatabase.todos.insert({
        id: (id++).toString(),
        text: 'Write Client Application for TODO application',
        completed: false,
    });

    await rxDatabase.todos.insert({
        id: (id++).toString(),
        text: 'Add Playwright tests to client',
        completed: false,
    });

    await rxDatabase.todos.insert({
        id: (id++).toString(),
        text: 'Profit!',
        completed: false,
    });
};

const startServer = () => {
    const port = 5000;

    process.stdout.write(`Starting server on port ${port}.\n`);
    app.use(express.json());

    // Make database available to routes.
    app.use((req, res, next) => {
        res.locals.rxDatabase = rxDatabase;
        next();
    });

    app.use(todoRoutes);

    app.listen(port, () => {
        process.stdout.write(`Server is running on port ${port}.\n`);
    });
};

(async () => {
    await prepareDatabase();

    startServer();
})();
