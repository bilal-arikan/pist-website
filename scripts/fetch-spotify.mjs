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
import { writeFile } from "node:fs/promises";

const CALMA_LISTESI = "1OnQcPOHG6KV5BIEu9BZIC"; // "Pist Projects"
const CIKTI = "src/_data/katalog.json";

const id = process.env.SPOTIFY_CLIENT_ID;
const gizli = process.env.SPOTIFY_CLIENT_SECRET;

if (!id || !gizli) {
  console.log("Spotify anahtarları tanımlı değil — katalog güncellenmedi.");
  process.exit(0);
}

async function jeton() {
  const y = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${id}:${gizli}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!y.ok) throw new Error(`jeton alınamadı: ${y.status}`);
  return (await y.json()).access_token;
}

async function parcalar(tok) {
  const hepsi = [];
  let url =
    `https://api.spotify.com/v1/playlists/${CALMA_LISTESI}/tracks` +
    `?limit=100&fields=next,items(added_at,track(name,duration_ms,external_urls,album(name,release_date,images),artists(name)))`;

  while (url) {
    const y = await fetch(url, { headers: { Authorization: `Bearer ${tok}` } });
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

try {
  const liste = await parcalar(await jeton());
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
