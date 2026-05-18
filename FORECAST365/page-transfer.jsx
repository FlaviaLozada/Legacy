// Internal Transfer Program — Lorgio → Juan, supervised by Andrea (HR)
const TransferProgram = ({ persona, pushToast }) => {
  const D = window.LegacyData;
  const tp = D.TRANSFER_PROGRAM;
  const me = D.SENIORS.lorgio;
  const [activeModule, setActiveModule] = React.useState(3);
  const [sessionDetails, setSessionDetails] = React.useState(null);
  const [registerOpen, setRegisterOpen] = React.useState(false);
  const fileInputRef = React.useRef(null);
  const [attachedFiles, setAttachedFiles] = React.useState([]);

  const mod = tp.modules.find(m => m.id === activeModule);

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Modo 1 · Transferencia interna</div>
          <h1 className="page-title">Programa de traspaso</h1>
          <div className="page-sub">FlexoCruz S.A. · Lorgio Saucedo → Juan Antelo · Supervisado por Andrea Cuéllar (RRHH)</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
            <Icon name="paperclip" size={14} /> Anexar documento
            {attachedFiles.length > 0 && <span className="mono" style={{ background: "var(--gold-tint)", color: "var(--gold-2)", padding: "1px 7px", borderRadius: 10, fontSize: 11, marginLeft: 4 }}>{attachedFiles.length}</span>}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.csv"
            multiple
            style={{ display: "none" }}
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              if (files.length) {
                setAttachedFiles(arr => [...files.map(f => ({ name: f.name, size: f.size, type: f.type, addedAt: new Date().toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" }) })), ...arr]);
                pushToast(`${files.length} archivo${files.length > 1 ? "s" : ""} anexado${files.length > 1 ? "s" : ""} al módulo ${activeModule}`);
                e.target.value = "";
              }
            }}
          />
          <button className="btn btn-primary" onClick={() => setRegisterOpen(true)}>
            <Icon name="check" size={14} /> Registrar sesión de hoy
          </button>
        </div>
      </div>

      {/* Three-up: Mentor, successor, sponsor */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { who: me.name, role: "Consultor interno · Mentor", photo: me.photo, sub: `${me.yearsExp} años · ${me.title.replace(" (jubilándose)","")}`, badge: "Senior" },
          { who: tp.successor.name, role: `Sucesor · ${tp.successor.title}`, photo: tp.successor.photo, sub: tp.successor.tenure, badge: "Sucesor" },
          { who: tp.hr.name, role: "Sponsor · Gerencia RRHH", photo: tp.hr.photo, sub: "FlexoCruz S.A.", badge: "RRHH" },
        ].map((p, i) => (
          <div key={i} className="card card-pad" style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <Avatar initials={p.photo} size="lg" />
            <div style={{ flex: 1 }}>
              <span className="eyebrow">{p.badge}</span>
              <div style={{ fontWeight: 500, fontSize: 15, marginTop: 4 }}>{p.who}</div>
              <div className="muted" style={{ fontSize: 12 }}>{p.role}</div>
              <div className="mono muted" style={{ fontSize: 11, marginTop: 6 }}>{p.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 20 }}>
        {/* Modules timeline */}
        <div className="card">
          <div style={{ padding: "20px 22px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <div className="serif" style={{ fontSize: 18, fontWeight: 500 }}>6 módulos · 24 semanas</div>
              <div className="mono muted" style={{ fontSize: 11 }}>{tp.progress}% completado</div>
            </div>
            <span className="badge green"><span className="dot-status green"></span>En tiempo</span>
          </div>
          <div style={{ padding: "8px 0" }}>
            {tp.modules.map((m, i) => {
              const isActive = m.id === activeModule;
              const stateColor = m.status === "done" ? "var(--good)" : m.status === "active" ? "var(--gold)" : "var(--ink-4)";
              return (
                <div
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  style={{
                    padding: "14px 22px",
                    cursor: "pointer",
                    background: isActive ? "var(--gold-tint)" : "transparent",
                    borderLeft: `3px solid ${isActive ? "var(--gold)" : "transparent"}`,
                    display: "flex", gap: 12, alignItems: "flex-start",
                  }}
                >
                  <div style={{ width: 24, height: 24, borderRadius: "50%", border: `1.5px solid ${stateColor}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, background: m.status === "done" ? stateColor : "transparent" }}>
                    {m.status === "done" ? <Icon name="check" size={12} color="#fff" strokeWidth={2.4} />
                      : m.status === "active" ? <span style={{ width: 8, height: 8, borderRadius: "50%", background: stateColor }}></span>
                      : <span className="mono" style={{ fontSize: 10, color: stateColor }}>{m.id}</span>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 500 }}>{m.title}</div>
                      <span className="mono muted" style={{ fontSize: 10.5, whiteSpace: "nowrap" }}>{m.weeks} sem</span>
                    </div>
                    <div className="muted" style={{ fontSize: 12, marginTop: 2, lineHeight: 1.4 }}>{m.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Module detail */}
        <div className="card card-pad fade-in" key={activeModule}>
          <div className="eyebrow">Módulo {mod.id} de 6 · {mod.status === "done" ? "Completado" : mod.status === "active" ? "En curso" : "Próximo"}</div>
          <h2 className="serif" style={{ fontSize: 28, margin: "10px 0 14px", fontWeight: 500 }}>{mod.title}</h2>
          <p style={{ color: "var(--ink-2)", fontSize: 14.5, lineHeight: 1.6, maxWidth: "60ch" }}>{mod.desc}</p>

          <Ornament />

          <div className="eyebrow" style={{ marginBottom: 10 }}>Entregable</div>
          <div className="card card-pad" style={{ background: "var(--bg)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: 14 }}>{mod.deliverable}</div>
              <div className="mono muted" style={{ fontSize: 11, marginTop: 4 }}>{mod.status === "active" ? "En construcción · 67% del entregable" : mod.status === "done" ? "Aprobado por RRHH" : "Aún no iniciado"}</div>
            </div>
            <Icon name="book" size={20} color="var(--gold-2)" />
          </div>

          {mod.status === "active" && (
            <>
              <div className="eyebrow" style={{ marginTop: 22, marginBottom: 10 }}>Próximas sesiones</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { day: "Jue 8 May", time: "14:00–16:30", topic: "Sombra · Cambio de turno línea 3" },
                  { day: "Lun 12 May", time: "09:00–11:00", topic: "Revisión semanal con Juan + Andrea" },
                  { day: "Jue 15 May", time: "14:00–16:30", topic: "Sombra · Auditoría interna ISO" },
                ].map((s, i) => (
                  <div key={i} style={{ padding: "12px 14px", border: "1px solid var(--line)", borderRadius: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <Icon name="calendar" size={14} color="var(--gold-2)" />
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{s.topic}</div>
                        <div className="mono muted" style={{ fontSize: 11, marginTop: 2 }}>{s.day} · {s.time}</div>
                      </div>
                    </div>
                    <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => setSessionDetails(s)}>Detalles</button>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="divider"></div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {[
              { l: "Procesos mapeados", v: tp.outcomes.knowledge },
              { l: "Sesiones de sombra", v: tp.outcomes.sessions },
              { l: "Horas registradas", v: `${tp.outcomes.hoursLogged} h` },
              { l: "Decisiones acompañadas", v: tp.outcomes.decisionsShadowed },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "left" }}>
                <div className="mono muted" style={{ fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase" }}>{s.l}</div>
                <div className="serif" style={{ fontSize: 24, fontWeight: 500, marginTop: 4 }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Anexos cargados */}
      {attachedFiles.length > 0 && (
        <div className="card card-pad" style={{ marginTop: 24 }}>
          <div className="section-h" style={{ marginBottom: 12 }}>
            <h3 className="serif" style={{ fontSize: 17, margin: 0 }}>Documentos anexados al programa</h3>
            <span className="mono muted" style={{ fontSize: 11 }}>{attachedFiles.length} archivo{attachedFiles.length === 1 ? "" : "s"}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {attachedFiles.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 4 }}>
                <Icon name="book" size={16} color="var(--gold-2)" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{f.name}</div>
                  <div className="mono muted" style={{ fontSize: 11, marginTop: 2 }}>{(f.size / 1024).toFixed(1)} KB · anexado {f.addedAt}</div>
                </div>
                <button className="btn-text" style={{ fontSize: 12, color: "var(--danger)" }} onClick={() => setAttachedFiles(arr => arr.filter((_, idx) => idx !== i))}>Quitar</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {sessionDetails && <SessionDetailsModal session={sessionDetails} onClose={() => setSessionDetails(null)} pushToast={pushToast} />}
      {registerOpen && <RegisterSessionModal onClose={() => setRegisterOpen(false)} pushToast={pushToast} module={activeModule} />}
    </div>
  );
};

// ============================================================
// Modal · detalles de sesión
// ============================================================
const SessionDetailsModal = ({ session, onClose, pushToast }) => {
  const { Modal } = window.LegacyModals;
  return (
    <Modal
      eyebrow={`Sesión agendada · ${session.day}`}
      title={session.topic}
      subtitle={`${session.day} · ${session.time} · Planta FlexoCruz`}
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-ghost" onClick={() => { pushToast("Sesión reprogramada"); onClose(); }}>Reprogramar</button>
          <button className="btn btn-primary" onClick={() => { pushToast("Sesión confirmada · calendar invite enviado"); onClose(); }}>
            <Icon name="check" size={14} /> Confirmar asistencia
          </button>
        </>
      }
    >
      <div className="user-section">
        <div className="user-section-title">Detalles del compromiso</div>
        <div className="user-row"><div className="user-row-label">Fecha</div><div className="user-row-val">{session.day}</div></div>
        <div className="user-row"><div className="user-row-label">Horario</div><div className="user-row-val mono-val">{session.time}</div></div>
        <div className="user-row"><div className="user-row-label">Tipo</div><div className="user-row-val">Sombra operativa · módulo 3</div></div>
        <div className="user-row"><div className="user-row-label">Ubicación</div><div className="user-row-val">Planta FlexoCruz · Línea 3</div></div>
      </div>
      <div className="user-section">
        <div className="user-section-title">Participantes</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { who: "Lorgio Saucedo", role: "Mentor · Consultor interno", initials: "LS" },
            { who: "Juan Antelo", role: "Sucesor · Jefe de Planta", initials: "JA" },
            { who: "Andrea Cuéllar", role: "Sponsor · RRHH", initials: "AC" },
          ].map(p => (
            <div key={p.initials} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar initials={p.initials} size="sm" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{p.who}</div>
                <div className="muted" style={{ fontSize: 11 }}>{p.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="user-section">
        <div className="user-section-title">Agenda propuesta</div>
        <ul style={{ paddingLeft: 18, fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.6, margin: 0 }}>
          <li>Revisión del cambio de turno desde la bitácora del turno anterior</li>
          <li>Decisiones a observar: cambio de mordaza y reasignación de operario</li>
          <li>Documentar criterios aplicados (mín. 1 decisión para el módulo 3)</li>
          <li>Cierre con Andrea · hallazgos de la semana</li>
        </ul>
      </div>
    </Modal>
  );
};

// ============================================================
// Modal · registrar sesión de hoy
// ============================================================
const RegisterSessionModal = ({ onClose, pushToast, module: mod }) => {
  const { Modal } = window.LegacyModals;
  const [form, setForm] = React.useState({
    date: new Date().toISOString().slice(0, 10),
    hours: "2.5",
    type: "Sombra operativa",
    location: "Planta FlexoCruz · Línea 3",
    decisions: "1",
    summary: "",
  });
  const upd = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = () => {
    if (!form.summary.trim()) { pushToast("Escribe un resumen de lo trabajado"); return; }
    const hrs = Number(form.hours) || 0;
    pushToast(`Sesión registrada · ${hrs} h sumadas a la bitácora del módulo ${mod}`);
    onClose();
  };
  return (
    <Modal
      eyebrow={`Bitácora · módulo ${mod}`}
      title="Registrar sesión de hoy"
      subtitle="Andrea (RRHH) recibe esto en el reporte semanal. Las horas suman a la bitácora del traspaso."
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={submit}><Icon name="check" size={14} /> Registrar sesión</button>
        </>
      }
    >
      <div className="auth-field-row">
        <div className="auth-field" style={{ flex: 1 }}>
          <label className="label">Fecha</label>
          <input className="input" type="date" value={form.date} onChange={upd("date")} />
        </div>
        <div className="auth-field" style={{ flex: 1 }}>
          <label className="label">Horas dedicadas</label>
          <input className="input" type="number" min="0" step="0.5" value={form.hours} onChange={upd("hours")} />
        </div>
      </div>
      <div className="auth-field-row">
        <div className="auth-field" style={{ flex: 1 }}>
          <label className="label">Tipo de sesión</label>
          <select className="select" value={form.type} onChange={upd("type")}>
            <option>Sombra operativa</option>
            <option>Revisión con sucesor</option>
            <option>Reunión con RRHH</option>
            <option>Documentación de proceso</option>
            <option>Auditoría interna</option>
          </select>
        </div>
        <div className="auth-field" style={{ width: 140 }}>
          <label className="label">Decisiones</label>
          <input className="input" type="number" min="0" value={form.decisions} onChange={upd("decisions")} />
        </div>
      </div>
      <div className="auth-field">
        <label className="label">Ubicación</label>
        <input className="input" value={form.location} onChange={upd("location")} />
      </div>
      <div className="auth-field">
        <label className="label">Resumen de lo trabajado</label>
        <textarea className="textarea" rows={4} placeholder="Qué se vio, qué decidió Juan, qué quedó pendiente…" value={form.summary} onChange={upd("summary")} style={{ resize: "vertical" }}></textarea>
      </div>
    </Modal>
  );
};

window.TransferProgram = TransferProgram;
