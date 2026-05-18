// Billing & subscription
const Billing = ({ persona, pushToast }) => {
  const D = window.LegacyData;
  const total = D.BILLING_HISTORY.reduce((sum, b) => sum + b.amount, 0);
  const [allOpen, setAllOpen] = React.useState(false);
  const [membershipOpen, setMembershipOpen] = React.useState(false);
  const [reportOpen, setReportOpen] = React.useState(false);
  const { AllMovementsModal } = window.LegacyModals;

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Honorarios y facturación</div>
          <h1 className="page-title">Tus ingresos</h1>
          <div className="page-sub">Liquidaciones mensuales el último día hábil. Legacy retiene la comisión y emite tu factura electrónica.</div>
        </div>
        <button className="btn btn-ghost" onClick={() => setReportOpen(true)}><Icon name="paperclip" size={14} /> Descargar reporte</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: 28 }}>
        <div className="stat">
          <div className="stat-label">Acumulado 2026</div>
          <div className="stat-value mono">${total.toLocaleString()}</div>
          <div className="stat-delta">USD · neto</div>
        </div>
        <div className="stat">
          <div className="stat-label">Próxima liquidación</div>
          <div className="stat-value mono" style={{ fontSize: 28 }}>30 Abr</div>
          <div className="stat-delta">USD ~1.950 estimado</div>
        </div>
        <div className="stat">
          <div className="stat-label">Comisión Legacy</div>
          <div className="stat-value mono">15%</div>
          <div className="stat-delta">Marketplace · plan senior</div>
        </div>
        <div className="stat">
          <div className="stat-label">Membresía</div>
          <div className="stat-value mono" style={{ fontSize: 28 }}>Premium</div>
          <div className="stat-delta">USD 35/mes · activa</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
        <div className="card">
          <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <div className="serif" style={{ fontSize: 18, fontWeight: 500 }}>Historial de movimientos</div>
              <div className="mono muted" style={{ fontSize: 11 }}>Últimos 4 movimientos</div>
            </div>
            <button className="btn-text" style={{ fontSize: 12 }} onClick={() => setAllOpen(true)}>Ver todos →</button>
          </div>
          <div className="rowlist">
            {D.BILLING_HISTORY.map(b => (
              <div key={b.id} className="row" style={{ gridTemplateColumns: "1fr 1fr 0.8fr 0.6fr", padding: "16px 22px" }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{b.concept}</div>
                  <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>{b.company}</div>
                </div>
                <div>
                  <div className="mono" style={{ fontSize: 12 }}>{b.period}</div>
                  <div className="mono muted" style={{ fontSize: 11, marginTop: 2 }}>{b.date}</div>
                </div>
                <div className="mono" style={{ fontSize: 14, fontWeight: 600, color: b.amount > 0 ? "var(--good)" : "var(--ink-2)" }}>
                  {b.amount > 0 ? "+" : ""}${Math.abs(b.amount).toLocaleString()}
                </div>
                <div><span className="badge green">{b.status}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card card-pad">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div className="eyebrow">Membresía Senior</div>
                <h3 className="serif" style={{ fontSize: 22, fontWeight: 500, margin: "8px 0 4px" }}>Premium</h3>
                <div className="muted" style={{ fontSize: 13 }}>Renovación: 28 abr 2026</div>
              </div>
              <div className="serif" style={{ fontSize: 28, fontWeight: 500 }}>$35<span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>/mes</span></div>
            </div>
            <div className="gold-rule"></div>
            {[
              "Visibilidad prioritaria en Marketplace",
              "Insignia de mentor verificado",
              "Comisión reducida (15% vs 20%)",
              "Reportes de impacto descargables",
              "Soporte de coordinador dedicado",
            ].map(f => (
              <div key={f} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13, padding: "6px 0" }}>
                <Icon name="check" size={14} color="var(--gold)" strokeWidth={2.4} /> {f}
              </div>
            ))}
            <button className="btn btn-ghost" style={{ width: "100%", marginTop: 14 }} onClick={() => setMembershipOpen(true)}>Gestionar membresía</button>
          </div>

          <div className="card card-pad">
            <div className="eyebrow">Cuenta bancaria</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>Banco Mercantil Santa Cruz</div>
                <div className="mono muted" style={{ fontSize: 12, marginTop: 4 }}>•••• •••• 4082 · USD</div>
              </div>
              <span className="badge green"><span className="dot-status green"></span>Verificada</span>
            </div>
            <button className="btn-text" style={{ fontSize: 12, marginTop: 10 }} onClick={() => pushToast("Cambio de cuenta bancaria solicitado")}>Cambiar cuenta</button>
          </div>
        </div>
      </div>

      {allOpen && <AllMovementsModal onClose={() => setAllOpen(false)} pushToast={pushToast} />}
      {membershipOpen && <window.MembershipModal onClose={() => setMembershipOpen(false)} persona={persona} pushToast={pushToast} />}
      {reportOpen && <window.BillingReportModal onClose={() => setReportOpen(false)} pushToast={pushToast} />}
    </div>
  );
};

window.Billing = Billing;
