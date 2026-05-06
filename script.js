/* ================================================================
   RehanZ Portfolio — main.js
   Author: Pritam Naskar
================================================================ */

/* ── LOADER ──────────────────────────────────────────────────── */
function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.classList.add('hidden');
}
// Primary: fires as soon as DOM + scripts are ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(hideLoader, 1600);
});
// Fallback: force-hide after 3s no matter what
setTimeout(hideLoader, 3000);

/* ── CUSTOM CURSOR ───────────────────────────────────────────── */
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');

if (window.matchMedia('(pointer:fine)').matches) {
  let mx = 0, my = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });
  function animateTrail() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    cursorTrail.style.left = tx + 'px';
    cursorTrail.style.top  = ty + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
}

/* ── NAVBAR ──────────────────────────────────────────────────── */
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  document.getElementById('back-top').classList.toggle('visible', window.scrollY > 500);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mob-link').forEach(l => {
  l.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── SMOOTH SCROLL ───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── BACK TO TOP ─────────────────────────────────────────────── */
document.getElementById('back-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── YEAR ────────────────────────────────────────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── THEME TOGGLE ────────────────────────────────────────────── */
const themeBtn = document.getElementById('theme-toggle');
let darkMode = true;
themeBtn.addEventListener('click', () => {
  darkMode = !darkMode;
  document.documentElement.setAttribute('data-theme', darkMode ? '' : 'light');
  themeBtn.textContent = darkMode ? '☀' : '🌙';
});

/* ── TYPED TEXT ──────────────────────────────────────────────── */
const phrases = [
  'Full Stack Web Developer',
  'React & Node.js Engineer',
  'Freelance Developer',
  'UI/UX Enthusiast',
  'Problem Solver'
];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const current = phrases[pi];
  if (deleting) {
    typedEl.textContent = current.substring(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    setTimeout(type, 60);
  } else {
    typedEl.textContent = current.substring(0, ++ci);
    if (ci === current.length) { deleting = true; setTimeout(type, 2000); return; }
    setTimeout(type, 90);
  }
}
type();

/* ── INTERSECTION OBSERVER (REVEAL) ─────────────────────────── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObs.observe(el);
});

/* ── SKILL BAR ANIMATION ─────────────────────────────────────── */
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('#skills').forEach(s => skillObs.observe(s));

/* ── ANIMATED COUNTERS ───────────────────────────────────────── */
const countObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.count').forEach(counter => {
        const target = +counter.dataset.target;
        let current = 0;
        const step = target / 50;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { counter.textContent = target; clearInterval(timer); return; }
          counter.textContent = Math.floor(current);
        }, 30);
      });
      countObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) countObs.observe(heroStats);

/* ── PROJECT FILTER ──────────────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        requestAnimationFrame(() => { card.style.animation = ''; });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ── CONTACT FORM ────────────────────────────────────────────── */
const form   = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    status.className = 'error';
    status.textContent = 'Please fill in all required fields.';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.className = 'error';
    status.textContent = 'Please enter a valid email address.';
    return;
  }

  const btn = form.querySelector('.btn-submit');
  btn.textContent = 'Sending...';
  btn.style.opacity = '.7';

  /* Replace with your form backend (Formspree, EmailJS, etc.) */
  setTimeout(() => {
    status.className = 'success';
    status.textContent = '✓ Message sent! I\'ll reply within 24 hours.';
    form.reset();
    btn.textContent = 'Send Message →';
    btn.style.opacity = '1';
  }, 1400);
});

/* ── PARTICLE CANVAS ─────────────────────────────────────────── */
const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width  = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}
window.addEventListener('resize', resize);
resize();

const PARTICLE_COUNT = Math.min(90, Math.floor(window.innerWidth / 14));

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - .5) * .4;
    this.vy = (Math.random() - .5) * .4;
    this.r  = Math.random() * 1.8 + .4;
    this.a  = Math.random() * .5 + .1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(110,231,247,${this.a})`;
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(110,231,247,${.12 * (1 - dist/120)})`;
        ctx.lineWidth = .5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

let animRunning = true;
function animate() {
  if (!animRunning) return;
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animate);
}
animate();

// Pause when off-screen for performance
const heroObs = new IntersectionObserver(([e]) => {
  animRunning = e.isIntersecting;
  if (animRunning) animate();
}, { threshold: 0 });
heroObs.observe(document.getElementById('hero'));

/* ── ACTIVE NAV LINK HIGHLIGHT ───────────────────────────────── */
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-links a');

const navObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + e.target.id
          ? 'var(--accent)'
          : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObs.observe(s));
