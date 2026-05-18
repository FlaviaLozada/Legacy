// HR / Sustainability dashboard — Andrea Cuéllar's view at FlexoCruz
const HRDashboard = ({ onNavigate, pushToast }) => {
  const D = window.LegacyData;
  const tp = D.TRANSFER_PROGRAM;

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Panel · Gerencia RRHH</div>
          <h1 className="page-title">FlexoCruz S.A. · Programas activos</h1>
          <div className="page-sub">Tienes <strong>1 programa de transferencia interna</strong> en curso y <strong>2 mentorías</strong> contratadas en el Marketplace para acompañar nuevos cargos directivos.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost" onClick={() => onNavigate("market")}>Buscar mentor</button>
          <button className="btn btn-primary" onClick={() => pushToast("Nuevo programa de traspaso creado")}>
            <Icon name="plus" size={14} /> Nuevo programa
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        <div className="stat"><div className="stat-label">Programas activos</div><div className="stat-value mono">3</div><div className="stat-delta">2 traspasos · 1 marketplace</div></div>
        <div className="stat"><div className="stat-label">Conocimiento documentado</div><div className="stat-value mono">128</div><div className="stat-delta">procesos críticos · YTD</div></div>
        <div className="stat"><div className="stat-label">Inversión 2026</div><div className="stat-value mono">$24K</div><div className="stat-delta">vs $180K rotación evitada</div></div>
        <div className="stat"><div className="stat-label">Próximas jubilaciones</div><div className="stat-value mono">4</div><div className="stat-delta">en los próximos 18 meses</div></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20 }}>
        <div className="card">
          <div style={{ padding: "20px 22px", borderBottom: "1px solid var(--line)" }}>
            <div className="serif" style={{ fontSize: 20, fontWeight: 500 }}>Programas en curso</div>
          </div>
          <div className="rowlist">
            {[
              { who: "Lorgio Saucedo → Juan Antelo", role: "Gerencia de Producción", mode: "Transferencia interna", progress: 48, status: "En tiempo", color: "var(--good)" },
              { who: "Externo: Elena Justiniano", role: "Onboarding Gerente Comercial", mode: "Marketplace", progress: 60, status: "En tiempo", color: "var(--good)" },
              { who: "Carlos Rojas → Por designar", role: "Jefatura de Mantenimiento", mode: "Pendiente sucesor", progress: 8, status: "Atención", color: "var(--gold)" },
            ].map((p, i) => (
              <div key={i} className="row" style={{ gridTemplateColumns: "2fr 1fr 1fr 100px", padding: "16px 22px" }} onClick={() => onNavigate("transfer")}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 14 }}>{p.who}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{p.role}</div>
                </div>
                <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{p.mode}</div>
                <div>
                  <div className="progress" style={{ width: "80%" }}><div className="progress-bar" style={{ width: `${p.progress}%` }}></div></div>
                  <div className="mono muted" style={{ fontSize: 11, marginTop: 4 }}>{p.progress}%</div>
                </div>
                <span className="badge" style={{ background: p.status === "Atención" ? "var(--gold-tint)" : "#e8f0e6", color: p.color, borderColor: "transparent" }}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-pad">
          <div className="eyebrow">Reporte de impacto</div>
          <h3 className="serif" style={{ fontSize: 22, fontWeight: 500, margin: "8px 0 14px" }}>RSE · Q1 2026</h3>
          <p className="muted" style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 18 }}>Reporte automático de la transferencia interna y horas de mentoría externa, listo para integrarse al reporte de sostenibilidad anual.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { l: "Conocimiento preservado", v: "47 procesos · 12 áreas" },
              { l: "Horas de mentoría", v: "82 h" },
              { l: "Seniors empleados", v: "1 interno · 2 externos" },
              { l: "Cobertura de sucesión", v: "100% gerencia operativa" },
            ].map((x, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 10, borderBottom: i < 3 ? "1px solid var(--line)" : "none" }}>
                <div className="mono" style={{ fontSize: 11.5, color: "var(--ink-3)", letterSpacing: "0.06em" }}>{x.l}</div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{x.v}</div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" style={{ width: "100%", marginTop: 16 }} onClick={() => pushToast("Reporte exportado en PDF")}>
            Exportar reporte
          </button>
        </div>
      </div>
    </div>
  );
};

// Sucesor (Juan) view
const SuccessorDashboard = ({ onNavigate, pushToast }) => {
  const D = window.LegacyData;
  const tp = D.TRANSFER_PROGRAM;

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Panel · Sucesor</div>
          <h1 className="page-title">Buenos días, <span style={{ fontStyle: "italic", color: "var(--gold-2)" }}>Juan</span></h1>
          <div className="page-sub">Estás en el <strong>módulo 3</strong> del programa con Lorgio. La próxima sesión de sombra es hoy a las 14:00 en planta.</div>
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate("session")}>
          <Icon name="chat" size={14} /> Abrir conversación con Lorgio
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
        <div className="stat"><div className="stat-label">Avance del programa</div><div className="stat-value mono">48%</div><div className="stat-delta">mes 3 de 6</div></div>
        <div className="stat"><div className="stat-label">Sesiones de sombra</div><div className="stat-value mono">18</div><div className="stat-delta">de 36 planificadas</div></div>
        <div className="stat"><div className="stat-label">Decisiones registradas</div><div className="stat-value mono">23</div><div className="stat-delta">documentadas</div></div>
        <div className="stat"><div className="stat-label">Confianza autoreportada</div><div className="stat-value mono">7.2</div><div className="stat-delta">↑ desde 5.4 (mes 1)</div></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
        <div className="card card-pad">
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <Avatar initials="LS" size="lg" />
            <div style={{ flex: 1 }}>
              <div className="eyebrow">Tu mentor</div>
              <div className="serif" style={{ fontSize: 20, fontWeight: 500, margin: "4px 0" }}>Don Lorgio Saucedo</div>
              <div className="muted" style={{ fontSize: 13 }}>40 años en FlexoCruz · Disponible Lun–Jue mañanas</div>
            </div>
            <button className="btn btn-gold" onClick={() => onNavigate("session")}>Saludar</button>
          </div>
          <Ornament />
          <div className="eyebrow" style={{ marginBottom: 10 }}>Lo aprendido este mes</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "Criterio de cambio de mordaza por cliente y material — no por reloj",
              "Negociación con proveedores de tinta importada — vigencia y stock crítico",
              "Lectura de bitácora del turno anterior antes de cada decisión",
              "Cuándo escalar al CEO vs cuándo resolver en planta",
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--line)" : "none" }}>
                <Icon name="check" size={16} color="var(--good)" strokeWidth={2.4} />
                <div style={{ fontSize: 13.5, color: "var(--ink-2)" }}>{t}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-pad" style={{ background: "var(--bg-deep)", color: "var(--gold-soft)", borderColor: "var(--bg-deep)" }}>
          <div className="eyebrow" style={{ color: "var(--gold-soft)", opacity: 0.7 }}>Hoy · sesión de sombra</div>
          <h3 className="serif" style={{ color: "#fff", fontSize: 24, fontWeight: 500, margin: "8px 0 14px" }}>Cambio de turno · Línea 3</h3>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, opacity: 0.85, marginBottom: 18 }}>
            Lorgio te pidió revisar la bitácora de ayer antes de la sesión. Foco: la decisión del cambio anticipado de mordaza a las 14:20.
          </p>
          <div style={{ display: "flex", gap: 10, fontSize: 12.5 }}>
            <Icon name="clock" size={14} color="var(--gold-soft)" />
            14:00 · Planta · 2.5 h estimadas
          </div>
          <button className="btn btn-gold" style={{ width: "100%", marginTop: 18 }} onClick={() => onNavigate("session")}>
            Abrir conversación →
          </button>
        </div>
      </div>
    </div>
  );
};

window.HRDashboard = HRDashboard;
window.SuccessorDashboard = SuccessorDashboard;
