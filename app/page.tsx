"use client"
import { useState, useEffect, useRef, useCallback } from 'react';
import Aurora from '@/components/Aurora';
import ShinyText from '@/components/ShinyText';
import SplitText from '@/components/SplitText';
import Navbar from '@/src/components/Navbar';

const SplitTextComponent = SplitText as any;

/* ─────────────────────────────────────────────
   DATA  (unchanged)
───────────────────────────────────────────── */
const skills = [
  { name: "Photoshop",    pct: 90, color: "#31A8FF", logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg"   },
  { name: "Illustrator",  pct: 90, color: "#FF9A00", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg"  },
  { name: "Premiere Pro", pct: 85, color: "#9999FF", logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg" },
  { name: "After Effects",pct: 75, color: "#9999FF", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg" },
  { name: "DaVinci",      pct: 60, color: "#bb00ff", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg"    },
  { name: "Blender",      pct: 50, color: "#FF7518", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg"        },
];

type Category = "All" | "Thumbnails" | "Design Social Media" | "Logo" | "Instagram Brand Identity & Grid Styling";
const projects: { id:number; title:string; category:Exclude<Category,"All">; img:string }[] = [
  { id:1,  title:"", category:"Design Social Media", img:"new.jpeg" },
  { id:2,  title:"", category:"Design Social Media", img:"apple juice.png" },
  { id:3,  title:"", category:"Design Social Media", img:"media.png" },
  { id:4,  title:"", category:"Design Social Media", img:"Pancake.png" },
  { id:5,  title:"", category:"Design Social Media", img:"poster center.png" },
  { id:6,  title:"", category:"Design Social Media", img:"Machine.png" },
  { id:7,  title:"", category:"Design Social Media", img:"C.png" },
  { id:8,  title:"", category:"Design Social Media", img:"Travail.png" },
  { id:9,  title:"", category:"Design Social Media", img:"Artboard 1.png" },
  { id:10, title:"", category:"Design Social Media", img:"Artboard 2.png" },
  { id:11, title:"", category:"Design Social Media", img:"c1.png" },
  { id:12, title:"", category:"Design Social Media", img:"c2.png" },
  { id:13, title:"", category:"Design Social Media", img:"c4.png" },
  { id:14, title:"", category:"Design Social Media", img:"fibre optique poster 2 4G ثء 2.png" },
  { id:15, title:"", category:"Design Social Media", img:"fibre optique poster ex.png" },
  { id:16, title:"", category:"Design Social Media", img:"m3.png" },
  { id:17, title:"", category:"Design Social Media", img:"m5.png" },
  { id:18, title:"", category:"Instagram Brand Identity & Grid Styling", img:"profile1.png" },
  { id:19, title:"", category:"Instagram Brand Identity & Grid Styling", img:"profile2.png" },
  { id:20, title:"", category:"Instagram Brand Identity & Grid Styling", img:"profile3.png" },
  { id:21, title:"", category:"Instagram Brand Identity & Grid Styling", img:"profile4.png" },
  { id:22, title:"", category:"Instagram Brand Identity & Grid Styling", img:"profile5.png" },
  { id:23, title:"", category:"Design Social Media", img:"poster mm.png" },
  { id:24, title:"", category:"Design Social Media", img:"poster mm1.png" },
  { id:25, title:"", category:"Design Social Media", img:"poster.png" },
  { id:26, title:"", category:"Design Social Media", img:"posters bic.png" },
  { id:27, title:"", category:"Design Social Media", img:"posters inves.png" },
  { id:28, title:"", category:"Design Social Media", img:"posters logistic.png" },
  { id:29, title:"", category:"Design Social Media", img:"posters meltea.png" },
  { id:30, title:"", category:"Design Social Media", img:"posters scur.png" },
  { id:31, title:"", category:"Design Social Media", img:"POSTERS T.png" },
  { id:32, title:"", category:"Design Social Media", img:"posters1.png" },
  { id:33, title:"", category:"Design Social Media", img:"postrs A.png" },
  { id:34, title:"", category:"Design Social Media", img:"Design.png" },
  { id:35, title:"", category:"Design Social Media", img:"d.png" },
  { id:36, title:"", category:"Design Social Media", img:"camera.png" },
  { id:37, title:"", category:"Logo", img:"allpaint logo final.png" },
  { id:38, title:"", category:"Logo", img:"freen logo 1 all.png" },
  { id:39, title:"", category:"Logo", img:"logo ink port.jpg" },
  { id:40, title:"", category:"Logo", img:"poster law.png" },
  { id:41, title:"", category:"Logo", img:"poster pin.png" },
  { id:42, title:"", category:"Logo", img:"poster zeina logo.png" },
  { id:43, title:"", category:"Logo", img:"public logo agrilulture.jpg" },
  { id:44, title:"", category:"Logo", img:"public logo car sale.jpg" },
  { id:45, title:"", category:"Logo", img:"public logo school.jpg" },
  { id:46, title:"", category:"Thumbnails", img:"jazirat al kanz thumbnail.png" },
  { id:47, title:"", category:"Thumbnails", img:"thumbnail 1.png" },
  { id:48, title:"", category:"Thumbnails", img:"thumbnail 2.png" },
  { id:49, title:"", category:"Thumbnails", img:"thumbnail 3.png" },
  { id:50, title:"", category:"Thumbnails", img:"thumbnail 4.png" },
  { id:51, title:"", category:"Thumbnails", img:"thumbnail 6.png" },
  { id:52, title:"", category:"Thumbnails", img:"thumbnail 8.png" },
  { id:53, title:"", category:"Thumbnails", img:"thumbnail 9.png" },
  { id:54, title:"", category:"Thumbnails", img:"thumbnail 11.png" },
  { id:55, title:"", category:"Thumbnails", img:"thumbnail 14.png" },
  { id:56, title:"", category:"Thumbnails", img:"thumbnail design 1.png" },
  { id:57, title:"", category:"Thumbnails", img:"thumbnail hicham.png" },
];
const CATS: Category[] = ["All","Thumbnails","Instagram Brand Identity & Grid Styling","Design Social Media","Logo"];
const catColors: Record<string,string> = {
  "Thumbnails":"#31A8FF",
  "Instagram Brand Identity & Grid Styling":"#FF7518",
  "Design Social Media":"#bb00ff",
  "Logo":"#FF9A00",
};
const DISCLAIMER_TEXT = "هذه الصور المصغرة هي إعادة تصميم لغرض عرض المهارات الفنية فقط، ولا يمثل تعاوناً رسمياً مع صاحب المحتوى الأصلي.";

/* ─────────────────────────────────────────────
   PERF: rAF-based counter — zero layout thrash
───────────────────────────────────────────── */
function animateCounter(el: HTMLElement, target: number, duration: number, delay: number) {
  let raf: number;
  const run = () => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * target) + "%";
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  };
  const t = setTimeout(run, delay);
  return () => { clearTimeout(t); cancelAnimationFrame(raf); };
}

/* ─────────────────────────────────────────────
   DISCLAIMER TYPING
───────────────────────────────────────────── */
function DisclaimerTyping({ triggerKey }: { triggerKey: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLParagraphElement>(null);
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (textRef.current) { textRef.current.textContent = ''; textRef.current.classList.remove('typed'); }
    if (intervalRef.current) clearInterval(intervalRef.current);
    let i = 0;
    const startTyping = () => {
      if (textRef.current) textRef.current.classList.add('typed');
      intervalRef.current = setInterval(() => {
        i++;
        if (textRef.current) textRef.current.textContent = DISCLAIMER_TEXT.slice(0, i);
        if (i >= DISCLAIMER_TEXT.length && intervalRef.current) clearInterval(intervalRef.current);
      }, 38);
    };
    if (!isFirstMount.current) {
      setTimeout(startTyping, 100);
      return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }
    isFirstMount.current = false;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      setTimeout(startTyping, 300);
    }, { threshold: 0.3 });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => { obs.disconnect(); if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [triggerKey]);

  return (
    <div ref={containerRef} className="disclaimer-wrap">
      <span className="disclaimer-emoji">⚠️</span>
      <p ref={textRef} className="disclaimer-text" />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════ */
export default function Home() {
  const [aboutVisible,  setAboutVisible]  = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [animated,      setAnimated]      = useState(false);
  const counterEls      = useRef<(HTMLElement | null)[]>([]);
  const counterCleanups = useRef<(() => void)[]>([]);
  const [projVisible,   setProjVisible]   = useState(false);
  const [activeTab,     setActiveTab]     = useState<Category>("All");
  const [disclaimerKey, setDisclaimerKey] = useState(0);

  const masonryRef     = useRef<HTMLDivElement>(null);
  const rafMasonryRef  = useRef<number>(0);
  const [masonryStyles, setMasonryStyles] = useState<{ top:number; left:number; width:number }[]>([]);
  const [masonryHeight, setMasonryHeight] = useState(0);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const aboutRef  = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projRef   = useRef<HTMLElement>(null);

  /* ── IntersectionObserver: About ── */
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setAboutVisible(e.isIntersecting), { threshold: 0, rootMargin: "0px 0px -40px 0px" });
    if (aboutRef.current) obs.observe(aboutRef.current);
    return () => obs.disconnect();
  }, []);

  /* ── IntersectionObserver: Skills ── */
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        counterCleanups.current.forEach(fn => fn?.());
        counterCleanups.current = [];
        counterEls.current.forEach(el => { if (el) el.textContent = "0%"; });
        setSkillsVisible(true);
        setAnimated(true);
        skills.forEach((s, i) => {
          const el = counterEls.current[i];
          if (!el) return;
          counterCleanups.current[i] = animateCounter(el, s.pct, 1400, i * 120 + 300);
        });
      } else {
        counterCleanups.current.forEach(fn => fn?.());
        counterCleanups.current = [];
        counterEls.current.forEach(el => { if (el) el.textContent = "0%"; });
        setSkillsVisible(false);
        setAnimated(false);
      }
    }, { threshold: 0.1 });
    if (skillsRef.current) obs.observe(skillsRef.current);
    return () => { obs.disconnect(); counterCleanups.current.forEach(fn => fn?.()); };
  }, []);

  /* ── IntersectionObserver: Projects ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setProjVisible(true); },
      { threshold: 0, rootMargin: "0px 0px -10px 0px" }
    );
    if (projRef.current) obs.observe(projRef.current);
    return () => obs.disconnect();
  }, []);

  const filtered = activeTab === "All" ? projects : projects.filter(p => p.category === activeTab);

  /* ── PERF: masonry ── */
  const computeMasonry = useCallback(() => {
    cancelAnimationFrame(rafMasonryRef.current);
    rafMasonryRef.current = requestAnimationFrame(() => {
      const container = masonryRef.current;
      if (!container) return;
      const cards = Array.from(container.children) as HTMLElement[];
      if (!cards.length) return;

      const containerWidth = container.offsetWidth;
      const cardHeights = cards.map(c => c.offsetHeight);

      const gap = 24, mobileGap = 14;
      let cols = 1;
      if (containerWidth >= 1024) cols = 3;
      else if (containerWidth >= 540) cols = 2;
      const cardGap  = cols === 1 ? mobileGap : gap;
      const colWidth = (containerWidth - gap * (cols - 1)) / cols;
      const colHeights = Array(cols).fill(0);
      const styles = cardHeights.map(h => {
        const col  = colHeights.indexOf(Math.min(...colHeights));
        const top  = colHeights[col];
        const left = col * (colWidth + gap);
        colHeights[col] += h + cardGap;
        return { top, left, width: colWidth };
      });

      setMasonryStyles(styles);
      setMasonryHeight(Math.max(...colHeights));
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(computeMasonry, 50);
    const handleResize = () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(computeMasonry, 150);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafMasonryRef.current);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [filtered, computeMasonry]);

  const handleTabClick = (c: Category) => { setActiveTab(c); setDisclaimerKey(k => k + 1); };

  /* ═══════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════ */
  return (
    <main className="relative w-full min-h-screen flex flex-col items-center overflow-x-hidden"
      style={{ background: "#0d0d0d" }}>

      {/* ── AURORA BACKGROUND ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <Aurora
          colorStops={["#bb00ff", "#bb00ff", "#bb00ff"]}
          amplitude={1.0}
          blend={0.5}
          speed={1.0}
        />
      </div>

      <style>{`
        /* ── Font import ── */
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        html { scroll-behavior: smooth; }
        *, *::before, *::after { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }

        body {
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeSpeed;
        }
        html, body { overscroll-behavior-y: none; }

        /* ── Keyframes ── */
        @keyframes hFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hArrow {
          0%,100% { transform: translateX(-50%) translateY(0);   opacity: .35; }
          50%      { transform: translateX(-50%) translateY(9px); opacity: .80; }
        }
        @keyframes hGrain {
          0%   { transform: translate(0,0); }
          20%  { transform: translate(-1%,-1%); }
          40%  { transform: translate(1%,0); }
          60%  { transform: translate(0,1%); }
          80%  { transform: translate(-1%,1%); }
          100% { transform: translate(0,0); }
        }
        @keyframes fadeCard {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes pulse-warn {
          0%,100% { transform:scale(1); }
          50%     { transform:scale(1.18); }
        }

        /* ═══════════════════════════════════
           HOME
        ═══════════════════════════════════ */
        .h-section {
          position: relative;
          width: 100%;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: transparent;
          overflow: hidden;
          padding: 120px 28px 110px;
          text-align: center;
        }
        .h-glow {
          position: absolute; top: -80px; left: 50%;
          transform: translateX(-50%);
          width: 640px; height: 580px;
          background: radial-gradient(ellipse 55% 60% at 50% 0%,
            rgba(255,255,255,.22) 0%, rgba(230,230,230,.08) 40%, transparent 70%);
          pointer-events: none; z-index: 0; will-change: transform;
        }
        @media (max-width:640px) { .h-glow { width:320px; height:300px; top:-40px; } }
        .h-grain {
          position: absolute; inset: -80%; width: 260%; height: 260%;
          opacity: .022; pointer-events: none; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          animation: hGrain 10s steps(1) infinite; will-change: transform;
        }
        .h-inner {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; align-items: center;
          max-width: 640px; width: 100%;
        }
        .h-label {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(10px, 2vw, 13px); font-weight: 500;
          letter-spacing: .36em; text-transform: uppercase;
          color: rgba(255,255,255,.32); margin: 0 0 22px;
          will-change: opacity, transform;
          animation: hFadeUp .65s cubic-bezier(.16,1,.3,1) .08s both;
        }
        .h-headline {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: clamp(4.2rem, 16.5vw, 9.5rem); font-weight: 800;
          letter-spacing: -.02em; line-height: .94;
          background: linear-gradient(172deg, #ffffff 0%, #d4d4d4 55%, #b0b0b0 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          margin: 0 0 36px; will-change: opacity, transform;
          animation: hFadeUp .7s cubic-bezier(.16,1,.3,1) .20s both;
        }
        @media (max-width:480px) { .h-headline { font-size:clamp(3.4rem,18.5vw,5.5rem); margin-bottom:26px; } }
        .h-body {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(.9rem, 2.4vw, 1.04rem); font-weight: 400;
          line-height: 1.78; color: rgba(255,255,255,.40);
          max-width: 360px; margin: 0 auto 52px;
          will-change: opacity, transform;
          animation: hFadeUp .7s cubic-bezier(.16,1,.3,1) .32s both;
        }
        @media (max-width:480px) { .h-body { font-size:.88rem; max-width:285px; margin-bottom:38px; } }
        .h-cta {
          display: flex; flex-direction: column; align-items: center; gap: 14px;
          will-change: opacity, transform;
          animation: hFadeUp .7s cubic-bezier(.16,1,.3,1) .44s both;
        }
        .h-btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 11px; padding: 17px 44px; border-radius: 999px;
          background: #ffffff; color: #111111;
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700;
          letter-spacing: .01em; text-decoration: none; border: none; cursor: pointer;
          min-width: 230px; box-shadow: 0 2px 30px rgba(255,255,255,.12);
          transition: background .2s ease, transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .2s ease;
          white-space: nowrap; will-change: transform;
          -webkit-user-select: none; user-select: none;
        }
        .h-btn:hover  { background:#ededed; transform:translateY(-3px); box-shadow:0 8px 40px rgba(255,255,255,.20); }
        .h-btn:active { transform:translateY(0); transition-duration:.08s; }
        .h-btn-icon { display:inline-flex; align-items:center; justify-content:center; font-size:18px; line-height:1; }
        .h-btn-ghost {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 15px 44px; border-radius: 999px; background: transparent;
          color: rgba(255,255,255,.50); font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 600; letter-spacing: .04em;
          text-decoration: none; border: 1px solid rgba(255,255,255,.14); cursor: pointer;
          min-width: 230px;
          transition: background .2s ease, border-color .2s ease, color .2s ease, transform .22s cubic-bezier(.34,1.56,.64,1);
          white-space: nowrap; will-change: transform;
          -webkit-user-select: none; user-select: none;
        }
        .h-btn-ghost:hover  { background:rgba(255,255,255,.07); border-color:rgba(255,255,255,.32); color:white; transform:translateY(-3px); }
        .h-btn-ghost:active { transform:translateY(0); transition-duration:.08s; }
        .h-arrow {
          position: absolute; bottom: 28px; left: 50%; z-index: 2;
          color: rgba(255,255,255,.28); background: none; border: none;
          cursor: pointer; padding: 6px; will-change: transform, opacity;
          animation: hArrow 2.5s ease-in-out infinite; transition: color .2s ease;
        }
        .h-arrow:hover { color:rgba(255,255,255,.7); }
        @media (max-width:360px) {
          .h-btn, .h-btn-ghost { min-width:0; width:100%; }
          .h-cta { width:100%; padding:0 16px; }
        }

        /* ═══════════════════════════════════
           ABOUT
        ═══════════════════════════════════ */
        .about-grid { display:grid; grid-template-columns:1fr; width:100%; align-items:center; padding:0 20px; }
        @media (min-width:768px)  { .about-grid { grid-template-columns:1fr 1fr; padding:0 60px; } }
        @media (min-width:1280px) { .about-grid { padding:0 100px; } }
        .img-col  { order:1; display:flex; justify-content:center; align-items:center; width:100%; }
        @media (min-width:768px) { .img-col { order:2; justify-content:flex-end; } }
        .text-col { order:2; display:flex; flex-direction:column; align-items:center; text-align:center; padding:24px 0; gap:16px; }
        @media (min-width:768px) { .text-col { order:1; align-items:flex-start; text-align:left; padding:0 0 0 80px; } }
        .profile-img { width:100%; height:auto; max-width:400px; display:block; object-fit:contain; user-select:none; margin-top:-40px; }
        @media (min-width:768px)  { .profile-img { max-width:560px; margin-top:-120px; } }
        @media (min-width:1024px) { .profile-img { max-width:680px; margin-top:-160px; } }
        .accent-line { width:48px; height:3px; background:#bb00ff; border-radius:2px; }

        /* FIX 1: "WHO AM I?" title — Bricolage Grotesque, larger, bolder */
        .about-heading {
          font-family: 'Bricolage Grotesque', sans-serif !important;
          font-size: clamp(2.8rem, 10vw, 8rem) !important;
          font-weight: 800 !important;
          text-align: center;
        }
        @media (min-width:768px) { .about-heading { font-family: 'Bricolage Grotesque', sans-serif; text-align:left; } }

        .about-animate {
          opacity: 0; transform: translateY(24px);
          transition: opacity .5s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1);
          transition-delay: 0s !important;
          backface-visibility: hidden; will-change: opacity, transform;
        }
        .about-animate.in { opacity:1; transform:translateY(0); }
        .btn-primary   { font-family:inherit; background:#bb00ff; border:1.5px solid #bb00ff; color:white; padding:13px 28px; border-radius:8px; font-weight:900; font-size:12px; letter-spacing:.18em; text-transform:uppercase; text-decoration:none; transition:background .25s ease,color .25s ease; white-space:nowrap; }
        .btn-primary:hover { background:transparent; color:#bb00ff; }
        .btn-secondary { font-family:inherit; background:transparent; border:1.5px solid rgba(187,0,255,.5); color:#bb00ff; padding:13px 32px; border-radius:8px; font-weight:900; font-size:12px; letter-spacing:.18em; text-transform:uppercase; text-decoration:none; transition:background .25s ease,color .25s ease,border-color .25s ease; white-space:nowrap; }
        .btn-secondary:hover { background:#bb00ff; color:white; border-color:#bb00ff; }
        .stats-row { display:flex; gap:28px; flex-wrap:wrap; justify-content:center; }
        @media (min-width:768px) { .stats-row { justify-content:flex-start; } }
        .about-text-wrap { text-align:center; }
        @media (min-width:768px) { .about-text-wrap { text-align:left; } }

        /* ═══════════════════════════════════
           SKILLS
        ═══════════════════════════════════ */
        /* FIX 1: "MY SKILLS" — Bricolage Grotesque, larger, bolder */
        .sk-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(3.5rem, 12vw, 8rem);
          letter-spacing: -.04em;
          text-transform: uppercase;
          color: white;
          line-height: 1;
          margin-bottom: 64px;
          text-align: center;
        }
        .sk-grid  { display:flex; flex-wrap:wrap; gap:44px; align-items:center; justify-content:center; }
        @media (max-width:640px) { .sk-grid { gap:22px; } }
        .sk-card {
          display: flex; flex-direction: column; align-items: center;
          opacity: 0; transform: translateY(30px);
          transition: opacity .55s ease, transform .55s ease;
          backface-visibility: hidden; will-change: opacity, transform;
        }
        .sk-card.show { opacity:1; transform:translateY(0); }
        .sk-pct { font-family:'Syne',sans-serif; font-size:12px; font-weight:700; color:#bb00ff; letter-spacing:.05em; margin-bottom:8px; align-self:flex-end; padding-right:2px; min-width:40px; text-align:right; }
        .sk-ring-wrap {
          position:relative; width:130px; height:130px;
          display:flex; align-items:center; justify-content:center;
          transition: transform .3s cubic-bezier(.34,1.56,.64,1);
          cursor: default; will-change: transform;
        }
        @media (max-width:640px) { .sk-ring-wrap { width:105px; height:105px; } }
        .sk-ring-wrap:hover { transform:translateY(-6px) scale(1.06); }
        .sk-ring-svg { position:absolute; inset:0; width:100%; height:100%; transform:rotate(-90deg); }
        .sk-track    { fill:none; stroke:rgba(255,255,255,.07); stroke-width:3; }
        .sk-progress { fill:none; stroke-width:3; stroke-linecap:round; transition:stroke-dashoffset 1.4s cubic-bezier(.25,1,.5,1); }
        @media (max-width:767px) { .sk-progress { filter:none !important; } }
        .sk-logo-wrap { width:92px; height:92px; border-radius:18px; overflow:hidden; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,.05); padding:11px; }
        @media (max-width:640px) { .sk-logo-wrap { width:72px; height:72px; } }
        .sk-logo { width:100%; height:100%; object-fit:contain; }
        .sk-name { font-family:inherit; font-size:10px; font-weight:600; color:rgba(255,255,255,.32); letter-spacing:.07em; text-transform:uppercase; margin-top:10px; text-align:center; }

        /* ═══════════════════════════════════
           PROJECTS
        ═══════════════════════════════════ */
        /* FIX 1: "MY PROJECTS" — Bricolage Grotesque, larger, bolder */
        .proj-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800;
          font-size: clamp(3rem, 12vw, 8rem);
          letter-spacing: -.04em;
          text-transform: uppercase;
          color: white;
          line-height: 1;
          margin-bottom: 44px;
          text-align: center;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        @media (max-width:480px) { .proj-title { font-size:clamp(2.6rem,13vw,4rem); margin-bottom:28px; } }
        .tabs { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-bottom:24px; position:relative; z-index:1; padding:0 8px; }
        .tab  { font-family:inherit; font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:9px 18px; border-radius:999px; border:1.5px solid rgba(255,255,255,.1); color:rgba(255,255,255,.45); background:transparent; cursor:pointer; transition:background .2s ease,border-color .2s ease,color .2s ease,box-shadow .2s ease; }
        .tab:hover  { border-color:rgba(187,0,255,.5); color:white; }
        .tab.active { background:#bb00ff; border-color:#bb00ff; color:white; box-shadow:0 0 20px rgba(187,0,255,.4); }
        @media (max-width:480px) { .tab { font-size:10px; padding:8px 13px; } }
        .proj-grid { position:relative; width:100%; }
        .proj-card {
          position: absolute; border-radius: 14px; overflow: hidden;
          background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07);
          cursor: pointer;
          transition: transform .28s cubic-bezier(.34,1.4,.64,1), box-shadow .28s ease, border-color .28s ease;
          animation: fadeCard .4s ease both;
          backface-visibility: hidden; will-change: transform; isolation: isolate;
        }
        .proj-card:hover { transform:translateY(-6px); border-color:rgba(187,0,255,.4); box-shadow:0 16px 48px rgba(187,0,255,.15); }
        .proj-img { width:100%; height:auto; display:block; object-fit:contain; }
        .proj-placeholder { width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,rgba(187,0,255,.08),rgba(0,0,0,.4)); }
        .proj-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.85) 0%, transparent 60%);
          opacity: 0; transition: opacity .25s ease;
          display: flex; flex-direction: column; justify-content: flex-end; padding: 18px;
          will-change: opacity;
        }
        .proj-card:hover .proj-overlay { opacity:1; }
        .proj-name  { font-family:inherit; font-size:14px; font-weight:800; color:white; letter-spacing:-.02em; }
        .proj-badge { display:inline-block; margin-top:5px; font-family:inherit; font-size:10px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; padding:4px 10px; border-radius:999px; }

        /* ═══════════════════════════════════
           DISCLAIMER
        ═══════════════════════════════════ */
        @keyframes pulse-warn { 0%,100%{transform:scale(1)} 50%{transform:scale(1.18)} }
        .disclaimer-wrap  { display:flex; flex-direction:row-reverse; align-items:center; justify-content:center; gap:10px; margin:0 auto 36px; padding:14px 20px; border:1px solid rgba(255,200,0,.12); border-radius:12px; background:rgba(255,200,0,.04); max-width:860px; width:100%; position:relative; z-index:1; }
        .disclaimer-emoji { font-size:17px; flex-shrink:0; animation:pulse-warn 2.2s ease-in-out infinite; display:inline-block; }
        .disclaimer-text  { font-family:inherit; font-size:13px; font-weight:500; color:rgba(255,220,80,.65); line-height:1.7; text-align:center; direction:rtl; opacity:0; transition:opacity .4s ease; min-height:1.5em; }
        .disclaimer-text.typed { opacity:1; }

        /* ═══════════════════════════════════
           CONTACT / FOOTER
        ═══════════════════════════════════ */
        /* FIX 1: "WANT TO WORK TOGETHER?" — Bricolage Grotesque, larger, bolder */
        .contact-title {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-weight: 800 !important;
          font-size: clamp(2.8rem, 10vw, 7rem) !important;
          letter-spacing: -.04em !important;
          line-height: 1 !important;
          text-transform: uppercase;
          color: white;
          margin-bottom: 32px;
        }

        .contact-btn { font-family:inherit; font-weight:900; font-size:13px; letter-spacing:.2em; text-transform:uppercase; text-decoration:none; padding:18px 48px; border-radius:999px; background:#bb00ff; color:white; border:1.5px solid #bb00ff; transition:background .25s ease,color .25s ease,transform .22s cubic-bezier(.34,1.56,.64,1); display:inline-flex; align-items:center; gap:10px; margin-top:8px; will-change:transform; }
        .contact-btn:hover { background:transparent; color:#bb00ff; transform:translateY(-2px); }
        .contact-btn:active { transform:translateY(0); }

        /* FIX 3: footer — remove min-h-screen centering push, sit tight at bottom */
        .contact-section {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 120px 24px 0;
          overflow: hidden;
          background: transparent;
        }

        .contact-bottom {
          display: flex; flex-direction: column; gap: 20px;
          padding: 32px 24px 28px;
          border-top: 1px solid rgba(255,255,255,.07);
          margin-top: 80px;
          align-items: center;
          width: 100%;
        }
        @media (min-width:768px) {
          .contact-bottom {
            flex-direction: row; align-items: center;
            justify-content: space-between; padding: 32px 48px 28px;
          }
        }
        .footer-left   { display:flex; flex-direction:column; align-items:center; gap:4px; order:2; text-align:center; }
        @media (min-width:768px) { .footer-left { order:1; align-items:flex-start; text-align:left; flex:1; } }
        .footer-center { display:flex; align-items:center; justify-content:center; gap:20px; order:1; }
        @media (min-width:768px) { .footer-center { order:2; flex:1; } }
        .social-icon { display:flex; align-items:center; justify-content:center; width:42px; height:42px; border-radius:12px; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.08); color:rgba(255,255,255,.5); transition:transform .22s cubic-bezier(.34,1.56,.64,1),background .2s ease,color .2s ease,border-color .2s ease,box-shadow .2s ease; text-decoration:none; will-change:transform; }
        .social-icon:hover { transform:translateY(-3px) scale(1.1); }
        .social-icon.wa:hover { color:#25D366; background:rgba(37,211,102,.12); border-color:rgba(37,211,102,.3); box-shadow:0 6px 20px rgba(37,211,102,.2); }
        .social-icon.ig:hover { color:#E4405F; background:rgba(228,64,95,.12);  border-color:rgba(228,64,95,.3);  box-shadow:0 6px 20px rgba(228,64,95,.2); }
        .social-icon.tt:hover { color:#00f2ea; background:rgba(0,242,234,.12);  border-color:rgba(0,242,234,.3);  box-shadow:0 6px 20px rgba(0,242,234,.2); }
        .footer-right { display:flex; flex-direction:column; align-items:center; order:3; text-align:center; }
        @media (min-width:768px) { .footer-right { align-items:flex-end; text-align:right; flex:1; } }

        /* ═══════════════════════════════════
           SHARED / PERF
        ═══════════════════════════════════ */
        .orb { position: absolute; border-radius: 50%; pointer-events: none; z-index: 0; will-change: transform; }
        @media (max-width:767px) { .orb { filter:blur(55px) !important; width:180px !important; height:180px !important; opacity:.45 !important; } }

        /* FIX 2: Remove content-visibility:auto from cv-section — it causes
           the browser to estimate section heights, breaking anchor scroll
           positions. Sections are rendered normally so scroll targets are exact. */
        .cv-section {
          /* content-visibility: auto; — REMOVED to fix nav scroll bug */
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      {/* ═══════════════════════════════════════
          HOME
      ═══════════════════════════════════════ */}
      <section id="home" className="h-section">
        <div className="h-glow" />
        <div className="h-grain" />
        <div className="h-inner">
          <p className="h-label">Hello There!</p>
          <h1 className="h-headline">
            I'm Fahed<br />Hadji
          </h1>
          <p className="h-body">
            Welcome to my portfolio.<br />
            I am a Graphic Designer and Content Creator.
          </p>
          <div className="h-cta">
            <a href="#projects" className="h-btn">
              View My Work
              <span className="h-btn-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="13.5" cy="6.5"  r="0.5" fill="currentColor"/>
                  <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/>
                  <circle cx="8.5"  cy="7.5"  r="0.5" fill="currentColor"/>
                  <circle cx="6.5"  cy="12.5" r="0.5" fill="currentColor"/>
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                </svg>
              </span>
            </a>
            <a href="#contact" className="h-btn-ghost">Contact Me</a>
          </div>
        </div>
        <button
          className="h-arrow"
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Scroll to about"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════ */}
      <section id="about" ref={aboutRef} className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center" style={{ paddingTop: "120px", paddingBottom: "120px" }}>
        <div className="absolute w-[500px] h-[500px] bg-[#bb00ff]/10 blur-[180px] rounded-full -bottom-20 -right-20 -z-10" />
        <div className="about-grid">
          <div className={`img-col about-animate${aboutVisible ? " in" : ""}`} style={{ transitionDelay: "0.15s" }}>
            <img src="pro.png" alt="Fahed Hadji" className="profile-img" style={{ marginTop: "-100px" }} />
          </div>
          <div className={`text-col about-animate${aboutVisible ? " in" : ""}`} style={{ transitionDelay: "0s" }}>
            <div className="accent-line" />
            {/* FIX 1: Using .about-heading class which now applies Bricolage Grotesque */}
            <h3 className="about-heading" style={{ margin: 0, letterSpacing: "-0.04em", lineHeight: 1.1, whiteSpace: "nowrap" }}>
              <span style={{ color: "white" }}>WHO </span><span style={{ color: "#bb00ff" }}>AM I?</span>
            </h3>
            <div className="about-text-wrap" style={{ maxWidth: 700, paddingLeft: 10 }}>
              <ShinyText
                text="Morocco-based Graphic Designer and Content Creator with 5+ years of experience in the creative industry. I specialize in social media and advertising design, transforming brand messages into high-impact visual stories. My approach blends creative storytelling with a strategic, analytical edge—ensuring every project is not only visually compelling but also results-driven and delivered with meticulous precision."
                disabled={false} speed={3} className="text-white/70 text-lg md:text-xl font-bold leading-relaxed" />
            </div>
            <div className="stats-row" style={{ maxWidth: 500 }}>
              {[{ num: "5+", label: "Years Exp." }, { num: "50+", label: "Clients" }, { num: "∞", label: "Creativity" }].map(s => (
                <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
                  <span style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 900, color: "#bb00ff", lineHeight: 1 }}>{s.num}</span>
                  <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.75em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SKILLS
      ═══════════════════════════════════════ */}
      <section id="skills" ref={skillsRef}
        className="cv-section relative z-10 w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ padding:"80px 40px", background:"transparent" }}
      >
        <div className="orb" style={{ width:600, height:400, background:"rgba(187,0,255,0.07)", filter:"blur(130px)", bottom:-100, left:"50%", transform:"translateX(-50%)" }} />
        {/* FIX 1: sk-title now uses Bricolage Grotesque via updated CSS */}
        <h2 className="sk-title">My <span style={{ color:"#bb00ff" }}>SKILLS</span></h2>
        <div className="sk-grid">
          {skills.map((s, i) => {
            const R = 60, C = 2 * Math.PI * R;
            const offset = animated ? C - (s.pct / 100) * C : C;
            return (
              <div key={s.name} className={`sk-card${skillsVisible ? " show" : ""}`}
                style={{ transitionDelay:`${i * 100}ms` }}>
                <span className="sk-pct" ref={el => { counterEls.current[i] = el; }}>0%</span>
                <div className="sk-ring-wrap">
                  <svg className="sk-ring-svg" viewBox="0 0 130 130">
                    <circle className="sk-track"    cx="65" cy="65" r={R} />
                    <circle className="sk-progress" cx="65" cy="65" r={R}
                      stroke={s.color} strokeDasharray={C} strokeDashoffset={offset}
                      style={{ filter:`drop-shadow(0 0 7px ${s.color}99)`,
                               transitionDelay:`${i * 120 + 260}ms` }} />
                  </svg>
                  <div className="sk-logo-wrap">
                    <img src={s.logo} alt={s.name} className="sk-logo" loading="lazy" decoding="async" />
                  </div>
                </div>
                <span className="sk-name">{s.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROJECTS
      ═══════════════════════════════════════ */}
      <section id="projects" ref={projRef}
        className="cv-section relative z-10 w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden"
        style={{ padding:"80px 12px", background:"transparent" }}
      >
        <div className="orb" style={{ width:500, height:500, background:"rgba(187,0,255,0.06)", filter:"blur(130px)", top:-100, right:-100 }} />

        {/* FIX 1: proj-title now uses Bricolage Grotesque via updated CSS */}
        <h2 className="proj-title" style={{
          opacity:   projVisible ? 1 : 0,
          transform: projVisible ? "translateY(0)" : "translateY(40px)",
          transition:"opacity 1.1s cubic-bezier(.16,1,.3,1),transform 1.1s cubic-bezier(.16,1,.3,1)"
        }}>
          My <span style={{ color:"#bb00ff" }}>PROJECTS</span>
        </h2>

        <div className="tabs" style={{
          opacity:   projVisible ? 1 : 0,
          transform: projVisible ? "translateY(0)" : "translateY(40px)",
          transition:"opacity 1.1s cubic-bezier(.16,1,.3,1),transform 1.1s cubic-bezier(.16,1,.3,1)"
        }}>
          {CATS.map(c => (
            <button key={c} className={`tab${activeTab === c ? " active" : ""}`}
              onClick={() => handleTabClick(c)}>{c}</button>
          ))}
        </div>

        {activeTab === "Thumbnails" && (
          <div style={{ width:"100%", maxWidth:1100, margin:"0 auto", paddingLeft:12, paddingRight:12,
            opacity: projVisible ? 1 : 0, transition:"opacity 1.1s cubic-bezier(.16,1,.3,1)" }}>
            <DisclaimerTyping triggerKey={disclaimerKey} />
          </div>
        )}

        <div ref={masonryRef} className="proj-grid" style={{
          maxWidth:1100, margin:"0 auto",
          height: masonryHeight || undefined,
          opacity:   projVisible ? 1 : 0,
          transform: projVisible ? "translateY(0)" : "translateY(28px)",
          transition:"opacity 1.1s cubic-bezier(.16,1,.3,1),transform 1.1s cubic-bezier(.16,1,.3,1)"
        }}>
          {filtered.map((p, i) => (
            <div key={p.id} className="proj-card"
              style={{
                animationDelay:`${Math.min(i * 50, 350)}ms`,
                ...(masonryStyles[i]
                  ? { top:masonryStyles[i].top, left:masonryStyles[i].left, width:masonryStyles[i].width }
                  : { position:"relative", width:"100%" })
              }}>
              {p.img
                ? <img src={p.img} alt={p.title} className="proj-img"
                    onLoad={computeMasonry} loading="lazy" decoding="async" />
                : <div className="proj-placeholder">
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:32, color:"rgba(255,255,255,.15)" }}>＋</span>
                      <span style={{ fontFamily:"inherit", fontSize:11, fontWeight:600, letterSpacing:".1em",
                        textTransform:"uppercase", color:"rgba(255,255,255,.2)", marginTop:8 }}>Add Image</span>
                    </div>
                  </div>
              }
              <div className="proj-overlay">
                <span className="proj-name">{p.title}</span>
                <span className="proj-badge"
                  style={{ background:`${catColors[p.category]}22`, color:catColors[p.category] }}>
                  {p.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {activeTab !== "Thumbnails" && (
          <div style={{ width:"100%", maxWidth:1100, margin:"40px auto 0", paddingLeft:12, paddingRight:12,
            opacity: projVisible ? 1 : 0, transition:"opacity 1.1s cubic-bezier(.16,1,.3,1)" }}>
            <DisclaimerTyping triggerKey={disclaimerKey} />
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════
          CONTACT
          FIX 3: Changed from min-h-screen + justify-center to contact-section
          class which uses padding-top only — footer stays tight at bottom.
      ═══════════════════════════════════════ */}
      <section id="contact" className="contact-section cv-section">
        <div className="orb" style={{ width:600, height:600, background:"rgba(187,0,255,0.08)", filter:"blur(140px)", top:"40%", left:"50%", transform:"translate(-50%,-50%)" }} />

        <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">
          <span className="mb-6 inline-block px-4 py-1 border border-white/10 rounded-full uppercase tracking-widest text-[#bb00ff]"
            style={{ fontFamily:"inherit", fontSize:11, fontWeight:700, letterSpacing:"0.3em" }}>
            Let's Connect
          </span>
          {/* FIX 1: contact-title class applies Bricolage Grotesque */}
          <h2 className="contact-title">
            Want to<br /><span style={{ color:"#bb00ff" }}>Work</span> Together?
          </h2>
          <p className="text-neutral-400 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mb-12">
            I'm always open to new projects, creative ideas, or opportunities to be part of something great. Let's build something amazing.
          </p>
          <a href="https://wa.me/212718982539" target="_blank" rel="noreferrer" className="contact-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Send a Message
          </a>
        </div>

        {/* FIX 3: Footer border line sits directly above footer text, no gap */}
        <div className="contact-bottom">
          <div className="footer-left">
            <span style={{ fontSize:15, fontWeight:700, color:"white", letterSpacing:"0.02em" }}>
              FahdHadji19@gmail.com
            </span>
            <span style={{ fontSize:11, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase",
              color:"rgba(255,255,255,0.35)" }}>
              © 2026 Graphic Designer &amp; Content Creator
            </span>
          </div>

          <div className="footer-center">
            <a href="https://wa.me/212718982539" target="_blank" rel="noreferrer"
              className="social-icon wa" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/mr_fahed_designer/" target="_blank" rel="noreferrer"
              className="social-icon ig" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@fahddesigner19?lang=fr" target="_blank" rel="noreferrer"
              className="social-icon tt" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          </div>

          <div className="footer-right">
            <span style={{ fontSize:15, fontWeight:900, color:"rgba(255,255,255,0.22)", letterSpacing:"0.04em" }}>
              Designed &amp; Built by{" "}
              <a href="https://instagram.com/ilyass._ag" target="_blank" rel="noreferrer"
                style={{ color:"#bb00ff", textDecoration:"none" }}
                onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}>
                @ilyass._ag
              </a>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}