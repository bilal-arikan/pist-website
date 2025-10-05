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
    menuOverlay.style.display = 'none';
    menuOverlay.style.position = 'fixed';
    menuOverlay.style.top = '0';
    menuOverlay.style.left = '0';
    menuOverlay.style.width = '100vw';
    menuOverlay.style.height = '100vh';
    menuOverlay.style.background = 'rgba(0,0,0,0.5)';
    menuOverlay.style.zIndex = '1049';
    menuOverlay.style.transition = 'opacity 0.2s';
    menuOverlay.style.opacity = '0';
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
      navbar.style.backgroundColor = 'rgba(0,0,0,0.97)';
      navbar.style.backdropFilter = 'blur(15px)';
    }
    if (menuOverlay) {
      menuOverlay.style.display = 'block';
      setTimeout(() => { menuOverlay.style.opacity = '1'; }, 10);
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
      menuOverlay.style.opacity = '0';
      setTimeout(() => { menuOverlay.style.display = 'none'; }, 200);
    }
  }

  menuButton.addEventListener('click', function(e) {
    const isOpen = menu?.classList.toggle('w--open');
    menuButton.classList.toggle('is-active');
    menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) document.documentElement.style.overflow = 'hidden'; else document.documentElement.style.overflow = '';
  });

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