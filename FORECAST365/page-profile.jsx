// Senior public profile
const Profile = ({ seniorId = "lorgio", persona, pushToast }) => {
  const D = window.LegacyData;
  const s = D.SENIORS[seniorId] || D.SENIORS.lorgio;
  const [tab, setTab] = React.useState("Trayectoria");
  const [schedOpen, setSchedOpen] = React.useState(false);
  const [contactOpen, setContactOpen] = React.useState(false);
  const [callsInboxOpen, setCallsInboxOpen] = React.useState(false);
  const [msgsInboxOpen, setMsgsInboxOpen] = React.useState(false);
  const { ScheduleCallModal, ContactMentorModal } = window.LegacyModals;

  // Si Lorgio (senior) está viendo su propio perfil, mostramos su bandeja entrante
  // en lugar de los formularios de agendar/contactar.
  const isOwn = persona === "senior" && (seniorId === "lorgio" || !seniorId);
  const D2 = window.LegacyData;
  const pendingCalls = (D2.INCOMING_CALL_REQUESTS || []).filter(r => r.status === "pending").length;
  const unreadMsgs  = (D2.INCOMING_MESSAGES      || []).filter(m => m.unread).length;

  return (
    <div className="page fade-in" style={{ maxWidth: 1100 }}>
      <div className="eyebrow" style={{ marginBottom: 10 }}>Perfil público · Mentor verificado</div>

      {/* Hero */}
      <div className="card profile-hero" style={{ overflow: "hidden", marginBottom: 24 }}>
        <div className="profile-hero-cover">
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.14 }} preserveAspectRatio="none" viewBox="0 0 800 160">
            <pattern id="cross" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M12 0v24M0 12h24" stroke="var(--gold-soft)" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#cross)" />
          </svg>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(14,26,43,0.4) 100%)" }}></div>
        </div>
        <div className="profile-hero-body">
          <div className="profile-hero-avatar">
            <Avatar initials={s.photo} size="xl" />
          </div>
          <div className="profile-hero-info">
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h1 className="serif" style={{ fontSize: 32, margin: 0, fontWeight: 500, letterSpacing: "-0.01em" }}>{s.name}</h1>
              <span className="badge"><Icon name="verified" size={11} color="var(--gold-2)" /> Verificado</span>
            </div>
            <div style={{ color: "var(--ink-2)", fontSize: 14, marginTop: 4 }}>{s.title} · <span className="muted">{s.company}</span></div>
            <div style={{ display: "flex", gap: 18, marginTop: 12, fontSize: 12, color: "var(--ink-3)", flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}><Icon name="pin" size={12} /> {s.location}</span>
              <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}><Icon name="briefcase" size={12} /> {s.yearsExp} años de experiencia</span>
              <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}><Icon name="clock" size={12} /> {s.available}</span>
            </div>
          </div>
          <div className="profile-hero-actions">
            {isOwn ? (
              <>
                <button className="btn btn-ghost" onClick={() => setCallsInboxOpen(true)}>
                  <Icon name="calendar" size={14} /> Solicitudes de llamada
                  {pendingCalls > 0 && <span className="mono" style={{ background: "var(--gold)", color: "#fff", padding: "1px 7px", borderRadius: 10, fontSize: 11, marginLeft: 4 }}>{pendingCalls}</span>}
                </button>
                <button className="btn btn-primary" onClick={() => setMsgsInboxOpen(true)}>
                  <Icon name="bell" size={14} /> Mensajes recibidos
                  {unreadMsgs > 0 && <span className="mono" style={{ background: "var(--gold-soft)", color: "var(--bg-deep)", padding: "1px 7px", borderRadius: 10, fontSize: 11, marginLeft: 4 }}>{unreadMsgs}</span>}
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-ghost" onClick={() => setSchedOpen(true)}><Icon name="phone" size={14} /> Agendar llamada</button>
                <button className="btn btn-primary" onClick={() => setContactOpen(true)}>Contactar mentor</button>
              </>
            )}
          </div>
        </div>

        {/* Stat strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid var(--line)" }}>
          {[
            { l: "Tarifa", v: s.rate },
            { l: "Reputación", v: <Stars value={s.rating} /> },
            { l: "Sesiones", v: s.sessions || "—" },
            { l: "Idiomas", v: s.languages.join(" · ") },
          ].map((x, i) => (
            <div key={i} style={{ padding: 18, borderRight: i < 3 ? "1px solid var(--line)" : "none" }}>
              <div className="mono muted" style={{ fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase" }}>{x.l}</div>
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 6, fontFamily: "var(--mono)" }}>{x.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 24, borderBottom: "1px solid var(--line)", marginBottom: 24 }}>
        {["Trayectoria", "Expertise", "Testimonios", "Disponibilidad"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "12px 0",
              border: "none",
              background: "transparent",
              borderBottom: tab === t ? "2px solid var(--gold)" : "2px solid transparent",
              color: tab === t ? "var(--ink)" : "var(--ink-3)",
              fontFamily: "var(--sans)",
              fontSize: 13.5,
              fontWeight: tab === t ? 600 : 400,
              cursor: "pointer",
            }}
          >{t}</button>
        ))}
      </div>

      <div className="fade-in" key={tab}>
        {tab === "Trayectoria" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 24 }}>
            <div>
              <h3 className="serif" style={{ fontSize: 20, fontWeight: 500, marginTop: 0 }}>Sobre Lorgio</h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-2)", maxWidth: "60ch" }}>{s.bio}</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink-2)", maxWidth: "60ch" }}>
                Su trabajo ha sido reconocido por la <em>Cámara de Industria, Comercio, Servicios y Turismo de Santa Cruz (CAINCO)</em> en dos ocasiones por su contribución a la productividad sectorial. Hoy busca compartir lo aprendido con la próxima generación de líderes industriales del oriente boliviano.
              </p>

              <h3 className="serif" style={{ fontSize: 20, fontWeight: 500, marginTop: 28 }}>Hitos profesionales</h3>
              <div style={{ position: "relative", paddingLeft: 24, marginTop: 16 }}>
                <div style={{ position: "absolute", left: 7, top: 8, bottom: 8, width: 1, background: "var(--line-2)" }}></div>
                {[
                  { y: "1986", t: "Ingreso a FlexoCruz como Supervisor de turno" },
                  { y: "1994", t: "Ascenso a Jefe de Producción · Línea de extrusión" },
                  { y: "2003", t: "Liderazgo de la certificación ISO 9001:2000" },
                  { y: "2011", t: "Gerente de Producción · 320 personas a cargo" },
                  { y: "2019", t: "Implementación de Lean — reducción 18% mermas" },
                  { y: "2026", t: "Inicia traspaso a Juan Antelo · Consultor interno", active: true },
                ].map((h, i) => (
                  <div key={i} style={{ position: "relative", paddingBottom: 18 }}>
                    <div style={{ position: "absolute", left: -22, top: 4, width: 9, height: 9, borderRadius: "50%", background: h.active ? "var(--gold)" : "var(--line-2)", border: h.active ? "2px solid var(--gold-tint)" : "none" }}></div>
                    <div className="mono" style={{ fontSize: 11, color: "var(--gold-2)", letterSpacing: "0.08em" }}>{h.y}</div>
                    <div style={{ fontSize: 13.5, color: h.active ? "var(--ink)" : "var(--ink-2)", fontWeight: h.active ? 500 : 400, marginTop: 2 }}>{h.t}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="card card-pad">
                <div className="eyebrow">Compromiso actual</div>
                <h4 className="serif" style={{ fontSize: 18, fontWeight: 500, margin: "8px 0 12px" }}>Modo 1 · Transferencia interna</h4>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <Avatar initials="JA" size="sm" />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>Juan Antelo Méndez</div>
                    <div className="muted" style={{ fontSize: 11 }}>Sucesor designado · FlexoCruz</div>
                  </div>
                </div>
                <div className="progress"><div className="progress-bar" style={{ width: "48%" }}></div></div>
                <div className="mono muted" style={{ fontSize: 11, marginTop: 6 }}>Mes 3 de 6 · 48% completado</div>
              </div>

              <div className="card card-pad" style={{ marginTop: 16 }}>
                <div className="eyebrow">Sectores donde puede aportar</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                  {["Empaques flexibles", "Manufactura general", "Plásticos", "Conversión", "Calidad ISO"].map(t => (
                    <span key={t} className="chip" style={{ cursor: "default" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "Expertise" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {s.expertise.map((e, i) => (
              <div key={e} className="card card-pad" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 15 }}>{e}</div>
                  <Stars value={5 - i * 0.1} size={11} />
                </div>
                <span className="badge">Experto</span>
              </div>
            ))}
          </div>
        )}

        {tab === "Testimonios" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {[
              { who: "Andrea Cuéllar", role: "Gerente RRHH · FlexoCruz", quote: "Lorgio no se llevó cuarenta años de conocimiento. Los está dejando ordenados en la empresa, y eso vale más que cualquier capacitación externa que hayamos pagado." },
              { who: "Pablo Salvatierra", role: "CEO · FlexoCruz", quote: "El programa de Legacy convirtió lo que iba a ser una despedida en un activo. Juan está más preparado de lo que estaríamos sin esto." },
              { who: "Juan Antelo", role: "Sucesor · Jefe de Planta", quote: "Lorgio me enseña no solo qué hacer, sino por qué. Eso no estaba en ningún manual." },
              { who: "Equipo de turno · Línea 3", role: "Operarios", quote: "Don Lorgio sigue presente. Saber que está acompañando al nuevo gerente nos da tranquilidad." },
            ].map((t, i) => (
              <div key={i} className="card card-pad">
                <div style={{ fontFamily: "var(--serif)", fontSize: 38, color: "var(--gold)", lineHeight: 0.5, marginBottom: 8 }}>"</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--ink-2)", margin: "0 0 16px", fontStyle: "italic" }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar initials={t.who.split(" ").map(x => x[0]).slice(0,2).join("")} size="sm" />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{t.who}</div>
                    <div className="muted" style={{ fontSize: 11 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Disponibilidad" && (
          <div className="card card-pad">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 18 }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: 6 }}>Calendario · Mayo 2026</div>
                <h3 className="serif" style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>Disponibilidad de {s.name.split(" ")[0]}</h3>
                <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>{s.available}</div>
              </div>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ display: "flex", gap: 12, fontSize: 12 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: "var(--gold-tint)", border: "1px solid var(--gold-soft)" }}></span>
                    Disponible
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: "var(--bg-deep)" }}></span>
                    Reservado
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: "var(--bg)", border: "1px solid var(--line)" }}></span>
                    No disponible
                  </span>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button className="icon-btn" onClick={() => pushToast("Abril 2026")} aria-label="Mes anterior" style={{ transform: "rotate(180deg)" }}><Icon name="arrow-right" size={14} /></button>
                  <button className="icon-btn" onClick={() => pushToast("Junio 2026")} aria-label="Mes siguiente"><Icon name="arrow-right" size={14} /></button>
                </div>
              </div>
            </div>

            <div className="calendar">
              <div className="calendar-head">
                {["L", "M", "X", "J", "V", "S", "D"].map(d => (
                  <div key={d} className="calendar-dow">{d}</div>
                ))}
              </div>
              <div className="calendar-grid">
                {Array.from({ length: 31 }, (_, i) => {
                  const d = i + 1;
                  // May 2026: 1 May = Friday (ISO: Fri=4). Mon-first => offset for first row
                  const dayOfWeek = (i + 4) % 7;     // 0=L, 6=D
                  const isWeekend = dayOfWeek >= 5;
                  const isAvailable = !isWeekend && [4,5,6,7,11,12,13,14,18,19,20,21,25,26,27,28].includes(d);
                  const bookedMap = {
                    8:  { who: "Juan",    label: "Sombra L\u00ednea 3", time: "14:00" },
                    12: { who: "Juan",    label: "Revisi\u00f3n con Andrea", time: "09:00" },
                    15: { who: "Auditor", label: "Auditor\u00eda ISO",       time: "14:00" },
                    22: { who: "Andrea",  label: "Sesi\u00f3n RSE",           time: "10:00" },
                  };
                  const booked = bookedMap[d];
                  const isToday = d === 6;
                  return (
                    <button
                      key={d}
                      className={`calendar-cell ${booked ? "booked" : isAvailable ? "available" : "off"} ${isToday ? "today" : ""}`}
                      onClick={() => {
                        if (booked) pushToast(`Reserva: ${booked.label} · ${booked.time}`);
                        else if (isAvailable) pushToast(`Slot solicitado · ${d} may`);
                      }}
                      disabled={!isAvailable && !booked}
                    >
                      <span className="calendar-day">{d}</span>
                      {booked && (
                        <span className="calendar-event">
                          <span className="calendar-event-time">{booked.time}</span>
                          <span className="calendar-event-label">{booked.label}</span>
                        </span>
                      )}
                      {isAvailable && !booked && <span className="calendar-dot"></span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="divider"></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div className="muted" style={{ fontSize: 13 }}>
                <strong>{s.name.split(" ")[0]}</strong> tiene 16 horas disponibles este mes · 4 sesiones agendadas
              </div>
              <button className="btn btn-primary" onClick={() => pushToast("Reserva enviada · esperando confirmación")}>
                Reservar disponibilidad →
              </button>
            </div>
          </div>
        )}
      </div>

      {schedOpen && <ScheduleCallModal onClose={() => setSchedOpen(false)} target={s.name} pushToast={pushToast} />}
      {contactOpen && <ContactMentorModal onClose={() => setContactOpen(false)} target={s.name} pushToast={pushToast} />}
      {callsInboxOpen && <window.IncomingCallsModal onClose={() => setCallsInboxOpen(false)} pushToast={pushToast} />}
      {msgsInboxOpen && <window.IncomingMessagesModal onClose={() => setMsgsInboxOpen(false)} pushToast={pushToast} />}
    </div>
  );
};

window.Profile = Profile;
