// Main app shell — stages (landing / auth / app) + sidebar nav + page router + tweaks panel
const { useState: useStateApp, useEffect: useEffectApp } = React;

const STORAGE_KEY = "legacy.session.v1";

const App = () => {
  // Tweaks (visual prefs only)
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "density": "comfortable",
    "palette": "heritage",
    "showMobile": false
  }/*EDITMODE-END*/;

  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Session
  const stored = (() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch { return null; }
  })();
  const [stage, setStage] = useStateApp("landing"); // always start at landing
  const [authMode, setAuthMode] = useStateApp("login");
  const [authInitialRole, setAuthInitialRole] = useStateApp("senior");
  const [persona, setPersona] = useStateApp(stored?.persona || "senior"); // 'senior' | 'empresa' | 'hr' | 'sucesor'

  // App-internal nav
  const initialPage = (() => {
    if (persona === "senior") return "dashboard";
    return "dashboard";
  })();
  const [page, setPage] = useStateApp(initialPage);
  const [profileId, setProfileId] = useStateApp("lorgio");
  const [toasts, setToasts] = useStateApp([]);
  const [navOpen, setNavOpen] = useStateApp(false);
  const [userModalOpen, setUserModalOpen] = useStateApp(false);
  const [editProfileOpen, setEditProfileOpen] = useStateApp(false);
  const [topbarPop, setTopbarPop] = useStateApp(null); // 'cal' | 'notif' | 'settings' | null
  const [membershipOpen, setMembershipOpen] = useStateApp(false);

  // Persist session
  useEffectApp(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ stage, persona }));
  }, [stage, persona]);

  // Apply density + palette to root
  useEffectApp(() => {
    document.documentElement.setAttribute("data-density", t.density);
    document.documentElement.setAttribute("data-palette", t.palette);
  }, [t.density, t.palette]);

  // Close drawer / reset page on persona change
  useEffectApp(() => {
    setPage("dashboard");
    setNavOpen(false);
  }, [persona]);

  // Close drawer on page change
  useEffectApp(() => { setNavOpen(false); }, [page]);

  const pushToast = (text) => {
    const id = Date.now() + Math.random();
    setToasts(arr => [...arr, { id, text }]);
    setTimeout(() => setToasts(arr => arr.filter(x => x.id !== id)), 3200);
  };

  // ============================================================
  // STAGE: landing
  // ============================================================
  if (stage === "landing") {
    return (
      <>
        <Landing
          onSignIn={() => { setAuthMode("login"); setStage("auth"); }}
          onSignUp={(role) => {
            setAuthMode("register");
            if (role && typeof role === "string") setAuthInitialRole(role);
            setStage("auth");
          }}
        />
        <div className="toast-stack">
          {toasts.map(x => <Toast key={x.id}>{x.text}</Toast>)}
        </div>
      </>
    );
  }

  // ============================================================
  // STAGE: auth
  // ============================================================
  if (stage === "auth") {
    return (
      <>
        <Auth
          mode={authMode}
          initialRole={authInitialRole}
          onSignIn={(role) => { setPersona(role); setStage("app"); pushToast(`Bienvenido · sesión iniciada como ${role.toUpperCase()}`); }}
          onBackToLanding={() => setStage("landing")}
        />
        <div className="toast-stack">
          {toasts.map(x => <Toast key={x.id}>{x.text}</Toast>)}
        </div>
      </>
    );
  }

  // ============================================================
  // STAGE: app
  // ============================================================
  const PERSONA_LABEL = {
    senior:  { name: "Lorgio Saucedo", role: "Consultor Senior",     initials: "LS", email: "lorgio@flexocruz.bo" },
    empresa: { name: "Pablo Salvatierra", role: "CEO · FlexoCruz",   initials: "PS", email: "p.salvatierra@flexocruz.bo" },
    hr:      { name: "Andrea Cuéllar", role: "Gerente RRHH · FlexoCruz", initials: "AC", email: "a.cuellar@flexocruz.bo" },
    sucesor: { name: "Juan Antelo",    role: "Sucesor · Jefe de Planta",  initials: "JA", email: "j.antelo@flexocruz.bo" },
  };
  const me = PERSONA_LABEL[persona];

  const NAV = {
    senior: [
      { section: "Trabajo" },
      { id: "dashboard", icon: "home", label: "Inicio" },
      { id: "transfer", icon: "transfer", label: "Programa con Juan", badge: "M3" },
      { id: "session", icon: "chat", label: "Sesiones", badge: 2 },
      { section: "Crecer" },
      { id: "market", icon: "market", label: "Oportunidades", badge: 6 },
      { id: "profile", icon: "profile", label: "Mi perfil público" },
      { section: "Cuenta" },
      { id: "billing", icon: "billing", label: "Honorarios" },
    ],
    empresa: [
      { section: "Dirección" },
      { id: "dashboard", icon: "home", label: "Resumen ejecutivo" },
      { id: "programs", icon: "transfer", label: "Programas", badge: 3 },
      { id: "pipeline", icon: "trending", label: "Pipeline de sucesión", badge: "4" },
      { section: "Talento" },
      { id: "market", icon: "market", label: "Buscar mentores" },
      { id: "employees", icon: "users", label: "Empleados", badge: 28 },
      { section: "Reportes" },
      { id: "billing", icon: "billing", label: "Facturación" },
    ],
    hr: [
      { section: "Programas" },
      { id: "dashboard", icon: "home", label: "Resumen RRHH" },
      { id: "transfer", icon: "transfer", label: "Lorgio → Juan", badge: "48%" },
      { section: "Marketplace" },
      { id: "market", icon: "market", label: "Buscar mentor" },
      { id: "employees", icon: "users", label: "Empleados", badge: 28 },
      { section: "Cuenta" },
      { id: "billing", icon: "billing", label: "Facturación" },
    ],
    sucesor: [
      { section: "Mi programa" },
      { id: "dashboard", icon: "home", label: "Inicio" },
      { id: "transfer", icon: "transfer", label: "Programa con Lorgio" },
      { id: "session", icon: "chat", label: "Sesiones", badge: 1 },
      { section: "Aprender" },
      { id: "market", icon: "market", label: "Catálogo de seniors" },
      { id: "profile", icon: "profile", label: "Perfil del mentor" },
    ],
  };

  const renderPage = () => {
    if (page === "dashboard") {
      if (persona === "senior")  return <SeniorDashboard onNavigate={setPage} pushToast={pushToast} />;
      if (persona === "empresa") return <EmpresaDashboard onNavigate={setPage} pushToast={pushToast} />;
      if (persona === "hr")      return <HRDashboard onNavigate={setPage} pushToast={pushToast} />;
      if (persona === "sucesor") return <SuccessorDashboard onNavigate={setPage} pushToast={pushToast} />;
    }
    if (page === "transfer" || page === "programs" || page === "pipeline") return <TransferProgram persona={persona} pushToast={pushToast} />;
    if (page === "market")  {
      // Senior sees Opportunities, others see Marketplace (mentors catalog)
      if (persona === "senior") return <Opportunities persona={persona} pushToast={pushToast} />;
      return <Marketplace persona={persona} pushToast={pushToast} onOpenProfile={(id) => { setProfileId(id); setPage("profile"); }} />;
    }
    if (page === "profile")  return <Profile seniorId={profileId} persona={persona} pushToast={pushToast} />;
    if (page === "session")  return <Session persona={persona} pushToast={pushToast} />;
    if (page === "billing")  return <Billing persona={persona} pushToast={pushToast} />;
    if (page === "account")  return <AccountPage persona={persona} pushToast={pushToast} onSignOut={signOut} onOpenEdit={() => setEditProfileOpen(true)} onOpenMembership={() => setMembershipOpen(true)} />;
    if (page === "employees") return <EmployeesPage persona={persona} pushToast={pushToast} />;
    return null;
  };

  const signOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    setStage("landing");
    setPage("dashboard");
  };

  return (
    <div className="app" data-screen-label="App" data-mobile-nav={navOpen ? "open" : "closed"}>
      <div className="sidebar-backdrop" onClick={() => setNavOpen(false)}></div>
      <aside className="sidebar">
        <div className="brand" onClick={() => setStage("landing")} style={{ cursor: "pointer" }}>
          <img src="/Logo-1.png" alt="Legacy" className="brand-mark" />
        </div>

        {NAV[persona].map((n, i) => {
          if (n.section) return <div key={`s-${i}`} className="nav-section-label">{n.section}</div>;
          return (
            <div
              key={n.id}
              className={`nav-item ${page === n.id ? "active" : ""}`}
              onClick={() => setPage(n.id)}
            >
              <Icon name={n.icon} size={15} />
              <span>{n.label}</span>
              {n.badge != null && <span className="nav-badge">{n.badge}</span>}
            </div>
          );
        })}

        <div className="persona-card clickable" onClick={() => setPage("account")}>
          <div className="persona-avatar">{me.initials}</div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div className="persona-name" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{me.name}</div>
            <div className="persona-role" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{me.role}</div>
          </div>
          <button className="persona-signout" onClick={(e) => { e.stopPropagation(); signOut(); }} title="Cerrar sesión" aria-label="Cerrar sesión">
            <Icon name="arrow-right" size={14} color="rgba(232,217,184,0.7)" />
          </button>
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <button
            className="menu-btn"
            aria-label="Abrir menú"
            onClick={() => setNavOpen(o => !o)}
          >
            <span className="bars"><span></span><span></span><span></span></span>
          </button>
          {page === "market" && persona === "senior" && (
            <div className="topbar-search">
              <Icon name="search" size={14} color="var(--ink-3)" />
              <input placeholder="Buscar oportunidades, empresas, contactos…" />
              <span className="mono muted" style={{ fontSize: 10.5, padding: "2px 6px", border: "1px solid var(--line)", borderRadius: 3 }}>⌘K</span>
            </div>
          )}
          <div className="topbar-actions">
            <div style={{ position: "relative" }}>
              <button className="icon-btn" title="Calendario" onClick={() => setTopbarPop(p => p === "cal" ? null : "cal")} style={topbarPop === "cal" ? { background: "var(--bg-elev)", borderColor: "var(--line)" } : null}><Icon name="calendar" size={16} /></button>
              {topbarPop === "cal" && <CalendarPopover onClose={() => setTopbarPop(null)} pushToast={pushToast} />}
            </div>
            <div style={{ position: "relative" }}>
              <button className="icon-btn" title="Notificaciones" onClick={() => setTopbarPop(p => p === "notif" ? null : "notif")} style={topbarPop === "notif" ? { background: "var(--bg-elev)", borderColor: "var(--line)" } : null}><Icon name="bell" size={16} /><span className="dot"></span></button>
              {topbarPop === "notif" && <NotificationsPopover onClose={() => setTopbarPop(null)} pushToast={pushToast} />}
            </div>
            <div style={{ position: "relative" }}>
              <button className="icon-btn" title="Ajustes" onClick={() => setTopbarPop(p => p === "settings" ? null : "settings")} style={topbarPop === "settings" ? { background: "var(--bg-elev)", borderColor: "var(--line)" } : null}><Icon name="settings" size={16} /></button>
              {topbarPop === "settings" && <SettingsPopover onClose={() => setTopbarPop(null)} persona={persona} pushToast={pushToast} onOpenAccount={() => setPage("account")} onSignOut={signOut} />}
            </div>
            <div style={{ width: 1, height: 24, background: "var(--line)", margin: "0 4px" }}></div>
            <button
              onClick={() => setPage("account")}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 12px 4px 4px", borderRadius: 20, background: "var(--bg-elev)", border: "1px solid var(--line)", cursor: "pointer", fontFamily: "var(--sans)" }}
              title="Mi cuenta"
            >
              <Avatar initials={me.initials} size="sm" />
              <div style={{ fontSize: 12.5, fontWeight: 500 }}>{me.name.split(" ")[0]}</div>
            </button>
          </div>
        </div>

        <div key={`${persona}-${page}`}>{renderPage()}</div>
      </main>

      {/* Mobile companion floats over Senior dashboard only */}
      {persona === "senior" && page === "dashboard" && t.showMobile && <MobileCompanion />}

      {/* User account modal (legacy popup path) */}
      {userModalOpen && (
        <UserAccountModal
          persona={persona}
          onClose={() => setUserModalOpen(false)}
          onSignOut={() => { setUserModalOpen(false); signOut(); }}
          onEditProfile={() => { setUserModalOpen(false); setEditProfileOpen(true); }}
          pushToast={pushToast}
        />
      )}
      {editProfileOpen && (
        <EditProfileModal
          persona={persona}
          onClose={() => setEditProfileOpen(false)}
          pushToast={pushToast}
        />
      )}
      {membershipOpen && (
        <MembershipModal
          persona={persona}
          onClose={() => setMembershipOpen(false)}
          pushToast={pushToast}
        />
      )}

      {/* Toasts */}
      <div className="toast-stack">
        {toasts.map(x => <Toast key={x.id}>{x.text}</Toast>)}
      </div>

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Cambiar de rol (demo)">
          <TweakRadio
            value={persona}
            onChange={v => setPersona(v)}
            options={[
              { value: "senior", label: "Senior" },
              { value: "empresa", label: "Empresa" },
              { value: "hr", label: "RRHH" },
              { value: "sucesor", label: "Sucesor" },
            ]}
          />
          <div className="mono muted" style={{ fontSize: 10.5, marginTop: 8, lineHeight: 1.4 }}>
            {persona === "senior"  && "Lorgio Saucedo · 64 · Gerente Producción FlexoCruz"}
            {persona === "empresa" && "Pablo Salvatierra · CEO FlexoCruz · vista ejecutiva"}
            {persona === "hr"      && "Andrea Cuéllar · Gerente RRHH FlexoCruz"}
            {persona === "sucesor" && "Juan Antelo · Sucesor · Jefe de Planta"}
          </div>
        </TweakSection>

        <TweakSection label="Densidad">
          <TweakRadio
            value={t.density}
            onChange={v => setTweak("density", v)}
            options={[
              { value: "comfortable", label: "Confortable" },
              { value: "compact", label: "Compacta" },
            ]}
          />
        </TweakSection>

        <TweakSection label="Paleta">
          <TweakRadio
            value={t.palette}
            onChange={v => setTweak("palette", v)}
            options={[
              { value: "heritage", label: "Heritage" },
              { value: "cobre", label: "Cobre" },
              { value: "bosque", label: "Bosque" },
            ]}
          />
        </TweakSection>

        {persona === "senior" && (
          <TweakSection label="App móvil">
            <TweakToggle
              checked={t.showMobile}
              onChange={v => setTweak("showMobile", v)}
              label="Mostrar mockup"
            />
          </TweakSection>
        )}

        <TweakSection label="Sesión">
          <TweakButton label="Cerrar sesión" onClick={signOut} secondary />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
