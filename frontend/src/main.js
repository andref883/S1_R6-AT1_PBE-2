import './style.css'
import { renderProdutos } from './pages/produtos.js'
import { renderCarrinho } from './pages/carrinho.js'
import { renderPedidos } from './pages/pedidos.js'

const app = document.querySelector('#app');

function router() {
    const rota = location.hash || "#/";

    if (rota === "#/carrinho") {
        renderCarrinho(app);
    } else if (rota === "#/pedidos") {
        renderPedidos(app);
    } else {
        renderProdutos(app);
    }
}

window.addEventListener("hashchange", router);
router();