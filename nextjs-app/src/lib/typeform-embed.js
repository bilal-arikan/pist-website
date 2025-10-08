// Typeform Embed Script
(function() {
  // Create Typeform popup functionality
  window.tf = window.tf || {};
  
  // Simple popup implementation
  window.tf.popup = function(formId, options = {}) {
    return {
      open: function() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
        `;
        
        // Create iframe container
        const container = document.createElement('div');
        container.style.cssText = `
          width: 90%;
          max-width: 800px;
          height: 90%;
          max-height: 600px;
          background: white;
          border-radius: 8px;
          position: relative;
        `;
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          z-index: 10001;
          color: #666;
        `;
        
        // Create iframe
        const iframe = document.createElement('iframe');
        iframe.src = `https://form.typeform.com/to/${formId}?typeform-embed=embed-widget`;
        iframe.style.cssText = `
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 8px;
        `;
        
        // Close functionality
        const close = () => {
          document.body.removeChild(overlay);
          document.body.style.overflow = '';
        };
        
        closeBtn.onclick = close;
        overlay.onclick = (e) => {
          if (e.target === overlay) close();
        };
        
        // Escape key to close
        const handleEscape = (e) => {
          if (e.key === 'Escape') {
            close();
            document.removeEventListener('keydown', handleEscape);
          }
        };
        document.addEventListener('keydown', handleEscape);
        
        // Assemble and show
        container.appendChild(closeBtn);
        container.appendChild(iframe);
        overlay.appendChild(container);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
      }
    };
  };
  
  // Auto-initialize buttons with data-tf-popup attribute
  document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('[data-tf-popup]');
    buttons.forEach(button => {
      const formId = button.getAttribute('data-tf-popup');
      if (formId) {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          window.tf.popup(formId).open();
        });
      }
    });
  });
})();