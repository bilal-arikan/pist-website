---
title: "Canvas'ta 2.000 yıldızı 60 fps'te çizmek"
slug: "canvasta-2000-yildiz-60-fps"
lang: tr
date: 2026-09-22
category: "Teknik"
hue: "#9CE085"
excerpt: "WebGL'e geçmeden önce 2D canvas'ın nereye kadar dayandığını ölçtük. Dört değişiklik, kare süresini yarıya indirdi."
readingTime: 11
---

Sitemizin giriş sahnesi bir kalkış animasyonu: yerde başlıyor, kaydırdıkça yükseliyor. Sahnede ~240 pist lambası ve 2.100 yıldız var, hepsi 3B koordinatlarda tutulup perspektifle projekte ediliyor.

İlk sürüm masaüstünde takılıyordu. WebGL'e geçmek yerine önce **2D canvas'ın nereye kadar dayandığını ölçtük**. Dört değişiklik yetti.

## 1. Trigonometriyi döngüden çıkarmak

En büyük israf en aptalcasıydı. Projeksiyon fonksiyonu şöyleydi:

```js
function project(p){
  var cp = Math.cos(pitch), sp = Math.sin(pitch);
  // ...
}
```

`pitch` kare boyunca sabit. Ama fonksiyon her nokta için çağrılıyor — yani karede **2.300'den fazla `cos`/`sin` çifti**. Değerleri kare başında bir kez hesaplayıp modül seviyesinde tutmak bunu 2'ye indirdi.

## 2. Küçük yıldızlar için `arc()` yerine `fillRect()`

Bu ölçtüğümüz en net kazanç oldu. 2.100 yıldızı çizmenin iki yolu:

```js
// 2.9 ms
ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();

// 0.9 ms
ctx.fillRect(x, y, 1, 1);
```

**2,9 ms → 0,9 ms.** 60 fps bütçesi 16,7 ms olduğuna göre, sadece yıldız yolları karenin altıda birini yiyormuş. Yıldızların çoğu zaten 1 piksel; daire çizmenin görsel karşılığı yok.

Yalnızca yarıçapı 1 pikselden büyük olanlarda `arc()` kullanıyoruz.

## 3. Gradyanları önbelleğe almak

Gökyüzü ve vinyet gradyanları her karede yeniden üretiliyordu:

```js
// her karede — gereksiz
var sky = ctx.createLinearGradient(0, 0, 0, H);
sky.addColorStop(0, '#04030A');
```

Bu gradyanlar sadece pencere boyutuna bağlı. `build()` içine taşıyıp önbelleğe aldık; yeniden üretim sadece yeniden boyutlandırmada oluyor.

Aynı mantık ışık harelerine de uygulandı: her lamba için radyal gradyan üretmek yerine, beş lamba tipinin her biri için **bir kez sprite render edilip** `drawImage` ile ölçeklenerek basılıyor.

## 4. Piksel yoğunluğunu sınırlamak

Asıl darboğaz buydu ve en az göze çarpanıydı.

Retina bir ekranda `devicePixelRatio` 2. 1440×900 bir pencerede tuval 2880×1800 = **5,2 milyon piksel** oluyor. Ve karede beş kez tam ekran dolduruyorduk: gökyüzü, zemin, vinyet, film greni, renk gürültüsü. İkisi ekrandan da büyük alanda.

Kabaca **28 milyon piksel/kare**.

İki değişiklik:
- `devicePixelRatio` tavanı 1,5 (mobilde 1,25). Gözle fark edilmiyor, piksel sayısı %44 düşüyor.
- Gren tek katmana indirildi ve yarı çözünürlükte önceden render edilip `drawImage` ile ölçekleniyor. Desen dolgusu yerine tek çizim çağrısı.

Sonuç: **~12 milyon piksel/kare.** Kabaca yarısı.

Bir de `getContext('2d', { alpha: false })` ekledik — tuval şeffaf olmadığı için birleştirme maliyeti düşüyor. Sahne zaten gökyüzüyle tamamen dolduruluyor, kaybedilen bir şey yok.

## Kalite kademeleri

Optimizasyondan sonra bile her cihazın aynı performansı vereceğini varsaymak yanlış olurdu. Döngü kare süresini ölçüyor ve 23 ms'yi aşarsa sessizce kademe iniyor:

| Kademe | Yıldız | Kapatılan |
|---|---|---|
| 0 | 2.100 | — |
| 1 | 1.400 | mercek hayaletleri, kirlilik |
| 2 | 900 | + kromatik sapma |
| 3 | 520 | + halation |

Mobil doğrudan 2. kademede başlıyor. Kullanıcı hiçbir şey fark etmiyor; sahne biraz sadeleşiyor, ama takılmıyor.

## Ne öğrendik

**WebGL'e geçmeden önce ölç.** 2D canvas beklediğimizden çok daha fazlasını kaldırıyor, ve WebGL'in getireceği karmaşıklık bu sahne için karşılığını vermezdi.

**Darboğaz genelde sandığın yerde değil.** Biz yıldız sayısını suçluyorduk; asıl maliyet tam ekran dolgularının piksel sayısındaydı. Ölçmeden dokunmak zaman kaybı.

**En ucuz optimizasyon, hiç yapılmayan iştir.** Kare boyunca sabit olan bir hesabı döngüye koymak, sonradan bulunması en kolay ama başta fark edilmesi en zor hata.
