// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar_wrap');
  const menu = document.querySelector('.navbar_menu');
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
    menu?.classList.add('w--open');
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
    menu?.classList.remove('w--open');
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
    if (menu.classList.contains('w--open')) {
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
    if (menuOverlay && e.target === menuOverlay && menu.classList.contains('w--open')) {
      closeMenu();
      return;
    }
    if (!isInside && menu.classList.contains('w--open')) closeMenu();
  });

  // Close on escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu?.classList.contains('w--open')) closeMenu();
  });
});