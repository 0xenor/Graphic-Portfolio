"use client";
import React, { useState, useEffect, useCallback, memo } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home",     id: "home",     num: "00" },
  { name: "About",    id: "about",    num: "01" },
  { name: "Skills",   id: "skills",   num: "02" },
  { name: "Projects", id: "projects", num: "03" },
  { name: "Contact",  id: "contact",  num: "04" },
] as const;

type NavId = typeof NAV_LINKS[number]["id"];
function scrollToSection(id: string, delay = 0) {
  const run = () => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  delay > 0 ? setTimeout(run, delay) : run();
}

function afterOverlayClose(overlayEl: HTMLElement | null, cb: () => void) {
  if (!overlayEl) { cb(); return; }
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    overlayEl.removeEventListener("transitionend", onEnd);
    clearTimeout(fallback);
    cb();
  };
  const onEnd = (e: TransitionEvent) => {
    if (e.propertyName === "transform") finish();
  };
  const fallback = setTimeout(finish, 520);
  overlayEl.addEventListener("transitionend", onEnd);
}

const DesktopLink = memo(function DesktopLink({
  id, name, active, onClick,
}: { id: string; name: string; active: boolean; onClick: () => void }) {
  return (
    <button className={`nb-link${active ? " on" : ""}`} onClick={onClick}>
      {name}
    </button>
  );
});


const MobileLink = memo(function MobileLink({
  id, name, num, active, onClick,
}: { id: string; name: string; num: string; active: boolean; onClick: () => void }) {
  return (
    <button className={`nb-mlink${active ? " on" : ""}`} onClick={onClick}>
      <span style={{ fontSize: 10, fontWeight: 700, marginRight: 22, color: active ? "#bb00ff" : "rgba(255,255,255,.1)" }}>
        {num}
      </span>
      <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-.02em", textTransform: "uppercase", color: active ? "white" : "rgba(255,255,255,.2)" }}>
        {name}
      </span>
    </button>
  );
});


const Navbar = () => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [active,   setActive]   = useState<NavId>("home");
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.35 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleDesktopNav = useCallback((id: NavId) => {
    setActive(id);
    scrollToSection(id);
  }, []);

  const handleMobileNav = useCallback((id: NavId) => {
    setActive(id);
    setIsOpen(false);
    afterOverlayClose(overlayRef.current, () => scrollToSection(id));
  }, []);

  const toggleMenu = useCallback(() => setIsOpen(v => !v), []);
  const closeMenu  = useCallback(() => setIsOpen(false), []);

  return (
    <nav style={{ position: "fixed", top: 24, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "center", padding: "0 16px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&display=swap');

        .nb-pill {
          font-family: 'Syne', sans-serif;
          background: rgba(18,18,18,0.75);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          box-shadow: 0 4px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06);
          transition: background .6s ease, box-shadow .6s ease, border-color .6s ease;
          will-change: backdrop-filter;
        }
        .nb-pill.scrolled {
          background: rgba(255,255,255,0.03);
          border-color: rgba(255,255,255,0.06);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          box-shadow: none;
        }
        .nb-link {
          font-family: 'Syne', sans-serif;
          font-size: 13.5px; font-weight: 600;
          letter-spacing: -.025em;
          color: rgba(255,255,255,.5);
          text-decoration: none; cursor: pointer;
          position: relative; padding-bottom: 2px;
          background: none; border: none;
          transition: color .2s ease;
        }
        .nb-link:hover { color: rgba(255,255,255,.95); }
        .nb-link.on    { color: #fff; }
        .nb-link.on::after {
          content: '';
          position: absolute; bottom: -2px; left: 0; right: 0;
          height: 1.5px; background: white;
          border-radius: 2px; opacity: .45;
        }
        .nb-brand {
          font-family: 'Syne', sans-serif;
          font-weight: 700; font-size: 15px;
          letter-spacing: -.05em; color: #fff; white-space: nowrap;
        }

        .nb-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,.97);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          display: flex; flex-direction: column;
          align-items: flex-start; justify-content: center;
          padding: 0 40px; gap: 6px; z-index: 200;
          font-family: 'Syne', sans-serif;
          transition: transform .45s cubic-bezier(.76,0,.24,1), opacity .35s ease;
          will-change: transform, opacity;
        }
        .nb-overlay.hide { transform: translateX(100%); opacity: 0; pointer-events: none; }
        .nb-overlay.show { transform: translateX(0);    opacity: 1; }

        .nb-mlink {
          display: flex; align-items: center;
          width: 100%; max-width: 320px;
          padding: 18px 28px; border-radius: 14px;
          cursor: pointer; background: none;
          border: none; border-left: 5px solid transparent;
          transition: background .2s ease;
        }
        .nb-mlink:hover { background: rgba(255,255,255,.04); }
        .nb-mlink.on {
          background: linear-gradient(to right, rgba(187,0,255,.18), transparent);
          border-left-color: white;
          box-shadow: 0 0 50px rgba(187,0,255,.18);
        }
        .nb-hbtn {
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 50%; padding: 10px;
          color: white; cursor: pointer;
          backdrop-filter: blur(12px);
          transition: background .3s ease;
          display: flex; align-items: center; justify-content: center;
          z-index: 210; position: relative;
        }
        .nb-close-btn {
          position: absolute; top: 28px; right: 28px;
          background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 50%; padding: 10px;
          color: white; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }

        .nb-desktop { display: flex; }
        .nb-mobile  { display: none; }
        @media (max-width: 767px) {
          .nb-desktop { display: none; }
          .nb-mobile  { display: flex; }
        }
      `}</style>

      <div
        className={`nb-desktop nb-pill${scrolled ? " scrolled" : ""}`}
        style={{ alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 860, height: 55, padding: "0 32px", borderRadius: 999 }}
      >
        <span className="nb-brand">Mr Fahed Designer</span>
        <div style={{ display: "flex", gap: 36 }}>
          {NAV_LINKS.map(l => (
            <DesktopLink key={l.id} id={l.id} name={l.name} active={active === l.id} onClick={() => handleDesktopNav(l.id)} />
          ))}
        </div>
      </div>

      <div
        className="nb-mobile"
        style={{
          width: "100%", alignItems: "center", justifyContent: "space-between",
          paddingLeft: 16, paddingRight: 12, height: 55, borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.08)",
          background: scrolled ? "rgba(255,255,255,0.03)" : "rgba(18,18,18,0.75)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          transition: "background 0.6s ease",
        }}
      >
        <span className="nb-brand">Mr Fahed Designer</span>
        <button className="nb-hbtn" onClick={toggleMenu} aria-label={isOpen ? "Close menu" : "Open menu"}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div ref={overlayRef} className={`nb-overlay${isOpen ? " show" : " hide"}`} role="dialog" aria-modal="true" aria-label="Navigation">
        <button className="nb-close-btn" onClick={closeMenu} aria-label="Close navigation">
          <X size={22} />
        </button>

        <p style={{ color: "rgba(255,255,255,.18)", fontSize: 10, fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 16 }}>
          Navigation
        </p>

        {NAV_LINKS.map(l => (
          <MobileLink key={l.id} id={l.id} name={l.name} num={l.num} active={active === l.id} onClick={() => handleMobileNav(l.id)} />
        ))}
      </div>
    </nav>
  );
};

export default memo(Navbar);