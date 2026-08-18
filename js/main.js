const CA = 'k6BE8rsFShzuQ4t2Q5cfpjCdQFFerfqex8Me7Wupump';
const DEXSCREENER_API = `https://api.dexscreener.com/latest/dex/tokens/${CA}`;
const PRICE_REFRESH_MS = 30_000;

// Live price from DexScreener API
function formatUsd(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return '—';
  if (n >= 1) return `$${n.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  if (n >= 0.0001) return `$${n.toFixed(6)}`;
  return `$${n.toExponential(2)}`;
}

function formatCompact(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return '—';
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function formatChange(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return { text: '—', cls: '' };
  const sign = n >= 0 ? '+' : '';
  return { text: `${sign}${n.toFixed(2)}%`, cls: n >= 0 ? 'positive' : 'negative' };
}

async function fetchLivePrice() {
  const els = {
    usd: document.getElementById('price-usd'),
    change: document.getElementById('price-change'),
    mcap: document.getElementById('price-mcap'),
    volume: document.getElementById('price-volume'),
    liquidity: document.getElementById('price-liquidity'),
    updated: document.getElementById('price-updated'),
  };
  if (!els.usd) return;

  try {
    const res = await fetch(DEXSCREENER_API);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    const pair = data.pairs?.[0];
    if (!pair) throw new Error('No pair data');

    els.usd.textContent = formatUsd(pair.priceUsd);

    const change = formatChange(pair.priceChange?.h24);
    els.change.textContent = change.text;
    els.change.className = `price-stat-value ${change.cls}`;

    els.mcap.textContent = formatCompact(pair.marketCap || pair.fdv);
    els.volume.textContent = formatCompact(pair.volume?.h24);
    els.liquidity.textContent = formatCompact(pair.liquidity?.usd);

    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    els.updated.textContent = `Last updated ${time} · Data from DexScreener`;
  } catch {
    els.updated.textContent = 'Could not load live price — view chart below for current data';
  }
}

fetchLivePrice();
setInterval(fetchLivePrice, PRICE_REFRESH_MS);

// DexScreener chart embed fallback
(function initChartEmbed() {
  const frame = document.getElementById('dexscreener-chart');
  const container = frame?.closest('.chart-embed');
  if (!frame || !container) return;

  frame.addEventListener('load', () => container.classList.add('loaded'));

  setTimeout(() => {
    if (!container.classList.contains('loaded')) {
      container.classList.remove('loaded');
    }
  }, 8000);
})();

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
