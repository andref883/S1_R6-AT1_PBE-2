# TechNova E-commerce

Este repositório contém um sistema de e-commerce completo com backend em Node.js/Express e um frontend em Vite + JavaScript puro.

## Visão Geral do Projeto

O projeto permite:
- cadastro e gerenciamento de produtos com upload de imagens
- cadastro e gerenciamento de categorias
- cadastro e gerenciamento de clientes, telefones e endereços
- criação e consulta de pedidos com itens e status
- interface frontend responsiva para exibir produtos, carrinho e pedidos

## Estrutura do Repositório

- `src/` - backend Express
  - `src/server.js` - ponto de entrada do servidor
  - `src/routes/` - definição das rotas da API
  - `src/controllers/` - lógica de negócio
  - `src/repositories/` - acesso ao banco de dados
  - `src/models/` - representação das entidades
  - `src/configs/` - configuração de banco e upload de imagens
  - `src/middlewares/` - middlewares de upload e validações
  - `src/utils/` - funções utilitárias (CPF, limpeza de telefone)
- `frontend/` - interface do cliente
  - `frontend/src/` - código fonte do frontend
  - `frontend/src/components/` - componentes reutilizáveis
  - `frontend/src/api/` - chamadas à API REST
  - `frontend/design-system/` - documentação de design system do frontend
- `DOCS/` - documentação e script SQL
  - `DOCS/arquivo_bd.sql` - script de criação das tabelas do banco de dados

## Documentação Importante

- Backend: `src/DOCS/README.md`
- Frontend: `frontend/README.md`
- Design System do frontend: `frontend/design-system/README.md`

## Tecnologias

- Backend: Node.js, Express, MySQL2, Multer, dotenv, cors
- Frontend: Vite, JavaScript puro, CSS

## Como rodar o projeto

### 1. Instalar dependências do backend

```bash
npm install
```

### 2. Instalar dependências do frontend

```bash
cd frontend
npm install
cd ..
```

### 3. Configurar o banco de dados

1. Crie o banco de dados no MySQL.
2. Importe o script `DOCS/arquivo_bd.sql`.
3. Crie um arquivo `.env` na raiz com as variáveis abaixo:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=loja_ihs
DB_PORT=3306
SERVER_PORT=8081
```

### 4. Iniciar o backend

```bash
node src/server.js
```

### 5. Iniciar o frontend

```bash
cd frontend
npm run dev
```

### 6. Acessar a aplicação

Abra o navegador em `http://localhost:5173` e certifique-se de que o backend está rodando em `http://localhost:8081`.

## Endpoints principais

- `GET /categorias`
- `GET /produtos`
- `GET /produtos/detalhes`
- `POST /pedidos`
- `GET /pedidos`
- `POST /clientes`

O frontend consome a API em `http://localhost:8081`.

## Notas rápidas

- As imagens de produtos são salvas em `uploads/images/`.
- O frontend utiliza `localStorage` para persistência do carrinho.
- O cliente usado pelo frontend está fixo no ID `27` para demonstração.
- Para a interface, o frontend carrega produtos, permite adicionar ao carrinho e finalizar pedidos.

## Sugestões de melhoria

- implementar autenticação com login e JWT
- adicionar testes automatizados
- criar um script de inicialização no `package.json`
- padronizar tokens de design no CSS do frontend
