// Legacy — datos demo (Santa Cruz, Bolivia)
// Personajes y empresas ficticios, inspirados en sectores reales del oriente boliviano.

const COMPANIES = {
  flexocruz: { id: "flexocruz", name: "FlexoCruz S.A.", sector: "Manufactura · Empaques flexibles", city: "Santa Cruz", color: "#b8924a", size: "320 colaboradores" },
  tuboplast: { id: "tuboplast", name: "Tuboplast Bolivia", sector: "Industria plástica", city: "Santa Cruz", color: "#2a5d6e", size: "180 colaboradores" },
  iasa:      { id: "iasa", name: "IASA — Industrias de Aceite", sector: "Agroindustria · Oleaginosas", city: "Santa Cruz", color: "#8a6a38", size: "640 colaboradores" },
  belen:     { id: "belen", name: "Industrias Belén", sector: "Alimentos · Cárnicos", city: "Santa Cruz", color: "#7a4838", size: "210 colaboradores" },
  cre:       { id: "cre", name: "CRE Cooperativa", sector: "Energía eléctrica", city: "Santa Cruz", color: "#4a6a5a", size: "1.200 colaboradores" },
  ypfb:      { id: "ypfb", name: "YPFB Andina", sector: "Hidrocarburos", city: "Santa Cruz", color: "#3a4a6a", size: "—" },
  bme:       { id: "bme", name: "Banco Mercantil Santa Cruz", sector: "Banca", city: "Santa Cruz", color: "#2a4a3a", size: "2.400 colaboradores" },
  sofia:     { id: "sofia", name: "Sofía SRL", sector: "Avicultura industrial", city: "Cochabamba", color: "#8a4a4a", size: "1.800 colaboradores" },
  merced:    { id: "merced", name: "Cooperativa La Merced", sector: "Cooperativismo financiero", city: "Santa Cruz", color: "#4a4a6a", size: "95 colaboradores" },
  vasco:     { id: "vasco", name: "Vascal S.A.", sector: "Productos lácteos", city: "Cochabamba", color: "#5a6a8a", size: "420 colaboradores" },
};

// ============================================================
// SENIORS — perfiles para el catálogo de RRHH/Empresa
// ============================================================
const SENIORS = {
  lorgio: {
    id: "lorgio",
    name: "Lorgio Saucedo Roca",
    age: 64,
    title: "Gerente de Producción (jubilándose)",
    company: "FlexoCruz S.A.",
    sector: "Manufactura",
    yearsExp: 40,
    photo: "LS",
    bio: "Cuarenta años en líneas de extrusión y conversión flexográfica. Diseñó el sistema actual de control de calidad de FlexoCruz y formó tres generaciones de jefes de planta.",
    expertise: ["Producción industrial", "Lean Manufacturing", "Calidad ISO 9001", "Liderazgo operativo", "Gestión de mermas"],
    languages: ["Español", "Portugués básico"],
    rate: "USD 65 / hora",
    rating: 4.9,
    sessions: 0,
    location: "Santa Cruz de la Sierra",
    available: "Lun–Jue · 09:00–13:00",
    status: "internal",
  },
  raul: {
    id: "raul",
    name: "Raúl Mendoza Calderón",
    age: 67,
    title: "Ex-CFO",
    company: "Tuboplast Bolivia (retirado)",
    sector: "Finanzas industriales",
    yearsExp: 38,
    photo: "RM",
    bio: "Dirigió la reestructuración financiera de Tuboplast en 2009 y la apertura de su línea de exportación. Especialista en planeación financiera para industria manufacturera.",
    expertise: ["Planeación financiera", "Reestructuración", "Control de gestión", "Exportación", "Riesgo cambiario"],
    languages: ["Español", "Inglés"],
    rate: "USD 95 / hora",
    rating: 5.0,
    sessions: 47,
    location: "Santa Cruz",
    available: "Mar–Vie · tardes",
    status: "marketplace",
  },
  martha: {
    id: "martha",
    name: "Martha Aguilera Vaca",
    age: 61,
    title: "Ex-Gerente Comercial",
    company: "IASA (retirada)",
    sector: "Agroindustria · Comercial",
    yearsExp: 33,
    photo: "MA",
    bio: "Construyó la red de distribución mayorista de IASA en oriente boliviano. Negociadora con cadenas y mayoristas.",
    expertise: ["Distribución", "Trade marketing", "Negociación con cadenas", "Equipos comerciales"],
    languages: ["Español"],
    rate: "USD 70 / hora",
    rating: 4.8,
    sessions: 31,
    location: "Santa Cruz",
    available: "Lun–Mié",
    status: "marketplace",
  },
  carlos: {
    id: "carlos",
    name: "Carlos Vargas Mercado",
    age: 69,
    title: "Ex-Director de Operaciones",
    company: "YPFB Andina (retirado)",
    sector: "Hidrocarburos",
    yearsExp: 42,
    photo: "CV",
    bio: "Perito en operaciones de campo. Lideró cinco proyectos de gasoductos en Tarija y Santa Cruz.",
    expertise: ["Operaciones de campo", "HSE", "Gestión de contratistas", "Gasoductos"],
    languages: ["Español", "Inglés técnico"],
    rate: "USD 140 / hora",
    rating: 5.0,
    sessions: 22,
    location: "Santa Cruz / Tarija",
    available: "A demanda",
    status: "marketplace",
    premium: true,
  },
  elena: {
    id: "elena",
    name: "Elena Justiniano Roca",
    age: 60,
    title: "Ex-Gerente de RRHH",
    company: "Banco Mercantil SC (retirada)",
    sector: "Talento · Banca",
    yearsExp: 35,
    photo: "EJ",
    bio: "Diseñó el programa de desarrollo de líderes del BME. Mentora certificada ICF.",
    expertise: ["Desarrollo de líderes", "Sucesión", "Coaching ejecutivo", "Cultura organizacional"],
    languages: ["Español", "Inglés"],
    rate: "USD 85 / hora",
    rating: 4.9,
    sessions: 58,
    location: "Santa Cruz",
    available: "Lun–Vie · mañanas",
    status: "marketplace",
  },
  enrique: {
    id: "enrique",
    name: "Enrique Pinto Salvatierra",
    age: 66,
    title: "Ex-Jefe de Mantenimiento",
    company: "CRE (retirado)",
    sector: "Energía eléctrica",
    yearsExp: 39,
    photo: "EP",
    bio: "Treinta y nueve años en la cooperativa eléctrica más grande del país. Especialista en confiabilidad de subestaciones.",
    expertise: ["Mantenimiento predictivo", "Subestaciones", "ISO 55000", "Equipos técnicos"],
    languages: ["Español"],
    rate: "USD 75 / hora",
    rating: 4.8,
    sessions: 19,
    location: "Santa Cruz",
    available: "Mar y Jue",
    status: "marketplace",
  },
};

// ============================================================
// OPPORTUNITIES — lo que Lorgio (senior) ve en su pestaña
// Empresas que publican proyectos / consultorías / asientos
// de junta a los que un senior puede POSTULAR.
// ============================================================
const OPPORTUNITIES = [
  {
    id: "op-001",
    company: "Industrias Belén",
    companyId: "belen",
    role: "Consultor en transformación de planta",
    sector: "Alimentos · Cárnicos",
    modality: "Proyecto · 4 meses",
    location: "Santa Cruz · presencial 2 días/semana",
    compensation: "USD 4.000 / mes",
    posted: "Hace 2 días",
    deadline: "Postular antes del 25 May",
    expertise: ["Producción industrial", "Lean Manufacturing", "Gestión de mermas"],
    description: "Nueva línea de embutidos sin gluten en arranque. Necesitan un senior que acompañe al jefe de planta en los primeros 4 meses de producción, ajustando procesos y formando al equipo.",
    fit: 94,
    applicants: 6,
    seats: 1,
    saved: true,
    type: "Consultoría",
    contact: { name: "Mariana Rivero", role: "Gerente de RRHH · Belén", photo: "MR" },
  },
  {
    id: "op-002",
    company: "Cooperativa La Merced",
    companyId: "merced",
    role: "Mentor para nuevo Gerente de Operaciones",
    sector: "Cooperativismo financiero",
    modality: "Mentoría · 6 meses",
    location: "Santa Cruz · remoto + 1 visita mensual",
    compensation: "USD 2.500 / mes",
    posted: "Hace 5 días",
    deadline: "Postular antes del 30 May",
    expertise: ["Liderazgo operativo", "Gestión por indicadores"],
    description: "El nuevo gerente lleva 60 días en el cargo. Buscan un mentor con experiencia en industria/cooperativismo para sesiones quincenales de acompañamiento ejecutivo.",
    fit: 78,
    applicants: 11,
    seats: 1,
    saved: false,
    type: "Mentoría",
    contact: { name: "Roberto Salinas", role: "Presidencia · La Merced", photo: "RS" },
  },
  {
    id: "op-003",
    company: "Sofía SRL",
    companyId: "sofia",
    role: "Asesor técnico en operaciones avícolas",
    sector: "Avicultura industrial",
    modality: "Asesoría · honorarios por sesión",
    location: "Cochabamba · 2 visitas mensuales",
    compensation: "USD 1.800 / mes",
    posted: "Hace 1 semana",
    deadline: "Postulaciones abiertas",
    expertise: ["Operaciones industriales", "Calidad", "Bioseguridad"],
    description: "Apertura de nuevo galpón industrial automatizado. Necesitan acompañamiento técnico de un senior con experiencia en operaciones de planta y estándares de calidad.",
    fit: 72,
    applicants: 3,
    seats: 1,
    saved: false,
    type: "Asesoría",
    contact: { name: "Diego Aramayo", role: "Director · Sofía", photo: "DA" },
  },
  {
    id: "op-004",
    company: "Vascal S.A.",
    companyId: "vasco",
    role: "Miembro independiente del Comité de Operaciones",
    sector: "Productos lácteos",
    modality: "Asiento de comité · 12 meses",
    location: "Cochabamba · 1 sesión mensual",
    compensation: "USD 1.200 / sesión",
    posted: "Hace 3 días",
    deadline: "Postular antes del 28 May",
    expertise: ["Gobernanza", "Operaciones industriales", "Mejora continua"],
    description: "Asiento independiente en comité ejecutivo de operaciones. Aportar mirada externa sobre planes de inversión, ampliación de planta y KPIs operativos.",
    fit: 88,
    applicants: 4,
    seats: 1,
    saved: true,
    type: "Comité",
    badge: "Premium",
    contact: { name: "Patricia Castedo", role: "Presidencia ejecutiva", photo: "PC" },
  },
  {
    id: "op-005",
    company: "Tuboplast Bolivia",
    companyId: "tuboplast",
    role: "Diagnóstico de capacidad instalada · línea de soplado",
    sector: "Industria plástica",
    modality: "Proyecto corto · 8 semanas",
    location: "Santa Cruz · presencial",
    compensation: "USD 6.500 (proyecto cerrado)",
    posted: "Hace 1 día",
    deadline: "Postular antes del 20 May",
    expertise: ["Producción industrial", "Lean Manufacturing"],
    description: "Diagnóstico independiente de capacidad instalada y cuellos de botella de la línea de soplado antes de decisión de inversión en 2027. Entregable: informe ejecutivo con escenarios.",
    fit: 91,
    applicants: 2,
    seats: 1,
    saved: false,
    type: "Proyecto",
    contact: { name: "Andrés Roca", role: "Gerente Industrial · Tuboplast", photo: "AR" },
  },
  {
    id: "op-006",
    company: "Cámara de Industria CAINCO",
    companyId: null,
    role: "Mentor invitado · Programa Pyme Industria",
    sector: "Asociación gremial",
    modality: "Voluntariado remunerado · 6 sesiones",
    location: "Santa Cruz",
    compensation: "USD 200 / sesión",
    posted: "Hace 4 días",
    deadline: "Postulaciones abiertas",
    expertise: ["Producción industrial", "Liderazgo operativo"],
    description: "Mentor invitado para 6 jefes de planta de pymes industriales en programa de fortalecimiento. Una sesión grupal y dos sesiones individuales por pyme.",
    fit: 82,
    applicants: 9,
    seats: 3,
    saved: false,
    type: "Programa",
    contact: { name: "CAINCO", role: "Comisión de Industria", photo: "CA" },
  },
];

// ============================================================
// TRANSFER PROGRAM — el de FlexoCruz
// ============================================================
const TRANSFER_PROGRAM = {
  id: "tp-001",
  title: "Traspaso · Gerencia de Producción FlexoCruz",
  company: "FlexoCruz S.A.",
  senior: "lorgio",
  successor: { name: "Juan Antelo Méndez", title: "Jefe de Planta", photo: "JA", age: 38, tenure: "6 años en FlexoCruz", email: "j.antelo@flexocruz.bo" },
  hr: { name: "Andrea Cuéllar", title: "Gerente de RRHH · FlexoCruz", photo: "AC", email: "a.cuellar@flexocruz.bo" },
  sponsor: { name: "Pablo Salvatierra", title: "CEO · FlexoCruz", photo: "PS" },
  start: "15 Mar 2026",
  end: "15 Sep 2026",
  durationMonths: 6,
  status: "En curso · mes 3",
  progress: 48,
  budget: { total: 12600, spent: 6048, currency: "USD" },
  modules: [
    { id: 1, title: "Mapeo del conocimiento crítico", desc: "Identificación de procesos clave, decisiones recurrentes y red de proveedores.", status: "done", weeks: 3, deliverable: "Mapa de conocimiento (47 procesos)" },
    { id: 2, title: "Documentación de procesos núcleo", desc: "Bitácoras, criterios de decisión y excepciones operativas.", status: "done", weeks: 4, deliverable: "Manual operativo v1" },
    { id: 3, title: "Sombra operativa — Juan acompaña a Lorgio", desc: "Decisiones reales en planta con observación estructurada.", status: "active", weeks: 6, deliverable: "Bitácora de sombra · 18 sesiones" },
    { id: 4, title: "Inversión de roles — Juan decide, Lorgio observa", desc: "Juan toma la línea con respaldo del consultor.", status: "pending", weeks: 6, deliverable: "Casos resueltos por Juan" },
    { id: 5, title: "Transferencia de red de relaciones", desc: "Proveedores estratégicos, técnicos clave, autoridades.", status: "pending", weeks: 3, deliverable: "Mapa de stakeholders" },
    { id: 6, title: "Cierre y consultoría a demanda", desc: "Lorgio queda como consultor on-call por 12 meses.", status: "pending", weeks: 2, deliverable: "Acta de cierre + contrato consultoría" },
  ],
  outcomes: { knowledge: 47, sessions: 18, hoursLogged: 64, decisionsShadowed: 23 },
};

// Otras mentorías activas en la organización (vista RRHH/Empresa)
const MENTORSHIPS = [
  { id: "m1", senior: "elena", company: "FlexoCruz S.A.", topic: "Onboarding del nuevo Gerente Comercial", nextSession: "Vie 9 May · 15:00", progress: 60, status: "Activa", started: "1 Feb 2026", budget: 6800 },
  { id: "m2", senior: "raul", company: "FlexoCruz S.A.", topic: "Preparación de cierre fiscal y exportación", nextSession: "Lun 12 May · 10:00", progress: 35, status: "Activa", started: "10 Abr 2026", budget: 4200 },
];

// Pipeline de jubilaciones identificadas en la empresa (vista Empresa)
const RETIREMENT_PIPELINE = [
  { id: "p1", name: "Lorgio Saucedo", role: "Gerente de Producción", area: "Producción", retireDate: "Sep 2026", successor: "Juan Antelo", status: "En traspaso", risk: "low", color: "var(--good)" },
  { id: "p2", name: "Carlos Rojas", role: "Jefe de Mantenimiento", area: "Mantenimiento", retireDate: "Nov 2026", successor: "Por designar", status: "Sin sucesor", risk: "high", color: "var(--gold)" },
  { id: "p3", name: "Esther Vaca", role: "Contralora interna", area: "Finanzas", retireDate: "Mar 2027", successor: "Daniela Suárez", status: "Sucesor identificado", risk: "med", color: "var(--accent)" },
  { id: "p4", name: "Hugo Pinto", role: "Jefe de Calidad", area: "Calidad", retireDate: "Jun 2027", successor: "Por designar", status: "Sin sucesor", risk: "high", color: "var(--gold)" },
];

const NOTIFICATIONS = [
  { id: 1, type: "session", text: "Juan Antelo confirmó la sesión de sombra del jueves 14:00 en planta", time: "hace 12 min", unread: true },
  { id: 2, type: "match", text: "Industrias Belén te invitó a postular como consultor de transformación de planta", time: "hace 2 h", unread: true },
  { id: 3, type: "billing", text: "Honorarios de marzo liquidados — USD 1.820 transferidos", time: "ayer", unread: false },
  { id: 4, type: "system", text: "Andrea Cuéllar (RRHH) actualizó el módulo 3 del programa", time: "ayer", unread: false },
];

const BILLING_HISTORY = [
  { id: "b1", period: "Marzo 2026", company: "FlexoCruz S.A.", concept: "Consultor interno · 28 h", amount: 1820, status: "Pagado", date: "30 Mar 2026" },
  { id: "b2", period: "Marzo 2026", company: "Legacy Plataforma", concept: "Membresía Senior Premium", amount: -35, status: "Pagado", date: "28 Mar 2026" },
  { id: "b3", period: "Febrero 2026", company: "FlexoCruz S.A.", concept: "Consultor interno · 32 h", amount: 2080, status: "Pagado", date: "28 Feb 2026" },
  { id: "b4", period: "Enero 2026", company: "FlexoCruz S.A.", concept: "Consultor interno · 24 h", amount: 1560, status: "Pagado", date: "31 Ene 2026" },
];

// Postulaciones activas de Lorgio (su lado del marketplace)
const APPLICATIONS = [
  { id: "ap1", opportunityId: "op-004", company: "Vascal S.A.", role: "Comité de Operaciones", status: "Entrevista agendada", date: "12 May", color: "var(--accent)" },
  { id: "ap2", opportunityId: "op-005", company: "Tuboplast Bolivia", role: "Diagnóstico capacidad línea soplado", status: "Postulación enviada", date: "8 May", color: "var(--gold-2)" },
  { id: "ap3", opportunityId: "op-001", company: "Industrias Belén", role: "Consultor transformación planta", status: "En revisión", date: "5 May", color: "var(--ink-3)" },
];

// Solicitudes ENTRANTES (lo que llega a Lorgio en su perfil público)
const INCOMING_CALL_REQUESTS = [
  {
    id: "cr1",
    from: "Mariana Rivero",
    role: "Gerente RRHH",
    company: "Industrias Belén",
    initials: "MR",
    proposed: "Mar 14 May · 10:00",
    duration: "30 min",
    topic: "Conversar sobre la consultoría de transformación de planta antes de cerrar tu postulación.",
    status: "pending",
    timeAgo: "hace 2 h",
  },
  {
    id: "cr2",
    from: "Patricia Castedo",
    role: "Presidencia ejecutiva",
    company: "Vascal S.A.",
    initials: "PC",
    proposed: "Vie 16 May · 15:00",
    duration: "45 min",
    topic: "Entrevista final para el asiento del Comité de Operaciones.",
    status: "pending",
    timeAgo: "hace 5 h",
  },
  {
    id: "cr3",
    from: "Diego Aramayo",
    role: "Director General",
    company: "Sofía SRL",
    initials: "DA",
    proposed: "Lun 19 May · 09:30",
    duration: "30 min",
    topic: "Presentación del galpón industrial automatizado en Cochabamba.",
    status: "pending",
    timeAgo: "ayer",
  },
  {
    id: "cr4",
    from: "Andrés Roca",
    role: "Gerente Industrial",
    company: "Tuboplast Bolivia",
    initials: "AR",
    proposed: "Mié 21 May · 11:00",
    duration: "60 min",
    topic: "Detalles del diagnóstico de capacidad para línea de soplado.",
    status: "accepted",
    timeAgo: "hace 2 días",
  },
];

const INCOMING_MESSAGES = [
  {
    id: "im1",
    from: "Mariana Rivero",
    role: "Gerente RRHH · Industrias Belén",
    initials: "MR",
    time: "hace 1 h",
    subject: "Te queremos para nuestra línea de embutidos sin gluten",
    preview: "Don Lorgio, vi tu perfil y tu experiencia en líneas de extrusión nos calza perfecto. Nos gustaría agendar una llamada esta semana para…",
    unread: true,
    body: "Don Lorgio,\n\nVi tu perfil en Legacy y tu trayectoria en líneas de extrusión y conversión calza exactamente con lo que necesitamos. Estamos por arrancar una línea de embutidos sin gluten y nuestro jefe de planta necesita un mentor con tu experiencia los primeros 4 meses.\n\n¿Podemos agendar una llamada esta semana para que te cuente más?\n\nGracias,\nMariana",
  },
  {
    id: "im2",
    from: "Patricia Castedo",
    role: "Presidencia · Vascal S.A.",
    initials: "PC",
    time: "ayer",
    subject: "Entrevista de Comité — confirmamos para el viernes",
    preview: "Quedamos confirmados para el viernes 16 de mayo a las 15:00. Te llegará el calendar invite hoy. Nos acompañarán Marcelo Antezana…",
    unread: true,
    body: "Don Lorgio, quedamos confirmados para el viernes 16 de mayo a las 15:00 vía Zoom. Te llegará el calendar invite hoy mismo. Nos acompañarán Marcelo Antezana (CFO) y Ana Salinas (Operaciones).\n\nUn placer,\nPatricia",
  },
  {
    id: "im3",
    from: "Roberto Salinas",
    role: "Presidencia · La Merced",
    initials: "RS",
    time: "hace 3 días",
    subject: "¿Estás disponible para una mentoría?",
    preview: "Nuestro nuevo Gerente de Operaciones lleva 60 días en el cargo. Buscamos a alguien con tu experiencia para sesiones quincenales…",
    unread: false,
    body: "Don Lorgio,\n\nNuestro nuevo Gerente de Operaciones lleva 60 días en el cargo y necesita un acompañamiento ejecutivo. Buscamos a alguien con tu experiencia industrial para sesiones quincenales durante 6 meses.\n\nSi te interesa, agendemos una primera conversación.\n\nRoberto",
  },
  {
    id: "im4",
    from: "Equipo Legacy",
    role: "Plataforma · Coordinador",
    initials: "LE",
    time: "hace 5 días",
    subject: "Tu perfil fue visto 47 veces esta semana",
    preview: "Tu perfil tuvo un repunte de visitas tras tu publicación en CAINCO. 3 empresas iniciaron postulaciones desde tu perfil…",
    unread: false,
    body: "Don Lorgio, tu perfil tuvo un repunte de visitas tras tu publicación en CAINCO. 3 empresas iniciaron postulaciones desde tu perfil esta semana. Buen momento para actualizar tu disponibilidad.",
  },
];

// Indicadores ejecutivos (vista Empresa)
const ENTERPRISE_KPIS = {
  programsActive: 3,
  knowledgeDocumented: 128,
  successorsCovered: 0.78, // 78%
  upcomingRetirements: 4,
  investedYTD: 24800,
  rotationAvoided: 180000,
  hoursTransferred: 384,
  satisfactionScore: 4.7,
  // Vista 360 — todo lo que pasa en la empresa
  totalEmployees: 320,
  seniorsActive: 18,           // empleados 55+ activos
  retentionRate: 0.92,         // retención talento clave
  esgScoreYoY: 12,             // +12pts vs 2025
  knowledgeRiskAreas: 2,       // áreas con riesgo alto de fuga
};

// Personas / perfiles de cuenta — datos personales por rol
const USER_ACCOUNTS = {
  senior: {
    name: "Lorgio Saucedo Roca",
    role: "Consultor Senior · Modo 1",
    initials: "LS",
    email: "lorgio.saucedo@flexocruz.bo",
    phone: "+591 700 12 345",
    dob: "14 marzo 1962 (64 a\u00f1os)",
    location: "Santa Cruz de la Sierra, Bolivia",
    nationalId: "CI 3.482.901 SC",
    languages: ["Espa\u00f1ol", "Portugu\u00e9s b\u00e1sico"],
    company: "FlexoCruz S.A.",
    position: "Consultor interno · ex-Gerente de Producci\u00f3n",
    yearsOnPlatform: "3 meses",
    plan: "Senior Premium · USD 35/mes",
    bank: "Banco Mercantil Santa Cruz · cuenta corriente \u2022\u2022\u2022\u2022 4082",
    verified: "Trayectoria verificada por CAINCO · 14 abr 2026",
  },
  empresa: {
    name: "Pablo Salvatierra Pinto",
    role: "CEO · FlexoCruz S.A.",
    initials: "PS",
    email: "p.salvatierra@flexocruz.bo",
    phone: "+591 700 98 712",
    dob: "22 mayo 1968 (57 a\u00f1os)",
    location: "Santa Cruz, Bolivia",
    nationalId: "CI 2.901.554 SC",
    languages: ["Espa\u00f1ol", "Ingl\u00e9s"],
    company: "FlexoCruz S.A. · 320 colaboradores",
    position: "Director Ejecutivo",
    yearsOnPlatform: "6 meses",
    plan: "Enterprise · USD 800/mes",
    bank: "Cuenta corporativa BNB \u2022\u2022\u2022\u2022 7301",
    verified: "Cuenta corporativa verificada · 12 nov 2025",
  },
  hr: {
    name: "Andrea Cu\u00e9llar Vaca",
    role: "Gerente de RRHH · FlexoCruz",
    initials: "AC",
    email: "a.cuellar@flexocruz.bo",
    phone: "+591 700 45 230",
    dob: "3 octubre 1981 (44 a\u00f1os)",
    location: "Santa Cruz, Bolivia",
    nationalId: "CI 4.812.330 SC",
    languages: ["Espa\u00f1ol", "Ingl\u00e9s"],
    company: "FlexoCruz S.A.",
    position: "Gerente de Recursos Humanos y Sostenibilidad",
    yearsOnPlatform: "6 meses · administrador",
    plan: "Cuenta integrada al plan Enterprise",
    bank: "\u2014",
    verified: "Administrador del plan FlexoCruz",
  },
  sucesor: {
    name: "Juan Antelo M\u00e9ndez",
    role: "Sucesor · Jefe de Planta",
    initials: "JA",
    email: "j.antelo@flexocruz.bo",
    phone: "+591 700 87 411",
    dob: "9 enero 1988 (38 a\u00f1os)",
    location: "Santa Cruz, Bolivia",
    nationalId: "CI 7.118.024 SC",
    languages: ["Espa\u00f1ol"],
    company: "FlexoCruz S.A.",
    position: "Jefe de Planta \u2192 Gerente de Producci\u00f3n (sucesor)",
    yearsOnPlatform: "3 meses · sucesor designado",
    plan: "Cuenta integrada al plan Enterprise",
    bank: "\u2014",
    verified: "Sucesor designado por Direcci\u00f3n · 15 mar 2026",
  },
};

window.LegacyData = {
  COMPANIES,
  SENIORS,
  OPPORTUNITIES,
  TRANSFER_PROGRAM,
  MENTORSHIPS,
  RETIREMENT_PIPELINE,
  NOTIFICATIONS,
  BILLING_HISTORY,
  APPLICATIONS,
  ENTERPRISE_KPIS,
  USER_ACCOUNTS,
  INCOMING_CALL_REQUESTS,
  INCOMING_MESSAGES,
};

// Planilla de FlexoCruz · 28 colaboradores representativos
// (la empresa tiene 320 en total; mostramos los líderes y sus equipos)
const EMPLOYEES_RAW = [
  // Dirección
  { id: "e01", name: "Pablo Salvatierra Pinto", role: "Director Ejecutivo (CEO)",        area: "Dirección",     since: "2014",        age: 57, status: "Activo",      manager: "—",                       photo: "PS", critical: true },
  { id: "e02", name: "Andrea Cuéllar Vaca",     role: "Gerente de RRHH y Sostenibilidad", area: "RRHH",          since: "2019",        age: 44, status: "Activo",      manager: "Pablo Salvatierra",       photo: "AC", critical: true },
  { id: "e03", name: "Esther Vaca Roca",        role: "Contralora interna",              area: "Finanzas",      since: "1998",        age: 61, status: "Jubilación Mar 2027", manager: "Pablo Salvatierra", photo: "EV", critical: true },
  { id: "e04", name: "Daniela Suárez Méndez",   role: "Sub-Contralora · sucesora",       area: "Finanzas",      since: "2021",        age: 34, status: "Activo · sucesora",   manager: "Esther Vaca",       photo: "DS", critical: false },

  // Producción
  { id: "e05", name: "Lorgio Saucedo Roca",     role: "Consultor interno (ex-Gerente Producción)", area: "Producción", since: "1986",  age: 64, status: "Jubilación Sep 2026 · en traspaso", manager: "Pablo Salvatierra", photo: "LS", critical: true },
  { id: "e06", name: "Juan Antelo Méndez",      role: "Jefe de Planta · sucesor designado",        area: "Producción", since: "2020",  age: 38, status: "Activo · sucesor",       manager: "Lorgio Saucedo",    photo: "JA", critical: true },
  { id: "e07", name: "Ramiro Soliz Quispe",     role: "Supervisor Línea 1 · Extrusión",  area: "Producción",     since: "2008",       age: 49, status: "Activo",       manager: "Juan Antelo",            photo: "RS", critical: false },
  { id: "e08", name: "Mario Padilla Cossio",    role: "Supervisor Línea 3 · Conversión", area: "Producción",     since: "2012",       age: 41, status: "Activo",       manager: "Juan Antelo",            photo: "MP", critical: false },
  { id: "e09", name: "Verónica Justiniano",     role: "Ingeniera de procesos",           area: "Producción",     since: "2018",       age: 33, status: "Activo",       manager: "Juan Antelo",            photo: "VJ", critical: false },
  { id: "e10", name: "Hernán Aramayo Vargas",   role: "Operador máquina · Línea 2",      area: "Producción",     since: "2010",       age: 52, status: "Activo",       manager: "Ramiro Soliz",           photo: "HA", critical: false },

  // Calidad
  { id: "e11", name: "Hugo Pinto Salvatierra",  role: "Jefe de Calidad",                 area: "Calidad",        since: "1990",       age: 62, status: "Jubilación Jun 2027 · sin sucesor", manager: "Pablo Salvatierra", photo: "HP", critical: true },
  { id: "e12", name: "Liliana Mercado Ortega",  role: "Analista de calidad senior",      area: "Calidad",        since: "2016",       age: 36, status: "Activo",       manager: "Hugo Pinto",             photo: "LM", critical: false },
  { id: "e13", name: "Pablo Rocha Vaca",        role: "Auditor interno ISO 9001",        area: "Calidad",        since: "2019",       age: 31, status: "Activo",       manager: "Hugo Pinto",             photo: "PR", critical: false },

  // Mantenimiento
  { id: "e14", name: "Carlos Rojas Mercado",    role: "Jefe de Mantenimiento",           area: "Mantenimiento",  since: "1992",       age: 63, status: "Jubilación Nov 2026 · sin sucesor", manager: "Pablo Salvatierra", photo: "CR", critical: true },
  { id: "e15", name: "Iván Salinas Roca",       role: "Técnico mecánico senior",         area: "Mantenimiento",  since: "2011",       age: 47, status: "Activo · candidato a sucesor", manager: "Carlos Rojas", photo: "IS", critical: false },
  { id: "e16", name: "Marco Antezana López",    role: "Técnico eléctrico",               area: "Mantenimiento",  since: "2015",       age: 39, status: "Activo",       manager: "Carlos Rojas",           photo: "MA", critical: false },

  // Comercial
  { id: "e17", name: "Marcela Antezana Pinto",  role: "Gerente Comercial",               area: "Comercial",      since: "2025",       age: 39, status: "Activo · onboarding",   manager: "Pablo Salvatierra",   photo: "MA", critical: true },
  { id: "e18", name: "Diego Salvatierra Méndez",role: "KAM · cuentas clave",             area: "Comercial",      since: "2017",       age: 35, status: "Activo",       manager: "Marcela Antezana",       photo: "DS", critical: false },
  { id: "e19", name: "Carolina Vaca Soliz",     role: "Ejecutiva comercial",             area: "Comercial",      since: "2022",       age: 28, status: "Activo",       manager: "Marcela Antezana",       photo: "CV", critical: false },

  // Logística & Almacén
  { id: "e20", name: "Roberto Mercado Pinto",   role: "Jefe de Logística",               area: "Logística",      since: "2008",       age: 50, status: "Activo",       manager: "Pablo Salvatierra",      photo: "RM", critical: false },
  { id: "e21", name: "Soledad Cuéllar Aguilera",role: "Encargada de almacén",            area: "Logística",      since: "2014",       age: 42, status: "Activo",       manager: "Roberto Mercado",        photo: "SC", critical: false },

  // Finanzas (resto)
  { id: "e22", name: "Andrés Padilla Roca",     role: "Contador general",                area: "Finanzas",       since: "2013",       age: 41, status: "Activo",       manager: "Esther Vaca",            photo: "AP", critical: false },
  { id: "e23", name: "Mónica Justiniano Vaca",  role: "Tesorera",                        area: "Finanzas",       since: "2017",       age: 38, status: "Activo",       manager: "Esther Vaca",            photo: "MJ", critical: false },

  // RRHH (resto)
  { id: "e24", name: "Cecilia Rocha Mercado",   role: "Analista de talento",             area: "RRHH",           since: "2020",       age: 32, status: "Activo",       manager: "Andrea Cuéllar",         photo: "CR", critical: false },
  { id: "e25", name: "Fabián Soliz Antelo",     role: "Especialista en bienestar laboral",area: "RRHH",          since: "2022",       age: 29, status: "Activo",       manager: "Andrea Cuéllar",         photo: "FS", critical: false },

  // IT / Sistemas
  { id: "e26", name: "Tatiana Aguilera Pinto",  role: "Jefa de Sistemas",                area: "TI",             since: "2018",       age: 37, status: "Activo",       manager: "Pablo Salvatierra",      photo: "TA", critical: false },
  { id: "e27", name: "Diego Padilla Roca",      role: "Analista de datos",               area: "TI",             since: "2023",       age: 27, status: "Activo",       manager: "Tatiana Aguilera",       photo: "DP", critical: false },

  // Legal / Compliance
  { id: "e28", name: "Renato Salinas Cuéllar",  role: "Asesor legal interno",            area: "Legal",          since: "2016",       age: 45, status: "Activo",       manager: "Pablo Salvatierra",      photo: "RS", critical: false },
];

const EMPLOYEES = EMPLOYEES_RAW;
window.LegacyData.EMPLOYEES = EMPLOYEES;
