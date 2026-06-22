# Frontend - TechNova

O site foi construído com Vite e JavaScript puro, consumindo uma API REST para produtos e pedidos.

## Funcionalidades

- **Página de Produtos**
  - Exibe uma vitrine de produtos em grid responsivo com cards visualmente destacados.
  - Cada card mostra: imagem do produto, nome, categoria, descrição e preço formatado em reais.
  - Requisição assíncrona ao endpoint `/produtos/detalhes` da API para carregar dados em tempo real.
  - Dois botões de ação por produto:
    - **Adicionar ao carrinho**: incrementa quantidade se já existe no carrinho ou adiciona novo item.
    - **Comprar**: adiciona ao carrinho e redireciona automaticamente para a página de checkout.

- **Carrinho**
  - Armazenamento persistente de itens usando `localStorage` do navegador (sobrevive a recarregamentos).
  - Exibição detalhada de cada item: quantidade, preço unitário, cálculo automático de subtotal.
  - Funcionalidade de incremento automático: ao adicionar um produto já no carrinho, incrementa a quantidade em 1.
  - Remoção individual de itens com confirmação visual via toast.
  - Cálculo automático e exibição do **total do pedido** somando (preço × quantidade) de todos os itens.
  - Validação de carrinho vazio: botão de checkout fica desabilitado e com mensagem informativa.
  - Limpeza automática do carrinho após sucesso no envio do pedido.
  - Sidebar com resumo da compra para fácil visualização do total.

- **Pedidos**
  - Lista completa dos pedidos realizados do cliente (ID fixo 27).
  - Requisição ao endpoint `/pedidos` para carregar pedidos com status.
  - Requisição individual a `/pedidos/{id}` para buscar detalhes expandidos de cada pedido.
  - Exibição de status com cores visuais:
    - **Aberto** (verde): pedido recém criado, aguardando processamento.
    - **Pendente** (amarelo): pedido em processamento.
    - **Finalizado** (vermelho): pedido entregue ou cancelado.
  - Tabela de itens para cada pedido: nome do produto, quantidade, valor unitário e subtotal.
  - Formatação de valores monetários em reais com separador de milhar.
  - Exibição de subtotal do pedido.
  - Mensagem informativa when carrinho está vazio: "Você ainda não realizou nenhum pedido".

- **Notificações (Toast)**
  - Mensagens contextualmente informativas que aparecem no canto da tela.
  - Tipos de notificações:
    - **Sucesso** (verde): produto adicionado, pedido enviado com sucesso.
    - **Erro** (vermelho): falha na conexão com API, pedido não enviado.
  - Duração padrão: 2.8 segundos, desaparecendo suavemente.

## Estrutura principal


## Design System

O Design System com tokens e padrões de componentes está disponível em `./design-system/README.md`.
- `index.html` - layout principal e navegação.
- `src/main.js` - roteador e inicialização da aplicação.
- `src/pages/produtos.js` - renderiza a página de produtos.
- `src/pages/carrinho.js` - renderiza o carrinho e controla o checkout.
- `src/pages/pedidos.js` - renderiza a lista de pedidos.
- `src/components/card.component.js` - cria os cards de produto.
- `src/api/api.js` - chamadas à API para produtos, pedidos e envio de pedidos.
- `src/storage/cart.js` - lógica de armazenamento do carrinho no `localStorage`.
- `src/utils/toast.js` - exibe notificações toast.
- `src/style.css` - estilos da aplicação.

## Como executar

1. **Instale as dependências**:

npm install

2. **Rode o servidor de desenvolvimento**:

npm run dev


Isso iniciará o Vite em modo de desenvolvimento com hot module replacement (HMR), permitindo edições em tempo real.

3. **Acesse o frontend**:

Abra o navegador no endereço exibido pelo Vite (normalmente `http://localhost:5173`).

4. **Build para produção** (opcional):

npm run build


Gera arquivos otimizados em `dist/` prontos para deployment.

## Dependências

- vite (^8.0.10) - Build tool e dev server com HMR, responsável por bundling e otimização.

## Tratamento de Erros

O frontend implementa tratamento de erros básico:

- Erro de conexão com API: Notificação toast de erro é exibida.
  - Exemplo: "Não foi possível enviar o pedido. Tente novamente."
- Produtos não carregam: Grid fica vazio, sem mensagem específica (melhoria futura).
- Carrinho vazio no checkout: Botão fica desabilitado com mensagem "Carrinho vazio".
- Falha no envio do pedido: Notificação de erro, carrinho não é limpo ao falhar.

## Observações importantes

- Configuração da API: A API está configurada em `src/api/api.js` com endereço hardcoded `http://localhost:8081`.
  - O backend deve estar rodando e acessível nesse endereço para que o frontend funcione corretamente.
  - Caso contrário, requisições falharão e notificações de erro serão exibidas.

- Cliente fixo: O `clienteId` usado no envio de pedidos está fixo como `27`. 
  - Isso significa que todos os pedidos são associados ao mesmo cliente.
  - Uma melhoria futura seria implementar login para permitir múltiplos clientes.

- Persistência: O carrinho é persistido no `localStorage` do navegador.
  - Os dados são salvos localmente e sobrevivem a recarregamentos e fechamento do navegador.
  - Limpar dados do navegador apagará o carrinho.

- Formatação de moeda: Valores monetários são exibidos em formato brasileiro (R$ X.XXX,XX).
  - Usa separador de milhar (ponto) e decimal (vírgula).

## Fluxo de uso típico

1. Usuário acessa a aplicação (rota `/`).
2. A página de produtos carrega automaticamente listando todos os itens da API.
3. Usuário clica em "Adicionar ao carrinho" ou "Comprar" em um produto.
4. Produto é adicionado/incrementado no carrinho (armazenado em `localStorage`).
5. Usuário pode navegar para o carrinho via barra de navegação.
6. No carrinho, usuário revisa itens, remove se necessário e clica em "Finalizar compra".
7. POST é enviado para `/pedidos` com a lista de itens.
8. Carrinho é limpo após sucesso.
9. Usuário pode visualizar pedidos navegando para "Pedidos".
10. Cada pedido mostra status e detalhes dos itens.
