# Web Sitesi Kopyalama Projesi - PRD (Product Requirements Document)

## Proje Özeti
Hedef: https://www.theqube.com/ web sitesinin tüm içeriğini (HTML, CSS, JavaScript, resimler, videolar) yerel proje klasörüne kopyalamak.

## İlk Adımlar

### 1. Proje Hazırlığı
- [ ] PRD dosyası oluşturma ✓
- [ ] Hedef web sitesini analiz etme
- [ ] Gerekli klasör yapısını belirleme
- [ ] İş parçalarını tanımlama

### 2. Web Sitesi Analizi
- [ ] Ana sayfa yapısını inceleme
- [ ] Alt sayfaları tespit etme
- [ ] Kullanılan teknolojileri belirleme
- [ ] Medya dosyalarını (resim, video) listeleme
- [ ] CSS ve JavaScript dosyalarını tespit etme

### 3. İndirme Stratejisi
- [ ] Wget veya curl kullanarak site kopyalama
- [ ] Recursive download parametrelerini belirleme
- [ ] Dosya organizasyonu planı
- [ ] Bağlantıları yerel hale getirme

## Teknik Gereksinimler

### Araçlar
- wget (Windows için)
- PowerShell komutları
- Dosya düzenleme araçları

### Hedef Klasör Yapısı
```
pist-website/
├── index.html
├── css/
├── js/
├── images/
├── videos/
├── fonts/
└── pages/
```

## Başarı Kriterleri
- Tüm HTML sayfaları kopyalanmış olmalı
- Tüm CSS ve JavaScript dosyaları çalışır durumda olmalı
- Tüm resim ve video dosyaları erişilebilir olmalı
- Bağlantılar yerel dosyalara yönlendirilmiş olmalı
- Site yerel olarak çalışabilir durumda olmalı

---

## Web Sitesi Analizi Tamamlandı

### Tespit Edilen Dosyalar

#### CSS Dosyaları
- https://cdn.prod.website-files.com/669b70b3f67bbafac2188569/css/theqube.webflow.shared.800869463.min.css
- https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css
- https://unpkg.com/flickity@2/dist/flickity.min.css

#### JavaScript Dosyaları
- https://cdn.jsdelivr.net/npm/@finsweet/attributes-scrolldisable@1/scrolldisable.js
- https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js
- https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js
- https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js
- //embed.typeform.com/next/embed.js
- https://www.googletagmanager.com/gtm.js?id=GTM-NF4NHRT

#### Resim Dosyaları
- https://cdn.prod.website-files.com/669b70b3f67bbafac2188569/6745cc0eec81ee7fac9237d8_qube_favicon.png
- https://cdn.prod.website-files.com/669b70b3f67bbafac2188569/6745cc13a656864293b7dfd0_qube_icon.png
- https://cdn.prod.website-files.com/669b70b3f67bbafac2188569/67575831bfd092f52d1c3d87_qube_nav_east.jpg
- https://cdn.prod.website-files.com/669b70b3f67bbafac2188569/675758319c0807a4d9391af4_qube_nav_west.jpg
- https://cdn.prod.website-files.com/669b70b3f67bbafac2188569/6784fd7adb908ad83adb4cfe_qube_nav_hackney_v2.jpg
- https://cdn.prod.website-files.com/669b70b3f67bbafac2188569/675758318d7cb36355d68d5e_qube_nav_elephant.jpg
- https://cdn.prod.website-files.com/669b70b3f67bbafac2188569/674efa3980b693672fdda96b_qube_avatar-small_4.avif
- https://cdn.prod.website-files.com/669b70b3f67bbafac2188569/674efa384b179f077dcccc3f_qube_avatar-small_1.avif
- https://cdn.prod.website-files.com/669b70b3f67bbafac2188569/674efa39e99d90d0c54674bd_qube_avatar-small_3.avif

#### Video Dosyaları
- https://cdn.prod.website-files.com/669b70b3f67bbafac2188569%2F67222333ad324b48d19b039f_qube_homepage_video-transcode.mp4
- https://cdn.prod.website-files.com/669b70b3f67bbafac2188569%2F67222333ad324b48d19b039f_qube_homepage_video-transcode.webm
- https://cdn.prod.website-files.com/669b70b3f67bbafac2188569%2F67222333ad324b48d19b039f_qube_homepage_video-poster-00001.jpg (poster)

#### Alt Sayfalar (Tespit Edilenler)
- /membership/music-makers
- /membership/djs
- /membership/podcasters
- /membership/photographers
- /membership/teams
- /locations/qube-canary-wharf
- /locations/qube-acton
- /locations/qube-hackney
- /locations/qube-elephant-and-castle
- /studios
- /songwriting-camps
- /private-events
- /events

## Detaylı İş Parçaları

### Adım 1: Klasör Yapısını Oluşturma
- [ ] css/ klasörü oluştur
- [ ] js/ klasörü oluştur
- [ ] images/ klasörü oluştur
- [ ] videos/ klasörü oluştur
- [ ] pages/ klasörü oluştur

### Adım 2: CSS Dosyalarını İndirme
- [ ] theqube.webflow.shared.min.css
- [ ] swiper-bundle.min.css
- [ ] flickity.min.css

### Adım 3: JavaScript Dosyalarını İndirme
- [ ] scrolldisable.js
- [ ] ScrollTrigger.min.js
- [ ] flickity.pkgd.min.js
- [ ] swiper-bundle.min.js
- [ ] typeform embed.js

### Adım 4: Resim Dosyalarını İndirme
- [ ] Favicon ve icon dosyaları
- [ ] Navigasyon resimleri
- [ ] Avatar resimleri
- [ ] Video poster resmi

### Adım 5: Video Dosyalarını İndirme
- [ ] Ana sayfa video (MP4)
- [ ] Ana sayfa video (WebM)

### Adım 6: Alt Sayfaları İndirme
- [ ] Membership sayfaları
- [ ] Location sayfaları
- [ ] Diğer sayfalar

### Adım 7: Bağlantıları Yerel Hale Getirme
- [x] CSS bağlantılarını güncelle
- [x] JavaScript bağlantılarını güncelle
- [x] Resim bağlantılarını güncelle
- [x] Video bağlantılarını güncelle
- [x] İç sayfa bağlantılarını güncelle

## Proje Durumu
- [x] Klasör yapısı oluşturuldu
- [x] CSS dosyaları indirildi
- [x] JavaScript dosyaları indirildi
- [x] Resim dosyaları indirildi
- [x] Video dosyaları indirildi
- [x] Alt sayfalar indirildi
- [x] Bağlantılar yerel hale getirildi

## Tamamlanan İşlemler

### 1. Klasör Yapısı
- `css/` - CSS dosyaları
- `js/` - JavaScript dosyaları
- `images/` - Resim dosyaları
- `videos/` - Video dosyaları
- `pages/` - Alt sayfa HTML dosyaları

### 2. İndirilen Dosyalar

**CSS Dosyaları:**
- theqube.webflow.shared.min.css
- swiper-bundle.min.css
- flickity.min.css

**JavaScript Dosyaları:**
- scrolldisable.js
- ScrollTrigger.min.js
- flickity.pkgd.min.js
- swiper-bundle.min.js
- embed.js

**Resim Dosyaları:**
- qube_favicon.png
- qube_icon.png
- qube_nav_east.jpg
- qube_nav_west.jpg
- qube_nav_hackney_v2.jpg
- qube_nav_elephant.jpg
- qube_avatar-small_4.avif
- qube_avatar-small_1.avif
- qube_avatar-small_3.avif

**Video Dosyaları:**
- qube_homepage_video-poster.jpg
- qube_homepage_video.mp4
- qube_homepage_video.webm

**Alt Sayfalar:**
- membership_music-makers.html
- membership_djs.html
- membership_podcasters.html
- membership_photographers.html
- membership_teams.html
- locations_qube-canary-wharf.html
- locations_qube-acton.html
- locations_qube-hackney.html
- locations_qube-elephant-and-castle.html
- studios.html
- songwriting-camps.html
- private-events.html
- events.html

### 3. Güncellenen Bağlantılar
- Tüm CSS ve JavaScript dosya bağlantıları yerel yollara güncellendi
- Favicon ve Apple Touch Icon bağlantıları güncellendi
- Navigasyon resimleri yerel yollara güncellendi
- Avatar resimleri yerel yollara güncellendi
- Video dosyaları yerel yollara güncellendi
- Tüm alt sayfa bağlantıları yerel HTML dosyalarına güncellendi

## Sonuç
Proje başarıyla tamamlandı. https://www.theqube.com/ web sitesinin tüm içeriği yerel olarak kopyalandı ve bağlantılar yerel dosya sistemine uygun hale getirildi.