"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #110220 0%, #0a0115 100%)",
        borderTop: "1px solid rgba(245,200,66,0.12)",
        marginTop: 80,
      }}
    >
      {/* Top strip */}
      <div
        style={{
          background: "rgba(245,200,66,0.05)",
          borderBottom: "1px solid rgba(245,200,66,0.08)",
          padding: "12px 0",
          overflow: "hidden",
        }}
      >
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: "flex", gap: 48, paddingRight: 48 }}>
              {["Premium LED Manufacturing", "ISO Certified", "MSME Registered", "Energy Efficient", "India's Decorative Lighting Leader", "Dealer Network Across India"].map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    color: "rgba(245,200,66,0.6)",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ color: "#f5c842", fontSize: "0.6rem" }}>✦</span>
                  {t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "60px 24px 40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 48,
        }}
      >
        {/* Brand */}
        <div>
          <img src="/logo.png" alt="Kapis Lights" style={{ height: 60, marginBottom: 16 }} />
          <p style={{ color: "rgba(168,146,192,0.8)", fontSize: "0.9rem", lineHeight: 1.8, maxWidth: 260 }}>
            Specialised LED lighting manufacturer delivering decorative and utility solutions across India.
          </p>
          <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
            <a
              href="https://wa.me/919953084555"
              target="_blank"
              style={{
                background: "rgba(37,211,102,0.12)",
                border: "1px solid rgba(37,211,102,0.3)",
                color: "#25D366",
                padding: "8px 16px",
                borderRadius: 99,
                fontSize: "0.8rem",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 style={{ fontFamily: "'Cinzel', serif", color: "#f5c842", marginBottom: 20, fontSize: "0.85rem", letterSpacing: "0.08em" }}>
            NAVIGATION
          </h4>
          <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[["Home", "/"], ["Products", "/products"], ["About", "/about"], ["Dealer", "/dealer"], ["Contact", "/contact"]].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                style={{ color: "rgba(168,146,192,0.8)", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#f5c842")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(168,146,192,0.8)")}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontFamily: "'Cinzel', serif", color: "#f5c842", marginBottom: 20, fontSize: "0.85rem", letterSpacing: "0.08em" }}>
            CONTACT
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ color: "rgba(168,146,192,0.8)", fontSize: "0.9rem", lineHeight: 1.7 }}>
              DLF Industrial Area,<br />Moti Nagar, New Delhi – 110015
            </p>
            <a href="tel:+919953084555" style={{ color: "rgba(168,146,192,0.8)", textDecoration: "none", fontSize: "0.9rem" }}>
              +91 99530 84555
            </a>
            <a href="mailto:kapislights@gmail.com" style={{ color: "rgba(168,146,192,0.8)", textDecoration: "none", fontSize: "0.9rem" }}>
              kapislights@gmail.com
            </a>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h4 style={{ fontFamily: "'Cinzel', serif", color: "#f5c842", marginBottom: 20, fontSize: "0.85rem", letterSpacing: "0.08em" }}>
            CERTIFICATIONS
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "✦", label: "ISO Certified Manufacturing" },
              { icon: "✦", label: "MSME Registered (UDYAM-DL-11-0041596)" },
              { icon: "✦", label: "Energy Efficient Products" },
              { icon: "✦", label: "Safety Tested Standards" },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#f5c842", fontSize: "0.6rem", marginTop: 6, flexShrink: 0 }}>{icon}</span>
                <span style={{ color: "rgba(168,146,192,0.8)", fontSize: "0.88rem" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(245,200,66,0.08)",
          padding: "20px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "rgba(168,146,192,0.5)", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif" }}>
          © {new Date().getFullYear()} Kapis Lights — All rights reserved
        </p>
      </div>
    </footer>
  );
}
