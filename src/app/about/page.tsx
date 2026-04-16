import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";

export const metadata = {
  title: "About Kapis Lights",
  description: "Learn about Kapis Lights, a trusted LED lighting manufacturer.",
};

export default function About() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <main style={{ padding: "80px 24px 100px", maxWidth: 1100, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span
              className="badge"
              style={{ marginBottom: 20, display: "inline-block" }}
            >
              ✦ OUR STORY
            </span>
            <h1 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#f5c842",
              marginBottom: 20,
            }}>
              About Kapis Lights
            </h1>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "rgba(168,146,192,0.85)",
              fontSize: "1.2rem",
              maxWidth: 600,
              margin: "0 auto",
              fontStyle: "italic",
              lineHeight: 1.8,
            }}>
              Lighting up India — one bulb at a time, with purpose and precision.
            </p>
          </div>

          {/* Story */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
            marginBottom: 80,
          }}>
            <div>
              <div className="divider" style={{ margin: "0 0 32px", maxWidth: "100%", justifyContent: "flex-start" }}>
                <span style={{ color: "#f5c842" }}>✦</span>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(245,200,66,0.45), transparent)" }} />
              </div>
              <p style={{ color: "rgba(168,146,192,0.85)", lineHeight: 1.9, fontSize: "0.98rem", marginBottom: 20 }}>
                Kapis Lights is a specialised LED lighting manufacturer focused on decorative and utility lighting solutions for the Indian market. We design products that balance performance, visual appeal, and affordability for homes, commercial spaces, and festive environments.
              </p>
              <p style={{ color: "rgba(168,146,192,0.85)", lineHeight: 1.9, fontSize: "0.98rem" }}>
                Every product is built with strict quality standards and modern manufacturing practices to ensure durability, safety, and consistent performance. Our growing dealer network reflects our commitment to long-term partnerships and reliable supply across regions.
              </p>
            </div>

            {/* Mission card */}
            <div className="card" style={{ padding: "40px 36px" }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: "rgba(245,200,66,0.1)",
                border: "1px solid rgba(245,200,66,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.4rem", marginBottom: 20,
              }}>
                🎯
              </div>
              <h2 style={{
                fontFamily: "'Cinzel', serif",
                color: "#f5c842",
                fontSize: "1.1rem",
                marginBottom: 16,
              }}>
                Our Mission
              </h2>
              <p style={{ color: "rgba(168,146,192,0.85)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                To provide smart, affordable, and reliable lighting solutions while building strong partnerships with dealers and distributors across the market.
              </p>
            </div>
          </div>

          {/* MSME */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(245,200,66,0.06) 0%, rgba(43,8,61,0.8) 100%)",
              border: "1px solid rgba(245,200,66,0.2)",
              borderRadius: 20,
              padding: "40px 40px",
              marginBottom: 72,
              display: "flex",
              alignItems: "center",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div style={{
              width: 60, height: 60, borderRadius: 16,
              background: "rgba(245,200,66,0.12)",
              border: "1px solid rgba(245,200,66,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.8rem", flexShrink: 0,
            }}>
              🏛️
            </div>
            <div>
              <h2 style={{ fontFamily: "'Cinzel', serif", color: "#f5c842", fontSize: "1.05rem", marginBottom: 8 }}>
                MSME Registered Enterprise
              </h2>
              <p style={{ color: "rgba(168,146,192,0.85)", fontSize: "0.92rem" }}>
                Kapis Lights is a Government of India registered Micro Enterprise (Udyam Registration No: <strong style={{ color: "rgba(240,232,255,0.9)" }}>UDYAM-DL-11-0041596</strong>) under the Ministry of MSME.
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div style={{ marginBottom: 48 }}>
            <div className="divider"><span className="divider-icon">✦</span></div>
            <h2 className="section-title">Certifications & Standards</h2>
            <p className="section-sub">Quality you can trust, performance you can measure</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
              {[
                { icon: "🏆", title: "ISO Certified", desc: "Quality management compliance across all manufacturing processes." },
                { icon: "⚡", title: "Energy Efficient", desc: "Low power consumption design for long-term cost savings." },
                { icon: "🛡️", title: "Safety Tested", desc: "Reliable performance standards with rigorous testing protocols." },
              ].map((cert) => (
                <div
                  key={cert.title}
                  className="card"
                  style={{ padding: "32px 28px", textAlign: "center" }}
                >
                  <div style={{
                    fontSize: "2rem", marginBottom: 16,
                    width: 56, height: 56, borderRadius: 14,
                    background: "rgba(245,200,66,0.08)",
                    border: "1px solid rgba(245,200,66,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px",
                  }}>
                    {cert.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Cinzel', serif", color: "#f5c842", fontSize: "0.95rem", marginBottom: 10 }}>
                    {cert.title}
                  </h3>
                  <p style={{ color: "rgba(168,146,192,0.75)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                    {cert.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </main>

        <style>{`
          @media (max-width: 768px) {
            main > div[style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </PageWrapper>
      <Footer />
    </>
  );
}