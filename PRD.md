# Web Sitesi Kopyalama Projesi - PRD (Product Requirements Document)

## Proje Özeti
Hedef: https://www.piststudio.com/ web sitesinin tüm içeriğini (HTML, CSS, JavaScript, resimler, videolar) yerel proje klasörüne kopyalamak.

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
- css/theqube.webflow.shared.min.css
- css/swiper-bundle.min.css
- css/flickity.min.css
- css/shared-styles.css
- css/theme-colors.css
- css/responsive.css

#### JavaScript Dosyaları
- js/scrolldisable.js
- js/ScrollTrigger.min.js
- js/flickity.pkgd.min.js
- js/swiper-bundle.min.js
- js/embed.js
- js/gsap.min.js
- js/jquery-3.5.1.min.js
- js/webflow.ae25ff8e.82b5e4f06d3d1b4a.js

#### Resim Dosyaları
- images/pist_favicon.png
- images/pist_icon.png
- images/pist_nav_west.jpg
- images/pist_avatar-small_1.avif
- images/pist_avatar-small_2.avif
- images/pist_avatar-small_3.avif
- images/pist_avatar-small_4.avif
- images/pist_music-makers-1.avif
- images/pist_music-makers-2.avif
- images/pist_business_header_1.avif
- images/pist_business_header_2.avif
- images/pist_business_header_4.avif
- images/pist_business_header_5.avif
- images/pist_private-events_west_5.jpg
- images/pist_west_header.avif
- images/pist_photos_9.jpg
- images/created-by-webyst.svg

#### Video Dosyaları
- videos/pist_homepage_video.mp4
- videos/pist_homepage_video.webm
- videos/pist_homepage_video-poster.jpg
- videos/pist_private-events_video.mp4
- videos/pist_private-events_video.webm
- videos/pist_private-events_video-poster.jpg

#### Alt Sayfalar (Mevcut)
- /membership_music-makers
- /membership_djs
- /membership_podcasters
- /membership_photographers
- /membership_teams
- /location-pist
- /studios
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
- [x] theqube.webflow.shared.min.css
- [x] swiper-bundle.min.css
- [x] flickity.min.css
- [x] shared-styles.css
- [x] theme-colors.css
- [x] responsive.css

### Adım 3: JavaScript Dosyalarını İndirme
- [x] scrolldisable.js
- [x] ScrollTrigger.min.js
- [x] flickity.pkgd.min.js
- [x] swiper-bundle.min.js
- [x] embed.js
- [x] gsap.min.js
- [x] jquery-3.5.1.min.js
- [x] webflow.ae25ff8e.82b5e4f06d3d1b4a.js

### Adım 4: Resim Dosyalarını İndirme
- [x] Favicon ve icon dosyaları
- [x] Navigasyon resimleri
- [x] Avatar resimleri
- [x] Video poster resimleri
- [x] Business header resimleri
- [x] Music makers resimleri
- [x] Private events resimleri

### Adım 5: Video Dosyalarını İndirme
- [x] Ana sayfa video (MP4)
- [x] Ana sayfa video (WebM)
- [x] Private events video (MP4)
- [x] Private events video (WebM)

### Adım 6: Alt Sayfaları İndirme
- [x] Membership sayfaları
- [x] Pist sayfası
- [x] Diğer sayfalar

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
- shared-styles.css
- theme-colors.css
- responsive.css

**JavaScript Dosyaları:**
- scrolldisable.js
- ScrollTrigger.min.js
- flickity.pkgd.min.js
- swiper-bundle.min.js
- embed.js
- gsap.min.js
- jquery-3.5.1.min.js
- webflow.ae25ff8e.82b5e4f06d3d1b4a.js

**Resim Dosyaları:**
- pist_favicon.png
- pist_icon.png
- pist_nav_west.jpg
- pist_avatar-small_1.avif
- pist_avatar-small_2.avif
- pist_avatar-small_3.avif
- pist_avatar-small_4.avif
- pist_music-makers-1.avif
- pist_music-makers-2.avif
- pist_business_header_1.avif
- pist_business_header_2.avif
- pist_business_header_4.avif
- pist_business_header_5.avif
- pist_private-events_west_5.jpg
- pist_west_header.avif
- pist_photos_9.jpg
- created-by-webyst.svg

**Video Dosyaları:**
- pist_homepage_video-poster.jpg
- pist_homepage_video.mp4
- pist_homepage_video.webm
- pist_private-events_video.mp4
- pist_private-events_video.webm
- pist_private-events_video-poster.jpg

**Alt Sayfalar:**
- membership_music-makers.html
- membership_djs.html
- membership_podcasters.html
- membership_photographers.html
- membership_teams.html
- location-pist.html
- studios.html
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
Proje başarıyla tamamlandı. https://www.piststudio.com/ web sitesinin tüm içeriği yerel olarak kopyalandı ve bağlantılar yerel dosya sistemine uygun hale getirildi.
