// Mobile companion (iOS-ish) for the senior — Lorgio on the road
const MobileCompanion = () => {
  const D = window.LegacyData;
  const me = D.SENIORS.lorgio;
  const tp = D.TRANSFER_PROGRAM;

  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 30, transform: "scale(0.55)", transformOrigin: "bottom right", filter: "drop-shadow(0 24px 48px rgba(14,26,43,0.25))" }} className="mobile-companion-wrap fade-up">
      <div className="mobile-frame">
        <div className="mobile-screen">
          {/* Status bar */}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 28px 8px", fontSize: 13, color: "var(--ink)", fontFamily: "var(--mono)", fontWeight: 600 }}>
            <span>9:41</span>
            <span>● ● ●</span>
          </div>

          {/* Header */}
          <div style={{ padding: "12px 22px 0" }}>
            <div className="eyebrow" style={{ fontSize: 9.5 }}>Buenos días</div>
            <div className="serif" style={{ fontSize: 24, fontWeight: 500, lineHeight: 1.1 }}>Lorgio</div>
          </div>

          {/* Today card */}
          <div style={{ margin: "16px 16px 12px", padding: 16, background: "var(--bg-deep)", color: "var(--gold-soft)", borderRadius: 12 }}>
            <div className="eyebrow" style={{ color: "var(--gold-soft)", opacity: 0.7, fontSize: 9 }}>Hoy · 14:00</div>
            <div className="serif" style={{ color: "#fff", fontSize: 18, fontWeight: 500, margin: "6px 0" }}>Sombra con Juan</div>
            <div style={{ fontSize: 11.5, opacity: 0.8 }}>Línea 3 · cambio de turno</div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="btn btn-gold" style={{ flex: 1, padding: "8px 0", fontSize: 11 }}>Abrir</button>
              <button className="icon-btn" style={{ background: "rgba(255,255,255,0.06)", color: "var(--gold-soft)" }}><Icon name="phone" size={14} /></button>
            </div>
          </div>

          {/* Progress widget */}
          <div style={{ margin: "0 16px 12px", padding: 14, background: "#fff", borderRadius: 12, border: "1px solid var(--line)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div className="eyebrow" style={{ fontSize: 9.5 }}>Programa con Juan</div>
              <span className="mono" style={{ fontSize: 11, fontWeight: 600 }}>48%</span>
            </div>
            <div className="progress" style={{ marginTop: 8 }}><div className="progress-bar" style={{ width: "48%" }}></div></div>
            <div className="mono muted" style={{ fontSize: 10, marginTop: 6 }}>Mes 3 de 6 · módulo 3</div>
          </div>

          {/* Quick actions */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "0 16px 12px" }}>
            {[
              { i: "chat", l: "Mensajes", n: 2 },
              { i: "calendar", l: "Agenda", n: 0 },
              { i: "billing", l: "Honorarios", n: 0 },
              { i: "market", l: "Marketplace", n: 4 },
            ].map(a => (
              <div key={a.l} style={{ background: "#fff", borderRadius: 12, padding: 12, border: "1px solid var(--line)", position: "relative" }}>
                <Icon name={a.i} size={18} color="var(--gold-2)" />
                <div style={{ fontSize: 12, fontWeight: 500, marginTop: 8 }}>{a.l}</div>
                {a.n > 0 && <div style={{ position: "absolute", top: 8, right: 8, background: "var(--gold)", color: "#fff", borderRadius: 10, fontSize: 9, padding: "2px 6px", fontFamily: "var(--mono)", fontWeight: 600 }}>{a.n}</div>}
              </div>
            ))}
          </div>

          {/* Recent message */}
          <div style={{ margin: "0 16px 12px", padding: 12, background: "#fff", borderRadius: 12, border: "1px solid var(--line)", display: "flex", gap: 10 }}>
            <Avatar initials="JA" size="sm" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontSize: 12, fontWeight: 500 }}>Juan Antelo</div>
                <div className="mono muted" style={{ fontSize: 9 }}>08:25</div>
              </div>
              <div style={{ fontSize: 11, color: "var(--ink-2)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Andrea preguntó si registramos esto…</div>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(245,241,234,0.92)", backdropFilter: "blur(8px)", borderTop: "1px solid var(--line)", padding: "10px 0 22px", display: "flex", justifyContent: "space-around" }}>
            {[
              { i: "home", l: "Hoy", a: true },
              { i: "transfer", l: "Programa" },
              { i: "chat", l: "Mensajes" },
              { i: "profile", l: "Perfil" },
            ].map(t => (
              <div key={t.l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: t.a ? "var(--gold-2)" : "var(--ink-3)" }}>
                <Icon name={t.i} size={18} />
                <span className="mono" style={{ fontSize: 8.5 }}>{t.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", top: -32, right: 12, transform: "scale(1.8)", transformOrigin: "top right", color: "var(--ink-3)", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
        ↑ App móvil
      </div>
    </div>
  );
};

window.MobileCompanion = MobileCompanion;
