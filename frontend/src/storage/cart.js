const KEY = "carrinho";

// pegar carrinho
export function getCart() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

// salvar carrinho
export function saveCart(cart) {
    localStorage.setItem(KEY, JSON.stringify(cart));
}

// adicionar produto
export function addToCart(produto) {
    const cart = getCart();

    const existente = cart.find(p => p.id === produto.id);

    if (existente) {
        existente.qtd += 1;
    } else {
        cart.push({ ...produto, qtd: 1 });
    }

    saveCart(cart);
}