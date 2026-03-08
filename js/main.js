// ViszCAD – main.js

// NAV scroll effect
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// Hamburger / mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobile() {
  hamburger && hamburger.classList.remove('open');
  mobileMenu && mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileMenu.addEventListener('click', e => {
    if (e.target === mobileMenu) closeMobile();
  });
}

// Hero bg parallax pan-in
const heroBg = document.getElementById('heroBg');
if (heroBg) {
  heroBg.classList.add('loaded');
}

// IntersectionObserver for .reveal
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '100px 0px 100px 0px' });
  revealEls.forEach(el => observer.observe(el));
  // Fallback: ensure all reveals fire within 1.5s (covers Puppeteer / no-scroll)
  setTimeout(() => revealEls.forEach(el => el.classList.add("visible")), 1500);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Active nav link based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) link.classList.add('active');
  else link.classList.remove('active');
});

// Announcement bar close
const announceBar = document.getElementById('announceBar');
const announceClose = document.getElementById('announceClose');
if (announceClose && announceBar) {
  announceClose.addEventListener('click', function() {
    announceBar.classList.add('hidden');
    sessionStorage.setItem('announceDismissed', '1');
  });
  if (sessionStorage.getItem('announceDismissed')) {
    announceBar.classList.add('hidden');
  }
}
