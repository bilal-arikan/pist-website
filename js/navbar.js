// Simplified navbar dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
  const dropdowns = document.querySelectorAll('.navbar_dropdown_wrap');
  
  // Dropdown functionality
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.navbar_dropdown_toggle');
    
    toggle?.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close other dropdowns
      dropdowns.forEach(other => {
        if (other !== dropdown) other.classList.remove('w--open');
      });
      
      // Toggle current dropdown
      dropdown.classList.toggle('w--open');
    });
  });
  
  // Close dropdowns when clicking outside or pressing escape
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar_dropdown_wrap')) {
      dropdowns.forEach(dropdown => dropdown.classList.remove('w--open'));
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdowns.forEach(dropdown => dropdown.classList.remove('w--open'));
    }
  });
});