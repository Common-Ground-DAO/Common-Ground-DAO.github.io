// Theme Toggle - Handles dark/light mode switching with localStorage persistence

(function() {
  const STORAGE_KEY = 'theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  // Get saved theme or detect system preference
  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  }

  // Apply theme to document
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Initialize theme immediately to prevent flash
  setTheme(getPreferredTheme());

  // Set up toggle button once DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('theme-toggle');

    if (toggle) {
      toggle.addEventListener('click', function() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === DARK ? LIGHT : DARK;
        setTheme(next);
      });
    }
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setTheme(e.matches ? DARK : LIGHT);
    }
  });
})();
