// Auth — login & register
// Selector de rol que define qué vista verá el usuario al entrar.
const Auth = ({ mode: initialMode = "login", initialRole = "senior", onSignIn, onBackToLanding }) => {
  const [mode, setMode] = React.useState(initialMode);
  const [role, setRole] = React.useState(initialRole);
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    name: "",
    company: "",
    sector: "",
    yearsExp: "",
    accept: false,
  });

  React.useEffect(() => { setMode(initialMode); }, [initialMode]);
  React.useEffect(() => { setRole(initialRole); }, [initialRole]);

  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const ROLES = [
    {
      id: "senior",
      label: "Senior",
      sub: "Quiero compartir mi experiencia",
      icon: "users",
      example: "Lorgio Saucedo · 64 · Gerente de Producción",
      tagline: "Postula a proyectos, mentorías y comités. Acompaña tu propio relevo.",
    },
    {
      id: "empresa",
      label: "Empresa",
      sub: "Dirección / Comité ejecutivo",
      icon: "briefcase",
      example: "Pablo Salvatierra · CEO FlexoCruz",
      tagline: "Panorama completo de sucesión, ROI y conocimiento preservado en la organización.",
    },
    {
      id: "hr",
      label: "RRHH",
      sub: "Gestión de talento y sucesión",
      icon: "profile",
      example: "Andrea Cuéllar · Gerente RRHH",
      tagline: "Diseña programas, busca mentores y reporta impacto al directorio.",
    },
    {
      id: "sucesor",
      label: "Sucesor",
      sub: "Estoy en un programa de traspaso",
      icon: "leaf",
      example: "Juan Antelo · Jefe de Planta",
      tagline: "Aprende de tu mentor con sesiones estructuradas y bitácora de decisiones.",
    },
  ];

  const selectedRole = ROLES.find(r => r.id === role);

  const demoLogins = {
    senior:  { email: "lorgio@flexocruz.bo", password: "demo-legacy" },
    empresa: { email: "p.salvatierra@flexocruz.bo", password: "demo-legacy" },
    hr:      { email: "a.cuellar@flexocruz.bo", password: "demo-legacy" },
    sucesor: { email: "j.antelo@flexocruz.bo", password: "demo-legacy" },
  };

  const submit = (e) => {
    if (e) e.preventDefault();
    onSignIn(role);
  };

  const useDemo = () => {
    const d = demoLogins[role];
    setForm(f => ({ ...f, email: d.email, password: d.password }));
    setTimeout(() => onSignIn(role), 280);
  };

  return (
    <div className="auth">
      {/* Left brand panel */}
      <div className="auth-side">
        <button className="auth-back" onClick={onBackToLanding}>
          ← Volver al inicio
        </button>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 460 }}>
          <div className="brand" style={{ marginBottom: 40 }}>
            <img src="/Logo-1.png" alt="Legacy" className="brand-mark" style={{ height: 44 }} />
          </div>
          <div className="eyebrow" style={{ color: "var(--gold-soft)", opacity: 0.7, marginBottom: 18 }}>Manifiesto · 2026</div>
          <blockquote className="auth-quote">
            "El conocimiento de toda una vida no debería jubilarse. Lo construimos con cuarenta años de oficio — la pregunta es qué hacemos con él el día siguiente al brindis de despedida."
          </blockquote>
          <div className="auth-quote-author">
            <Avatar initials="LS" size="md" />
            <div>
              <div style={{ color: "#fff", fontWeight: 500, fontSize: 14 }}>Lorgio Saucedo</div>
              <div style={{ color: "rgba(232,217,184,0.6)", fontSize: 12 }}>Gerente de Producción · FlexoCruz</div>
            </div>
          </div>
        </div>

        <div className="auth-side-foot">
          <span className="mono" style={{ fontSize: 11 }}>Santa Cruz · 2026</span>
          <span className="mono" style={{ fontSize: 11, opacity: 0.5 }}>v1.0 MVP</span>
        </div>

        {/* Decorative pattern */}
        <svg className="auth-pattern" aria-hidden viewBox="0 0 400 400">
          <defs>
            <pattern id="auth-cross" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M12 0v24M0 12h24" stroke="var(--gold-soft)" strokeWidth="0.4" opacity="0.4"/>
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#auth-cross)" />
        </svg>
      </div>

      {/* Right form */}
      <div className="auth-form-wrap">
        <div className="auth-form">
          <div className="auth-mode-tabs">
            <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Iniciar sesión</button>
            <button className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>Crear cuenta</button>
          </div>

          <h1 className="serif auth-title">
            {mode === "login" ? "Bienvenida(o) de regreso" : "Tu próximo capítulo empieza aquí"}
          </h1>
          <p className="auth-sub">
            {mode === "login"
              ? "Entra con tu correo o usa una cuenta de demostración por rol."
              : "Te tomará 30 segundos. Configuramos tu panel según el rol que selecciones."}
          </p>

          {/* Role selector */}
          <div className="auth-roles">
            {ROLES.map(r => (
              <button
                key={r.id}
                type="button"
                className={`auth-role ${role === r.id ? "selected" : ""}`}
                onClick={() => setRole(r.id)}
              >
                <Icon name={r.icon} size={18} color={role === r.id ? "var(--gold)" : "var(--ink-3)"} />
                <div>
                  <div className="auth-role-label">{r.label}</div>
                  <div className="auth-role-sub">{r.sub}</div>
                </div>
                {role === r.id && (
                  <div className="auth-role-check"><Icon name="check" size={12} color="#fff" strokeWidth={2.6} /></div>
                )}
              </button>
            ))}
          </div>

          <div className="auth-role-hint">
            <div className="mono" style={{ fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold-2)", marginBottom: 4 }}>Verás como · {selectedRole.label}</div>
            <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.45 }}>{selectedRole.tagline}</div>
          </div>

          <form onSubmit={submit} style={{ marginTop: 22 }}>
            {mode === "register" && (
              <>
                <div className="auth-field">
                  <label className="label">Nombre completo</label>
                  <input className="input" placeholder={selectedRole.example.split(" · ")[0]} value={form.name} onChange={handle("name")} />
                </div>
                <div className="auth-field-row">
                  <div className="auth-field">
                    <label className="label">{role === "senior" ? "Última empresa" : "Empresa"}</label>
                    <input className="input" placeholder="Ej. FlexoCruz S.A." value={form.company} onChange={handle("company")} />
                  </div>
                  {role === "senior" && (
                    <div className="auth-field" style={{ width: 130 }}>
                      <label className="label">Años de exp.</label>
                      <input className="input" placeholder="40" value={form.yearsExp} onChange={handle("yearsExp")} />
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="auth-field">
              <label className="label">Correo</label>
              <input className="input" type="email" placeholder="nombre@empresa.bo" value={form.email} onChange={handle("email")} />
            </div>

            <div className="auth-field">
              <label className="label">Contraseña</label>
              <input className="input" type="password" placeholder="••••••••" value={form.password} onChange={handle("password")} />
              {mode === "login" && (
                <div style={{ textAlign: "right", marginTop: 6 }}>
                  <a style={{ fontSize: 12, color: "var(--gold-2)", cursor: "pointer" }}>¿Olvidaste tu contraseña?</a>
                </div>
              )}
            </div>

            {mode === "register" && (
              <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 12.5, color: "var(--ink-2)", margin: "8px 0 18px" }}>
                <input type="checkbox" checked={form.accept} onChange={e => setForm(f => ({ ...f, accept: e.target.checked }))} style={{ marginTop: 3 }} />
                <span>Acepto los términos del servicio y autorizo a Legacy a verificar mi trayectoria con empresas pares.</span>
              </label>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px 16px", fontSize: 14, marginTop: 4 }}>
              {mode === "login" ? "Entrar" : "Crear cuenta"} <Icon name="arrow-right" size={14} />
            </button>
          </form>

          <div className="auth-divider"><span>o</span></div>

          <button className="btn btn-ghost" style={{ width: "100%", padding: "11px 16px" }} onClick={useDemo}>
            <Icon name="play" size={14} color="var(--gold-2)" /> Entrar con cuenta demo de <strong style={{ marginLeft: 4 }}>{selectedRole.label}</strong>
          </button>
          <div className="mono muted" style={{ fontSize: 10.5, textAlign: "center", marginTop: 10, lineHeight: 1.4 }}>
            Cuentas demo: lorgio · andrea · juan · pablo @flexocruz.bo · contraseña <code style={{ background: "var(--bg)", padding: "1px 5px", borderRadius: 3 }}>demo-legacy</code>
          </div>

          <div style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "var(--ink-3)" }}>
            {mode === "login" ? (
              <>¿Aún no tienes cuenta? <a style={{ color: "var(--gold-2)", cursor: "pointer", fontWeight: 500 }} onClick={() => setMode("register")}>Regístrate</a></>
            ) : (
              <>¿Ya tienes cuenta? <a style={{ color: "var(--gold-2)", cursor: "pointer", fontWeight: 500 }} onClick={() => setMode("login")}>Inicia sesión</a></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

window.Auth = Auth;
