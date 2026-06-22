import 'dotenv/config'
import routes from "./routes/routes.js";
import express from "express";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import { initializeDatabase } from './configs/Database.js';

const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Caminho completo do arquivo atual
const __filename = fileURLToPath(import.meta.url);
// Pasta do arquivo atual
const __dirname = path.dirname(__filename);

// aponta pra uploads (raiz) e mantém /uploads na URL
app.use(
  "/uploads",
  express.static(path.resolve("uploads"))
);
app.use('/' ,routes);

const PORT = process.env.SERVER_PORT || 8080;

initializeDatabase().then(
    ()=>{
        app.listen(PORT, '0.0.0.0' ,  ()=>{
            console.log(`Servidor rodando em: http://localhost:${8080}`)
        })

    }
).catch(err=>{
    console.error("Erro ao inicializar o servidor", err)
})

console.log(process.env.DB_HOST);
