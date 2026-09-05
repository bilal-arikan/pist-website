/* İletişim formu — doğrulama ve mailto ile teslim
 *
 * Form kendi başına hiçbir yere veri göndermiyor: alanları doğrulayıp
 * kullanıcının kendi e-posta uygulamasını mesaj doldurulmuş halde açıyor.
 * Üçüncü taraf servis olmadığı için KVKK m.9 yurt dışına aktarım da,
 * açık rıza kutucuğu da gerekmiyor.
 *
 * Arka uç bağlanacaksa: dogrula() aynen kalır, teslim() değişir.
 */
(function () {
  var form = document.getElementById('mesaj');
  if (!form) return;

  var ADRES = form.getAttribute('data-mailto') || '';

  var mesaj = document.getElementById('mesajmetni');
  var sayi = document.getElementById('sayi');
  var btn = document.getElementById('gonderBtn');
  var dGonder = document.getElementById('d-gonder');
  var dOk = document.getElementById('d-ok');
  var dHata = document.getElementById('d-hata');

  mesaj.addEventListener('input', function () { sayi.textContent = mesaj.value.length; });

  function alan(ad) { return document.querySelector('.alan[data-ad="' + ad + '"]'); }
  function deger(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }

  var KURAL = {
    ad:     function () { return deger('ad').length >= 2; },
    eposta: function () { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(deger('eposta')); },
    konu:   function () { return !!deger('konu'); },
    mesaj:  function () { return mesaj.value.trim().length >= 20; }
  };

  function dogrula() {
    var ok = true;
    for (var ad in KURAL) {
      var iyi = KURAL[ad]();
      alan(ad).classList.toggle('gecersiz', !iyi);
      if (!iyi) ok = false;
    }
    return ok;
  }

  ['ad', 'eposta', 'konu'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', function () { if (alan(id).classList.contains('gecersiz')) dogrula(); });
    if (el) el.addEventListener('change', function () { if (alan(id).classList.contains('gecersiz')) dogrula(); });
  });
  mesaj.addEventListener('input', function () { if (alan('mesaj').classList.contains('gecersiz')) dogrula(); });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    dOk.classList.remove('acik'); dHata.classList.remove('acik');

    if (!dogrula()) {
      var ilk = form.querySelector('.alan.gecersiz input, .alan.gecersiz select, .alan.gecersiz textarea');
      if (ilk) ilk.focus();
      return;
    }

    // bot tuzağı doluysa sessizce başarılı görün, hiçbir şey yapma
    var tuzak = form.querySelector('input[name="website"]');
    if (tuzak && tuzak.value) { dOk.classList.add('acik'); return; }

    if (!ADRES) { dHata.classList.add('acik'); return; }

    var govde = deger('ad') + ' <' + deger('eposta') + '>\n\n' + mesaj.value.trim();
    var url = 'mailto:' + ADRES +
              '?subject=' + encodeURIComponent(deger('konu')) +
              '&body=' + encodeURIComponent(govde);

    dGonder.classList.add('acik');
    try {
      window.location.href = url;
      dGonder.classList.remove('acik');
      dOk.classList.add('acik');
    } catch (e) {
      dGonder.classList.remove('acik');
      dHata.classList.add('acik');
    }
  });
})();
