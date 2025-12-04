(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var brandMenu = document.getElementById('brand-menu');

    if (!brandMenu) return;

    // Find all logo elements that should trigger the context menu
    var logoElements = document.querySelectorAll('.logo, .footer-logo');

    // Handle right-click on logos
    logoElements.forEach(function(logo) {
      logo.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showMenu(e.clientX, e.clientY);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!brandMenu.contains(e.target)) {
        hideMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        hideMenu();
      }
    });

    // Close menu when a download link is clicked
    brandMenu.querySelectorAll('a[download]').forEach(function(link) {
      link.addEventListener('click', function() {
        setTimeout(hideMenu, 100);
      });
    });

    function showMenu(x, y) {
      // Position the menu
      var menuWidth = 220;
      var menuHeight = 400;

      // Adjust position if menu would go off screen
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;

      if (x + menuWidth > windowWidth) {
        x = windowWidth - menuWidth - 10;
      }
      if (y + menuHeight > windowHeight) {
        y = Math.max(10, windowHeight - menuHeight - 10);
      }

      brandMenu.style.left = x + 'px';
      brandMenu.style.top = y + 'px';
      brandMenu.classList.add('active');
    }

    function hideMenu() {
      brandMenu.classList.remove('active');
    }
  });
})();
