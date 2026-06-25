import { useState, useEffect, useRef } from "react";

/* ─── THEME ────────────────────────────────────────────────────── */
const C = {
  bg:          "#050510",
  bgDeep:      "#03030a",
  glass:       "rgba(255,255,255,0.035)",
  glassHov:    "rgba(255,255,255,0.06)",
  border:      "rgba(255,255,255,0.07)",
  borderHov:   "rgba(168,85,247,0.55)",
  violet:      "#a855f7",
  violetSoft:  "rgba(168,85,247,0.14)",
  violetGlow:  "rgba(168,85,247,0.35)",
  pink:        "#ec4899",
  pinkSoft:    "rgba(236,72,153,0.12)",
  cyan:        "#22d3ee",
  cyanSoft:    "rgba(34,211,238,0.1)",
  teal:        "#2dd4bf",
  text:        "#f0f4ff",
  muted:       "#94a3b8",
  dim:         "#475569",
  green:       "#4ade80",
  amber:       "#fbbf24",
};

/* ─── DATA ──────────────────────────────────────────────────────── */
const SKILLS = [
  { name:"Python",          pct:85, color:C.violet },
  { name:"SQL / Oracle",    pct:80, color:C.cyan   },
  { name:"C / C++",         pct:75, color:C.teal   },
  { name:"HTML / CSS",      pct:90, color:C.amber  },
  { name:".NET / C#",       pct:65, color:C.pink   },
  { name:"AI / Deep Learning", pct:70, color:C.violet },
  { name:"Database Design", pct:82, color:C.cyan   },
  { name:"NLP",             pct:68, color:C.green  },
];

const PROJECTS = [
  {
    title:"TalentScan AI",
    icon:"🤖",
    color:C.violet,
    glow:"rgba(168,85,247,0.3)",
    tags:["AI","NLP","Machine Learning","Python"],
    short:"AI-powered recruitment platform that matches candidates with job requirements using ML and NLP.",
    long:`TalentScan AI is an intelligent recruitment platform designed to revolutionize hiring. It automatically analyzes resumes, extracts key skills, and matches candidates with job requirements using advanced machine learning and natural language processing. The system reduces manual screening effort, eliminates bias, and delivers ranked shortlists to recruiters instantly. Built with Python, scikit-learn, and NLP pipelines, it handles thousands of resumes in seconds.`,
    highlights:["Resume parsing & ranking","NLP-based skill extraction","ML matching algorithm","Recruiter dashboard"],
  },
  {
    title:"Urdu Sign Language Recognition",
    icon:"🧠",
    color:C.cyan,
    glow:"rgba(34,211,238,0.28)",
    tags:["CNN","Computer Vision","Deep Learning","Python"],
    short:"Real-time AI system that translates Urdu Sign Language gestures into text and speech using CNN.",
    long:`This AI-powered system bridges communication for the hearing-impaired community by recognizing Urdu Sign Language gestures in real-time. Using Convolutional Neural Networks (CNN) trained on a diverse dataset of Urdu sign gestures, the model achieves high accuracy and low-latency response. The system outputs both text and synthesized speech, making it usable in classrooms, medical settings, and public services.`,
    highlights:["CNN gesture classifier","Real-time video processing","Text + speech output","Custom Urdu dataset"],
  },
  {
    title:"Auto Notes & Summary Generator",
    icon:"📝",
    color:C.green,
    glow:"rgba(74,222,128,0.25)",
    tags:["NLP","AI","Python","Text Processing"],
    short:"AI tool that auto-generates detailed notes and summaries from documents using advanced NLP.",
    long:`This tool leverages state-of-the-art NLP to transform lengthy documents, lectures, and articles into concise, structured summaries and detailed study notes. It supports multiple input formats, preserves key concepts, and organizes output hierarchically. The system focuses on data privacy, processing all content locally without external API calls, making it ideal for academic and professional use.`,
    highlights:["Multi-format document support","Hierarchical note structure","Privacy-first local processing","Keyword extraction"],
  },
  {
    title:"PEAC School System Website",
    icon:"🌐",
    color:C.amber,
    glow:"rgba(251,191,36,0.25)",
    tags:["HTML","CSS","JavaScript","Responsive"],
    short:"Dynamic, responsive website for PEAC School enhancing online presence and communication.",
    long:`Designed and developed a fully responsive website for PEAC School System to modernize their digital presence. The site features a clean, accessible UI with smooth navigation, an events calendar, admission portal, faculty directory, and news feed. Built with semantic HTML5, CSS3, and vanilla JavaScript, the site is optimized for performance and works flawlessly on all devices from mobile to desktop.`,
    highlights:["Fully responsive design","Events & news management","Admission portal","Faculty directory"],
  },
  {
    title:"Academy Central Management",
    icon:"🎓",
    color:C.pink,
    glow:"rgba(236,72,153,0.25)",
    tags:["HTML","CSS",".NET","C#"],
    short:"Full academic management system handling enrollment, assessment, and grading with .NET.",
    long:`Academy Central is a comprehensive academic information system built with ASP.NET and C#. It manages the complete student lifecycle — from enrollment and course registration to assessments, grading, and report generation. The system features role-based access for administrators, teachers, and students, automated grade calculations, and an intuitive dashboard with real-time analytics.`,
    highlights:["Role-based access control","Automated grading","Student lifecycle management","Real-time analytics dashboard"],
  },
  {
    title:"SQL Canned Food Distribution",
    icon:"🗄️",
    color:C.violet,
    glow:"rgba(168,85,247,0.28)",
    tags:["SQL","Oracle","Database","ER Modeling"],
    short:"Optimized Oracle SQL database for canned food distribution with inventory and order tracking.",
    long:`Designed and implemented a complete database system for a canned food distribution company on Oracle. The project involved creating an Entity-Relationship (ER) model, normalizing the schema to 3NF, and writing optimized SQL queries for inventory management, order processing, supplier tracking, and reporting. The system handles real-time stock updates and generates distribution reports.`,
    highlights:["ER model & schema design","3NF normalization","Optimized query performance","Inventory & order tracking"],
  },
  {
    title:"OOP Car Parking System",
    icon:"🚗",
    color:C.cyan,
    glow:"rgba(34,211,238,0.25)",
    tags:["OOP","C++","Inheritance","Polymorphism"],
    short:"C++ parking system applying OOP principles — inheritance, polymorphism, and encapsulation.",
    long:`This C++ project demonstrates core Object-Oriented Programming principles through a functional car parking management system. The architecture uses inheritance (Vehicle → Car/Bike/Truck), polymorphism for dynamic dispatch of entry/exit behavior, and encapsulation for secure data management. Features include slot allocation, fee calculation based on vehicle type and duration, and a receipt generation system.`,
    highlights:["Inheritance hierarchy","Runtime polymorphism","Fee calculation engine","Slot management & receipts"],
  },
];

const NAV = ["About","Skills","Projects","Education","Contact"];

/* ─── PARTICLES ─────────────────────────────────────────────────── */
function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? "168,85,247" : Math.random() > 0.5 ? "34,211,238" : "236,72,153",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      });
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(168,85,247,${0.07 * (1 - dist/110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }} />;
}

/* ─── AURORA BACKGROUND ──────────────────────────────────────────── */
function Aurora() {
  return (
    <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
      <div style={{
        position:"absolute", width:700, height:700, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
        top:"-10%", left:"-5%", animation:"float1 18s ease-in-out infinite",
      }}/>
      <div style={{
        position:"absolute", width:600, height:600, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)",
        top:"30%", right:"-8%", animation:"float2 22s ease-in-out infinite 4s",
      }}/>
      <div style={{
        position:"absolute", width:500, height:500, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)",
        bottom:"-5%", left:"30%", animation:"float3 20s ease-in-out infinite 8s",
      }}/>
      {/* Nebula streaks */}
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(135deg, rgba(168,85,247,0.03) 0%, transparent 40%, rgba(34,211,238,0.03) 100%)",
      }}/>
    </div>
  );
}

/* ─── HOOKS ──────────────────────────────────────────────────────── */
function useVisible(ref, threshold=0.12) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setV(true); }, { threshold });
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return v;
}

/* ─── PRIMITIVES ─────────────────────────────────────────────────── */
function FadeUp({ children, delay=0, style={} }) {
  const ref = useRef(null);
  const v = useVisible(ref);
  return (
    <div ref={ref} style={{
      opacity: v?1:0,
      transform: v?"translateY(0)":"translateY(32px)",
      transition:`opacity .7s ease ${delay}s, transform .7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

function Glass({ children, style={}, glow="" }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{
      background: h ? C.glassHov : C.glass,
      border:`1px solid ${h?(glow||C.borderHov):C.border}`,
      borderRadius:18, backdropFilter:"blur(16px)",
      transition:"all .3s ease",
      transform: h?"translateY(-4px)":"none",
      boxShadow: h ? `0 20px 60px ${glow||C.violetGlow}22, inset 0 1px 0 rgba(255,255,255,0.06)` : "inset 0 1px 0 rgba(255,255,255,0.04)",
      ...style,
    }}>{children}</div>
  );
}

function Tag({ label, color }) {
  return (
    <span style={{
      fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:99,
      background:`${color}18`, color, border:`1px solid ${color}30`,
      letterSpacing:"0.03em",
    }}>{label}</span>
  );
}

function SectionHead({ eyebrow, title, sub }) {
  return (
    <FadeUp style={{ textAlign:"center", marginBottom:60 }}>
      <span style={{
        fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase",
        color:C.violet, display:"block", marginBottom:12,
      }}>{eyebrow}</span>
      <h2 style={{ fontSize:"clamp(28px,4.5vw,44px)", fontWeight:800, color:C.text, margin:"0 0 14px", letterSpacing:"-0.03em" }}>
        {title}
      </h2>
      {sub && <p style={{ color:C.muted, fontSize:16, maxWidth:520, margin:"0 auto", lineHeight:1.7 }}>{sub}</p>}
    </FadeUp>
  );
}

/* ─── SKILL BAR ──────────────────────────────────────────────────── */
function Bar({ name, pct, color, delay }) {
  const ref = useRef(null);
  const v = useVisible(ref);
  return (
    <div ref={ref} style={{ marginBottom:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
        <span style={{ color:C.text, fontSize:13.5, fontWeight:500 }}>{name}</span>
        <span style={{ color:C.dim, fontSize:12 }}>{pct}%</span>
      </div>
      <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:99, height:6, overflow:"hidden" }}>
        <div style={{
          width: v?`${pct}%`:"0%", height:"100%", borderRadius:99,
          background:`linear-gradient(90deg,${color},${color}88)`,
          transition:`width 1.2s cubic-bezier(.25,1,.5,1) ${delay}s`,
          boxShadow:`0 0 14px ${color}55`,
        }}/>
      </div>
    </div>
  );
}

/* ─── PROJECT MODAL ──────────────────────────────────────────────── */
function Modal({ p, onClose }) {
  useEffect(() => {
    const esc = (e) => { if(e.key==="Escape") onClose(); };
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:1000,
      background:"rgba(3,3,10,0.85)",
      backdropFilter:"blur(14px)",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:"20px",
      animation:"fadeIn .25s ease",
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        maxWidth:620, width:"100%",
        background:`linear-gradient(145deg, rgba(10,8,20,0.98), rgba(5,5,16,0.98))`,
        border:`1px solid ${p.color}40`,
        borderRadius:24,
        padding:"40px 36px 36px",
        position:"relative",
        boxShadow:`0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px rgba(0,0,0,0.8), 0 0 80px ${p.glow}`,
        animation:"slideUp .3s cubic-bezier(.22,1,.36,1)",
        maxHeight:"90vh",
        overflowY:"auto",
      }}>
        {/* Close btn */}
        <button onClick={onClose} style={{
          position:"absolute", top:18, right:18,
          background:"rgba(255,255,255,0.06)", border:`1px solid ${C.border}`,
          color:C.muted, width:34, height:34, borderRadius:"50%",
          fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          transition:"all .2s",
        }}
          onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.12)"; e.currentTarget.style.color=C.text;}}
          onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.color=C.muted;}}
        >✕</button>

        {/* Icon + title */}
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24 }}>
          <div style={{
            width:60, height:60, borderRadius:16, fontSize:26,
            background:`${p.color}18`, border:`1px solid ${p.color}35`,
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:`0 0 24px ${p.glow}`,
            flexShrink:0,
          }}>{p.icon}</div>
          <div>
            <h2 style={{ color:C.text, fontSize:22, fontWeight:800, margin:"0 0 6px", letterSpacing:"-0.02em" }}>{p.title}</h2>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {p.tags.map(t=><Tag key={t} label={t} color={p.color}/>)}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height:1, background:`linear-gradient(90deg,${p.color}40,transparent)`, marginBottom:24 }}/>

        {/* Description */}
        <p style={{ color:C.muted, fontSize:15, lineHeight:1.75, margin:"0 0 24px" }}>{p.long}</p>

        {/* Highlights */}
        <div style={{ marginBottom:8 }}>
          <h3 style={{ color:C.text, fontSize:13, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14, color:p.color }}>
            Key Features
          </h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {p.highlights.map(h=>(
              <div key={h} style={{
                display:"flex", alignItems:"center", gap:10,
                padding:"10px 14px", borderRadius:10,
                background:`${p.color}0c`, border:`1px solid ${p.color}22`,
              }}>
                <span style={{ color:p.color, fontSize:14, flexShrink:0 }}>✦</span>
                <span style={{ color:C.text, fontSize:13, fontWeight:500 }}>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PROJECT CARD ───────────────────────────────────────────────── */
function PCard({ p, delay }) {
  const [h, setH] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <>
      <FadeUp delay={delay}>
        <div
          onMouseEnter={()=>setH(true)}
          onMouseLeave={()=>setH(false)}
          onClick={()=>setOpen(true)}
          style={{
            background: h?`${p.color}08`:C.glass,
            border:`1px solid ${h?p.color+"50":C.border}`,
            borderRadius:18, padding:"26px 22px",
            backdropFilter:"blur(12px)",
            cursor:"pointer",
            transition:"all .35s ease",
            transform: h?"translateY(-6px) scale(1.01)":"none",
            boxShadow: h?`0 20px 60px ${p.glow}, inset 0 1px 0 rgba(255,255,255,0.07)`:"inset 0 1px 0 rgba(255,255,255,0.04)",
            height:"100%", display:"flex", flexDirection:"column",
            position:"relative", overflow:"hidden",
          }}
        >
          {/* Shimmer on hover */}
          {h && <div style={{
            position:"absolute", inset:0, borderRadius:18, pointerEvents:"none",
            background:`linear-gradient(135deg, ${p.color}06 0%, transparent 60%)`,
          }}/>}

          {/* Click hint */}
          <div style={{
            position:"absolute", top:14, right:14,
            fontSize:10, fontWeight:600, letterSpacing:"0.08em",
            color: h?p.color:C.dim,
            background: h?`${p.color}15`:"rgba(255,255,255,0.04)",
            border:`1px solid ${h?p.color+"30":C.border}`,
            padding:"3px 9px", borderRadius:99,
            transition:"all .3s",
          }}>VIEW</div>

          <div style={{
            width:50, height:50, borderRadius:14, fontSize:22,
            background: h?`${p.color}20`:"rgba(255,255,255,0.05)",
            border:`1px solid ${h?p.color+"35":C.border}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            marginBottom:16, transition:"all .3s",
            boxShadow: h?`0 0 20px ${p.glow}`:"none",
          }}>{p.icon}</div>

          <h3 style={{ color:C.text, fontSize:16, fontWeight:700, margin:"0 0 10px", lineHeight:1.3 }}>{p.title}</h3>
          <p style={{ color:C.muted, fontSize:13.5, lineHeight:1.65, margin:"0 0 18px", flexGrow:1 }}>{p.short}</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {p.tags.map(t=><Tag key={t} label={t} color={p.color}/>)}
          </div>
        </div>
      </FadeUp>
      {open && <Modal p={p} onClose={()=>setOpen(false)}/>}
    </>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("About");
  const [mouse, setMouse] = useState({x:0,y:0});
  const [typedIdx, setTypedIdx] = useState(0);
  const roles = ["AI Developer","CS Student","Problem Solver","Database Engineer","NLP Enthusiast"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Typewriter
  useEffect(() => {
    const cur = roles[roleIdx];
    const delay = deleting ? 40 : 80;
    const t = setTimeout(() => {
      if (!deleting && charIdx < cur.length) setCharIdx(c=>c+1);
      else if (!deleting && charIdx === cur.length) setTimeout(()=>setDeleting(true), 1400);
      else if (deleting && charIdx > 0) setCharIdx(c=>c-1);
      else { setDeleting(false); setRoleIdx(r=>(r+1)%roles.length); }
    }, delay);
    return ()=>clearTimeout(t);
  }, [charIdx, deleting, roleIdx]);

  useEffect(()=>{
    const onS = ()=>setScrolled(window.scrollY>40);
    const onM = (e)=>setMouse({x:e.clientX, y:e.clientY});
    window.addEventListener("scroll",onS);
    window.addEventListener("mousemove",onM);
    return ()=>{window.removeEventListener("scroll",onS); window.removeEventListener("mousemove",onM);};
  },[]);

  const goto = (id)=>{
    document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
    setActiveNav(id);
  };

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"'Inter',-apple-system,sans-serif", color:C.text, overflowX:"hidden" }}>

      <Aurora/>
      <Particles/>

      {/* Cursor glow */}
      <div style={{
        position:"fixed", width:500, height:500, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(168,85,247,0.055) 0%, transparent 65%)",
        left:mouse.x-250, top:mouse.y-250,
        pointerEvents:"none", zIndex:1, transition:"left .15s, top .15s",
      }}/>

      {/* ── NAV ── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:200,
        padding: scrolled?"12px 36px":"24px 36px",
        background: scrolled?"rgba(5,5,16,0.88)":"transparent",
        backdropFilter: scrolled?"blur(24px)":"none",
        borderBottom: scrolled?`1px solid ${C.border}`:"none",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        transition:"all .4s ease",
      }}>
        <div style={{
          fontSize:20, fontWeight:900, letterSpacing:"-0.04em",
          background:"linear-gradient(135deg,#a855f7,#22d3ee)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
        }}>AK</div>
        <div style={{ display:"flex", gap:4 }}>
          {NAV.map(n=>(
            <button key={n} onClick={()=>goto(n)} style={{
              background: activeNav===n?C.violetSoft:"transparent",
              border: activeNav===n?`1px solid ${C.violetGlow}`:"1px solid transparent",
              color: activeNav===n?C.violet:C.muted,
              padding:"7px 16px", borderRadius:9, fontSize:13.5, fontWeight:500,
              cursor:"pointer", transition:"all .25s",
            }}
              onMouseEnter={e=>{if(activeNav!==n){e.target.style.color=C.text;}}}
              onMouseLeave={e=>{if(activeNav!==n){e.target.style.color=C.muted;}}}
            >{n}</button>
          ))}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="About" style={{
        minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
        textAlign:"center", padding:"130px 24px 90px", position:"relative", zIndex:2,
      }}>
        <div style={{ maxWidth:740, width:"100%" }}>

          {/* Avatar */}
          <div style={{ position:"relative", display:"inline-block", marginBottom:32 }}>
            <div style={{
              width:108, height:108, borderRadius:"50%", margin:"0 auto",
              background:"linear-gradient(135deg,#a855f7,#22d3ee,#ec4899)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:42, fontWeight:900, color:"#fff",
              boxShadow:"0 0 0 3px rgba(10,5,20,1), 0 0 0 5px rgba(168,85,247,0.4), 0 0 60px rgba(168,85,247,0.35)",
              animation:"pulse 4s ease-in-out infinite",
            }}>A</div>
            {/* Status dot */}
            <div style={{
              position:"absolute", bottom:5, right:5,
              width:18, height:18, borderRadius:"50%",
              background:C.green, border:`3px solid ${C.bg}`,
              boxShadow:`0 0 12px ${C.green}88`,
              animation:"blink 2s ease-in-out infinite",
            }}/>
          </div>

          {/* Badge */}
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            fontSize:12, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase",
            color:C.cyan, background:C.cyanSoft, border:`1px solid rgba(34,211,238,0.22)`,
            borderRadius:99, padding:"6px 18px", marginBottom:26,
          }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:C.green, display:"inline-block", boxShadow:`0 0 8px ${C.green}` }}/>
            Open to Internships & Opportunities
          </div>

          <h1 style={{ fontSize:"clamp(42px,6.5vw,76px)", fontWeight:900, lineHeight:1.08, margin:"0 0 18px", letterSpacing:"-0.04em" }}>
            Hi, I'm{" "}
            <span style={{ background:"linear-gradient(135deg,#a855f7 0%,#22d3ee 60%,#ec4899 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Alishba
            </span>
          </h1>

          {/* Typewriter */}
          <div style={{ fontSize:"clamp(18px,2.5vw,24px)", color:C.muted, marginBottom:20, height:36, display:"flex", alignItems:"center", justifyContent:"center", gap:0 }}>
            <span style={{ color:C.violet, fontWeight:600 }}>{roles[roleIdx].slice(0, charIdx)}</span>
            <span style={{ display:"inline-block", width:2, height:"1.1em", background:C.violet, marginLeft:2, animation:"blink 1s step-end infinite", borderRadius:2 }}/>
          </div>

          <p style={{ fontSize:"clamp(15px,1.8vw,18px)", color:C.muted, lineHeight:1.75, margin:"0 auto 44px", maxWidth:580 }}>
            7th-semester Computer Science student at PMAS-AAUR building intelligent AI systems,
            robust databases, and elegant web applications. Passionate about NLP, computer vision,
            and solving real-world problems through code.
          </p>

          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", marginBottom:64 }}>
            <button onClick={()=>goto("Projects")} style={{
              background:"linear-gradient(135deg,#a855f7,#7c3aed)",
              color:"#fff", border:"none", padding:"14px 30px", borderRadius:12,
              fontSize:15, fontWeight:700, cursor:"pointer",
              boxShadow:"0 4px 28px rgba(168,85,247,0.4)",
              transition:"transform .2s, box-shadow .2s",
              letterSpacing:"0.01em",
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 36px rgba(168,85,247,0.6)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 4px 28px rgba(168,85,247,0.4)";}}
            >🚀 View Projects</button>

            <a href="mailto:alishbakhalidkhan6699@gmail.com" style={{
              background:"transparent", color:C.text,
              border:`1px solid ${C.border}`, padding:"14px 30px", borderRadius:12,
              fontSize:15, fontWeight:500, cursor:"pointer", textDecoration:"none",
              display:"inline-block", transition:"all .25s", letterSpacing:"0.01em",
            }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=C.violetGlow; e.currentTarget.style.color=C.violet; e.currentTarget.style.background=C.violetSoft;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.text; e.currentTarget.style.background="transparent";}}
            >✉ Get in Touch</a>
          </div>

          {/* Stats */}
          <div style={{ display:"flex", justifyContent:"center", gap:0, flexWrap:"wrap" }}>
            {[
              { n:"7+", l:"Projects Built", color:C.violet },
              { n:"99.8%", l:"Intermediate Score", color:C.cyan },
              { n:"7th", l:"Semester · CS", color:C.pink },
            ].map((s,i)=>(
              <div key={s.l} style={{
                textAlign:"center", padding:"16px 32px",
                borderRight: i<2?`1px solid ${C.border}`:"none",
              }}>
                <div style={{
                  fontSize:28, fontWeight:900, letterSpacing:"-0.04em",
                  background:`linear-gradient(135deg,${s.color},${s.color}99)`,
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                }}>{s.n}</div>
                <div style={{ fontSize:12, color:C.dim, marginTop:4, fontWeight:500 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="Skills" style={{ padding:"110px 24px", position:"relative", zIndex:2 }}>
        <div style={{ maxWidth:1120, margin:"0 auto" }}>
          <SectionHead eyebrow="What I Know" title="Skills & Technologies" sub="A toolkit built through hands-on projects, coursework, and obsessive self-learning." />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:22 }}>

            <FadeUp>
              <Glass style={{ padding:"28px 28px 22px" }} glow={C.violetGlow}>
                <h3 style={{ color:C.text, fontSize:14, fontWeight:700, marginBottom:22, display:"flex", alignItems:"center", gap:8, textTransform:"uppercase", letterSpacing:"0.08em" }}>
                  <span style={{ color:C.violet }}>⚡</span> Technical Proficiency
                </h3>
                {SKILLS.map((s,i)=><Bar key={s.name} {...s} delay={i*0.07}/>)}
              </Glass>
            </FadeUp>

            <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
              {[
                { title:"🌐 Languages", items:["English — Fluent","Urdu — Fluent"], color:C.violet },
                { title:"🎯 Soft Skills", items:["Leadership","Time Management","Communication","Teamwork","Collaboration","Problem Solving"], color:C.cyan },
                { title:"🛠️ Tools & Platforms", items:["Oracle DB","Microsoft Office","Adobe Lightroom","VS Code","Git"], color:C.teal },
                { title:"📚 Coursework", items:["Data Structures","Algorithms","Database Systems","OOP","Artificial Intelligence","Software Engineering"], color:C.amber },
              ].map((grp,i)=>(
                <FadeUp key={grp.title} delay={i*0.1}>
                  <Glass style={{ padding:"20px 22px" }} glow={`${grp.color}44`}>
                    <h3 style={{ color:C.text, fontSize:13, fontWeight:700, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.08em" }}>{grp.title}</h3>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                      {grp.items.map(it=>(
                        <span key={it} style={{
                          fontSize:12.5, padding:"5px 12px", borderRadius:99, fontWeight:500,
                          background:`${grp.color}14`, border:`1px solid ${grp.color}28`, color:grp.color,
                        }}>{it}</span>
                      ))}
                    </div>
                  </Glass>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="Projects" style={{ padding:"110px 24px", position:"relative", zIndex:2 }}>
        <div style={{ maxWidth:1220, margin:"0 auto" }}>
          <SectionHead eyebrow="What I've Built" title="Featured Projects" sub="Click any card to explore the full project details, features, and tech stack." />
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20 }}>
            {PROJECTS.map((p,i)=><PCard key={p.title} p={p} delay={i*0.07}/>)}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="Education" style={{ padding:"110px 24px", position:"relative", zIndex:2 }}>
        <div style={{ maxWidth:820, margin:"0 auto" }}>
          <SectionHead eyebrow="Academic Background" title="Education" />
          <div style={{ position:"relative" }}>
            <div style={{
              position:"absolute", left:26, top:8, bottom:8, width:2,
              background:`linear-gradient(to bottom, ${C.violet}, ${C.cyan}, transparent)`,
              borderRadius:2,
            }}/>
            {[
              {
                school:"PMAS Arid Agriculture University",
                loc:"Rawalpindi, Pakistan",
                degree:"Bachelor's in Computer Science",
                period:"2023 – Present",
                note:"7th Semester · Specializing in AI, databases, and software engineering",
                color:C.violet,
              },
              {
                school:"KIPS College",
                loc:"Rawalpindi, Pakistan",
                degree:"Intermediate — Pre-Medical",
                period:"Mar 2019 – May 2021",
                note:"Achieved 99.8% marks — top academic performance",
                color:C.cyan,
                badge:"99.8%",
              },
            ].map((e,i)=>(
              <FadeUp key={e.school} delay={i*0.15}>
                <div style={{ display:"flex", gap:22, marginBottom:28 }}>
                  <div style={{ width:54, flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center" }}>
                    <div style={{
                      width:14, height:14, borderRadius:"50%", marginTop:8,
                      background:e.color, boxShadow:`0 0 18px ${e.color}90`,
                      border:`2px solid ${C.bg}`, flexShrink:0,
                    }}/>
                  </div>
                  <Glass style={{ flex:1, padding:"24px 26px" }} glow={`${e.color}44`}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, flexWrap:"wrap" }}>
                      <div>
                        <h3 style={{ color:C.text, fontSize:17, fontWeight:800, margin:"0 0 5px", letterSpacing:"-0.02em" }}>{e.school}</h3>
                        <p style={{ color:e.color, fontSize:14, fontWeight:600, margin:"0 0 5px" }}>{e.degree}</p>
                        <p style={{ color:C.dim, fontSize:13, margin:0 }}>📍 {e.loc}</p>
                      </div>
                      <div style={{ textAlign:"right", flexShrink:0 }}>
                        <span style={{
                          fontSize:12, padding:"4px 14px", borderRadius:99, display:"block",
                          background:`${e.color}14`, color:e.color, border:`1px solid ${e.color}30`,
                          fontWeight:600, marginBottom:e.badge?10:0,
                        }}>{e.period}</span>
                        {e.badge && (
                          <span style={{
                            fontSize:24, fontWeight:900, display:"block",
                            background:`linear-gradient(135deg,${C.violet},${C.cyan})`,
                            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                          }}>{e.badge}</span>
                        )}
                      </div>
                    </div>
                    <p style={{ color:C.muted, fontSize:13.5, margin:"16px 0 0", lineHeight:1.65 }}>{e.note}</p>
                  </Glass>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="Contact" style={{ padding:"110px 24px 90px", position:"relative", zIndex:2 }}>
        <div style={{ maxWidth:640, margin:"0 auto", textAlign:"center" }}>
          <SectionHead eyebrow="Let's Connect" title="Get In Touch" sub="Open to internship opportunities, collaborations, and conversations about AI and software." />
          <FadeUp>
            <Glass style={{ padding:"40px 36px" }} glow={C.violetGlow}>
              {[
                { icon:"📧", label:"Email", val:"alishbakhalidkhan6699@gmail.com", href:"mailto:alishbakhalidkhan6699@gmail.com", color:C.violet },
                { icon:"📞", label:"Phone", val:"+92 330 9186900", href:"tel:+923309186900", color:C.cyan },
                { icon:"💼", label:"LinkedIn", val:"alishba-khalidkhan", href:"https://www.linkedin.com/in/alishba-khalidkhan-881037336/", color:C.teal },
              ].map((ct,i)=>(
                <FadeUp key={ct.label} delay={i*0.1}>
                  <a href={ct.href} target="_blank" rel="noreferrer" style={{
                    display:"flex", alignItems:"center", gap:16,
                    padding:"16px 20px", borderRadius:14, marginBottom:12,
                    background:C.glass, border:`1px solid ${C.border}`,
                    textDecoration:"none", color:"inherit", transition:"all .25s",
                  }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=`${ct.color}55`; e.currentTarget.style.background=`${ct.color}08`; e.currentTarget.style.transform="translateX(6px)";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border; e.currentTarget.style.background=C.glass; e.currentTarget.style.transform="none";}}
                  >
                    <div style={{
                      width:44, height:44, borderRadius:12, fontSize:18, flexShrink:0,
                      background:`${ct.color}18`, border:`1px solid ${ct.color}28`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                    }}>{ct.icon}</div>
                    <div style={{ textAlign:"left" }}>
                      <div style={{ fontSize:11, color:C.dim, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:3, fontWeight:600 }}>{ct.label}</div>
                      <div style={{ fontSize:14, color:C.text, fontWeight:500 }}>{ct.val}</div>
                    </div>
                    <span style={{ marginLeft:"auto", color:ct.color, fontSize:20 }}>→</span>
                  </a>
                </FadeUp>
              ))}
            </Glass>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        textAlign:"center", padding:"28px 24px",
        borderTop:`1px solid ${C.border}`,
        color:C.dim, fontSize:13, position:"relative", zIndex:2,
      }}>
        <span style={{ background:"linear-gradient(135deg,#a855f7,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", fontWeight:800 }}>
          Alishba Khalid Khan
        </span>
        {" "}· Crafted with 💜 · {new Date().getFullYear()}
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:${C.bgDeep}; }
        ::-webkit-scrollbar-thumb { background:linear-gradient(${C.violet},${C.cyan}); border-radius:99px; }
        @keyframes float1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,30px) scale(1.05)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-30px,40px) scale(1.08)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-30px) scale(1.04)} }
        @keyframes pulse  { 0%,100%{box-shadow:0 0 0 3px rgba(10,5,20,1),0 0 0 5px rgba(168,85,247,0.4),0 0 60px rgba(168,85,247,0.35)} 50%{box-shadow:0 0 0 3px rgba(10,5,20,1),0 0 0 5px rgba(168,85,247,0.6),0 0 90px rgba(168,85,247,0.5)} }
        @keyframes blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp{ from{opacity:0;transform:translateY(40px) scale(0.97)} to{opacity:1;transform:none} }
      `}</style>
    </div>
  );
}
