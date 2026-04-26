// Au Paradis du Bain — Ambient bubble field + click-pop + cursor trail
// Vanilla JS port of Bubbles.jsx

(function () {
  const root = document.documentElement;
  const settings = window.themeSettings || {};

  // -----------------------------
  // Ambient bubble field
  // -----------------------------
  function buildBubbleField(container, density) {
    container.innerHTML = '';
    for (let i = 0; i < density; i++) {
      const size = 12 + Math.random() * 70;
      const left = Math.random() * 100;
      const dur = 12 + Math.random() * 18;
      const delay = -Math.random() * dur;
      const drift = (Math.random() - 0.5) * 200;
      const hue = Math.random() * 60 - 20;
      const opacity = 0.55 + Math.random() * 0.35;

      const el = document.createElement('div');
      el.className = 'bubble';
      el.style.left = left + '%';
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.setProperty('--bd', dur + 's');
      el.style.setProperty('--bdl', delay + 's');
      el.style.setProperty('--bx', drift + 'px');
      el.style.setProperty('--bh', hue + 'deg');
      el.style.setProperty('--bo', opacity);
      container.appendChild(el);
    }
  }

  function initBubbleField() {
    if (!settings.bubblesEnabled) return;
    const container = document.querySelector('.bubble-field');
    if (!container) return;
    const density = parseInt(settings.bubblesDensity, 10) || 18;
    buildBubbleField(container, density);
  }

  // -----------------------------
  // Click pop
  // -----------------------------
  function initBubblePop() {
    if (!settings.bubblesEnabled) return;
    document.addEventListener('click', (e) => {
      // Skip clicks within form controls or inputs to keep behavior clean
      if (e.target.closest('input, textarea, select')) return;
      for (let i = 0; i < 4; i++) {
        const el = document.createElement('div');
        el.className = 'pop-bubble';
        const size = 12 + Math.random() * 22;
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        el.style.left = e.clientX + 'px';
        el.style.top = e.clientY + 'px';
        el.style.setProperty('--popx', ((Math.random() - 0.5) * 80) + 'px');
        el.style.animationDelay = (i * 60) + 'ms';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1200);
      }
    });
  }

  // -----------------------------
  // Cursor trail
  // -----------------------------
  function initBubbleTrail() {
    if (!settings.bubblesTrail) return;
    let last = 0;
    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - last < 80) return;
      last = now;
      const el = document.createElement('div');
      el.className = 'pop-bubble';
      const size = 6 + Math.random() * 10;
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
      el.style.setProperty('--popx', ((Math.random() - 0.5) * 30) + 'px');
      el.style.animationDuration = '1.2s';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1300);
    });
  }

  // -----------------------------
  // Header scroll state
  // -----------------------------
  function initHeaderScroll() {
    const header = document.querySelector('[data-site-header]');
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 20) header.setAttribute('data-scrolled', 'true');
      else header.removeAttribute('data-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function init() {
    if (settings.palette && settings.palette !== 'pastel') {
      root.setAttribute('data-palette', settings.palette);
    }
    initBubbleField();
    initBubblePop();
    initBubbleTrail();
    initHeaderScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
