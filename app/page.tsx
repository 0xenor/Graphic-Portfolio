"use client"
import { useState, useEffect, useRef } from 'react';
import Aurora from '@/components/Aurora';
import ShinyText from '@/components/ShinyText'
import SplitText from '@/components/SplitText';
import Navbar from '@/src/components/Navbar';

const SplitTextComponent = SplitText as any;

const skills = [
  { name: "Photoshop",     pct: 90, color: "#31A8FF", logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" },
  { name: "Illustrator",   pct: 90, color: "#FF9A00", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg" },
  { name: "Premiere Pro",  pct: 85, color: "#9999FF", logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg" },
  { name: "After Effects", pct: 75, color: "#9999FF", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg" },
  { name: "DaVinci",       pct: 60, color: "#bb00ff", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg" },
  { name: "Blender",       pct: 50, color: "#FF7518", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg" },
];

type Category = "All" | "Thumbnails" | "3D Projects" | "Social Media" | "Logo & Branding";

const projects: { id: number; title: string; category: Exclude<Category,"All">; img: string }[] = [
  { id:1,  title: "Thumbnail 01",  category: "Thumbnails",     img: "" },
  { id:2,  title: "Thumbnail 02",  category: "Thumbnails",     img: "" },
  { id:3,  title: "Thumbnail 03",  category: "Thumbnails",     img: "" },
  { id:4,  title: "3D Project 01", category: "3D Projects",    img: "" },
  { id:5,  title: "3D Project 02", category: "3D Projects",    img: "" },
  { id:6,  title: "3D Project 03", category: "3D Projects",    img: "" },
  { id:7,  title: "Social Post 01",category: "Social Media",   img: "" },
  { id:8,  title: "Social Post 02",category: "Social Media",   img: "" },
  { id:9,  title: "Social Post 03",category: "Social Media",   img: "" },
  { id:10, title: "Logo 01",       category: "Logo & Branding",img: "" },
  { id:11, title: "Logo 02",       category: "Logo & Branding",img: "" },
  { id:12, title: "Logo 03",       category: "Logo & Branding",img: "" },
];

const CATS: Category[] = ["All","Thumbnails","3D Projects","Social Media","Logo & Branding"];

const catColors: Record<string,string> = {
  "Thumbnails":     "#31A8FF",
  "3D Projects":    "#FF7518",
  "Social Media":   "#bb00ff",
  "Logo & Branding":"#FF9A00",
};

export default function Home() {
  const [isVisible,     setIsVisible]     = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [animated,      setAnimated]      = useState(false);
  const [counters,      setCounters]      = useState<number[]>(skills.map(()=>0));
  const [projVisible,   setProjVisible]   = useState(false);
  const [activeTab,     setActiveTab]     = useState<Category>("All");

  const aboutRef  = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const make = (set: ()=>void, delay=0) => new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTimeout(set, delay); },
      { threshold: 0.1 }
    );
    const o1 = make(() => setIsVisible(true));
    const o2 = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSkillsVisible(true);
        setTimeout(() => setAnimated(true), 300);
        skills.forEach((s, i) => {
          const duration = 1400;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutCubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(ease * s.pct);
            setCounters(prev => {
              const next = [...prev];
              next[i] = current;
              return next;
            });
            if (progress < 1) requestAnimationFrame(animate);
          };
          setTimeout(() => requestAnimationFrame(animate), i * 120 + 200);
        });
      }
    }, { threshold: 0.1 });
    const o3 = make(() => setProjVisible(true));
    if (aboutRef.current)  o1.observe(aboutRef.current);
    if (skillsRef.current) o2.observe(skillsRef.current);
    if (projRef.current)   o3.observe(projRef.current);
  


  return () => { o1.disconnect(); o2.disconnect(); o3.disconnect(); };
  }, []);

  const filtered = activeTab === "All" ? projects : projects.filter(p => p.category === activeTab);

  return (
    <main className="relative w-full min-h-screen bg-black flex flex-col items-center overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
        .syne { font-family:inherit; }
        /* Syne only for navbar brand and skill counters */

        /* ── About ── */
        .about-grid { display:grid; grid-template-columns:1fr; width:100%; align-items:center; padding:0 24px; }
        @media(min-width:768px)  { .about-grid { grid-template-columns:1fr 1fr; gap:0px; padding:0 48px; } }
        @media(min-width:1024px) { .about-grid { gap:0px; padding:0 64px; } }
        @media(min-width:1280px) { .about-grid { padding:0 100px; } }
        .img-col  { order:1; display:flex; justify-content:center; align-items:center; width:100%; }
        @media(min-width:768px) { .img-col { order:2; justify-content:flex-end; } }
        .text-col { order:2; display:flex; flex-direction:column; align-items:center; text-align:center; padding:32px 0; gap:20px; }
        @media(min-width:768px) { .text-col { order:1; align-items:flex-start; text-align:left; padding:0; } }
        .profile-img { width:100%; height:auto; max-width:560px; display:block; object-fit:contain; user-select:none; }
        @media(min-width:768px)  { .profile-img { max-width:740px; } }
        @media(min-width:1024px) { .profile-img { max-width:700px; } }
        .accent-line { width:48px; height:3px; background:#bb00ff; border-radius:2px; }
        .fade-up { transition:opacity 1.8s cubic-bezier(0.16,1,0.3,1),transform 1.8s cubic-bezier(0.16,1,0.3,1); }
        .fade-up.hidden  { opacity:0; transform:translateY(40px); }
        .fade-up.visible { opacity:1; transform:translateY(0); }
        .btn-primary  { font-family:inherit; background:#bb00ff; border:1.5px solid #bb00ff; color:white; padding:14px 32px; border-radius:8px; font-weight:900; font-size:13px; letter-spacing:0.2em; text-transform:uppercase; text-decoration:none; transition:background 0.3s,color 0.3s; white-space:nowrap; }
        .btn-primary:hover  { background:transparent; color:#bb00ff; }
        .btn-secondary { font-family:inherit; background:transparent; border:1.5px solid rgba(187,0,255,0.5); color:#bb00ff; padding:14px 36px; border-radius:8px; font-weight:900; font-size:13px; letter-spacing:0.2em; text-transform:uppercase; text-decoration:none; transition:background 0.3s,color 0.3s,border-color 0.3s; white-space:nowrap; }
        .btn-secondary:hover { background:#bb00ff; color:white; border-color:#bb00ff; }
        .stats-row { display:flex; gap:32px; flex-wrap:wrap; justify-content:center; }
        @media(min-width:768px) { .stats-row { justify-content:flex-start; } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* ── Skills ── */
        .sk-title { font-family:inherit; font-weight:900; font-size:clamp(3rem,10vw,7rem); letter-spacing:-0.04em; text-transform:uppercase; color:white; line-height:1; margin-bottom:72px; text-align:center; }
        .sk-grid  { display:flex; flex-wrap:wrap; gap:40px; align-items:center; justify-content:center; }
        .sk-card  { display:flex; flex-direction:column; align-items:center; opacity:0; transform:translateY(30px); transition:opacity 0.6s ease,transform 0.6s ease; }
        .sk-card.show { opacity:1; transform:translateY(0); }
        .sk-pct   { font-family:'Syne',sans-serif; font-size:11px; font-weight:700; color:#bb00ff; letter-spacing:0.05em; margin-bottom:8px; align-self:flex-end; padding-right:2px; }
        .sk-ring-wrap { position:relative; width:120px; height:120px; display:flex; align-items:center; justify-content:center; transition:transform 0.3s ease; cursor:default; }
        .sk-ring-wrap:hover { transform:translateY(-6px) scale(1.05); }
        .sk-ring-svg { position:absolute; inset:0; width:100%; height:100%; transform:rotate(-90deg); }
        .sk-track    { fill:none; stroke:rgba(255,255,255,0.06); stroke-width:3; }
        .sk-progress { fill:none; stroke-width:3; stroke-linecap:round; transition:stroke-dashoffset 1.4s cubic-bezier(0.25,1,0.5,1); }
        .sk-logo-wrap { width:84px; height:84px; border-radius:16px; overflow:hidden; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.04); padding:10px; }
        .sk-logo      { width:100%; height:100%; object-fit:contain; }
        .sk-name { font-family:inherit; font-size:10px; font-weight:600; color:rgba(255,255,255,0.3); letter-spacing:0.06em; text-transform:uppercase; margin-top:10px; text-align:center; }

        /* ── Projects ── */
        .proj-title { font-family:inherit; font-weight:900; font-size:clamp(2rem,8vw,7rem); letter-spacing:-0.04em; text-transform:uppercase; color:white; line-height:1; margin-bottom:48px; text-align:center; width:100%; overflow:hidden; }

        .tabs { display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin-bottom:56px; }
        .tab {
          font-family:inherit; font-size:12px; font-weight:700;
          letter-spacing:0.12em; text-transform:uppercase;
          padding:10px 24px; border-radius:999px;
          border:1.5px solid rgba(255,255,255,0.1);
          color:rgba(255,255,255,0.45);
          background:transparent; cursor:pointer;
          transition:all 0.3s ease;
        }
        .tab:hover { border-color:rgba(187,0,255,0.5); color:white; }
        .tab.active { background:#bb00ff; border-color:#bb00ff; color:white; box-shadow:0 0 24px rgba(187,0,255,0.4); }

        .proj-grid {
          display:grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap:24px;
          width:100%;
        }
        @media(min-width:1024px) { .proj-grid { grid-template-columns: repeat(3,1fr); } }

        .proj-card {
          position:relative; border-radius:16px; overflow:hidden;
          background:rgba(255,255,255,0.03);
          border:1px solid rgba(255,255,255,0.07);
          aspect-ratio:16/10;
          cursor:pointer;
          transition:transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s;
          animation: fadeCard 0.5s ease both;
        }
        .proj-card:hover { transform:translateY(-6px); border-color:rgba(187,0,255,0.4); box-shadow:0 16px 48px rgba(187,0,255,0.15); }
        @keyframes fadeCard { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }

        /* placeholder gradient */
        .proj-placeholder {
          width:100%; height:100%;
          display:flex; align-items:center; justify-content:center;
          background:linear-gradient(135deg, rgba(187,0,255,0.08), rgba(0,0,0,0.4));
        }

        .proj-img { width:100%; height:100%; object-fit:cover; display:block; }

        .proj-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%);
          opacity:0; transition:opacity 0.3s ease;
          display:flex; flex-direction:column;
          justify-content:flex-end; padding:20px;
        }
        .proj-card:hover .proj-overlay { opacity:1; }

        .proj-name { font-family:inherit; font-size:15px; font-weight:800; color:white; letter-spacing:-0.02em; }
        .proj-badge {
          display:inline-block; margin-top:6px;
          font-family:inherit; font-size:10px; font-weight:700;
          letter-spacing:0.1em; text-transform:uppercase;
          padding:4px 10px; border-radius:999px;
          background:rgba(187,0,255,0.3); color:#e066ff;
        }

        .proj-add-icon { font-size:32px; color:rgba(255,255,255,0.15); }
        .proj-add-txt  { font-family:inherit; font-size:11px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-top:8px; }

        /* ── Contact ── */
        .contact-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          min-height: 100vh;
          width: 100%;
          padding: 80px 48px 48px;
          position: relative;
          z-index: 10;
        }

        .contact-top {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 32px;
          width: 100%;
          max-width: 700px;
          margin: 0 auto;
        }

        .contact-tag {
          font-family: inherit;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.3em; text-transform: uppercase;
          color: #bb00ff;
          display: flex; align-items: center; gap: 10px;
          justify-content: center;
        }
        @media (min-width: 768px) {
          .contact-tag { justify-content: flex-start; }
        }
        .contact-tag::before {
          content: '';
          width: 32px; height: 2px;
          background: #bb00ff; border-radius: 2px;
          display: inline-block;
        }
        .contact-tag::after {
          content: '';
          width: 32px; height: 2px;
          background: #bb00ff; border-radius: 2px;
          display: inline-block;
        }

        .contact-big {
          font-family: inherit;
          font-weight: 900;
          font-size: clamp(2.5rem, 7vw, 6rem);
          letter-spacing: -0.04em;
          line-height: 0.95;
          color: white;
          text-transform: uppercase;
          text-align: center;
        }
        .contact-big span { color: #bb00ff; }

        .contact-sub {
          font-family: inherit;
          font-size: 15px; font-weight: 500;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
          max-width: 420px;
          text-align: center;
        }

        .contact-btn {
          font-family: inherit;
          font-weight: 900; font-size: 13px;
          letter-spacing: 0.2em; text-transform: uppercase;
          text-decoration: none;
          padding: 18px 48px;
          border-radius: 999px;
          background: #bb00ff;
          color: white;
          border: 1.5px solid #bb00ff;
          transition: background 0.3s, color 0.3s, transform 0.2s;
          display: inline-block;
          margin-top: 8px;
        }
        .contact-btn:hover { background: transparent; color: #bb00ff; transform: translateY(-2px); }

        /* bottom bar */
        .contact-bottom {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding-top: 64px;
          border-top: 1px solid rgba(255,255,255,0.07);
          margin-top: 80px;
          align-items: center;
        }
        @media (min-width: 768px) {
          .contact-bottom { flex-direction: row; align-items: center; justify-content: space-between; }
        }

        .contact-copy {
          font-family: inherit;
          font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.05em;
          text-align: center;
        }

        /* social icons */
        .socials { display: flex; align-items: center; gap: 16px; }

        .social-link {
          width: 46px; height: 46px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: border-color 0.3s, color 0.3s, background 0.3s, transform 0.2s;
          background: rgba(255,255,255,0.03);
        }
        .social-link:hover {
          border-color: #bb00ff;
          color: white;
          background: rgba(187,0,255,0.15);
          transform: translateY(-3px);
        }

        @media (max-width: 600px) {
          .contact-section { padding: 60px 24px 40px; }
        }
      `}</style>

      <div className="fixed inset-0 z-0">
        <Aurora colorStops={["#bb00ff","#9d04c8","#e100ff"]} amplitude={1} blend={0.7} />
      </div>

      {/* ══ HERO ══ */}
      <section id="home" className="relative z-10 flex flex-col items-center justify-center text-center w-full min-h-screen px-6">
        <div className="w-full max-w-[900px] flex flex-col items-center" style={{ gap:0, lineHeight:1.1 }}>
          <SplitTextComponent text="Hello!"          className="text-[clamp(3.5rem,12vw,7rem)] font-[900] text-white" delay={250} style={{ letterSpacing:"-0.03em" }} />
          <SplitTextComponent text="I'm Fahed Hadji" className="text-[clamp(2.2rem,9vw,6rem)] font-[900] text-white"  delay={200} style={{ letterSpacing:"-0.03em" }} />
          <div className="flex items-center justify-center" style={{ marginTop:24, marginBottom:32 }}>
            <ShinyText text="Graphic Designer" speed={5} className="text-[clamp(1.2rem,4vw,2.25rem)] font-[600]" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a href="#projects" className="btn-primary">View Projects →</a>
            <a href="#contact"  className="btn-secondary">Contact Me</a>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" ref={aboutRef} className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center py-12 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-[#bb00ff]/10 blur-[180px] rounded-full -bottom-20 -right-20 -z-10" />
        <div className={`about-grid fade-up ${isVisible ? "visible" : "hidden"}`}>
          <div className="img-col">
            <img src="pro.png" alt="Fahed Hadji" className="profile-img" />
          </div>
          <div className="text-col" style={{ marginLeft:"24px", marginTop:"40px" }}>
            <div className="accent-line" />
            <h3 className="" style={{ margin:0, fontWeight:900, textTransform:"uppercase", letterSpacing:"-0.04em", lineHeight:1.1, fontSize:"clamp(3rem,8vw,6rem)", whiteSpace:"nowrap" }}>
              <span style={{ color:"white" }}>WHO </span><span style={{ color:"#bb00ff" }}>AM I?</span>
            </h3>
            <div style={{ maxWidth:500, paddingLeft:12 }}>
              <ShinyText
                text="Morocco-based Graphic Designer and Content Creator with 5+ years of experience in the creative industry. I specialize in social media and advertising design, transforming brand messages into high-impact visual stories. My approach blends creative storytelling with a strategic, analytical edge—ensuring every project is not only visually compelling but also results-driven and delivered with meticulous precision."
                disabled={false} speed={3} className="text-white/70 text-base md:text-lg font-bold leading-relaxed tracking-tight" />
            </div>
            
            <div className="stats-row">
              {[{ num:"5+", label:"Years Exp." },{ num:"50+", label:"Clients" },{ num:"∞", label:"Creativity" }].map(s => (
                <div key={s.label} style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <span className="" style={{ fontSize:"clamp(1.8rem,4vw,2.5rem)", fontWeight:900, color:"#bb00ff", lineHeight:1 }}>{s.num}</span>
                  <span className="" style={{ fontSize:11, fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══ SKILLS ══ */}
      <section id="skills" ref={skillsRef} className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ padding:"80px 48px" }}>
        <div style={{ position:"absolute", bottom:-100, left:"50%", transform:"translateX(-50%)", width:600, height:400, background:"rgba(187,0,255,0.07)", borderRadius:"50%", filter:"blur(130px)", zIndex:0 }} />
        <h2 className="sk-title">MY SKILLS</h2>
        <div className="sk-grid">
          {skills.map((s,i) => {
            const R=56, C=2*Math.PI*R;
            const offset = animated ? C-(s.pct/100)*C : C;
            return (
              <div key={s.name} className={`sk-card${skillsVisible?" show":""}`} style={{ transitionDelay:`${i*120}ms` }}>
                <span className="sk-pct">{counters[i]}%</span>
                <div className="sk-ring-wrap">
                  <svg className="sk-ring-svg" viewBox="0 0 120 120">
                    <circle className="sk-track"    cx="60" cy="60" r={R} />
                    <circle className="sk-progress" cx="60" cy="60" r={R}
                      stroke={s.color} strokeDasharray={C} strokeDashoffset={offset}
                      style={{ filter:`drop-shadow(0 0 6px ${s.color}99)`, transitionDelay:`${i*120+200}ms` }} />
                  </svg>
                  <div className="sk-logo-wrap">
                    <img src={s.logo} alt={s.name} className="sk-logo" />
                  </div>
                </div>
                <span className="sk-name">{s.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="projects" ref={projRef} className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden" style={{ padding:"80px 16px" }}>
        <div style={{ position:"absolute", top:-100, right:-100, width:500, height:500, background:"rgba(187,0,255,0.06)", borderRadius:"50%", filter:"blur(130px)", zIndex:0 }} />

        <h2 className={`proj-title fade-up ${projVisible?"visible":"hidden"}`}>MY PROJECTS</h2>

        {/* Tabs */}
        <div className={`tabs fade-up ${projVisible?"visible":"hidden"}`} style={{ transitionDelay:"0.2s" }}>
          {CATS.map(c => (
            <button key={c} className={`tab${activeTab===c?" active":""}`} onClick={() => setActiveTab(c)}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="proj-grid" style={{ maxWidth:1100 }}>
          {filtered.map((p, i) => (
            <div key={p.id} className="proj-card" style={{ animationDelay:`${i*80}ms` }}>
              {p.img ? (
                <img src={p.img} alt={p.title} className="proj-img" />
              ) : (
                <div className="proj-placeholder">
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
                    <span className="proj-add-icon">＋</span>
                    <span className="proj-add-txt">Add Image</span>
                  </div>
                </div>
              )}
              <div className="proj-overlay">
                <span className="proj-name">{p.title}</span>
                <span className="proj-badge" style={{ background:`${catColors[p.category]}22`, color:catColors[p.category] }}>
                  {p.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ══ CONTACT ══ */}
      <section id="contact" className="contact-section">

        {/* glow */}
        <div style={{ position:"absolute", top:"20%", right:"-10%", width:500, height:500, background:"rgba(187,0,255,0.08)", borderRadius:"50%", filter:"blur(140px)", zIndex:0, pointerEvents:"none" }} />

        <div className="contact-top">
          <span className="contact-tag">Let's Connect</span>

          <h2 className="contact-big">
            Want to<br />
            <span>Work</span> Together?
          </h2>

          <p className="contact-sub">
            I'm always open to new projects, creative ideas, or opportunities to be part of something great. Let's build something amazing.
          </p>

          <a href="mailto:fahed@email.com" className="contact-btn">
            Send a Message →
          </a>
        </div>

        {/* Bottom bar */}
        <div className="contact-bottom">
          <span className="contact-copy">© 2025 Mr Fahed Designer — All rights reserved.</span>

          {/* Social icons */}
          <div className="socials">
            {/* Instagram */}
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>

            {/* TikTok */}
            <a href="https://tiktok.com/" target="_blank" rel="noreferrer" className="social-link" aria-label="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
              </svg>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/212600000000" target="_blank" rel="noreferrer" className="social-link" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}