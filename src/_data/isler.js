/* Ses kolunun üç işi. Kartlar ve portfolyo sayfaları bu tek kaynaktan üretilir;
 * yeni bir iş eklemek ya da bir işi başka portfolyoya bağlamak burada tek satır.
 *
 * kaynak: portfolyo listesini hangi veri dosyasının beslediği. null ise sayfa
 * "henüz eklenmedi" durumunu dürüstçe gösterir. */
export default [
  {
    id: "muzik",
    hue: "var(--c-coral)",
    gorsel: "/assets/img/is/muzik.svg",
    kaynak: "sarkilar:muzik",
    tr: {
      ad: "Müzik prodüksiyonu",
      ozet: "Şarkının fikirden yayına giden yolu.",
      url: "/tr/ses/muzik-produksiyonu/",
      baslik: "Müzik prodüksiyonu — Pist Studio",
      aciklama: "Bağımsız sanatçılar ve markalar için müzik prodüksiyonu. Söz, beste, aranje ya da prodüksiyonunda çalıştığımız 57 parça.",
      giris: "Bir şarkı fikirden yayına giderken çok kere biçim değiştirir. Aranjman, kayıt, düzenleme ve son karar — hepsi aynı masada."
    },
    en: {
      ad: "Music production",
      ozet: "From idea to release.",
      url: "/en/sound/music-production/",
      baslik: "Music production — Pist Studio",
      aciklama: "Music production for independent artists and brands. 57 tracks we wrote, arranged or produced.",
      giris: "A song changes shape many times between the idea and the release. Arrangement, recording, editing and the final call — all at the same desk."
    }
  },
  {
    id: "ses-tasarimi",
    hue: "var(--c-orange)",
    gorsel: "/assets/img/is/ses-tasarimi.svg",
    kaynak: "filmler",
    tr: {
      ad: "Ses tasarımı",
      ozet: "Görsel işler, ürünler ve mekânlar için ses.",
      url: "/tr/ses/ses-tasarimi/",
      baslik: "Ses tasarımı — Pist Studio",
      aciklama: "Sinema filmleri, kısa filmler ve belgeseller için ses tasarımı ve müzik. 2013'ten bugüne 26 iş.",
      giris: "Görüntü tek başına yarım kalır. Aşağıdaki işlerde hem ses tasarımı hem müzik tarafı bize aitti."
    },
    en: {
      ad: "Sound design",
      ozet: "Sound for visuals, products and spaces.",
      url: "/en/sound/sound-design/",
      baslik: "Sound design — Pist Studio",
      aciklama: "Sound design and music for feature films, shorts and documentaries. 26 works since 2013.",
      giris: "An image alone is only half of it. On the work below we handled both the sound design and the music."
    }
  },
  {
    id: "miks",
    hue: "var(--c-lavender)",
    gorsel: "/assets/img/is/miks.svg",
    kaynak: "sarkilar:miks",
    tr: {
      ad: "Miks ve mastering",
      ozet: "Kaydı yayına hazır hale getirmek.",
      url: "/tr/ses/miks-mastering/",
      baslik: "Miks ve mastering — Pist Studio",
      aciklama: "Miks, mastering ve yayın formatları. Stüdyodan geçmiş 27 parça.",
      giris: "İyi bir kayıt, yanlış bir mikste kaybolur. Bu iş dengeyi kurmak ve kaydı gideceği yere hazırlamakla ilgili."
    },
    en: {
      ad: "Mixing and mastering",
      ozet: "Getting a recording ready to release.",
      url: "/en/sound/mixing-mastering/",
      baslik: "Mixing and mastering — Pist Studio",
      aciklama: "Mixing, mastering and delivery formats. 27 tracks that came through the studio.",
      giris: "A good recording gets lost in a bad mix. This work is about balance, and about preparing a record for wherever it is going."
    }
  }
];
