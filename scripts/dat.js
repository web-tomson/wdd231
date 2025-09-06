// date.js
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const lastModifiedEl = document.getElementById('lastModified');
  if (lastModifiedEl) lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
});
