# PİST Studio Website

Bu proje, https://www.piststudio.com/ web sitesinin yerel kopyasıdır. Londra'daki müzik ve podcast stüdyolarının üyelik sistemini tanıtan bir web sitesidir.

## 📁 Proje Yapısı

```
pist-website/
├── css/                    # CSS dosyaları
│   ├── flickity.min.css
│   ├── footer.css
│   ├── navbar.css
│   ├── pist.shared.css
│   ├── responsive.css
│   ├── shared-styles.css
│   ├── swiper-bundle.min.css
│   └── theme-colors.css
├── js/                     # JavaScript dosyaları
│   ├── ScrollTrigger.min.js
│   ├── embed.js
│   ├── flickity.pkgd.min.js
│   ├── gsap.min.js
│   ├── jquery-3.5.1.min.js
│   ├── navbar.js
│   ├── scrolldisable.js
│   ├── swiper-bundle.min.js
│   └── typeform-embed.js
├── img/                    # Resim dosyaları
├── videos/                 # Video dosyaları
├── pages/                  # Alt sayfalar
│   ├── contact.html
│   ├── events.html
│   ├── location-pist.html
│   └── who-we-are.html
├── pages_DISABLED/         # Devre dışı bırakılmış sayfalar
├── index.html              # Ana sayfa
├── PRD.md                  # Proje gereksinimleri belgesi
└── README.md               # Bu dosya
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Web tarayıcısı
- HTTP sunucusu

### Yerel Sunucu Başlatma

```bash
# Node.js ile
npx serve

# veya
npx http-server
```

### Tarayıcıda Görüntüleme
Sunucu başlatıldıktan sonra tarayıcınızda sunucunun verdiği URL adresine gidin.

## 🎯 Özellikler

- Responsive tasarım (mobil/masaüstü)
- Video arka plan
- İnteraktif navigasyon
- Carousel/Slider (Swiper, Flickity)
- Animasyonlar (GSAP ScrollTrigger)
- Form entegrasyonu

## 📋 İçerik

### Sayfalar
- Ana Sayfa: Stüdyo üyelik tanıtımı
- İletişim: Stüdyo lokasyonları ve iletişim bilgileri
- Etkinlikler: Workshop ve etkinlik takvimi
- Lokasyonlar: Stüdyo konumları

### Teknik Detaylar
- CSS: Özel stiller + yardımcı kütüphaneler
- JavaScript: GSAP, Swiper, Flickity, jQuery
- Medya: JPG, PNG, AVIF, MP4, WebM

## 🔧 Geliştirme

### Dosya Yapısı
- `css/`: Stil dosyaları
- `js/`: JavaScript dosyaları
- `img/`: Görseller
- `pages/`: Alt sayfalar
- `videos/`: Video dosyaları

## 📝 Lisans

Bu proje eğitim amaçlıdır. Orijinal içerik https://www.piststudio.com/ sitesine aittir.

## 🤝 Katkı ve İletişim

Geliştirme önerileri için issue açabilir veya pull request gönderebilirsiniz.

---

**Not**: Bu proje, PİST Studio web sitesinin yerel bir kopyasıdır ve eğitim amaçlıdır.