"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavLink {
  name: string;
  id: string;
  href: string;
  num: string;
}

const navLinks: NavLink[] = [
  { name: "Home",     id: "home",     href: "/",         num: "00" },
  { name: "About",    id: "about",    href: "#about",    num: "01" },
  { name: "Skills",   id: "skills",   href: "#skills",   num: "02" },
  { name: "Projects", id: "projects", href: "#projects", num: "03" },
  { name: "Contact",  id: "contact",  href: "#contact",  num: "04" },
];

const Navbar = () => {
  const [isOpen, setIsOpen]        = useState(false);
  const [activeSection, setActive] = useState("home");
  const [isScrolled, setScrolled]  = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 24, left: 0, right: 0,
      zIndex: 100, display: "flex", justifyContent: "center", padding: "0 16px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&display=swap');

        .nb-pill {
          font-family: 'Syne', sans-serif;
          background: rgba(18,18,18,0.75);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          box-shadow: 0 4px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06);
          transition: background .6s, box-shadow .6s, backdrop-filter .6s, border-color .6s;
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
          text-decoration: none;
          cursor: pointer;
          position: relative;
          padding-bottom: 2px;
          transition: color .25s;
        }
        .nb-link:hover { color: rgba(255,255,255,.95); }
        .nb-link.on    { color: #fff; }
        .nb-link.on::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 1.5px; background: white;
          border-radius: 2px; opacity: .45;
        }
        .nb-brand {
          font-family: 'Syne', sans-serif;
          font-weight: 700; font-size: 15px;
          letter-spacing: -.05em; color: #fff;
          white-space: nowrap;
        }

        /* mobile overlay */
        .nb-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,.97);
          backdrop-filter: blur(28px);
          display: flex; flex-direction: column;
          align-items: flex-start; justify-content: center;
          padding: 0 40px; gap: 6px;
          z-index: 200;
          transition: transform .5s cubic-bezier(.76,0,.24,1), opacity .4s;
          font-family: 'Syne', sans-serif;
        }
        .nb-overlay.hide { transform: translateX(100%); opacity: 0; pointer-events: none; }
        .nb-overlay.show { transform: translateX(0);    opacity: 1; }

        .nb-mlink {
          display: flex; align-items: center;
          width: 100%; max-width: 320px;
          padding: 18px 28px; border-radius: 14px;
          text-decoration: none; cursor: pointer;
          transition: background .25s;
          border-left: 5px solid transparent;
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
          transition: background .4s;
          display: flex; align-items: center; justify-content: center;
          z-index: 210; position: relative;
        }

        .nb-desktop { display: flex; }
        .nb-mobile  { display: none;  }
        @media (max-width: 767px) {
          .nb-desktop { display: none; }
          .nb-mobile  { display: flex; }
        }
      `}</style>

      {/* Desktop */}
      <div className={`nb-desktop nb-pill${isScrolled ? " scrolled" : ""}`} style={{
        alignItems: "center", justifyContent: "space-between",
        width: "100%", maxWidth: 860, height: 55,
        padding: "0 32px", borderRadius: 999,
      }}>
        <span className="nb-brand">Mr Fahed Designer</span>
        <div style={{ display: "flex", gap: 36 }}>
          {navLinks.map(l => (
            <a key={l.id} href={l.href}
              className={`nb-link${activeSection === l.id ? " on" : ""}`}
              onClick={() => setActive(l.id)}>
              {l.name}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile bar — always blur */}
      <div className="nb-mobile" style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 16,
        paddingRight: 12,
        height: 55,
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.08)",
        background: isScrolled ? "rgba(255,255,255,0.03)" : "rgba(18,18,18,0.75)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        transition: "background 0.6s",
      }}>
        <span className="nb-brand">Mr Fahed Designer</span>
        <button className="nb-hbtn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile overlay menu */}
      <div className={`nb-overlay${isOpen ? " show" : " hide"}`}>
        <p style={{
          color: "rgba(255,255,255,.18)", fontSize: 10, fontWeight: 900,
          letterSpacing: "0.5em", textTransform: "uppercase",
          marginBottom: 16,
        }}>Navigation</p>

        {navLinks.map(l => (
          <a key={l.id} href={l.href}
            className={`nb-mlink${activeSection === l.id ? " on" : ""}`}
            onClick={() => { setActive(l.id); setIsOpen(false); }}>
            <span style={{
              fontSize: 10, fontWeight: 900, marginRight: 22,
              color: activeSection === l.id ? "#bb00ff" : "rgba(255,255,255,.1)",
            }}>{l.num}</span>
            <span style={{
              fontSize: 17, fontWeight: 900, letterSpacing: "-.04em", textTransform: "uppercase",
              color: activeSection === l.id ? "white" : "rgba(255,255,255,.2)",
            }}>{l.name}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;