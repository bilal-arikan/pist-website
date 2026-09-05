# Pist Studio sitesi — devir belgesi

**Son güncelleme:** 6 Eylül 2026
**Dal:** `yeni-site` · **Canlı dal:** `pist` (dokunulmadı)

Bu belge yeni bir oturumun sıfırdan başlamadan devam edebilmesi için yazıldı.
Marka çalışmasının tamamı ayrı bir klasörde: `~/Desktop/Pist Studio Marka/`
(orada da bir `DEVAM.md` var — marka kararlarının gerekçeleri orada).

---

## 1. Hemen başlamak için

```bash
cd ~/Desktop/EXPORT/pist-website
git checkout yeni-site
npm install
npm run build          # _site/ üretir
```

Önizleme (UTF-8 başlığı gönderen sunucu — Türkçe karakterler için gerekli):

```bash
python3 "/Users/mac/Desktop/Pist Studio Marka/sunucu.py" 8794 "$(pwd)/_site"
```

Sonra: **http://127.0.0.1:8794/tr/**

> `python3 -m http.server` kullanma — charset göndermediği için Türkçe
> karakterler bozuk görünür.

---

## 2. Ne yapıldı

Eleventy 3 kurulumu, kaynak `src/`, çıktı `_site/`. Derleme ~0,3 saniye.

**Tamamlanan sayfalar (10, hepsi Türkçe):**

| URL | Dosya |
|---|---|
| `/tr/` | `src/tr/index.njk` — kalkış hero'su |
| `/tr/urunler/` | `src/tr/urunler.njk` |
| `/tr/ses/` | `src/tr/ses.njk` |
| `/tr/hakkinda/` | `src/tr/hakkinda.njk` |
| `/tr/blog/` | `src/tr/blog.njk` |
| `/tr/blog/<slug>/` | `src/blog/tr/*.md` — 3 yazı |
| `/tr/iletisim/` | `src/tr/iletisim.njk` |
| `/tr/aydinlatma-metni/` | `src/tr/yasal/aydinlatma-metni.md` |

**Kalkış sahnesi** (`src/assets/js/takeoff.js`): saf Canvas 2D, kütüphane yok.
Kamera yalnızca hero yüksekliği (400vh) boyunca yükseliyor; sonrasında sayfa
yıldız alanının üzerinde normal akıyor. Performans optimizasyonları içinde:
sprite önbelleği, kare başına trigonometri, DPR tavanı 1.5 (mobilde 1.25),
otomatik kalite kademeleri (kare süresi 23 ms'yi aşarsa iner).

---

## 3. Kilitlenmiş marka kararları

Hepsi `src/assets/css/pist.css` içindeki token'larda. Değiştirmek isteyen
oradan değiştirir; başka yerde renk kodu yazılmadı.

**Derinlik rampası** (eski Pist paletinden türetildi):
`#0B0616` → `#150A28` → `#241040` → `#3E1E53` → `#571055`

**Metin:** `#F2E9F6` · `#CFC6E4` (soft) · `#A99BC4` (dim) · `#6E6087` (faint)

**Tek arayüz vurgusu:** amber `#FFAA05` — gerçek pist kenar lambaları amberdir.

**İçerik skalası:** `#FFD62C` `#E4CDF1` `#9CE085` `#FFAA05` `#FF7816` `#FD605B` `#A684BD`

**Üç kural:**
1. Arayüz tek renk, içerik çok renk. Buton asla yeşil olmaz.
2. Bir öğe, bir renk. Projelio her yerde aynı renkle görünür.
3. Gradyan sadece Sound'da.

**Tipografi:**
- Başlık: **Archivo**, genişlik 110, ağırlık **400**
  (300 denendi; 80 pikselde optik olarak inceliyordu)
- Gövde: **Instrument Sans** 400
- Teknik katman: **Oxanium** 500 — yalnızca sayı, etiket, meta. Başlığa çıkarma.

**Simge:** `src/assets/img/simge.svg`. Burun konisi gövdeden ayrı; boşluk hem
"i" noktası hem kademe ayrımı. Ölçü sistemi:
`~/Desktop/Pist Studio Marka/simge/OLCULER.md`

---

## 4. Sırada ne var

1. **İngilizce sayfalar.** Yapı hazır (`src/en/`, `i18n.js` içinde `en` tanımlı).
   Metinlerin tamamı yazılı — bkz. bölüm 7.
2. **Kök `/` dil yönlendirmesi** — tarayıcı diline göre `/tr/` veya `/en/`,
   seçimi `localStorage`'da hatırla.
3. **404 sayfası** — tek sayfa, iki dil.
4. **Spotify betiği** — `scripts/fetch-spotify.mjs` (henüz yok).
   Çalma listesi: `1OnQcPOHG6KV5BIEu9BZIC` ("Pist Projects").
   Client credentials akışı, derleme anında JSON üretir, anahtar Secrets'ta.
5. **Form arka ucu** — Güzel Hosting'de PHP.
   `src/assets/js/form.js` içindeki `ENDPOINT` boş, doldurulacak.
6. **Eski URL yönlendirmeleri** — 20 eski sayfa için 301 haritası.
7. **Yayın** — bkz. bölüm 6.

---

## 5. Karar bekleyen konular

| # | Konu | Not |
|---|---|---|
| 1 | **Gerçek e-posta adresi** | `src/_data/site.js` içinde `info@piststudio.com` yazılı, teyit edilmedi. Alan adında Google Workspace kurulu. |
| 2 | **Aydınlatma metni** | 9 köşeli parantezli alan boş. **Avukat incelemesi şart.** Şirket unvanı henüz yok. |
| 3 | **Ana sayfa parlaklığı** | "Soluk" geri bildirimi üzerine 5 düzeltme yapıldı (commit `f0060f5`). Kullanıcı son kontrolü yapmadı. Hâlâ soluksa: başlık rengini saf beyaza yaklaştır, kalkış sahnesinin genel parlaklığını artır. |
| 4 | **Hero uzunluğu** | 400vh. Ayarlanabilir tek sayı: `src/assets/css/home.css` içinde `.hero{height:400vh}`. |

---

## 6. Yayın planı

Site şu anda **GitHub Pages**'te, `pist` dalının kökünden yayınlanıyor.
Alan adı `piststudio.com`, DNS **Squarespace Domains**'te, erişim **Bilal**'de.

`.github/workflows/deploy.yml` hazır ama **etkin değil**. Etkinleşmesi için:

**Adım 1 — Bilal yapacak.** Repo ayarlarında:
`Settings → Pages → Build and deployment → Source`
değerini *Deploy from a branch* yerine **GitHub Actions** yap.

> ⚠️ Bu ayar değişince site, workflow ilk kez çalışana kadar boşa düşer.
> O yüzden **önce workflow hazır olmalı**, sonra ayar değişmeli, hemen
> ardından workflow çalıştırılmalı. Kesinti bir iki dakikayla sınırlı kalır.

**Adım 2 — Biz yapacağız.** `yeni-site` dalını `pist`e merge edip push et.
Workflow `pist` dalına push'ta tetikleniyor.

**Geri dönüş:** eski site `pist` dalının geçmişinde duruyor
(commit `899304e`). Ayrıca yerel yedeği kullanıcıda.

### Alternatif (Bilal'e ihtiyaç duymayan)
Workflow'u, çıktıyı `pist` dalının köküne commit edecek şekilde değiştir.
Ayar değişikliği gerekmez, ama git geçmişi üretilen dosyalarla dolar.

---

## 7. İçerik nerede

**Bu repoda:**
- Türkçe sayfa metinleri — doğrudan `.njk` dosyalarında
- Blog yazıları — `src/blog/tr/*.md`

**Marka klasöründe** (`~/Desktop/Pist Studio Marka/`):
- `prototipler/07-icerik-ve-yapi.html` — **TR ve EN metinlerin tamamı**,
  URL haritası, her sayfanın meta bilgisi. İngilizce sayfaları yazarken
  buradan alınacak. Sağ üstteki düğmeyle dil değişiyor.
- `icerik/blog/*.md` — blog yazılarının kaynağı
- `icerik/hukuk/` — aydınlatma metni TR + EN
- `simge/` — dört SVG + ölçü sistemi
- `kaynak/Pist_Studio_Sirket_Hafizasi_v1_1.docx` — **marka kararlarının tek
  doğruluk kaynağı.** Yeni oturuma bunu da ver.

---

## 8. Bilinen durumlar

- **Eski site dosyaları hâlâ repoda** (`index.html`, `pages/`, `css/`, `js/`,
  `img/`, `videos/`). `pist` dalında canlı olduğu için silinmedi. Yeni site
  yayına girince temizlenecek.
- **`pages_DISABLED/` ve `pages/katilimcilar.html` silindi** (commit `899304e`,
  canlıya alındı). İlkinde başka bir stüdyonun ("Qube London") marka adı
  geçiyordu, ikincisi "gizli" olmasına rağmen herkese açıktı.
- **`robots.txt` eklendi**, sitemap henüz yok.
- Canonical `www.piststudio.com`'dan apex'e (`piststudio.com`) geçilmesi
  planlandı; Search Console'da yeni mülk eklenmeli.

---

## 9. Yeni oturuma verilecekler

1. Bu dosya
2. `~/Desktop/Pist Studio Marka/DEVAM.md`
3. `~/Desktop/Pist Studio Marka/kaynak/Pist_Studio_Sirket_Hafizasi_v1_1.docx`

Ve şu cümle yeter: *"pist-website deposunda `yeni-site` dalında kaldığımız
yerden devam ediyoruz, DEVAM.md'yi oku."*
