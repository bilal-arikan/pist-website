// Navbar scroll behavior for all pages

// Initialize navbar scroll behavior
function initNavbarScroll(options = {}) {
  const {
    scrollThreshold = 50,
    backgroundColor = 'rgba(255, 255, 255, 0.95)',
    transparentBg = 'transparent',
    addBlur = true,
    addShadow = true,
    smoothTransition = true
  } = options;

  const navbar = document.querySelector('.navbar_wrap');
  if (!navbar) return;

  let ticking = false;

  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(function() {
        if (window.scrollY > scrollThreshold) {
          // Apply background when scrolled
          navbar.style.backgroundColor = backgroundColor;
          if (addBlur) navbar.style.backdropFilter = 'blur(10px)';
          if (addShadow) navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
          navbar.style.transform = 'translateY(0)';
        } else {
          // Make it transparent at the top
          navbar.style.backgroundColor = transparentBg;
          if (addBlur) navbar.style.backdropFilter = 'none';
          if (addShadow) navbar.style.boxShadow = 'none';
          navbar.style.transform = 'translateY(0)';
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  // Set initial styles
  if (smoothTransition) {
    navbar.style.transition = 'all 0.3s ease';
  }
  
  // Set initial state
  navbar.style.backgroundColor = transparentBg;
  if (addBlur) navbar.style.backdropFilter = 'none';
  if (addShadow) navbar.style.boxShadow = 'none';

  // Listen for scroll events
  window.addEventListener('scroll', handleScroll);
  
  // Initial call to set correct state
  handleScroll();
}

// Auto-initialize for pages with default settings
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on index page
  const isIndexPage = window.location.pathname === '/' || window.location.pathname.includes('index.html');
  
  if (isIndexPage) {
    // Index page: starts transparent, becomes white on scroll
    initNavbarScroll({
      scrollThreshold: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      transparentBg: 'transparent',
      addBlur: true,
      addShadow: true
    });
  } else {
    // Other pages: use theme background
    initNavbarScroll({
      scrollThreshold: 16,
      backgroundColor: 'var(--theme--background)',
      transparentBg: 'transparent',
      addBlur: false,
      addShadow: false
    });
  }
});

// Make function globally available
window.initNavbarScroll = initNavbarScroll;