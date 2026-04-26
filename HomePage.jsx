// HomePage.jsx
const { ProductCard, ProductPlaceholder, Stars, SWATCH } = window;

const Hero = () => {
  return (
    <section style={{ position: "relative", padding: "60px 0 100px", overflow: "hidden" }}>
      {/* Decorative blobs */}
      <div aria-hidden style={{
        position: "absolute", top: -80, right: -80, width: 380, height: 380, borderRadius: "50%",
        background: "radial-gradient(circle at 30% 30%, var(--pink), transparent 70%)",
        filter: "blur(20px)", opacity: 0.6,
      }} />
      <div aria-hidden style={{
        position: "absolute", bottom: -60, left: -100, width: 320, height: 320, borderRadius: "50%",
        background: "radial-gradient(circle at 60% 40%, var(--mint), transparent 70%)",
        filter: "blur(24px)", opacity: 0.5,
      }} />

      <div className="container" style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 60, alignItems: "center" }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 20 }}>✿ Nouvelle collection · Printemps 26</div>
          <h1 className="h-display" style={{ fontSize: "clamp(56px, 8vw, 112px)", marginBottom: 24 }}>
            Le bain,<br/>
            <span className="wavy">art doux</span><br/>
            de se retrouver.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: "var(--ink-soft)", maxWidth: 480, marginBottom: 36 }}>
            Bombes effervescentes, sels infusés, savons saponifiés à froid&nbsp;— façonnés à la main
            dans nos ateliers de Grasse avec des ingrédients bio, vegan et d'origine contrôlée.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn">Explorer les collections →</button>
            <button className="btn btn-secondary">Trouver mon rituel</button>
          </div>
          <div style={{ display: "flex", gap: 36, marginTop: 48 }}>
            <div>
              <Stars n={5} />
              <div style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 4 }}>
                <strong style={{ color: "var(--ink)" }}>4,9 / 5</strong> · 8 412 avis vérifiés
              </div>
            </div>
            <div style={{ width: 1, background: "var(--line-strong)" }} />
            <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5 }}>
              <strong style={{ color: "var(--ink)" }}>Cosmos Organic</strong><br/>
              Certifié bio depuis 2019
            </div>
          </div>
        </div>

        <div style={{ position: "relative", aspectRatio: "1/1.05" }}>
          {/* Big circle hero placeholder + floating bubble cluster */}
          <div className="wobble" style={{ position: "absolute", inset: "5%", borderRadius: "50%", overflow: "hidden" }}>
            <ProductPlaceholder swatch="pink" label="hero · bombe rose dans l'eau" shape="circle" />
          </div>
          <div className="spin-slow" aria-hidden style={{
            position: "absolute", inset: 0, pointerEvents: "none",
          }}>
            <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%" }}>
              <defs>
                <path id="circ" d="M 200,200 m -180,0 a 180,180 0 1,1 360,0 a 180,180 0 1,1 -360,0" />
              </defs>
              <text fontFamily="var(--font-mono)" fontSize="11" letterSpacing="6" fill="var(--ink-soft)">
                <textPath href="#circ">✿ BIO · VEGAN · ORIGINE CONTRÔLÉE · ARTISANAL · MADE IN FRANCE · ✿ BIO · VEGAN · ORIGINE CONTRÔLÉE · ARTISANAL ·&nbsp;</textPath>
              </text>
            </svg>
          </div>
          {/* Floating little product chips */}
          <div style={{ position: "absolute", top: "8%", right: "2%", width: 110, height: 110, animation: "wobble 5s ease-in-out infinite" }}>
            <ProductPlaceholder swatch="mint" label="sel" shape="circle" small />
          </div>
          <div style={{ position: "absolute", bottom: "6%", left: "4%", width: 90, height: 90, animation: "wobble 7s ease-in-out infinite reverse" }}>
            <ProductPlaceholder swatch="vanilla" label="savon" shape="circle" small />
          </div>
        </div>
      </div>
    </section>
  );
};

const BenefitsBar = () => {
  const { benefits } = window.APP_DATA;
  return (
    <section style={{
      background: "var(--bg-soft)", padding: "24px 0",
      borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)",
    }}>
      <div className="container" style={{ display: "grid", gridTemplateColumns: `repeat(${benefits.length}, 1fr)`, gap: 24 }}>
        {benefits.map((b, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 28 }}>{b.icon}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{b.label}</div>
              <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{b.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Collections = ({ onNav }) => {
  const { collections } = window.APP_DATA;
  return (
    <section style={{ padding: "100px 0" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>· 06 collections</div>
            <h2 className="h-serif" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>Choisissez votre rituel.</h2>
          </div>
          <a onClick={() => onNav("collection")} style={{ fontSize: 14, fontWeight: 500, borderBottom: "1px solid currentColor", paddingBottom: 2 }}>
            Voir tout le catalogue →
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridAutoRows: 280, gap: 16 }}>
          {collections.map((c, i) => {
            // varied spans for editorial rhythm
            const spans = [
              { col: "span 3", row: "span 2" },
              { col: "span 3", row: "span 1" },
              { col: "span 3", row: "span 1" },
              { col: "span 2", row: "span 1" },
              { col: "span 2", row: "span 1" },
              { col: "span 2", row: "span 1" },
            ];
            const sp = spans[i] || { col: "span 2", row: "span 1" };
            const sw = SWATCH[c.swatch];
            return (
              <a key={c.id} onClick={() => onNav("collection", c.id)} style={{
                gridColumn: sp.col, gridRow: sp.row,
                position: "relative", borderRadius: "var(--radius-lg)", overflow: "hidden",
                background: sw.soft, padding: 32,
                display: "flex", flexDirection: "column", justifyContent: "space-between",
                transition: "transform .35s cubic-bezier(.34,1.56,.64,1)",
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-6px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ position: "relative", zIndex: 2 }}>
                  <span className="eyebrow">{String(i + 1).padStart(2, "0")} · {c.count} produits</span>
                  <h3 className="h-display" style={{ fontSize: i === 0 ? 56 : 32, marginTop: 12, lineHeight: 0.95 }}>{c.name}</h3>
                  <p style={{ marginTop: 12, fontSize: 14, color: "var(--ink-soft)", maxWidth: 320 }}>{c.tagline}</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", position: "relative", zIndex: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>Découvrir →</span>
                </div>
                {/* Decorative bubble cluster */}
                <div aria-hidden style={{
                  position: "absolute", top: -30, right: -30, width: 200, height: 200,
                }}>
                  <div style={{
                    position: "absolute", top: 30, right: 30, width: 90, height: 90, borderRadius: "50%",
                    background: `radial-gradient(circle at 30% 30%, #fff, ${sw.b})`,
                    opacity: 0.55, animation: `wobble ${6 + i}s ease-in-out infinite`,
                  }} />
                  <div style={{
                    position: "absolute", top: 80, right: 100, width: 50, height: 50, borderRadius: "50%",
                    background: `radial-gradient(circle at 30% 30%, #fff, ${sw.a})`,
                    opacity: 0.7,
                  }} />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Bestsellers = ({ onOpen }) => {
  const items = window.APP_DATA.bestsellers;
  return (
    <section style={{ padding: "60px 0 100px" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}>· Best-sellers</div>
            <h2 className="h-serif" style={{ fontSize: "clamp(40px, 5vw, 64px)" }}>
              Les <span className="wavy">favoris</span> de la maison.
            </h2>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-sm btn-secondary" style={{ width: 44, height: 44, padding: 0, borderRadius: "50%", borderColor: "var(--line-strong)" }}>←</button>
            <button className="btn btn-sm btn-secondary" style={{ width: 44, height: 44, padding: 0, borderRadius: "50%", borderColor: "var(--line-strong)" }}>→</button>
          </div>
        </div>
        <div className="grid cols-4">
          {items.slice(0, 4).map(p => <ProductCard key={p.id} p={p} onOpen={onOpen} />)}
        </div>
      </div>
    </section>
  );
};

const Bundles = ({ onOpen }) => {
  const { bundles } = window.APP_DATA;
  return (
    <section style={{ padding: "100px 0", background: "var(--bg-soft)", borderRadius: "var(--radius-xl)", margin: "0 16px" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>· Coffrets cadeaux</div>
          <h2 className="h-serif" style={{ fontSize: "clamp(40px, 5vw, 64px)", maxWidth: 700, margin: "0 auto" }}>
            L'art d'offrir le bain, emballé à la main.
          </h2>
        </div>
        <div className="grid cols-3">
          {bundles.map(b => {
            const sw = SWATCH[b.swatch];
            return (
              <div key={b.id} className="card" style={{ padding: 28, background: "#fff" }}>
                <div style={{ position: "relative", borderRadius: "var(--radius-md)", overflow: "hidden", aspectRatio: "1/0.9", background: sw.soft, padding: 24 }}>
                  <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
                    <div style={{
                      width: "60%", aspectRatio: "1/1.2", background: "rgba(255,255,255,0.6)",
                      border: `2px solid ${sw.b}`, borderRadius: 8,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-soft)",
                      transform: "rotate(-2deg)",
                    }}>
                      // coffret
                    </div>
                  </div>
                  <span className={`tag tag-${b.swatch}`} style={{ position: "absolute", top: 16, left: 16, background: "#fff" }}>{b.tag}</span>
                </div>
                <div style={{ marginTop: 20 }}>
                  <h3 className="h-display" style={{ fontSize: 28, marginBottom: 10 }}>{b.name}</h3>
                  <p style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 14, lineHeight: 1.5 }}>{b.story}</p>
                  <ul style={{ listStyle: "none", marginBottom: 18, fontSize: 13, color: "var(--ink-soft)" }}>
                    {b.includes.map((x, i) => <li key={i} style={{ padding: "6px 0", borderTop: i ? "1px dashed var(--line-strong)" : "none" }}>+ {x}</li>)}
                  </ul>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: 22, fontWeight: 600 }}>{b.price}</span>
                      <span style={{ fontSize: 13, color: "var(--ink-mute)", textDecoration: "line-through", marginLeft: 8 }}>{b.was}</span>
                    </div>
                    <button className="btn btn-sm">Offrir →</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Quiz = () => {
  const [step, setStep] = React.useState(0);
  const questions = [
    { q: "Votre humeur du soir ?", opts: ["Cocooning", "Énergique", "Romantique", "Méditatif"] },
    { q: "Une fragrance qui vous transporte ?", opts: ["Florale", "Gourmande", "Boisée", "Aquatique"] },
    { q: "Votre temps idéal de bain ?", opts: ["20 min express", "45 min rituel", "1h+ marathon", "Variable"] },
  ];
  const total = questions.length;

  if (step >= total) {
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>✿</div>
        <h3 className="h-display" style={{ fontSize: 36, marginBottom: 12 }}>Le Rituel du Dimanche</h3>
        <p style={{ color: "var(--ink-soft)", marginBottom: 24, maxWidth: 380, margin: "0 auto 24px" }}>
          Cocooning, floral, durée moyenne&nbsp;: notre coffret signature est fait pour vous.
        </p>
        <button className="btn">Découvrir mon rituel →</button>
        <div>
          <button onClick={() => setStep(0)} style={{ marginTop: 16, fontSize: 13, color: "var(--ink-soft)", textDecoration: "underline" }}>Recommencer</button>
        </div>
      </div>
    );
  }

  const cur = questions[step];
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? "var(--ink)" : "var(--line-strong)" }} />
        ))}
      </div>
      <div className="eyebrow" style={{ marginBottom: 12 }}>Question {step + 1} / {total}</div>
      <h3 className="h-display" style={{ fontSize: 36, marginBottom: 24 }}>{cur.q}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {cur.opts.map((opt, i) => (
          <button
            key={i}
            onClick={() => setStep(step + 1)}
            style={{
              padding: "20px 18px", borderRadius: "var(--radius-md)",
              background: "rgba(255,255,255,0.6)", border: "1.5px solid var(--line-strong)",
              fontSize: 15, fontWeight: 500, textAlign: "left",
              transition: "all .25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--pink)"; e.currentTarget.style.borderColor = "var(--pink-deep)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "var(--line-strong)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

const QuizSection = () => (
  <section style={{ padding: "100px 0" }}>
    <div className="container">
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center",
        background: "linear-gradient(135deg, var(--mint) 0%, var(--lilac) 100%)",
        borderRadius: "var(--radius-xl)", padding: "72px 64px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -100, right: -100, width: 360, height: 360, borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), transparent 70%)",
        }} />
        <div style={{ position: "relative" }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>· Quiz · 60 secondes</div>
          <h2 className="h-display" style={{ fontSize: "clamp(40px, 5vw, 64px)", marginBottom: 20, lineHeight: 0.95 }}>
            Trouvez<br/>votre rituel<br/>idéal.
          </h2>
          <p style={{ fontSize: 16, color: "var(--ink-soft)", maxWidth: 360 }}>
            Trois questions, une recommandation sur-mesure parmi nos 118 références.
            Curieux de savoir ce que votre humeur révèle&nbsp;?
          </p>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)",
          borderRadius: "var(--radius-lg)", padding: 36,
          position: "relative",
        }}>
          <Quiz />
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => {
  const t = window.APP_DATA.testimonials;
  return (
    <section style={{ padding: "100px 0" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>· 8 412 avis · 4,9 / 5</div>
          <h2 className="h-serif" style={{ fontSize: "clamp(40px, 5vw, 56px)" }}>Pourquoi <span className="wavy">on nous aime</span>.</h2>
        </div>
        <div className="grid cols-3">
          {t.map((x, i) => (
            <div key={i} style={{
              padding: 32, borderRadius: "var(--radius-lg)",
              background: i === 1 ? "var(--pink)" : "#fff", border: i !== 1 ? "1px solid var(--line)" : "none",
            }}>
              <Stars n={x.rating} />
              <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.55, fontFamily: "var(--font-display)" }}>
                « {x.text} »
              </p>
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(42,31,45,0.12)", display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <div>
                  <strong>{x.name}</strong> · {x.city}
                </div>
                <div style={{ color: "var(--ink-soft)" }}>{x.product}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Newsletter = () => (
  <section style={{ padding: "80px 0" }}>
    <div className="container">
      <div style={{
        background: "var(--ink)", color: "var(--bg)",
        borderRadius: "var(--radius-xl)", padding: "72px 48px",
        position: "relative", overflow: "hidden",
        textAlign: "center",
      }}>
        {/* decorative bubbles */}
        <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.15 }}>
          <div style={{ position: "absolute", top: 30, left: "10%", width: 80, height: 80, borderRadius: "50%", background: "var(--pink)", animation: "wobble 6s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: 20, right: "8%", width: 60, height: 60, borderRadius: "50%", background: "var(--mint)", animation: "wobble 8s ease-in-out infinite reverse" }} />
          <div style={{ position: "absolute", top: 60, right: "30%", width: 40, height: 40, borderRadius: "50%", background: "var(--vanilla)", animation: "wobble 5s ease-in-out infinite" }} />
        </div>
        <div style={{ position: "relative", maxWidth: 540, margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "rgba(255,249,244,0.6)", marginBottom: 16 }}>· Le Journal</div>
          <h2 className="h-display" style={{ fontSize: "clamp(40px, 5vw, 56px)", marginBottom: 16, lineHeight: 1 }}>
            -15% sur votre<br/>1ʳᵉ commande.
          </h2>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 32 }}>
            Une lettre par mois&nbsp;: nouveautés, conseils rituels, accès aux ventes privées. Pas de spam, promis.
          </p>
          <form onSubmit={(e) => e.preventDefault()} style={{
            display: "flex", gap: 8, background: "rgba(255,249,244,0.1)", padding: 6, borderRadius: 999,
            maxWidth: 420, margin: "0 auto", border: "1px solid rgba(255,249,244,0.2)",
          }}>
            <input type="email" placeholder="votre@email.com" style={{
              flex: 1, background: "transparent", border: 0, padding: "0 18px",
              color: "var(--bg)", fontSize: 14, outline: "none", fontFamily: "inherit",
            }} />
            <button className="btn btn-sm" style={{ background: "var(--pink-deep)", color: "var(--ink)" }}>S'abonner</button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const HomePage = ({ onNav, onOpen }) => (
  <>
    <Hero />
    <BenefitsBar />
    <Collections onNav={onNav} />
    <Bestsellers onOpen={onOpen} />
    <Bundles />
    <QuizSection />
    <Testimonials />
    <Newsletter />
  </>
);

window.HomePage = HomePage;
