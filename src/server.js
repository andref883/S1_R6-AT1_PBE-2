import 'dotenv/config';
import routes from "./routes/routes.js";
import express from "express";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Caminho completo do arquivo atual
const __filename = fileURLToPath(import.meta.url);

// Pasta do arquivo atual
const __dirname = path.dirname(__filename);

// Arquivos estáticos
app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "uploads"))
);

// Rotas
app.use('/', routes);

// Porta para deploy ou ambiente local
const PORT = process.env.PORT || process.env.SERVER_PORT || 8080;

// Inicialização do servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
});

console.log(`DB_HOST conectado: ${process.env.DB_HOST}`);