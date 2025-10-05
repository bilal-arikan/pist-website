// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar_wrap');
  const menu = document.querySelector('.navbar_menu');
  let menuButton = document.querySelector('.navbar_menu_button');

  // Create overlay for mobile menu
  let menuOverlay = document.querySelector('.navbar_menu_overlay');
  if (!menuOverlay) {
    menuOverlay = document.createElement('div');
    menuOverlay.className = 'navbar_menu_overlay';
    menuOverlay.setAttribute('tabindex', '-1');
    menuOverlay.style.display = 'none';
    document.body.appendChild(menuOverlay);
  }

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
    menuOverlay.style.display = 'block';
    setTimeout(() => menuOverlay.classList.add('is-active'), 10);
  }

  function closeMenu() {
    menu?.classList.remove('w--open');
    menuButton.classList.remove('is-active');
    menuButton.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    menuOverlay.classList.remove('is-active');
    setTimeout(() => { menuOverlay.style.display = 'none'; }, 250);
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
    if (e.target === menuOverlay && menu.classList.contains('w--open')) {
      closeMenu();
      return;
    }
    const isInside = menu.contains(e.target) || menuButton.contains(e.target) || document.querySelector('.navbar_left_section')?.contains(e.target);
    if (!isInside && menu.classList.contains('w--open')) closeMenu();
  });

  // Close on escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu?.classList.contains('w--open')) closeMenu();
  });
});