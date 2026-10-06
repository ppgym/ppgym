import { useState, useMemo, useEffect } from "react";

const LOGO_YELLOW = "data:image/jpeg;base64,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";
const LOGO_SKULL  = "data:image/jpeg;base64,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";


const today = () => new Date();
const daysBetween = (dateStr) => {
  const target = new Date(dateStr);
  const now = today();
  now.setHours(0,0,0,0); target.setHours(0,0,0,0);
  return Math.round((target - now) / 86400000);
};
const formatDate = (d) => new Date(d).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
const nextPaymentDate = (dueDay) => {
  const now = today();
  const candidate = new Date(now.getFullYear(), now.getMonth(), dueDay);
  if (candidate <= now) candidate.setMonth(candidate.getMonth() + 1);
  return candidate.toISOString().split("T")[0];
};
const whatsappLink = (phone, message) => `https://wa.me/${phone.replace(/\D/g,"")}?text=${encodeURIComponent(message)}`;
const avatarColor = (name) => {
  const colors = ["#f59e0b","#eab308","#d97706","#b45309","#fbbf24","#fcd34d","#92400e","#78350f"];
  let h = 0; for (let c of name) h = (h*31+c.charCodeAt(0))%colors.length;
  return colors[h];
};

const STORAGE_KEY = "ppgym_members";
const MANAGERS_KEY = "ppgym_managers";

const DEFAULT_MANAGERS = [
  { id: "cristiane", name: "Cristiane", password: "1234", isDefault: true },
  { id: "camilo",    name: "Camilo",    password: "1234", isDefault: true },
];
const loadManagers = () => { try { const s=localStorage.getItem(MANAGERS_KEY); if(s) return JSON.parse(s); } catch {} return DEFAULT_MANAGERS; };
const saveManagers = (m) => { try { localStorage.setItem(MANAGERS_KEY, JSON.stringify(m)); } catch {} };

const PLANS = {
  basica:  { label:"Plan Básico",        price:"5.000 CUP", icon:"🏋️", color:"#f59e0b", bg:"#fef3c7", text:"#92400e" },
  premium: { label:"Premium + Personal", price:"$100 USD",  icon:"⭐", color:"#eab308", bg:"#fefce8", text:"#713f12" },
  online:  { label:"Online + Personal",  price:"$100 USD",  icon:"💻", color:"#d97706", bg:"#fffbeb", text:"#78350f" },
};
const STATUS = {
  ok:      { bg:"#d1fae5", text:"#065f46", label:"Al día" },
  soon5:   { bg:"#fef3c7", text:"#92400e", label:"5 días" },
  soon1:   { bg:"#fee2e2", text:"#991b1b", label:"¡Mañana!" },
  overdue: { bg:"#fee2e2", text:"#991b1b", label:"Vencido" },
};
const getStatus = (d) => { const n=daysBetween(d); if(n<0) return "overdue"; if(n===1) return "soon1"; if(n<=5) return "soon5"; return "ok"; };

const SAMPLE = [
  {id:1,name:"Carlos Mendoza",  phone:"5351122334",plan:"premium",dueDay:15,photo:null,notes:"Lunes, miércoles y viernes"},
  {id:2,name:"Lucía Ramírez",   phone:"5351133445",plan:"basica", dueDay:18,photo:null,notes:""},
  {id:3,name:"Diego Torres",    phone:"5351144556",plan:"basica", dueDay:14,photo:null,notes:"Alérgico al látex"},
  {id:4,name:"Valentina Cruz",  phone:"5351155667",plan:"online", dueDay:20,photo:null,notes:"Entrena desde La Habana"},
  {id:5,name:"Mateo Soria",     phone:"5351166778",plan:"premium",dueDay:13,photo:null,notes:""},
];
const loadMembers = () => { try { const s=localStorage.getItem(STORAGE_KEY); if(s) return JSON.parse(s); } catch {} return SAMPLE; };

const Avatar = ({name,photo,size=44}) => {
  const color=avatarColor(name||"?");
  const initials=(name||"?").split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
  return photo
    ? <img src={photo} alt={name} style={{width:size,height:size,borderRadius:"50%",objectFit:"cover",flexShrink:0,border:"2px solid #f59e0b"}}/>
    : <div style={{width:size,height:size,borderRadius:"50%",background:color,color:"#000",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:size*0.36,flexShrink:0,border:"2px solid #f59e0b"}}>{initials}</div>;
};
const PlanBadge = ({plan}) => { const p=PLANS[plan]; return <span style={{fontSize:"0.68rem",fontWeight:700,padding:"2px 8px",borderRadius:20,background:p.bg,color:p.text,whiteSpace:"nowrap"}}>{p.icon} {p.label}</span>; };
const StatusBadge = ({dateStr}) => { const k=getStatus(dateStr); const c=STATUS[k]; return <span style={{fontSize:"0.68rem",fontWeight:700,padding:"2px 8px",borderRadius:20,background:c.bg,color:c.text,whiteSpace:"nowrap"}}>{c.label}</span>; };

const Btn = ({children,variant="primary",small,full,...props}) => {
  const v={primary:{background:"#f59e0b",color:"#000"},ghost:{background:"transparent",color:"#9ca3af",border:"1.5px solid #374151"},green:{background:"#25d366",color:"#fff"},yellow:{background:"#f59e0b",color:"#000"},danger:{background:"#7f1d1d",color:"#fca5a5"},dark:{background:"#1f2937",color:"#f59e0b",border:"1px solid #f59e0b"},red:{background:"#ef4444",color:"#fff"}};
  return <button {...props} style={{padding:small?"0.4rem 0.8rem":"0.65rem 1.2rem",borderRadius:10,fontSize:small?"0.78rem":"0.87rem",fontWeight:800,cursor:"pointer",fontFamily:"inherit",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:5,border:"none",width:full?"100%":undefined,...v[variant],...props.style}}>{children}</button>;
};
const Field = ({label,children}) => <div style={{marginBottom:"1rem"}}><label style={{display:"block",fontSize:"0.72rem",fontWeight:700,color:"#9ca3af",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.05em"}}>{label}</label>{children}</div>;
const inputBase = {width:"100%",padding:"0.65rem 0.9rem",borderRadius:10,border:"1.5px solid #374151",fontSize:"0.9rem",outline:"none",fontFamily:"inherit",boxSizing:"border-box",background:"#1f2937",color:"#fff"};
const Input = (props) => <input {...props} style={{...inputBase,...props.style}}/>;
const Sel = ({children,...props}) => <select {...props} style={{...inputBase}}>{children}</select>;

const Modal = ({title,onClose,children}) => (
  <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:300}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
    <div style={{background:"#111827",borderRadius:"18px 18px 0 0",padding:"1.5rem",width:"100%",maxWidth:500,maxHeight:"92vh",overflowY:"auto",boxShadow:"0 -8px 40px rgba(0,0,0,0.6)",border:"1px solid #374151",borderBottom:"none"}}>
      <div style={{width:40,height:4,background:"#374151",borderRadius:4,margin:"0 auto 1.2rem"}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.2rem"}}>
        <h2 style={{margin:0,fontSize:"1.05rem",fontWeight:900,color:"#f59e0b"}}>{title}</h2>
        <button onClick={onClose} style={{border:"none",background:"#1f2937",borderRadius:8,width:32,height:32,cursor:"pointer",fontSize:18,color:"#9ca3af",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
      </div>
      {children}
    </div>
  </div>
);

const ManagerLogin = ({onSuccess}) => {
  const [selectedId,setSelectedId]=useState("");
  const [pwd,setPwd]=useState("");
  const [error,setError]=useState("");
  const managers=loadManagers();
  const attempt=()=>{
    if(!selectedId){setError("Selecciona un gerente");return;}
    const m=managers.find(m=>m.id===selectedId);
    if(pwd===m.password) onSuccess(m);
    else {setError("Contraseña incorrecta");setPwd("");}
  };
  return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh",padding:"1rem"}}>
      <div style={{background:"#111827",borderRadius:20,padding:"2.5rem 1.8rem",width:"100%",maxWidth:360,textAlign:"center",border:"1px solid #374151"}}>
        <img src={LOGO_SKULL} alt="PP Gym" style={{width:100,height:112,objectFit:"contain",marginBottom:"1rem",filter:"brightness(0) invert(1)"}}/>
        <h2 style={{margin:"0 0 0.3rem",fontWeight:900,color:"#f59e0b",fontSize:"1.3rem"}}>Área del Gerente</h2>
        <p style={{margin:"0 0 1.5rem",color:"#9ca3af",fontSize:"0.85rem"}}>Selecciona tu nombre e ingresa tu contraseña.</p>
        <div style={{display:"flex",gap:10,marginBottom:"1rem"}}>
          {managers.map(m=>(
            <button key={m.id} onClick={()=>{setSelectedId(m.id);setError("");}}
              style={{flex:1,padding:"0.8rem 0.5rem",borderRadius:12,border:`2px solid ${selectedId===m.id?"#f59e0b":"#374151"}`,background:selectedId===m.id?"#1f2937":"transparent",color:selectedId===m.id?"#f59e0b":"#6b7280",fontWeight:800,cursor:"pointer",fontFamily:"inherit",fontSize:"0.88rem",transition:"all 0.15s"}}>
              <div style={{fontSize:"1.4rem",marginBottom:3}}>👤</div>
              {m.name}
              {m.isDefault&&<div style={{fontSize:"0.6rem",color:"#6b7280",marginTop:2}}>contraseña inicial</div>}
            </button>
          ))}
        </div>
        <input type="password" placeholder="Contraseña" value={pwd}
          onChange={e=>{setPwd(e.target.value);setError("");}}
          onKeyDown={e=>e.key==="Enter"&&attempt()}
          style={{...inputBase,fontSize:"1.4rem",textAlign:"center",letterSpacing:"0.3em",marginBottom:"0.6rem",border:`2px solid ${error?"#ef4444":"#374151"}`}}/>
        {error&&<div style={{color:"#ef4444",fontSize:"0.82rem",fontWeight:700,marginBottom:"0.6rem"}}>❌ {error}</div>}
        <button onClick={attempt} style={{width:"100%",padding:"0.85rem",borderRadius:12,border:"none",background:"#f59e0b",color:"#000",fontWeight:900,fontSize:"1rem",cursor:"pointer",fontFamily:"inherit",marginTop:"0.4rem"}}>Entrar</button>
      </div>
    </div>
  );
};

const ChangePassword = ({manager,onSave,onCancel}) => {
  const [current,setCurrent]=useState("");
  const [newPwd,setNewPwd]=useState("");
  const [confirm,setConfirm]=useState("");
  const [error,setError]=useState("");
  const [success,setSuccess]=useState(false);
  const save=()=>{
    if(current!==manager.password){setError("La contraseña actual es incorrecta");return;}
    if(newPwd.length<4){setError("Mínimo 4 caracteres");return;}
    if(newPwd!==confirm){setError("Las contraseñas no coinciden");return;}
    const managers=loadManagers();
    saveManagers(managers.map(m=>m.id===manager.id?{...m,password:newPwd,isDefault:false}:m));
    setSuccess(true);
    setTimeout(()=>onSave({...manager,password:newPwd,isDefault:false}),1200);
  };
  return(
    <Modal title="Cambiar Contraseña" onClose={onCancel}>
      <div style={{textAlign:"center",marginBottom:"1.2rem"}}>
        <div style={{fontSize:"2rem",marginBottom:4}}>👤</div>
        <div style={{fontWeight:900,color:"#f59e0b",fontSize:"1rem"}}>{manager.name}</div>
      </div>
      {success?(
        <div style={{background:"#064e3b",borderRadius:12,padding:"1.2rem",textAlign:"center",color:"#6ee7b7",fontWeight:700}}>✅ ¡Contraseña actualizada!</div>
      ):(
        <>
          <Field label="Contraseña actual"><Input type="password" placeholder="••••" value={current} onChange={e=>{setCurrent(e.target.value);setError("");}}/></Field>
          <Field label="Nueva contraseña"><Input type="password" placeholder="Mínimo 4 caracteres" value={newPwd} onChange={e=>{setNewPwd(e.target.value);setError("");}}/></Field>
          <Field label="Confirmar nueva contraseña"><Input type="password" placeholder="Repite la nueva contraseña" value={confirm} onChange={e=>{setConfirm(e.target.value);setError("");}}/></Field>
          {error&&<div style={{color:"#ef4444",fontSize:"0.82rem",fontWeight:700,marginBottom:"0.8rem"}}>❌ {error}</div>}
          <div style={{display:"flex",gap:8}}>
            <Btn variant="ghost" onClick={onCancel} style={{flex:1}}>Cancelar</Btn>
            <Btn onClick={save} style={{flex:1}}>Guardar</Btn>
          </div>
        </>
      )}
    </Modal>
  );
};

export default function App() {
  const [tab,setTab]=useState("alumnos");
  const [members,setMembers]=useState(loadMembers);
  const [search,setSearch]=useState("");
  const [filterPlan,setFilterPlan]=useState("todos");
  const [filterStatus,setFilterStatus]=useState("todos");
  const [showModal,setShowModal]=useState(false);
  const [showDetail,setShowDetail]=useState(null);
  const [editMember,setEditMember]=useState(null);
  const [form,setForm]=useState({name:"",phone:"",plan:"basica",dueDay:1,notes:"",photo:null});
  const [currentManager,setCurrentManager]=useState(null);
  const [showChangePwd,setShowChangePwd]=useState(false);
  const [saveIndicator,setSaveIndicator]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const setF=(k,v)=>setForm(f=>({...f,[k]:v}));

  useEffect(()=>{
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(members));setSaveIndicator(true);const t=setTimeout(()=>setSaveIndicator(false),2000);return()=>clearTimeout(t);}catch{}
  },[members]);

  const alertas=useMemo(()=>members.filter(m=>{const d=daysBetween(nextPaymentDate(m.dueDay));return d===5||d===1||d<0;}),[members]);
  const filtered=useMemo(()=>members.filter(m=>{
    const ms=m.name.toLowerCase().includes(search.toLowerCase())||m.phone.includes(search);
    const mp=filterPlan==="todos"||m.plan===filterPlan;
    const mk=filterStatus==="todos"||getStatus(nextPaymentDate(m.dueDay))===filterStatus;
    return ms&&mp&&mk;
  }),[members,search,filterPlan,filterStatus]);

  const stats=useMemo(()=>({
    total:members.length,basica:members.filter(m=>m.plan==="basica").length,
    premium:members.filter(m=>m.plan==="premium").length,online:members.filter(m=>m.plan==="online").length,
    cup:members.filter(m=>m.plan==="basica").length*5000,
    usd:(members.filter(m=>m.plan==="premium").length+members.filter(m=>m.plan==="online").length)*100,
  }),[members]);

  const openAdd=()=>{setEditMember(null);setForm({name:"",phone:"",plan:"basica",dueDay:1,notes:"",photo:null});setShowModal(true);};
  const openEdit=(m)=>{setEditMember(m);setForm({name:m.name,phone:m.phone,plan:m.plan,dueDay:m.dueDay,notes:m.notes,photo:m.photo});setShowModal(true);setShowDetail(null);};
  const saveMember=()=>{
    if(!form.name||!form.phone)return;
    if(editMember)setMembers(ms=>ms.map(m=>m.id===editMember.id?{...m,...form}:m));
    else setMembers(ms=>[...ms,{id:Date.now(),...form}]);
    setShowModal(false);
  };
  const deleteMember=(id)=>{setMembers(ms=>ms.filter(m=>m.id!==id));setShowDetail(null);};
  const handlePhoto=(e)=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setF("photo",ev.target.result);r.readAsDataURL(f);};

  const msg5=(m)=>`🏋️ *PP GYM - PUERTO PRÍNCIPE*\n\n¡Buenas tardes, ${m.name.split(" ")[0]}! 👋\n\nEl PP Gym se complace en informarle que dentro de *5 días* corresponde el pago de su mensualidad.\n\n📋 *Plan:* ${PLANS[m.plan].label}\n💳 *Monto:* ${PLANS[m.plan].price}\n📅 *Fecha:* ${formatDate(nextPaymentDate(m.dueDay))}\n\nAgradecemos su puntualidad y *gracias* por su preferencia. 💪\n\n¡Seguimos trabajando *juntos* por sus resultados!`;
  const msg1=(m)=>`🏋️ *PP GYM - PUERTO PRÍNCIPE*\n\n¡Buenas tardes, ${m.name.split(" ")[0]}! 👋\n\nEn PP Gym queremos recordarle que *mañana* corresponde el pago de su mensualidad.\n\n📋 *Plan:* ${PLANS[m.plan].label}\n💳 *Monto:* ${PLANS[m.plan].price}\n📅 *Fecha:* ${formatDate(nextPaymentDate(m.dueDay))}\n\nAgradecemos su *puntualidad* y, sobre todo, su *confianza* en nosotros. 💪\n\n¡Seguimos trabajando *juntos* por sus resultados!`;

  const nav=[{id:"alumnos",label:"Alumnos",icon:"👥"},{id:"alertas",label:"Alertas",icon:"🔔",badge:alertas.length},{id:"mensajes",label:"Mensajes",icon:"💬"},{id:"ingresos",label:"Ingresos",icon:"💰"}];
  const goTo=(id)=>{setTab(id);setMenuOpen(false);};

  const SidebarLogo = () => (
    <div style={{textAlign:"center",marginBottom:"1.5rem",padding:"0.8rem",background:"#000",borderRadius:14,border:"2px solid #f59e0b"}}>
      <img src={LOGO_YELLOW} alt="PP Gym" style={{width:80,height:80,objectFit:"contain",display:"block",margin:"0 auto 4px"}}/>
      <div style={{height:2,background:"linear-gradient(90deg,transparent,#f59e0b,transparent)",margin:"4px 0"}}/>
      <div style={{fontSize:"0.55rem",color:"#6b7280",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase"}}>Sistema de Gestión</div>
    </div>
  );

  return(
    <div style={{fontFamily:"'Barlow','Segoe UI',sans-serif",minHeight:"100vh",background:"#0f172a",color:"#fff"}}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>
      <style>{`
        *{box-sizing:border-box;}
        @media(max-width:768px){
          .sidebar{display:none!important;}
          .main-content{margin-left:0!important;padding:1rem!important;padding-bottom:5rem!important;padding-top:4.5rem!important;}
          .top-bar{display:flex!important;}
          .desktop-header{display:none!important;}
          .mobile-header{display:flex!important;}
          .cards-grid{grid-template-columns:1fr 1fr!important;}
          .msg-grid{grid-template-columns:1fr!important;}
          .stats-grid{grid-template-columns:1fr 1fr!important;}
          .filter-row{flex-direction:column!important;}
          .alert-row{flex-direction:column!important;align-items:flex-start!important;}
          .alert-btns{width:100%!important;display:grid!important;grid-template-columns:1fr 1fr!important;}
          .member-row{flex-wrap:wrap!important;}
          .member-btns{width:100%!important;display:grid!important;grid-template-columns:1fr 1fr!important;}
          .bottom-nav{display:flex!important;}
        }
        @media(max-width:400px){
          .cards-grid{grid-template-columns:1fr!important;}
          .stats-grid{grid-template-columns:1fr!important;}
        }
      `}</style>

      {/* TOP BAR mobile */}
      <div className="top-bar" style={{display:"none",position:"fixed",top:0,left:0,right:0,zIndex:100,background:"#111827",borderBottom:"1px solid #1f2937",padding:"0.6rem 1rem",alignItems:"center",justifyContent:"space-between"}}>
        <img src={LOGO_YELLOW} alt="PP Gym" style={{height:36,objectFit:"contain"}}/>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {saveIndicator&&<span style={{fontSize:"0.72rem",color:"#6ee7b7",fontWeight:700}}>✅</span>}
          {alertas.length>0&&<span style={{background:"#ef4444",color:"#fff",borderRadius:20,fontSize:"0.72rem",fontWeight:800,padding:"2px 8px"}}>{alertas.length}</span>}
          <button onClick={()=>setMenuOpen(v=>!v)} style={{background:"#1f2937",border:"1px solid #374151",borderRadius:8,padding:"0.4rem 0.7rem",color:"#fff",cursor:"pointer",fontSize:"1.1rem"}}>{menuOpen?"✕":"☰"}</button>
        </div>
      </div>

      {menuOpen&&(
        <div style={{position:"fixed",top:53,left:0,right:0,zIndex:99,background:"#111827",borderBottom:"1px solid #374151",padding:"0.5rem"}}>
          {nav.map(item=>(
            <button key={item.id} onClick={()=>goTo(item.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"0.8rem 1rem",borderRadius:10,border:"none",cursor:"pointer",fontSize:"0.95rem",fontWeight:800,fontFamily:"inherit",marginBottom:2,background:tab===item.id?"#f59e0b":"transparent",color:tab===item.id?"#000":"#9ca3af"}}>
              {item.icon} {item.label}
              {item.id==="ingresos"&&!currentManager&&<span style={{marginLeft:"auto"}}>🔒</span>}
              {item.badge>0&&<span style={{marginLeft:"auto",background:"#ef4444",color:"#fff",borderRadius:20,fontSize:"0.72rem",padding:"1px 7px"}}>{item.badge}</span>}
            </button>
          ))}
        </div>
      )}

      {/* SIDEBAR desktop */}
      <aside className="sidebar" style={{width:240,background:"#111827",display:"flex",flexDirection:"column",padding:"1.5rem 1rem",position:"fixed",top:0,left:0,bottom:0,zIndex:10,borderRight:"1px solid #1f2937"}}>
        <SidebarLogo/>
        {nav.map(item=>(
          <button key={item.id} onClick={()=>setTab(item.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"0.65rem 1rem",borderRadius:10,border:"none",cursor:"pointer",textAlign:"left",fontSize:"0.88rem",fontWeight:800,fontFamily:"inherit",marginBottom:4,background:tab===item.id?"#f59e0b":"transparent",color:tab===item.id?"#000":"#9ca3af"}}>
            {item.icon} {item.label}
            {item.id==="ingresos"&&!currentManager&&<span style={{marginLeft:"auto",fontSize:"0.75rem"}}>🔒</span>}
            {item.badge>0&&<span style={{marginLeft:"auto",background:"#ef4444",color:"#fff",borderRadius:20,fontSize:"0.68rem",fontWeight:800,padding:"1px 7px"}}>{item.badge}</span>}
          </button>
        ))}
        <div style={{flex:1}}/>
        <div style={{background:saveIndicator?"#064e3b":"#1f2937",borderRadius:10,padding:"0.55rem 1rem",marginBottom:"0.8rem",display:"flex",alignItems:"center",gap:8,transition:"background 0.4s",border:"1px solid #374151"}}>
          <span>{saveIndicator?"✅":"💾"}</span>
          <span style={{fontSize:"0.73rem",fontWeight:700,color:saveIndicator?"#6ee7b7":"#6b7280"}}>{saveIndicator?"¡Datos guardados!":"Guardado automático"}</span>
        </div>
        <div style={{background:"#1f2937",borderRadius:12,padding:"0.9rem",marginBottom:"0.8rem",border:"1px solid #374151"}}>
          <div style={{fontSize:"0.62rem",color:"#f59e0b",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.7rem"}}>Planes y Precios</div>
          {Object.entries(PLANS).map(([k,p])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <span style={{fontSize:"0.74rem",color:"#9ca3af"}}>{p.icon} {p.label}</span>
              <span style={{fontSize:"0.74rem",fontWeight:800,color:"#f59e0b"}}>{p.price}</span>
            </div>
          ))}
        </div>
        <div style={{background:"#1f2937",borderRadius:12,padding:"0.9rem",border:"1px solid #374151"}}>
          <div style={{fontSize:"0.62rem",color:"#f59e0b",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.7rem"}}>Resumen</div>
          {[{l:"Total",v:stats.total},{l:"Básico",v:stats.basica},{l:"Premium",v:stats.premium},{l:"Online",v:stats.online}].map(s=>(
            <div key={s.l} style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontSize:"0.76rem",color:"#9ca3af"}}>{s.l}</span>
              <span style={{fontSize:"0.76rem",fontWeight:900,color:"#fff"}}>{s.v}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* BOTTOM NAV mobile */}
      <nav className="bottom-nav" style={{display:"none",position:"fixed",bottom:0,left:0,right:0,zIndex:100,background:"#111827",borderTop:"1px solid #1f2937",padding:"0.4rem 0"}}>
        {nav.map(item=>(
          <button key={item.id} onClick={()=>goTo(item.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"0.4rem",border:"none",cursor:"pointer",background:"transparent",position:"relative"}}>
            <span style={{fontSize:"1.3rem"}}>{item.icon}</span>
            <span style={{fontSize:"0.6rem",fontWeight:700,color:tab===item.id?"#f59e0b":"#6b7280"}}>{item.label}</span>
            {tab===item.id&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:24,height:2,background:"#f59e0b",borderRadius:2}}/>}
            {item.badge>0&&<div style={{position:"absolute",top:2,right:"20%",background:"#ef4444",color:"#fff",borderRadius:20,fontSize:"0.6rem",fontWeight:800,padding:"0px 5px",minWidth:16,textAlign:"center"}}>{item.badge}</div>}
          </button>
        ))}
      </nav>

      {/* MAIN */}
      <div className="main-content" style={{marginLeft:240,padding:"2rem 2.5rem"}}>

        <div className="desktop-header" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1.8rem"}}>
          <div>
            <h1 style={{margin:0,fontSize:"1.7rem",fontWeight:900,color:"#f59e0b"}}>
              {{alumnos:"Alumnos",alertas:"Alertas de Pago",mensajes:"Mensajes WhatsApp",ingresos:"Ingresos"}[tab]}
            </h1>
            <p style={{margin:"4px 0 0",color:"#6b7280",fontSize:"0.84rem",fontWeight:500}}>
              {tab==="alumnos"&&`${filtered.length} alumno${filtered.length!==1?"s":""} encontrado${filtered.length!==1?"s":""}`}
              {tab==="alertas"&&`${alertas.length} alumnos requieren atención`}
              {tab==="mensajes"&&"Recordatorios — PP Gym Puerto Príncipe"}
              {tab==="ingresos"&&(currentManager?`Sesión: ${currentManager.name}`:"Acceso restringido")}
            </p>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            {tab==="alumnos"&&<Btn onClick={openAdd}>+ Nuevo Alumno</Btn>}
            {tab==="ingresos"&&currentManager&&(<><Btn variant="dark" small onClick={()=>setShowChangePwd(true)}>🔑 Mi contraseña</Btn><Btn variant="ghost" small onClick={()=>setCurrentManager(null)}>🔒 Salir</Btn></>)}
          </div>
        </div>

        <div className="mobile-header" style={{display:"none",marginBottom:"1rem",justifyContent:"space-between",alignItems:"center"}}>
          <h2 style={{margin:0,fontSize:"1.2rem",fontWeight:900,color:"#f59e0b"}}>
            {{alumnos:"👥 Alumnos",alertas:"🔔 Alertas",mensajes:"💬 Mensajes",ingresos:"💰 Ingresos"}[tab]}
          </h2>
          <div style={{display:"flex",gap:6}}>
            {tab==="alumnos"&&<Btn onClick={openAdd} small>+ Nuevo</Btn>}
            {tab==="ingresos"&&currentManager&&(<><Btn variant="dark" small onClick={()=>setShowChangePwd(true)}>🔑</Btn><Btn variant="ghost" small onClick={()=>setCurrentManager(null)}>🔒</Btn></>)}
          </div>
        </div>

        {/* ALUMNOS */}
        {tab==="alumnos"&&(<>
          <div className="filter-row" style={{display:"flex",gap:8,marginBottom:"1.2rem",flexWrap:"wrap"}}>
            <input placeholder="🔍 Buscar..." value={search} onChange={e=>setSearch(e.target.value)} style={{...inputBase,flex:1,minWidth:160,padding:"0.6rem 0.9rem"}}/>
            <select value={filterPlan} onChange={e=>setFilterPlan(e.target.value)} style={{...inputBase,flex:1,minWidth:140}}>
              <option value="todos">Todos los planes</option>
              <option value="basica">🏋️ Básico</option>
              <option value="premium">⭐ Premium</option>
              <option value="online">💻 Online</option>
            </select>
            <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={{...inputBase,flex:1,minWidth:130}}>
              <option value="todos">Todos</option>
              <option value="ok">Al día</option>
              <option value="soon5">5 días</option>
              <option value="soon1">Mañana</option>
              <option value="overdue">Vencidos</option>
            </select>
          </div>
          <div className="cards-grid" style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"0.8rem"}}>
            {filtered.map(m=>{
              const payDate=nextPaymentDate(m.dueDay);const d=daysBetween(payDate);const p=PLANS[m.plan];
              return(<div key={m.id} onClick={()=>setShowDetail(m)} style={{background:"#111827",borderRadius:14,padding:"1rem",cursor:"pointer",border:"1px solid #1f2937",borderTop:`3px solid ${p.color}`,transition:"all 0.15s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor="#f59e0b"}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#1f2937";e.currentTarget.style.borderTopColor=p.color;}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:"0.8rem"}}>
                  <Avatar name={m.name} photo={m.photo} size={42}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:900,fontSize:"0.9rem",color:"#fff",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{m.name}</div>
                    <div style={{fontSize:"0.72rem",color:"#6b7280"}}>📱 {m.phone}</div>
                  </div>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:4}}>
                  <PlanBadge plan={m.plan}/><StatusBadge dateStr={payDate}/>
                </div>
                <div style={{fontSize:"0.72rem",color:"#6b7280",fontWeight:600,marginTop:"0.5rem"}}>
                  📅 {d>=0?`en ${d} día${d!==1?"s":""}`:`vencido hace ${Math.abs(d)}d`}
                </div>
              </div>);
            })}
            {filtered.length===0&&<div style={{gridColumn:"1/-1",textAlign:"center",padding:"2.5rem",color:"#6b7280"}}>No se encontraron alumnos</div>}
          </div>
        </>)}

        {/* ALERTAS */}
        {tab==="alertas"&&(
          <div style={{display:"flex",flexDirection:"column",gap:"0.8rem"}}>
            {alertas.length===0&&<div style={{background:"#064e3b",borderRadius:14,padding:"1.5rem",textAlign:"center",color:"#6ee7b7",fontWeight:700,border:"1px solid #065f46"}}>✅ ¡Todo en orden! No hay alertas.</div>}
            {alertas.map(m=>{
              const payDate=nextPaymentDate(m.dueDay);const d=daysBetween(payDate);const p=PLANS[m.plan];
              return(<div key={m.id} className="alert-row" style={{background:"#111827",borderRadius:14,padding:"1rem 1.2rem",border:"1px solid #1f2937",borderLeft:`4px solid ${d<0?"#ef4444":"#f59e0b"}`,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                <Avatar name={m.name} photo={m.photo} size={42}/>
                <div style={{flex:1,minWidth:150}}>
                  <div style={{fontWeight:900,color:"#fff",fontSize:"0.9rem"}}>{m.name}</div>
                  <div style={{fontSize:"0.75rem",color:"#6b7280",marginTop:1}}>{d<0?`⚠️ Vencido hace ${Math.abs(d)}d`:`📅 Vence ${d===1?"mañana":`en ${d}d`} — ${formatDate(payDate)}`}</div>
                  <div style={{marginTop:4,display:"flex",gap:5,flexWrap:"wrap"}}><PlanBadge plan={m.plan}/><span style={{fontSize:"0.68rem",fontWeight:700,color:"#f59e0b"}}>💳 {p.price}</span></div>
                </div>
                <div className="alert-btns" style={{display:"flex",gap:6}}>
                  <a href={whatsappLink(m.phone,msg5(m))} target="_blank" rel="noreferrer"><Btn variant="green" small full>💬 5 días</Btn></a>
                  <a href={whatsappLink(m.phone,msg1(m))} target="_blank" rel="noreferrer"><Btn variant="yellow" small full>⚠️ Mañana</Btn></a>
                </div>
              </div>);
            })}
          </div>
        )}

        {/* MENSAJES */}
        {tab==="mensajes"&&(
          <div>
            <div style={{background:"#111827",borderRadius:14,padding:"1rem 1.2rem",marginBottom:"1.2rem",border:"1px solid #374151",display:"flex",gap:12}}>
              <div style={{fontSize:"1.3rem"}}>📌</div>
              <div>
                <div style={{fontWeight:800,color:"#f59e0b",fontSize:"0.88rem",marginBottom:3}}>¿Cómo enviar?</div>
                <div style={{fontSize:"0.8rem",color:"#9ca3af",lineHeight:1.7}}>
                  1. Toca el botón de WhatsApp — el mensaje ya está escrito.<br/>
                  2. Adjunta la imagen: <span style={{color:"#f59e0b",fontWeight:700}}>5 días</span> → imagen "5 DÍAS" · <span style={{color:"#fff",fontWeight:700}}>Mañana</span> → imagen "MAÑANA"<br/>
                  3. ¡Envía! ✅
                </div>
              </div>
            </div>
            <div className="msg-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1.5rem"}}>
              {[{title:"5 días antes",icon:"📅",color:"#f59e0b",text:msg5(members[0]||SAMPLE[0])},{title:"1 día antes",icon:"⚠️",color:"#ef4444",text:msg1(members[0]||SAMPLE[0])}].map(msg=>(
                <div key={msg.title} style={{background:"#111827",borderRadius:14,padding:"1.2rem",border:"1px solid #374151",borderTop:`3px solid ${msg.color}`}}>
                  <div style={{fontWeight:900,fontSize:"0.88rem",color:msg.color,marginBottom:"0.5rem"}}>{msg.icon} Aviso {msg.title}</div>
                  <div style={{background:"#0f172a",borderRadius:8,padding:"0.4rem 0.7rem",fontSize:"0.7rem",color:"#f59e0b",fontWeight:700,marginBottom:"0.7rem",display:"inline-block"}}>📎 Adjuntar imagen</div>
                  <div style={{background:"#1f2937",borderRadius:8,padding:"0.8rem",fontSize:"0.76rem",color:"#d1d5db",lineHeight:1.65,whiteSpace:"pre-line"}}>{msg.text}</div>
                </div>
              ))}
            </div>
            <h3 style={{fontWeight:900,color:"#f59e0b",margin:"0 0 0.8rem",fontSize:"1rem"}}>Enviar a alumno específico</h3>
            <div style={{display:"flex",flexDirection:"column",gap:"0.6rem"}}>
              {members.map(m=>{
                const p=PLANS[m.plan];
                return(<div key={m.id} className="member-row" style={{background:"#111827",borderRadius:12,padding:"0.8rem 1rem",border:"1px solid #1f2937",display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                  <Avatar name={m.name} photo={m.photo} size={36}/>
                  <div style={{flex:1,minWidth:120}}>
                    <div style={{fontWeight:800,fontSize:"0.88rem",color:"#fff"}}>{m.name}</div>
                    <div style={{fontSize:"0.72rem",color:"#6b7280"}}>{p.icon} {p.label} · {p.price}</div>
                  </div>
                  <StatusBadge dateStr={nextPaymentDate(m.dueDay)}/>
                  <div className="member-btns" style={{display:"flex",gap:5}}>
                    <a href={whatsappLink(m.phone,msg5(m))} target="_blank" rel="noreferrer"><Btn variant="green" small>💬 5d</Btn></a>
                    <a href={whatsappLink(m.phone,msg1(m))} target="_blank" rel="noreferrer"><Btn variant="yellow" small>⚠️ 1d</Btn></a>
                  </div>
                </div>);
              })}
            </div>
          </div>
        )}

        {/* INGRESOS */}
        {tab==="ingresos"&&(
          currentManager?(
            <div>
              <div style={{background:"#1f2937",borderRadius:14,padding:"1rem 1.2rem",marginBottom:"1.2rem",border:"1px solid #374151",display:"flex",alignItems:"center",gap:12}}>
                <div style={{width:40,height:40,borderRadius:"50%",background:"#f59e0b",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:"1rem",color:"#000",flexShrink:0}}>{currentManager.name[0]}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:800,color:"#fff",fontSize:"0.9rem"}}>Gerente: {currentManager.name}</div>
                  <div style={{fontSize:"0.75rem",color:"#6b7280"}}>{currentManager.isDefault?"⚠️ Estás usando la contraseña inicial — cámbiala":"✅ Contraseña personalizada activa"}</div>
                </div>
                {currentManager.isDefault&&<Btn variant="red" small onClick={()=>setShowChangePwd(true)}>🔑 Cambiar</Btn>}
              </div>
              <div className="stats-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0.8rem",marginBottom:"1.2rem"}}>
                {[{label:"Básico",value:stats.basica,sub:`${(stats.basica*5000).toLocaleString()} CUP/mes`,color:"#f59e0b",icon:"🏋️"},{label:"Premium",value:stats.premium,sub:`$${(stats.premium*100).toLocaleString()} USD/mes`,color:"#eab308",icon:"⭐"},{label:"Online",value:stats.online,sub:`$${(stats.online*100).toLocaleString()} USD/mes`,color:"#d97706",icon:"💻"}].map(card=>(
                  <div key={card.label} style={{background:"#111827",borderRadius:14,padding:"1.1rem",border:"1px solid #374151",borderTop:`3px solid ${card.color}`}}>
                    <div style={{fontSize:"1.5rem",marginBottom:5}}>{card.icon}</div>
                    <div style={{fontWeight:900,fontSize:"1.3rem",color:"#fff"}}>{card.value}</div>
                    <div style={{fontSize:"0.72rem",color:"#6b7280",marginTop:1}}>{card.label}</div>
                    <div style={{marginTop:"0.6rem",fontWeight:900,fontSize:"0.88rem",color:card.color}}>{card.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{background:"#000",borderRadius:14,padding:"1.5rem",marginBottom:"1.2rem",border:"2px solid #f59e0b",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
                <img src={LOGO_SKULL} alt="PP Gym" style={{height:60,objectFit:"contain",filter:"brightness(0) invert(1)",opacity:0.15,position:"absolute"}} />
                <div style={{flex:1}}>
                  <div style={{fontSize:"0.68rem",color:"#f59e0b",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"0.8rem"}}>Total estimado mensual</div>
                  <div style={{display:"flex",gap:"1.5rem",flexWrap:"wrap",alignItems:"center"}}>
                    <div>
                      <div style={{fontSize:"1.6rem",fontWeight:900,color:"#f59e0b"}}>{stats.cup.toLocaleString()} CUP</div>
                      <div style={{fontSize:"0.75rem",color:"#6b7280",marginTop:1}}>Plan Básico</div>
                    </div>
                    <div style={{width:1,background:"#374151",alignSelf:"stretch",minHeight:40}}/>
                    <div>
                      <div style={{fontSize:"1.6rem",fontWeight:900,color:"#fff"}}>${stats.usd.toLocaleString()} USD</div>
                      <div style={{fontSize:"0.75rem",color:"#6b7280",marginTop:1}}>Premium + Online</div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{background:"#111827",borderRadius:14,padding:"1.2rem",border:"1px solid #374151",overflowX:"auto"}}>
                <h3 style={{margin:"0 0 0.8rem",fontWeight:900,color:"#f59e0b",fontSize:"0.95rem"}}>Detalle por alumno</h3>
                <table style={{width:"100%",borderCollapse:"collapse",minWidth:360}}>
                  <thead><tr style={{background:"#1f2937"}}>
                    {["Alumno","Plan","Monto","Día"].map(h=><th key={h} style={{padding:"0.6rem 0.8rem",textAlign:"left",fontSize:"0.68rem",fontWeight:700,color:"#f59e0b",textTransform:"uppercase",letterSpacing:"0.05em"}}>{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {members.map(m=>{const p=PLANS[m.plan];return(
                      <tr key={m.id} style={{borderTop:"1px solid #1f2937"}}>
                        <td style={{padding:"0.7rem 0.8rem"}}><div style={{display:"flex",alignItems:"center",gap:7}}><Avatar name={m.name} photo={m.photo} size={26}/><span style={{fontWeight:700,fontSize:"0.82rem",color:"#fff"}}>{m.name}</span></div></td>
                        <td style={{padding:"0.7rem 0.8rem"}}><PlanBadge plan={m.plan}/></td>
                        <td style={{padding:"0.7rem 0.8rem",fontWeight:900,color:"#f59e0b",fontSize:"0.85rem"}}>{p.price}</td>
                        <td style={{padding:"0.7rem 0.8rem",fontSize:"0.8rem",color:"#6b7280"}}>Día {m.dueDay}</td>
                      </tr>
                    );})}
                  </tbody>
                </table>
              </div>
            </div>
          ):<ManagerLogin onSuccess={(m)=>setCurrentManager(m)}/>
        )}
      </div>

      {/* MODAL ALUMNO */}
      {showModal&&(
        <Modal title={editMember?"Editar Alumno":"Nuevo Alumno"} onClose={()=>setShowModal(false)}>
          <Field label="Foto"><div style={{display:"flex",alignItems:"center",gap:12}}><Avatar name={form.name||"?"} photo={form.photo} size={56}/><label style={{cursor:"pointer",background:"#1f2937",borderRadius:8,padding:"0.5rem 1rem",fontSize:"0.82rem",fontWeight:700,color:"#f59e0b",border:"1px solid #374151"}}>📷 Subir foto<input type="file" accept="image/*" onChange={handlePhoto} style={{display:"none"}}/></label></div></Field>
          <Field label="Nombre completo *"><Input placeholder="Ej: Carlos Mendoza" value={form.name} onChange={e=>setF("name",e.target.value)}/></Field>
          <Field label="Teléfono WhatsApp *"><Input placeholder="Ej: 5351122334" value={form.phone} onChange={e=>setF("phone",e.target.value)} type="tel"/><div style={{fontSize:"0.7rem",color:"#6b7280",marginTop:4}}>Cuba: 53 + número (ej: 5351122334)</div></Field>
          <Field label="Plan"><Sel value={form.plan} onChange={e=>setF("plan",e.target.value)}><option value="basica">🏋️ Plan Básico — 5.000 CUP/mes</option><option value="premium">⭐ Premium + Personal — $100 USD/mes</option><option value="online">💻 Online + Personal — $100 USD/mes</option></Sel></Field>
          <Field label="Día de vencimiento"><Sel value={form.dueDay} onChange={e=>setF("dueDay",Number(e.target.value))}>{Array.from({length:28},(_,i)=>i+1).map(d=><option key={d} value={d}>Día {d} de cada mes</option>)}</Sel></Field>
          <Field label="Notas (opcional)"><textarea value={form.notes} onChange={e=>setF("notes",e.target.value)} placeholder="Horarios, observaciones..." style={{...inputBase,resize:"vertical",minHeight:65,fontSize:"0.87rem"}}/></Field>
          <div style={{display:"flex",gap:8,justifyContent:"flex-end",marginTop:"0.5rem"}}><Btn variant="ghost" onClick={()=>setShowModal(false)}>Cancelar</Btn><Btn onClick={saveMember}>{editMember?"Guardar":"Agregar alumno"}</Btn></div>
        </Modal>
      )}

      {/* MODAL DETALLE */}
      {showDetail&&(()=>{
        const m=showDetail;const p=PLANS[m.plan];const payDate=nextPaymentDate(m.dueDay);const d=daysBetween(payDate);
        return(<Modal title="Perfil del Alumno" onClose={()=>setShowDetail(null)}>
          <div style={{textAlign:"center",marginBottom:"1.2rem"}}>
            <Avatar name={m.name} photo={m.photo} size={72}/>
            <div style={{fontWeight:900,fontSize:"1.1rem",color:"#fff",marginTop:8}}>{m.name}</div>
            <div style={{marginTop:5,display:"flex",gap:5,justifyContent:"center",flexWrap:"wrap"}}><PlanBadge plan={m.plan}/><StatusBadge dateStr={payDate}/></div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:"1rem"}}>
            {[{icon:"📱",label:"Teléfono",value:m.phone},{icon:"💳",label:"Plan",value:`${p.label} — ${p.price}`},{icon:"📅",label:"Próximo pago",value:`${formatDate(payDate)} (${d>=0?`en ${d}d`:` vencido hace ${Math.abs(d)}d`})`}].map(row=>(
              <div key={row.label} style={{display:"flex",gap:10,alignItems:"center",padding:"0.6rem 0.9rem",background:"#1f2937",borderRadius:10}}>
                <span style={{fontSize:"1rem"}}>{row.icon}</span>
                <div><div style={{fontSize:"0.68rem",color:"#6b7280",fontWeight:700}}>{row.label}</div><div style={{fontSize:"0.85rem",fontWeight:700,color:"#fff"}}>{row.value}</div></div>
              </div>
            ))}
            {m.notes&&<div style={{padding:"0.6rem 0.9rem",background:"#1f2937",borderRadius:10,fontSize:"0.82rem",color:"#f59e0b",border:"1px solid #374151"}}>📝 {m.notes}</div>}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:"0.8rem"}}>
            <a href={whatsappLink(m.phone,msg5(m))} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}><Btn variant="green" full>💬 Aviso 5 días (imagen "5 DÍAS")</Btn></a>
            <a href={whatsappLink(m.phone,msg1(m))} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}><Btn variant="yellow" full>⚠️ Aviso mañana (imagen "MAÑANA")</Btn></a>
          </div>
          <div style={{display:"flex",gap:7}}><Btn variant="ghost" onClick={()=>openEdit(m)} style={{flex:1}}>✏️ Editar</Btn><Btn variant="danger" onClick={()=>{if(window.confirm("¿Eliminar este alumno?"))deleteMember(m.id);}} style={{flex:1}}>🗑️ Eliminar</Btn></div>
        </Modal>);
      })()}

      {showChangePwd&&currentManager&&<ChangePassword manager={currentManager} onSave={(u)=>{setCurrentManager(u);setShowChangePwd(false);}} onCancel={()=>setShowChangePwd(false)}/>}
    </div>
  );
}
