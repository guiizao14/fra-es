# Verificação da landing page

Data: 11/09/2026. Ambiente: Windows, servidor local Node em `http://127.0.0.1:4173`, navegador Chromium do aplicativo. A versão entregue foi executada e inspecionada visual e funcionalmente.

## Resultado

- Página estática com 12 arquivos públicos, aproximadamente 949 KB no total, incluindo o vídeo; sem dependências de rede para fontes, imagens, vídeo ou scripts.
- Somente duas escolhas de compra: combo e kit. O combo é o primeiro no HTML e no celular; tem selo, destaque visual e botões primários.
- Links do combo e do kit clicados no navegador: abriram os produtos correspondentes nos valores finais divulgados.
- O checkout de planos avulsos permanece somente na configuração interna; não há terceiro card ou CTA.
- Contas verificadas: R$19,90 + R$11,99 = R$31,89; economia de R$3,99; diferença kit/combo de R$8,00.
- Quatro prévias reais abertas em janela de ampliação, com imagem carregada, título e identificação de página corretos.
- Fechamento da prévia pelo botão e pela tecla Escape. Retorno do foco ao link de origem e liberação da rolagem confirmados.
- Navegação do cabeçalho para ofertas e retorno ao início confirmados. FAQ abre e fecha.
- Botão de compra móvel aparece durante o conteúdo e fica oculto no início, nas ofertas e no rodapé.
- Sem rolagem horizontal em larguras de 320, 390, 768, 1024 e 1440 pixels. Conferência visual do desktop e do celular.
- Texto ampliado em 200% conferido no desktop e no celular. Corrigida a quebra de elementos e textos no celular; nova verificação sem transbordamento.
- Preferência por movimento reduzido respeitada.
- Com `app.js` bloqueado no navegador, os links, as prévias por endereço direto e o FAQ nativo continuam disponíveis. Script e configurações temporárias do navegador restaurados ao final.
- Nenhuma imagem quebrada identificada. Nenhum erro de console na inspeção inicial da página local. O bloqueio intencional de `app.js` foi apenas um teste de degradação.
- HTML em `pt-BR`, título e descrição próprios, um único H1, hierarquia de títulos, link para pular ao conteúdo, textos alternativos e foco visível.
- Sintaxe JavaScript conferida com `node --check`.
- `node scripts/verify.mjs` aprovado: preços, links, duas ofertas, arquivos, âncoras, IDs únicos e ausência de PDFs na pasta pública.
- SHA-256 dos quatro PDFs originais idênticos antes e depois da implementação.

## Revisão visual e vídeo solicitados

- Removida a marca da plataforma de todo o texto visível, inclusive FAQ; preservados os endereços técnicos dos checkouts.
- Após o ajuste dos valores internos no checkout, a página passou a mostrar somente os totais finais, sem aviso de taxa.
- Criada demonstração original de 20 segundos, 960 × 720, H.264, sem áudio. Seis cenas com capas e páginas reais dos produtos. Arquivo de aproximadamente 474 KB, com metadados no início para reprodução progressiva.
- Vídeo sem autoplay, `preload="none"`, reprodução inline no celular. Botão de reprodução, controles nativos durante o vídeo e opção de assistir novamente ao final; controles nativos também disponíveis se o JavaScript não carregar.
- Reprodução conferida no navegador: duração de 20 segundos, quadros 960 × 720, sem erro de mídia, avanço até 20 segundos e retorno do botão de reprodução.
- Decodificação completa do MP4 por FFmpeg sem erros. Servidor local responde a `Range: bytes=0-99` com HTTP 206, tipo `video/mp4` e 100 bytes.
- Nova seção com demonstração e destaque do complemento de R$8,00; números com cor de destaque, textos mais curtos e cartões de benefícios com fundos alternados. No celular, os cartões ficam em uma coluna para leitura confortável.
- Conferidos 320, 390, 768 e 1440 pixels e texto em 200% no celular, sem transbordamento horizontal.
- Novas capturas: `screenshots/desktop-video.png`, `screenshots/mobile-video.png`, `screenshots/mobile-destaques.png`.

## Checkouts confirmados para publicação

| Produto | Valor interno configurado | Total confirmado no Pix |
|---|---:|---:|
| Kit + 20 Planos | R$26,91 | R$27,90 |
| Somente kit | R$18,91 | R$19,90 |
| 20 Planos de Aula | R$11,00 | R$11,99 |

Os totais foram conferidos no checkout em Pix, sem preenchimento de dados pessoais, geração de Pix ou compra. Parcelamento é apresentado pelo checkout e não foi prometido na landing page.

O order bump não apareceu no checkout público do kit nesta conferência. O link complementar está documentado, mas não foi configurado na conta Cakto. A entrega posterior ao pagamento não foi validada por compra real.

## Registros visuais

- `screenshots/desktop-inicio.png`: primeiro bloco, versão final.
- `screenshots/desktop-completa.png`: página completa no desktop.
- `screenshots/desktop-ofertas.png`: comparação de preços e ofertas.
- `screenshots/mobile-inicio.png`: início em tela móvel.
- `screenshots/mobile-completa.png`: página completa no celular.
- `screenshots/mobile-ofertas.png`: combo exibido primeiro no celular.

As capturas finais foram feitas com movimento reduzido para estabilizar a navegação por âncoras. A configuração foi restaurada. O tamanho de tela também foi restaurado; a prévia local permanece disponível.

## Limites e pendências de origem

O arquivo de contexto low ticket / Master Context e `Links-de-checkout.md` não foram encontrados. A mensagem recebida termina em “Promessa central: a”. Essas lacunas foram comunicadas, e a implementação usa o restante do brief e os produtos efetivamente localizados, sem substituição silenciosa por conteúdo genérico.

Os PDFs encontrados ainda trazem o rodapé “v0.1 - revisão pedagógica pendente”. As notas de produção registram ausência de revisão independente por docente, impressão física e aplicação em turma. A landing page não afirma essas validações e não altera os produtos.

A hospedagem será executada a partir desta versão. O servidor local não publica os PDFs pagos. Não foi feita auditoria de checkout após pagamento nem teste em aparelho físico ou navegador Safari.
