# PİST Studio - Next.js Geçiş Planı

## 📋 Proje Genel Bakış

Bu belge, mevcut statik HTML/CSS/JS tabanlı PİST Studio web sitesinin Next.js'e geçiş planını detaylandırır.

### Mevcut Proje Analizi
- **Teknoloji Stack:** Vanilla HTML, CSS, JavaScript
- **Sayfa Sayısı:** 15+ sayfa (index.html + pages/ klasörü)
- **Bağımlılıklar:** jQuery, GSAP, Swiper, Flickity, PDF.js
- **Özel Özellikler:** Video backgrounds, animasyonlar, modal'lar, Supabase entegrasyonu

---

## 🎯 Geçiş Hedefleri

1. **Performance:** Server-side rendering ile daha hızlı yükleme
2. **SEO:** Gelişmiş SEO optimizasyonu
3. **Maintainability:** Component-based yapı ile daha kolay bakım
4. **Scalability:** Gelecekteki özellik eklemeleri için daha iyi altyapı
5. **Developer Experience:** Modern development tools ve hot reload

---

## 📝 Detaylı Task Listesi

### 🔧 1. Proje Kurulumu ve Yapılandırma

#### 1.1 Next.js Projesi Oluşturma
- [ ] `npx create-next-app@latest pist-studio-nextjs --typescript --tailwind --eslint --app`
- [ ] Proje klasör yapısını organize etme
- [ ] Git repository kurulumu
- [ ] Environment variables yapılandırması

#### 1.2 Gerekli Paketlerin Kurulumu
- [ ] `npm install gsap` - Animasyonlar için
- [ ] `npm install swiper` - Slider'lar için
- [ ] `npm install @supabase/supabase-js` - Veritabanı entegrasyonu
- [ ] `npm install react-pdf` - PDF görüntüleme
- [ ] `npm install framer-motion` - Gelişmiş animasyonlar (opsiyonel)
- [ ] `npm install next-seo` - SEO optimizasyonu
- [ ] `npm install sharp` - Image optimization

#### 1.3 TypeScript Yapılandırması
- [ ] `tsconfig.json` optimizasyonu
- [ ] Type definitions oluşturma
- [ ] Interface'lerin tanımlanması

### 🎨 2. Statik Dosyaların Taşınması

#### 2.1 CSS Dosyaları
- [ ] `css/` klasörünü `styles/` olarak taşı
- [ ] Global CSS'leri `globals.css`'e entegre et
- [ ] CSS Modules'a dönüştürme (opsiyonel)
- [ ] Tailwind CSS ile entegrasyon

#### 2.2 JavaScript Dosyaları
- [ ] `js/` klasöründeki dosyaları `lib/` veya `utils/` klasörüne taşı
- [ ] jQuery bağımlılığını kaldır ve vanilla JS'e çevir
- [ ] GSAP animasyonlarını React hooks'a dönüştür
- [ ] Swiper'ı React Swiper'a geçir

#### 2.3 Medya Dosyaları
- [ ] `img/` klasörünü `public/images/` olarak taşı
- [ ] `videos/` klasörünü `public/videos/` olarak taşı
- [ ] Next.js Image component'i için optimizasyon
- [ ] WebP formatına dönüştürme

### 🏗️ 3. Component Yapısının Oluşturulması

#### 3.1 Layout Components
- [ ] `Layout.tsx` - Ana layout wrapper
- [ ] `Header.tsx` - Navbar component'i
- [ ] `Footer.tsx` - Footer component'i
- [ ] `SEO.tsx` - Meta tags component'i

#### 3.2 UI Components
- [ ] `Button.tsx` - Yeniden kullanılabilir buton
- [ ] `Modal.tsx` - Modal component'i
- [ ] `VideoBackground.tsx` - Video background component'i
- [ ] `Slider.tsx` - Swiper wrapper component'i
- [ ] `AnimatedSection.tsx` - GSAP animasyon wrapper'ı

#### 3.3 Page-Specific Components
- [ ] `Hero.tsx` - Ana sayfa hero section
- [ ] `AboutSection.tsx` - Hakkımızda bölümü
- [ ] `EventsSection.tsx` - Etkinlikler bölümü
- [ ] `ContactForm.tsx` - İletişim formu
- [ ] `ParticipantForm.tsx` - Katılımcı kayıt formu

### 📄 4. Sayfa Dönüşümleri

#### 4.1 Ana Sayfa (index.html → page.tsx)
- [ ] Hero section component'e dönüştürme
- [ ] Video background entegrasyonu
- [ ] Animasyonların React'a uyarlanması
- [ ] Slider component'lerinin entegrasyonu

#### 4.2 Alt Sayfalar (pages/ → app/)
- [ ] `pages/contact.html` → `app/contact/page.tsx`
- [ ] `pages/events.html` → `app/events/page.tsx`
- [ ] `pages/services.html` → `app/services/page.tsx`
- [ ] `pages/who-we-are.html` → `app/about/page.tsx`
- [ ] `pages/calendars.html` → `app/calendars/page.tsx`
- [ ] `pages/location-pist.html` → `app/location/page.tsx`
- [ ] `pages/music-career-coaching.html` → `app/programs/music-career-coaching/page.tsx`
- [ ] `pages/nefes-atolyesi.html` → `app/programs/nefes-atolyesi/page.tsx`

#### 4.3 Özel Sayfalar
- [ ] `pages/cerez-politikasi.html` → `app/privacy/page.tsx`
- [ ] `pages/duyurular.html` → `app/announcements/page.tsx`
- [ ] `pages/katilimcilar.html` → `app/participants/page.tsx`

### 🔌 5. Özellik Entegrasyonları

#### 5.1 Supabase Entegrasyonu
- [ ] Supabase client kurulumu
- [ ] Environment variables yapılandırması
- [ ] Participant registration API routes
- [ ] Database schema migration
- [ ] Error handling ve loading states

#### 5.2 Google Analytics
- [ ] Google Analytics 4 entegrasyonu
- [ ] Custom events tracking
- [ ] Performance monitoring

#### 5.3 SEO Optimizasyonu
- [ ] Meta tags için dynamic SEO component
- [ ] Sitemap.xml oluşturma
- [ ] Robots.txt yapılandırması
- [ ] Open Graph tags
- [ ] JSON-LD structured data

### 🎭 6. Animasyon ve Etkileşimler

#### 6.1 GSAP Entegrasyonu
- [ ] GSAP'ı React hooks ile kullanma
- [ ] ScrollTrigger entegrasyonu
- [ ] Page transitions
- [ ] Loading animations

#### 6.2 Swiper Entegrasyonu
- [ ] React Swiper component'leri
- [ ] Custom navigation buttons
- [ ] Responsive breakpoints
- [ ] Auto-play functionality

#### 6.3 Modal ve Overlay'ler
- [ ] Modal state management
- [ ] Focus management
- [ ] Keyboard navigation
- [ ] Accessibility improvements

### 📱 7. Responsive Design ve Accessibility

#### 7.1 Responsive Design
- [ ] Tailwind CSS breakpoints
- [ ] Mobile-first approach
- [ ] Touch interactions
- [ ] Performance optimization for mobile

#### 7.2 Accessibility
- [ ] ARIA labels ve roles
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast optimization

### 🧪 8. Testing ve Quality Assurance

#### 8.1 Unit Testing
- [ ] Jest ve React Testing Library kurulumu
- [ ] Component testleri
- [ ] Utility function testleri
- [ ] API route testleri

#### 8.2 E2E Testing
- [ ] Playwright kurulumu
- [ ] Critical user journey testleri
- [ ] Form submission testleri
- [ ] Navigation testleri

#### 8.3 Performance Testing
- [ ] Lighthouse audits
- [ ] Core Web Vitals optimization
- [ ] Bundle size analysis
- [ ] Image optimization verification

### 🚀 9. Deployment ve DevOps

#### 9.1 Build Optimization
- [ ] Next.js build configuration
- [ ] Static export settings (eğer gerekirse)
- [ ] Image optimization settings
- [ ] Bundle analyzer kurulumu

#### 9.2 Deployment Setup
- [ ] Vercel deployment configuration
- [ ] Environment variables setup
- [ ] Domain configuration
- [ ] SSL certificate setup

#### 9.3 Monitoring ve Analytics
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] User analytics
- [ ] Uptime monitoring

### 🔄 10. Migration ve Go-Live

#### 10.1 Content Migration
- [ ] Tüm içeriklerin doğrulanması
- [ ] URL redirections
- [ ] SEO meta data verification
- [ ] Image alt texts

#### 10.2 Testing
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Performance testing
- [ ] Accessibility testing

#### 10.3 Go-Live Checklist
- [ ] DNS configuration
- [ ] SSL certificate verification
- [ ] Google Analytics verification
- [ ] Search Console setup
- [ ] Sitemap submission

---

## 📊 Tahmini Süre ve Öncelikler

### Yüksek Öncelik (1-2 hafta)
1. Proje kurulumu ve temel yapılandırma
2. Layout components (Header, Footer, Layout)
3. Ana sayfa dönüşümü
4. Temel routing yapısı

### Orta Öncelik (2-3 hafta)
1. Alt sayfaların dönüşümü
2. Animasyon entegrasyonları
3. Supabase entegrasyonu
4. SEO optimizasyonu

### Düşük Öncelik (1-2 hafta)
1. Testing implementasyonu
2. Performance optimizasyonu
3. Accessibility improvements
4. Deployment ve monitoring

---

## 🛠️ Gerekli Araçlar ve Teknolojiler

### Core Technologies
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React 18

### Libraries
- GSAP (animasyonlar)
- Swiper (slider'lar)
- Supabase (backend)
- React Hook Form (form yönetimi)
- Zod (validation)

### Development Tools
- ESLint + Prettier
- Husky (git hooks)
- Jest + React Testing Library
- Playwright (E2E testing)

### Deployment
- Vercel (hosting)
- Supabase (database)
- Cloudinary (image optimization - opsiyonel)

---

## 📋 Başarı Kriterleri

1. **Performance:** Lighthouse score 90+ (tüm kategorilerde)
2. **SEO:** Core Web Vitals'da yeşil skorlar
3. **Accessibility:** WCAG 2.1 AA compliance
4. **Functionality:** Tüm mevcut özellikler çalışır durumda
5. **Responsive:** Tüm cihazlarda mükemmel görünüm
6. **Maintenance:** Clean code ve iyi dokümantasyon

---

## 🔗 Faydalı Kaynaklar

- [Next.js Documentation](https://nextjs.org/docs)
- [GSAP React Guide](https://greensock.com/react/)
- [Swiper React Components](https://swiperjs.com/react)
- [Supabase Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

*Bu plan, projenin karmaşıklığına göre 4-6 hafta içinde tamamlanabilir. Her task için detaylı alt görevler ve kontrol listeleri mevcuttur.*