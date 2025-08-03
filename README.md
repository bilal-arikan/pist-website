# PİST Studio Website

Bu proje, https://www.piststudio.com/ web sitesinin yerel kopyasıdır. Londra'daki müzik ve podcast stüdyolarının üyelik sistemini tanıtan bir web sitesidir.

## 📁 Proje Yapısı

```
pist-website/
├── css/                    # CSS dosyaları
│   ├── flickity.min.css
│   ├── swiper-bundle.min.css
│   └── theqube.webflow.shared.min.css
├── js/                     # JavaScript dosyaları
│   ├── ScrollTrigger.min.js
│   ├── embed.js
│   ├── flickity.pkgd.min.js
│   ├── scrolldisable.js
│   └── swiper-bundle.min.js
├── images/                 # Resim dosyaları
│   ├── pist_favicon.png
│   ├── pist_icon.png
│   ├── pist_nav_*.jpg
│   └── pist_avatar-small_*.avif
├── videos/                 # Video dosyaları
│   ├── pist_homepage_video.mp4
│   ├── pist_homepage_video.webm
│   └── pist_homepage_video-poster.jpg
├── pages/                  # Alt sayfalar
│   ├── membership_*.html
│   ├── locations_*.html
│   └── *.html
├── index.html             # Ana sayfa
├── PRD.md                 # Proje gereksinimleri belgesi
└── README.md              # Bu dosya
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Web tarayıcısı
- HTTP sunucusu (Python, Node.js, veya PowerShell)

### Yerel Sunucu Başlatma

#### PowerShell ile:
```powershell
# Proje dizinine gidin
cd c:\Users\Bilal\Desktop\Projects\pist-website

# HTTP sunucusunu başlatın
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8080/')
$listener.Start()
Write-Host 'Sunucu http://localhost:8080/ adresinde başlatıldı'
```

#### Python ile (eğer kuruluysa):
```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

#### Node.js ile (eğer kuruluysa):
```bash
npx http-server -p 8080
```

### Tarayıcıda Görüntüleme
Sunucu başlatıldıktan sonra tarayıcınızda `http://localhost:8080` adresine gidin.

## 🎯 Özellikler

- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Video Arka Plan**: Ana sayfada otomatik oynatılan video
- **Interaktif Navigasyon**: Dropdown menüler ve hover efektleri
- **Carousel/Slider**: Swiper ve Flickity kütüphaneleri
- **Animasyonlar**: GSAP ScrollTrigger ile scroll animasyonları
- **Form Entegrasyonu**: Typeform embed desteği

## 📋 İçerik

### Ana Sayfalar
- **Ana Sayfa** (`index.html`): Studio üyelik tanıtımı
- **Membership**: Müzik yapımcıları, DJ'ler, podcaster'lar için üyelikler
- **Locations**: Canary Wharf, Acton, Hackney, Elephant & Castle lokasyonları
- **Studios**: Stüdyo rezervasyon sistemi
- **Events**: Etkinlikler ve workshoplar

### Teknik Detaylar
- **CSS Framework**: Webflow CSS + özel stiller
- **JavaScript Kütüphaneleri**: 
  - GSAP ScrollTrigger (animasyonlar)
  - Swiper.js (slider)
  - Flickity (carousel)
  - Typeform (form entegrasyonu)
- **Medya Formatları**: 
  - Resimler: JPG, PNG, AVIF
  - Videolar: MP4, WebM

## 🔧 Geliştirme

### Dosya Düzenleme
- CSS dosyaları `css/` klasöründe
- JavaScript dosyaları `js/` klasöründe
- Resimler `images/` klasöründe
- Videolar `videos/` klasöründe
- Alt sayfalar `pages/` klasöründe

### Bağlantı Yapısı
Tüm bağlantılar yerel dosya sistemine göre ayarlanmıştır:
- CSS: `css/dosya-adi.css`
- JS: `js/dosya-adi.js`
- Resimler: `images/resim-adi.jpg`
- Sayfalar: `pages/sayfa-adi.html`

## 📝 Lisans

Bu proje eğitim amaçlı oluşturulmuştur. Orijinal içerik https://www.piststudio.com/ sitesine aittir.

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📞 İletişim

Sorularınız için issue açabilir veya pull request gönderebilirsiniz.

---

**Not**: Bu proje, orijinal PİST Studio web sitesinin yerel bir kopyasıdır ve eğitim amaçlı kullanım içindir.