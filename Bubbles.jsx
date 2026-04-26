// Bubbles.jsx — ambient + interactive bubble system

const BubbleField = ({ density = 18 }) => {
  const bubbles = React.useMemo(() => {
    return Array.from({ length: density }).map((_, i) => {
      const size = 12 + Math.random() * 70;
      const left = Math.random() * 100;
      const dur = 12 + Math.random() * 18;
      const delay = -Math.random() * dur;
      const drift = (Math.random() - 0.5) * 200;
      const hue = Math.random() * 60 - 20;
      const opacity = 0.55 + Math.random() * 0.35;
      return { i, size, left, dur, delay, drift, hue, opacity };
    });
  }, [density]);

  return (
    <div className="bubble-field" aria-hidden="true">
      {bubbles.map(b => (
        <div
          key={b.i}
          className="bubble"
          style={{
            left: b.left + "%",
            width: b.size,
            height: b.size,
            "--bd": b.dur + "s",
            "--bdl": b.delay + "s",
            "--bx": b.drift + "px",
            "--bh": b.hue + "deg",
            "--bo": b.opacity,
          }}
        />
      ))}
    </div>
  );
};

// Click anywhere → ephemeral bubble pop
const useBubblePop = () => {
  React.useEffect(() => {
    const onClick = (e) => {
      // skip when clicking inside Tweaks panel
      if (e.target.closest && e.target.closest('.twk-panel')) return;
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
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
};

// Cursor trail of tiny bubbles
const useBubbleTrail = (enabled = true) => {
  React.useEffect(() => {
    if (!enabled) return;
    let last = 0;
    const onMove = (e) => {
      const now = Date.now();
      if (now - last < 80) return;
      last = now;
      if (e.target.closest && e.target.closest('.twk-panel')) return;
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
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, [enabled]);
};

window.BubbleField = BubbleField;
window.useBubblePop = useBubblePop;
window.useBubbleTrail = useBubbleTrail;
