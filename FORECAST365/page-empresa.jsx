// Empresa — vista ejecutiva 360°
// Todo lo que pasa en FlexoCruz: gente, programas, conocimiento, finanzas, RSE.
const EmpresaDashboard = ({ onNavigate, pushToast }) => {
  const D = window.LegacyData;
  const k = D.ENTERPRISE_KPIS;
  const tp = D.TRANSFER_PROGRAM;
  const pipeline = D.RETIREMENT_PIPELINE;
  const [tab, setTab] = React.useState("Resumen");

  const TABS = ["Resumen", "Personas", "Programas", "Conocimiento", "Finanzas", "RSE"];

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Dirección · Vista ejecutiva 360°</div>
          <h1 className="page-title">FlexoCruz S.A.</h1>
          <div className="page-sub">Manufactura · Empaques flexibles · 320 colaboradores · Santa Cruz. Tu plan <strong>Enterprise</strong> incluye traspasos ilimitados y reporte RSE auditable.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost" onClick={() => pushToast("Reporte ejecutivo exportado en PDF")}><Icon name="paperclip" size={14} /> Exportar reporte</button>
          <button className="btn btn-primary" onClick={() => onNavigate("market")}><Icon name="plus" size={14} /> Nuevo programa</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, borderBottom: "1px solid var(--line)", marginBottom: 24, overflowX: "auto" }}>
        {TABS.map(x => (
          <button
            key={x}
            onClick={() => setTab(x)}
            style={{
              padding: "12px 16px",
              border: "none",
              background: "transparent",
              borderBottom: tab === x ? "2px solid var(--gold)" : "2px solid transparent",
              color: tab === x ? "var(--ink)" : "var(--ink-3)",
              fontFamily: "var(--sans)",
              fontSize: 13.5,
              fontWeight: tab === x ? 600 : 400,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >{x}</button>
        ))}
      </div>

      <div className="fade-in" key={tab}>
        {tab === "Resumen" && <TabResumen k={k} tp={tp} onNavigate={onNavigate} pushToast={pushToast} />}
        {tab === "Personas" && <TabPersonas pipeline={pipeline} onNavigate={onNavigate} pushToast={pushToast} />}
        {tab === "Programas" && <TabProgramas tp={tp} onNavigate={onNavigate} pushToast={pushToast} />}
        {tab === "Conocimiento" && <TabConocimiento pushToast={pushToast} />}
        {tab === "Finanzas" && <TabFinanzas k={k} pushToast={pushToast} />}
        {tab === "RSE" && <TabRSE k={k} pushToast={pushToast} />}
      </div>
    </div>
  );
};

// ============================================================
// TAB · Resumen ejecutivo
// ============================================================
const TabResumen = ({ k, tp, onNavigate, pushToast }) => (
  <>
    {/* Top KPIs */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
      <Kpi label="Programas activos" value={k.programsActive} delta="2 internos · 1 externo" />
      <Kpi label="Procesos preservados" value={k.knowledgeDocumented} delta="↑ 18 vs Q4 2025" />
      <Kpi label="Inversión YTD" value={`$${(k.investedYTD/1000).toFixed(1)}K`} delta={`vs $${(k.rotationAvoided/1000)}K rotación evitada`} />
      <Kpi label="Cobertura de sucesión" value={`${Math.round(k.successorsCovered*100)}%`} delta="2 cargos críticos sin sucesor" deltaNeg />
    </div>

    {/* Alert banner — qué necesita atención */}
    <div className="card card-pad" style={{ marginBottom: 28, background: "var(--gold-tint)", borderColor: "var(--gold-soft)", display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--gold)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon name="bell" size={20} color="#fff" />
      </div>
      <div style={{ flex: 1, minWidth: 240 }}>
        <div className="serif" style={{ fontSize: 18, fontWeight: 500 }}>Requiere tu atención · 3 acciones</div>
        <div style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 4 }}>
          <strong>Carlos Rojas</strong> (Mantenimiento, jub. Nov 2026) sigue sin sucesor · <strong>Hugo Pinto</strong> (Calidad, jub. Jun 2027) también · Andrea Cuéllar tiene <strong>2 contratos por aprobar</strong>.
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn-ghost" onClick={() => onNavigate("market")}>Publicar búsqueda</button>
        <button className="btn btn-primary" onClick={() => pushToast("Revisión de contratos abierta")}>Revisar contratos</button>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, marginBottom: 28 }}>
      {/* Programas summary */}
      <div className="card">
        <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="serif" style={{ fontSize: 18, fontWeight: 500 }}>Programas en curso</div>
            <div className="mono muted" style={{ fontSize: 11 }}>Toda la organización · actualizado hoy 09:14</div>
          </div>
          <button className="btn-text" style={{ fontSize: 12 }} onClick={() => onNavigate("programs")}>Ver todos →</button>
        </div>
        <div className="rowlist">
          {[
            { who: "Lorgio Saucedo → Juan Antelo", role: "Gerencia de Producción", mode: "Transferencia interna", progress: tp.progress, status: "En tiempo", color: "var(--good)", invest: 12600 },
            { who: "Elena Justiniano (externa)", role: "Onboarding Gerencia Comercial", mode: "Marketplace", progress: 60, status: "En tiempo", color: "var(--good)", invest: 6800 },
            { who: "Raúl Mendoza (externo)", role: "Cierre fiscal y exportación", mode: "Marketplace", progress: 35, status: "Iniciando", color: "var(--accent)", invest: 4200 },
            { who: "Carlos Rojas → Por designar", role: "Jefatura de Mantenimiento", mode: "Sin sucesor", progress: 8, status: "Atención", color: "var(--gold)", invest: 0 },
          ].map((p, i) => (
            <div key={i} className="row" style={{ gridTemplateColumns: "2fr 1fr 1.2fr 90px 100px", padding: "16px 22px" }} onClick={() => onNavigate("transfer")}>
              <div>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{p.who}</div>
                <div className="muted" style={{ fontSize: 12 }}>{p.role}</div>
              </div>
              <div className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{p.mode}</div>
              <div>
                <div className="progress" style={{ width: "90%" }}><div className="progress-bar" style={{ width: `${p.progress}%`, background: p.color }}></div></div>
                <div className="mono muted" style={{ fontSize: 11, marginTop: 4 }}>{p.progress}%</div>
              </div>
              <div className="mono" style={{ fontSize: 12, textAlign: "right" }}>{p.invest ? `$${p.invest.toLocaleString()}` : "—"}</div>
              <span className="badge" style={{ background: p.status === "Atención" ? "var(--gold-tint)" : "#e8f0e6", color: p.color, borderColor: "transparent" }}>{p.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ROI hero card */}
      <div className="card card-pad" style={{ background: "var(--bg-deep)", color: "var(--gold-soft)", borderColor: "var(--bg-deep)" }}>
        <div className="eyebrow" style={{ color: "var(--gold-soft)", opacity: 0.7 }}>Retorno · Año fiscal 2026</div>
        <h3 className="serif" style={{ color: "#fff", fontSize: 36, fontWeight: 500, margin: "10px 0 4px" }}>7,3×</h3>
        <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 22 }}>Ratio inversión / rotación evitada</div>
        <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 80, marginBottom: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 36, height: 14, background: "rgba(232,217,184,0.3)", borderRadius: 2 }}></div>
            <div className="mono" style={{ fontSize: 9, opacity: 0.6 }}>INV.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginLeft: 12 }}>
            <div style={{ width: 36, height: 80, background: "var(--gold)", borderRadius: 2 }}></div>
            <div className="mono" style={{ fontSize: 9, opacity: 0.6 }}>EVIT.</div>
          </div>
          <div style={{ flex: 1 }}></div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid rgba(232,217,184,0.18)" }}>
          <div>
            <div className="mono" style={{ fontSize: 10, opacity: 0.6 }}>INVERSIÓN</div>
            <div className="serif" style={{ fontSize: 19, color: "#fff", marginTop: 2 }}>${k.investedYTD.toLocaleString()}</div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 10, opacity: 0.6 }}>EVITADO</div>
            <div className="serif" style={{ fontSize: 19, color: "#fff", marginTop: 2 }}>${(k.rotationAvoided/1000).toFixed(0)}K</div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 10, opacity: 0.6 }}>HORAS</div>
            <div className="serif" style={{ fontSize: 19, color: "#fff", marginTop: 2 }}>{k.hoursTransferred}h</div>
          </div>
        </div>
        <button className="btn btn-gold" style={{ width: "100%", marginTop: 18 }} onClick={() => pushToast("Reporte ROI exportado")}>
          Ver desglose financiero
        </button>
      </div>
    </div>

    {/* Bottom strip */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
      <MiniStat label="Colaboradores totales" value={k.totalEmployees} hint="320 personas" icon="users" />
      <MiniStat label="Seniors 55+ activos" value={k.seniorsActive} hint="5,6% de la planilla" icon="profile" />
      <MiniStat label="Retención talento clave" value={`${Math.round(k.retentionRate*100)}%`} hint="↑ 4pts vs 2025" icon="trending" good />
      <MiniStat label="Score ESG" value={`+${k.esgScoreYoY}`} hint="puntos vs 2025" icon="leaf" good />
    </div>
  </>
);

// ============================================================
// TAB · Personas (pipeline de sucesión)
// ============================================================
const TabPersonas = ({ pipeline, onNavigate, pushToast }) => (
  <>
    <div className="section-h" style={{ marginBottom: 16 }}>
      <div>
        <div className="eyebrow">Pipeline de sucesión · 18 meses</div>
        <h3 className="serif" style={{ marginTop: 6 }}>Jubilaciones próximas y cobertura</h3>
      </div>
      <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => pushToast("Mapa organizacional exportado")}>Exportar mapa →</button>
    </div>

    {/* Pipeline cards */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 28 }}>
      {pipeline.map(p => (
        <div key={p.id} className="card card-pad" style={{ display: "flex", gap: 14 }}>
          <Avatar initials={p.name.split(" ").map(x => x[0]).slice(0,2).join("")} size="lg" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: 15 }}>{p.name}</div>
                <div className="muted" style={{ fontSize: 12 }}>{p.role} · {p.area}</div>
              </div>
              <span className="badge" style={{ background: p.risk === "high" ? "var(--gold-tint)" : p.risk === "med" ? "var(--bg)" : "#e8f0e6", color: p.color, borderColor: "transparent" }}>
                <span className="dot-status" style={{ background: p.color }}></span>
                {p.risk === "high" ? "Riesgo alto" : p.risk === "med" ? "Riesgo medio" : "Bajo riesgo"}
              </span>
            </div>
            <div className="gold-rule" style={{ margin: "12px 0" }}></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 14px", fontSize: 12 }}>
              <div>
                <div className="mono muted" style={{ fontSize: 10, letterSpacing: "0.06em" }}>JUBILACIÓN</div>
                <div className="mono" style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{p.retireDate}</div>
              </div>
              <div>
                <div className="mono muted" style={{ fontSize: 10, letterSpacing: "0.06em" }}>SUCESOR</div>
                <div style={{ fontSize: 12.5, fontWeight: 500, marginTop: 2 }}>{p.successor}</div>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <div className="mono muted" style={{ fontSize: 10, letterSpacing: "0.06em" }}>ESTADO</div>
                <div style={{ fontSize: 12.5, marginTop: 2 }}>{p.status}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
              <button className="btn btn-ghost" style={{ padding: "6px 10px", fontSize: 12 }} onClick={() => pushToast(`Perfil de ${p.name.split(" ")[0]}`)}>Ver perfil</button>
              <button className="btn btn-primary" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => onNavigate(p.successor === "Por designar" ? "market" : "transfer")}>
                {p.successor === "Por designar" ? "Buscar mentor" : "Ver programa"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Demografía organizacional */}
    <div className="section-h" style={{ marginBottom: 16 }}>
      <div>
        <div className="eyebrow">Demografía de la planilla</div>
        <h3 className="serif" style={{ marginTop: 6 }}>Distribución por edad y antigüedad</h3>
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div className="card card-pad">
        <div className="eyebrow" style={{ marginBottom: 14 }}>Por rango de edad</div>
        {[
          { l: "20–29 años", n: 82, pct: 25.6, color: "var(--accent)" },
          { l: "30–44 años", n: 134, pct: 41.9, color: "var(--good)" },
          { l: "45–54 años", n: 86, pct: 26.9, color: "var(--gold)" },
          { l: "55+ años", n: 18, pct: 5.6, color: "var(--gold-2)" },
        ].map(b => (
          <div key={b.l} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
              <span>{b.l}</span>
              <span><span className="mono" style={{ fontWeight: 600 }}>{b.n}</span> <span className="muted">· {b.pct}%</span></span>
            </div>
            <div className="progress" style={{ height: 8 }}><div className="progress-bar" style={{ width: `${b.pct}%`, background: b.color }}></div></div>
          </div>
        ))}
        <div className="muted" style={{ fontSize: 12, marginTop: 12, lineHeight: 1.5 }}>
          18 colaboradores tienen 55+ años. En los próximos 5 años, 12 alcanzarán la edad de jubilación.
        </div>
      </div>

      <div className="card card-pad">
        <div className="eyebrow" style={{ marginBottom: 14 }}>Por área crítica</div>
        {[
          { l: "Producción", risk: "low", covered: "100%", who: "Sucesor designado" },
          { l: "Calidad", risk: "high", covered: "0%", who: "Sin sucesor designado" },
          { l: "Mantenimiento", risk: "high", covered: "0%", who: "Búsqueda en curso" },
          { l: "Comercial", risk: "med", covered: "60%", who: "Onboarding en curso" },
          { l: "Finanzas", risk: "med", covered: "50%", who: "Mentor externo asignado" },
        ].map(b => (
          <div key={b.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{b.l}</div>
              <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>{b.who}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{b.covered}</span>
              <span className="dot-status" style={{ background: b.risk === "high" ? "var(--gold)" : b.risk === "med" ? "var(--accent)" : "var(--good)" }}></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

// ============================================================
// TAB · Programas — vista detallada
// ============================================================
const TabProgramas = ({ tp, onNavigate, pushToast }) => (
  <>
    <div className="section-h" style={{ marginBottom: 16 }}>
      <div>
        <div className="eyebrow">Programas activos en FlexoCruz</div>
        <h3 className="serif" style={{ marginTop: 6 }}>Modo 1 · Transferencias internas</h3>
      </div>
    </div>

    <div className="card card-pad" style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div className="eyebrow gold">Programa estrella · 48% completado</div>
          <h4 className="serif" style={{ fontSize: 22, fontWeight: 500, margin: "6px 0 4px" }}>{tp.title}</h4>
          <div className="muted" style={{ fontSize: 13 }}>Inicio {tp.start} · Cierre estimado {tp.end} · 6 módulos · 24 semanas</div>
        </div>
        <span className="badge green"><span className="dot-status green"></span>En tiempo</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar initials="LS" size="md" />
          <div><div style={{ fontWeight: 500, fontSize: 13 }}>Lorgio Saucedo</div><div className="muted" style={{ fontSize: 11 }}>Mentor · Consultor</div></div>
        </div>
        <Icon name="arrow-right" color="var(--gold)" />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar initials="JA" size="md" />
          <div><div style={{ fontWeight: 500, fontSize: 13 }}>Juan Antelo</div><div className="muted" style={{ fontSize: 11 }}>Sucesor · Jefe de Planta</div></div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar initials="AC" size="sm" />
          <div><div style={{ fontSize: 12, fontWeight: 500 }}>Andrea Cuéllar</div><div className="muted" style={{ fontSize: 11 }}>Sponsor RRHH</div></div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 18 }}>
        <Stat label="Sesiones de sombra" v={tp.outcomes.sessions} d="de 36 planificadas" />
        <Stat label="Horas registradas" v={`${tp.outcomes.hoursLogged}h`} d="↑ 12% vs feb" />
        <Stat label="Decisiones acompañadas" v={tp.outcomes.decisionsShadowed} d="documentadas" />
        <Stat label="Inversión total" v={`$${tp.budget.total.toLocaleString()}`} d={`gastado $${tp.budget.spent.toLocaleString()}`} />
      </div>

      <div style={{ marginTop: 18, display: "flex", gap: 8 }}>
        <button className="btn btn-ghost" onClick={() => onNavigate("transfer")}>Abrir programa completo →</button>
        <button className="btn btn-ghost" onClick={() => pushToast("Bitácora exportada")}><Icon name="paperclip" size={14} /> Bitácora</button>
      </div>
    </div>

    <div className="section-h" style={{ marginBottom: 16 }}>
      <div>
        <h3 className="serif" style={{ marginTop: 6 }}>Modo 2 · Mentorías externas (Marketplace)</h3>
      </div>
      <button className="btn btn-gold" style={{ fontSize: 12, padding: "8px 14px" }} onClick={() => onNavigate("market")}><Icon name="plus" size={14} /> Contratar mentor</button>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {[
        { senior: "Elena Justiniano Roca", role: "Ex-Gerente RRHH · BME", topic: "Onboarding del nuevo Gerente Comercial", progress: 60, next: "Vie 9 May · 15:00", invest: 6800, hours: 24 },
        { senior: "Raúl Mendoza Calderón", role: "Ex-CFO · Tuboplast", topic: "Cierre fiscal y exportación", progress: 35, next: "Lun 12 May · 10:00", invest: 4200, hours: 16 },
      ].map((m, i) => (
        <div key={i} className="card card-pad">
          <div style={{ display: "flex", gap: 12 }}>
            <Avatar initials={m.senior.split(" ").map(x => x[0]).slice(0,2).join("")} size="md" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{m.senior}</div>
              <div className="muted" style={{ fontSize: 12 }}>{m.role}</div>
            </div>
            <span className="badge blue">Marketplace</span>
          </div>
          <div style={{ marginTop: 14, fontSize: 13.5, color: "var(--ink-2)" }}>{m.topic}</div>
          <div className="progress" style={{ marginTop: 14 }}><div className="progress-bar" style={{ width: `${m.progress}%` }}></div></div>
          <div className="mono muted" style={{ fontSize: 11, marginTop: 6 }}>{m.progress}% completado</div>
          <div className="divider"></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, fontSize: 12 }}>
            <div><div className="mono muted" style={{ fontSize: 10 }}>PRÓXIMA</div><div style={{ marginTop: 2, fontWeight: 500 }}>{m.next}</div></div>
            <div><div className="mono muted" style={{ fontSize: 10 }}>INVERSIÓN</div><div className="mono" style={{ marginTop: 2, fontWeight: 600 }}>${m.invest.toLocaleString()}</div></div>
            <div><div className="mono muted" style={{ fontSize: 10 }}>HORAS</div><div className="mono" style={{ marginTop: 2, fontWeight: 600 }}>{m.hours}h</div></div>
          </div>
        </div>
      ))}
    </div>
  </>
);

// ============================================================
// TAB · Conocimiento documentado
// ============================================================
const TabConocimiento = ({ pushToast }) => (
  <>
    <div className="section-h" style={{ marginBottom: 16 }}>
      <div>
        <div className="eyebrow">Mapa de conocimiento de la empresa</div>
        <h3 className="serif" style={{ marginTop: 6 }}>Procesos críticos documentados por área</h3>
      </div>
      <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => pushToast("Catálogo descargado")}><Icon name="book" size={14} /> Descargar catálogo</button>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, marginBottom: 28 }}>
      <div className="card card-pad">
        <div className="eyebrow" style={{ marginBottom: 14 }}>Cobertura por área</div>
        {[
          { l: "Producción", n: 47, max: 50, owner: "Lorgio Saucedo" },
          { l: "Calidad", n: 28, max: 40, owner: "Hugo Pinto" },
          { l: "Mantenimiento", n: 18, max: 35, owner: "Carlos Rojas" },
          { l: "Comercial", n: 22, max: 30, owner: "Marcela Antezana" },
          { l: "Finanzas", n: 13, max: 25, owner: "Esther Vaca" },
        ].map(a => (
          <div key={a.l} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}>
              <span><strong>{a.l}</strong> <span className="muted">· {a.owner}</span></span>
              <span className="mono"><span style={{ fontWeight: 600 }}>{a.n}</span><span className="muted">/{a.max}</span></span>
            </div>
            <div className="progress" style={{ height: 8 }}><div className="progress-bar" style={{ width: `${(a.n/a.max)*100}%`, background: a.n/a.max > 0.7 ? "var(--good)" : a.n/a.max > 0.4 ? "var(--gold)" : "var(--ink-4)" }}></div></div>
          </div>
        ))}
      </div>

      <div className="card card-pad" style={{ background: "var(--gold-tint)", borderColor: "var(--gold-soft)" }}>
        <div className="eyebrow gold">Alerta · áreas en riesgo</div>
        <h4 className="serif" style={{ fontSize: 18, fontWeight: 500, margin: "8px 0 12px" }}>2 áreas con cobertura crítica</h4>
        <div style={{ fontSize: 13, lineHeight: 1.55, color: "var(--ink-2)" }}>
          <strong>Mantenimiento</strong> tiene solo 51% del conocimiento documentado y su responsable se jubila en 6 meses. <strong>Finanzas</strong> tiene 52% y depende mayormente de Esther Vaca.
        </div>
        <button className="btn btn-gold" style={{ width: "100%", marginTop: 18 }} onClick={() => pushToast("Plan de documentación generado")}>
          Iniciar plan de captura
        </button>
      </div>
    </div>

    {/* Documentos recientes */}
    <div className="section-h" style={{ marginBottom: 16 }}>
      <h3 className="serif" style={{ marginTop: 6 }}>Documentos recientes</h3>
      <button className="btn-text" style={{ fontSize: 12 }} onClick={() => pushToast("Biblioteca abierta")}>Ver biblioteca →</button>
    </div>
    <div className="card" style={{ overflow: "hidden" }}>
      <div className="rowlist">
        {[
          { t: "Manual operativo Línea 3 — extrusión flexográfica v1", who: "Lorgio Saucedo", date: "5 May 2026", area: "Producción", size: "PDF · 14 MB" },
          { t: "Criterios de cambio de mordaza por material y cliente", who: "Lorgio Saucedo", date: "3 May 2026", area: "Producción", size: "Notion · 47 entradas" },
          { t: "Auditoría ISO 9001:2015 — preparación interna", who: "Hugo Pinto", date: "1 May 2026", area: "Calidad", size: "PDF · 8 MB" },
          { t: "Red de proveedores estratégicos · tintas y solventes", who: "Lorgio Saucedo", date: "28 Abr 2026", area: "Producción", size: "Hoja · 23 contactos" },
          { t: "Bitácora de decisiones del módulo 3", who: "Lorgio + Juan", date: "Hoy", area: "Programa Lorgio→Juan", size: "Activo · 23 entradas" },
        ].map((d, i) => (
          <div key={i} className="row" style={{ gridTemplateColumns: "auto 2fr 1fr 1fr 1fr auto", padding: "14px 22px" }}>
            <Icon name="book" size={18} color="var(--gold-2)" />
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 500 }}>{d.t}</div>
              <div className="muted" style={{ fontSize: 12 }}>Autor: {d.who}</div>
            </div>
            <div className="mono muted" style={{ fontSize: 12 }}>{d.area}</div>
            <div className="mono muted" style={{ fontSize: 12 }}>{d.date}</div>
            <div className="mono muted" style={{ fontSize: 11 }}>{d.size}</div>
            <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }} onClick={(e) => { e.stopPropagation(); pushToast("Documento abierto"); }}>Abrir</button>
          </div>
        ))}
      </div>
    </div>
  </>
);

// ============================================================
// TAB · Finanzas — inversión, plan, comisiones
// ============================================================
const TabFinanzas = ({ k, pushToast }) => (
  <>
    <div className="section-h" style={{ marginBottom: 16 }}>
      <div>
        <div className="eyebrow">Inversión y retorno</div>
        <h3 className="serif" style={{ marginTop: 6 }}>Finanzas del programa Legacy</h3>
      </div>
      <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => pushToast("Reporte fiscal generado")}><Icon name="paperclip" size={14} /> Reporte fiscal</button>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
      <Kpi label="Plan Enterprise" value="$800" delta="USD/mes · activo" />
      <Kpi label="Inversión YTD" value={`$${(k.investedYTD/1000).toFixed(1)}K`} delta="3 programas activos" />
      <Kpi label="Rotación evitada" value={`$${(k.rotationAvoided/1000)}K`} delta="estimación conservadora" />
      <Kpi label="ROI estimado" value="7,3×" delta="vs costo histórico de rotación" />
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
      <div className="card">
        <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <div className="serif" style={{ fontSize: 18, fontWeight: 500 }}>Movimientos del trimestre</div>
            <div className="mono muted" style={{ fontSize: 11 }}>Q1 2026 · todos los conceptos</div>
          </div>
          <button className="btn-text" style={{ fontSize: 12 }} onClick={() => pushToast("Estado de cuenta exportado")}>Exportar →</button>
        </div>
        <div className="rowlist">
          {[
            { c: "Honorarios · Lorgio Saucedo (Mar)", co: "Modo 1 · interno", amt: -1820, st: "Pagado", d: "30 Mar" },
            { c: "Honorarios · Elena Justiniano (Mar)", co: "Modo 2 · marketplace", amt: -2400, st: "Pagado", d: "30 Mar" },
            { c: "Comisión Legacy (15%)", co: "Modo 2", amt: -360, st: "Pagado", d: "30 Mar" },
            { c: "Suscripción Enterprise", co: "Plan mensual", amt: -800, st: "Pagado", d: "1 Mar" },
            { c: "Honorarios · Raúl Mendoza (Abr)", co: "Modo 2 · marketplace", amt: -1400, st: "Pendiente", d: "30 Abr" },
          ].map((b, i) => (
            <div key={i} className="row" style={{ gridTemplateColumns: "2fr 1fr 0.7fr 0.8fr", padding: "14px 22px" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{b.c}</div>
                <div className="muted" style={{ fontSize: 12 }}>{b.co}</div>
              </div>
              <div className="mono muted" style={{ fontSize: 12 }}>{b.d}</div>
              <div className="mono" style={{ fontSize: 13.5, fontWeight: 600 }}>${Math.abs(b.amt).toLocaleString()}</div>
              <span className={`badge ${b.st === "Pagado" ? "green" : ""}`}>{b.st}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card card-pad">
        <div className="eyebrow gold">Tu plan</div>
        <h4 className="serif" style={{ fontSize: 22, fontWeight: 500, margin: "8px 0 4px" }}>Enterprise</h4>
        <div className="muted" style={{ fontSize: 13, marginBottom: 14 }}>USD 800/mes · renovación 1 Jun 2026</div>
        <div className="gold-rule"></div>
        {[
          "Programas de transferencia ilimitados",
          "Dashboard ejecutivo y reporte RSE auditable",
          "Acceso preferente al Marketplace de seniors",
          "Coordinador de procesos dedicado",
          "Soporte directo del equipo Legacy",
        ].map(f => (
          <div key={f} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13, padding: "6px 0" }}>
            <Icon name="check" size={14} color="var(--gold)" strokeWidth={2.4} /> {f}
          </div>
        ))}
        <button className="btn btn-ghost" style={{ width: "100%", marginTop: 14 }} onClick={() => pushToast("Detalles del plan")}>Gestionar plan</button>
      </div>
    </div>
  </>
);

// ============================================================
// TAB · RSE / ESG
// ============================================================
const TabRSE = ({ k, pushToast }) => (
  <>
    <div className="section-h" style={{ marginBottom: 16 }}>
      <div>
        <div className="eyebrow">Reporte ESG · Q1 2026</div>
        <h3 className="serif" style={{ marginTop: 6 }}>Impacto social y de gobierno corporativo</h3>
      </div>
      <button className="btn btn-primary" onClick={() => pushToast("Reporte ESG exportado a PDF")}>Exportar para memoria anual</button>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
      {[
        { l: "Conocimiento preservado", v: "128", d: "procesos críticos documentados", icon: "book", trend: "↑ 18 vs Q4 2025" },
        { l: "Horas de mentoría", v: `${k.hoursTransferred}h`, d: "intergeneracional", icon: "users", trend: "↑ 62% vs Q4 2025" },
        { l: "Adultos mayores empleados", v: "3", d: "1 interno · 2 externos", icon: "leaf", trend: "categoría inclusión" },
        { l: "Cobertura crítica", v: "78%", d: "objetivo 90% en 2026", icon: "trending", trend: "↑ 12pts vs 2025" },
        { l: "Satisfacción mentores", v: k.satisfactionScore.toFixed(1), d: "sobre 5.0", icon: "star", trend: "↑ desde 4.4" },
        { l: "Score ESG Legacy", v: "A−", d: "metodología BID Lab", icon: "verified", trend: "↑ desde B+" },
      ].map(x => (
        <div key={x.l} className="card card-pad">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <Icon name={x.icon} size={20} color="var(--gold-2)" />
            <span className="mono" style={{ fontSize: 10, color: "var(--good)" }}>{x.trend}</span>
          </div>
          <div className="serif" style={{ fontSize: 34, fontWeight: 500, lineHeight: 1, letterSpacing: "-0.02em" }}>{x.v}</div>
          <div style={{ fontSize: 13, fontWeight: 500, marginTop: 8 }}>{x.l}</div>
          <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{x.d}</div>
        </div>
      ))}
    </div>

    <div className="card card-pad" style={{ background: "var(--bg-deep)", color: "var(--gold-soft)", borderColor: "var(--bg-deep)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32 }}>
        <div>
          <div className="eyebrow" style={{ color: "var(--gold-soft)", opacity: 0.7 }}>Categorías cubiertas</div>
          <h4 className="serif" style={{ fontSize: 22, color: "#fff", fontWeight: 500, margin: "8px 0 12px" }}>Tu impacto Legacy califica para:</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
            {["Inclusión laboral 55+", "Gestión del conocimiento", "Continuidad operativa", "Aprendizaje intergeneracional", "Gobernanza corporativa"].map(c => (
              <span key={c} className="chip" style={{ background: "rgba(232,217,184,0.1)", color: "var(--gold-soft)", borderColor: "rgba(232,217,184,0.25)", cursor: "default" }}>{c}</span>
            ))}
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.55, opacity: 0.85, maxWidth: "58ch" }}>
            FlexoCruz puede integrar estos indicadores a su próximo reporte ESG. Legacy entrega los datos auditados en formato CSV, PDF ejecutivo y dashboard interactivo.
          </p>
        </div>
        <div>
          <div className="eyebrow" style={{ color: "var(--gold-soft)", opacity: 0.7 }}>Próximos hitos</div>
          {[
            { d: "30 Jun", t: "Auditoría externa Q2" },
            { d: "15 Jul", t: "Reporte semestral ESG" },
            { d: "1 Ago", t: "Presentación al directorio" },
          ].map(h => (
            <div key={h.t} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(232,217,184,0.18)", fontSize: 13 }}>
              <span style={{ color: "#fff" }}>{h.t}</span>
              <span className="mono" style={{ opacity: 0.7 }}>{h.d}</span>
            </div>
          ))}
          <button className="btn btn-gold" style={{ width: "100%", marginTop: 14 }} onClick={() => pushToast("Hito agendado")}>+ Agendar nuevo hito</button>
        </div>
      </div>
    </div>
  </>
);

// ============================================================
// Helpers
// ============================================================
const Kpi = ({ label, value, delta, deltaNeg }) => (
  <div className="stat">
    <div className="stat-label">{label}</div>
    <div className="stat-value mono">{value}</div>
    <div className={`stat-delta ${deltaNeg ? "neg" : ""}`}>{delta}</div>
  </div>
);

const MiniStat = ({ label, value, hint, icon, good }) => (
  <div className="card card-pad" style={{ display: "flex", gap: 14, alignItems: "center" }}>
    <div style={{ width: 38, height: 38, borderRadius: 6, background: "var(--gold-tint)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon name={icon} size={18} color="var(--gold-2)" />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "var(--serif)", marginTop: 2 }}>{value}</div>
      <div style={{ fontSize: 11, color: good ? "var(--good)" : "var(--ink-3)", fontFamily: "var(--mono)", marginTop: 2 }}>{hint}</div>
    </div>
  </div>
);

const Stat = ({ label, v, d }) => (
  <div>
    <div className="mono muted" style={{ fontSize: 10.5, letterSpacing: "0.10em", textTransform: "uppercase" }}>{label}</div>
    <div className="serif" style={{ fontSize: 26, fontWeight: 500, marginTop: 6 }}>{v}</div>
    <div className="mono muted" style={{ fontSize: 11, marginTop: 4 }}>{d}</div>
  </div>
);

window.EmpresaDashboard = EmpresaDashboard;
