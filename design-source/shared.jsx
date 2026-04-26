// shared.jsx — Shared components: Header, Footer, ProductCard, Placeholder

const SWATCH = {
  pink:    { a: "var(--pink)",    b: "var(--pink-deep)",    soft: "#FFE9EE" },
  vanilla: { a: "var(--vanilla)", b: "var(--vanilla-deep)", soft: "#FFF3DC" },
  mint:    { a: "var(--mint)",    b: "var(--mint-deep)",    soft: "#E2F7EE" },
  lilac:   { a: "var(--lilac)",   b: "var(--lilac-deep)",   soft: "#EAE3FC" },
};

const Stars = ({ n = 5 }) => (
  <span className="stars" aria-label={`${n} étoiles`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i}>{i < Math.round(n) ? "★" : "☆"}</span>
    ))}
  </span>
);

// Striped product placeholder with monospace caption
const ProductPlaceholder = ({ swatch = "pink", label = "produit", shape = "square", small = false }) => {
  const s = SWATCH[swatch] || SWATCH.pink;
  const radius = shape === "circle" ? "50%" : "var(--radius-lg)";
  return (
    <div
      className="placeholder"
      style={{
        "--ph-a": `color-mix(in oklab, ${s.a}, transparent 30%)`,
        "--ph-b": `color-mix(in oklab, ${s.b}, transparent 50%)`,
        "--ph-bg": s.soft,
        borderRadius: radius,
        aspectRatio: shape === "circle" ? "1 / 1" : (shape === "tall" ? "3 / 4" : "1 / 1"),
        width: "100%",
      }}
    >
      <span style={{ fontSize: small ? 10 : 12 }}>{`// ${label}`}</span>
    </div>
  );
};

const ProductCard = ({ p, onOpen, large = false }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      className="card"
      style={{
        padding: 18,
        position: "relative",
        cursor: "default",
        background: hover ? "#fff" : "#fff",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => { e.stopPropagation(); onOpen && onOpen(p); }}
    >
      {p.tag && (
        <div style={{ position: "absolute", top: 26, left: 26, zIndex: 2 }}>
          <span className={`tag tag-${p.swatch || "pink"}`}>{p.tag}</span>
        </div>
      )}
      <div style={{ position: "relative" }}>
        <ProductPlaceholder swatch={p.swatch} label={p.name.toLowerCase()} shape="square" />
        {/* Floating bubble decoration on hover */}
        <div style={{
          position: "absolute", top: 10, right: 10, width: 36, height: 36,
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, #fff, rgba(255,255,255,0.3))",
          border: "1px solid rgba(255,255,255,0.7)",
          opacity: hover ? 1 : 0,
          transform: hover ? "translateY(0) scale(1)" : "translateY(8px) scale(0.6)",
          transition: "all .4s cubic-bezier(.34,1.56,.64,1)",
        }} />
      </div>
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
          <h3 className="h-serif" style={{ fontSize: large ? 24 : 20, fontWeight: 500 }}>{p.name}</h3>
          <span style={{ fontWeight: 600, fontSize: 16 }}>{p.price}</span>
        </div>
        <p style={{ color: "var(--ink-soft)", fontSize: 13, lineHeight: 1.4 }}>{p.subtitle}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
          <Stars n={p.rating} />
          <span style={{ fontSize: 12, color: "var(--ink-mute)" }}>({p.reviews})</span>
        </div>
      </div>
      <button
        className="btn btn-sm"
        style={{
          position: "absolute", right: 18, bottom: 18,
          width: 40, padding: 0, height: 40, borderRadius: "50%",
          opacity: hover ? 1 : 0,
          transform: hover ? "scale(1)" : "scale(0.5)",
          transition: "all .35s cubic-bezier(.34,1.56,.64,1)",
        }}
        onClick={(e) => { e.stopPropagation(); onOpen && onOpen(p); }}
        aria-label={`Voir ${p.name}`}
      >
        →
      </button>
    </div>
  );
};

// Header / Nav
const Header = ({ onNav, route, cartCount = 2 }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top promo bar */}
      <div style={{
        background: "var(--ink)", color: "var(--bg)",
        textAlign: "center", padding: "10px 0", fontSize: 12, letterSpacing: "0.04em",
        position: "relative", zIndex: 60,
      }}>
        <div className="marquee">
          <div className="marquee-track">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <span>✿ Livraison offerte dès 60€</span>
                <span>♡ Échantillons surprises dans chaque commande</span>
                <span>☼ -15% sur votre 1ʳᵉ commande avec PARADIS15</span>
                <span>☾ Emballages compostables</span>
                <span>✦ Made in France · Saponifié à froid en Provence</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: scrolled ? "rgba(255,249,244,.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
        transition: "all .3s",
      }}>
        <div className="container" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 76,
        }}>
          <nav style={{ display: "flex", gap: 24, fontSize: 14, fontWeight: 500, whiteSpace: "nowrap" }}>
            {[
              { id: "home", label: "Accueil" },
              { id: "collection", label: "Collections" },
              { id: "collection", label: "Bombes", filter: "bombes" },
              { id: "collection", label: "Soins", filter: "cremes" },
              { id: "home", label: "Le Journal" },
            ].map((l, i) => (
              <a key={i}
                onClick={() => onNav(l.id, l.filter)}
                style={{
                  color: route === l.id ? "var(--ink)" : "var(--ink-soft)",
                  position: "relative", padding: "4px 0",
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--ink)"}
                onMouseLeave={(e) => e.currentTarget.style.color = route === l.id ? "var(--ink)" : "var(--ink-soft)"}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a onClick={() => onNav("home")} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Logo />
          </a>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button className="btn btn-sm btn-secondary" style={{ borderColor: "var(--line-strong)" }}>
              Rechercher
            </button>
            <button className="btn btn-sm btn-secondary" style={{ borderColor: "var(--line-strong)" }}>
              Compte
            </button>
            <button className="btn btn-sm" style={{ background: "var(--pink-deep)", color: "var(--ink)" }}>
              Panier · {cartCount}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

const Logo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="17" fill="var(--pink)" />
      <circle cx="13" cy="14" r="4" fill="#fff" opacity="0.7" />
      <circle cx="22" cy="20" r="3" fill="#fff" opacity="0.5" />
      <circle cx="11" cy="22" r="2" fill="#fff" opacity="0.6" />
      <circle cx="18" cy="18" r="17" fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.15" />
    </svg>
    <div style={{ lineHeight: 1 }}>
      <div className="h-display" style={{ fontSize: 18, letterSpacing: "-0.01em" }}>Au Paradis</div>
      <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "0.18em", color: "var(--ink-soft)", marginTop: 2 }}>
        DU&nbsp;BAIN
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer style={{
    marginTop: 80, background: "var(--ink)", color: "var(--bg)",
    padding: "80px 0 40px", position: "relative", overflow: "hidden",
  }}>
    {/* Bubbles in footer */}
    <div style={{ position: "absolute", inset: 0, opacity: 0.08, pointerEvents: "none" }}>
      <svg viewBox="0 0 1200 400" style={{ width: "100%", height: "100%" }}>
        <circle cx="100" cy="350" r="60" fill="#fff" />
        <circle cx="220" cy="320" r="40" fill="#fff" />
        <circle cx="350" cy="380" r="80" fill="#fff" />
        <circle cx="900" cy="340" r="50" fill="#fff" />
        <circle cx="1050" cy="360" r="70" fill="#fff" />
      </svg>
    </div>
    <div className="container" style={{ position: "relative" }}>
      <div className="grid cols-4" style={{ gap: 48 }}>
        <div>
          <div className="h-display" style={{ fontSize: 28, marginBottom: 12 }}>Au Paradis du Bain</div>
          <p style={{ opacity: 0.7, fontSize: 14, lineHeight: 1.6 }}>
            Cosmétiques de bain artisanaux, bio, vegan et d'origine contrôlée.<br/>Façonnés en Provence depuis 2018.
          </p>
        </div>
        <div>
          <h4 style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16, fontFamily: "var(--font-mono)" }}>Boutique</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, fontSize: 14, opacity: 0.8 }}>
            <li>Bombes de bain</li><li>Sels & infusions</li><li>Savons artisanaux</li>
            <li>Crèmes & laits</li><li>Coffrets</li>
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16, fontFamily: "var(--font-mono)" }}>Maison</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, fontSize: 14, opacity: 0.8 }}>
            <li>Notre histoire</li><li>Ateliers à Grasse</li><li>Engagements</li>
            <li>Le Journal</li><li>Carte cadeau</li>
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16, fontFamily: "var(--font-mono)" }}>Service client</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, fontSize: 14, opacity: 0.8 }}>
            <li>Livraison & retours</li><li>Programme fidélité</li><li>Nous contacter</li>
            <li>FAQ</li>
          </ul>
        </div>
      </div>
      <div style={{
        marginTop: 60, paddingTop: 30, borderTop: "1px solid rgba(255,255,255,0.12)",
        display: "flex", justifyContent: "space-between", fontSize: 12, opacity: 0.6,
      }}>
        <span>© 2026 Au Paradis du Bain · SIRET 928 471 632 00018</span>
        <span>CGV · Mentions légales · Cookies · Confidentialité</span>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Stars, ProductPlaceholder, ProductCard, Header, Footer, Logo, SWATCH });
