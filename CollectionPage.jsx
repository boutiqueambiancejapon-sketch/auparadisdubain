// CollectionPage.jsx
const { ProductCard } = window;

const CollectionPage = ({ collectionId, onOpen, onNav }) => {
  const all = window.APP_DATA.bestsellers;
  const col = window.APP_DATA.collections.find(c => c.id === collectionId) || window.APP_DATA.collections[0];
  const [sort, setSort] = React.useState("popular");
  const [filters, setFilters] = React.useState({ bio: false, vegan: false, made: false });
  const [priceMax, setPriceMax] = React.useState(50);

  // Generate a richer fake list (12 products) by repeating with variants
  const products = React.useMemo(() => {
    const list = [];
    for (let i = 0; i < 12; i++) {
      const base = all[i % all.length];
      list.push({
        ...base,
        id: base.id + "_" + i,
        name: base.name + (i >= all.length ? " (variant)" : ""),
      });
    }
    return list;
  }, []);

  return (
    <>
      {/* Collection header */}
      <section style={{ padding: "60px 0 40px", background: "var(--bg-soft)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{
          position: "absolute", top: -80, right: "10%", width: 280, height: 280, borderRadius: "50%",
          background: `radial-gradient(circle at 30% 30%, var(--${col.swatch}), transparent 70%)`,
          opacity: 0.6,
        }} />
        <div className="container" style={{ position: "relative" }}>
          <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 16 }}>
            <a onClick={() => onNav("home")} style={{ borderBottom: "1px solid currentColor" }}>Accueil</a>
            <span style={{ margin: "0 8px" }}>/</span>
            <span>Collections</span>
            <span style={{ margin: "0 8px" }}>/</span>
            <span style={{ color: "var(--ink)" }}>{col.name}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 60, alignItems: "end" }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>· {col.count} produits</div>
              <h1 className="h-display" style={{ fontSize: "clamp(60px, 8vw, 112px)", lineHeight: 0.95 }}>
                {col.name}
              </h1>
            </div>
            <p style={{ fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.55, paddingBottom: 16 }}>
              {col.description}
            </p>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section style={{ padding: "32px 0", borderBottom: "1px solid var(--line)", position: "sticky", top: 76, background: "rgba(255,249,244,0.92)", backdropFilter: "blur(20px)", zIndex: 30 }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { k: "bio", label: "Bio certifié" },
              { k: "vegan", label: "Vegan" },
              { k: "made", label: "Made in France" },
            ].map(f => (
              <button key={f.k}
                onClick={() => setFilters(s => ({ ...s, [f.k]: !s[f.k] }))}
                style={{
                  padding: "8px 16px", borderRadius: 999, fontSize: 13, fontWeight: 500,
                  border: "1.5px solid var(--line-strong)",
                  background: filters[f.k] ? "var(--ink)" : "transparent",
                  color: filters[f.k] ? "var(--bg)" : "var(--ink)",
                  transition: "all .2s",
                }}
              >
                {filters[f.k] ? "✓ " : "+ "}{f.label}
              </button>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 16px" }}>
              <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>Prix &le;</span>
              <input type="range" min="10" max="100" value={priceMax}
                onChange={e => setPriceMax(+e.target.value)}
                style={{ width: 120, accentColor: "var(--pink-deep)" }}
              />
              <span style={{ fontSize: 13, fontWeight: 600, minWidth: 40 }}>{priceMax}€</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>Trier&nbsp;:</span>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{
              padding: "8px 14px", borderRadius: 999, border: "1.5px solid var(--line-strong)",
              fontSize: 13, fontWeight: 500, background: "transparent", fontFamily: "inherit",
            }}>
              <option value="popular">Popularité</option>
              <option value="new">Nouveautés</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Mieux notés</option>
            </select>
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 0 80px" }}>
        <div className="container">
          <div className="grid cols-4">
            {products.map(p => <ProductCard key={p.id} p={p} onOpen={onOpen} />)}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button className="btn btn-secondary">Charger plus de produits</button>
          </div>
        </div>
      </section>

      {/* Other collections strip */}
      <section style={{ padding: "60px 0", background: "var(--bg-soft)" }}>
        <div className="container">
          <h3 className="h-serif" style={{ fontSize: 36, marginBottom: 24 }}>Autres collections</h3>
          <div className="grid cols-5">
            {window.APP_DATA.collections.filter(c => c.id !== col.id).slice(0, 5).map(c => (
              <a key={c.id} onClick={() => onNav("collection", c.id)} style={{
                padding: 20, borderRadius: "var(--radius-md)", background: "#fff",
                display: "flex", flexDirection: "column", gap: 12,
              }}>
                <div style={{ width: "100%", aspectRatio: "1/1", borderRadius: "50%",
                  background: `radial-gradient(circle at 30% 30%, #fff, var(--${c.swatch}))`,
                }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{c.count} produits</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

window.CollectionPage = CollectionPage;
