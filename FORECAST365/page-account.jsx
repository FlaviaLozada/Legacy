// Account — full page version of the user account (no modal).
// Same data as UserAccountModal but renders as a normal page so the sidebar stays visible.
const AccountPage = ({ persona, pushToast, onSignOut, onOpenEdit, onOpenMembership }) => {
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
        { l: "Tipo de cuenta", v:
          persona === "senior" ? "Senior · Modo 1 + 2" :
          persona === "empresa" ? "Empresa · administrador" :
          persona === "hr" ? "RRHH · administrador del plan" :
          "Sucesor · cuenta integrada"
        },
        { l: "Workspace", v:
          persona === "senior"  ? "Cuenta personal · sin organización vinculada" :
          persona === "empresa" ? "FlexoCruz S.A. · Plan Enterprise · 3 programas activos" :
          persona === "hr"      ? "FlexoCruz S.A. · Plan Enterprise · administrador" :
          "FlexoCruz S.A. · invitado al plan Enterprise"
        },
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

  const downloadJSON = () => {
    const { downloadFile } = window.LegacyUtils;
    downloadFile(
      `legacy-mis-datos-${u.name.split(" ")[0].toLowerCase()}.json`,
      JSON.stringify({ exportedAt: new Date().toISOString(), platform: "Legacy", user: u }, null, 2),
      "application/json;charset=utf-8;"
    );
    pushToast("Tus datos personales fueron descargados (JSON)");
  };

  return (
    <div className="page fade-in account-page">
      <div className="page-header">
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Mi cuenta</div>
          <h1 className="page-title">{u.name}</h1>
          <div className="page-sub">{u.role} · {u.position}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-ghost" onClick={downloadJSON}><Icon name="paperclip" size={14} /> Descargar mis datos</button>
          <button className="btn btn-primary" onClick={onOpenEdit}><Icon name="settings" size={14} /> Editar información</button>
        </div>
      </div>

      {/* Hero card */}
      <div className="card" style={{ overflow: "hidden", marginBottom: 24, display: "flex", flexDirection: "column" }}>
        <div className="account-cover">
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }} preserveAspectRatio="none" viewBox="0 0 800 140">
            <pattern id="acc-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="0.4" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#acc-grid)" />
          </svg>
        </div>
        <div className="account-hero-body">
          <div className="account-hero-avatar">
            <Avatar initials={u.initials} size="xl" />
          </div>
          <div style={{ flex: 1, minWidth: 0, paddingTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h2 className="serif" style={{ fontSize: 26, margin: 0, fontWeight: 500, letterSpacing: "-0.01em" }}>{u.name}</h2>
              <span className="badge"><Icon name="verified" size={11} color="var(--gold-2)" /> Cuenta verificada</span>
            </div>
            <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>{u.role}</div>
            <div style={{ display: "flex", gap: 18, marginTop: 10, fontSize: 12.5, color: "var(--ink-3)", flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><Icon name="pin" size={12} /> {u.location}</span>
              <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><Icon name="briefcase" size={12} /> {u.company}</span>
              <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><Icon name="clock" size={12} /> {u.yearsOnPlatform}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
        {/* Info sections */}
        <div className="card" style={{ padding: "8px 26px 16px" }}>
          {sections.map((s, idx) => (
            <div key={s.title} style={{ paddingTop: idx === 0 ? 12 : 20, paddingBottom: 4 }}>
              <div className="user-section-title" style={{ marginBottom: 10 }}>{s.title}</div>
              {s.rows.map(r => (
                <div key={r.l} className="user-row">
                  <div className="user-row-label">{r.l}</div>
                  <div className={`user-row-val ${r.mono ? "mono-val" : ""}`}>{r.v}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Plan card */}
          <div className="card card-pad" style={{ background: "var(--gold-tint)", borderColor: "var(--gold-soft)" }}>
            <div className="eyebrow gold">Tu plan</div>
            <h3 className="serif" style={{ fontSize: 22, fontWeight: 500, margin: "8px 0 4px" }}>{u.plan.split(" · ")[0]}</h3>
            <div className="muted" style={{ fontSize: 13 }}>{u.plan.split(" · ")[1] || "Activa"}</div>
            <div className="gold-rule"></div>
            <button className="btn btn-primary" style={{ width: "100%" }} onClick={onOpenMembership}>
              Gestionar membresía →
            </button>
          </div>

          {/* Security */}
          <div className="card card-pad">
            <div className="user-section-title" style={{ marginBottom: 12 }}>Seguridad</div>
            <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "flex-start", marginBottom: 6 }} onClick={() => pushToast("Cambio de contraseña enviado por correo")}>
              <Icon name="settings" size={14} /> Cambiar contraseña
            </button>
            <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "flex-start", marginBottom: 6 }} onClick={() => pushToast("2FA activado · usa tu app de autenticación")}>
              <Icon name="verified" size={14} /> Activar 2FA
            </button>
            <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "flex-start" }} onClick={() => pushToast("Sesiones activas: 1 (esta)")}>
              <Icon name="users" size={14} /> Sesiones activas
            </button>
          </div>

          {/* Danger zone */}
          <div className="card card-pad" style={{ borderColor: "rgba(164,69,58,0.25)" }}>
            <div className="user-section-title" style={{ color: "var(--danger)", marginBottom: 12 }}>Zona crítica</div>
            <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "flex-start", color: "var(--danger)", borderColor: "rgba(164,69,58,0.3)" }} onClick={onSignOut}>
              <Icon name="arrow-right" size={14} /> Cerrar sesión
            </button>
            <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "flex-start", marginTop: 6, color: "var(--ink-3)" }} onClick={() => pushToast("Solicitud de eliminación · contactaremos para confirmar")}>
              <Icon name="x" size={14} /> Eliminar cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

window.AccountPage = AccountPage;
