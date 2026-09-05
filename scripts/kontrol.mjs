/* Yayın öncesi kontrol — derlenmiş çıktıyı tarar.
 *
 * Tek amacı var: doldurulmamış hukuk metninin kazara canlıya çıkmasını
 * engellemek. Aydınlatma metninde [ŞİRKET UNVANI] gibi köşeli parantezli
 * alanlar var ve bunlar avukat + şirket unvanı gelmeden dolamıyor.
 *
 * Yerelde derlemeyi engellemez; sadece `npm run kontrol` çağrıldığında ve
 * dağıtım workflow'unda çalışır. Bilerek yayına çıkmak istenirse:
 *   IZIN_VER_YER_TUTUCU=1 npm run kontrol
 */
import { readdir, readFile } from "node:fs/promises";
import { join, extname } from "node:path";

const KOK = "_site";
// Büyük harfli, köşeli parantezli alan: [ŞİRKET UNVANI], [LEGAL ENTITY NAME]…
// Markdown bağlantıları ([metin](url)) küçük harfli olduğu için yakalanmıyor.
const YER_TUTUCU = /\[[A-ZÇĞİÖŞÜ][A-ZÇĞİÖŞÜ0-9 ./'’-]{3,}\]/g;
// Satıra bölünmüş alanları da yakalamak için boşlukları tek boşluğa indiriyoruz
// ([ANALİTİK ARACI\nKULLANILIYORSA…] kaynakta iki satır).
const sadelestir = (m) => m.replace(/\s+/g, " ");

async function* dosyalar(dizin) {
  for (const g of await readdir(dizin, { withFileTypes: true })) {
    const yol = join(dizin, g.name);
    if (g.isDirectory()) yield* dosyalar(yol);
    else if (extname(g.name) === ".html") yield yol;
  }
}

const bulgular = [];
for await (const yol of dosyalar(KOK)) {
  const metin = await readFile(yol, "utf8");
  const eslesme = sadelestir(metin).match(YER_TUTUCU);
  if (eslesme) bulgular.push([yol, [...new Set(eslesme)]]);
}

if (!bulgular.length) {
  console.log("✅ Doldurulmamış alan yok.");
  process.exit(0);
}

console.error("\n⛔ Doldurulmamış alanlar bulundu — bunlar canlıya çıkmamalı:\n");
for (const [yol, alanlar] of bulgular) {
  console.error(`   ${yol}`);
  for (const a of alanlar) console.error(`      ${a}`);
}
console.error("\n   Kaynak: src/tr/yasal/aydinlatma-metni.md · src/en/legal/privacy.md");
console.error("   Bilerek yayınlamak için: IZIN_VER_YER_TUTUCU=1\n");

process.exit(process.env.IZIN_VER_YER_TUTUCU === "1" ? 0 : 1);
