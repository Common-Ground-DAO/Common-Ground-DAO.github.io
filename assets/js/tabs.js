// Tabs - Simple tab switching for action box

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const tabContainers = document.querySelectorAll('.action-box');

    tabContainers.forEach(function(container) {
      const tabs = container.querySelectorAll('.action-tab');
      const panels = container.querySelectorAll('.action-panel');

      tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
          const targetId = tab.getAttribute('data-tab');

          // Deactivate all tabs and panels
          tabs.forEach(function(t) { t.classList.remove('active'); });
          panels.forEach(function(p) { p.classList.remove('active'); });

          // Activate clicked tab and corresponding panel
          tab.classList.add('active');
          const targetPanel = container.querySelector('#' + targetId);
          if (targetPanel) {
            targetPanel.classList.add('active');
          }
        });
      });
    });
  });
})();
