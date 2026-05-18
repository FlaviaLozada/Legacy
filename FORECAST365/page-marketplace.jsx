// Marketplace — mentor browsing for HR / Empresa / Senior
// Versión profesional: KPIs, recomendaciones inteligentes, filtros avanzados,
// shortlist persistente, vista organigrama + catálogo.
const Marketplace = ({ persona, pushToast, onOpenProfile }) => {
  const D = window.LegacyData;
  const seniors = Object.values(D.SENIORS);
  const pipeline = D.RETIREMENT_PIPELINE || [];

  // Datos demo enriquecidos por mentor (response time, etc.)
  const enrich = (s) => {
    const seed = (s.id || "").charCodeAt(0);
    const responseHours = [2, 6, 8, 12, 4, 3][seed % 6];
    const lastSeen = ["hoy", "hace 3 h", "ayer", "hace 2 días", "hoy", "esta semana"][seed % 6];
    const nextAvailable = ["Esta semana", "Próxima semana", "Lun 19 May", "Mié 21 May", "A demanda"][seed % 5];
    return { ...s, responseHours, lastSeen, nextAvailable };
  };
  const enriched = React.useMemo(() => seniors.map(enrich), [seniors]);

  // Filtros y vista
  const [filter, setFilter] = React.useState("Todos");
  const [sectorFilter, setSectorFilter] = React.useState("Todos");
  const [sort, setSort] = React.useState("relevance");
  const [query, setQuery] = React.useState("");
  const [view, setView] = React.useState(persona === "senior" ? "grid" : "chart");
  const [publishOpen, setPublishOpen] = React.useState(false);

  // Shortlist persistente
  const [shortlist, setShortlist] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem("legacy.shortlist.v1") || "[]"); } catch { return []; }
  });
  const toggleShortlist = (id) => {
    const next = shortlist.includes(id) ? shortlist.filter(x => x !== id) : [...shortlist, id];
    setShortlist(next);
    localStorage.setItem("legacy.shortlist.v1", JSON.stringify(next));
    pushToast(shortlist.includes(id) ? "Removido de tu lista corta" : "Añadido a tu lista corta");
  };
  const [compareOpen, setCompareOpen] = React.useState(false);

  // Búsquedas publicadas
  const [mySearches, setMySearches] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem("legacy.searches.v1") || "[]"); } catch { return []; }
  });
  React.useEffect(() => {
    const handler = () => {
      try { setMySearches(JSON.parse(localStorage.getItem("legacy.searches.v1") || "[]")); } catch { setMySearches([]); }
    };
    window.addEventListener("legacy:searches-updated", handler);
    return () => window.removeEventListener("legacy:searches-updated", handler);
  }, []);
  const deleteSearch = (id) => {
    const next = mySearches.filter(s => s.id !== id);
    localStorage.setItem("legacy.searches.v1", JSON.stringify(next));
    setMySearches(next);
    pushToast("Búsqueda eliminada");
  };

  const sectors = ["Todos", ...Array.from(new Set(seniors.map(s => s.sector)))];

  const baseFiltered = enriched.filter(s => {
    if (filter === "Disponibles" && s.status !== "marketplace") return false;
    if (filter === "Premium" && !s.premium) return false;
    if (filter === "Mi lista corta" && !shortlist.includes(s.id)) return false;
    if (sectorFilter !== "Todos" && s.sector !== sectorFilter) return false;
    if (query) {
      const q = query.toLowerCase();
      if (![s.name, s.title, s.company, s.bio, ...(s.expertise || [])].some(x => (x || "").toLowerCase().includes(q))) return false;
    }
    return true;
  });

  const filtered = React.useMemo(() => {
    const arr = [...baseFiltered];
    if (sort === "rating") arr.sort((a, b) => b.rating - a.rating);
    else if (sort === "rate-asc") arr.sort((a, b) => parseInt(a.rate.replace(/\D/g, "")) - parseInt(b.rate.replace(/\D/g, "")));
    else if (sort === "rate-desc") arr.sort((a, b) => parseInt(b.rate.replace(/\D/g, "")) - parseInt(a.rate.replace(/\D/g, "")));
    else if (sort === "exp") arr.sort((a, b) => b.yearsExp - a.yearsExp);
    else if (sort === "response") arr.sort((a, b) => a.responseHours - b.responseHours);
    return arr;
  }, [baseFiltered, sort]);

  // Recomendados según pipeline de FlexoCruz (cargos sin sucesor)
  const recommended = React.useMemo(() => {
    if (persona === "senior") return [];
    const gaps = pipeline.filter(p => p.status.includes("Sin sucesor"));
    return gaps.map(gap => {
      // Match heurístico simple
      let pick;
      const areaLow = gap.area.toLowerCase();
      if (areaLow.includes("manten")) pick = enriched.find(s => s.id === "enrique");
      else if (areaLow.includes("calidad")) pick = enriched.find(s => s.id === "carlos"); // operaciones, mejor que nada
      else if (areaLow.includes("financ")) pick = enriched.find(s => s.id === "raul");
      else if (areaLow.includes("comerc")) pick = enriched.find(s => s.id === "martha");
      return pick ? { gap, mentor: pick } : null;
    }).filter(Boolean);
  }, [enriched, pipeline, persona]);

  const stats = {
    total: enriched.length,
    available: enriched.filter(s => s.status === "marketplace").length,
    premium: enriched.filter(s => s.premium).length,
    avgResponse: Math.round(enriched.reduce((s, m) => s + m.responseHours, 0) / enriched.length),
    avgRating: (enriched.reduce((s, m) => s + m.rating, 0) / enriched.length).toFixed(1),
  };

  const hasActiveFilters = filter !== "Todos" || sectorFilter !== "Todos" || query || sort !== "relevance";
  const clearFilters = () => { setFilter("Todos"); setSectorFilter("Todos"); setQuery(""); setSort("relevance"); };

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Modo 2 · Marketplace de Sabiduría</div>
          <h1 className="page-title">
            {persona === "senior" ? "Marketplace" : "Buscar mentor"}
          </h1>
          <div className="page-sub">
            {persona === "senior"
              ? "Mentores senior verificados de empresas líderes de Bolivia. Cada perfil ha sido validado por trayectoria y referencias."
              : "Banco de talento senior verificado. Filtra, compara y contacta a quien mejor encaje con tu necesidad de sucesión o mentoría."}
          </div>
        </div>
        {persona === "empresa" || persona === "hr" ? (
          <button className="btn btn-gold" onClick={() => setPublishOpen(true)}>
            <Icon name="plus" size={14} /> Publicar búsqueda
          </button>
        ) : (
          <button className="btn btn-gold" onClick={() => pushToast("Disponibilidad publicada")}>
            <Icon name="plus" size={14} /> Publicar disponibilidad
          </button>
        )}
      </div>

      {/* KPI strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <div className="stat">
          <div className="stat-label">Mentores verificados</div>
          <div className="stat-value mono">{stats.total}</div>
          <div className="stat-delta">{stats.available} disponibles ahora</div>
        </div>
        <div className="stat">
          <div className="stat-label">Nicho premium</div>
          <div className="stat-value mono">{stats.premium}</div>
          <div className="stat-delta">peritos en sectores críticos</div>
        </div>
        <div className="stat">
          <div className="stat-label">Tiempo de respuesta</div>
          <div className="stat-value mono">~{stats.avgResponse}h</div>
          <div className="stat-delta">promedio del Marketplace</div>
        </div>
        <div className="stat">
          <div className="stat-label">Reputación promedio</div>
          <div className="stat-value mono">{stats.avgRating}</div>
          <div className="stat-delta">sobre 5.0 · 173 sesiones</div>
        </div>
      </div>

      {/* Recomendados según pipeline (HR/Empresa) */}
      {recommended.length > 0 && (
        <div className="card card-pad" style={{ background: "linear-gradient(135deg, var(--gold-tint) 0%, var(--bg-elev) 60%)", borderColor: "var(--gold-soft)", marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, marginBottom: 14, flexWrap: "wrap" }}>
            <div>
              <div className="eyebrow gold">Recomendado para tu pipeline</div>
              <h3 className="serif" style={{ fontSize: 20, fontWeight: 500, margin: "6px 0 4px" }}>{recommended.length} mentor{recommended.length === 1 ? "" : "es"} sugerido{recommended.length === 1 ? "" : "s"} según tus cargos sin sucesor</h3>
              <div className="muted" style={{ fontSize: 13 }}>FlexoCruz tiene {recommended.length} áreas críticas sin plan de sucesión. Estos seniors podrían acompañar el traspaso.</div>
            </div>
          </div>
          <div className="recommended-scroll" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            {recommended.map(({ gap, mentor }) => (
              <div key={gap.id} className="card card-pad" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <Avatar initials={mentor.photo} size="lg" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="mono" style={{ fontSize: 10.5, color: "var(--danger)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                    Gap: {gap.role} · jub. {gap.retireDate}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{mentor.name.split(" ").slice(0, 2).join(" ")}</span>
                    <Icon name="verified" size={12} color="var(--gold)" />
                  </div>
                  <div className="muted" style={{ fontSize: 12 }}>{mentor.title} · {mentor.company}</div>
                  <div style={{ display: "flex", gap: 12, marginTop: 8, fontSize: 11.5, color: "var(--ink-3)", flexWrap: "wrap" }}>
                    <span><strong style={{ color: "var(--gold-2)" }}>{mentor.yearsExp}</strong> años</span>
                    <span>{mentor.rate}</span>
                    <Stars value={mentor.rating} size={10} />
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
                    <button className="btn btn-ghost" style={{ padding: "5px 10px", fontSize: 11.5 }} onClick={() => onOpenProfile(mentor.id)}>Ver perfil</button>
                    <button className="btn btn-primary" style={{ padding: "5px 10px", fontSize: 11.5 }} onClick={() => pushToast(`Solicitud enviada a ${mentor.name.split(" ")[0]} para ${gap.role}`)}>Contactar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter bar */}
      <div className="card market-filters" style={{ padding: "12px 16px", marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
          <div className="market-search" style={{ display: "flex", gap: 8, alignItems: "center", flex: 1, minWidth: 220 }}>
            <Icon name="search" size={14} color="var(--ink-3)" />
            <input
              placeholder="Buscar por nombre, empresa, sector o expertise…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{ border: "none", outline: "none", background: "transparent", fontSize: 13.5, flex: 1, fontFamily: "var(--sans)", minWidth: 0 }}
            />
          </div>
          <div className="divider-vert market-divider" style={{ height: 24 }}></div>
          <div className="market-chips" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Todos", "Disponibles", "Premium", "Mi lista corta"].map(f => (
              <span key={f} className={`chip ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
                {f}
                {f === "Mi lista corta" && shortlist.length > 0 && <span className="mono" style={{ marginLeft: 4, fontSize: 10, opacity: 0.7 }}>{shortlist.length}</span>}
              </span>
            ))}
          </div>
          <div className="market-selects">
            <CustomSelect
              value={sectorFilter}
              onChange={setSectorFilter}
              options={sectors.map(s => ({ value: s, label: s }))}
              placeholder="Sector"
            />
            <CustomSelect
              value={sort}
              onChange={setSort}
              options={[
                { value: "relevance",  label: "Más relevantes" },
                { value: "rating",     label: "Mejor reputación" },
                { value: "exp",        label: "Más experiencia" },
                { value: "rate-asc",   label: "Tarifa: menor a mayor" },
                { value: "rate-desc",  label: "Tarifa: mayor a menor" },
                { value: "response",   label: "Respuesta más rápida" },
              ]}
              placeholder="Ordenar"
            />
          </div>
          {hasActiveFilters && (
            <button className="btn-text" style={{ fontSize: 12 }} onClick={clearFilters}>Limpiar ✕</button>
          )}
        </div>
      </div>

      {/* Resultados header + toggle + shortlist */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div className="mono muted" style={{ fontSize: 11 }}>
          {filtered.length} de {seniors.length} mentores
          {sort !== "relevance" && <span> · ordenado por {{
            rating: "reputación", "rate-asc": "tarifa ↑", "rate-desc": "tarifa ↓", exp: "experiencia", response: "respuesta",
          }[sort]}</span>}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {shortlist.length >= 2 && (
            <button className="btn btn-ghost" style={{ fontSize: 12, padding: "6px 12px" }} onClick={() => setCompareOpen(true)}>
              <Icon name="users" size={12} /> Comparar lista ({shortlist.length})
            </button>
          )}
          {(persona === "hr" || persona === "empresa") && (
            <div style={{ display: "flex", gap: 4, background: "var(--bg-elev)", border: "1px solid var(--line)", borderRadius: 6, padding: 3 }}>
              <button className={`view-toggle ${view === "chart" ? "active" : ""}`} onClick={() => setView("chart")}>
                <Icon name="users" size={12} /> Organigrama
              </button>
              <button className={`view-toggle ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")}>
                <Icon name="market" size={12} /> Catálogo
              </button>
            </div>
          )}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="card card-pad" style={{ textAlign: "center", padding: "60px 20px" }}>
          <Icon name="search" size={32} color="var(--ink-4)" />
          <h3 className="serif" style={{ fontSize: 19, fontWeight: 500, margin: "12px 0 6px" }}>Ningún mentor coincide con tu búsqueda</h3>
          <div className="muted" style={{ fontSize: 13.5, maxWidth: 420, margin: "0 auto 16px" }}>Ajusta los filtros o publica una búsqueda — Legacy notifica a los seniors elegibles cuando una oportunidad calza con su perfil.</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            <button className="btn btn-ghost" onClick={clearFilters}>Limpiar filtros</button>
            {(persona === "hr" || persona === "empresa") && (
              <button className="btn btn-primary" onClick={() => setPublishOpen(true)}>
                <Icon name="plus" size={14} /> Publicar búsqueda
              </button>
            )}
          </div>
        </div>
      )}

      {filtered.length > 0 && (persona === "hr" || persona === "empresa") && view === "chart" ? (
        <MentorOrgChart seniors={filtered} onOpenProfile={onOpenProfile} pushToast={pushToast} />
      ) : filtered.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {filtered.map((s, i) => (
            <MentorCard
              key={s.id}
              s={s}
              i={i}
              saved={shortlist.includes(s.id)}
              onToggleSave={() => toggleShortlist(s.id)}
              onOpenProfile={onOpenProfile}
              pushToast={pushToast}
            />
          ))}
        </div>
      )}

      {/* Búsquedas publicadas */}
      {(persona === "empresa" || persona === "hr") && mySearches.length > 0 && (
        <div style={{ marginTop: 36 }}>
          <div className="section-h">
            <div>
              <div className="eyebrow gold">Tus búsquedas publicadas</div>
              <h3 className="serif" style={{ marginTop: 6 }}>{mySearches.length} posición{mySearches.length === 1 ? "" : "es"} abierta{mySearches.length === 1 ? "" : "s"} en el Marketplace</h3>
            </div>
            <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => setPublishOpen(true)}><Icon name="plus" size={14} /> Publicar otra</button>
          </div>
          <div className="my-searches-scroll" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
            {mySearches.map(s => (
              <div key={s.id} className="card card-pad" style={{ borderColor: "var(--gold-soft)", background: "linear-gradient(180deg, var(--gold-tint) 0%, var(--bg-elev) 30%)" }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                  <span className="badge">{s.type}</span>
                  <span className="badge neutral">{s.area}</span>
                  <span className={`badge ${s.urgency === "Alta" ? "" : s.urgency === "Media" ? "blue" : "neutral"}`}>{s.urgency}</span>
                </div>
                <h4 className="serif" style={{ fontSize: 17, fontWeight: 500, margin: "0 0 4px", lineHeight: 1.3 }}>{s.role}</h4>
                <div className="mono muted" style={{ fontSize: 11 }}>{s.posted}</div>
                <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5, margin: "10px 0 14px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{s.description}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 14px", fontSize: 12, color: "var(--ink-2)", paddingTop: 12, borderTop: "1px solid var(--line)" }}>
                  <div><Icon name="clock" size={11} color="var(--gold-2)" /> {s.modality}</div>
                  <div><Icon name="pin" size={11} color="var(--gold-2)" /> {s.location}</div>
                  <div><Icon name="billing" size={11} color="var(--gold-2)" /> <span className="mono" style={{ fontWeight: 600 }}>USD {Number(s.budget).toLocaleString()}/mes</span></div>
                  <div><Icon name="users" size={11} color="var(--gold-2)" /> {s.applicants} postulantes</div>
                </div>
                {s.expertise && s.expertise.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 12 }}>
                    {s.expertise.slice(0, 4).map(e => <span key={e} style={{ fontSize: 11, padding: "2px 8px", background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 10, color: "var(--ink-2)" }}>{e}</span>)}
                    {s.expertise.length > 4 && <span style={{ fontSize: 11, color: "var(--ink-3)" }}>+{s.expertise.length - 4}</span>}
                  </div>
                )}
                <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
                  <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => pushToast(`Revisando postulantes · ${s.applicants} match`)}>Revisar postulantes</button>
                  <button className="btn-text" style={{ fontSize: 12, marginLeft: "auto", color: "var(--danger)" }} onClick={() => deleteSearch(s.id)}>Despublicar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {publishOpen && <window.PublishSearchModal onClose={() => setPublishOpen(false)} pushToast={pushToast} />}
      {compareOpen && (
        <CompareModal
          mentors={enriched.filter(s => shortlist.includes(s.id))}
          onClose={() => setCompareOpen(false)}
          onRemove={toggleShortlist}
          onOpenProfile={onOpenProfile}
          pushToast={pushToast}
        />
      )}
    </div>
  );
};

// ============================================================
// MENTOR CARD — versión rica
// ============================================================
const MentorCard = ({ s, i, saved, onToggleSave, onOpenProfile, pushToast }) => (
  <div className="mentor-card fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
    {s.premium && (
      <div className="mentor-card-flag">
        <Icon name="star" size={10} color="#fff" /> Nicho premium · especialización crítica
      </div>
    )}
    <div style={{ padding: 18, flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <Avatar initials={s.photo} size="lg" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{s.name.split(" ").slice(0, 2).join(" ")}</span>
            <Icon name="verified" size={13} color="var(--gold)" />
          </div>
          <div className="muted" style={{ fontSize: 12, marginTop: 1 }}>{s.title}</div>
          <div className="mono muted" style={{ fontSize: 10.5, marginTop: 2 }}>{s.company}</div>
        </div>
        <button
          className="mentor-card-save"
          onClick={onToggleSave}
          aria-label={saved ? "Quitar de lista corta" : "Guardar en lista corta"}
          title={saved ? "En tu lista corta" : "Añadir a lista corta"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? "var(--gold)" : "none"} stroke={saved ? "var(--gold)" : "var(--ink-3)"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      <p style={{ fontSize: 12.5, lineHeight: 1.5, color: "var(--ink-2)", margin: "14px 0 12px", height: 56, overflow: "hidden" }}>{s.bio}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
        {s.expertise.slice(0, 3).map(e => (
          <span key={e} style={{ fontSize: 10.5, padding: "2px 8px", background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 10, color: "var(--ink-2)" }}>{e}</span>
        ))}
        {s.expertise.length > 3 && <span style={{ fontSize: 10.5, color: "var(--ink-3)", padding: "2px 4px" }}>+{s.expertise.length - 3}</span>}
      </div>

      {/* Meta row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 10px", fontSize: 11, color: "var(--ink-3)", paddingTop: 10, borderTop: "1px solid var(--line-soft)", marginTop: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Icon name="clock" size={11} color="var(--gold-2)" /> Responde en ~{s.responseHours}h
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span className="dot-status green"></span> Activo {s.lastSeen}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Icon name="briefcase" size={11} color="var(--gold-2)" /> {s.yearsExp} años
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Icon name="calendar" size={11} color="var(--gold-2)" /> {s.nextAvailable}
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="mentor-card-foot">
      <div>
        <div className="mono" style={{ fontSize: 13, fontWeight: 600, color: "var(--gold-2)" }}>{s.rate}</div>
        <Stars value={s.rating} size={10} />
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => onOpenProfile(s.id)}>Perfil</button>
        <button className="btn btn-primary" style={{ padding: "6px 12px", fontSize: 12 }} onClick={() => pushToast(`Solicitud enviada a ${s.name.split(" ")[0]}`)}>Contactar</button>
      </div>
    </div>
  </div>
);

// ============================================================
// COMPARE MODAL — mentores en lista corta lado a lado
// ============================================================
const CompareModal = ({ mentors, onClose, onRemove, onOpenProfile, pushToast }) => {
  const { Modal } = window.LegacyModals;
  return (
    <Modal
      eyebrow="Lista corta"
      title={`Comparar ${mentors.length} mentor${mentors.length === 1 ? "" : "es"}`}
      subtitle="Lado a lado de los seniors que guardaste. La lista persiste en tu cuenta."
      onClose={onClose}
      maxWidth={Math.min(940, 360 * mentors.length + 80)}
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>Cerrar</button>
          <button className="btn btn-primary" onClick={() => { pushToast("Comparativo exportado en PDF"); }}>
            <Icon name="paperclip" size={14} /> Exportar comparativo
          </button>
        </>
      }
    >
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${mentors.length}, 1fr)`, gap: 12 }}>
        {mentors.map(s => (
          <div key={s.id} className="card card-pad" style={{ padding: 14 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
              <Avatar initials={s.photo} size="md" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name.split(" ").slice(0,2).join(" ")}</div>
                <div className="muted" style={{ fontSize: 11 }}>{s.title}</div>
              </div>
            </div>
            <div className="compare-row"><span>Tarifa</span><span className="mono" style={{ fontWeight: 600 }}>{s.rate}</span></div>
            <div className="compare-row"><span>Experiencia</span><span className="mono">{s.yearsExp} años</span></div>
            <div className="compare-row"><span>Reputación</span><Stars value={s.rating} size={10} /></div>
            <div className="compare-row"><span>Sesiones</span><span className="mono">{s.sessions || 0}</span></div>
            <div className="compare-row"><span>Idiomas</span><span style={{ fontSize: 11.5 }}>{s.languages.join(" · ")}</span></div>
            <div className="compare-row"><span>Ubicación</span><span style={{ fontSize: 11.5 }}>{s.location}</span></div>
            <div className="compare-row"><span>Disponible</span><span style={{ fontSize: 11.5 }}>{s.available}</span></div>
            <div className="compare-row"><span>Responde en</span><span className="mono">~{s.responseHours}h</span></div>
            <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid var(--line)" }}>
              <div className="mono muted" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Expertise</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {s.expertise.slice(0, 4).map(e => <span key={e} style={{ fontSize: 10.5, padding: "1px 6px", background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 8, color: "var(--ink-2)" }}>{e}</span>)}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
              <button className="btn btn-ghost" style={{ flex: 1, fontSize: 11.5, padding: "5px 8px" }} onClick={() => { onClose(); onOpenProfile(s.id); }}>Perfil</button>
              <button className="btn btn-primary" style={{ flex: 1, fontSize: 11.5, padding: "5px 8px" }} onClick={() => pushToast(`Solicitud enviada a ${s.name.split(" ")[0]}`)}>Contactar</button>
            </div>
            <button className="btn-text" style={{ fontSize: 11, width: "100%", marginTop: 8, color: "var(--danger)" }} onClick={() => onRemove(s.id)}>Quitar de lista</button>
          </div>
        ))}
      </div>
    </Modal>
  );
};

// ============================================================
// MENTOR ORG CHART — vista jerárquica avanzada
// Matriz Nivel × Área + pipeline gaps + filtros interactivos
// ============================================================
const MentorOrgChart = ({ seniors, onOpenProfile, pushToast }) => {
  const D = window.LegacyData;
  const pipeline = D.RETIREMENT_PIPELINE || [];

  const [highlightArea, setHighlightArea] = React.useState(null);
  const [highlightLevel, setHighlightLevel] = React.useState(null);

  const classify = (s) => {
    const t = (s.title || "").toLowerCase();
    let level = "jefatura";
    if (t.includes("director") || t.includes("cfo") || t.includes("ceo") || t.includes("presidente")) level = "direccion";
    else if (t.includes("gerente") || t.includes("gerencia")) level = "gerencia";
    else if (t.includes("jefe") || t.includes("jefa") || t.includes("jefatura")) level = "jefatura";
    let area = "operaciones";
    const sector = (s.sector || "").toLowerCase();
    if (sector.includes("finanz")) area = "finanzas";
    else if (sector.includes("comercial") || sector.includes("agroindustria")) area = "comercial";
    else if (sector.includes("talento") || sector.includes("rrhh") || sector.includes("banca")) area = "talento";
    return { level, area };
  };

  const LEVELS = [
    { id: "direccion", label: "Dirección", sub: "C-Level · asientos de comité", icon: "trending" },
    { id: "gerencia",  label: "Gerencia",  sub: "Mentoría a gerentes nuevos", icon: "briefcase" },
    { id: "jefatura",  label: "Jefatura",  sub: "Acompañamiento técnico",     icon: "settings" },
  ];
  const AREAS = [
    { id: "operaciones", label: "Operaciones", short: "OPS", color: "#b8924a", hex: "184, 146, 74" },
    { id: "finanzas",    label: "Finanzas",    short: "FIN", color: "#2a5d6e", hex: "42, 93, 110" },
    { id: "comercial",   label: "Comercial",   short: "COM", color: "#4a7a4a", hex: "74, 122, 74" },
    { id: "talento",     label: "Talento",     short: "RRHH",color: "#9a7837", hex: "154, 120, 55" },
  ];

  // Build matrix and gap map (which area+level needs a successor at FlexoCruz)
  const matrix = {};
  LEVELS.forEach(l => { matrix[l.id] = {}; AREAS.forEach(a => { matrix[l.id][a.id] = []; }); });
  seniors.forEach(s => {
    const { level, area } = classify(s);
    if (matrix[level] && matrix[level][area]) matrix[level][area].push(s);
  });

  // Map pipeline gaps to area+level cells
  const gapMap = {};
  pipeline.forEach(p => {
    if (!p.status.includes("Sin sucesor")) return;
    const roleLow = p.role.toLowerCase();
    const areaLow = p.area.toLowerCase();
    let level = "jefatura";
    if (roleLow.includes("director") || roleLow.includes("ceo") || roleLow.includes("cfo")) level = "direccion";
    else if (roleLow.includes("gerent")) level = "gerencia";
    else if (roleLow.includes("jefe") || roleLow.includes("jefa")) level = "jefatura";
    let area = "operaciones";
    if (areaLow.includes("financ")) area = "finanzas";
    else if (areaLow.includes("comerc")) area = "comercial";
    else if (areaLow.includes("rrhh") || areaLow.includes("talent")) area = "talento";
    const k = `${level}.${area}`;
    gapMap[k] = gapMap[k] || [];
    gapMap[k].push(p);
  });

  // Stats per column / row
  const areaStats = {};
  AREAS.forEach(a => { areaStats[a.id] = 0; });
  const levelStats = {};
  LEVELS.forEach(l => { levelStats[l.id] = 0; });
  seniors.forEach(s => {
    const { level, area } = classify(s);
    if (areaStats[area] !== undefined) areaStats[area]++;
    if (levelStats[level] !== undefined) levelStats[level]++;
  });

  const totalCells = LEVELS.length * AREAS.length;
  const coveredCells = LEVELS.reduce((acc, l) => acc + AREAS.reduce((c, a) => c + (matrix[l.id][a.id].length > 0 ? 1 : 0), 0), 0);
  const gapCells = Object.keys(gapMap).length;

  const cellHighlighted = (lvl, ar) =>
    (highlightArea === null || highlightArea === ar) &&
    (highlightLevel === null || highlightLevel === lvl);

  return (
    <div className="orgchart-v2">
      {/* Coverage summary */}
      <div className="orgchart-summary">
        <div className="orgchart-summary-item">
          <div className="orgchart-summary-v">{seniors.length}</div>
          <div className="orgchart-summary-l">Mentores en mapa</div>
        </div>
        <div className="orgchart-summary-item">
          <div className="orgchart-summary-v">{coveredCells}<span className="muted" style={{ fontSize: 16 }}>/{totalCells}</span></div>
          <div className="orgchart-summary-l">Cobertura · Nivel × Área</div>
        </div>
        <div className="orgchart-summary-item">
          <div className="orgchart-summary-v" style={{ color: gapCells > 0 ? "var(--danger)" : "var(--good)" }}>{gapCells}</div>
          <div className="orgchart-summary-l">Gaps internos detectados</div>
        </div>
        <div className="orgchart-summary-bar">
          <div className="orgchart-summary-prog">
            <div className="orgchart-summary-prog-fill" style={{ width: `${(coveredCells / totalCells) * 100}%` }}></div>
          </div>
          <div className="mono muted" style={{ fontSize: 10.5, marginTop: 4 }}>
            {Math.round((coveredCells / totalCells) * 100)}% del mapa cubierto · click en áreas o niveles para enfocar
          </div>
        </div>
      </div>

      <div className="orgchart-grid">
        {/* Header con áreas (filtros) */}
        <div className="orgchart-head">
          <div className="orgchart-corner">
            <div className="eyebrow" style={{ fontSize: 9.5 }}>Nivel \ Área</div>
            {(highlightArea || highlightLevel) && (
              <button className="btn-text" style={{ fontSize: 10, padding: "2px 0", marginTop: 4 }} onClick={() => { setHighlightArea(null); setHighlightLevel(null); }}>Limpiar foco ✕</button>
            )}
          </div>
          {AREAS.map(a => (
            <button
              key={a.id}
              className={`orgchart-area-btn ${highlightArea === a.id ? "active" : ""}`}
              style={{ "--area-color": a.color, "--area-rgb": a.hex }}
              onClick={() => setHighlightArea(highlightArea === a.id ? null : a.id)}
            >
              <span className="orgchart-area-dot" style={{ background: a.color }}></span>
              <div style={{ textAlign: "left", flex: 1, minWidth: 0 }}>
                <div className="orgchart-area-label">{a.label}</div>
                <div className="orgchart-area-stat">{areaStats[a.id]} mentor{areaStats[a.id] === 1 ? "" : "es"}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Filas por nivel */}
        {LEVELS.map((lv, idx) => (
          <div key={lv.id} className="orgchart-row">
            <button
              className={`orgchart-level-btn ${highlightLevel === lv.id ? "active" : ""}`}
              onClick={() => setHighlightLevel(highlightLevel === lv.id ? null : lv.id)}
            >
              <div className="orgchart-level-icon"><Icon name={lv.icon} size={16} color="var(--gold-2)" /></div>
              <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                <div className="orgchart-level-label">{lv.label}</div>
                <div className="orgchart-level-sub">{lv.sub}</div>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", marginTop: 4 }}>{levelStats[lv.id]} disponible{levelStats[lv.id] === 1 ? "" : "s"}</div>
              </div>
              {idx < LEVELS.length - 1 && <span className="orgchart-level-connector"></span>}
            </button>

            {AREAS.map(a => {
              const cellSeniors = matrix[lv.id][a.id];
              const cellGaps = gapMap[`${lv.id}.${a.id}`] || [];
              const isHighlighted = cellHighlighted(lv.id, a.id);
              const dimmed = (highlightArea || highlightLevel) && !isHighlighted;
              return (
                <div
                  key={a.id}
                  className={`orgchart-cell ${dimmed ? "dimmed" : ""} ${cellGaps.length > 0 ? "has-gap" : ""} ${cellSeniors.length === 0 ? "empty-cell" : ""}`}
                  style={{ "--area-color": a.color, "--area-rgb": a.hex }}
                >
                  {cellGaps.length > 0 && (
                    <div className="orgchart-gap-flag">
                      <Icon name="bell" size={11} color="var(--danger)" />
                      Gap: {cellGaps[0].name}
                    </div>
                  )}
                  {cellSeniors.length === 0 ? (
                    <div className="orgchart-empty-v2" onClick={() => pushToast(`Sin mentor disponible en ${a.label} · ${lv.label} — considera publicar una búsqueda`)}>
                      <div className="orgchart-empty-icon">
                        <Icon name="plus" size={14} color="var(--ink-4)" />
                      </div>
                      <span>Sin candidatos</span>
                      <span className="orgchart-empty-sub">click para publicar búsqueda</span>
                    </div>
                  ) : (
                    cellSeniors.map(s => (
                      <button key={s.id} className="orgchart-node-v2" onClick={() => onOpenProfile && onOpenProfile(s.id)}>
                        {s.premium && <span className="orgchart-node-flag">premium</span>}
                        <div className="orgchart-node-head">
                          <Avatar initials={s.photo} size="md" />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <span className="orgchart-node-name">{s.name.split(" ").slice(0, 2).join(" ")}</span>
                              <Icon name="verified" size={11} color="var(--gold)" />
                            </div>
                            <div className="orgchart-node-role">{s.title}</div>
                            <div className="orgchart-node-company">{s.company}</div>
                          </div>
                        </div>
                        <div className="orgchart-node-meta">
                          <span><strong>{s.yearsExp}</strong> años</span>
                          <span style={{ color: "var(--gold-2)" }}>{s.rate}</span>
                        </div>
                        <div className="orgchart-node-foot">
                          <Stars value={s.rating} size={10} />
                          <span className="mono muted" style={{ fontSize: 10 }}>{s.sessions || 0} ses.</span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Leyenda */}
      <div className="orgchart-legend">
        <div className="orgchart-legend-item">
          <span className="orgchart-legend-swatch" style={{ background: "var(--bg-elev)", border: "1px solid var(--line)" }}></span>
          <span>Mentor disponible</span>
        </div>
        <div className="orgchart-legend-item">
          <span className="orgchart-legend-swatch" style={{ background: "var(--bg)", border: "1.5px dashed var(--line-2)" }}></span>
          <span>Sin candidatos</span>
        </div>
        <div className="orgchart-legend-item">
          <span className="orgchart-legend-swatch" style={{ background: "rgba(164,69,58,0.08)", border: "1px solid var(--danger)" }}></span>
          <span>Gap de FlexoCruz · sucesor pendiente</span>
        </div>
        <div className="orgchart-legend-item" style={{ marginLeft: "auto" }}>
          <Icon name="verified" size={12} color="var(--gold)" />
          <span style={{ fontSize: 11, color: "var(--ink-3)" }}>Click área o nivel para filtrar · click mentor para ver perfil</span>
        </div>
      </div>
    </div>
  );
};

window.Marketplace = Marketplace;

// ============================================================
// CustomSelect — dropdown que NUNCA se desborda del viewport
// ============================================================
const CustomSelect = ({ value, onChange, options, placeholder }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  const selected = options.find(o => o.value === value) || options[0];
  return (
    <div className="custom-select" ref={ref}>
      <button type="button" className={`custom-select-trigger ${open ? "open" : ""}`} onClick={() => setOpen(o => !o)}>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selected ? selected.label : placeholder}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.15s" }}><path d="M6 9l6 6 6-6"/></svg>
      </button>
      {open && (
        <div className="custom-select-menu">
          {options.map(o => (
            <button
              key={o.value}
              type="button"
              className={`custom-select-option ${o.value === value ? "selected" : ""}`}
              onClick={() => { onChange(o.value); setOpen(false); }}
            >
              {o.label}
              {o.value === value && <Icon name="check" size={12} color="var(--gold)" strokeWidth={2.4} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
