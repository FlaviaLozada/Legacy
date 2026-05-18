// Active mentorship session — chat + milestones + video stub
// En mobile funciona estilo WhatsApp: lista → chat → vuelta con flecha
const Session = ({ persona, pushToast }) => {
  const D = window.LegacyData;
  const tp = D.TRANSFER_PROGRAM;

  const [messages, setMessages] = React.useState([
    { id: 1, from: "out", who: "Lorgio", text: "Buenos días, Juan. Te dejé en la carpeta compartida la bitácora de la línea 3 del turno de ayer. Revisa especialmente el cambio de mordaza a las 14:20 — ahí está la decisión que quería que entendieras.", time: "08:14" },
    { id: 2, from: "in", who: "Juan", text: "Don Lorgio, ya la abrí. La pregunta que tengo es: ¿por qué no esperó al cambio programado de las 16:00? La diferencia es solo de 100 minutos.", time: "08:18" },
    { id: 3, from: "out", who: "Lorgio", text: "Esa es exactamente la pregunta correcta. Mira el lote que estaba corriendo: era el de Embol, capa de 80 micras. Cuando ves el degaste de la mordaza con ese material, en 100 minutos te entrega 4.000 metros con sello defectuoso. Ese cliente no perdona devoluciones.", time: "08:21" },
    { id: 4, from: "out", who: "Lorgio", text: "El criterio no es el reloj — es el cliente y el material. ¿Vamos al cuaderno verde que dejé en planta? Página 47.", time: "08:21" },
    { id: 5, from: "in", who: "Juan", text: "Lo busco ahora. Andrea preguntó si registramos esto como decisión acompañada para el módulo 3.", time: "08:25" },
  ]);
  const [draft, setDraft] = React.useState("");
  const scrollRef = React.useRef(null);
  const [decisionOpen, setDecisionOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [decisions, setDecisions] = React.useState([
    { t: "Cambio anticipado de mordaza", c: "criterio · cliente y material", check: true },
    { t: "Reasignación turno · operario nuevo", c: "criterio · curva de aprendizaje", check: true },
    { t: "Pausa de calidad · lote farmacéutico", c: "criterio · trazabilidad", check: true },
    { t: "Negociación con proveedor de tinta", c: "Esta sesión", check: false },
  ]);

  // Mobile WhatsApp-like nav: 'inbox' | 'chat' | 'info'
  // En desktop el chat + info se muestran a la par. En mobile solo uno a la vez.
  const [mobileView, setMobileView] = React.useState("inbox");

  // Conversaciones disponibles (inbox)
  const conversations = [
    {
      id: "juan", who: "Juan Antelo Méndez", initials: "JA",
      role: "Sucesor · Jefe de Planta",
      preview: messages[messages.length - 1].text,
      time: messages[messages.length - 1].time,
      online: true, unread: 0, pinned: true,
    },
    {
      id: "andrea", who: "Andrea Cuéllar", initials: "AC",
      role: "Sponsor · RRHH",
      preview: "Lorgio, te paso los hitos del módulo 3 para tu validación.",
      time: "ayer",
      online: false, unread: 1,
    },
    {
      id: "legacy", who: "Equipo Legacy", initials: "LE",
      role: "Coordinación de plataforma",
      preview: "Tu próxima sesión es el jueves a las 14:00 en planta.",
      time: "mar",
      online: false, unread: 0,
    },
    {
      id: "group", who: "Programa Lorgio → Juan", initials: "P3",
      role: "Lorgio · Juan · Andrea · 3 personas",
      preview: "Andrea: Confirmé asistencia para la sombra del jueves",
      time: "lun",
      online: false, unread: 0,
    },
  ];

  const { DecisionModal, ChatSettingsMenu } = window.LegacyModals;

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, mobileView]);

  const send = () => {
    if (!draft.trim()) return;
    const newMsg = { id: Date.now(), from: "out", who: "Lorgio", text: draft, time: new Date().toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" }) };
    setMessages(m => [...m, newMsg]);
    setDraft("");
    setTimeout(() => {
      setMessages(m => [...m, { id: Date.now() + 1, from: "in", who: "Juan", text: "Anotado. Le pregunto a Andrea si quiere unirse a la sombra del jueves.", time: new Date().toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" }) }]);
    }, 1800);
  };

  return (
    <div className="page session-page fade-in" style={{ paddingTop: 20 }} data-mobile-view={mobileView}>
      <div className="page-header session-header" style={{ marginBottom: 16 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Sesión activa · Módulo 3 · Sombra operativa</div>
          <h1 className="page-title" style={{ fontSize: 28 }}>Conversación con Juan Antelo</h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost" onClick={() => pushToast("Llamando a Juan Antelo…")}><Icon name="phone" size={14} /> Llamar</button>
          <button className="btn btn-gold" onClick={() => pushToast("Llamada de video iniciada (demo)")}>
            <Icon name="video" size={14} /> Video
          </button>
        </div>
      </div>

      <div className="session-grid">
        {/* INBOX — solo visible en mobile, oculto en desktop */}
        <div className="session-inbox card" data-pane="inbox">
          <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--line)" }}>
            <div className="serif" style={{ fontSize: 17, fontWeight: 500 }}>Mensajes</div>
            <div className="mono muted" style={{ fontSize: 11, marginTop: 2 }}>{conversations.filter(c => c.unread).length} sin leer · {conversations.length} conversaciones</div>
          </div>
          {conversations.map(c => (
            <button
              key={c.id}
              className={`inbox-item ${c.pinned ? "pinned" : ""}`}
              onClick={() => setMobileView("chat")}
              disabled={c.id !== "juan"}
            >
              <div className="inbox-avatar-wrap">
                <Avatar initials={c.initials} size="md" />
                {c.online && <span className="inbox-online"></span>}
              </div>
              <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                  <div className="inbox-name">{c.who}</div>
                  <div className="mono muted" style={{ fontSize: 10.5, flexShrink: 0 }}>{c.time}</div>
                </div>
                <div className="muted" style={{ fontSize: 11, marginTop: 1 }}>{c.role}</div>
                <div className="inbox-preview">{c.preview}</div>
              </div>
              {c.unread > 0 && <span className="inbox-unread">{c.unread}</span>}
              {c.pinned && !c.unread && <Icon name="star" size={12} color="var(--gold)" />}
            </button>
          ))}
        </div>

        {/* CHAT pane */}
        <div className="card session-chat" data-pane="chat" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Header */}
          <div className="session-chat-head" style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 12 }}>
            <button className="session-back" onClick={() => setMobileView("inbox")} aria-label="Volver al inbox">
              <Icon name="arrow-right" size={16} color="currentColor" />
            </button>
            <Avatar initials="JA" size="md" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 500, fontSize: 14 }}>Juan Antelo Méndez</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--ink-3)" }}>
                <span className="dot-status green"></span>
                <span>En línea · planta de FlexoCruz</span>
              </div>
            </div>
            <button className="icon-btn session-info-btn" onClick={() => setMobileView("info")} title="Info de la sesión"><Icon name="book" size={16} /></button>
            <button className="icon-btn" onClick={() => pushToast("Selector de archivo abierto")} title="Adjuntar archivo"><Icon name="paperclip" size={16} /></button>
            <button className="icon-btn" onClick={() => setMenuOpen(o => !o)} title="Ajustes"><Icon name="settings" size={16} /></button>
            {menuOpen && (
              <ChatSettingsMenu
                onClose={() => setMenuOpen(false)}
                onAction={(o) => {
                  setMenuOpen(false);
                  if (o.k === "mute") pushToast("Notificaciones silenciadas · 24h");
                  else if (o.k === "files") pushToast("Archivos compartidos · 7 documentos");
                  else if (o.k === "log") pushToast("Bitácora del módulo 3 abierta");
                  else if (o.k === "add-andrea") pushToast("Andrea Cuéllar invitada a la sesión");
                  else if (o.k === "urgent") pushToast("Conversación marcada como urgente");
                  else if (o.k === "close-session") pushToast("Sesión cerrada · reabrir en cualquier momento");
                }}
              />
            )}
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: 22, display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ alignSelf: "center", padding: "4px 12px", background: "var(--bg)", borderRadius: 12, fontSize: 11, color: "var(--ink-3)", fontFamily: "var(--mono)" }}>Hoy · 6 May 2026</div>
            {messages.map(m => (
              <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: m.from === "out" ? "flex-end" : "flex-start", gap: 4 }} className="fade-up">
                <div className={`chat-msg ${m.from}`}>{m.text}</div>
                <div className="mono" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>{m.who} · {m.time}</div>
              </div>
            ))}
          </div>

          {/* Composer */}
          <div style={{ padding: 14, borderTop: "1px solid var(--line)", display: "flex", gap: 8, alignItems: "flex-end" }}>
            <button className="icon-btn" onClick={() => pushToast("Selector de archivo abierto")} title="Adjuntar archivo"><Icon name="paperclip" size={16} /></button>
            <textarea
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Escribe a Juan…"
              rows={1}
              style={{ flex: 1, border: "1px solid var(--line-2)", borderRadius: 18, padding: "10px 14px", resize: "none", fontFamily: "var(--sans)", fontSize: 13.5, outline: "none", maxHeight: 100 }}
            />
            <button className="btn btn-primary" onClick={send} style={{ borderRadius: 18, padding: "10px 14px" }}>
              <Icon name="send" size={14} />
            </button>
          </div>
        </div>

        {/* INFO sidebar */}
        <div className="session-info" data-pane="info" style={{ display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
          {/* Mobile back header */}
          <button className="session-back-info" onClick={() => setMobileView("chat")}>
            <Icon name="arrow-right" size={16} color="currentColor" />
            <span>Volver al chat</span>
          </button>

          <div className="card card-pad">
            <div className="eyebrow">Sesión de hoy</div>
            <h4 className="serif" style={{ fontSize: 17, fontWeight: 500, margin: "8px 0 12px" }}>Cambio de mordaza · Línea 3</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--ink-2)" }}>
                <Icon name="clock" size={12} color="var(--gold-2)" /> 08:00 – 10:00 (en curso)
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--ink-2)" }}>
                <Icon name="users" size={12} color="var(--gold-2)" /> Lorgio · Juan · Andrea (RRHH)
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--ink-2)" }}>
                <Icon name="pin" size={12} color="var(--gold-2)" /> Planta FlexoCruz · turno mañana
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div className="serif" style={{ fontSize: 16, fontWeight: 500 }}>Decisiones registradas</div>
              <span className="mono muted" style={{ fontSize: 11 }}>{decisions.length} · módulo 3</span>
            </div>
            <div>
              {decisions.map((d, i) => (
                <div key={i} style={{ padding: "12px 18px", borderBottom: i < decisions.length - 1 ? "1px solid var(--line)" : "none", display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ marginTop: 2 }}>
                    {d.check
                      ? <Icon name="check-circle" size={14} color="var(--good)" />
                      : <Icon name="circle" size={14} color="var(--gold)" strokeWidth={1.8} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{d.t}</div>
                    <div className="mono muted" style={{ fontSize: 11, marginTop: 2 }}>{d.c}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: 14 }}>
              <button className="btn btn-ghost" style={{ width: "100%" }} onClick={() => setDecisionOpen(true)}>
                <Icon name="plus" size={14} /> Registrar decisión
              </button>
            </div>
          </div>

          <div className="card card-pad" style={{ background: "var(--bg-deep)", color: "var(--gold-soft)", borderColor: "var(--bg-deep)" }}>
            <div className="eyebrow" style={{ color: "var(--gold-soft)", opacity: 0.7 }}>Próxima sesión</div>
            <div className="serif" style={{ fontSize: 18, fontWeight: 500, margin: "8px 0", color: "#fff" }}>Jueves 8 · 14:00</div>
            <div style={{ fontSize: 12.5, opacity: 0.75, lineHeight: 1.5 }}>Sombra · Auditoría interna ISO 9001 con equipo de calidad. Andrea confirmará asistencia esta tarde.</div>
          </div>
        </div>
      </div>

      {decisionOpen && (
        <DecisionModal
          onClose={() => setDecisionOpen(false)}
          onSave={(form) => {
            setDecisions(d => [{ t: form.title, c: form.criterion || "criterio · " + form.severity, check: false }, ...d]);
            setDecisionOpen(false);
            pushToast(`Decisión "${form.title}" registrada en la bitácora`);
          }}
        />
      )}
    </div>
  );
};

window.Session = Session;
