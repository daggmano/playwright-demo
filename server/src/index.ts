import bodyParser from 'body-parser';
import express from 'express';

const app = express();
app.use(bodyParser.json());

const startServer = () => {
    const port = 5000;

    process.stdout.write(`Starting server on port ${port}.\n`);
    app.use(express.json());

    app.listen(port, () => {
        process.stdout.write(`Server is running on port ${port}.\n`);
    });
};

startServer();
