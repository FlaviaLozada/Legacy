// UserAccountModal — datos personales completos del usuario logueado
const UserAccountModal = ({ persona, onClose, onSignOut, onEditProfile, pushToast }) => {
  const D = window.LegacyData;
  const u = D.USER_ACCOUNTS[persona];

  const sections = [
    {
      title: "Datos personales",
      rows: [
        { l: "Nombre completo", v: u.name },
        { l: "Fecha de nacimiento", v: u.dob },
        { l: "Documento", v: u.nationalId, mono: true },
        { l: "Idiomas", v: u.languages.join(" · ") },
      ],
    },
    {
      title: "Contacto",
      rows: [
        { l: "Correo electrónico", v: u.email, mono: true },
        { l: "Teléfono", v: u.phone, mono: true },
        { l: "Ubicación", v: u.location },
      ],
    },
    {
      title: "Cuenta profesional",
      rows: [
        { l: "Organización", v: u.company },
        { l: "Cargo / rol", v: u.position },
        { l: "En Legacy desde", v: u.yearsOnPlatform },
        { l: "Plan", v: u.plan },
      ],
    },
    {
      title: "Verificación y banca",
      rows: [
        { l: "Cuenta para liquidaciones", v: u.bank, mono: true },
        { l: "Estado de verificación", v: u.verified },
      ],
    },
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal user-modal" onClick={e => e.stopPropagation()}>
        <div className="user-modal-head">
          <button className="user-modal-close" onClick={onClose} aria-label="Cerrar"><Icon name="x" size={14} /></button>
          <div className="avatar xl">{u.initials}</div>
          <div className="user-modal-name">{u.name}</div>
          <div className="user-modal-role">{u.role}</div>
        </div>

        <div className="user-modal-body">
          {sections.map(s => (
            <div key={s.title} className="user-section">
              <div className="user-section-title">{s.title}</div>
              {s.rows.map(r => (
                <div key={r.l} className="user-row">
                  <div className="user-row-label">{r.l}</div>
                  <div className={`user-row-val ${r.mono ? "mono-val" : ""}`}>{r.v}</div>
                </div>
              ))}
            </div>
          ))}

          <div className="user-section">
            <div className="user-section-title">Privacidad</div>
            <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "flex-start" }} onClick={() => {
              const { downloadFile } = window.LegacyUtils;
              downloadFile(`legacy-mis-datos-${u.name.split(" ")[0].toLowerCase()}.json`, JSON.stringify({ exportedAt: new Date().toISOString(), platform: "Legacy", user: u }, null, 2), "application/json;charset=utf-8;");
              pushToast("Tus datos personales fueron descargados (JSON)");
            }}>
              <Icon name="paperclip" size={14} /> Descargar mis datos
            </button>
            <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "flex-start", marginTop: 6 }} onClick={() => onEditProfile && onEditProfile()}>
              <Icon name="settings" size={14} /> Editar información personal
            </button>
          </div>
        </div>

        <div className="user-modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cerrar</button>
          <button className="btn btn-primary" onClick={onSignOut} style={{ background: "var(--danger)", borderColor: "var(--danger)", color: "#fff" }}>
            <Icon name="arrow-right" size={14} /> Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

window.UserAccountModal = UserAccountModal;
