/* Blok kaydırma — çizgiyle ayrılan bölümler arasında tek hamlede geçiş.
 *
 * Her kaydırma hareketi bir sonraki ya da önceki bloğu ekranın dikey
 * ortasına oturtur; serbest kaydırma yerine bloktan bloğa geçilir.
 *
 * Kendini şu koşullarda devre dışı bırakır:
 *   - kullanıcı azaltılmış hareket istemişse
 *   - sayfada ikiden az blok varsa (blog listesi, iletişim, yazı sayfaları)
 *   - blok ekrana sığmıyorsa (o blok normal kayar, içeriği kırpılmasın)
 *   - odak bir form alanındaysa ya da mobil menü açıksa
 *
 * Klavye ve kaydırma çubuğu her zaman serbest bırakılıyor: kaçış yolu kalsın.
 *
 * --- Akıcılık notları (önceki sürümdeki takılmanın sebepleri) ---
 * 1. Eski sürüm her tekerlek olayında preventDefault çağırıp SONRA kilidi
 *    kontrol ediyordu. Kilit süresince girdi yutuluyor ama hiçbir şey
 *    olmuyordu — 620 ms'lik ölü pencere "takıldı" hissi veriyordu.
 * 2. behavior:'smooth' süresi tarayıcıya bağlı ve ölçülemiyor; sabit 620 ms
 *    kilitle eşleşmiyordu. Artık kendi rAF tween'imiz var, süre kesin.
 * 3. Trackpad'de tek bir hamle ~1 saniye boyunca onlarca olay üretiyor.
 *    Momentum kuyruğu ikinci bir sıçrama tetikliyordu. Şimdi hamle
 *    "sessizleşene" kadar yeniden kurulmuyor.
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

  var SURE = 520;        // tween süresi (ms) — kilit tam buna eşit
  var PAY = 24;          // blok "sığıyor" sayılırken bırakılan pay
  var ESIK = 34;         // hamle sayılması için gereken toplam delta
  var SESSIZ = 90;       // momentum kuyruğunun bitmesi için beklenen sessizlik

  var animasyon = null;  // çalışan tween
  var birikim = 0;       // hamle içinde toplanan delta
  var sonOlay = 0;       // en son tekerlek olayının zamanı
  var kurulu = true;     // yeni hamle kabul edilebilir mi

  function merkezi(el) {
    var r = el.getBoundingClientRect();
    return window.scrollY + r.top + r.height / 2 - window.innerHeight / 2;
  }

  function simdiki() {
    var orta = window.scrollY + window.innerHeight / 2;
    var enIyi = 0, enKisa = Infinity;
    for (var i = 0; i < bloklar.length; i++) {
      var r = bloklar[i].getBoundingClientRect();
      var m = window.scrollY + r.top + r.height / 2;
      var d = Math.abs(m - orta);
      if (d < enKisa) { enKisa = d; enIyi = i; }
    }
    return enIyi;
  }

  function sigiyorMu(el) {
    return el.getBoundingClientRect().height <= window.innerHeight - PAY;
  }

  /* Kendi tween'imiz: süre kesin, eğri kontrollü, iptal edilebilir.
     easeInOutCubic — başta ve sonda yumuşak, ortada hızlı. */
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

  function git(i) {
    if (i < 0 || i > bloklar.length - 1) return false;
    var enFazla = document.documentElement.scrollHeight - window.innerHeight;
    kaydir(Math.min(Math.max(0, Math.round(merkezi(bloklar[i]))), enFazla));
    return true;
  }

  function devrediMi() {
    var a = document.activeElement;
    if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return true;
    var menu = document.getElementById('menu');
    if (menu && menu.classList.contains('acik')) return true;
    return false;
  }

  function serbestMi() {
    var b = bloklar[simdiki()];
    return b && !sigiyorMu(b);
  }

  window.addEventListener('wheel', function (e) {
    if (devrediMi() || serbestMi()) return;

    /* Sayfanın kendi kaydırmasını her zaman durduruyoruz — yoksa tween ile
       yerel kaydırma birbiriyle yarışıyor ve titreme oluyor. */
    e.preventDefault();

    var simdi = Date.now();

    /* Önceki hamlenin momentum kuyruğu bitti mi? */
    if (!kurulu && simdi - sonOlay > SESSIZ) { kurulu = true; birikim = 0; }
    sonOlay = simdi;
    if (!kurulu) return;

    birikim += e.deltaY;
    if (Math.abs(birikim) < ESIK) return;

    var yon = birikim > 0 ? 1 : -1;
    birikim = 0;
    kurulu = false;                       // kuyruk sessizleşene kadar kapalı
    git(simdiki() + yon);
  }, { passive: false });

  /* Dokunmatik: dikey kaydırma hareketi bir blok ilerletir */
  var y0 = null;
  window.addEventListener('touchstart', function (e) {
    y0 = e.touches.length === 1 ? e.touches[0].clientY : null;
  }, { passive: true });

  window.addEventListener('touchend', function (e) {
    if (y0 === null || devrediMi() || serbestMi()) { y0 = null; return; }
    var y1 = (e.changedTouches[0] || {}).clientY;
    var d = y0 - y1;
    y0 = null;
    if (Math.abs(d) < 46 || animasyon) return;
    git(simdiki() + (d > 0 ? 1 : -1));
  }, { passive: true });

  /* Klavye ve kaydırma çubuğu serbest: kullanıcı animasyonu böler. */
  window.addEventListener('keydown', function () {
    if (animasyon) { cancelAnimationFrame(animasyon); animasyon = null; }
  }, { passive: true });
})();
