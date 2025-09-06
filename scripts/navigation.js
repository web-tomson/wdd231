// navigation.js
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('primary-nav');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    nav.style.display = expanded ? '' : 'block';
    navToggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      nav.style.display = '';
      navToggle.setAttribute('aria-expanded', false);
      navToggle.setAttribute('aria-label', 'Open navigation');
    }
  });

  // Improve accessibility: hide nav if larger screen via CSS; ensure nav display resets on resize
  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width:720px)').matches) {
      nav.style.display = '';
      navToggle.setAttribute('aria-expanded', false);
    }
  });
});
