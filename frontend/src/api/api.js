const API_URL = "http://localhost:8081";

export async function getProdutos() {
    const res = await fetch(`${API_URL}/produtos/detalhes`);
    const data = await res.json();
    const produtos = Array.isArray(data) ? data : data?.result ?? [];

    return produtos.map(produto => ({
        id: produto.ProdutoId ?? produto.Id ?? produto.id,
        nome: produto.ProdutoNome ?? produto.Nome ?? produto.nome,
        preco: produto.Valor ?? produto.valor,
        imagem: produto.CaminhoImagem ?? produto.caminhoImagem ?? produto.imagem,
        categoria: produto.CategoriaNome ?? produto.categoriaNome ?? produto.Categoria ?? "",
        descricao: produto.Descricao ?? produto.descricao ?? "",
        dataCad: produto.ProdutoDataCad ?? produto.DataCad ?? produto.dataCad ?? ""
    }));
}

export async function enviarPedido(pedido) {
    await fetch(`${API_URL}/pedidos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            clienteId: 22,
            itens: pedido.map(item => ({
                produtoId: item.id,
                quantidade: item.qtd,
                valorItem: item.preco
            }))
        })
    });
}

export async function getPedidos() {
    const res = await fetch(`${API_URL}/pedidos`);
    const data = await res.json();
    const pedidos = Array.isArray(data) ? data : data?.result ?? [];

    return pedidos.map(pedido => ({
        id: pedido.Id ?? pedido.id,
        clienteId: pedido.ClienteId ?? pedido.clienteId,
        subtotal: pedido.SubTotal ?? pedido.Subtotal ?? pedido.subtotal,
        status: pedido.Status ?? pedido.status,
        dataCad: pedido.DataCad ?? pedido.dataCad
    }));
}

export async function getPedidoDetalhes(id) {
    const res = await fetch(`${API_URL}/pedidos/${id}`);
    const data = await res.json();

    if (!data) {
        return null;
    }

    return {
        id: data.pedido?.id,
        status: data.pedido?.status,
        subtotal: data.pedido?.subtotal,
        dataCad: data.pedido?.data,

        itens: (data.itens ?? []).map(item => ({
            idItem: item.idItem,

            nome: item.produto?.nome ?? "Item",

            quantidade: Number(item.quantidade ?? 0),

            valorUnitario: Number(
                item.valorItem ??
                item.produto?.valor ??
                0
            ),

            subtotal:
                Number(
                    item.valorItem ??
                    item.produto?.valor ??
                    0
                ) *
                Number(item.quantidade ?? 0)
        }))
    };

}
