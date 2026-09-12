# Fontes inspecionadas — 11/09/2026

O workspace `C:/Users/hsgui/OneDrive/Documentos/ChatGPT/landingpages` continha apenas um repositório Git vazio, sem commits, remotos ou arquivos de projeto. Nenhum `AGENTS.md` foi localizado na busca relevante.

Após procurar os nomes indicados, os materiais foram localizados em:

`C:/Users/hsgui/OneDrive/Documentos/trabalho/entregáveis fração/Kit-Fracoes-na-Pratica-4-e-5-ano/`

Nenhum arquivo original dessa pasta foi modificado. As imagens de capa usadas na página são cópias. As quatro prévias são renderizações de páginas reais dos PDFs, convertidas para WebP sem modificar seu conteúdo. Os PDFs completos ficam fora da pasta pública.

## Correspondência dos caminhos

| Arquivo solicitado | Local encontrado, relativo à pasta acima | Conferência |
|---|---|---|
| 01-Kit-Fracoes-na-Pratica.pdf | 01-Produto-base/01-Kit-Fracoes-na-Pratica.pdf | 72 páginas; texto inicial, orientações e páginas de exemplo inspecionados |
| 02-Kit-Impressao-PB.pdf | 01-Produto-base/02-Kit-Impressao-PB.pdf | 72 páginas; atividade da página 13 renderizada e conferida |
| 03-Consulta-2-por-folha.pdf | 01-Produto-base/03-Consulta-2-atividades-por-folha.pdf | 36 páginas; página 7 conferida com duas páginas do original |
| 01-20-Planos-de-Aula.pdf | 02-Planos-de-aula/01-20-Planos-de-Aula.pdf | 22 páginas; apresentação, organização e primeiro encontro conferidos |
| capa-checkout-kit-fracoes-300x250-final.png | 01-Produto-base/capa-checkout-kit-fracoes-300x250-final.png | Inspecionada visualmente; usada em dist/assets/kit.png |
| capa-checkout-combo-kit-planos-300x250.png | capa-checkout-combo-kit-planos-300x250.png | Inspecionada visualmente; usada em dist/assets/combo.png |
| capa-checkout-20-planos-300x250.png | 02-Planos-de-aula/capa-checkout-20-planos-300x250.png | Inspecionada visualmente; não publicada. A capa contém “1 mês de aulas”; a página usa a formulação precisa “planejamento sugerido para quatro semanas”. |
| Conferencia-de-producao.md | 00-Projeto-e-revisao/Conferencia-de-producao.md | Lido; confirma contagens e revisão visual digital |
| Indice-do-kit.md | 01-Produto-base/Indice-do-kit.md | Lido integralmente; usado para localizar as prévias |
| Links-de-checkout.md | Não localizado | Links e preços da mensagem do usuário usados como referência; ausência comunicada |
| Contexto low ticket / Master Context | Não localizado | Busca por nomes e por conteúdo nas pastas locais relevantes; ausência comunicada e caminho solicitado |

## Outros documentos lidos

- `00-Projeto-e-revisao/Decisoes-do-produto.md`: registro LOWTICKET que declara complementar, e não substituir, o Master Context. Foi lido como fonte adicional, sem tratá-lo como o arquivo ausente.
- `LEIA-ME.txt`: uso dos formatos e orientações de impressão.
- Início de `00-Projeto-e-revisao/Texto-editavel-kit.md`: conferência do texto da capa e do guia.

Os preços antigos, como R$14,90 para os planos, não foram usados. Prevalecem R$19,90, R$11,99 e R$27,90 do brief atual.

## Prévias públicas

- `assets/atividade.webp`: kit colorido, página 13 — A05, Metade, terça e quarta parte.
- `assets/tiras.webp`: kit colorido, página 37 — R01, Tiras de frações.
- `assets/jogo.webp`: kit colorido, página 48 — J01, Peças 1 a 6 do dominó de equivalências.
- `assets/plano.webp`: planos, página 3 — primeiro encontro, De onde vamos partir?

As prévias preservam inclusive o rodapé de versão dos documentos. As capas promocionais estão identificadas na página como ilustrações de um produto digital.

## Demonstração em vídeo

`dist/assets/kit-demonstracao.mp4` foi criado para a revisão da landing page. São 20 segundos de apresentação animada em seis cenas, com as capas e as mesmas quatro prévias reais já conferidas. Não contém filmagem em sala, depoimento, locução ou música de terceiros. Não simula uma aplicação pedagógica que não ocorreu.

A composição e as transições estão em `scripts/create_demo.py`; quadros de conferência em `qa/video/`. Os PDFs originais continuam intactos. O vídeo não traz preços, para evitar desatualização quando a oferta mudar.

## Integridade dos PDFs originais (SHA-256)

| Arquivo | SHA-256 |
|---|---|
| Kit colorido | a2d574859fff75c1df43d3040f3ad8b9a626766583f3b01d84a3ee76e2dc08d5 |
| Kit PB | d22b9d48a732dc259e483c421cbebc52284dc260334737fe1ca2af8e5a24446b |
| Consulta | ffc8bfa9c66759a621f6e88b581d37578a3c9ad5b418a924751ea8dbcaeb53e0 |
| Planos | 61efe5b20effa91fb7ca83df3103398a2321d46a232e230ec5477338bdd8389c |
