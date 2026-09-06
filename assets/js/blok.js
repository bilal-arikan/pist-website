/* Blok kaydırma — çizgiyle ayrılan bölümler arasında tek hamlede geçiş.
 *
 * Ekrana SIĞAN bloklarda kaydırma hareketi bir sonraki/önceki bloğa geçirir.
 * Ekrana SIĞMAYAN bloklarda hiç karışmaz — kullanıcı serbestçe okur.
 *
 * Devre dışı kaldığı durumlar:
 *   - kullanıcı azaltılmış hareket istemişse
 *   - sayfada ikiden az blok varsa
 *   - içinde bulunulan blok ekrana sığmıyorsa
 *   - odak bir form alanındaysa ya da mobil menü açıksa
 *
 * --- Neden bu sürüm ---
 * Önceki iki sürümde kaydırma kilitlenebiliyordu:
 *
 * 1. "Sessizlik" koşuluna bağlı yeniden kurulma (kurulu = true ancak olaylar
 *    90 ms susarsa) kesintisiz kaydırmada ASLA gerçekleşmiyordu; her olay
 *    sonOlay'ı tazeliyor, kilit hiç açılmıyor ve preventDefault sayfayı
 *    tamamen durduruyordu. Uzun listelerde kaçınılmazdı.
 *    Artık yeniden kurulma yalnızca ZAMANA bağlı — kullanıcı ne yaparsa
 *    yapsın BEKLE ms sonra kesin açılıyor.
 *
 * 2. Hedef blok ekrana sığmıyorsa ortalanıyordu; 26 kayıtlık bir listenin
 *    başı atlanıyordu. Artık uzun bloğa aşağı inerken başına, yukarı
 *    çıkarken sonuna gidiliyor — okuma yönü korunuyor.
 *
 * 3. "En yakın merkez" ile blok seçimi, uzun bir bloğun içindeyken komşu
 *    kısa bloğu seçebiliyordu ve serbest kaydırma yanlışlıkla kesiliyordu.
 *    Artık önce ekran ortasını İÇEREN blok aranıyor.
 */
(function () {
  var azalt = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (azalt && azalt.matches) return;

  var bloklar = [].slice.call(document.querySelectorAll('main .section'));
  if (bloklar.length < 2) return;

  /* Alt bilgi de bir durak: yoksa son bloktan sonra tekerlekle footer'a
     ulaşılamıyor ve oradaki bağlantılar erişilemez kalıyordu. */
  var alt = document.querySelector('body > footer');
  if (alt) bloklar.push(alt);

  var SURE = 520;   // tween süresi (ms)
  var BEKLE = 640;  // hamleler arası en kısa süre — momentum kuyruğunu yutar
  var PAY = 24;     // blok "sığıyor" sayılırken bırakılan pay
  var ESIK = 34;    // hamle sayılması için gereken toplam delta
  var UST = 72;     // uzun bloğun başına giderken bırakılan üst boşluk

  var animasyon = null;
  var birikim = 0;
  var sonHamle = 0;

  function ustu(el) { return window.scrollY + el.getBoundingClientRect().top; }
  function sigiyorMu(el) { return el.getBoundingClientRect().height <= window.innerHeight - PAY; }

  /* Ekran ortasını içeren blok. Hiçbirinin içinde değilsek en yakın merkezli. */
  function simdiki() {
    var orta = window.scrollY + window.innerHeight / 2;
    for (var i = 0; i < bloklar.length; i++) {
      var r = bloklar[i].getBoundingClientRect();
      var u = window.scrollY + r.top;
      if (orta >= u && orta < u + r.height) return i;
    }
    var enIyi = 0, enKisa = Infinity;
    for (var j = 0; j < bloklar.length; j++) {
      var q = bloklar[j].getBoundingClientRect();
      var d = Math.abs(window.scrollY + q.top + q.height / 2 - orta);
      if (d < enKisa) { enKisa = d; enIyi = j; }
    }
    return enIyi;
  }

  /* Sığan blok ortalanır.
     Sığmayan blokta okuma yönü korunur: aşağı inerken başına, yukarı
     çıkarken sonuna gidilir. Yoksa listenin sonundan footer'a inip geri
     dönünce 21.000 pikselin en başına fırlıyordu. */
  function hedefY(el, yon) {
    var r = el.getBoundingClientRect();
    if (sigiyorMu(el)) return ustu(el) + r.height / 2 - window.innerHeight / 2;
    if (yon < 0) return ustu(el) + r.height - window.innerHeight + UST;
    return ustu(el) - UST;
  }

  function egri(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  function kaydir(hedef) {
    var bas = window.scrollY;
    var yol = hedef - bas;
    if (Math.abs(yol) < 2) return;
    var t0 = null;
    if (animasyon) cancelAnimationFrame(animasyon);
    animasyon = requestAnimationFrame(function adim(zaman) {
      if (t0 === null) t0 = zaman;
      var p = Math.min(1, (zaman - t0) / SURE);
      window.scrollTo(0, Math.round(bas + yol * egri(p)));
      if (p < 1) animasyon = requestAnimationFrame(adim);
      else animasyon = null;
    });
  }

  function git(i, yon) {
    if (i < 0 || i > bloklar.length - 1) return;
    var enFazla = document.documentElement.scrollHeight - window.innerHeight;
    kaydir(Math.min(Math.max(0, Math.round(hedefY(bloklar[i], yon))), enFazla));
  }

  function devrediMi() {
    var a = document.activeElement;
    if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return true;
    var menu = document.getElementById('menu');
    return !!(menu && menu.classList.contains('acik'));
  }

  window.addEventListener('wheel', function (e) {
    if (devrediMi()) return;

    var i = simdiki();
    /* Uzun blok: hiç karışmıyoruz, sayfa kendi kaydırmasıyla akıyor. */
    if (!sigiyorMu(bloklar[i])) { birikim = 0; return; }

    /* Buradan sonrası bize ait — yerel kaydırma tween ile yarışmasın. */
    e.preventDefault();

    var simdi = Date.now();
    /* Yalnızca ZAMANA bağlı: kullanıcı ne yaparsa yapsın BEKLE sonra açılır. */
    if (simdi - sonHamle < BEKLE) { birikim = 0; return; }

    birikim += e.deltaY;
    if (Math.abs(birikim) < ESIK) return;

    var yon = birikim > 0 ? 1 : -1;
    birikim = 0;
    sonHamle = simdi;
    git(i + yon, yon);
  }, { passive: false });

  /* Dokunmatik */
  var y0 = null;
  window.addEventListener('touchstart', function (e) {
    y0 = e.touches.length === 1 ? e.touches[0].clientY : null;
  }, { passive: true });

  window.addEventListener('touchend', function (e) {
    if (y0 === null || devrediMi()) { y0 = null; return; }
    var i = simdiki();
    if (!sigiyorMu(bloklar[i])) { y0 = null; return; }
    var d = y0 - ((e.changedTouches[0] || {}).clientY || y0);
    y0 = null;
    var simdi = Date.now();
    if (Math.abs(d) < 46 || simdi - sonHamle < BEKLE) return;
    var ty = d > 0 ? 1 : -1;
    sonHamle = simdi;
    git(i + ty, ty);
  }, { passive: true });

  /* Klavye ve kaydırma çubuğu her zaman serbest: kullanıcı animasyonu böler. */
  window.addEventListener('keydown', function () {
    if (animasyon) { cancelAnimationFrame(animasyon); animasyon = null; }
    sonHamle = 0;
  }, { passive: true });
})();
