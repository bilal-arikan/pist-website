/* Tek seferlik Spotify yetkilendirmesi — tazeleme jetonu üretir.
 *
 * NEDEN GEREKLİ: Spotify'ın Development Mode kısıtı gereği
 * /playlists/{id}/tracks yalnızca listenin sahibi ya da ortağı olan bir
 * KULLANICI jetonuyla okunabiliyor. Uygulama jetonu (client credentials)
 * 403 döner. Bu betik bir kez çalışır, sonrasında tazeleme jetonu iş görür.
 *
 * ÖNCE: Spotify Dashboard → uygulaman → Settings → Redirect URIs'e
 *       http://127.0.0.1:8899/callback
 * ekle ve kaydet. (Loopback adresleri http olarak kabul ediliyor.)
 *
 * ÇALIŞTIR:
 *   SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... npm run spotify-yetki
 *
 * Yazdırdığı SPOTIFY_REFRESH_TOKEN değerini repo Secrets'a ekle.
 * Bu değer bir paroladır — kimseyle paylaşma, depoya yazma.
 */
import { createServer } from "node:http";
import { ortamiYukle } from "./ortam.mjs";

ortamiYukle();
import { randomBytes } from "node:crypto";

const id = process.env.SPOTIFY_CLIENT_ID;
const gizli = process.env.SPOTIFY_CLIENT_SECRET;
const PORT = 8899;
const DONUS = `http://127.0.0.1:${PORT}/callback`;
const KAPSAM = "playlist-read-private playlist-read-collaborative";

if (!id || !gizli) {
  console.error("SPOTIFY_CLIENT_ID ve SPOTIFY_CLIENT_SECRET tanımlı olmalı.");
  process.exit(1);
}

const durum = randomBytes(16).toString("hex");
const yetkiUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    client_id: id,
    response_type: "code",
    redirect_uri: DONUS,
    scope: KAPSAM,
    state: durum,
    show_dialog: "true",
  });

console.log("\nTarayıcında şu adresi aç ve izin ver:\n");
console.log("  " + yetkiUrl + "\n");
console.log(`(${DONUS} adresinin uygulamanın Redirect URIs listesinde olması gerekiyor.)\n`);

const sunucu = createServer(async (istek, yanit) => {
  const u = new URL(istek.url, `http://127.0.0.1:${PORT}`);
  if (u.pathname !== "/callback") { yanit.writeHead(404).end(); return; }

  const kod = u.searchParams.get("code");
  const gelenDurum = u.searchParams.get("state");
  const hata = u.searchParams.get("error");

  const bitir = (mesaj) => {
    yanit.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    yanit.end(`<body style="background:#0B0616;color:#F2E9F6;font:15px system-ui;display:grid;place-items:center;height:100vh;margin:0"><p>${mesaj}</p></body>`);
  };

  if (hata) { bitir("Yetki verilmedi: " + hata); sunucu.close(); process.exit(1); }
  if (gelenDurum !== durum) { bitir("State uyuşmadı — istek reddedildi."); sunucu.close(); process.exit(1); }

  try {
    const y = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${id}:${gizli}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: kod,
        redirect_uri: DONUS,
      }),
    });
    const j = await y.json();
    if (!j.refresh_token) throw new Error(JSON.stringify(j));

    bitir("Tamam. Terminale dönebilirsin.");
    console.log("\n✅ Tazeleme jetonu alındı. Repo Secrets'a şu adla ekle:\n");
    console.log("   SPOTIFY_REFRESH_TOKEN");
    console.log("   " + j.refresh_token + "\n");
    console.log("Bu bir paroladır — paylaşma, depoya yazma.\n");
    console.log("Yerelde denemek için:");
    console.log("   SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... \\");
    console.log("   SPOTIFY_REFRESH_TOKEN=... npm run spotify\n");
  } catch (e) {
    bitir("Jeton alınamadı.");
    console.error("Jeton alınamadı:", e.message);
  }
  sunucu.close();
  process.exit(0);
});

sunucu.listen(PORT, "127.0.0.1", () => console.log(`Yanıt bekleniyor: ${DONUS}\n`));
