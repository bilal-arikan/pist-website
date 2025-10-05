// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar_wrap');
  const menu = document.querySelector('.navbar_menu');
  let menuButton = document.querySelector('.navbar_menu_button');

  // Create overlay for mobile menu
  let overlay = document.querySelector('.navbar_menu_overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'navbar_menu_overlay';
    document.body.appendChild(overlay);
  }
  // Add a container for overlay links
  let overlayLinks = document.createElement('div');
  overlayLinks.className = 'navbar_menu_overlay_links';
  overlay.appendChild(overlayLinks);

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
    overlay.classList.add('active');
    // Clone menu links into overlayLinks for background effect
    overlayLinks.innerHTML = '';
    const menuLinks = menu?.querySelectorAll('.navbar_link');
    if (menuLinks && menuLinks.length) {
      menuLinks.forEach(link => {
        const span = document.createElement('span');
        span.textContent = link.textContent.trim();
        overlayLinks.appendChild(span);
      });
    }
    document.documentElement.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu?.classList.remove('w--open');
    menuButton.classList.remove('is-active');
    menuButton.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('active');
    overlayLinks.innerHTML = '';
    document.documentElement.style.overflow = '';
  }

  menuButton.addEventListener('click', function(e) {
    const isOpen = menu?.classList.toggle('w--open');
    menuButton.classList.toggle('is-active');
    menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) {
      overlay.classList.add('active');
      document.documentElement.style.overflow = 'hidden';
    } else {
      overlay.classList.remove('active');
      document.documentElement.style.overflow = '';
    }
  });

  // Clicking the overlay closes the menu
  overlay.addEventListener('click', closeMenu);

  // Close menu when clicking on links inside
  menu?.addEventListener('click', function(e) {
    const target = e.target.closest('.navbar_link');
    if (target) closeMenu();
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