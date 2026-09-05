# Pist Studio sitesi — devir belgesi

**Son güncelleme:** 6 Eylül 2026 (2. oturum)
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

Canlıya çıkmayı **engelleyenler** (bölüm 5'teki tabloda gerekçeleri var):

1. **Aydınlatma metni** — köşeli parantezli 8 alan + avukat incelemesi.
   Şirket unvanı olmadan veri sorumlusu alanı doldurulamıyor.
   Bilgiler bu hafta gelecek. `npm run kontrol` bekçilik ediyor.

   *(Gerçek e-posta adresi maddesi kapandı — `info@piststudio.com` teyitli.)*

Engellemeyenler:

3. **Spotify betiği** — `scripts/fetch-spotify.mjs` (henüz yok).
   Çalma listesi: `1OnQcPOHG6KV5BIEu9BZIC`. Şu an Ses sayfasında
   Spotify'a düz bağlantı var, katalog çekilmiyor.
4. **Form arka ucu** — mailto çalışıyor. Gerçek arka uç istenirse
   `form.js` içindeki `teslim` kısmı değişir, doğrulama aynen kalır.
   Ama o an KVKK yükümlülüğü de geri geliyor (bkz. bölüm 5).
5. **İngilizce blog** — şu an tek yazı. Diğer ikisi bilinçli olarak
   Türkçe kaldı; istenirse çevrilir.

## 5. Karar bekleyen konular

| # | Konu | Not |
|---|---|---|
| 1 | ~~Gerçek e-posta adresi~~ | **Kapandı** (6 Eylül 2026). `info@piststudio.com` aktif, erişim kurucuda. Form mailto ile buraya gidiyor — adres değişirse form da değişir. |
| 2 | **Aydınlatma metni** ⛔ | **Launch'ı engelleyen tek madde.** Sayfa şimdilik doldurulmamış haliyle duruyor; gerekli bilgiler bu hafta gelecek (kurucu, 6 Eylül 2026). Metin mailto'ya göre revize edildi ama 8 köşeli parantezli alan ve avukat incelemesi şartı duruyor. **Emniyet kemeri var:** `npm run kontrol` doldurulmamış alan bulursa dağıtım workflow'u yayınlamadan duruyor. |
| 3 | ~~Ana sayfa parlaklığı~~ | **Çözüldü** (commit `3ed3c01`). Yığın bağlamı hatasıydı — aşağıya bakın. |
| 4 | **Hero uzunluğu** | 400vh. Ayarlanabilir tek sayı: `src/assets/css/home.css` içinde `.hero{height:400vh}`. |
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

## 6. Yayın planı

Site **GitHub Pages**'te, `pist` dalının kökünden yayınlanıyor.
Alan adı `www.piststudio.com`, DNS **Squarespace Domains**'te, erişim **Bilal**'de.

Teknik taraf hazır. Sıra şu:

### Adım 0 — Önce bunlar kapanmalı (bizde)

- [x] ~~Gerçek e-posta adresi~~ — `info@piststudio.com` teyit edildi, aktif.
- [ ] **Aydınlatma metni** → avukat + şirket unvanı. Bilgiler bu hafta gelecek.
      Doldurulunca `src/tr/yasal/aydinlatma-metni.md` ve
      `src/en/legal/privacy.md` içindeki köşeli parantezli 8 alan güncellenir.

`npm run kontrol` bu maddenin bekçisi: doldurulmamış alan kaldıysa dağıtım
workflow'u derleme ile yayınlama arasında durur, site canlıya çıkmaz.
Bilerek çıkmak gerekirse workflow adımına `IZIN_VER_YER_TUTUCU: "1"` eklenir.

### Adım 1 — Bilal yapacak (tek tık)

Repo ayarlarında `Settings → Pages → Build and deployment → Source`
değerini *Deploy from a branch* yerine **GitHub Actions** yap.

> ⚠️ Bu ayar değişince site, workflow ilk kez çalışana kadar boşa düşer.
> Workflow zaten hazır (`.github/workflows/deploy.yml`), o yüzden ayarı
> değiştirdikten hemen sonra Adım 2'yi yap. Kesinti bir iki dakika.

> Not: Pages özel alan adı ayarı `www.piststudio.com` olarak kalmalı.
> `CNAME` dosyası `_site`'a kopyalanıyor, yani artifact'ta da bulunuyor.

### Adım 2 — Biz yapacağız

```bash
git checkout pist
git merge yeni-site
git push
```

Workflow `pist` dalına push'ta tetikleniyor.

> Merge sırasında eski site dosyaları (`index.html`, `pages/`, `css/`, `js/`,
> `img/`, `videos/`) repoda kalmaya devam edecek — ama artifact `_site`
> olduğu için **yayına çıkmayacaklar.** Temiz kesit budur; ayrıca silmeye
> gerek yok. İstenirse merge sonrası ayrı bir temizlik commit'i atılır.

### Adım 3 — Yayın sonrası

- [ ] `https://www.piststudio.com/` kök yönlendirmesi çalışıyor mu
- [ ] `/tr/` ve `/en/` açılıyor mu, dil değiştirici doğru sayfaya gidiyor mu
- [ ] Search Console'a `sitemap.xml` gönder
- [ ] Yönlendirilen 6 eski URL yeni hedefine düşüyor mu
- [ ] Gerçek telefonda kalkış animasyonunun performansı ölç (hiç ölçülmedi)

**Geri dönüş:** eski site `pist` dalının geçmişinde duruyor (commit `899304e`).
Ayrıca yerel yedeği kullanıcıda.

### Alternatif (Bilal'e ihtiyaç duymayan)
Workflow'u, çıktıyı `pist` dalının köküne commit edecek şekilde değiştir.
Ayar değişikliği gerekmez, ama git geçmişi üretilen dosyalarla dolar ve
eski dosyalarla çakışmayı elle çözmek gerekir.

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
