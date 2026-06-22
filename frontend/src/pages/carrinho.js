import { getCart, saveCart } from "../storage/cart";
import { enviarPedido } from "../api/api";
import { showToast } from "../utils/toast.js";

const formatCurrency = (value) => Number(value || 0).toFixed(2).replace(".", ",");

export function renderCarrinho(root) {
    let cart = getCart();

    root.innerHTML = `
        <section class="page-heading">
            <div class="page-title">
                <span class="eyebrow">Carrinho</span>
                <h2>Resumo do pedido</h2>
                <p>Veja os itens escolhidos, quantidades e valores antes de finalizar a compra.</p>
            </div>
        </section>
        <div class="cart-layout">
            <div class="cart-list" id="lista"></div>
            <aside class="cart-summary">
                <div class="summary-card">
                    <h3>Resumo da compra</h3>
                    <p id="total"></p>
                    <button id="checkout" class="btn-primary">Checkout</button>
                </div>
            </aside>
        </div>
    `;

    const lista = document.getElementById("lista");
    const checkoutButton = document.getElementById("checkout");
    const totalLabel = document.getElementById("total");

    function updateCartDisplay() {
        cart = getCart();
        const total = cart.reduce((sum, item) => sum + item.preco * item.qtd, 0);

        lista.innerHTML = "";

        if (cart.length === 0) {
            lista.innerHTML = '<p>Seu carrinho está vazio. Adicione produtos na página de produtos.</p>';
            checkoutButton.disabled = true;
            checkoutButton.textContent = "Carrinho vazio";
            checkoutButton.classList.add("disabled");
        } else {
            cart.forEach((item, index) => {
                const div = document.createElement("div");
                div.className = "cart-item";
                div.innerHTML = `
                    <div class="cart-item-header">
                        <h3>${item.nome}</h3>
                        <button class="remove-button" type="button">Remover</button>
                    </div>
                    <div class="item-details">
                        <p>Quantidade: <strong>${item.qtd}</strong></p>
                        <p>Preço unitário: <strong>R$ ${formatCurrency(item.preco)}</strong></p>
                        <p>Subtotal: <strong>R$ ${formatCurrency(item.preco * item.qtd)}</strong></p>
                    </div>
                `;

                div.querySelector(".remove-button").onclick = () => {
                    cart.splice(index, 1);
                    saveCart(cart);
                    updateCartDisplay();
                    showToast("Item removido do carrinho", "success");
                };

                lista.appendChild(div);
            });

            checkoutButton.disabled = false;
            checkoutButton.textContent = "Finalizar compra";
            checkoutButton.classList.remove("disabled");
        }

        totalLabel.innerText = `Total: R$ ${formatCurrency(total)}`;
    }

    checkoutButton.onclick = async () => {
        cart = getCart();
        if (cart.length === 0) {
            return;
        }

        try {
            await enviarPedido(cart);
            saveCart([]);
            showToast("Pedido enviado com sucesso! ", "success");
            location.hash = "#/";
        } catch (error) {
            console.error(error);
            showToast("Não foi possível enviar o pedido. Tente novamente.", "error");
        }
    };

    updateCartDisplay();
}
