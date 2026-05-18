// Opportunities — vista del Senior (Lorgio).
// Aquí postula a proyectos / consultorías / asientos de comité
// publicados por empresas. NO ve perfiles de otros mentores.
const Opportunities = ({ persona, pushToast }) => {
  const D = window.LegacyData;
  const all = D.OPPORTUNITIES;
  const apps = D.APPLICATIONS;

  const [type, setType] = React.useState("Todas");
  const [sector, setSector] = React.useState("Todos");
  const [query, setQuery] = React.useState("");
  const [savedMap, setSavedMap] = React.useState(
    Object.fromEntries(all.map(o => [o.id, !!o.saved]))
  );
  const [appliedMap, setAppliedMap] = React.useState({});
  const [openOp, setOpenOp] = React.useState(null);
  const [appsOpen, setAppsOpen] = React.useState(false);
  const [prefsOpen, setPrefsOpen] = React.useState(false);
  const [prefs, setPrefs] = React.useState({
    sectors: ["Manufactura"],
    types: ["Consultor\u00eda", "Proyecto", "Comit\u00e9"],
    minFee: 1500,
    location: "Cualquier ubicaci\u00f3n",
    emailAlerts: true,
    weeklyDigest: true,
  });
  const { ApplicationsModal, SearchPrefsModal } = window.LegacyModals;

  const types = ["Todas", "Consultoría", "Mentoría", "Proyecto", "Comité", "Asesoría", "Programa"];
  const sectors = ["Todos", ...Array.from(new Set(all.map(o => o.sector)))];

  const filtered = all.filter(o => {
    if (type !== "Todas" && o.type !== type) return false;
    if (sector !== "Todos" && o.sector !== sector) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!o.role.toLowerCase().includes(q) &&
          !o.company.toLowerCase().includes(q) &&
          !o.expertise.some(e => e.toLowerCase().includes(q))) return false;
    }
    return true;
  }).sort((a, b) => b.fit - a.fit);

  const apply = (op) => {
    setAppliedMap(m => ({ ...m, [op.id]: true }));
    pushToast(`Postulación enviada a ${op.company}`);
    setOpenOp(null);
  };

  const toggleSave = (id) => {
    setSavedMap(m => ({ ...m, [id]: !m[id] }));
  };

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Modo 2 · Marketplace de Sabiduría</div>
          <h1 className="page-title">Oportunidades para ti</h1>
          <div className="page-sub">Empresas y comités que buscan un senior con tu trayectoria. Postula a las que te interesen — Legacy verifica antecedentes por ti.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost" onClick={() => setAppsOpen(true)}>
            <Icon name="filter" size={14} /> Mis postulaciones
            <span className="mono" style={{ background: "var(--gold-tint)", color: "var(--gold-2)", padding: "1px 7px", borderRadius: 10, fontSize: 11, marginLeft: 4 }}>{apps.length}</span>
          </button>
          <button className="btn btn-primary" onClick={() => setPrefsOpen(true)}><Icon name="settings" size={14} /> Preferencias de búsqueda</button>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        <div className="stat">
          <div className="stat-label">Oportunidades activas</div>
          <div className="stat-value mono">{all.length}</div>
          <div className="stat-delta">3 nuevas esta semana</div>
        </div>
        <div className="stat">
          <div className="stat-label">Tus postulaciones</div>
          <div className="stat-value mono">{apps.length}</div>
          <div className="stat-delta">1 entrevista agendada</div>
        </div>
        <div className="stat">
          <div className="stat-label">Match promedio</div>
          <div className="stat-value mono">{Math.round(all.reduce((s, o) => s + o.fit, 0) / all.length)}%</div>
          <div className="stat-delta">↑ por tu expertise en producción</div>
        </div>
        <div className="stat">
          <div className="stat-label">Guardadas</div>
          <div className="stat-value mono">{Object.values(savedMap).filter(Boolean).length}</div>
          <div className="stat-delta">en tu lista corta</div>
        </div>
      </div>

      {/* Mis postulaciones */}
      <div className="card" style={{ marginBottom: 28, overflow: "hidden" }}>
        <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="serif" style={{ fontSize: 18, fontWeight: 500 }}>Tus postulaciones en curso</div>
            <div className="mono muted" style={{ fontSize: 11 }}>Estado actualizado en tiempo real</div>
          </div>
          <button className="btn-text" style={{ fontSize: 12 }}>Ver historial →</button>
        </div>
        <div className="rowlist">
          {apps.map(a => (
            <div key={a.id} className="row" style={{ gridTemplateColumns: "1.5fr 1.2fr 1fr 0.6fr auto", padding: "14px 22px" }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{a.role}</div>
                <div className="muted" style={{ fontSize: 12 }}>{a.company}</div>
              </div>
              <div>
                <span className="badge" style={{ background: "transparent", color: a.color, borderColor: a.color }}>
                  <span className="dot-status" style={{ background: a.color }}></span>{a.status}
                </span>
              </div>
              <div className="mono muted" style={{ fontSize: 12 }}>{a.date}</div>
              <div></div>
              <button className="btn-text" style={{ fontSize: 12 }}>Detalles →</button>
            </div>
          ))}
        </div>
      </div>

      {/* Filtros */}
      <div className="card" style={{ padding: "14px 18px", marginBottom: 18, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flex: 1, minWidth: 240 }}>
          <Icon name="search" size={14} color="var(--ink-3)" />
          <input
            placeholder="Buscar por empresa, rol o expertise…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ border: "none", outline: "none", background: "transparent", fontSize: 13.5, flex: 1, fontFamily: "var(--sans)" }}
          />
        </div>
        <div className="divider-vert" style={{ height: 24 }}></div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {types.map(f => (
            <span key={f} className={`chip ${type === f ? "active" : ""}`} onClick={() => setType(f)}>{f}</span>
          ))}
        </div>
        <select className="select" value={sector} onChange={e => setSector(e.target.value)} style={{ width: "auto", minWidth: 180 }}>
          {sectors.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="mono muted" style={{ fontSize: 11, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>{filtered.length} oportunidades · ordenadas por compatibilidad con tu perfil</span>
        {(type !== "Todas" || sector !== "Todos" || query) && (
          <button className="btn-text" style={{ fontSize: 11 }} onClick={() => { setType("Todas"); setSector("Todos"); setQuery(""); pushToast("Filtros reseteados"); }}>Limpiar filtros ✕</button>
        )}
      </div>

      {/* Cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {filtered.map((o, i) => {
          const applied = appliedMap[o.id];
          const saved = savedMap[o.id];
          return (
            <div key={o.id} className="card fade-up" style={{ animationDelay: `${i * 0.04}s`, overflow: "hidden", position: "relative" }}>
              {o.badge && (
                <div style={{ background: "linear-gradient(90deg, var(--gold) 0%, var(--gold-2) 100%)", color: "#fff", padding: "5px 14px", fontSize: 10.5, fontFamily: "var(--mono)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  {o.badge} · {o.type}
                </div>
              )}
              <div style={{ padding: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span className="badge neutral">{o.type}</span>
                      <span className="mono muted" style={{ fontSize: 11 }}>{o.posted}</span>
                    </div>
                    <h3 className="serif" style={{ fontSize: 19, fontWeight: 500, lineHeight: 1.25, margin: "0 0 6px" }}>{o.role}</h3>
                    <div style={{ fontSize: 13, color: "var(--ink-2)" }}>
                      <strong>{o.company}</strong> · <span className="muted">{o.sector}</span>
                    </div>
                  </div>
                  {/* Fit ring */}
                  <FitRing value={o.fit} />
                </div>

                <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--ink-2)", margin: "14px 0 16px" }}>{o.description}</p>

                {/* Meta grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px 18px", padding: "14px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", fontSize: 12.5 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", color: "var(--ink-2)" }}>
                    <Icon name="clock" size={13} color="var(--gold-2)" /> {o.modality}
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", color: "var(--ink-2)" }}>
                    <Icon name="pin" size={13} color="var(--gold-2)" /> {o.location}
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", color: "var(--ink-2)" }}>
                    <Icon name="billing" size={13} color="var(--gold-2)" /> <span className="mono" style={{ fontWeight: 500 }}>{o.compensation}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", color: "var(--ink-2)" }}>
                    <Icon name="users" size={13} color="var(--gold-2)" /> {o.applicants} postulantes · {o.seats} cupo{o.seats > 1 ? "s" : ""}
                  </div>
                </div>

                {/* Expertise tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "14px 0" }}>
                  {o.expertise.map(e => (
                    <span key={e} style={{ fontSize: 11, padding: "3px 9px", background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 12, color: "var(--ink-2)" }}>{e}</span>
                  ))}
                </div>

                {/* Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
                  <div className="mono muted" style={{ fontSize: 11 }}>{o.deadline}</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      className="icon-btn"
                      title={saved ? "Quitar de guardadas" : "Guardar"}
                      onClick={() => toggleSave(o.id)}
                      style={{ color: saved ? "var(--gold)" : "var(--ink-3)" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "var(--gold)" : "none"} stroke={saved ? "var(--gold)" : "currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                    </button>
                    <button className="btn btn-ghost" style={{ padding: "7px 12px", fontSize: 12 }} onClick={() => setOpenOp(o)}>Ver detalle</button>
                    <button
                      className={`btn ${applied ? "btn-ghost" : "btn-primary"}`}
                      style={{ padding: "7px 14px", fontSize: 12 }}
                      onClick={() => applied ? null : apply(o)}
                      disabled={applied}
                    >
                      {applied ? "Postulado ✓" : "Postular"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail modal */}
      {openOp && (
        <div className="modal-backdrop" onClick={() => setOpenOp(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 640 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <span className="badge neutral">{openOp.type}</span>
                  {openOp.badge && <span className="badge">{openOp.badge}</span>}
                </div>
                <h2 className="serif" style={{ fontSize: 26, margin: 0, fontWeight: 500, lineHeight: 1.2 }}>{openOp.role}</h2>
                <div style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 6 }}><strong>{openOp.company}</strong> · {openOp.sector}</div>
              </div>
              <button className="icon-btn" onClick={() => setOpenOp(null)}><Icon name="x" /></button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
              <FitRing value={openOp.fit} size={56} />
              <div style={{ flex: 1 }}>
                <div className="eyebrow">Tu compatibilidad</div>
                <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 4 }}>
                  Tu experiencia en <strong>{openOp.expertise[0]}</strong> coincide con el {openOp.fit}% de lo solicitado. {openOp.applicants} senior(es) han postulado.
                </div>
              </div>
            </div>

            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-2)", margin: "18px 0" }}>{openOp.description}</p>

            <div className="eyebrow" style={{ marginBottom: 8 }}>Detalles del compromiso</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 18px", marginBottom: 18, fontSize: 13 }}>
              <div><span className="mono muted" style={{ fontSize: 11 }}>MODALIDAD</span><div>{openOp.modality}</div></div>
              <div><span className="mono muted" style={{ fontSize: 11 }}>UBICACIÓN</span><div>{openOp.location}</div></div>
              <div><span className="mono muted" style={{ fontSize: 11 }}>HONORARIOS</span><div className="mono" style={{ fontWeight: 600 }}>{openOp.compensation}</div></div>
              <div><span className="mono muted" style={{ fontSize: 11 }}>FECHA LÍMITE</span><div>{openOp.deadline}</div></div>
            </div>

            <div className="eyebrow" style={{ marginBottom: 8 }}>Expertise solicitado</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
              {openOp.expertise.map(e => (
                <span key={e} className="chip" style={{ cursor: "default" }}>{e}</span>
              ))}
            </div>

            <div className="card card-pad" style={{ background: "var(--bg)", marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar initials={openOp.contact.photo} size="md" />
              <div style={{ flex: 1 }}>
                <div className="eyebrow">Contacto en la empresa</div>
                <div style={{ fontSize: 14, fontWeight: 500, marginTop: 2 }}>{openOp.contact.name}</div>
                <div className="muted" style={{ fontSize: 12 }}>{openOp.contact.role}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button className="btn btn-ghost" onClick={() => setOpenOp(null)}>Cerrar</button>
              <button className="btn btn-primary" onClick={() => apply(openOp)}>Postular ahora →</button>
            </div>
          </div>
        </div>
      )}
      {appsOpen && <ApplicationsModal onClose={() => setAppsOpen(false)} pushToast={pushToast} />}
      {prefsOpen && <SearchPrefsModal onClose={() => setPrefsOpen(false)} prefs={prefs} setPrefs={setPrefs} pushToast={pushToast} />}
    </div>
  );
};

// Compatibility ring
const FitRing = ({ value, size = 44 }) => {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  const color = value >= 85 ? "var(--good)" : value >= 70 ? "var(--gold)" : "var(--ink-4)";
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} stroke="var(--line)" strokeWidth="3" fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} style={{ transition: "stroke-dashoffset 0.6s" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--mono)", fontSize: size > 50 ? 14 : 12, fontWeight: 600, color }}>{value}%</div>
    </div>
  );
};

window.Opportunities = Opportunities;
