'use strict';
// Content and navigation remain usable without JavaScript.
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

// ─── Smooth page transitions ───
// Intercept internal nav links for a fade-out/fade-in transition.
(function () {
  const nav = document.querySelector('.site-header nav');
  if (!nav) return;

  nav.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    // Skip hash-only links (same page scrolls)
    if (!href || href.startsWith('#')) return;

    // Skip links that point to the current page
    if (link.hasAttribute('aria-current')) return;

    // Handle hash links to other pages (e.g. /#about from projects page)
    const url = new URL(href, window.location.origin);
    if (url.pathname === window.location.pathname && url.hash) return;

    e.preventDefault();

    document.body.style.transition = 'opacity .25s ease, transform .25s ease';
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(8px)';

    setTimeout(function () {
      window.location.href = href;
    }, 250);
  });
})();

// ─── Project filters ───
const filters = document.querySelector('.filters');
if (filters) {
  filters.hidden = false;
  const buttons = [...filters.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.project-card[data-category]')];
  const count = document.querySelector('.project-count');
  function applyFilter(category) {
    const selected = buttons.some((button) => button.dataset.filter === category) ? category : 'All';
    let visible = 0;
    cards.forEach((card) => {
      card.hidden = selected !== 'All' && card.dataset.category !== selected;
      if (!card.hidden) visible++;
    });
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === selected)));
    count.textContent = `${visible} project${visible === 1 ? '' : 's'}`;
  }
  buttons.forEach((button) => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    const url = new URL(window.location.href);
    if (category === 'All') url.searchParams.delete('category');
    else url.searchParams.set('category', category);
    window.history.pushState({}, '', url);
    applyFilter(category);
  }));
  window.addEventListener('popstate', () => applyFilter(new URLSearchParams(window.location.search).get('category')));
  applyFilter(new URLSearchParams(window.location.search).get('category'));
}
