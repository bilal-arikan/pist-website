// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar_wrap');
  const menuPanel = document.querySelector('.navbar_menu_panel');
  const menu = menuPanel ? menuPanel.querySelector('.navbar_menu') : document.querySelector('.navbar_menu');
  let menuButton = document.querySelector('.navbar_menu_button');

  // Create a menu button if it doesn't exist
  if (!menuButton) {
    menuButton = document.createElement('button');
    menuButton.className = 'navbar_menu_button';
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Menüyü aç');
    menuButton.innerHTML = '<span class="menu-icon" aria-hidden="true"></span>';
    const left = document.querySelector('.navbar_left_section');
    left && left.insertAdjacentElement('afterend', menuButton);
  }

  // Create overlay for mobile menu
  let menuOverlay = document.querySelector('.navbar_menu_overlay');
  if (!menuOverlay) {
    menuOverlay = document.createElement('div');
    menuOverlay.className = 'navbar_menu_overlay';
    document.body.appendChild(menuOverlay);
  }

  function setScrollClass() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

  setScrollClass();
  window.addEventListener('scroll', setScrollClass);


  function openMenu() {
    menuPanel?.classList.add('active');
    menuButton.classList.add('is-active');
    menuButton.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    if (navbar) {
      navbar.style.backgroundColor = 'rgba(170, 59, 127, 0.97)';
      navbar.style.backdropFilter = 'blur(15px)';
    }
    if (menuOverlay) {
      menuOverlay.classList.add('active');
    }
  }

  function closeMenu() {
    menuPanel?.classList.remove('active');
    menuButton.classList.remove('is-active');
    menuButton.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    if (navbar) {
      navbar.style.backgroundColor = '';
      navbar.style.backdropFilter = '';
    }
    if (menuOverlay) {
      menuOverlay.classList.remove('active');
    }
  }


  // Tek bir toggle fonksiyonu ile menü ve overlay aç/kapa
  function toggleMenu() {
    if (menuPanel && menuPanel.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuButton.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
  });

  // Overlay'e tıklayınca menüyü kapat
  if (menuOverlay) {
    menuOverlay.addEventListener('click', function(e) {
      closeMenu();
    });
  }

  // Close menu when clicking on links inside
  menu?.addEventListener('click', function(e) {
    const target = e.target.closest('.navbar_link');
    if (target) closeMenu();
  });

  // Close when clicking outside the menu or on overlay
  document.addEventListener('click', function(e) {
    if (!menu || !menuButton) return;
    const isInside = menu.contains(e.target) || menuButton.contains(e.target) || document.querySelector('.navbar_left_section')?.contains(e.target);
    // If clicked directly on overlay while menu is open
    if (menuOverlay && e.target === menuOverlay && (menuPanel && menuPanel.classList.contains('active'))) {
      closeMenu();
      return;
    }
    // Clicked outside while menu is open
    if (!isInside && (menuPanel && menuPanel.classList.contains('active'))) closeMenu();
  });

  // Close on escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && (menuPanel && menuPanel.classList.contains('active'))) closeMenu();
  });

  // Cookie consent banner (richer UI with preferences)
  (function setupCookieConsent(){
    // If already accepted, do nothing
    const acceptedLS = localStorage.getItem('cookieConsentAccepted') === 'true';
    const acceptedCookie = document.cookie.split('; ').some(c => c.startsWith('cookie_consent=1'));
    if (acceptedLS || acceptedCookie) return;

    // Inject minimal styles once
    if (!document.getElementById('cookie-consent-styles')) {
      const style = document.createElement('style');
      style.id = 'cookie-consent-styles';
      style.textContent = `
        .cookie-consent{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);width:calc(100% - 32px);max-width:980px;background:linear-gradient(180deg,#111,#0a0a0a);color:#fff;border:1px solid rgba(255,255,255,.12);border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,.4);padding:0;display:flex;flex-direction:column;z-index:9998;opacity:0;translate:0 12px;transition:opacity .3s ease, translate .3s ease}
        .cookie-consent.is-visible{opacity:1;translate:0}
        .cookie-consent_inner{display:flex;gap:16px;align-items:center;padding:16px}
        .cookie-consent_icon{width:36px;height:36px;border-radius:8px;display:grid;place-items:center;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08)}
        .cookie-consent_content{display:flex;flex-direction:column;gap:4px}
        .cookie-consent_title{margin:0;font-size:1.05rem;font-weight:700}
        .cookie-consent_text{margin:0;line-height:1.5;opacity:.95}
        .cookie-consent_text a{color:#fff;text-decoration:underline;text-underline-offset:2px}
        .cookie-consent_actions{margin-left:auto;display:flex;gap:10px;flex-wrap:wrap}
  .cookie-consent_button{appearance:none;background:#aa3b7f;border:1px solid rgba(255,255,255,.15);color:#fff;border-radius:10px;padding:10px 14px;font-weight:700;cursor:pointer;font-size:.95rem}
        .cookie-consent_button.secondary{background:transparent}
        .cookie-consent_button:hover{filter:brightness(1.05)}
        .cookie-consent_button:focus{outline:2px solid #fff;outline-offset:2px}
        .cookie-consent_prefs{display:none;padding:14px 16px;border-top:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04)}
        .cookie-consent_prefs.is-open{display:block}
        .cookie-pref-row{display:flex;align-items:flex-start;gap:10px;padding:8px 0}
        .cookie-pref-row label{display:flex;gap:8px;align-items:flex-start;cursor:pointer}
        .cookie-pref-row small{opacity:.8}
        .cookie-consent_prefs_actions{display:flex;gap:10px;justify-content:flex-end;margin-top:10px}
        @media (max-width:600px){.cookie-consent{flex-direction:column;align-items:stretch;text-align:center}.cookie-consent_actions{margin-left:0;justify-content:center}.cookie-consent_button{width:100%;font-size:.9rem}}
      `;
      document.head.appendChild(style);
    }

    // Create banner
    const banner = document.createElement('div');
    banner.className = 'cookie-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.innerHTML = `
      <div class="cookie-consent_inner">
        <div class="cookie-consent_icon" aria-hidden="true">🍪</div>
        <div class="cookie-consent_content">
          <h3 class="cookie-consent_title">Çerez Tercihlerin</h3>
          <p class="cookie-consent_text">Deneyimini geliştirmek, site güvenliğini sağlamak ve performansı ölçmek için çerezler kullanıyoruz. Daha fazla bilgi için <a href="/pages/cerez-politikasi.html" target="_blank" rel="noopener">Çerez Politikası</a>.</p>
        </div>
        <div class="cookie-consent_actions">
          <button class="cookie-consent_button secondary" type="button" data-action="prefs">Ayarlar</button>
          <button class="cookie-consent_button" type="button" data-action="accept-all">Tümünü Kabul Et</button>
        </div>
      </div>
      <div class="cookie-consent_prefs" aria-hidden="true">
        <div class="cookie-pref-row">
          <label>
            <input type="checkbox" checked disabled aria-disabled="true"/>
            <div>
              <div><strong>Gerekli</strong> — Sitenin çalışması için zorunlu</div>
              <small>Oturum ve güvenlik gibi temel işlevleri sağlar.</small>
            </div>
          </label>
        </div>
        <div class="cookie-pref-row">
          <label>
            <input type="checkbox" data-pref="analytics"/>
            <div>
              <div><strong>Analitik</strong> — Kullanım ve performans ölçümü</div>
              <small>Hangi sayfaların daha çok ilgi gördüğünü anlamamıza yardımcı olur.</small>
            </div>
          </label>
        </div>
        <div class="cookie-pref-row">
          <label>
            <input type="checkbox" data-pref="marketing"/>
            <div>
              <div><strong>Pazarlama</strong> — İçerikleri kişiselleştirme</div>
              <small>Size daha uygun içerik ve teklifleri göstermek için kullanılır.</small>
            </div>
          </label>
        </div>
        <div class="cookie-consent_prefs_actions">
          <button class="cookie-consent_button secondary" type="button" data-action="save">Kaydet</button>
          <button class="cookie-consent_button" type="button" data-action="accept-all-2">Tümünü Kabul Et</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);

    // Show with small transition after paint
    requestAnimationFrame(() => banner.classList.add('is-visible'));

    const prefsEl = banner.querySelector('.cookie-consent_prefs');
    const analyticsCb = banner.querySelector('input[data-pref="analytics"]');
    const marketingCb = banner.querySelector('input[data-pref="marketing"]');

    function hideBanner() {
      banner.classList.remove('is-visible');
      setTimeout(() => banner.remove(), 350);
    }

    function savePrefs({acceptAll=false}={}) {
      const prefs = {
        necessary: true,
        analytics: acceptAll ? true : !!analyticsCb?.checked,
        marketing: acceptAll ? true : !!marketingCb?.checked,
        timestamp: Date.now()
      };
      try {
        localStorage.setItem('cookieConsentAccepted', 'true');
        localStorage.setItem('cookieConsentPrefs', JSON.stringify(prefs));
      } catch(e) {}
      const oneYear = 60*60*24*365;
      document.cookie = `cookie_consent=1; max-age=${oneYear}; path=/`;
      document.cookie = `cookie_consent_prefs=${encodeURIComponent(JSON.stringify(prefs))}; max-age=${oneYear}; path=/`;
      // Fire an event in case other scripts want to react
      document.dispatchEvent(new CustomEvent('cookie-consent:accepted', { detail: prefs }));
      hideBanner();
    }

    banner.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const action = btn.getAttribute('data-action');
      if (action === 'prefs') {
        const isOpen = prefsEl.classList.toggle('is-open');
        prefsEl.setAttribute('aria-hidden', String(!isOpen));
      } else if (action === 'accept-all' || action === 'accept-all-2') {
        savePrefs({acceptAll:true});
      } else if (action === 'save') {
        savePrefs({acceptAll:false});
      }
    });
  })();
});