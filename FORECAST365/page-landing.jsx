// Landing — public-facing editorial page
const Landing = ({ onSignIn, onSignUp }) => {
  return (
    <div className="landing">
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
        </nav>
        <div className="landing-nav-cta">
          <button className="btn btn-ghost" onClick={onSignIn}>Iniciar sesión</button>
          <button className="btn btn-primary" onClick={onSignUp}>Crear cuenta</button>
        </div>
      </header>

      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-text">
          <div className="eyebrow gold" style={{ marginBottom: 18 }}>Plataforma de transferencia de conocimiento · Santa Cruz, Bolivia</div>
          <h1 className="landing-h1">
            El conocimiento de toda una vida<br/>
            <em>no debería jubilarse.</em>
          </h1>
          <p className="landing-lede">
            Legacy conecta a profesionales senior con empresas que necesitan su criterio. Convertimos la salida de un líder en un activo para la organización — y en el próximo capítulo de su carrera.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
            <button className="btn btn-primary landing-cta-btn" onClick={() => onSignUp("empresa")}>
              Soy empresa <Icon name="arrow-right" size={14} />
            </button>
            <button className="btn btn-gold landing-cta-btn" onClick={() => onSignUp("senior")}>
              Soy senior <Icon name="arrow-right" size={14} />
            </button>
            <button className="btn btn-ghost landing-cta-btn" onClick={onSignIn}>Ya tengo cuenta →</button>
          </div>

          <div className="landing-trust">
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
          <div className="hero-card hero-card-1">
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

          <div className="hero-card hero-card-2">
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
      <section className="landing-stats">
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
      <section id="manifiesto" className="landing-manifest">
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
      <section id="modos" className="landing-modes">
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
      <section className="landing-split">
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
      <section className="landing-testimonial">
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
