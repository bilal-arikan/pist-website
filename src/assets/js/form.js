/* İletişim formu — doğrulama ve gönderim */
(function () {
  var form = document.getElementById('mesaj');
  if (!form) return;

  // TODO: form arka ucu kurulunca gerçek adres yazılacak
  var ENDPOINT = '';

  var mesaj = document.getElementById('mesajmetni');
  var sayi = document.getElementById('sayi');
  var btn = document.getElementById('gonderBtn');
  var dGonder = document.getElementById('d-gonder');
  var dOk = document.getElementById('d-ok');
  var dHata = document.getElementById('d-hata');

  mesaj.addEventListener('input', function () { sayi.textContent = mesaj.value.length; });

  function alan(ad) { return document.querySelector('.alan[data-ad="' + ad + '"]'); }

  var KURAL = {
    ad:     function () { return document.getElementById('ad').value.trim().length >= 2; },
    eposta: function () { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(document.getElementById('eposta').value.trim()); },
    konu:   function () { return !!document.getElementById('konu').value; },
    mesaj:  function () { return mesaj.value.trim().length >= 20; },
    onay:   function () { return document.getElementById('onay').checked; }
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

  ['ad', 'eposta', 'konu', 'onay'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('input', function () { if (alan(id === 'onay' ? 'onay' : id).classList.contains('gecersiz')) dogrula(); });
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

    if (!ENDPOINT) {
      dHata.textContent = 'Form arka ucu henüz bağlanmadı.';
      dHata.classList.add('acik');
      return;
    }

    btn.disabled = true;
    dGonder.classList.add('acik');

    fetch(ENDPOINT, { method: 'POST', body: new FormData(form) })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r; })
      .then(function () {
        dGonder.classList.remove('acik');
        dOk.classList.add('acik');
        form.reset(); sayi.textContent = '0';
      })
      .catch(function () {
        dGonder.classList.remove('acik');
        dHata.classList.add('acik');
      })
      .finally(function () { btn.disabled = false; });
  });
})();
