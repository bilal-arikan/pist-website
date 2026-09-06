/* .env dosyasını (varsa) process.env'e yükler. Bağımlılık yok.
 *
 * Amaç sürtünmeyi azaltmak: anahtarları her komutta elle yazmak yerine
 * depo kökündeki .env dosyasında tutuyoruz. .env .gitignore'da — depoya
 * girmez, yayına çıkmaz.
 *
 * Zaten tanımlı olan değişkenlerin üstüne YAZMAZ; CI'da GitHub Secrets
 * kazanır, yerelde .env devreye girer.
 */
import { readFileSync, existsSync } from "node:fs";

export function ortamiYukle(yol = ".env") {
  if (!existsSync(yol)) return false;
  for (const satir of readFileSync(yol, "utf8").split("\n")) {
    const s = satir.trim();
    if (!s || s.startsWith("#")) continue;
    const i = s.indexOf("=");
    if (i < 1) continue;
    const ad = s.slice(0, i).trim();
    let deger = s.slice(i + 1).trim();
    if (
      (deger.startsWith('"') && deger.endsWith('"')) ||
      (deger.startsWith("'") && deger.endsWith("'"))
    ) deger = deger.slice(1, -1);
    if (process.env[ad] === undefined) process.env[ad] = deger;
  }
  return true;
}
