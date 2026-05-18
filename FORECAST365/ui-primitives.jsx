// Shared icons + small UI primitives
const Icon = ({ name, size = 16, color = "currentColor", strokeWidth = 1.6 }) => {
  const s = size;
  const props = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "home":     return (<svg {...props}><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>);
    case "transfer": return (<svg {...props}><path d="M4 7h13"/><path d="M14 4l3 3-3 3"/><path d="M20 17H7"/><path d="M10 14l-3 3 3 3"/></svg>);
    case "market":   return (<svg {...props}><path d="M3 7l1-3h16l1 3"/><path d="M4 7v13h16V7"/><path d="M9 12h6"/></svg>);
    case "chat":     return (<svg {...props}><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.4A8 8 0 1 1 21 12z"/></svg>);
    case "profile":  return (<svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>);
    case "billing":  return (<svg {...props}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/><path d="M7 15h4"/></svg>);
    case "calendar": return (<svg {...props}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M8 3v4M16 3v4"/></svg>);
    case "search":   return (<svg {...props}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>);
    case "bell":     return (<svg {...props}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8z"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>);
    case "settings": return (<svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>);
    case "check":    return (<svg {...props}><path d="m5 12 5 5L20 7"/></svg>);
    case "check-circle": return (<svg {...props}><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>);
    case "circle":   return (<svg {...props}><circle cx="12" cy="12" r="9"/></svg>);
    case "play":     return (<svg {...props}><circle cx="12" cy="12" r="9"/><path d="M10 9v6l5-3z" fill={color}/></svg>);
    case "arrow-right": return (<svg {...props}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>);
    case "plus":     return (<svg {...props}><path d="M12 5v14M5 12h14"/></svg>);
    case "send":     return (<svg {...props}><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>);
    case "star":     return (<svg {...props}><path d="m12 3 3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L3 10l6-1z"/></svg>);
    case "verified": return (<svg {...props}><path d="m9 12 2 2 4-4"/><path d="M12 3l2.5 1.5L17 4l1 2.5L20 8l-1 3 1 3-2 1.5-.5 2.5L15 19l-1.5 1.5L12 21l-1.5-1.5L9 19l-2.5-.5L6 17l-1.5-1L4 14l-1-3 1-3 1.5-1L6 4l2.5-.5L9.5 2z"/></svg>);
    case "clock":    return (<svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>);
    case "map":      return (<svg {...props}><path d="M21 6v15l-7-3-6 3-5-2V4l5 2 6-3 7 3z"/><path d="M9 3v15M15 6v15"/></svg>);
    case "briefcase":return (<svg {...props}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>);
    case "filter":   return (<svg {...props}><path d="M3 5h18l-7 9v6l-4-2v-4z"/></svg>);
    case "x":        return (<svg {...props}><path d="m6 6 12 12M18 6 6 18"/></svg>);
    case "phone":    return (<svg {...props}><path d="M22 16v3a2 2 0 0 1-2.2 2 19 19 0 0 1-8.3-3 19 19 0 0 1-6-6 19 19 0 0 1-3-8.3A2 2 0 0 1 4.5 2h3a2 2 0 0 1 2 1.7c.1 1 .3 1.9.6 2.8a2 2 0 0 1-.5 2L8.1 9.9a16 16 0 0 0 6 6l1.4-1.5a2 2 0 0 1 2-.4c.9.3 1.8.5 2.8.6A2 2 0 0 1 22 16z"/></svg>);
    case "video":    return (<svg {...props}><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m22 8-6 4 6 4z"/></svg>);
    case "paperclip":return (<svg {...props}><path d="m21 12-9 9a5 5 0 1 1-7-7l9-9a3 3 0 0 1 4 4L9 18a1 1 0 1 1-1-1l9-9"/></svg>);
    case "pin":      return (<svg {...props}><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>);
    case "trending": return (<svg {...props}><path d="m3 17 6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>);
    case "users":    return (<svg {...props}><circle cx="9" cy="8" r="3.5"/><path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="7" r="2.5"/><path d="M22 19c0-2.5-2-4.5-5-4.5"/></svg>);
    case "book":     return (<svg {...props}><path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z"/><path d="M4 17a3 3 0 0 1 3-3h11"/></svg>);
    case "leaf":     return (<svg {...props}><path d="M11 20A7 7 0 0 1 4 13a8 8 0 0 1 8-8h7v7a8 8 0 0 1-8 8z"/><path d="M19 5 5 19"/></svg>);
    default: return null;
  }
};

const Avatar = ({ initials, size = "md", src }) => (
  <div className={`avatar ${size}`} aria-hidden>
    {src ? <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
  </div>
);

const Stars = ({ value = 5, size = 12 }) => (
  <span style={{ display: "inline-flex", gap: 2, alignItems: "center" }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= Math.round(value) ? "var(--gold)" : "transparent"} stroke="var(--gold)" strokeWidth="1.5">
        <path d="m12 3 3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6L3 10l6-1z"/>
      </svg>
    ))}
    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-3)", marginLeft: 4 }}>{value.toFixed(1)}</span>
  </span>
);

const Ornament = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "var(--gold)", margin: "20px 0" }}>
    <span style={{ height: 1, background: "var(--line-2)", width: 60 }}></span>
    <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 0 L7 3 L10 5 L7 7 L5 10 L3 7 L0 5 L3 3 Z" fill="var(--gold)"/></svg>
    <span style={{ height: 1, background: "var(--line-2)", width: 60 }}></span>
  </div>
);

const Toast = ({ children }) => <div className="toast"><Icon name="check-circle" size={14} color="var(--gold)" />{children}</div>;

Object.assign(window, { Icon, Avatar, Stars, Ornament, Toast });
