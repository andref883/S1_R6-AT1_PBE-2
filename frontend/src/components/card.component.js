import { addToCart } from "../storage/cart";
import { showToast } from "../utils/toast.js";

export function criarCard(produto) {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
        <img src="${produto.imagem}" />
        <div class="card-content">
            <h3>${produto.nome}</h3>
            <p class="category">${produto.categoria}</p>
            <p class="description">${produto.descricao}</p>
            <div class="card-meta">
                <span class="price">R$ ${produto.preco}</span>
            </div>
            <div class="card-actions">
                <button class="btn-add">Adicionar ao carrinho</button>
                <button class="btn-buy">Comprar</button>
            </div>
        </div>
    `;

    div.querySelector(".btn-add").onclick = () => {
        addToCart(produto);
        showToast("Produto adicionado ao carrinho ");
    };

    div.querySelector(".btn-buy").onclick = () => {
        addToCart(produto);
        showToast("Produto adicionado ao carrinho ");
        location.hash = "#/carrinho";
    };

    return div;
}