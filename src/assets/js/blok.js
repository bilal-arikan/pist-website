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

  var SURE = 620;       // kilit süresi — animasyon bitmeden ikinci hamle almasın
  var PAY = 24;         // blok "sığıyor" sayılırken bırakılan pay
  var kilit = false;
  var son = 0;

  function merkezi(el) {
    var r = el.getBoundingClientRect();
    return window.scrollY + r.top + r.height / 2 - window.innerHeight / 2;
  }

  /* Ekran ortasına en yakın blok */
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

  function git(i) {
    if (i < 0 || i > bloklar.length - 1) return false;
    var y = Math.max(0, Math.round(merkezi(bloklar[i])));
    var enFazla = document.documentElement.scrollHeight - window.innerHeight;
    kilit = true;
    window.scrollTo({ top: Math.min(y, enFazla), behavior: 'smooth' });
    setTimeout(function () { kilit = false; }, SURE);
    return true;
  }

  function devrediMi() {
    var a = document.activeElement;
    if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return true;
    var menu = document.getElementById('menu');
    if (menu && menu.classList.contains('acik')) return true;
    return false;
  }

  /* Şu an içinde bulunduğumuz blok ekrana sığmıyorsa karışma */
  function serbestMi() {
    var b = bloklar[simdiki()];
    return b && !sigiyorMu(b);
  }

  window.addEventListener('wheel', function (e) {
    if (devrediMi() || serbestMi()) return;
    if (Math.abs(e.deltaY) < 4) return;
    e.preventDefault();
    var t = Date.now();
    if (kilit || t - son < 120) return;
    son = t;
    git(simdiki() + (e.deltaY > 0 ? 1 : -1));
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
    if (Math.abs(d) < 46 || kilit) return;
    git(simdiki() + (d > 0 ? 1 : -1));
  }, { passive: true });
})();
