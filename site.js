'use strict';
// Content and navigation remain usable without JavaScript.
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
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
