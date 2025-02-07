// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const wikiSidebar = document.querySelector('.wiki-sidebar');
    
    // Toggle navigation menu
    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.toggle('open');
            burgerMenu.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
        });
    }
    
    // Close navigation when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks && navLinks.classList.contains('open')) {
            if (!navLinks.contains(e.target) && !burgerMenu.contains(e.target)) {
                navLinks.classList.remove('open');
                burgerMenu.textContent = '☰';
            }
        }
    });
    
    // Handle wiki sidebar on mobile
    if (wikiSidebar) {
        const wikiToggle = document.createElement('button');
        wikiToggle.className = 'wiki-sidebar-toggle';
        wikiToggle.innerHTML = '☰ Menu';
        wikiToggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 101;
            background: var(--brand-color);
            color: white;
            border: none;
            border-radius: 100px;
            padding: 12px 24px;
            font-weight: 500;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            display: none;
        `;
        
        document.body.appendChild(wikiToggle);
        
        // Show/hide toggle button based on screen size
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        function handleScreenChange(e) {
            wikiToggle.style.display = e.matches ? 'block' : 'none';
        }
        mediaQuery.addListener(handleScreenChange);
        handleScreenChange(mediaQuery);
        
        // Toggle wiki sidebar
        wikiToggle.addEventListener('click', function() {
            wikiSidebar.classList.toggle('open');
            wikiToggle.innerHTML = wikiSidebar.classList.contains('open') ? '✕ Close' : '☰ Menu';
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (wikiSidebar.classList.contains('open')) {
                if (!wikiSidebar.contains(e.target) && !wikiToggle.contains(e.target)) {
                    wikiSidebar.classList.remove('open');
                    wikiToggle.innerHTML = '☰ Menu';
                }
            }
        });
    }
}); 