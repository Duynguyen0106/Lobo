const CA = 'k6BE8rsFShzuQ4t2Q5cfpjCdQFFerfqex8Me7Wupump';

// Starfield background
(function initStars() {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    stars = Array.from({ length: Math.floor((w * h) / 8000) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.3,
      a: Math.random(),
      speed: Math.random() * 0.3 + 0.1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      s.a += (Math.random() - 0.5) * 0.02;
      s.a = Math.max(0.1, Math.min(0.8, s.a));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 200, 160, ${s.a})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', resize);
})();

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
revealEls.forEach((el) => observer.observe(el));

// Copy contract
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

async function copyCA() {
  try {
    await navigator.clipboard.writeText(CA);
    showToast();
    const label = document.getElementById('copy-label');
    if (label) {
      const prev = label.textContent;
      label.textContent = 'Copied!';
      setTimeout(() => { label.textContent = prev; }, 2000);
    }
  } catch {
    const ta = document.createElement('textarea');
    ta.value = CA;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast();
  }
}

document.getElementById('copy-ca')?.addEventListener('click', copyCA);
document.getElementById('copy-ca-hero')?.addEventListener('click', copyCA);

// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

menuToggle?.addEventListener('click', () => {
  const open = mobileNav.hidden;
  mobileNav.hidden = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Smooth header shadow on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.style.borderBottomColor = 'rgba(232, 168, 56, 0.2)';
  } else {
    header.style.borderBottomColor = '';
  }
}, { passive: true });
