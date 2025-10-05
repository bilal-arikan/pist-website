// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar_wrap');
  const menu = document.querySelector('.navbar_menu');
  const overlay = document.querySelector('.navbar_menu_overlay');
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
    overlay?.classList.add('w--open');
    document.documentElement.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu?.classList.remove('w--open');
    menuButton.classList.remove('is-active');
    menuButton.setAttribute('aria-expanded', 'false');
    overlay?.classList.remove('w--open');
    document.documentElement.style.overflow = '';
  }

  menuButton.addEventListener('click', function(e) {
    const isOpen = menu?.classList.toggle('w--open');
    menuButton.classList.toggle('is-active');
    menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (overlay) overlay.classList.toggle('w--open', isOpen);
    if (isOpen) document.documentElement.style.overflow = 'hidden'; else document.documentElement.style.overflow = '';
  });

  // Close menu when clicking on links inside
  menu?.addEventListener('click', function(e) {
    const target = e.target.closest('.navbar_link');
    if (target) closeMenu();
  });

  // Close when clicking overlay
  overlay?.addEventListener('click', function(e) {
    closeMenu();
  });

  // Close when clicking outside the menu
  document.addEventListener('click', function(e) {
    if (!menu || !menuButton) return;
    const isInside = menu.contains(e.target) || menuButton.contains(e.target) || document.querySelector('.navbar_left_section')?.contains(e.target);
    if (!isInside && menu.classList.contains('w--open')) closeMenu();
  });

  // Close on escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu?.classList.contains('w--open')) closeMenu();
  });
});