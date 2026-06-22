import { getPedidos, getPedidoDetalhes } from "../api/api.js";

const statusConfig = {
  Aberto: { cor: "#5edf55c7", label: "Aberto" },
  Finalizado: { cor: "#f31111bc", label: "Finalizado" },
  Pendente: { cor: "#cec12ebd", label: "Pendente" },
};

const formatCurrency = (value) => {
  return Number(value || 0)
    .toFixed(2)
    .replace(".", ",");
};

export async function renderPedidos(root) {
  root.innerHTML = `
        <section class="page-heading">
            <div class="page-title">
                <span class="eyebrow">Pedidos</span>
                <h2>Seus pedidos realizados</h2>
                <p>Acompanhe o status de suas compras e veja os detalhes de cada pedido.</p>
            </div>
        </section>
        <section class="pedidos-list" id="lista"></section>
    `;

  const lista = document.getElementById("lista");
  const pedidos = await getPedidos();

  if (pedidos.length === 0) {
    lista.innerHTML =
      '<p class="empty-state">Você ainda não realizou nenhum pedido. Faça suas compras agora!</p>';
    return;
  }

  const pedidosDetalhados = await Promise.all(
    pedidos.map(async (pedido) => {
      const detalhe = await getPedidoDetalhes(pedido.id);
      return detalhe || pedido;
    }),
  );

  const pedidosValidos = pedidosDetalhados.filter((pedido) => {
    // Se o status do pedido não existir no 'statusConfig',
    // ele retorna false e o pedido NÃO vai para a tela.
    return statusConfig[pedido.status] !== undefined;
  });

  pedidosValidos.forEach((pedido) => {
    // Como já filtramos, sabemos que o status existe no config
    const statusInfo = statusConfig[pedido.status];

    const dataPedido = pedido.dataCad
      ? new Date(pedido.dataCad).toLocaleDateString("pt-BR")
      : "Data não disponível";

    const itemList = (pedido.itens || [])
      .map(
        (item) => `
<div class="pedido-item">
 <span>${item.nome}</span>
<span>${item.quantidade}x</span>
<span>R$ ${formatCurrency(item.valorUnitario)}</span>
<span>R$ ${formatCurrency(item.subtotal)}</span>
</div>
`,
      )
      .join("");

    const itemsMarkup =
      itemList.length > 0
        ? `
            <div class="pedido-items">
                <div class="pedido-item pedido-item-header">
                    <strong>Produto</strong>
                    <strong>Qtd</strong>
                    <strong>Unit.</strong>
                    <strong>Total</strong>
                </div>
                ${itemList}
            </div>
        `
        : '<p class="empty-state">Detalhes do pedido indisponíveis.</p>';

    const div = document.createElement("div");
    div.className = "pedido-card";
    div.innerHTML = `
            <div class="pedido-header">
                <div>
                    <h3>Pedido #${pedido.id}</h3>
                    <p class="pedido-data">${dataPedido}</p>
                </div>
                <span class="status-badge" style="background-color: ${statusInfo.cor}">
                    ${statusInfo.label}
                </span>
            </div>
            ${itemsMarkup}
            <div class="pedido-info">
                <div class="info-item">
                    <p class="label">Subtotal</p>
                    <p class="value">R$ ${formatCurrency(pedido.subtotal)}</p>
                </div>
            </div>
        `;

    lista.appendChild(div);
  });
}
