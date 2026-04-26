// ProductPage.jsx
const { ProductCard, ProductPlaceholder, Stars, SWATCH } = window;

const ProductPage = ({ product, onOpen, onNav }) => {
  const p = product || window.APP_DATA.bestsellers[0];
  const [qty, setQty] = React.useState(1);
  const [size, setSize] = React.useState("Standard 180g");
  const [scent, setScent] = React.useState(0);
  const [tab, setTab] = React.useState("desc");
  const [imgIdx, setImgIdx] = React.useState(0);
  const [added, setAdded] = React.useState(false);

  const others = window.APP_DATA.bestsellers.filter(x => x.id !== p.id).slice(0, 4);
  const scents = ["Original", "Rose & musc", "Néroli", "Vétiver"];
  const sizes = ["Mini 60g · 6€", "Standard 180g · 12€", "Géante 320g · 22€"];
  const sw = SWATCH[p.swatch] || SWATCH.pink;

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <div className="container" style={{ padding: "24px 0", fontSize: 13, color: "var(--ink-soft)" }}>
        <a onClick={() => onNav("home")} style={{ borderBottom: "1px solid currentColor" }}>Accueil</a>
        <span style={{ margin: "0 8px" }}>/</span>
        <a onClick={() => onNav("collection", p.collection)} style={{ borderBottom: "1px solid currentColor" }}>
          {window.APP_DATA.collections.find(c => c.id === p.collection)?.name}
        </a>
        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ color: "var(--ink)" }}>{p.name}</span>
      </div>

      <section style={{ padding: "20px 0 80px" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60 }}>
          {/* Gallery */}
          <div>
            <div style={{ position: "relative", borderRadius: "var(--radius-xl)", overflow: "hidden", background: sw.soft, padding: 60 }}>
              <div className="wobble" style={{ position: "relative" }}>
                <ProductPlaceholder swatch={p.swatch} label={p.name.toLowerCase()} shape="circle" />
              </div>
              {/* decorative bubbles */}
              <div aria-hidden>
                <div style={{ position: "absolute", top: 30, right: 40, width: 70, height: 70, borderRadius: "50%",
                  background: "radial-gradient(circle at 30% 30%, #fff, rgba(255,255,255,0.3))",
                  border: "1px solid rgba(255,255,255,0.7)",
                  animation: "wobble 5s ease-in-out infinite",
                }} />
                <div style={{ position: "absolute", bottom: 50, left: 30, width: 40, height: 40, borderRadius: "50%",
                  background: "radial-gradient(circle at 30% 30%, #fff, rgba(255,255,255,0.4))",
                  border: "1px solid rgba(255,255,255,0.6)",
                  animation: "wobble 7s ease-in-out infinite reverse",
                }} />
              </div>
              <span className={`tag tag-${p.swatch}`} style={{ position: "absolute", top: 24, left: 24, background: "#fff" }}>{p.tag}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 16 }}>
              {[0, 1, 2, 3].map(i => (
                <button key={i} onClick={() => setImgIdx(i)} style={{
                  border: imgIdx === i ? "2px solid var(--ink)" : "2px solid transparent",
                  borderRadius: "var(--radius-md)", padding: 0, overflow: "hidden",
                }}>
                  <ProductPlaceholder swatch={p.swatch} label={`vue ${i + 1}`} shape="square" small />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>{p.tag} · {window.APP_DATA.collections.find(c => c.id === p.collection)?.name}</div>
            <h1 className="h-display" style={{ fontSize: "clamp(48px, 6vw, 72px)", lineHeight: 0.95, marginBottom: 16 }}>{p.name}</h1>
            <p style={{ fontSize: 18, color: "var(--ink-soft)", marginBottom: 20, fontFamily: "var(--font-display)" }}>{p.subtitle}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <Stars n={p.rating} />
              <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>{p.rating} · {p.reviews} avis</span>
              <a style={{ fontSize: 13, borderBottom: "1px solid currentColor" }}>Lire les avis →</a>
            </div>
            <div style={{ fontSize: 36, fontWeight: 600, marginBottom: 32 }}>{p.price}</div>

            {/* Size selector */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, display: "flex", justifyContent: "space-between" }}>
                <span>Format</span>
                <span style={{ color: "var(--ink-soft)", fontWeight: 400 }}>{size}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {sizes.map(s => (
                  <button key={s} onClick={() => setSize(s)} style={{
                    padding: "14px 8px", borderRadius: "var(--radius-md)",
                    border: `1.5px solid ${size === s ? "var(--ink)" : "var(--line-strong)"}`,
                    background: size === s ? "var(--bg-soft)" : "transparent",
                    fontSize: 12, fontWeight: 500,
                  }}>
                    {s.split(" · ")[0]}<br/>
                    <span style={{ color: "var(--ink-soft)", fontWeight: 400 }}>{s.split(" · ")[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scent selector */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, display: "flex", justifyContent: "space-between" }}>
                <span>Fragrance</span>
                <span style={{ color: "var(--ink-soft)", fontWeight: 400 }}>{scents[scent]}</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {scents.map((s, i) => (
                  <button key={i} onClick={() => setScent(i)} title={s} style={{
                    width: 48, height: 48, borderRadius: "50%",
                    border: `2px solid ${scent === i ? "var(--ink)" : "transparent"}`,
                    padding: 2, background: "transparent",
                  }}>
                    <div style={{
                      width: "100%", height: "100%", borderRadius: "50%",
                      background: `radial-gradient(circle at 30% 30%, #fff, var(--${["pink", "lilac", "vanilla", "mint"][i]}-deep))`,
                      border: "1px solid rgba(0,0,0,0.06)",
                    }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + ATC */}
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", border: "1.5px solid var(--line-strong)", borderRadius: 999, height: 52 }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ padding: "0 18px", fontSize: 18 }}>−</button>
                <span style={{ minWidth: 24, textAlign: "center", fontWeight: 600 }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ padding: "0 18px", fontSize: 18 }}>+</button>
              </div>
              <button className="btn" style={{ flex: 1, background: added ? "var(--mint-deep)" : "var(--ink)" }} onClick={handleAdd}>
                {added ? "✓ Ajouté au panier" : `Ajouter au panier · ${(parseInt(p.price) * qty)}€`}
              </button>
            </div>
            <button className="btn btn-secondary" style={{ width: "100%", marginBottom: 32 }}>♡ Ajouter à ma liste d'envies</button>

            {/* Trust signals */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 13 }}>
              {[
                { icon: "🌿", t: "Cosmos Organic", s: "Bio certifié" },
                { icon: "🐰", t: "Vegan & cruelty-free", s: "Sans test animal" },
                { icon: "📦", t: "Livraison 48h", s: "Offerte dès 60€" },
                { icon: "♻️", t: "Emballage compostable", s: "Zéro plastique" },
              ].map((x, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: 12, background: "var(--bg-soft)", borderRadius: "var(--radius-md)" }}>
                  <span style={{ fontSize: 20 }}>{x.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{x.t}</div>
                    <div style={{ color: "var(--ink-soft)", fontSize: 12 }}>{x.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section style={{ padding: "40px 0", borderTop: "1px solid var(--line)" }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 32, borderBottom: "1px solid var(--line)" }}>
            {[
              { k: "desc", l: "Description" },
              { k: "ing", l: "Ingrédients" },
              { k: "use", l: "Rituel d'usage" },
              { k: "rev", l: `Avis (${p.reviews})` },
            ].map(t => (
              <button key={t.k} onClick={() => setTab(t.k)} style={{
                padding: "16px 20px", fontSize: 14, fontWeight: 500,
                color: tab === t.k ? "var(--ink)" : "var(--ink-soft)",
                borderBottom: tab === t.k ? "2px solid var(--ink)" : "2px solid transparent",
                marginBottom: -1,
              }}>{t.l}</button>
            ))}
          </div>
          <div style={{ minHeight: 200, fontSize: 16, lineHeight: 1.65, color: "var(--ink-soft)" }}>
            {tab === "desc" && (
              <div>
                <p style={{ marginBottom: 16, fontFamily: "var(--font-display)", fontSize: 22, color: "var(--ink)" }}>
                  Une effervescence rose poudré qui transforme votre baignoire en jardin de Damas.
                </p>
                <p>{p.subtitle}. Façonnée à la main dans nos ateliers de Grasse, cette {p.name.toLowerCase()} libère
                un nuage parfumé d'huiles essentielles précieuses, de pétales séchés et de beurre de karité bio.
                Au contact de l'eau chaude, elle pétille en dansant et laisse votre peau délicatement parfumée.</p>
              </div>
            )}
            {tab === "ing" && (
              <div>
                <p style={{ marginBottom: 16 }}>{p.ingredients}</p>
                <p style={{ fontSize: 13 }}><strong style={{ color: "var(--ink)" }}>INCI complet :</strong> Sodium Bicarbonate, Citric Acid, Butyrospermum Parkii Butter*, Rosa Damascena Flower Oil, Tocopherol, Rosa Damascena Flower. (*) Issu de l'agriculture biologique. 98% d'origine naturelle.</p>
              </div>
            )}
            {tab === "use" && (
              <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                <li>Faites couler un bain à 37°C, jamais plus chaud.</li>
                <li>Plongez la bombe dans l'eau et observez sa danse effervescente.</li>
                <li>Laissez infuser 2 minutes avant d'entrer.</li>
                <li>Détendez-vous 20 à 30 minutes. Rincez à l'eau claire si vous le souhaitez.</li>
              </ol>
            )}
            {tab === "rev" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {window.APP_DATA.testimonials.map((r, i) => (
                  <div key={i} style={{ padding: 24, background: "var(--bg-soft)", borderRadius: "var(--radius-md)" }}>
                    <Stars n={r.rating} />
                    <p style={{ marginTop: 10, color: "var(--ink)" }}>« {r.text} »</p>
                    <div style={{ marginTop: 12, fontSize: 13 }}>{r.name} · {r.city}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section style={{ padding: "80px 0", background: "var(--bg-soft)" }}>
        <div className="container">
          <h3 className="h-serif" style={{ fontSize: 40, marginBottom: 32 }}>Vous aimerez aussi</h3>
          <div className="grid cols-4">
            {others.map(x => <ProductCard key={x.id} p={x} onOpen={onOpen} />)}
          </div>
        </div>
      </section>
    </>
  );
};

window.ProductPage = ProductPage;
