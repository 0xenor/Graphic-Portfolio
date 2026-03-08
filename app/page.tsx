"use client"
import { useState, useEffect, useRef } from 'react';
import Aurora from '@/components/Aurora';
import ShinyText from '@/components/ShinyText'
import SplitText from '@/components/SplitText';
import Navbar from '@/src/components/Navbar';

const SplitTextComponent = SplitText as any;

const skills = [
  { name: "Photoshop", pct: 90, color: "#31A8FF", logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg" },
  { name: "Illustrator", pct: 90, color: "#FF9A00", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg" },
  { name: "Premiere Pro", pct: 85, color: "#9999FF", logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg" },
  { name: "After Effects", pct: 75, color: "#9999FF", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg" },
  { name: "DaVinci", pct: 60, color: "#bb00ff", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg" },
  { name: "Blender", pct: 50, color: "#FF7518", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg" },
];

type Category = "All" | "Thumbnails" | "Design Social Media" | "Logo" | "Instagram Brand Identity & Grid Styling";

const projects: { id: number; title: string; category: Exclude<Category, "All">; img: string }[] = [
  { id: 1, title: "", category: "Design Social Media", img: "apple juice.png" },
  { id: 2, title: "", category: "Design Social Media", img: "media.png" },
  { id: 3, title: "", category: "Design Social Media", img: "Pancake.png" },
  { id: 4, title: "", category: "Design Social Media", img: "poster center.png" },
  { id: 5, title: "", category: "Design Social Media", img: "Machine.png" },
  { id: 6, title: "", category: "Design Social Media", img: "C.png" },
  { id: 7, title: "", category: "Design Social Media", img: "Travail.png" },
  { id: 8, title: "", category: "Design Social Media", img: "Artboard 1.png" },
  { id: 9, title: "", category: "Design Social Media", img: "Artboard 2.png" },
  { id: 10, title: "", category: "Design Social Media", img: "c1.png" },
  { id: 11, title: "", category: "Design Social Media", img: "c2.png" },
  { id: 12, title: "", category: "Design Social Media", img: "c4.png" },
  { id: 13, title: "", category: "Design Social Media", img: "fibre optique poster 2 4G \u062b\u0621 2.png" },
  { id: 14, title: "", category: "Design Social Media", img: "fibre optique poster ex.png" },
  { id: 15, title: "", category: "Design Social Media", img: "m3.png" },
  { id: 16, title: "", category: "Design Social Media", img: "m5.png" },
  { id: 18, title: "", category: "Instagram Brand Identity & Grid Styling", img: "profile1.png" },
  { id: 19, title: "", category: "Instagram Brand Identity & Grid Styling", img: "profile2.png" },
  { id: 20, title: "", category: "Instagram Brand Identity & Grid Styling", img: "profile3.png" },
  { id: 21, title: "", category: "Instagram Brand Identity & Grid Styling", img: "profile4.png" },
  { id: 22, title: "", category: "Instagram Brand Identity & Grid Styling", img: "profile5.png" },
  { id: 23, title: "", category: "Design Social Media", img: "poster mm.png" },
  { id: 24, title: "", category: "Design Social Media", img: "poster mm1.png" },
  { id: 25, title: "", category: "Design Social Media", img: "poster.png" },
  { id: 26, title: "", category: "Design Social Media", img: "posters bic.png" },
  { id: 27, title: "", category: "Design Social Media", img: "posters inves.png" },
  { id: 28, title: "", category: "Design Social Media", img: "posters logistic.png" },
  { id: 29, title: "", category: "Design Social Media", img: "posters meltea.png" },
  { id: 30, title: "", category: "Design Social Media", img: "posters scur.png" },
  { id: 31, title: "", category: "Design Social Media", img: "POSTERS T.png" },
  { id: 32, title: "", category: "Design Social Media", img: "posters1.png" },
  { id: 33, title: "", category: "Design Social Media", img: "postrs A.png" },
  { id: 34, title: "", category: "Design Social Media", img: "Design.png" },
  { id: 35, title: "", category: "Design Social Media", img: "d.png" },
  { id: 36, title: "", category: "Design Social Media", img: "camera.png" },
  { id: 37, title: "", category: "Logo", img: "allpaint logo final.png" },
  { id: 38, title: "", category: "Logo", img: "freen logo 1 all.png" },
  { id: 39, title: "", category: "Logo", img: "logo ink port.jpg" },
  { id: 40, title: "", category: "Logo", img: "poster law.png" },
  { id: 41, title: "", category: "Logo", img: "poster pin.png" },
  { id: 42, title: "", category: "Logo", img: "poster zeina logo.png" },
  { id: 43, title: "", category: "Logo", img: "public logo agrilulture.jpg" },
  { id: 44, title: "", category: "Logo", img: "public logo car sale.jpg" },
  { id: 45, title: "", category: "Logo", img: "public logo school.jpg" },
  { id: 46, title: "", category: "Thumbnails", img: "jazirat al kanz thumbnail.png" },
  { id: 47, title: "", category: "Thumbnails", img: "thumbnail 1.png" },
  { id: 48, title: "", category: "Thumbnails", img: "thumbnail 2.png" },
  { id: 49, title: "", category: "Thumbnails", img: "thumbnail 3.png" },
  { id: 50, title: "", category: "Thumbnails", img: "thumbnail 4.png" },
  { id: 51, title: "", category: "Thumbnails", img: "thumbnail 6.png" },
  { id: 52, title: "", category: "Thumbnails", img: "thumbnail 8.png" },
  { id: 53, title: "", category: "Thumbnails", img: "thumbnail 9.png" },
  { id: 54, title: "", category: "Thumbnails", img: "thumbnail 11.png" },
  { id: 55, title: "", category: "Thumbnails", img: "thumbnail 14.png" },
  { id: 56, title: "", category: "Thumbnails", img: "thumbnail design 1.png" },
  { id: 57, title: "", category: "Thumbnails", img: "thumbnail hicham.png" },
];

const CATS: Category[] = ["All", "Thumbnails", "Instagram Brand Identity & Grid Styling", "Design Social Media", "Logo"];

const catColors: Record<string, string> = {
  "Thumbnails": "#31A8FF",
  "Instagram Brand Identity & Grid Styling": "#FF7518",
  "Design Social Media": "#bb00ff",
  "Logo": "#FF9A00",
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [counters, setCounters] = useState<number[]>(skills.map(() => 0));
  const [projVisible, setProjVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<Category>("All");

  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const make = (set: () => void, delay = 0) => new IntersectionObserver(
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
    if (aboutRef.current) o1.observe(aboutRef.current);
    if (skillsRef.current) o2.observe(skillsRef.current);
    if (projRef.current) o3.observe(projRef.current);

    return () => { o1.disconnect(); o2.disconnect(); o3.disconnect(); };
  }, []);

  const filtered = activeTab === "All" ? projects : projects.filter(p => p.category === activeTab);

  return (
    <main className="relative w-full min-h-screen bg-black flex flex-col items-center overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');

        /* ── About ── */
        .about-grid { display:grid; grid-template-columns:1fr; width:100%; align-items:center; padding:0 24px; }
        @media(min-width:768px)  { .about-grid { grid-template-columns:1fr 1fr; gap:0px; padding:0 48px 0 80px; align-items:center; } }
        @media(min-width:1024px) { .about-grid { gap:0px; padding:0 64px 0 80px; align-items:center; } }
        @media(min-width:1280px) { .about-grid { padding:0 100px 0 80px; align-items:center; } }

        .img-col { order:1; display:flex; justify-content:center; align-items:center; width:100%; }
        @media(min-width:768px) { .img-col { order:2; justify-content:flex-end; align-items:center; } }

        .text-col { order:2; display:flex; flex-direction:column; align-items:center; text-align:center; padding:32px 0; gap:17px; }
        @media(min-width:768px) { .text-col { order: 1; align-items:flex-start; text-align:left; padding: 0; } }

       .profile-img { width:100%; height:auto; max-width:560px; display:block; object-fit:contain; user-select:none; margin-top:-80px; }
       @media(min-width:768px)  { .profile-img { max-width:600px; margin-top:-200px; } }
       @media(min-width:1024px) { .profile-img { max-width:750px; margin-top:-200px; } }

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

        .about-heading { text-align:center; }
        @media(min-width:768px) { .about-heading { text-align:left; } }

        .about-text-wrap { text-align:center; }
        @media(min-width:768px) { .about-text-wrap { text-align:left; } }

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
        .tab { font-family:inherit; font-size:12px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; padding:10px 24px; border-radius:999px; border:1.5px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.45); background:transparent; cursor:pointer; transition:all 0.3s ease; }
        .tab:hover { border-color:rgba(187,0,255,0.5); color:white; }
        .tab.active { background:#bb00ff; border-color:#bb00ff; color:white; box-shadow:0 0 24px rgba(187,0,255,0.4); }

        /* ── Pinterest Masonry Grid ── */
        .proj-grid {
          columns: 1;
          column-gap: 24px;
          width: 100%;
          max-width: 1100px;
        }
        @media(min-width:640px)  { .proj-grid { columns: 2; } }
        @media(min-width:1024px) { .proj-grid { columns: 3; } }

        .proj-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s;
          animation: fadeCard 0.5s ease both;
          break-inside: avoid;
          margin-bottom: 24px;
          display: inline-block;
          width: 100%;
        }
        .proj-card:hover { transform:translateY(-6px); border-color:rgba(187,0,255,0.4); box-shadow:0 16px 48px rgba(187,0,255,0.15); }
        @keyframes fadeCard { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        /* Images fill their natural height — no cropping */
        .proj-img { width:100%; height:auto; display:block; object-fit:contain; }

        .proj-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 60%); opacity:0; transition:opacity 0.3s ease; display:flex; flex-direction:column; justify-content:flex-end; padding:20px; }
        .proj-card:hover .proj-overlay { opacity:1; }
        .proj-name  { font-family:inherit; font-size:15px; font-weight:800; color:white; letter-spacing:-0.02em; }
        .proj-badge { display:inline-block; margin-top:6px; font-family:inherit; font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; padding:4px 10px; border-radius:999px; }
        .proj-placeholder { width:100%; min-height:160px; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,rgba(187,0,255,0.08),rgba(0,0,0,0.4)); }
        .proj-add-icon { font-size:32px; color:rgba(255,255,255,0.15); }
        .proj-add-txt  { font-family:inherit; font-size:11px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-top:8px; }

        /* ── Contact ── */
        .contact-section { display:flex; flex-direction:column; align-items:center; justify-content:space-between; min-height:100vh; width:100%; padding:90px 48px 48px; position:relative; z-index:10; }
        .contact-top { display:flex; flex-direction:column; align-items:center; text-align:center; gap:32px; width:100%; max-width:700px; margin:0 auto; }
        .contact-tag { font-family:inherit; font-size:11px; font-weight:700; letter-spacing:0.3em; text-transform:uppercase; color:#bb00ff; display:flex; align-items:center; gap:10px; justify-content:center; }
        .contact-tag::before,.contact-tag::after { content:''; width:32px; height:2px; background:#bb00ff; border-radius:2px; display:inline-block; }
        .contact-big { font-family:inherit; font-weight:900; font-size:clamp(2.5rem,7vw,6rem); letter-spacing:-0.04em; line-height:0.95; color:white; text-transform:uppercase; text-align:center; }
        .contact-big span { color:#bb00ff; }
        .contact-sub { font-family:inherit; font-size:15px; font-weight:500; color:rgba(255,255,255,0.4); line-height:1.6; max-width:420px; text-align:center; }
        .contact-btn { font-family:inherit; font-weight:900; font-size:13px; letter-spacing:0.2em; text-transform:uppercase; text-decoration:none; padding:18px 48px; border-radius:999px; background:#bb00ff; color:white; border:1.5px solid #bb00ff; transition:background 0.3s,color 0.3s,transform 0.2s; display:inline-block; margin-top:8px; }
        .contact-btn:hover { background:transparent; color:#bb00ff; transform:translateY(-2px); }
        .contact-bottom { display:flex; flex-direction:column; gap:24px; padding-top:64px; border-top:1px solid rgba(255,255,255,0.07); margin-top:80px; align-items:center; width:100%; }
        @media(min-width:768px) { .contact-bottom { flex-direction:row; align-items:center; justify-content:space-between; } }
        .contact-copy { font-family:inherit; font-size:18px; font-weight:900; color:rgba(255,255,255,0.2); letter-spacing:0.05em; text-align:center; }
        .socials { display:flex; align-items:center; gap:16px; }
        .social-link { width:46px; height:46px; border-radius:50%; border:1.5px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.5); text-decoration:none; transition:border-color 0.3s,color 0.3s,background 0.3s,transform 0.2s; background:rgba(255,255,255,0.03); }
        .social-link:hover { border-color:#bb00ff; color:white; background:rgba(187,0,255,0.15); transform:translateY(-3px); }
        @media(max-width:600px) { .contact-section { padding:60px 24px 40px; } }
      `}</style>

      <div className="fixed inset-0 z-0">
        <Aurora colorStops={["#bb00ff", "#9d04c8", "#e100ff"]} amplitude={1} blend={0.7} />
      </div>

      <section id="home" className="relative z-10 flex flex-col items-center justify-center text-center w-full min-h-screen px-6">
        <div className="w-full max-w-[900px] flex flex-col items-center" style={{ gap: 0, lineHeight: 1.1 }}>
          <SplitTextComponent text="Hello!" className="text-[clamp(3.5rem,12vw,7rem)] font-[900] text-white" delay={250} style={{ letterSpacing: "-0.03em" }} />
          <SplitTextComponent text="I'm Fahed Hadji" className="text-[clamp(2.2rem,9vw,6rem)] font-[900] text-white" delay={200} style={{ letterSpacing: "-0.03em" }} />
          <div className="flex items-center justify-center" style={{ marginTop: 24, marginBottom: 32 }}>
            <ShinyText text="Graphic Designer" speed={5} className="text-[clamp(1.2rem,4vw,2.25rem)] font-[600]" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a href="#projects" className="btn-primary">View Projects →</a>
            <a href="#contact" className="btn-secondary">Contact Me</a>
          </div>
        </div>
      </section>


      <section id="about" ref={aboutRef} className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
        <div className="absolute w-[500px] h-[500px] bg-[#bb00ff]/10 blur-[180px] rounded-full -bottom-20 -right-20 -z-10" />
        <div className={`about-grid fade-up ${isVisible ? "visible" : "hidden"}`}>
          <div className="img-col">
            <img src="pro.png" alt="Fahed Hadji" className="profile-img" style={{ marginTop: "-100px" }} />
          </div>
          <div className="text-col">
            <div className="accent-line" />
            <h3 className="about-heading" style={{ margin: 0, fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.04em", lineHeight: 1.1, fontSize: "clamp(2rem,8vw,8rem)", whiteSpace: "nowrap" }}>
              <span style={{ color: "white" }}>WHO </span><span style={{ color: "#bb00ff" }}>AM I?</span>
            </h3>
            <div className="about-text-wrap" style={{ maxWidth: 700, paddingLeft: 10 }}>
              <ShinyText
                text="Morocco-based Graphic Designer and Content Creator with 5+ years of experience in the creative industry. I specialize in social media and advertising design, transforming brand messages into high-impact visual stories. My approach blends creative storytelling with a strategic, analytical edge—ensuring every project is not only visually compelling but also results-driven and delivered with meticulous precision."
                disabled={false} speed={3} className="text-white/70 text-lg md:text-xl font-bold leading-relaxed" />
            </div>
            <div className="stats-row" style={{ maxWidth: 500 }}>
              {[{ num: "5+", label: "Years Exp." }, { num: "50+", label: "Clients" }, { num: "\u221e", label: "Creativity" }].map(s => (
                <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
                  <span style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 900, color: "#bb00ff", lineHeight: 1 }}>{s.num}</span>
                  <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.75em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

  
      <section id="skills" ref={skillsRef} className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ padding: "80px 48px" }}>
        <div style={{ position: "absolute", bottom: -100, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "rgba(187,0,255,0.07)", borderRadius: "50%", filter: "blur(130px)", zIndex: 0 }} />
        <h2 className="sk-title">My <span style={{ color: "#bb00ff" }}>SKILLS</span></h2>
        <div className="sk-grid">
          {skills.map((s, i) => {
            const R = 56, C = 2 * Math.PI * R;
            const offset = animated ? C - (s.pct / 100) * C : C;
            return (
              <div key={s.name} className={`sk-card${skillsVisible ? " show" : ""}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <span className="sk-pct">{counters[i]}%</span>
                <div className="sk-ring-wrap">
                  <svg className="sk-ring-svg" viewBox="0 0 120 120">
                    <circle className="sk-track" cx="60" cy="60" r={R} />
                    <circle className="sk-progress" cx="60" cy="60" r={R}
                      stroke={s.color} strokeDasharray={C} strokeDashoffset={offset}
                      style={{ filter: `drop-shadow(0 0 6px ${s.color}99)`, transitionDelay: `${i * 120 + 200}ms` }} />
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


      <section id="projects" ref={projRef} className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden" style={{ padding: "80px 16px" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, background: "rgba(187,0,255,0.06)", borderRadius: "50%", filter: "blur(130px)", zIndex: 0 }} />
        <h2 className={`proj-title fade-up ${projVisible ? "visible" : "hidden"}`}>My <span style={{ color: "#bb00ff" }}>PROJECTS</span></h2>
        <div className={`tabs fade-up ${projVisible ? "visible" : "hidden"}`} style={{ transitionDelay: "0.2s" }}>
          {CATS.map(c => (
            <button key={c} className={`tab${activeTab === c ? " active" : ""}`} onClick={() => setActiveTab(c)}>
              {c}
            </button>
          ))}
        </div>
        <div className="proj-grid">
          {filtered.map((p, i) => (
            <div key={p.id} className="proj-card" style={{ animationDelay: `${i * 80}ms` }}>
              {p.img ? (
                <img src={p.img} alt={p.title} className="proj-img" />
              ) : (
                <div className="proj-placeholder">
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <span className="proj-add-icon">\uFF0B</span>
                    <span className="proj-add-txt">Add Image</span>
                  </div>
                </div>
              )}
              <div className="proj-overlay">
                <span className="proj-name">{p.title}</span>
                <span className="proj-badge" style={{ background: `${catColors[p.category]}22`, color: catColors[p.category] }}>
                  {p.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          background: "rgba(187,0,255,0.08)",
          borderRadius: "50%",
          filter: "blur(140px)",
          zIndex: 0,
          pointerEvents: "none"
        }} />

        <div className="relative z-10 flex flex-col items-center max-w-4xl pt-24 md:pt-32">
          <span className="contact-tag mb-6 inline-block px-4 py-1 border border-white/10 rounded-full text-sm uppercase tracking-widest text-[#bb00ff]">
            Let's Connect
          </span>

          <h2 className="text-5xl md:text-8xl font-[900] text-white tracking-tighter leading-none mb-8 uppercase">
            Want to<br />
            <span className="text-[#bb00ff]">Work</span> Together?
          </h2>

          <p className="text-neutral-400 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mb-12">
            I'm always open to new projects, creative ideas, or opportunities to be part of something great. Let's build something amazing.
          </p>
          <div className="contact-actions">
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="contact-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Send a Message
            </a>
          </div>
        </div>

        <div className="contact-bottom w-full px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5">
          <div className="flex-1 flex justify-start order-2 md:order-1">
            <span className="contact-copy text-[11px] text-white/40 tracking-widest text-center md:text-left">
              © 2026 — <span className="text-[#bb00ff] hover:underline">Graphic Designer</span> & <span className="text-[#bb00ff] hover:underline">Content Creator</span> · All rights reserved.
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center gap-6 order-1 md:order-2">
            <a href="https://wa.me/212718982539" target="_blank" rel="noreferrer"
              className="text-white/50 hover:text-[#25D366] transition-all duration-300 hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>

            <a href="https://www.instagram.com/mr_fahed_designer/" target="_blank" rel="noreferrer"
              className="text-white/50 hover:text-[#E4405F] transition-all duration-300 hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            <a href="https://www.tiktok.com/@fahddesigner19?lang=fr" target="_blank" rel="noreferrer"
              className="text-white/50 hover:text-[#00f2ea] transition-all duration-300 hover:scale-110 drop-shadow-[0_0_8px_rgba(255,0,80,0.6)]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>
          </div>

          <div className="flex-1 flex flex-col items-center md:items-end order-3">
            <span className="contact-copy text-[15px] text-white tracking-widest text-center md:text-right">
              Designed & Built by <a href="https://instagram.com/ilyass._ag" target="_blank" rel="noreferrer" className="text-[#bb00ff] hover:underline">@ilyass._ag</a>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}