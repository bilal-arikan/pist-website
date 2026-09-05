/* Derlenmiş siteyi deponun köküne senkronlar.
 *
 * Neden: GitHub Pages şu an "deploy from a branch" modunda ve `pist`
 * dalının KÖKÜNÜ servis ediyor. Actions moduna geçmek repo ayarı
 * gerektiriyor ve erişim depo sahibinde. Bu betik o ayara ihtiyaç
 * duymadan yayın yapmayı sağlıyor.
 *
 * Sadece _site içinde ÜRETİLEN girdileri kökte değiştirir; kaynak
 * dosyalara (src/, scripts/, package.json…) dokunmaz.
 *
 * Kullanım:  npm run yayinla    (derler + senkronlar)
 */
import { readdir, rm, cp } from "node:fs/promises";
import { join } from "node:path";

const KAYNAK = "_site";
const KOK = ".";

const girdiler = await readdir(KAYNAK);
if (!girdiler.length) {
  console.error("⛔ _site boş. Önce `npm run build` çalıştır.");
  process.exit(1);
}

for (const ad of girdiler) {
  await rm(join(KOK, ad), { recursive: true, force: true });
  await cp(join(KAYNAK, ad), join(KOK, ad), { recursive: true });
  console.log(`  ${ad}`);
}

console.log(`\n✅ ${girdiler.length} girdi köke senkronlandı.`);
console.log("   Kökteki bu dosyalar ÜRETİLMİŞTİR — elle düzenleme, src/ altını düzenle.");
