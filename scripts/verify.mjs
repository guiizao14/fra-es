import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const html = await readFile(resolve(dist, 'index.html'), 'utf8');
const config = JSON.parse(await readFile(resolve(root, 'commercial.config.json'), 'utf8'));
const { kit, combo, plans } = config.offers;
assert.equal(kit.priceCents + plans.priceCents, config.comparison.separateTotalCents);
assert.equal(kit.priceCents + plans.priceCents - combo.priceCents, config.comparison.savingsCents);
assert.equal(combo.priceCents - kit.priceCents, config.comparison.upgradeCents);
assert.deepEqual([...html.matchAll(/data-offer="([^"]+)"/g)].map(m => m[1]), ['combo', 'kit']);
const checkouts = [...html.matchAll(/data-checkout="([^"]+)" href="([^"]+)"/g)];
assert.equal(checkouts.length, 4);
for (const [, name, href] of checkouts) assert.equal(href, config.offers[name].checkout);
assert(!html.includes(plans.checkout), 'O complemento não deve ter CTA público.');
for (const value of ['27,90', '19,90', '11,99', '31,89', '3,99', '8,00']) assert(html.includes(value), `Preço ausente: ${value}`);
assert(!/quase R\$32|cronômetro|últimas vagas|só hoje|oferta termina|[0-9]+%\s*(de desconto|OFF)/i.test(html));
assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
assert(html.includes('<html lang="pt-BR">'));
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(ids.length, new Set(ids).size, 'IDs duplicados.');
for (const [, anchor] of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(anchor), `Âncora ausente: ${anchor}`);
assert(!/cakto|taxa de serviço|R\$0,99/i.test(html.replace(/<[^>]*>/g, '')), 'A landing deve comunicar preços finais, sem taxa adicional.');
assert(/<video\b[^>]*controls[^>]*preload="none"/.test(html), 'Vídeo deve ter controles e carregar sob demanda.');
assert(!/<video\b[^>]*autoplay/.test(html), 'Não reproduzir automaticamente.');
for (const [, asset] of html.matchAll(/(?:href|src|poster)="([^"#]+)"/g)) {
  if (/^(https?:|data:)/.test(asset)) continue;
  assert((await stat(resolve(dist, asset))).isFile(), `Asset ausente: ${asset}`);
}
async function list(folder) {
  const files = [];
  for (const item of await readdir(folder, { withFileTypes: true })) {
    const path = resolve(folder, item.name);
    if (item.isDirectory()) files.push(...await list(path)); else files.push(path);
  }
  return files;
}
const files = await list(dist);
assert(!files.some(f => /\.(pdf|md|py|zip)$/i.test(f)), 'Produto pago ou arquivo interno dentro da pasta pública.');
let total = 0;
for (const file of files) total += (await stat(file)).size;
assert(total < 1_000_000, 'Rever peso dos assets.');
console.log(`OK: 2 ofertas, 4 links de compra, preços e diferenças exatos, âncoras e assets válidos, nenhum PDF público. ${files.length} arquivos; ${(total / 1024).toFixed(0)} KB.`);
