"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import { useState } from "react";
import { motion } from "framer-motion";

const products = [
  "0.5 Watt LED Bulb",
  "0.5 Watt 2-Pin Plug-in",
  "0.5 Watt Prism",
  "5W Candle LED Bulb",
  "Gramin 4W",
  "Gramin 6W",
  "Gramin 9W",
  "12W Pixel LED RGB",
  "12W Pixel LED Warm White",
  "10W Pixel LED Warm White",
  "12W Metallic Jumbo RGB",
  "12W Metallic Jumbo Motor RGB",
  "5W Metallic Flower RGB Lamp",
  "9W Metallic RGB Lamp",
];

export default function Dealer() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", product: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    const res = await fetch("/api/dealer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      setForm({ name: "", email: "", phone: "", product: "", message: "" });
      setSuccess(true);
    }
  };

  return (
    <>
      <Navbar />
      <PageWrapper>
        <main style={{ padding: "80px 24px 100px", maxWidth: 1100, margin: "0 auto" }}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 64, alignItems: "start" }}>

            {/* Left: Info */}
            <div>
              <span className="badge" style={{ marginBottom: 20, display: "inline-block" }}>
                ✦ DEALER PROGRAMME
              </span>
              <h1 style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "#f5c842",
                lineHeight: 1.25,
                marginBottom: 20,
              }}>
                Become a<br />Kapis Lights Dealer
              </h1>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "rgba(168,146,192,0.85)",
                fontSize: "1.1rem",
                fontStyle: "italic",
                lineHeight: 1.8,
                marginBottom: 40,
              }}>
                Join our growing network of distributors and retailers. Benefit from competitive pricing, reliable supply, and strong margins across India.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { icon: "💰", title: "Strong Margins", desc: "Competitive trade pricing with healthy margins for dealers." },
                  { icon: "🚚", title: "Reliable Supply", desc: "Consistent stock availability and timely dispatch across India." },
                  { icon: "🛡️", title: "Quality Assured", desc: "ISO certified manufacturing with safety tested products." },
                  { icon: "🤝", title: "Partner Support", desc: "Dedicated support for all dealer queries and requirements." },
                ].map((b) => (
                  <div key={b.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: "rgba(245,200,66,0.08)",
                      border: "1px solid rgba(245,200,66,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1rem",
                    }}>
                      {b.icon}
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Cinzel', serif", color: "#f5c842", fontSize: "0.85rem", marginBottom: 4 }}>{b.title}</p>
                      <p style={{ color: "rgba(168,146,192,0.75)", fontSize: "0.85rem", lineHeight: 1.6 }}>{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div
              style={{
                background: "rgba(43,8,61,0.5)",
                border: "1px solid rgba(245,200,66,0.15)",
                borderRadius: 24,
                padding: "44px 40px",
              }}
            >
              <h2 style={{
                fontFamily: "'Cinzel', serif",
                color: "#f5c842",
                fontSize: "1.1rem",
                marginBottom: 32,
                letterSpacing: "0.05em",
              }}>
                Submit Enquiry
              </h2>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={{ fontFamily: "'Cinzel', serif", fontSize: "0.72rem", letterSpacing: "0.08em", color: "rgba(168,146,192,0.65)", display: "block", marginBottom: 8 }}>
                    FULL NAME
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    placeholder="Your name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontFamily: "'Cinzel', serif", fontSize: "0.72rem", letterSpacing: "0.08em", color: "rgba(168,146,192,0.65)", display: "block", marginBottom: 8 }}>
                    PHONE NUMBER
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    placeholder="+91 XXXXX XXXXX"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontFamily: "'Cinzel', serif", fontSize: "0.72rem", letterSpacing: "0.08em", color: "rgba(168,146,192,0.65)", display: "block", marginBottom: 8 }}>
                    EMAIL ADDRESS
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    placeholder="you@example.com"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label style={{ fontFamily: "'Cinzel', serif", fontSize: "0.72rem", letterSpacing: "0.08em", color: "rgba(168,146,192,0.65)", display: "block", marginBottom: 8 }}>
                    PRODUCT RANGE
                  </label>
                  <select
                    name="product"
                    value={form.product}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select product range...</option>
                    {products.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontFamily: "'Cinzel', serif", fontSize: "0.72rem", letterSpacing: "0.08em", color: "rgba(168,146,192,0.65)", display: "block", marginBottom: 8 }}>
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    placeholder="Tell us about your business and requirements..."
                    onChange={handleChange}
                    rows={4}
                    style={{ resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    marginTop: 8,
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Submitting..." : "Submit Enquiry →"}
                </button>

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.3)",
                      borderRadius: 12,
                      padding: "16px 20px",
                      textAlign: "center",
                      color: "#4ade80",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.9rem",
                    }}
                  >
                    ✅ Enquiry submitted! We'll be in touch shortly.
                  </motion.div>
                )}
              </form>
            </div>
          </div>

        </main>

        <style>{`
          @media (max-width: 768px) {
            main > div[style*="grid-template-columns: 1fr 1.1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </PageWrapper>
      <Footer />
    </>
  );
}