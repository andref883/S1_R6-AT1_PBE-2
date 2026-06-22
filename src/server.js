import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import routes from './routes/routes.js';
import { initializeDatabase } from './configs/Database.js';

const app = express();

// Corrige caminhos para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Torna a pasta uploads pública
app.use(
    '/uploads',
    express.static(path.join(__dirname, '../uploads'))
);

// Rotas
app.use('/', routes);

// Inicializa banco e servidor
initializeDatabase()
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
            console.log(`Uploads: ${path.join(__dirname, '../uploads')}`);
        });
    })
    .catch((err) => {
        console.error('Erro ao inicializar o banco:', err);
    });