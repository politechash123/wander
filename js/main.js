// Search is not connected to any data yet: keep the page from reloading
// and take the visitor to the destinations section.
document.getElementById('search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
});

// Header shadow once the page is scrolled
const header = document.querySelector('.header');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Reveal blocks as they scroll into view; siblings in a group get a staggered delay
const revealGroups = [
  '.trusted__title', '.trusted__item',
  '.about > *', '.about__list li',
  '.section-head > *',
  '.photo-card', '.feature', '.review',
  '.cta > *',
  '.footer__top > *', '.footer__contacts',
];

const revealItems = [];
revealGroups.forEach((selector) => {
  document.querySelectorAll(selector).forEach((el) => {
    if (el.classList.contains('reveal')) return;
    const index = [...el.parentElement.children].indexOf(el);
    el.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 0.1}s`);
    el.classList.add('reveal');
    revealItems.push(el);
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add('is-visible'));
}
