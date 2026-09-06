/* Spotify katalogunu derleme anında çeker ve src/_data/katalog.json'a yazar.
 *
 * Neden derleme anında: sayfaya gömme (iframe) koymuyoruz — katalog kendi
 * tasarımımızla listeleniyor. Ziyaretçinin tarayıcısından Spotify'a istek
 * gitmiyor, üçüncü taraf çerezi düşmüyor.
 *
 * Çalışması için iki ortam değişkeni gerekir:
 *   SPOTIFY_CLIENT_ID  SPOTIFY_CLIENT_SECRET
 * (developer.spotify.com → Dashboard → uygulama oluştur.)
 * GitHub Actions'ta repo Secrets'a eklenir.
 *
 * Anahtar yoksa çıkış kodu 0 ile sessizce çıkar; mevcut katalog.json
 * korunur ve derleme devam eder.
 */
import { writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { ortamiYukle } from "./ortam.mjs";

ortamiYukle();

const CALMA_LISTESI = "1OnQcPOHG6KV5BIEu9BZIC"; // "Pist Projects"
const CIKTI = "src/_data/katalog.json";
const LISTE = "src/_data/parcalar.txt";

/* Spotify, Development Mode'daki uygulamalara çalma listesi içeriğini
   vermiyor. Denendi ve doğrulandı (6 Eylül 2026): listenin sahibi olan
   kullanıcı jetonuyla, playlist-read-private kapsamıyla bile
   /playlists/{id}/tracks → 403. Meta veriden de tracks alanı siliniyor.
   Tekil parça ucu (/tracks/{id}) ise açık — asıl yol o. */
const YOL_HARITASI =
  "403 — Spotify çalma listesi içeriğini bu uygulamaya vermiyor.\n" +
  "  Bu bir kod hatası değil, Development Mode kısıtı; sahiplik ve\n" +
  `  kapsam doğru olsa bile 403 dönüyor.\n` +
  `  ÇÖZÜM: ${LISTE} dosyasına parça bağlantılarını satır satır ekle.\n` +
  "  Ad, sanatçı, albüm, yıl ve süre yine Spotify'dan çekilir.";

const id = process.env.SPOTIFY_CLIENT_ID;
const gizli = process.env.SPOTIFY_CLIENT_SECRET;
const tazeleme = process.env.SPOTIFY_REFRESH_TOKEN;

if (!id || !gizli) {
  console.log("Spotify anahtarları tanımlı değil — katalog güncellenmedi.");
  process.exit(0);
}

/* İki akış destekleniyor:
 *
 *   1) SPOTIFY_REFRESH_TOKEN varsa → kullanıcı bağlamı (authorization code).
 *      ÇALMA LİSTESİ İÇİN GEREKEN BUDUR. Spotify'ın Development Mode kısıtı
 *      gereği /playlists/{id}/tracks yalnızca listenin sahibi ya da ortağı
 *      olan bir kullanıcı jetonuyla okunabiliyor.
 *      Tazeleme jetonunu almak için: npm run spotify-yetki
 *
 *   2) Yoksa → client credentials (uygulama bağlamı).
 *      Albüm/sanatçı gibi genel uçlar için yeterli ama çalma listesi
 *      parçalarında 403 döner. İleride kota modu değişirse diye duruyor.
 */
async function jeton() {
  const govde = tazeleme
    ? `grant_type=refresh_token&refresh_token=${encodeURIComponent(tazeleme)}`
    : "grant_type=client_credentials";

  const y = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${id}:${gizli}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: govde,
  });
  if (!y.ok) throw new Error(`jeton alınamadı: ${y.status} (${await y.text()})`);
  return (await y.json()).access_token;
}

async function parcalar(tok) {
  const hepsi = [];
  let url =
    `https://api.spotify.com/v1/playlists/${CALMA_LISTESI}/tracks` +
    `?limit=100&fields=next,items(added_at,track(name,duration_ms,external_urls,album(name,release_date,images),artists(name)))`;

  while (url) {
    const y = await fetch(url, { headers: { Authorization: `Bearer ${tok}` } });
    if (y.status === 403) {
      throw new Error(YOL_HARITASI);
    }
    if (!y.ok) throw new Error(`parça listesi alınamadı: ${y.status}`);
    const v = await y.json();
    for (const g of v.items || []) {
      const t = g.track;
      if (!t) continue;
      hepsi.push({
        ad: t.name,
        sanatcilar: (t.artists || []).map((a) => a.name).join(", "),
        album: t.album?.name || "",
        yil: (t.album?.release_date || "").slice(0, 4),
        sure: bicimle(t.duration_ms),
        kapak: t.album?.images?.at(-1)?.url || "",
        baglanti: t.external_urls?.spotify || "",
      });
    }
    url = v.next;
  }
  return hepsi;
}

function bicimle(ms) {
  const s = Math.round((ms || 0) / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/* parcalar.txt içindeki bağlantı/kimliklerden okur */
async function kimlikler() {
  if (!existsSync(LISTE)) return [];
  const ham = await readFile(LISTE, "utf8");
  return ham
    .split("\n")
    .map((r) => r.trim())
    .filter((r) => r && !r.startsWith("#"))
    .map((r) => {
      const m = r.match(/track[:/]([A-Za-z0-9]{22})/);
      return m ? m[1] : /^[A-Za-z0-9]{22}$/.test(r) ? r : null;
    })
    .filter(Boolean);
}

/* Her parçayı tek tek çözümler.
 * Çalma listesi ucu kapalı olduğu için asıl yol bu; tekil parça ucu açık. */
async function tekTek(tok, kimlikListesi) {
  const hepsi = [];
  for (const k of kimlikListesi) {
    const y = await fetch(`https://api.spotify.com/v1/tracks/${k}`, {
      headers: { Authorization: `Bearer ${tok}` },
    });
    if (!y.ok) {
      console.warn(`  ! ${k} alınamadı (${y.status}) — atlandı`);
      continue;
    }
    const t = await y.json();
    hepsi.push({
      ad: t.name,
      sanatcilar: (t.artists || []).map((a) => a.name).join(", "),
      album: t.album?.name || "",
      yil: (t.album?.release_date || "").slice(0, 4),
      sure: bicimle(t.duration_ms),
      kapak: t.album?.images?.at(-1)?.url || "",
      baglanti: t.external_urls?.spotify || "",
    });
  }
  return hepsi;
}

try {
  const tok = await jeton();
  const kl = await kimlikler();

  let liste;
  if (kl.length) {
    console.log(`${kl.length} parça çözümleniyor…`);
    liste = await tekTek(tok, kl);
  } else {
    /* parcalar.txt boşsa çalma listesini denemeye çalışır. Spotify bu ucu
       Development Mode'da kapattığı için bu yol şu an 403 veriyor —
       mesajı net tutuyoruz ki bir dahaki sefere kimse aynı yolu aramasın. */
    console.log(`${LISTE} boş — çalma listesi denenecek.`);
    liste = await parcalar(tok);
  }
  await writeFile(
    CIKTI,
    JSON.stringify({ guncelleme: new Date().toISOString().slice(0, 10), parcalar: liste }, null, 2) + "\n",
    "utf8"
  );
  console.log(`✅ ${liste.length} parça yazıldı → ${CIKTI}`);
} catch (e) {
  console.error("Spotify çekilemedi:", e.message);
  console.error("Mevcut katalog.json korundu, derleme devam ediyor.");
  process.exit(0);
}
