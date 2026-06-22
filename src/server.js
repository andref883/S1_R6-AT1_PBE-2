import 'dotenv/config';
import express from 'express';
import path from 'path';
import routes from './routes/routes.js';
import { initializeDatabase } from './configs/Database.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    '/uploads',
    express.static(path.join(process.cwd(), 'uploads'))
);

app.use('/', routes);

initializeDatabase()
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
        });
    })
    .catch((err) => {
        console.error('Erro ao inicializar o banco de dados:', err);
    });