# Pist Studio sitesi — devir belgesi

**Son güncelleme:** 6 Eylül 2026 (2. oturum)
**Dal:** `yeni-site` (geliştirme) · **Canlı dal:** `pist`
**Durum:** 🟢 Yeni site 6 Eylül 2026'da yayına alındı — https://www.piststudio.com/

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

**Tamamlanan sayfalar (20, iki dil):**

| Rol | Türkçe | English |
|---|---|---|
| Kök (dil yönlendirmesi) | `/` | `/` |
| Ana sayfa | `/tr/` | `/en/` |
| Products | `/tr/urunler/` | `/en/products/` |
| Sound | `/tr/ses/` | `/en/sound/` |
| Hakkında | `/tr/hakkinda/` | `/en/about/` |
| Blog | `/tr/blog/` | `/en/blog/` |
| Yazı | 3 yazı | 1 yazı (canvas) |
| İletişim | `/tr/iletisim/` | `/en/contact/` |
| Aydınlatma / Privacy | `/tr/aydinlatma-metni/` | `/en/privacy/` |
| 404 | `/404.html` (tek sayfa, iki dil) | ← aynı |
| sitemap | `/sitemap.xml` (18 URL) | ← aynı |

Blog yazılarının üçü de Türkçe yazıldı; yalnızca **canvas yazısı** İngilizceye
çevrildi. Gerekçe içerik notunda: organik trafik Türkiye'den gelecek, teknik
yazının ise uluslararası arama karşılığı var.

**Kök `/`** tarayıcı diline bakıp `/tr/` ya da `/en/`'e yönlendiriyor; elle
yapılan dil seçimi `localStorage`'da (`pist-dil`) hatırlanıyor. Sayfa `noindex`,
JS kapalıysa iki dile de bağlantı veriyor.

**Eski URL'ler:** 18 eski sayfadan gerçek karşılığı olan 6'sı meta-refresh
saplamasıyla yönlendiriliyor (`src/_data/yonlendirmeler.js`). Kalan 12'si —
kapanan stüdyonun etkinlik ve eğitim sayfaları — bilerek 404'e düşüyor.

### Ana sayfa mimarisi — panel sistemi

Ana sayfa **görsel olarak kaymaz.** Tasarımın en güçlü yanı bu ve prototipten
(`prototipler/01-pistten-kalkis.html`) birebir taşındı.

- `.hero` **700vh** — yalnızca **scroll mesafesi** sağlar, içinde görünen bir şey yok.
  Kalkışın ritmini ayarlayan tek sayı budur; büyütmek geçişleri yavaşlatır.
- `.stage` `position:fixed` — görünen her şey burada.
- İçinde dört `.panel`, her birinin `data-from` / `data-to` aralığı var
  (0–1 scroll ilerlemesi): hero → Products → Sound → kapanış.
- Scroll kamerayı yükseltirken paneller **aynı yerde** çapraz geçişle değişir.
- `takeoff.js` içindeki `panelsUpdate()` bunu sürer: smoothstep giriş/çıkış,
  artı aralık ortasına göre hafif dikey kayma.

> Panel aralığı değiştirmek istersen markup'taki `data-from`/`data-to`
> yeter; JS'e dokunmaya gerek yok. Kapsama ölçüldü — 0–1 aralığında
> ekran hiçbir noktada boş kalmıyor.

**Ana sayfada ayrı footer yoktur.** Akışta bir şey kalsaydı sayfa kayardı;
footer bağlantıları son panelin içinde. `base.njk`'deki `noFooter` bayrağı
bunu yönetiyor, diğer sayfalar footer'ını koruyor.

**Üst çubuk tam genişliktedir** (`.topbar .inner{max-width:none}`). İçerik
sütunu `--maxw:1120px` olarak dar kalır — okunabilirlik için, prototipte de
öyle. Geniş ekranda logo ve dil seçici ortada toplanmasın diye çubuk ayrıldı.

Ana sayfada çubuk **şeffaftır** (zemin, bulanıklık ve alt çizgi yok) — override
`home.css`'te, o dosya yalnızca ana sayfada yükleniyor.

**Mobilde (≤720px) menü hamburger'dir.** Nav ve dil seçici tek bir `.menu`
kabında: masaüstünde sağa yaslı tek satır, mobilde çubuğun altına açılan
panel. Panel kendi zeminini taşır — ana sayfada çubuk şeffaf olduğu için
şart. Düğme `aria-expanded` taşıyor; Escape kapatıp odağı düğmeye döndürüyor,
dışarı tıklama da kapatıyor.

**Dil seçici amber kullanmaz.** Aktif dil `rgba(214,190,245,.12)` zemin ve
`--tx` metinle işaretlenir. Amber, "arayüz tek renk" kuralı gereği butonlara
ve aktif nav bağlantısına ayrıldı.

**Perde değerleri** (`.hero-scrim`) sahnenin canlılığını belirler:
dikey `.34`, yatay `.72 → .44`. Düşürmek sahneyi açar, yükseltmek karartır.
Perde metni etkilemez — `.stage` z-index:2 ile üstünde.

**Kalkış sahnesi** (`src/assets/js/takeoff.js`): saf Canvas 2D, kütüphane yok.
Kamera hero yüksekliği (700vh) boyunca yükseliyor. Sayfa görsel olarak
kaymıyor — bkz. yukarıdaki panel mimarisi. Performans optimizasyonları içinde:
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

Site yayında; bunların hiçbiri yayını engellemiyor.

1. **Hukuk bilgileri** — şirket unvanı, açık adres, KVKK başvuru e-postası.
   Geldiğinde iki dosyada 3 alan doldurulacak ve workflow'daki
   `IZIN_VER_YER_TUTUCU` istisnası silinecek. Avukat incelemesi de yapılmadı.
2. **Spotify betiği** — `scripts/fetch-spotify.mjs` (henüz yok).
   Çalma listesi: `1OnQcPOHG6KV5BIEu9BZIC`. Ses sayfasında şu an
   Spotify'a düz bağlantı var, katalog çekilmiyor.
3. **Kalkış animasyonu performansı** — gerçek telefonda hiç ölçülmedi.
   Sitenin en riskli parçası burası.
4. **Form arka ucu** — mailto çalışıyor. Gerçek arka uç istenirse
   `form.js` içindeki teslim kısmı değişir, doğrulama aynen kalır.
   Ama o an KVKK yükümlülüğü de geri gelir.
5. **İngilizce blog** — şu an tek yazı. Diğer ikisi bilinçli olarak
   Türkçe kaldı.
6. **Search Console** — `sitemap.xml` gönderilmedi. Mülk **www** olmalı.

## 5. Karar bekleyen konular

| # | Konu | Not |
|---|---|---|
| 1 | ~~Gerçek e-posta adresi~~ | **Kapandı** (6 Eylül 2026). `info@piststudio.com` aktif, erişim kurucuda. Form mailto ile buraya gidiyor — adres değişirse form da değişir. |
| 2 | **Aydınlatma metni** ⚠️ | **Launch'ı artık engellemiyor — risk bilinçli olarak kabul edildi** (kurucu, 6 Eylül 2026; gerekçe: siteye trafik gelmiyor). Kalan 3 alan (şirket unvanı, açık adres, KVKK başvuru e-postası) şirket kurulmadığı için boş; sayfada köşeli parantez olarak görünecekler. Avukat incelemesi hâlâ yapılmadı. Bilgiler gelince doldurulacak ve workflow'daki `IZIN_VER_YER_TUTUCU` istisnası silinecek. |
| 3 | ~~Ana sayfa parlaklığı~~ | **Çözüldü** (commit `3ed3c01`). Yığın bağlamı hatasıydı — aşağıya bakın. |
| 4 | ~~Hero uzunluğu~~ | 700vh olarak ayarlandı. Değiştirmek istersen tek sayı: `src/assets/css/home.css` içinde `.hero{height:700vh}`. |
| 5 | **Markanın büyük harf yazımı** | Footer'da `© 2020–2026 PİST STUDİO` çıkıyor. Doğrusu `PIST STUDIO` mu `PİST STUDİO` mu — şirket hafızasında **A02** altında açık konu. |
| 6 | **Apex'e geçiş** | Launch `www.piststudio.com` üzerinden yapılıyor; `site.url` CNAME ile hizalandı. Apex'e (`piststudio.com`) geçiş DNS değişikliği gerektiriyor (Squarespace, erişim Bilal'de) ve ayrı, bilinçli bir taşıma olarak planlandı. |
| 7 | **Yönlendirilmeyen 12 eski sayfa** | Karşılığı olmadığı için 404'e düşüyorlar. Liste ve gerekçe `src/_data/yonlendirmeler.js` başındaki yorumda. İtiraz varsa oradan eklenir. |

### Ana sayfa parlaklığı — kapanış notu (6 Eylül 2026)

Sorun **renk değerlerinde değildi.** Ölçümde başlık zaten `--tx` (`#F2E9F6`)
ve tam opaklıktaydı; metni karartan hiçbir `opacity`, `filter` ya da ata öğe
yoktu. Font smoothing ve `text-shadow` varyantları A/B ile denendi, görünür
fark vermedi.

**Gerçek neden:** `.hero-stage` `position:sticky`. Sticky kendi yığın bağlamını
açıyor ve `z-index:auto` ile 0 seviyesinde boyanıyor. Bu yüzden içindeki
`.wrap{z-index:2}` bağlamın dışına çıkamıyordu; `.hero-scrim{z-index:1}` ise
kardeş olarak daha üstte boyanıyordu. Yani metin, perdenin **altında** kalıyordu.
Perdenin metin bölgesindeki bileşik alfası ~0,9 — başlığın, lede'nin ve amber
butonun üzerine neredeyse opak bir `#07040F` tabakası düşüyordu.

**Düzeltme:** `.hero-stage`'e `z-index:2`. Tek satır. Perde artık yalnızca
sahneyi karartıyor, metni değil. Marka token'larına ve perde değerlerine
dokunulmadı.

> Ders: `position:sticky` ve `position:fixed` yığın bağlamı açar. Bir kardeşe
> verilen `z-index`, bağlam içindeki torunun `z-index`'ini her zaman yener.

**Doğrulanamayan:** Önizleme paneli bu oturumda kapalıydı. Panel gizliyken
tarayıcı sayfayı render etmiyor — `requestAnimationFrame` hiç çalışmıyor ve
programatik scroll sonrası ekran görüntüleri boş geliyor. Bu yüzden yalnızca
**hero'nun duruş hâli** (scroll 0) gözle doğrulandı; onun için kare geçerli.
**Kalkış animasyonunun kendisi, tırmanış kareleri ve hero altı hâlâ gözle
görülmedi.** Aynı engel marka klasöründeki `DEVAM.md`'de de kayıtlı — prototip
de bu yüzden kontrol edilememişti. Bir sonraki oturumda önizleme panelini
**açık tutun**, yoksa bu bölüm yine doğrulanamaz.

---

## 6. Yayın — ✅ CANLIDA (6 Eylül 2026)

**Site yayında: https://www.piststudio.com/**
Eski müzik stüdyosu sitesi kaldırıldı.

### Nasıl yayınlanıyor

Depo ayarına **hiç dokunulmadı.** GitHub Pages hâlâ *deploy from a branch*
modunda ve `pist` dalının **kökünü** servis ediyor; biz de derlenmiş çıktıyı
oraya koyuyoruz. Bilal'e ihtiyaç kalmadı.

```bash
# yeni-site dalında geliştir, sonra:
git checkout pist
git merge yeni-site
npm run yayinla          # derle + kontrol + köke senkronla
git add -A && git commit -m "..." && git push
```

`npm run yayinla` = `build` + `kontrol` + `scripts/yayinla.mjs`.
Betik yalnızca `_site` içinde karşılığı olan girdileri kökte değiştirir;
`src/`, `scripts/`, `package.json` gibi kaynaklara dokunmaz.

> ⚠️ `kontrol` şu an başarısız oluyor (aşağıya bakın). Bilinçli olarak
> geçmek için: `IZIN_VER_YER_TUTUCU=1 npm run yayinla`

### Kökteki dosyalar ÜRETİLMİŞTİR

`index.html`, `tr/`, `en/`, `assets/`, `pages/`, `404.html`, `sitemap.xml`,
`robots.txt`, `CNAME`, `.nojekyll` — hiçbiri elle düzenlenmez. Kaynak `src/`.

`.nojekyll` şart: dal modunda Jekyll devreye girer ve çıktıyı işlemeye
çalışır.

### Alan adı

`piststudio.com` → **301** → `www.piststudio.com`. Canonical, `og:url` ve
hreflang'ler www'yi gösteriyor; CNAME de www. Üçü tutarlı, doğrulandı.

### Yayın sonrası doğrulama — yapıldı

18 URL'nin hepsi 200: kök, `/tr/` ve `/en/` altındaki 7'şer sayfa,
`sitemap.xml`, `robots.txt`, `404.html`. Altı eski URL yönlendirmesi
hedefine düşüyor; yönlendirilmeyen eski sayfalar 404 veriyor.
Ana sayfada `hero-stage` z-index'i 2 olarak canlıda — parlaklık düzeltmesi
yayında.

### Kalanlar

- [ ] **Hukuk bilgileri gelince:** 3 alanı doldur (`src/tr/yasal/…` ve
      `src/en/legal/…`), sonra `.github/workflows/deploy.yml` içindeki
      `IZIN_VER_YER_TUTUCU` env bloğunu sil.
- [ ] Search Console'a `sitemap.xml` gönder (mülk **www** olmalı).
- [ ] Gerçek telefonda kalkış animasyonunun performansını ölç — hiç ölçülmedi.
- [ ] Kökte eski proje dosyaları duruyor ve herkese açık servis ediliyor:
      `PRD.md`, `CONTENT.prd`, `docs/`, `html-classes.txt`. Eski sitede de
      böyleydi, yeni bir açık değil — ama temizlenebilir.

### Actions moduna geçmek istenirse

`.github/workflows/deploy.yml` hazır ama **uykuda** — otomatik tetikleyicisi
kaldırıldı ki dal modundayken boşuna kırmızı çalışma üretmesin. Geçiş
adımları dosyanın başında yazılı.

### Geri dönüş

Eski site `pist` geçmişinde, commit `899304e`. Kullanıcıda ayrıca yerel
yedek var. Pages ayarına dokunulmadığı için geri dönüş de ayar
gerektirmiyor — `git revert` yeterli.

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
  `img/`, `videos/`). `pist` dalında canlı olduğu için silinmedi. Actions
  dağıtımına geçilince artifact `_site` olacağı için yayına çıkmayacaklar.
- **`pages_DISABLED/` ve `pages/katilimcilar.html` silindi** (commit `899304e`).
  İlkinde başka bir stüdyonun ("Qube London") marka adı geçiyordu, ikincisi
  "gizli" olmasına rağmen herkese açıktı.
- **Kalkış animasyonu hâlâ gözle görülmedi.** İki oturumdur önizleme paneli
  kapalı; panel gizliyken tarayıcı `requestAnimationFrame`'i çalıştırmıyor ve
  scroll'lu ekran görüntüleri boş geliyor. Duruş hâli (scroll 0) doğrulandı.
  **Performans hiç ölçülmedi** — gerçek telefonda ölçülmeli.
- **Ses sayfasında Spotify katalogu yok**, sadece düz bağlantı var.
- **`_site/` derleme çıktısı** git'te izlenmiyor; workflow her push'ta üretiyor.

## 9. Yeni oturuma verilecekler

1. Bu dosya
2. `~/Desktop/Pist Studio Marka/DEVAM.md`
3. `~/Desktop/Pist Studio Marka/kaynak/Pist_Studio_Sirket_Hafizasi_v1_1.docx`

Ve şu cümle yeter: *"pist-website deposunda `yeni-site` dalında kaldığımız
yerden devam ediyoruz, DEVAM.md'yi oku."*

> **Önizleme panelini açık tut.** İki oturumdur kapalı olduğu için kalkış
> animasyonu bir kez bile gözle doğrulanamadı.
