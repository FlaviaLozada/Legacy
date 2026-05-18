// Landing — public-facing editorial page
const RUBROS = [
  {
    id: "manufactura",
    label: "Manufactura",
    icon: "⚙️",
    desc: "Producción industrial, Lean Manufacturing, control de calidad ISO y gestión de planta.",
    seniors: 1,
    ejemplo: "FlexoCruz S.A.",
    perfil: "Lorgio Saucedo · 40 años en extrusión y conversión flexográfica",
    tags: ["Producción", "Lean", "ISO 9001", "Calidad"],
  },
  {
    id: "agroindustria",
    label: "Agroindustria",
    icon: "🌾",
    desc: "Distribución mayorista, trade marketing, negociación con cadenas y cadena de suministro.",
    seniors: 1,
    ejemplo: "IASA",
    perfil: "Martha Aguilera · 33 años en distribución y comercialización",
    tags: ["Distribución", "Trade marketing", "Comercial"],
  },
  {
    id: "finanzas",
    label: "Finanzas industriales",
    icon: "📊",
    desc: "Planeación financiera, reestructuración, exportación y control de gestión para industria.",
    seniors: 1,
    ejemplo: "Tuboplast Bolivia",
    perfil: "Raúl Mendoza · 38 años en finanzas industriales y exportación",
    tags: ["Planeación", "Exportación", "Reestructuración"],
  },
  {
    id: "hidrocarburos",
    label: "Hidrocarburos",
    icon: "🔧",
    desc: "Operaciones de campo, gestión de gasoductos, HSE y contratistas en energía.",
    seniors: 1,
    ejemplo: "YPFB Andina",
    perfil: "Carlos Vargas · 42 años en operaciones de campo y gasoductos",
    tags: ["Operaciones", "HSE", "Gasoductos"],
  },
  {
    id: "talento",
    label: "Talento y RRHH",
    icon: "👥",
    desc: "Desarrollo de líderes, coaching ejecutivo, cultura organizacional y programas de sucesión.",
    seniors: 1,
    ejemplo: "Banco Mercantil SC",
    perfil: "Elena Justiniano · 35 años en desarrollo de líderes y RRHH",
    tags: ["Coaching", "Sucesión", "Cultura"],
  },
  {
    id: "energia",
    label: "Energía eléctrica",
    icon: "⚡",
    desc: "Mantenimiento predictivo, confiabilidad de subestaciones e ISO 55000.",
    seniors: 1,
    ejemplo: "CRE",
    perfil: "Enrique Pinto · 39 años en mantenimiento y subestaciones",
    tags: ["Mantenimiento", "Subestaciones", "ISO 55000"],
  },
];

const Landing = ({ onSignIn, onSignUp }) => {
  const [rubroActivo, setRubroActivo] = React.useState(null);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("anim-visible");
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".anim").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const seleccionarRubro = (rubro) => {
    setRubroActivo(rubro);
    setDropdownOpen(false);
    setTimeout(() => {
      const el = document.getElementById("categorias");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="landing" onClick={() => setDropdownOpen(false)}>
      {/* Nav */}
      <header className="landing-nav">
        <div className="landing-brand">
          <img src="/Logo-1.png" alt="Legacy" className="brand-mark" />
        </div>
        <nav className="landing-nav-links">
          <a href="#manifiesto">Manifiesto</a>
          <a href="#modos">Cómo funciona</a>
          <a href="#para-empresas">Para empresas</a>
          <a href="#para-seniors">Para seniors</a>
          <div className="nav-dropdown-wrap">
            <a className="nav-dropdown-trigger">
              Categorías <span style={{ fontSize: 9, marginLeft: 3 }}>▼</span>
            </a>
            <div className="nav-dropdown">
              {RUBROS.map(r => (
                <div key={r.id} className="nav-dropdown-item" onClick={() => seleccionarRubro(r)}>
                  {r.label}
                </div>
              ))}
            </div>
          </div>
        </nav>
        <div className="landing-nav-cta">
          <button className="btn btn-ghost" onClick={onSignIn}>Iniciar sesión</button>
          <button className="btn btn-primary" onClick={onSignUp}>Crear cuenta</button>
        </div>
      </header>

      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-text hero-text-enter">
          <div className="eyebrow gold anim" style={{ marginBottom: 18, animationDelay: "0.05s" }}>Plataforma de transferencia de conocimiento · Santa Cruz, Bolivia</div>
          <h1 className="landing-h1 anim" style={{ animationDelay: "0.15s" }}>
            El conocimiento de toda una vida<br/>
            <em>no debería jubilarse.</em>
          </h1>
          <p className="landing-lede anim" style={{ animationDelay: "0.28s" }}>
            Legacy conecta a profesionales senior con empresas que necesitan su criterio. Convertimos la salida de un líder en un activo para la organización — y en el próximo capítulo de su carrera.
          </p>
          <div className="anim" style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap", animationDelay: "0.4s" }}>
            <button className="btn btn-primary landing-cta-btn" onClick={() => onSignUp("empresa")}>
              Soy empresa <Icon name="arrow-right" size={14} />
            </button>
            <button className="btn btn-gold landing-cta-btn" onClick={() => onSignUp("senior")}>
              Soy senior <Icon name="arrow-right" size={14} />
            </button>
            <button className="btn btn-ghost landing-cta-btn" onClick={onSignIn}>Ya tengo cuenta →</button>
          </div>

          <div className="landing-trust anim" style={{ animationDelay: "0.52s" }}>
            <span className="mono muted" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>Construido con</span>
            <div className="landing-trust-logos">
              <span>CAINCO</span><span className="dot-sep">·</span>
              <span>FlexoCruz</span><span className="dot-sep">·</span>
              <span>Tuboplast</span><span className="dot-sep">·</span>
              <span>IASA</span><span className="dot-sep">·</span>
              <span>CRE</span>
            </div>
          </div>
        </div>

        <div className="landing-hero-art" aria-hidden>
          <div className="hero-card hero-card-1 hero-float-1">
            <div className="eyebrow gold">Programa activo</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0 12px" }}>
              <div className="avatar md">LS</div>
              <Icon name="arrow-right" color="var(--gold)" size={14} />
              <div className="avatar md" style={{ background: "linear-gradient(135deg,#5a6a8a,#3a4a6a)", color: "#fff" }}>JA</div>
            </div>
            <div className="serif" style={{ fontSize: 15, fontWeight: 500 }}>Gerencia de Producción</div>
            <div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>FlexoCruz · mes 3 de 6</div>
            <div className="progress" style={{ marginTop: 12 }}><div className="progress-bar" style={{ width: "48%" }}></div></div>
          </div>

          <div className="hero-card hero-card-2 hero-float-2">
            <div className="eyebrow">Oportunidad nueva</div>
            <div className="serif" style={{ fontSize: 15, fontWeight: 500, margin: "8px 0 4px" }}>Comité de Operaciones</div>
            <div className="muted" style={{ fontSize: 11.5 }}>Vascal S.A. · Cochabamba</div>
            <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="mono" style={{ fontSize: 11.5, fontWeight: 600 }}>USD 1.200 / sesión</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--good)", fontWeight: 600 }}>match 88%</span>
            </div>
          </div>

          <div className="hero-card hero-card-3">
            <div className="eyebrow">ROI 2026</div>
            <div className="serif" style={{ fontSize: 32, fontWeight: 500, color: "var(--gold-2)", marginTop: 6 }}>7,3×</div>
            <div className="muted" style={{ fontSize: 11.5 }}>inversión vs rotación evitada</div>
          </div>

          <svg className="hero-ornament" viewBox="0 0 200 200" aria-hidden>
            <defs>
              <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="var(--gold)" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#dots)" />
          </svg>
        </div>
      </section>

      {/* Stats bar */}
      <section className="landing-stats anim">
        {[
          { v: "40+", l: "Años de experiencia promedio de cada senior" },
          { v: "47", l: "Procesos documentados por programa" },
          { v: "78%", l: "Cobertura de sucesión en empresas piloto" },
          { v: "7,3×", l: "Retorno sobre rotación evitada" },
        ].map((s, i) => (
          <div key={i} className="landing-stat">
            <div className="serif landing-stat-v">{s.v}</div>
            <div className="landing-stat-l">{s.l}</div>
          </div>
        ))}
      </section>

      {/* Manifiesto */}
      <section id="manifiesto" className="landing-manifest anim">
        <div className="ornament">Manifiesto</div>
        <p className="landing-pull">
          <span className="serif">"En Bolivia se jubilan cada año cerca de </span>
          <span className="serif" style={{ color: "var(--gold-2)" }}>5.000 profesionales</span>
          <span className="serif"> con experiencia de mando. Sus empresas pierden, en promedio, </span>
          <span className="serif" style={{ color: "var(--gold-2)" }}>$180.000</span>
          <span className="serif"> en costos de rotación. Ellos pierden algo más difícil de medir: el sentido de seguir siendo útiles."</span>
        </p>
      </section>

      {/* Tres modos */}
      <section id="modos" className="landing-modes anim">
        <div className="section-h" style={{ marginBottom: 32 }}>
          <div>
            <div className="eyebrow">Tres formas de generar valor</div>
            <h2 className="landing-h2">Un solo ecosistema, tres modos.</h2>
          </div>
        </div>

        <div className="landing-modes-grid">
          {[
            {
              num: "01",
              label: "Modo 1",
              title: "Transferencia interna",
              desc: "El senior que se jubila acompaña a su sucesor durante 6 meses. Módulos, bitácoras y entregables miden el traspaso real de conocimiento.",
              who: "Para empresas con el sucesor identificado",
              icon: "transfer",
            },
            {
              num: "02",
              label: "Modo 2",
              title: "Marketplace de sabiduría",
              desc: "Una empresa publica una necesidad (mentor, consultor, asiento de comité). Los seniors postulan. Legacy verifica trayectoria y referencias.",
              who: "Para empresas y seniors externos",
              icon: "market",
            },
            {
              num: "03",
              label: "Modo 3",
              title: "Consultoría on-call",
              desc: "Cerrado el traspaso, el senior queda contratable por horas durante 12 meses. La organización conserva acceso a su criterio.",
              who: "Continuidad después del traspaso",
              icon: "phone",
            },
          ].map((m, i) => (
            <div key={i} className="landing-mode">
              <div className="landing-mode-num">{m.num}</div>
              <div className="eyebrow gold">{m.label}</div>
              <h3 className="serif landing-mode-title">{m.title}</h3>
              <p className="landing-mode-desc">{m.desc}</p>
              <div className="gold-rule" style={{ margin: "18px 0 12px" }}></div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{m.who}</div>
              <Icon name={m.icon} size={32} color="var(--gold)" />
            </div>
          ))}
        </div>
      </section>

      {/* Para empresas / Para seniors split */}
      <section className="landing-split anim">
        <div id="para-empresas" className="landing-split-side">
          <div className="eyebrow gold">Para empresas y RRHH</div>
          <h2 className="landing-h2" style={{ marginTop: 12 }}>Convierte una jubilación en un activo.</h2>
          <ul className="landing-list">
            {[
              "Programas estructurados de transferencia, no improvisación",
              "Bitácoras y entregables auditables para reporte ESG",
              "Marketplace verificado de mentores senior por sector",
              "Pipeline de jubilaciones y cobertura de sucesión",
              "ROI medible — promedio 7× vs costo de rotación",
            ].map(x => (
              <li key={x}><Icon name="check" size={14} color="var(--gold)" strokeWidth={2.4} /> {x}</li>
            ))}
          </ul>
          <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => onSignUp("empresa")}>
            Crear cuenta de empresa <Icon name="arrow-right" size={14} />
          </button>
        </div>

        <div className="landing-split-divider" aria-hidden></div>

        <div id="para-seniors" className="landing-split-side">
          <div className="eyebrow gold">Para profesionales senior</div>
          <h2 className="landing-h2" style={{ marginTop: 12 }}>Tu carrera no termina, evoluciona.</h2>
          <ul className="landing-list">
            {[
              "Acompaña tu propio relevo o postula a otras empresas",
              "Honorarios definidos por ti · liquidación mensual",
              "Verificación de tu trayectoria con empresas pares",
              "Asientos de comité, mentorías y proyectos por proyecto",
              "Membresía premium con visibilidad prioritaria",
            ].map(x => (
              <li key={x}><Icon name="check" size={14} color="var(--gold)" strokeWidth={2.4} /> {x}</li>
            ))}
          </ul>
          <button className="btn btn-gold" style={{ marginTop: 20 }} onClick={() => onSignUp("senior")}>
            Crear cuenta de senior <Icon name="arrow-right" size={14} />
          </button>
        </div>
      </section>

      {/* Testimonial */}
      <section className="landing-testimonial anim">
        <Ornament />
        <blockquote>
          <p className="landing-quote">
            Cuando un líder se jubila, la empresa no pierde solo a una persona: pierde criterio, red de contactos y decisiones tomadas miles de veces. Legacy convierte esa partida en una transferencia ordenada — y a quien se va, en un activo que sigue generando valor.
          </p>
          <footer>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: "50%", background: "rgba(232,217,184,0.12)", border: "1px solid var(--gold)" }}>
              <Icon name="book" size={20} color="var(--gold)" />
            </div>
            <div>
              <div style={{ fontWeight: 500, fontSize: 14, color: "#fff" }}>Manifiesto Legacy</div>
              <div className="muted" style={{ fontSize: 12 }}>Silver Ecosistema digital B2B · Bolivia</div>
            </div>
          </footer>
        </blockquote>
      </section>

      {/* Categorías / Rubros */}
      <section id="categorias" className="landing-categorias">
        <div className="section-h" style={{ marginBottom: 28 }}>
          <div>
            <div className="eyebrow gold">Rubros</div>
            <h2 className="landing-h2">Categorías de expertise</h2>
          </div>
        </div>

        <div className="landing-rubros-grid">
          {RUBROS.map(r => (
            <div
              key={r.id}
              className={`landing-rubro-card ${rubroActivo?.id === r.id ? "active" : ""}`}
              onClick={() => setRubroActivo(rubroActivo?.id === r.id ? null : r)}
            >
              <div className="rubro-label">{r.label}</div>
            </div>
          ))}
        </div>

        {rubroActivo && (
          <div className="rubro-detalle fade-in">
            {/* Header del rubro */}
            <div className="rubro-detalle-header">
              <div>
                <div className="eyebrow gold" style={{ marginBottom: 6 }}>{rubroActivo.label}</div>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: "60ch", margin: 0 }}>{rubroActivo.desc}</p>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignSelf: "flex-start" }}>
                {rubroActivo.tags.map(t => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>

            <div className="rubro-detalle-grid">
              {/* Card senior disponible */}
              <div className="rubro-senior-card">
                <div className="eyebrow" style={{ marginBottom: 14 }}>Senior disponible</div>
                <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 600, fontSize: 15, flexShrink: 0 }}>
                    {rubroActivo.perfil.split(" ").slice(0,2).map(w => w[0]).join("")}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "var(--gold-soft)" }}>{rubroActivo.perfil.split("·")[0].trim()}</div>
                    <div style={{ fontSize: 12, color: "rgba(232,217,184,0.6)", marginTop: 3 }}>{rubroActivo.perfil.split("·")[1]?.trim()}</div>
                  </div>
                </div>
                <div className="gold-rule" style={{ margin: "0 0 14px" }}></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                  <span style={{ color: "rgba(232,217,184,0.6)" }}>Empresa de origen</span>
                  <span style={{ color: "var(--gold-soft)", fontWeight: 500 }}>{rubroActivo.ejemplo}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 16 }}>
                  <span style={{ color: "rgba(232,217,184,0.6)" }}>Disponibilidad</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#6fcf97" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#6fcf97", display: "inline-block" }}></span>
                    Disponible
                  </span>
                </div>
                <button className="btn btn-gold" style={{ width: "100%", fontSize: 13 }} onClick={onSignUp}>
                  Ver perfil completo →
                </button>
              </div>

              {/* Card empresa que lo requiere */}
              <div className="rubro-empresa-card">
                <div className="eyebrow" style={{ marginBottom: 14 }}>Empresa que lo necesita</div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{rubroActivo.ejemplo}</div>
                  <div className="muted" style={{ fontSize: 13 }}>Busca un mentor con experiencia en {rubroActivo.label.toLowerCase()} para acompañar a su sucesor designado.</div>
                </div>
                <div className="gold-rule" style={{ margin: "0 0 14px" }}></div>
                <div style={{ display: "flex", gap: 8, fontSize: 12, marginBottom: 16 }}>
                  <span className="badge neutral">Transferencia interna</span>
                  <span className="badge neutral">Modo 1</span>
                </div>
                <button className="btn btn-primary" style={{ width: "100%", fontSize: 13 }} onClick={onSignUp}>
                  Publicar una necesidad →
                </button>
              </div>

              {/* Card ROI */}
              <div className="rubro-roi-card">
                <div className="eyebrow" style={{ marginBottom: 10, color: "var(--gold-soft)", opacity: 0.7 }}>Impacto en este rubro</div>
                <div className="serif" style={{ fontSize: 42, fontWeight: 500, color: "#fff", lineHeight: 1 }}>7,3×</div>
                <div style={{ fontSize: 13, color: "rgba(232,217,184,0.7)", marginTop: 6, marginBottom: 20 }}>retorno sobre rotación evitada</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { l: "Procesos documentados", v: "47" },
                    { l: "Horas de transferencia", v: "82h" },
                    { l: "Cobertura de sucesión", v: "78%" },
                  ].map(x => (
                    <div key={x.l} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, paddingBottom: 10, borderBottom: "1px solid rgba(232,217,184,0.1)" }}>
                      <span style={{ color: "rgba(232,217,184,0.6)" }}>{x.l}</span>
                      <span style={{ color: "#fff", fontWeight: 600, fontFamily: "var(--mono)" }}>{x.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* CTA final */}
      <section className="landing-final">
        <h2 className="serif landing-final-title">Empieza a construir tu propio Legacy.</h2>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}>
          <button className="btn btn-primary landing-cta-btn" onClick={onSignUp}>Crear cuenta</button>
          <button className="btn btn-ghost landing-cta-btn" onClick={onSignIn}>Iniciar sesión</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-row">
          <div>
            <div className="brand">
              <img src="/Logo-1.png" alt="Legacy" className="brand-mark" />
            </div>
            <div className="mono" style={{ color: "rgba(232,217,184,0.6)", fontSize: 11, marginTop: 8 }}>Santa Cruz · La Paz · Cochabamba</div>
          </div>
          <div className="landing-footer-links">
            <div>
              <div className="eyebrow" style={{ color: "rgba(232,217,184,0.6)" }}>Producto</div>
              <a>Cómo funciona</a><a>Para empresas</a><a>Para seniors</a><a>Precios</a>
            </div>
            <div>
              <div className="eyebrow" style={{ color: "rgba(232,217,184,0.6)" }}>Compañía</div>
              <a>Manifiesto</a><a>Equipo</a><a>Contacto</a><a>Prensa</a>
            </div>
            <div>
              <div className="eyebrow" style={{ color: "rgba(232,217,184,0.6)" }}>Legal</div>
              <a>Términos</a><a>Privacidad</a><a>Verificación</a>
            </div>
          </div>
        </div>
        <div className="landing-footer-bottom">
          <span className="mono" style={{ fontSize: 11 }}>© 2026 Legacy SRL · Construido en Bolivia</span>
          <span className="mono" style={{ fontSize: 11, opacity: 0.6 }}>v1.0 · MVP demo</span>
        </div>
      </footer>
    </div>
  );
};

window.Landing = Landing;
