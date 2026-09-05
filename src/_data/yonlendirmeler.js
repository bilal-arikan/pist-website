/* Eski site URL'leri → yeni karşılıkları.
 *
 * Şirket hafızası (A04) açıkça "tüm eski sayfaları tek hedefe topluca
 * yönlendirme" diyor. Bu yüzden buraya SADECE gerçek bir karşılığı olan
 * sayfalar giriyor. Karşılığı olmayanlar 404'e düşüyor — iki dilli 404
 * sayfamız kullanıcıyı doğru yere taşıyor. Google da hedefsiz toplu
 * yönlendirmeyi zaten "soft 404" sayıyor.
 *
 * Karşılığı olmadığı için bilerek yönlendirilmeyenler (12 sayfa):
 *   boyleyken-elifdogar-minikonser, calendars, event-detail-template,
 *   event-detail, events, halloween-partisi, music-career-coaching,
 *   music-career-coaching-application, muzikal-kocluk, nefes-atolyesi,
 *   onli-seminer1, pist-koro-landing
 * Hepsi kapanan fiziksel stüdyonun etkinlik ve eğitim sayfaları (D12).
 */
export default [
  { eski: "/pages/contact.html",           yeni: "/tr/iletisim/",          not: "İletişim" },
  { eski: "/pages/who-we-are.html",        yeni: "/tr/hakkinda/",          not: "Hakkında" },
  { eski: "/pages/services.html",          yeni: "/tr/ses/",               not: "Hizmetler müzik odaklıydı → Ses" },
  { eski: "/pages/duyurular.html",         yeni: "/tr/blog/",              not: "Duyurular → Blog" },
  { eski: "/pages/cerez-politikasi.html",  yeni: "/tr/aydinlatma-metni/",  not: "Çerez politikası → Aydınlatma metni" },
  { eski: "/pages/location-pist.html",     yeni: "/tr/hakkinda/",          not: "Kapanan mekân → tarihçe" },
];
