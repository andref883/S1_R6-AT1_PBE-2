import 'dotenv/config';
import express from 'express';
import routes from './routes/routes.js';
import { initializeDatabase } from './configs/Database.js';

const app = express();

// Middleware para receber JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Disponibiliza a pasta uploads publicamente
app.use('/uploads', express.static('uploads'));

// Rotas da aplicação
app.use('/', routes);

// Inicializa o banco e inicia o servidor
initializeDatabase()
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Servidor rodando na porta ${process.env.SERVER_PORT}`);
        });
    })
    .catch((err) => {
        console.error('Erro ao inicializar o banco de dados:', err);
    });