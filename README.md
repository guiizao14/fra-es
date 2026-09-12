# Landing page — Kit Frações na Prática

Página de vendas em português do Brasil, pronta para hospedagem estática. O código publicado está em `dist/`; não exige instalação de dependências, banco de dados ou processo de build.

## Visualizar no computador

Na pasta do projeto, execute:

```powershell
node scripts/serve.mjs
```

Abra **http://127.0.0.1:4173**. Para encerrar, use `Ctrl+C` no terminal do servidor. A porta pode ser definida pela variável de ambiente `PORT`.

## Publicar gratuitamente

O pacote **release/kit-fracoes-landing-page.zip** contém apenas a página pública, com `index.html` na raiz. Os PDFs pagos e documentos de produção não entram no pacote.

Uma opção é **Cloudflare Pages**, no plano Free. A [documentação de preços](https://developers.cloudflare.com/pages/functions/pricing/) informa que requisições a arquivos estáticos são gratuitas e ilimitadas; este projeto não usa Functions. Documentação conferida em 11/09/2026.

1. Entre na sua conta Cloudflare e abra **Workers & Pages**.
2. Crie um projeto **Pages** pela opção de upload de arquivos / drag and drop.
3. Envie `release/kit-fracoes-landing-page.zip` ou a pasta `dist`.
4. Escolha o nome do projeto e publique. A plataforma fornece um endereço `pages.dev` com HTTPS; domínio próprio é opcional.
5. No endereço publicado, confira uma prévia e os dois botões de compra.

O [guia oficial de Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/) detalha esse fluxo. Escolha Pages, sem Functions ou Worker. Não envie a raiz inteira deste repositório: publique somente o conteúdo de `dist/`.

Não foi criado projeto externo nem realizada publicação nesta tarefa; a entrega é o pacote pronto para hospedar.

## Manutenção

- **Conteúdo e links:** `dist/index.html`.
- **Aparência e responsividade:** `dist/styles.css`.
- **Prévias ampliáveis e botão móvel:** `dist/app.js`.
- **Ofertas, preços e checkout complementar documentado:** `commercial.config.json`.
- **Imagens públicas:** `dist/assets/`.
- **Vídeo de demonstração:** `dist/assets/kit-demonstracao.mp4` (20 segundos, 960 × 720, sem áudio, aproximadamente 474 KB). Usa páginas reais e capas do produto; reprodução somente após ação do visitante, sem serviço externo.
- **Fonte do vídeo:** `scripts/create_demo.py`. Para refazer o vídeo são necessários Pillow e imageio-ffmpeg; isso não é necessário para executar ou hospedar a página.
- **Fontes e diferenças de caminhos:** `qa/FONTES.md`.
- **Resultado dos testes e observações de checkout:** `qa/VERIFICACAO.md`.

A página tem links e preços estáticos para continuar útil se o JavaScript falhar. Ao alterar preços ou checkouts, atualize o HTML e a configuração comercial juntos. Em seguida:

```powershell
node scripts/verify.mjs
python scripts/package.py
```

O verificador confere as duas ofertas, os links, a aritmética dos preços, as âncoras, os arquivos públicos e a ausência de PDFs na publicação. O empacotador recria o ZIP exclusivamente a partir de `dist/`.

## Conferência comercial

| Escolha | Preço do produto | Checkout |
|---|---:|---|
| Combo principal | R$27,90 | https://pay.cakto.com.br/38rum53_1101660 |
| Somente kit | R$19,90 | https://pay.cakto.com.br/i7456pd_1101401 |
| Planos avulsos — complemento, sem CTA na página | R$11,99 | https://pay.cakto.com.br/czf2pk6_1101780 |

O total dos produtos separados é R$31,89. O combo economiza R$3,99 e custa R$8,00 a mais que o kit.

Os valores internos dos três produtos foram ajustados no checkout para que o total no Pix corresponda ao valor divulgado: combo R$27,90, kit R$19,90 e planos R$11,99. A página comunica somente esses preços finais, sem aviso adicional de taxa.

O order bump **não apareceu na visualização pública do checkout do kit**. Seu link está documentado; a landing page não configura o bump na Cakto. Não foram alterados produtos nem efetuados pagamentos. A entrega dos arquivos após pagamento não foi testada por compra real.

O Master Context low ticket e `Links-de-checkout.md` não foram localizados. Os documentos e produtos encontrados foram inspecionados e estão mapeados em `qa/FONTES.md`. O brief recebido também termina em “Promessa central: a”; a redação foi construída somente a partir das informações completas fornecidas.

Os PDFs encontrados ainda exibem “v0.1 — revisão pedagógica pendente”. Eles foram preservados integralmente. A página não afirma revisão docente, teste em turma, resultados de aprendizagem garantidos, depoimentos ou certificação.
