// Empleados — toda la planilla de la empresa (vista CEO/RRHH/Empresa)
const EmployeesPage = ({ persona, pushToast }) => {
  const D = window.LegacyData;
  const all = D.EMPLOYEES || [];
  const [query, setQuery] = React.useState("");
  const [area, setArea] = React.useState("Todas");
  const [statusFilter, setStatusFilter] = React.useState("Todos");
  const [openEmp, setOpenEmp] = React.useState(null);

  const areas = ["Todas", ...Array.from(new Set(all.map(e => e.area)))];

  const filtered = all.filter(e => {
    if (area !== "Todas" && e.area !== area) return false;
    if (statusFilter === "En traspaso" && !e.status.includes("traspaso") && !e.status.includes("sucesor") && !e.status.includes("Jubilación")) return false;
    if (statusFilter === "Críticos" && !e.critical) return false;
    if (statusFilter === "Sin sucesor" && !e.status.includes("sin sucesor")) return false;
    if (query) {
      const q = query.toLowerCase();
      if (![e.name, e.role, e.area, e.manager].some(x => x?.toLowerCase().includes(q))) return false;
    }
    return true;
  });

  const byArea = {};
  filtered.forEach(e => {
    byArea[e.area] = byArea[e.area] || [];
    byArea[e.area].push(e);
  });

  const stats = {
    total: all.length,
    critical: all.filter(e => e.critical).length,
    inTransfer: all.filter(e => e.status.includes("traspaso") || e.status.includes("Jubilación")).length,
    withoutSuccessor: all.filter(e => e.status.includes("sin sucesor")).length,
  };

  const exportCsv = () => {
    const { downloadFile, toCSV } = window.LegacyUtils;
    const rows = [["ID", "Nombre", "Cargo", "Área", "Desde", "Edad", "Estado", "Manager"]];
    all.forEach(e => rows.push([e.id, e.name, e.role, e.area, e.since, e.age, e.status, e.manager]));
    downloadFile("flexocruz-planilla.csv", toCSV(rows));
    pushToast("Planilla exportada en CSV");
  };

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Talento · planilla completa</div>
          <h1 className="page-title">Empleados de FlexoCruz</h1>
          <div className="page-sub">{stats.total} colaboradores listados · {stats.critical} en cargos críticos · {stats.withoutSuccessor} sin sucesor designado.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost" onClick={exportCsv}><Icon name="paperclip" size={14} /> Exportar CSV</button>
          <button className="btn btn-primary" onClick={() => pushToast("Formulario de nuevo empleado · próximamente")}>
            <Icon name="plus" size={14} /> Añadir colaborador
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <div className="stat"><div className="stat-label">Total listados</div><div className="stat-value mono">{stats.total}</div><div className="stat-delta">de 320 colaboradores totales</div></div>
        <div className="stat"><div className="stat-label">Cargos críticos</div><div className="stat-value mono">{stats.critical}</div><div className="stat-delta">requieren plan de sucesión</div></div>
        <div className="stat"><div className="stat-label">En traspaso / jubilación</div><div className="stat-value mono">{stats.inTransfer}</div><div className="stat-delta">próximos 18 meses</div></div>
        <div className="stat"><div className="stat-label">Sin sucesor</div><div className="stat-value mono">{stats.withoutSuccessor}</div><div className="stat-delta neg">acción requerida</div></div>
      </div>

      {/* Filtros */}
      <div className="card" style={{ padding: "14px 18px", marginBottom: 18, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flex: 1, minWidth: 220 }}>
          <Icon name="search" size={14} color="var(--ink-3)" />
          <input
            placeholder="Buscar por nombre, cargo, área o jefe…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ border: "none", outline: "none", background: "transparent", fontSize: 13.5, flex: 1, fontFamily: "var(--sans)" }}
          />
        </div>
        <div className="divider-vert" style={{ height: 24 }}></div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Todos", "Críticos", "En traspaso", "Sin sucesor"].map(f => (
            <span key={f} className={`chip ${statusFilter === f ? "active" : ""}`} onClick={() => setStatusFilter(f)}>{f}</span>
          ))}
        </div>
        <select className="select" value={area} onChange={e => setArea(e.target.value)} style={{ width: "auto", minWidth: 160 }}>
          {areas.map(a => <option key={a}>{a}</option>)}
        </select>
        {(query || area !== "Todas" || statusFilter !== "Todos") && (
          <button className="btn-text" style={{ fontSize: 12 }} onClick={() => { setQuery(""); setArea("Todas"); setStatusFilter("Todos"); }}>Limpiar ✕</button>
        )}
      </div>

      <div className="mono muted" style={{ fontSize: 11, marginBottom: 16 }}>
        {filtered.length} de {all.length} colaboradores · agrupados por área
      </div>

      {/* Lista agrupada por área */}
      {Object.keys(byArea).length === 0 && (
        <div className="card card-pad" style={{ textAlign: "center", color: "var(--ink-3)" }}>
          Ningún colaborador coincide con tu búsqueda.
        </div>
      )}
      {Object.keys(byArea).map(areaName => (
        <div key={areaName} style={{ marginBottom: 24 }}>
          <div className="section-h" style={{ marginBottom: 12 }}>
            <h3 className="serif" style={{ fontSize: 19, margin: 0 }}>{areaName}</h3>
            <span className="mono muted" style={{ fontSize: 11 }}>{byArea[areaName].length} colaboradores</span>
          </div>
          <div className="card" style={{ overflow: "hidden" }}>
            <div className="rowlist">
              {byArea[areaName].map(e => {
                const isJub = e.status.includes("Jubilación");
                const noSucc = e.status.includes("sin sucesor");
                const isSucc = e.status.includes("sucesor");
                return (
                  <div key={e.id} className="row employees-row" style={{ gridTemplateColumns: "auto 2.4fr 1.6fr 1fr 1.2fr auto", padding: "14px 22px" }} onClick={() => setOpenEmp(e)}>
                    <Avatar initials={e.photo} size="sm" />
                    <div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 14, fontWeight: 500 }}>{e.name}</span>
                        {e.critical && <span className="badge" style={{ fontSize: 9.5, padding: "1px 6px" }}>Crítico</span>}
                      </div>
                      <div className="muted" style={{ fontSize: 12 }}>{e.role}</div>
                    </div>
                    <div className="mono muted" style={{ fontSize: 12 }}>{e.manager}</div>
                    <div className="mono muted" style={{ fontSize: 12 }}>desde {e.since} · {e.age} a</div>
                    <div>
                      <span className="badge" style={{
                        background: noSucc ? "var(--gold-tint)" : isJub ? "var(--gold-tint)" : isSucc ? "#e4eef0" : "#e8f0e6",
                        color: noSucc ? "var(--danger)" : isJub ? "var(--gold-2)" : isSucc ? "var(--accent)" : "var(--good)",
                        borderColor: "transparent",
                      }}>
                        <span className="dot-status" style={{ background: noSucc ? "var(--danger)" : isJub ? "var(--gold)" : isSucc ? "var(--accent)" : "var(--good)" }}></span>
                        {e.status.split(" · ")[0]}
                      </span>
                    </div>
                    <button className="btn-text" style={{ fontSize: 12 }} onClick={(ev) => { ev.stopPropagation(); setOpenEmp(e); }}>Ficha →</button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}

      {openEmp && (
        <EmployeeDetailModal employee={openEmp} onClose={() => setOpenEmp(null)} pushToast={pushToast} />
      )}
    </div>
  );
};

// Detalle / ficha
const EmployeeDetailModal = ({ employee: e, onClose, pushToast }) => {
  const { Modal } = window.LegacyModals;
  return (
    <Modal
      eyebrow={`Ficha · ${e.area}`}
      title={e.name}
      subtitle={`${e.role} · FlexoCruz S.A.`}
      onClose={onClose}
      maxWidth={520}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>Cerrar</button>
          <button className="btn btn-primary" onClick={() => { pushToast(`Mensaje enviado a ${e.name.split(" ")[0]}`); onClose(); }}>
            <Icon name="send" size={14} /> Enviar mensaje
          </button>
        </>
      }
    >
      <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 18 }}>
        <Avatar initials={e.photo} size="lg" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 500 }}>{e.name}</div>
          <div className="muted" style={{ fontSize: 12.5, marginTop: 2 }}>{e.role}</div>
          {e.critical && <span className="badge" style={{ marginTop: 6 }}>Cargo crítico</span>}
        </div>
      </div>
      <div className="user-section">
        <div className="user-section-title">Datos laborales</div>
        <div className="user-row"><div className="user-row-label">Área</div><div className="user-row-val">{e.area}</div></div>
        <div className="user-row"><div className="user-row-label">Jefe directo</div><div className="user-row-val">{e.manager}</div></div>
        <div className="user-row"><div className="user-row-label">En FlexoCruz desde</div><div className="user-row-val mono-val">{e.since}</div></div>
        <div className="user-row"><div className="user-row-label">Edad</div><div className="user-row-val mono-val">{e.age} años</div></div>
        <div className="user-row"><div className="user-row-label">Estado</div><div className="user-row-val">{e.status}</div></div>
      </div>
      <div className="user-section">
        <div className="user-section-title">Acciones</div>
        <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "flex-start", marginBottom: 6 }} onClick={() => pushToast("Plan de carrera abierto")}><Icon name="trending" size={14} /> Ver plan de carrera</button>
        <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "flex-start", marginBottom: 6 }} onClick={() => pushToast("Histórico de desempeño abierto")}><Icon name="book" size={14} /> Histórico de desempeño</button>
        {e.critical && (
          <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "flex-start" }} onClick={() => pushToast("Plan de sucesión iniciado")}><Icon name="transfer" size={14} /> Plan de sucesión</button>
        )}
      </div>
    </Modal>
  );
};

window.EmployeesPage = EmployeesPage;
