// Senior dashboard — Lorgio's main view
const { useState, useEffect, useRef, useMemo } = React;

const SeniorDashboard = ({ persona, onNavigate, pushToast }) => {
  const D = window.LegacyData;
  const me = D.SENIORS.lorgio;
  const tp = D.TRANSFER_PROGRAM;

  const [hours, setHours] = useState(64);
  useEffect(() => {
    const t = setInterval(() => setHours(h => h + (Math.random() > 0.7 ? 0.5 : 0)), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Panel · Consultor Senior</div>
          <h1 className="page-title">Buenos días, <span style={{ fontStyle: "italic", color: "var(--gold-2)" }}>Lorgio</span></h1>
          <div className="page-sub">Tienes <strong>1 traspaso interno</strong> en curso con FlexoCruz y <strong>2 invitaciones</strong> del Marketplace pendientes de revisión.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost" onClick={() => onNavigate("profile")}>Ver mi perfil público</button>
          <button className="btn btn-primary" onClick={() => { pushToast("Sesión iniciada con Juan Antelo"); onNavigate("session"); }}>
            <Icon name="video" size={14} /> Iniciar sesión con Juan
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        <div className="stat fade-up" style={{ animationDelay: "0.05s" }}>
          <div className="stat-label">Horas mes</div>
          <div className="stat-value mono">{hours.toFixed(1)}</div>
          <div className="stat-delta">↑ 12% vs feb</div>
        </div>
        <div className="stat fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="stat-label">Honorarios marzo</div>
          <div className="stat-value mono">$1.820</div>
          <div className="stat-delta">Liquidados el 30/03</div>
        </div>
        <div className="stat fade-up" style={{ animationDelay: "0.15s" }}>
          <div className="stat-label">Sesiones totales</div>
          <div className="stat-value mono">{tp.outcomes.sessions}</div>
          <div className="stat-delta">de 36 planificadas</div>
        </div>
        <div className="stat fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="stat-label">Reputación</div>
          <div className="stat-value mono">4.9</div>
          <div className="stat-delta">Top 5% senior</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20 }}>
        {/* Active transfer card */}
        <div className="card fade-up" style={{ animationDelay: "0.25s" }}>
          <div style={{ padding: "22px 22px 0" }}>
            <div className="program-hero-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div className="eyebrow">Programa activo · Modo 1 · Transferencia interna</div>
                <h3 className="serif" style={{ fontSize: 24, margin: "8px 0 4px" }}>{tp.title}</h3>
                <div className="muted" style={{ fontSize: 13 }}>FlexoCruz S.A. · Inicio {tp.start} · Cierre estimado {tp.end}</div>
              </div>
              <span className="badge"><span className="dot-status"></span>Mes 3 de 6</span>
            </div>

            <div className="dashboard-participants" style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 22, padding: "16px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar initials={me.photo} size="md" />
                <div>
                  <div style={{ fontWeight: 500 }}>{me.name.split(" ").slice(0,2).join(" ")}</div>
                  <div className="muted" style={{ fontSize: 12 }}>Consultor</div>
                </div>
              </div>
              <Icon name="arrow-right" color="var(--gold)" />
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar initials={tp.successor.photo} size="md" />
                <div>
                  <div style={{ fontWeight: 500 }}>{tp.successor.name}</div>
                  <div className="muted" style={{ fontSize: 12 }}>Sucesor · {tp.successor.title}</div>
                </div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar initials={tp.hr.photo} size="sm" />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{tp.hr.name}</div>
                  <div className="muted" style={{ fontSize: 11 }}>RRHH · supervisora</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span className="eyebrow">Avance del programa</span>
                <span className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{tp.progress}%</span>
              </div>
              <div className="progress"><div className="progress-bar" style={{ width: `${tp.progress}%` }}></div></div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 18, paddingBottom: 22 }}>
              <button className="btn btn-primary" onClick={() => onNavigate("transfer")}>Ver programa completo →</button>
              <button className="btn btn-ghost" onClick={() => onNavigate("session")}>Abrir sesión activa</button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card fade-up" style={{ animationDelay: "0.3s" }}>
          <div className="activity-head" style={{ padding: "20px 22px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
            <div className="serif" style={{ fontSize: 18, fontWeight: 500 }}>Actividad reciente</div>
            <button className="btn-text" style={{ fontSize: 12 }} onClick={() => pushToast("Notificaciones marcadas como leídas")}>Marcar leídas</button>
          </div>
          <div>
            {D.NOTIFICATIONS.map(n => (
              <div key={n.id} style={{ padding: "14px 22px", borderBottom: "1px solid var(--line)", display: "flex", gap: 12, background: n.unread ? "var(--gold-tint)" : "transparent" }}>
                <div style={{ marginTop: 2 }}>
                  <Icon name={n.type === "session" ? "video" : n.type === "match" ? "users" : n.type === "billing" ? "billing" : "bell"} size={14} color="var(--gold-2)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, lineHeight: 1.45 }}>{n.text}</div>
                  <div className="mono muted" style={{ fontSize: 10.5, marginTop: 4 }}>{n.time}</div>
                </div>
                {n.unread && <span className="dot-status" style={{ marginTop: 6 }}></span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Oportunidades para ti */}
      <div style={{ marginTop: 28 }}>
        <div className="section-h">
          <div>
            <div className="eyebrow">Modo 2 · Oportunidades para ti</div>
            <h3 className="serif" style={{ marginTop: 6 }}>Empresas que buscan a alguien como tú</h3>
          </div>
          <button className="btn-text" onClick={() => onNavigate("market")}>Ver oportunidades →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {D.OPPORTUNITIES.slice(0, 3).map((o, i) => (
            <div key={o.id} className="card card-pad fade-up" style={{ animationDelay: `${0.3 + i * 0.05}s`, cursor: "pointer" }} onClick={() => onNavigate("market")}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span className="badge neutral">{o.type}</span>
                <span className="mono muted" style={{ fontSize: 11 }}>{o.posted}</span>
              </div>
              <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 4 }}>{o.company}</div>
              <div className="muted" style={{ fontSize: 13, lineHeight: 1.4, marginBottom: 14, minHeight: 36 }}>{o.role}</div>
              <div className="gold-rule"></div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
                <span className="mono">{o.compensation}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: o.fit >= 85 ? "var(--good)" : "var(--gold-2)", fontWeight: 600 }}>match {o.fit}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.SeniorDashboard = SeniorDashboard;
