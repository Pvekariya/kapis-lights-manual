"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/dealer", label: "Dealer" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled
          ? "rgba(17, 2, 32, 0.95)"
          : "rgba(26, 6, 48, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled
          ? "1px solid rgba(245,200,66,0.25)"
          : "1px solid rgba(245,200,66,0.08)",
        transition: "all 0.4s ease",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <img
            src="/logo.png"
            alt="Kapis Lights"
            style={{ height: 52, width: "auto", objectFit: "contain" }}
          />
        </Link>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          className="desktop-nav"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: "rgba(240,232,255,0.8)",
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.9rem",
                padding: "8px 16px",
                borderRadius: 8,
                letterSpacing: "0.03em",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#f5c842";
                (e.target as HTMLElement).style.background = "rgba(245,200,66,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "rgba(240,232,255,0.8)";
                (e.target as HTMLElement).style.background = "transparent";
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dealer"
            className="btn-primary"
            style={{ marginLeft: 8, fontSize: "0.8rem", padding: "10px 22px" }}
          >
            Get Quote
          </Link>
          <Link
            href="/cart"
            style={{
              marginLeft: 8,
              color: "rgba(240,232,255,0.9)",
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: "0.85rem",
              padding: "10px 14px",
              borderRadius: 99,
              border: "1px solid rgba(245,200,66,0.16)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            Cart ({itemCount})
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            color: "#f5c842",
          }}
          className="hamburger"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(17, 2, 32, 0.98)",
            borderTop: "1px solid rgba(245,200,66,0.15)",
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "rgba(240,232,255,0.85)",
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                padding: "12px 16px",
                borderRadius: 8,
                fontSize: "0.95rem",
                transition: "all 0.2s ease",
                display: "block",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/dealer"
            onClick={() => setMenuOpen(false)}
            className="btn-primary"
            style={{ marginTop: 12, textAlign: "center", justifyContent: "center" }}
          >
            Get Quote
          </Link>
          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: 10,
              color: "rgba(240,232,255,0.85)",
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              padding: "12px 16px",
              borderRadius: 8,
              fontSize: "0.95rem",
              border: "1px solid rgba(245,200,66,0.15)",
            }}
          >
            Cart ({itemCount})
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
