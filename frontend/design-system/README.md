# Design System

Documentação alinhada com a implementação atual do frontend.

## Visão geral

Este README lista os tokens, componentes e convenções que já existem no projeto. Ele foi ajustado para refletir os nomes e valores presentes em `frontend/src/style.css` e nas implementações em `frontend/src/components`.

## Tokens (presentes em `:root` em `frontend/src/style.css`)

- `--bg`: #f7f1e6
- `--surface`: #fff8f1
- `--surface-strong`: #fff5e9
- `--text`: #2a1f1a
- `--text-muted`: #5c4a42
- `--primary`: #5a0fda
- `--accent`: #d6a95f
- `--border`: rgba(103, 20, 10, 0.12)
- `--shadow`: 0 18px 40px rgba(0, 0, 0, 0.08)

Observações:
- Os nomes usam um esquema curto (`--primary`, `--accent`, etc.). Não existem ainda tokens semânticos adicionais como `--color-success` ou `--color-danger` no CSS atual.
- Não existem variáveis explícitas de tipografia (`--font-size-*`) ou espaçamento (`--space-*`) centralizadas; valores estão definidos diretamente no CSS.

## Tipografia

- Fonte base: Inter (import em `frontend/src/style.css`).

## Componentes e classes relevantes

- Card de produto: classes `.card`, `.card-content`, `.card-actions` — criado por `frontend/src/components/card.component.js`.
- Botões usados:
  - `.btn-primary` — botão principal (estilos globais em `style.css`).
  - `.btn-buy` — variante usada para ação "Comprar".
  - `.btn-add` — usado no card para "Adicionar ao carrinho" (classe aplicada no componente).
- Toast / Notificações:
  - Container: `.toast-container` (localização: `bottom: 22px; right: 22px` — inferior-direito).
  - Classes de estado: `.toast-success`, `.toast-error`.
  - Duração: 2800ms (implementado em `frontend/src/utils/toast.js`).

## Acessibilidade (atual)

- Links de navegação (`.site-nav a`) possuem estilos `:focus`. Nem todos os controles têm estilos de foco visíveis por padrão — recomenda-se revisar botões e inputs para garantir foco claro.

## Gaps identificados / recomendações

- Centralizar tokens de espaçamento e tipografia (`--space-*, --font-size-*`) para facilitar manutenção e consistência.
- Criar aliases semânticos para cores (ex.: `--color-success`, `--color-warning`, `--color-danger`) se for necessário suportar múltiplos estados (atualmente apenas `--accent` e `--primary` estão definidos).
- Normalizar nomes se preferir um padrão diferente (por exemplo, `--color-primary` em vez de `--primary`) — posso gerar um arquivo `design-tokens.css` com aliases para compatibilidade.

## Onde procurar

- Componentes: `frontend/src/components/`
- Estilos globais: `frontend/src/style.css`
- Toast util: `frontend/src/utils/toast.js 