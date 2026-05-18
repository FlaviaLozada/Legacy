// Modales y utilidades funcionales reutilizables
// Cada uno expone una API simple con onClose + props específicas.

// ---------- Util: descarga real de archivo ----------
const downloadFile = (filename, content, mime = "text/csv;charset=utf-8;") => {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const csvEscape = (s) => {
  const v = String(s ?? "");
  return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
};

const toCSV = (rows) => rows.map(r => r.map(csvEscape).join(",")).join("\n");

window.LegacyUtils = { downloadFile, csvEscape, toCSV };

// ---------- Wrapper genérico ----------
const Modal = ({ title, subtitle, eyebrow, onClose, children, footer, maxWidth = 560 }) => (
  <div className="modal-backdrop" onClick={onClose}>
    <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth, padding: 0, overflow: "hidden" }}>
      <div style={{ padding: "22px 26px 18px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {eyebrow && <div className="eyebrow" style={{ marginBottom: 6 }}>{eyebrow}</div>}
          <h2 className="serif" style={{ fontSize: 22, margin: 0, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.2 }}>{title}</h2>
          {subtitle && <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>{subtitle}</div>}
        </div>
        <button className="icon-btn" onClick={onClose} aria-label="Cerrar"><Icon name="x" /></button>
      </div>
      <div style={{ padding: "20px 26px", maxHeight: "62vh", overflowY: "auto" }}>{children}</div>
      {footer && <div style={{ padding: "14px 26px", borderTop: "1px solid var(--line)", background: "var(--bg)", display: "flex", gap: 8, justifyContent: "flex-end" }}>{footer}</div>}
    </div>
  </div>
);

// ============================================================
// Registrar decisión (sesión)
// ============================================================
const DecisionModal = ({ onClose, onSave }) => {
  const [form, setForm] = React.useState({
    title: "",
    criterion: "",
    context: "",
    module: "3",
    severity: "media",
  });
  const upd = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave(form);
  };
  return (
    <Modal
      eyebrow="Bitácora · módulo 3"
      title="Registrar decisión acompañada"
      subtitle="Documenta el criterio detrás de una decisión real. Andrea verá esto en el reporte semanal."
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={submit} disabled={!form.title.trim()}>
            <Icon name="check" size={14} /> Registrar decisión
          </button>
        </>
      }
    >
      <form onSubmit={submit}>
        <div className="auth-field">
          <label className="label">Título de la decisión</label>
          <input className="input" placeholder="Ej. Cambio anticipado de mordaza" value={form.title} onChange={upd("title")} autoFocus />
        </div>
        <div className="auth-field">
          <label className="label">Criterio aplicado</label>
          <input className="input" placeholder="cliente · material · trazabilidad · etc." value={form.criterion} onChange={upd("criterion")} />
        </div>
        <div className="auth-field">
          <label className="label">Contexto / qué pasó</label>
          <textarea className="textarea" rows={4} placeholder="Lote, hora, equipo presente, qué se decidió y por qué" value={form.context} onChange={upd("context")} style={{ resize: "vertical" }}></textarea>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <div className="auth-field">
            <label className="label">Módulo</label>
            <select className="select" value={form.module} onChange={upd("module")}>
              <option value="1">Módulo 1 · Mapeo</option>
              <option value="2">Módulo 2 · Documentación</option>
              <option value="3">Módulo 3 · Sombra (activo)</option>
              <option value="4">Módulo 4 · Inversión de roles</option>
            </select>
          </div>
          <div className="auth-field">
            <label className="label">Importancia</label>
            <select className="select" value={form.severity} onChange={upd("severity")}>
              <option value="baja">Baja · operativa</option>
              <option value="media">Media · tactica</option>
              <option value="alta">Alta · estratégica</option>
            </select>
          </div>
        </div>
      </form>
    </Modal>
  );
};

// ============================================================
// Chat settings dropdown (compacto, no modal completo)
// ============================================================
const ChatSettingsMenu = ({ onClose, onAction }) => (
  <>
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 35 }}></div>
    <div className="chat-menu">
      {[
        { i: "bell",     l: "Silenciar notificaciones",   k: "mute" },
        { i: "paperclip",l: "Archivos compartidos",        k: "files" },
        { i: "book",     l: "Ver bitácora del módulo",     k: "log" },
        { i: "users",    l: "Añadir a Andrea (RRHH)",      k: "add-andrea" },
        { i: "x",        l: "Marcar como urgente",         k: "urgent" },
      ].map(o => (
        <button key={o.k} className="chat-menu-item" onClick={() => onAction(o)}>
          <Icon name={o.i} size={14} color="var(--ink-2)" /> {o.l}
        </button>
      ))}
      <div className="chat-menu-divider"></div>
      <button className="chat-menu-item danger" onClick={() => onAction({ k: "close-session" })}>
        Cerrar la sesión activa
      </button>
    </div>
  </>
);

// ============================================================
// Mis postulaciones
// ============================================================
const ApplicationsModal = ({ onClose, pushToast }) => {
  const D = window.LegacyData;
  const apps = D.APPLICATIONS;
  const ops = D.OPPORTUNITIES;
  const [filter, setFilter] = React.useState("Todas");

  const filtered = filter === "Todas" ? apps : apps.filter(a => a.status.toLowerCase().includes(filter.toLowerCase()));

  return (
    <Modal
      eyebrow="Marketplace de Sabiduría"
      title="Mis postulaciones"
      subtitle={`Tienes ${apps.length} postulaciones activas. Legacy te avisa cuando una empresa responde.`}
      onClose={onClose}
      maxWidth={680}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>Cerrar</button>
          <button className="btn btn-primary" onClick={() => { pushToast("Historial exportado en PDF"); }}>
            <Icon name="paperclip" size={14} /> Exportar historial
          </button>
        </>
      }
    >
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {["Todas", "Entrevista", "Revisión", "Enviada"].map(f => (
          <span key={f} className={`chip ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</span>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map(a => {
          const op = ops.find(o => o.id === a.opportunityId);
          return (
            <div key={a.id} className="card card-pad" style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 14 }}>{a.role}</div>
                  <div className="muted" style={{ fontSize: 12 }}>{a.company} · postulado el {a.date}</div>
                </div>
                <span className="badge" style={{ background: "transparent", color: a.color, borderColor: a.color }}>
                  <span className="dot-status" style={{ background: a.color }}></span>{a.status}
                </span>
              </div>
              {op && (
                <div style={{ display: "flex", gap: 14, fontSize: 12, color: "var(--ink-3)", flexWrap: "wrap", marginTop: 6 }}>
                  <span><Icon name="clock" size={11} /> {op.modality}</span>
                  <span><Icon name="billing" size={11} /> {op.compensation}</span>
                  <span style={{ color: op.fit >= 85 ? "var(--good)" : "var(--gold-2)", fontWeight: 600 }}>match {op.fit}%</span>
                </div>
              )}
              <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                <button className="btn btn-ghost" style={{ fontSize: 12, padding: "5px 10px" }} onClick={() => pushToast("Mensaje al reclutador enviado")}>Mensaje</button>
                {a.status.includes("Entrevista") && (
                  <button className="btn btn-primary" style={{ fontSize: 12, padding: "5px 10px" }} onClick={() => pushToast(`Entrevista confirmada · ${a.date}`)}>
                    <Icon name="video" size={12} /> Unirme
                  </button>
                )}
                <button className="btn-text" style={{ fontSize: 12, marginLeft: "auto" }} onClick={() => pushToast("Postulación retirada")}>Retirar</button>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

// ============================================================
// Preferencias de búsqueda
// ============================================================
const SearchPrefsModal = ({ onClose, prefs, setPrefs, pushToast }) => {
  const [local, setLocal] = React.useState(prefs);
  const upd = (k, v) => setLocal(p => ({ ...p, [k]: v }));
  const save = () => { setPrefs(local); pushToast("Preferencias guardadas · alertas activadas"); onClose(); };

  const SECTORS = ["Manufactura", "Alimentos", "Finanzas", "Energía", "Hidrocarburos", "Cooperativismo", "Plásticos", "Avicultura"];
  const TYPES = ["Consultoría", "Mentoría", "Proyecto", "Comité", "Asesoría", "Programa"];

  const toggle = (key, val) => {
    const arr = local[key];
    upd(key, arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  return (
    <Modal
      eyebrow="Marketplace · preferencias"
      title="Preferencias de búsqueda"
      subtitle="Definí qué oportunidades te mostramos primero y de cuáles te alertamos por correo."
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={save}><Icon name="check" size={14} /> Guardar preferencias</button>
        </>
      }
    >
      <div className="user-section">
        <div className="user-section-title">Sectores de interés</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {SECTORS.map(s => (
            <span key={s} className={`chip ${local.sectors.includes(s) ? "active" : ""}`} onClick={() => toggle("sectors", s)}>{s}</span>
          ))}
        </div>
      </div>

      <div className="user-section">
        <div className="user-section-title">Tipo de compromiso</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {TYPES.map(s => (
            <span key={s} className={`chip ${local.types.includes(s) ? "active" : ""}`} onClick={() => toggle("types", s)}>{s}</span>
          ))}
        </div>
      </div>

      <div className="user-section">
        <div className="user-section-title">Honorarios mínimos</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input className="input" type="number" min="0" max="20000" step="100" value={local.minFee} onChange={e => upd("minFee", Number(e.target.value))} style={{ maxWidth: 140 }} />
          <span className="mono muted" style={{ fontSize: 12 }}>USD / mes</span>
        </div>
      </div>

      <div className="user-section">
        <div className="user-section-title">Ubicación</div>
        <select className="select" value={local.location} onChange={e => upd("location", e.target.value)}>
          <option>Cualquier ubicación</option>
          <option>Santa Cruz</option>
          <option>Cochabamba</option>
          <option>La Paz</option>
          <option>Remoto</option>
          <option>Híbrido</option>
        </select>
      </div>

      <div className="user-section">
        <div className="user-section-title">Alertas</div>
        <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, padding: "6px 0" }}>
          <input type="checkbox" checked={local.emailAlerts} onChange={e => upd("emailAlerts", e.target.checked)} /> Recibir correo cuando aparezca un match ≥ 85%
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, padding: "6px 0" }}>
          <input type="checkbox" checked={local.weeklyDigest} onChange={e => upd("weeklyDigest", e.target.checked)} /> Resumen semanal de oportunidades nuevas
        </label>
      </div>
    </Modal>
  );
};

// ============================================================
// Agendar llamada (contacto con mentor / Lorgio)
// ============================================================
const ScheduleCallModal = ({ onClose, target = "Lorgio Saucedo", pushToast }) => {
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("10:00");
  const [topic, setTopic] = React.useState("");
  const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  // default = next monday
  React.useEffect(() => {
    const d = new Date();
    do { d.setDate(d.getDate() + 1); } while (d.getDay() !== 1);
    setDate(d.toISOString().slice(0, 10));
  }, []);

  const submit = () => {
    if (!topic.trim()) { pushToast("Escribe el motivo de la llamada"); return; }
    pushToast(`Llamada con ${target} agendada para ${date} ${time}`);
    onClose();
  };

  return (
    <Modal
      eyebrow="Agenda · sesión 1:1"
      title={`Agendar llamada con ${target.split(" ")[0]}`}
      subtitle="Las sesiones duran 30 min por defecto. Recibirás un calendar invite por correo."
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={submit}><Icon name="calendar" size={14} /> Agendar</button>
        </>
      }
    >
      <div className="auth-field">
        <label className="label">Fecha</label>
        <input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>
      <div className="auth-field">
        <label className="label">Hora disponible</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {slots.map(s => (
            <span key={s} className={`chip ${time === s ? "active" : ""}`} onClick={() => setTime(s)}>{s}</span>
          ))}
        </div>
      </div>
      <div className="auth-field">
        <label className="label">Motivo</label>
        <textarea className="textarea" rows={3} placeholder="¿De qué quieres conversar? Lorgio recibe esto antes." value={topic} onChange={e => setTopic(e.target.value)} style={{ resize: "vertical" }}></textarea>
      </div>
    </Modal>
  );
};

// ============================================================
// Contactar mentor (mensaje)
// ============================================================
const ContactMentorModal = ({ onClose, target = "Lorgio Saucedo", pushToast }) => {
  const [subject, setSubject] = React.useState("Interés en una primera sesión");
  const [message, setMessage] = React.useState("");
  const submit = () => {
    if (!message.trim()) { pushToast("Escribe un mensaje antes de enviar"); return; }
    pushToast(`Mensaje enviado a ${target}. Recibirás respuesta dentro de 24 h.`);
    onClose();
  };
  return (
    <Modal
      eyebrow="Mensaje directo"
      title={`Contactar a ${target.split(" ")[0]}`}
      subtitle="Legacy media el primer contacto. No compartimos tu correo hasta que el mentor acepte."
      onClose={onClose}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={submit}><Icon name="send" size={14} /> Enviar mensaje</button>
        </>
      }
    >
      <div className="auth-field">
        <label className="label">Asunto</label>
        <input className="input" value={subject} onChange={e => setSubject(e.target.value)} />
      </div>
      <div className="auth-field">
        <label className="label">Mensaje</label>
        <textarea className="textarea" rows={6} placeholder="Cuéntale brevemente quién eres, qué buscas y cuánta disponibilidad tienes." value={message} onChange={e => setMessage(e.target.value)} style={{ resize: "vertical" }}></textarea>
      </div>
      <div className="muted" style={{ fontSize: 11.5, lineHeight: 1.5 }}>
        <Icon name="verified" size={12} color="var(--gold)" /> Tu identidad fue verificada por Legacy. {target.split(" ")[0]} ve tu nombre, cargo y empresa.
      </div>
    </Modal>
  );
};

// ============================================================
// Todos los movimientos (honorarios)
// ============================================================
const AllMovementsModal = ({ onClose, pushToast }) => {
  const D = window.LegacyData;
  const base = D.BILLING_HISTORY;
  // Generamos histórico extendido para "ver todos"
  const extra = [
    { id: "b5", period: "Diciembre 2025", company: "FlexoCruz S.A.", concept: "Bonificación cierre anual", amount: 600, status: "Pagado", date: "20 Dic 2025" },
    { id: "b6", period: "Diciembre 2025", company: "FlexoCruz S.A.", concept: "Consultor interno · 22 h", amount: 1430, status: "Pagado", date: "31 Dic 2025" },
    { id: "b7", period: "Noviembre 2025", company: "FlexoCruz S.A.", concept: "Consultor interno · 18 h", amount: 1170, status: "Pagado", date: "30 Nov 2025" },
    { id: "b8", period: "Octubre 2025", company: "FlexoCruz S.A.", concept: "Workshop inducción Juan", amount: 750, status: "Pagado", date: "15 Oct 2025" },
  ];
  const all = [...base, ...extra];
  const total = all.reduce((s, b) => s + b.amount, 0);

  return (
    <Modal
      eyebrow="Historial completo"
      title="Todos los movimientos"
      subtitle={`${all.length} movimientos · neto USD ${total.toLocaleString()}`}
      onClose={onClose}
      maxWidth={780}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>Cerrar</button>
          <button className="btn btn-primary" onClick={() => {
            const rows = [["Fecha", "Período", "Empresa", "Concepto", "Monto USD", "Estado"]];
            all.forEach(b => rows.push([b.date, b.period, b.company, b.concept, b.amount, b.status]));
            downloadFile("legacy-honorarios.csv", toCSV(rows));
            pushToast("CSV de movimientos descargado");
          }}>
            <Icon name="paperclip" size={14} /> Descargar CSV
          </button>
        </>
      }
    >
      <div className="rowlist" style={{ borderTop: "1px solid var(--line)" }}>
        {all.map(b => (
          <div key={b.id} className="row" style={{ gridTemplateColumns: "1.4fr 1.2fr 1fr 0.8fr 0.7fr", padding: "12px 0", cursor: "default" }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 500 }}>{b.concept}</div>
              <div className="muted" style={{ fontSize: 11.5 }}>{b.company}</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 12 }}>{b.period}</div>
              <div className="mono muted" style={{ fontSize: 11 }}>{b.date}</div>
            </div>
            <div className="mono" style={{ fontSize: 13.5, fontWeight: 600, color: b.amount > 0 ? "var(--good)" : "var(--ink-2)", textAlign: "right" }}>
              {b.amount > 0 ? "+" : ""}${Math.abs(b.amount).toLocaleString()}
            </div>
            <div><span className="badge green">{b.status}</span></div>
            <div style={{ textAlign: "right" }}>
              <button className="btn-text" style={{ fontSize: 11 }} onClick={() => pushToast(`Factura ${b.id.toUpperCase()} abierta`)}>Recibo →</button>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

// Generar y descargar un PDF/HTML de reporte
const generateBillingReport = (pushToast) => {
  const D = window.LegacyData;
  const total = D.BILLING_HISTORY.reduce((s, b) => s + b.amount, 0);
  const date = new Date().toLocaleDateString("es-BO");
  const rows = D.BILLING_HISTORY.map(b => `
    <tr>
      <td>${b.date}</td><td>${b.concept}</td><td>${b.company}</td>
      <td style="text-align:right">${b.amount > 0 ? "+" : ""}$${Math.abs(b.amount).toLocaleString()}</td>
      <td>${b.status}</td>
    </tr>`).join("");
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Reporte de Honorarios · Legacy</title>
  <style>
    @page { margin: 22mm; }
    body { font-family: Georgia, serif; color: #0e1a2b; max-width: 760px; margin: 0 auto; padding: 24px; }
    h1 { font-size: 28px; margin: 0 0 4px; letter-spacing: -0.01em; }
    .sub { color: #5a6a82; font-size: 13px; }
    .stats { display: flex; gap: 24px; margin: 24px 0; padding: 18px 0; border-top: 1px solid #e3dccf; border-bottom: 1px solid #e3dccf; }
    .stat { flex: 1; }
    .stat-l { font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: #5a6a82; font-family: ui-monospace, monospace; }
    .stat-v { font-size: 22px; margin-top: 6px; font-weight: 500; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; font-family: -apple-system, sans-serif; font-size: 12px; }
    th { text-align: left; padding: 10px 8px; background: #f5f1ea; color: #5a6a82; font-size: 10px; letter-spacing: .12em; text-transform: uppercase; font-family: ui-monospace, monospace; }
    td { padding: 10px 8px; border-bottom: 1px solid #ecE5d8; }
    .foot { margin-top: 36px; padding-top: 16px; border-top: 1px solid #e3dccf; color: #5a6a82; font-size: 11px; }
    .brand { font-family: Georgia, serif; font-style: italic; color: #b8924a; font-size: 22px; }
    @media print { body { padding: 0; } }
  </style></head><body>
    <div style="display:flex;justify-content:space-between;align-items:flex-end;border-bottom:2px solid #b8924a;padding-bottom:14px">
      <div>
        <div class="brand">Legacy</div>
        <h1>Reporte de Honorarios</h1>
        <div class="sub">Lorgio Saucedo Roca · Consultor Senior · FlexoCruz S.A.</div>
      </div>
      <div class="sub" style="text-align:right">Generado: ${date}<br>Período: 2026 YTD</div>
    </div>
    <div class="stats">
      <div class="stat"><div class="stat-l">Acumulado</div><div class="stat-v">$${total.toLocaleString()}</div></div>
      <div class="stat"><div class="stat-l">Movimientos</div><div class="stat-v">${D.BILLING_HISTORY.length}</div></div>
      <div class="stat"><div class="stat-l">Comisión Legacy</div><div class="stat-v">15%</div></div>
      <div class="stat"><div class="stat-l">Plan</div><div class="stat-v">Premium</div></div>
    </div>
    <table>
      <thead><tr><th>Fecha</th><th>Concepto</th><th>Empresa</th><th style="text-align:right">Monto USD</th><th>Estado</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="foot">Reporte emitido por Legacy SRL · Silver Ecosistema digital B2B · Santa Cruz, Bolivia · v1.0 MVP</div>
  </body></html>`;
  return { html, total, count: D.BILLING_HISTORY.length, date };
};

function BillingReportModal({ onClose, pushToast }) {
  const D = window.LegacyData;
  const data = React.useMemo(() => generateBillingReport(), []);
  const iframeRef = React.useRef(null);

  const downloadHtml = () => {
    downloadFile("reporte-honorarios-legacy.html", data.html, "text/html;charset=utf-8;");
    pushToast("Reporte HTML descargado · ábrelo e imprime para PDF");
  };
  const downloadCsv = () => {
    const rows = [["Fecha", "Período", "Empresa", "Concepto", "Monto USD", "Estado"]];
    D.BILLING_HISTORY.forEach(b => rows.push([b.date, b.period, b.company, b.concept, b.amount, b.status]));
    downloadFile("reporte-honorarios-legacy.csv", toCSV(rows));
    pushToast("CSV descargado · ábrelo en Excel / Numbers");
  };
  const printNow = () => {
    const w = window.open("", "_blank", "noopener,noreferrer,width=900,height=1200");
    if (!w) { pushToast("Tu navegador bloqueó la ventana de impresión"); return; }
    w.document.open();
    w.document.write(data.html);
    w.document.close();
    w.focus();
    setTimeout(() => { try { w.print(); } catch {} }, 300);
    pushToast("Abriendo previsualización para imprimir / guardar como PDF");
  };

  return (
    <Modal
      eyebrow="Honorarios · reporte fiscal"
      title="Descargar reporte"
      subtitle="Resumen de tus honorarios 2026 listo para tu contador o reporte personal. Elige el formato que prefieras."
      onClose={onClose}
      maxWidth={760}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>Cerrar</button>
        </>
      }
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 18 }}>
        <button className="report-option" onClick={printNow}>
          <Icon name="paperclip" size={22} color="var(--gold-2)" />
          <div className="report-option-label">Imprimir / PDF</div>
          <div className="report-option-sub">Abre previsualización · guarda como PDF</div>
        </button>
        <button className="report-option" onClick={downloadHtml}>
          <Icon name="book" size={22} color="var(--gold-2)" />
          <div className="report-option-label">Descargar HTML</div>
          <div className="report-option-sub">Reporte formateado · abre en navegador</div>
        </button>
        <button className="report-option" onClick={downloadCsv}>
          <Icon name="billing" size={22} color="var(--gold-2)" />
          <div className="report-option-label">Descargar CSV</div>
          <div className="report-option-sub">Hoja de cálculo · Excel · Numbers</div>
        </button>
      </div>

      <div className="user-section-title" style={{ marginBottom: 8 }}>Vista previa</div>
      <div style={{ border: "1px solid var(--line)", borderRadius: 6, overflow: "hidden", background: "#fff", height: 360 }}>
        <iframe
          ref={iframeRef}
          srcDoc={data.html}
          style={{ width: "100%", height: "100%", border: "none", background: "#fff" }}
          title="Vista previa del reporte"
        />
      </div>

      <div className="mono muted" style={{ fontSize: 11, marginTop: 12, lineHeight: 1.5, display: "flex", gap: 6, alignItems: "center" }}>
        <Icon name="verified" size={12} color="var(--gold)" />
        Acumulado <strong>${data.total.toLocaleString()}</strong> · {data.count} movimientos · generado el {data.date}
      </div>
    </Modal>
  );
}

window.BillingReportModal = BillingReportModal;

window.LegacyModals = {
  Modal,
  DecisionModal,
  ChatSettingsMenu,
  ApplicationsModal,
  SearchPrefsModal,
  ScheduleCallModal,
  ContactMentorModal,
  AllMovementsModal,
  generateBillingReport,
};

// Expose these globally so they can be used as JSX components in other scripts.
// (Each <script type="text/babel"> has its own scope; window.* makes them shared.)
const __exposeLater = () => Object.assign(window, {
  EditProfileModal,
  TopbarPopover,
  CalendarPopover,
  NotificationsPopover,
  SettingsPopover,
  UserAccountModal: window.UserAccountModal, // already set by user-modal.jsx
});

// ============================================================
// Edit personal info
// ============================================================
function EditProfileModal({ onClose, persona, pushToast }) {
  const D = window.LegacyData;
  const u = D.USER_ACCOUNTS[persona];
  const [form, setForm] = React.useState({
    name: u.name,
    email: u.email,
    phone: u.phone,
    location: u.location,
    position: u.position,
    languages: u.languages.join(", "),
  });
  const upd = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = () => {
    // Persist into in-memory data so the change is visible on next open
    Object.assign(u, {
      name: form.name,
      email: form.email,
      phone: form.phone,
      location: form.location,
      position: form.position,
      languages: form.languages.split(",").map(s => s.trim()).filter(Boolean),
    });
    pushToast("Información personal actualizada");
    onClose();
  };
  return (
    <Modal
      eyebrow="Mi cuenta"
      title="Editar información personal"
      subtitle="Los cambios se guardan en tu perfil y aparecen en próximas postulaciones y mensajes."
      onClose={onClose}
      maxWidth={520}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={submit}><Icon name="check" size={14} /> Guardar cambios</button>
        </>
      }
    >
      <div className="auth-field">
        <label className="label">Nombre completo</label>
        <input className="input" value={form.name} onChange={upd("name")} />
      </div>
      <div className="auth-field">
        <label className="label">Cargo / rol</label>
        <input className="input" value={form.position} onChange={upd("position")} />
      </div>
      <div className="auth-field">
        <label className="label">Correo electrónico</label>
        <input className="input" type="email" value={form.email} onChange={upd("email")} />
      </div>
      <div className="auth-field-row">
        <div className="auth-field" style={{ flex: 1 }}>
          <label className="label">Teléfono</label>
          <input className="input" value={form.phone} onChange={upd("phone")} />
        </div>
        <div className="auth-field" style={{ flex: 1 }}>
          <label className="label">Ubicación</label>
          <input className="input" value={form.location} onChange={upd("location")} />
        </div>
      </div>
      <div className="auth-field">
        <label className="label">Idiomas (separados por coma)</label>
        <input className="input" value={form.languages} onChange={upd("languages")} />
      </div>
    </Modal>
  );
}

// ============================================================
// Topbar popovers — anchored dropdowns from the topbar icons
// ============================================================
function TopbarPopover({ onClose, anchor = "right", children, width = 340 }) {
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 35 }}></div>
      <div className="topbar-popover" style={{ [anchor]: 0, width }}>
        {children}
      </div>
    </>
  );
}

function CalendarPopover({ onClose, pushToast }) {
  const upcoming = [
    { d: "Hoy",        time: "14:00 – 16:30", topic: "Sombra · Cambio de turno línea 3", who: "Juan Antelo", at: "Planta FlexoCruz" },
    { d: "Jue 8 May",  time: "14:00 – 16:30", topic: "Sombra · Auditoría interna ISO",  who: "Juan + Andrea", at: "Planta FlexoCruz" },
    { d: "Lun 12 May", time: "09:00 – 11:00", topic: "Revisión semanal del programa",   who: "Andrea Cuéllar", at: "Sala 2 · oficina" },
    { d: "Mié 14 May", time: "10:00 – 11:00", topic: "Entrevista · Vascal S.A.",         who: "Patricia Castedo", at: "Videollamada" },
  ];
  return (
    <TopbarPopover onClose={onClose} width={380}>
      <div className="popover-head">
        <div className="serif" style={{ fontSize: 17, fontWeight: 500 }}>Mi agenda</div>
        <div className="mono muted" style={{ fontSize: 11 }}>Próximas 4 sesiones</div>
      </div>
      <div className="popover-body" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {upcoming.map((e, i) => (
          <button key={i} className="popover-item" onClick={() => { onClose(); pushToast(`Sesión "${e.topic}" abierta`); }}>
            <div style={{ width: 44, textAlign: "center", flexShrink: 0 }}>
              <div className="mono" style={{ fontSize: 10, color: "var(--gold-2)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{e.d}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{e.time.split(" – ")[0]}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{e.topic}</div>
              <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>{e.who} · {e.at}</div>
            </div>
          </button>
        ))}
      </div>
      <div className="popover-foot">
        <button className="btn btn-ghost" style={{ width: "100%" }} onClick={() => { onClose(); pushToast("Calendario completo · próximamente"); }}>
          <Icon name="calendar" size={14} /> Ver calendario completo
        </button>
      </div>
    </TopbarPopover>
  );
}

function NotificationsPopover({ onClose, pushToast }) {
  const D = window.LegacyData;
  const [items, setItems] = React.useState(D.NOTIFICATIONS);
  const markAll = () => { setItems(arr => arr.map(n => ({ ...n, unread: false }))); pushToast("Todas marcadas como leídas"); };
  return (
    <TopbarPopover onClose={onClose} width={400}>
      <div className="popover-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="serif" style={{ fontSize: 17, fontWeight: 500 }}>Notificaciones</div>
          <div className="mono muted" style={{ fontSize: 11 }}>{items.filter(n => n.unread).length} sin leer</div>
        </div>
        <button className="btn-text" style={{ fontSize: 12 }} onClick={markAll}>Marcar todas</button>
      </div>
      <div className="popover-body" style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 320, overflowY: "auto" }}>
        {items.map(n => {
          const icon = n.type === "session" ? "video" : n.type === "match" ? "users" : n.type === "billing" ? "billing" : "bell";
          return (
            <div key={n.id} className="popover-item" style={{ background: n.unread ? "var(--gold-tint)" : "transparent", cursor: "default", borderRadius: 4 }}>
              <Icon name={icon} size={14} color="var(--gold-2)" />
              <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                <div style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.4 }}>{n.text}</div>
                <div className="mono muted" style={{ fontSize: 10.5, marginTop: 3 }}>{n.time}</div>
              </div>
              {n.unread && <span className="dot-status" style={{ marginTop: 4, flexShrink: 0 }}></span>}
            </div>
          );
        })}
      </div>
      <div className="popover-foot">
        <button className="btn-text" style={{ fontSize: 12, width: "100%" }} onClick={() => { onClose(); pushToast("Centro de notificaciones · próximamente"); }}>Ver historial completo →</button>
      </div>
    </TopbarPopover>
  );
}

function SettingsPopover({ onClose, persona, pushToast, onOpenAccount, onSignOut }) {  const [tweaks, setTweaks] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem("legacy.prefs") || "{}"); } catch { return {}; }
  });
  const set = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    localStorage.setItem("legacy.prefs", JSON.stringify(next));
    pushToast("Preferencia guardada");
  };
  const lang = tweaks.lang || "es";
  const tz = tweaks.tz || "America/La_Paz";

  return (
    <TopbarPopover onClose={onClose} width={340}>
      <div className="popover-head">
        <div className="serif" style={{ fontSize: 17, fontWeight: 500 }}>Ajustes</div>
        <div className="mono muted" style={{ fontSize: 11 }}>Tu cuenta · Legacy v1.0</div>
      </div>
      <div className="popover-body" style={{ padding: "12px 4px" }}>
        <div className="settings-row">
          <span>Idioma</span>
          <select className="select" value={lang} onChange={e => set("lang", e.target.value)} style={{ width: "auto", padding: "4px 8px", fontSize: 12 }}>
            <option value="es">Español</option>
            <option value="pt">Português</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className="settings-row">
          <span>Zona horaria</span>
          <select className="select" value={tz} onChange={e => set("tz", e.target.value)} style={{ width: "auto", padding: "4px 8px", fontSize: 12 }}>
            <option>America/La_Paz</option>
            <option>America/Lima</option>
            <option>America/Bogota</option>
            <option>America/Sao_Paulo</option>
          </select>
        </div>
        <div className="settings-row">
          <span>Correo de novedades</span>
          <label className="settings-switch">
            <input type="checkbox" checked={!!tweaks.email} onChange={e => set("email", e.target.checked)} />
            <span></span>
          </label>
        </div>
        <div className="settings-row">
          <span>Notificaciones push</span>
          <label className="settings-switch">
            <input type="checkbox" checked={tweaks.push !== false} onChange={e => set("push", e.target.checked)} />
            <span></span>
          </label>
        </div>
        <div className="settings-divider"></div>
        <button className="popover-link" onClick={() => { onClose(); onOpenAccount(); }}>
          <Icon name="profile" size={14} /> Mi cuenta
        </button>
        <button className="popover-link" onClick={() => { onClose(); pushToast("Centro de ayuda · próximamente"); }}>
          <Icon name="book" size={14} /> Ayuda y soporte
        </button>
        <button className="popover-link" onClick={() => { onClose(); pushToast("Términos y privacidad abiertos"); }}>
          <Icon name="paperclip" size={14} /> Términos y privacidad
        </button>
      </div>
      <div className="popover-foot">
        <button className="btn btn-ghost" style={{ width: "100%", color: "var(--danger)", borderColor: "rgba(164,69,58,0.3)" }} onClick={() => { onClose(); onSignOut(); }}>
          Cerrar sesión
        </button>
      </div>
    </TopbarPopover>
  );
}

// Expose to global scope so other Babel scripts can use these as JSX components
__exposeLater();

// ============================================================
// Membership management
// ============================================================
function MembershipModal({ onClose, persona, pushToast }) {
  const D = window.LegacyData;
  const u = D.USER_ACCOUNTS[persona];
  const [plan, setPlan] = React.useState(() => {
    if (u.plan.includes("Premium")) return "premium";
    if (u.plan.includes("Enterprise")) return "enterprise";
    return "free";
  });
  const [autoRenew, setAutoRenew] = React.useState(true);

  const PLANS = [
    {
      id: "free", label: "Senior Free", price: "$0", per: "/mes",
      sub: "Acceso básico al Marketplace",
      feats: ["Postular a 3 oportunidades/mes", "Perfil estándar", "Comisión 20% en honorarios"],
    },
    {
      id: "premium", label: "Senior Premium", price: "$35", per: "/mes",
      sub: "Más visibilidad y comisión reducida",
      feats: [
        "Postulaciones ilimitadas",
        "Visibilidad prioritaria en Marketplace",
        "Insignia de mentor verificado",
        "Comisión reducida (15%)",
        "Reportes de impacto descargables",
        "Soporte de coordinador dedicado",
      ],
      featured: true,
    },
    {
      id: "elite", label: "Senior Elite", price: "$120", per: "/mes",
      sub: "Para seniors con asientos de comité",
      feats: [
        "Todo lo de Premium",
        "Coordinador ejecutivo personal",
        "Asientos de comité destacados",
        "Comisión 10%",
        "Verificación premium (CAINCO + 2 referencias)",
      ],
    },
  ];

  const save = () => {
    const selected = PLANS.find(p => p.id === plan);
    u.plan = `${selected.label} · USD ${selected.price.replace("$","")}/mes`;
    pushToast(`Plan ${selected.label} activado · renovación automática ${autoRenew ? "ON" : "OFF"}`);
    onClose();
  };

  return (
    <Modal
      eyebrow="Membresía Legacy"
      title="Gestionar tu membresía"
      subtitle="Cambia tu plan en cualquier momento. Los cambios se aplican en la próxima facturación."
      onClose={onClose}
      maxWidth={760}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={save}><Icon name="check" size={14} /> Confirmar cambios</button>
        </>
      }
    >
      {/* Plan cards */}
      <div className="plan-grid">
        {PLANS.map(p => (
          <button
            key={p.id}
            className={`plan-card ${plan === p.id ? "selected" : ""} ${p.featured ? "featured" : ""}`}
            onClick={() => setPlan(p.id)}
            type="button"
          >
            {p.featured && <span className="plan-badge">Recomendado</span>}
            <div className="plan-label">{p.label}</div>
            <div className="plan-price">
              <span className="serif">{p.price}</span>
              <span className="mono muted">{p.per}</span>
            </div>
            <div className="plan-sub muted">{p.sub}</div>
            <div className="plan-feats">
              {p.feats.map(f => (
                <div key={f} className="plan-feat">
                  <Icon name="check" size={12} color="var(--gold)" strokeWidth={2.6} /> {f}
                </div>
              ))}
            </div>
            {plan === p.id && <span className="plan-check"><Icon name="check" size={11} color="#fff" strokeWidth={2.8} /></span>}
          </button>
        ))}
      </div>

      {/* Renewal options */}
      <div className="user-section" style={{ marginTop: 22 }}>
        <div className="user-section-title">Facturación</div>
        <div className="user-row">
          <div>
            <div className="user-row-label" style={{ color: "var(--ink), fontSize: 13" }}>Renovación automática</div>
            <div className="muted" style={{ fontSize: 11.5, marginTop: 2 }}>Se cobra cada 28 del mes a tu cuenta verificada</div>
          </div>
          <label className="settings-switch">
            <input type="checkbox" checked={autoRenew} onChange={e => setAutoRenew(e.target.checked)} />
            <span></span>
          </label>
        </div>
        <div className="user-row">
          <div>
            <div className="user-row-label" style={{ color: "var(--ink), fontSize: 13" }}>Método de pago</div>
            <div className="mono muted" style={{ fontSize: 11.5, marginTop: 2 }}>{u.bank}</div>
          </div>
          <button className="btn-text" style={{ fontSize: 12 }} onClick={() => pushToast("Cambio de método de pago iniciado")}>Cambiar</button>
        </div>
      </div>

      {/* Cancel link */}
      <div style={{ paddingTop: 14, marginTop: 4, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="muted" style={{ fontSize: 12 }}>Al cancelar mantienes acceso hasta el fin del período pagado.</div>
        <button className="btn-text" style={{ fontSize: 12, color: "var(--danger)" }} onClick={() => { pushToast("Membresía cancelada · acceso hasta 28 abr"); onClose(); }}>
          Cancelar membresía
        </button>
      </div>
    </Modal>
  );
}

// Expose membership modal too
window.MembershipModal = MembershipModal;

// ============================================================
// Inbox · Solicitudes de llamada (Lorgio recibe)
// ============================================================
function IncomingCallsModal({ onClose, pushToast }) {
  const D = window.LegacyData;
  const [items, setItems] = React.useState(D.INCOMING_CALL_REQUESTS);

  const setStatus = (id, status) => {
    setItems(arr => arr.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <Modal
      eyebrow="Mi bandeja · solicitudes entrantes"
      title="Solicitudes de llamada"
      subtitle={`${items.filter(r => r.status === "pending").length} pendientes de tu respuesta · ${items.filter(r => r.status === "accepted").length} aceptadas`}
      onClose={onClose}
      maxWidth={680}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>Cerrar</button>
          <button className="btn btn-primary" onClick={() => { onClose(); pushToast("Calendario completo abierto"); }}>
            <Icon name="calendar" size={14} /> Ver agenda completa
          </button>
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map(r => (
          <div key={r.id} className="card card-pad" style={{ padding: 16 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <Avatar initials={r.initials} size="md" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>{r.from}</div>
                    <div className="muted" style={{ fontSize: 12 }}>{r.role} · {r.company}</div>
                  </div>
                  <div className="mono muted" style={{ fontSize: 11 }}>{r.timeAgo}</div>
                </div>
                <p style={{ fontSize: 13, color: "var(--ink-2)", margin: "10px 0", lineHeight: 1.5 }}>{r.topic}</p>
                <div style={{ display: "flex", gap: 14, fontSize: 12, color: "var(--ink-3)", flexWrap: "wrap" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="calendar" size={12} color="var(--gold-2)" /> {r.proposed}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Icon name="clock" size={12} color="var(--gold-2)" /> {r.duration}</span>
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 14, alignItems: "center" }}>
                  {r.status === "pending" ? (
                    <>
                      <button className="btn btn-primary" style={{ fontSize: 12, padding: "6px 12px" }} onClick={() => { setStatus(r.id, "accepted"); pushToast(`Llamada con ${r.from.split(" ")[0]} confirmada`); }}>
                        <Icon name="check" size={12} /> Aceptar
                      </button>
                      <button className="btn btn-ghost" style={{ fontSize: 12, padding: "6px 12px" }} onClick={() => { pushToast(`Propuesta de nueva fecha enviada a ${r.from.split(" ")[0]}`); }}>
                        Proponer otra fecha
                      </button>
                      <button className="btn-text" style={{ fontSize: 12, marginLeft: "auto", color: "var(--danger)" }} onClick={() => { setStatus(r.id, "declined"); pushToast("Solicitud declinada"); }}>
                        Declinar
                      </button>
                    </>
                  ) : r.status === "accepted" ? (
                    <>
                      <span className="badge green"><span className="dot-status green"></span>Confirmada</span>
                      <button className="btn-text" style={{ fontSize: 12, marginLeft: "auto" }} onClick={() => pushToast(`Calendar invite reenviado a ${r.from.split(" ")[0]}`)}>
                        Reenviar invite
                      </button>
                    </>
                  ) : (
                    <span className="badge neutral">Declinada</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

// ============================================================
// Inbox · Mensajes recibidos
// ============================================================
function IncomingMessagesModal({ onClose, pushToast }) {
  const D = window.LegacyData;
  const [items, setItems] = React.useState(D.INCOMING_MESSAGES);
  const [open, setOpen] = React.useState(null);
  const [reply, setReply] = React.useState("");

  const unread = items.filter(m => m.unread).length;
  const openMsg = (m) => {
    setItems(arr => arr.map(x => x.id === m.id ? { ...x, unread: false } : x));
    setOpen(m.id);
    setReply("");
  };
  const sendReply = () => {
    if (!reply.trim()) { pushToast("Escribe una respuesta"); return; }
    pushToast(`Respuesta enviada a ${current.from.split(" ")[0]}`);
    setOpen(null);
    setReply("");
  };

  const current = items.find(m => m.id === open);

  return (
    <Modal
      eyebrow="Mi bandeja · mensajes"
      title="Mensajes recibidos"
      subtitle={`${unread} sin leer · ${items.length} en total`}
      onClose={onClose}
      maxWidth={720}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>Cerrar</button>
          <button className="btn btn-primary" onClick={() => { setItems(arr => arr.map(m => ({ ...m, unread: false }))); pushToast("Todos marcados como leídos"); }}>
            Marcar todos como leídos
          </button>
        </>
      }
    >
      {!current && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map(m => (
            <button key={m.id} className="popover-item" style={{ background: m.unread ? "var(--gold-tint)" : "var(--bg-elev)", border: "1px solid var(--line)", padding: "12px 14px" }} onClick={() => openMsg(m)}>
              <Avatar initials={m.initials} size="md" />
              <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" }}>
                  <div style={{ fontSize: 13.5, fontWeight: m.unread ? 600 : 500 }}>{m.from}</div>
                  <div className="mono muted" style={{ fontSize: 10.5, flexShrink: 0 }}>{m.time}</div>
                </div>
                <div className="muted" style={{ fontSize: 11.5, marginTop: 1 }}>{m.role}</div>
                <div style={{ fontSize: 13, fontWeight: m.unread ? 600 : 500, marginTop: 6 }}>{m.subject}</div>
                <div className="muted" style={{ fontSize: 12, marginTop: 4, lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{m.preview}</div>
              </div>
              {m.unread && <span className="dot-status" style={{ marginTop: 4, flexShrink: 0 }}></span>}
            </button>
          ))}
        </div>
      )}

      {current && (
        <div>
          <button className="btn-text" style={{ fontSize: 12, marginBottom: 14 }} onClick={() => setOpen(null)}>← Volver a la bandeja</button>
          <div style={{ display: "flex", gap: 12, alignItems: "center", paddingBottom: 14, borderBottom: "1px solid var(--line)" }}>
            <Avatar initials={current.initials} size="md" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{current.from}</div>
              <div className="muted" style={{ fontSize: 12 }}>{current.role}</div>
            </div>
            <span className="mono muted" style={{ fontSize: 11 }}>{current.time}</span>
          </div>
          <h3 className="serif" style={{ fontSize: 19, fontWeight: 500, margin: "16px 0 12px" }}>{current.subject}</h3>
          <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-2)", whiteSpace: "pre-wrap" }}>{current.body}</div>
          <div className="divider"></div>
          <div className="user-section-title" style={{ marginBottom: 10 }}>Responder</div>
          <textarea className="textarea" rows={4} placeholder={`Responder a ${current.from.split(" ")[0]}…`} value={reply} onChange={e => setReply(e.target.value)} style={{ resize: "vertical" }}></textarea>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 12 }}>
            <button className="btn btn-ghost" onClick={() => setOpen(null)}>Cancelar</button>
            <button className="btn btn-primary" onClick={sendReply}><Icon name="send" size={14} /> Enviar respuesta</button>
          </div>
        </div>
      )}
    </Modal>
  );
}

window.IncomingCallsModal = IncomingCallsModal;
window.IncomingMessagesModal = IncomingMessagesModal;

// ============================================================
// Publicar búsqueda de mentor (Empresa / RRHH)
// Guarda en localStorage para persistir entre sesiones.
// ============================================================
const SEARCH_DB_KEY = "legacy.searches.v1";

const readSearchDB = () => {
  try { return JSON.parse(localStorage.getItem(SEARCH_DB_KEY) || "[]"); } catch { return []; }
};
const writeSearchDB = (arr) => {
  localStorage.setItem(SEARCH_DB_KEY, JSON.stringify(arr));
};

function PublishSearchModal({ onClose, pushToast }) {
  const [form, setForm] = React.useState({
    role: "",
    area: "Producción",
    type: "Mentoría",
    modality: "6 meses · 2 sesiones/mes",
    budget: 3000,
    location: "Santa Cruz · híbrido",
    urgency: "Media",
    description: "",
    expertise: "",
  });
  const upd = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = () => {
    if (!form.role.trim() || !form.description.trim()) {
      pushToast("Completa el rol y la descripción");
      return;
    }
    const item = {
      id: `s${Date.now()}`,
      ...form,
      budget: Number(form.budget) || 0,
      expertise: form.expertise.split(",").map(s => s.trim()).filter(Boolean),
      company: "FlexoCruz S.A.",
      companyId: "flexocruz",
      posted: "Hace un momento",
      applicants: 0,
      createdAt: new Date().toISOString(),
      source: "demo-localStorage",
    };
    const arr = readSearchDB();
    arr.unshift(item);
    writeSearchDB(arr);
    window.dispatchEvent(new CustomEvent("legacy:searches-updated"));
    pushToast(`Búsqueda "${item.role}" publicada en el Marketplace`);
    onClose();
  };

  return (
    <Modal
      eyebrow="Marketplace · publicar"
      title="Publicar búsqueda de mentor"
      subtitle="Tu publicación aparecerá en el Marketplace y los seniors podrán postular. Verificamos cada postulación antes de notificarte."
      onClose={onClose}
      maxWidth={620}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={submit}>
            <Icon name="check" size={14} /> Publicar búsqueda
          </button>
        </>
      }
    >
      <div className="auth-field">
        <label className="label">Rol que buscas</label>
        <input className="input" placeholder="Ej. Mentor para Jefatura de Calidad" value={form.role} onChange={upd("role")} autoFocus />
      </div>
      <div className="auth-field-row">
        <div className="auth-field" style={{ flex: 1 }}>
          <label className="label">Área de la empresa</label>
          <select className="select" value={form.area} onChange={upd("area")}>
            {["Producción", "Calidad", "Mantenimiento", "Comercial", "Finanzas", "Logística", "RRHH", "TI", "Legal", "Dirección"].map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
        <div className="auth-field" style={{ flex: 1 }}>
          <label className="label">Tipo de compromiso</label>
          <select className="select" value={form.type} onChange={upd("type")}>
            {["Mentoría", "Consultoría", "Proyecto", "Asesoría", "Comité", "Programa"].map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
      </div>
      <div className="auth-field-row">
        <div className="auth-field" style={{ flex: 1 }}>
          <label className="label">Modalidad / duración</label>
          <input className="input" placeholder="Ej. 6 meses · 2 sesiones/mes" value={form.modality} onChange={upd("modality")} />
        </div>
        <div className="auth-field" style={{ flex: 1 }}>
          <label className="label">Ubicación</label>
          <input className="input" value={form.location} onChange={upd("location")} />
        </div>
      </div>
      <div className="auth-field-row">
        <div className="auth-field" style={{ flex: 1 }}>
          <label className="label">Presupuesto (USD / mes)</label>
          <input className="input" type="number" min="0" step="100" value={form.budget} onChange={upd("budget")} />
        </div>
        <div className="auth-field" style={{ flex: 1 }}>
          <label className="label">Urgencia</label>
          <select className="select" value={form.urgency} onChange={upd("urgency")}>
            <option>Alta</option><option>Media</option><option>Baja</option>
          </select>
        </div>
      </div>
      <div className="auth-field">
        <label className="label">Descripción</label>
        <textarea className="textarea" rows={4} placeholder="¿Qué necesita resolver el mentor? ¿Cuál es el contexto del cargo?" value={form.description} onChange={upd("description")} style={{ resize: "vertical" }}></textarea>
      </div>
      <div className="auth-field">
        <label className="label">Expertise requerido (separar por coma)</label>
        <input className="input" placeholder="Ej. ISO 9001, Auditorías, Calidad industrial" value={form.expertise} onChange={upd("expertise")} />
      </div>
      <div className="muted" style={{ fontSize: 11.5, marginTop: 4, lineHeight: 1.5 }}>
        <Icon name="verified" size={12} color="var(--gold)" /> Guardado en tu cuenta como demo (localStorage). En producción se sincroniza con el Marketplace global.
      </div>
    </Modal>
  );
}

window.PublishSearchModal = PublishSearchModal;
window.LegacySearchDB = { read: readSearchDB, write: writeSearchDB };
