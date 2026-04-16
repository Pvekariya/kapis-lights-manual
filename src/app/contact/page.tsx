import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";

export const metadata = {
  title: "Contact Kapis Lights",
  description: "Get in touch with Kapis Lights for dealership and inquiries.",
};

export default function Contact() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <main style={{ padding: "80px 24px 100px", maxWidth: 1000, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="badge" style={{ marginBottom: 20, display: "inline-block" }}>
              ✦ GET IN TOUCH
            </span>
            <h1 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              color: "#f5c842",
              marginBottom: 16,
            }}>
              Contact Us
            </h1>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "rgba(168,146,192,0.85)",
              fontSize: "1.1rem",
              fontStyle: "italic",
            }}>
              Reach out for dealership enquiries, product information, or partnerships.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40, alignItems: "start" }}>

            {/* Contact details */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                {
                  icon: "📍",
                  label: "Address",
                  value: "DLF Industrial Area, Moti Nagar, New Delhi – 110015",
                },
                {
                  icon: "📞",
                  label: "Phone",
                  value: "+91 99530 84555",
                  href: "tel:+919953084555",
                },
                {
                  icon: "✉️",
                  label: "Email",
                  value: "kapislights@gmail.com",
                  href: "mailto:kapislights@gmail.com",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="card"
                  style={{ padding: "24px 24px", display: "flex", gap: 18, alignItems: "flex-start" }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: "rgba(245,200,66,0.08)",
                    border: "1px solid rgba(245,200,66,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.1rem", flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Cinzel', serif", color: "rgba(168,146,192,0.6)", fontSize: "0.7rem", letterSpacing: "0.08em", marginBottom: 6 }}>
                      {item.label.toUpperCase()}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{ color: "rgba(240,232,255,0.9)", fontSize: "0.92rem", textDecoration: "none", lineHeight: 1.6 }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ color: "rgba(240,232,255,0.9)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <a
                href="https://wa.me/919953084555"
                target="_blank"
                className="btn-primary"
                style={{ background: "#25D366", color: "white", justifyContent: "center", marginTop: 8 }}
              >
                Chat on WhatsApp →
              </a>
            </div>

            {/* Map */}
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid rgba(245,200,66,0.15)",
                height: 420,
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24260.925604437518!2d77.16453863935692!3d28.643617498708174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1770808591858!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </main>

        <style>{`
          @media (max-width: 768px) {
            main > div[style*="grid-template-columns: 1fr 1.4fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </PageWrapper>
      <Footer />
    </>
  );
}