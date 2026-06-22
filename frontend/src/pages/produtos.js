import { getProdutos } from "../api/api.js";
import { criarCard } from "../components/card.component.js";

export async function renderProdutos(root) {
    root.innerHTML = `
        <section class="page-heading">
            <div class="page-title">
                <span class="eyebrow">Produtos</span>
                <h2>Escolha seus itens favoritos</h2>
                <p>Explore a vitrine de produtos com cartões visualmente destacados e navegação suave.</p>
            </div>
            <div class="categories-filter" id="categories-filter"></div>
        </section>
        <section class="cards-grid" id="grid"></section>
        <div class="pagination-container" id="pagination"></div>
    `;

    const grid = document.getElementById("grid");
    const categoriesFilter = document.getElementById("categories-filter");
    const pagination = document.getElementById("pagination");

    let produtos = [];
    try {
        produtos = await getProdutos();
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        grid.innerHTML = `<p class="empty-state">Erro ao carregar produtos. Tente novamente mais tarde.</p>`;
        return;
    }

    // Obter todas as categorias únicas de forma dinâmica e ordenar alfabeticamente
    const categorias = ["Todos", ...new Set(produtos.map(p => p.categoria).filter(Boolean))].sort((a, b) => {
        if (a === "Todos") return -1;
        if (b === "Todos") return 1;
        return a.localeCompare(b);
    });

    let activeCategory = "Todos";
    let currentPage = 1;
    const itemsPerPage = 8;

    function render() {
        // 1. Filtrar os produtos por categoria
        const filteredProdutos = activeCategory === "Todos"
            ? produtos
            : produtos.filter(p => p.categoria === activeCategory);

        // 2. Calcular paginação
        const totalPages = Math.ceil(filteredProdutos.length / itemsPerPage) || 1;
        
        // Garantir que a página atual está nos limites válidos caso o filtro reduza os itens
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        if (currentPage < 1) {
            currentPage = 1;
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedProdutos = filteredProdutos.slice(startIndex, startIndex + itemsPerPage);

        // 3. Renderizar o Grid de Produtos
        grid.innerHTML = "";
        if (paginatedProdutos.length === 0) {
            grid.innerHTML = `<p class="empty-state">Nenhum produto encontrado nesta categoria.</p>`;
        } else {
            paginatedProdutos.forEach(p => {
                grid.appendChild(criarCard(p));
            });
        }

        // 4. Renderizar os Filtros de Categoria
        categoriesFilter.innerHTML = "";
        categorias.forEach(cat => {
            const btn = document.createElement("button");
            btn.className = `category-pill ${cat === activeCategory ? "active" : ""}`;
            btn.textContent = cat;
            btn.onclick = () => {
                if (activeCategory !== cat) {
                    activeCategory = cat;
                    currentPage = 1;
                    render();
                }
            };
            categoriesFilter.appendChild(btn);
        });

        // 5. Renderizar Controles de Paginação
        pagination.innerHTML = "";
        
        // Só exibe paginação se houver produtos
        if (filteredProdutos.length > 0) {
            const btnPrev = document.createElement("button");
            btnPrev.className = "pagination-btn";
            btnPrev.textContent = "Anterior";
            btnPrev.disabled = currentPage === 1;
            btnPrev.onclick = () => {
                if (currentPage > 1) {
                    currentPage--;
                    render();
                    // Scroll suave para o topo da lista de produtos
                    document.querySelector(".page-heading").scrollIntoView({ behavior: "smooth" });
                }
            };

            const info = document.createElement("span");
            info.className = "pagination-info";
            info.textContent = `Página ${currentPage} de ${totalPages}`;

            const btnNext = document.createElement("button");
            btnNext.className = "pagination-btn";
            btnNext.textContent = "Próximo";
            btnNext.disabled = currentPage === totalPages;
            btnNext.onclick = () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    render();
                    // Scroll suave para o topo da lista de produtos
                    document.querySelector(".page-heading").scrollIntoView({ behavior: "smooth" });
                }
            };

            pagination.appendChild(btnPrev);
            pagination.appendChild(info);
            pagination.appendChild(btnNext);
        }
    }

    render();
}