'use strict';
// Content and navigation remain usable without JavaScript.
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

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

// Render public contribution data with a Cornell-red, rounded calendar.
const calendarLink = document.querySelector('.github-calendar a');
if (calendarLink) {
  fetch('https://github-contributions-api.jogruber.de/v4/Av1Sharma?y=last')
    .then(response => { if (!response.ok) throw new Error('Calendar unavailable'); return response.json(); })
    .then(data => {
      if (!Array.isArray(data.contributions) || !data.contributions.length) throw new Error('No contribution data');
      const ns = 'http://www.w3.org/2000/svg';
      const days = data.contributions;
      const firstDay = new Date(days[0].date + 'T00:00:00Z').getUTCDay();
      const weeks = Math.ceil((days.length + firstDay) / 7);
      const step = 15, cell = 12;
      const svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('viewBox', `0 0 ${weeks * step} 105`);
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', 'GitHub contribution calendar for Av1Sharma over the last year');
      const colors = ['#ebedf0', '#f6c6c6', '#e98c8c', '#d44949', '#b31b1b'];
      days.forEach((day, index) => {
        const position = index + firstDay, week = Math.floor(position / 7), row = position % 7;
        const rect = document.createElementNS(ns, 'rect');
        rect.setAttribute('x', String(week * step)); rect.setAttribute('y', String(row * step));
        rect.setAttribute('width', String(cell)); rect.setAttribute('height', String(cell)); rect.setAttribute('rx', '3');
        rect.setAttribute('fill', colors[Math.min(4, Math.max(0, Number(day.level) || 0))]);
        const title = document.createElementNS(ns, 'title');
        title.textContent = `${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`;
        rect.append(title); svg.append(rect);
      });
      calendarLink.replaceChildren(svg);
    }).catch(() => {}); // Keep the profile link if the data service is unavailable.
}
