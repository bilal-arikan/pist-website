// Navbar dropdown and mobile menu functionality

// Global navbar initialization function
function initNavbar() {
  initDropdowns();
  initMobileMenu();
  initSmoothScroll();
}

// Initialize navbar functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
});

// Make initNavbar globally available
window.initNavbar = initNavbar;

// Dropdown functionality
function initDropdowns() {
  const dropdowns = document.querySelectorAll('.w-dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.w-dropdown-toggle');
    const list = dropdown.querySelector('.w-dropdown-list');
    
    if (toggle && list) {
      // Toggle dropdown on click
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close other dropdowns
        closeAllDropdowns();
        
        // Toggle current dropdown
        dropdown.classList.toggle('w--open');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('w--open');
        }
      });
      
      // Close dropdown on escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          dropdown.classList.remove('w--open');
        }
      });
    }
  });
}

// Close all dropdowns
function closeAllDropdowns() {
  const dropdowns = document.querySelectorAll('.w-dropdown');
  dropdowns.forEach(dropdown => {
    dropdown.classList.remove('w--open');
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const menuButton = document.querySelector('.w-nav-button');
  const menu = document.querySelector('.w-nav-menu');
  const nav = document.querySelector('.w-nav');
  const navbar = document.querySelector('.navbar_wrap');
  
  if (menuButton && menu) {
    // Add multiple event listeners for better compatibility
    ['click', 'touchend'].forEach(eventType => {
      menuButton.addEventListener(eventType, function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Mobile menu button clicked'); // Debug log
        
        // Toggle mobile menu
        const isOpen = menu.classList.contains('w--open');
        
        if (isOpen) {
          menu.classList.remove('w--open');
          nav.classList.remove('w--open');
          if (navbar) navbar.classList.remove('w--open');
        } else {
          menu.classList.add('w--open');
          nav.classList.add('w--open');
          if (navbar) navbar.classList.add('w--open');
          closeAllDropdowns();
        }
      });
    });
    
    // Add touch support for mobile
    menuButton.addEventListener('touchstart', function(e) {
      e.preventDefault();
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
        menu.classList.remove('w--open');
        nav.classList.remove('w--open');
        if (navbar) navbar.classList.remove('w--open');
      }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        menu.classList.remove('w--open');
        nav.classList.remove('w--open');
        if (navbar) navbar.classList.remove('w--open');
      }
    });
    
    // Close mobile menu when window is resized to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 991) {
        menu.classList.remove('w--open');
        nav.classList.remove('w--open');
      }
    });
  }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu after navigation
        const menu = document.querySelector('.w-nav-menu');
        const nav = document.querySelector('.w-nav');
        if (menu && nav) {
          menu.classList.remove('w--open');
          nav.classList.remove('w--open');
        }
      }
    });
  });
}

// Initialize smooth scroll
document.addEventListener('DOMContentLoaded', function() {
  initSmoothScroll();
});