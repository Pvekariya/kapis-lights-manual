"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <>
      <Navbar />
      <PageWrapper>
        <main style={{ maxWidth: 1100, margin: "0 auto", padding: "70px 24px 100px" }}>
          <div style={{ textAlign: "center", marginBottom: 42 }}>
            <span className="badge" style={{ marginBottom: 18, display: "inline-block" }}>
              ✦ SHOPPING CART
            </span>
            <h1 className="section-title" style={{ marginBottom: 10 }}>
              Your Cart
            </h1>
            <p className="section-sub" style={{ marginBottom: 0 }}>
              Review products before checkout
            </p>
          </div>

          {!items.length ? (
            <div className="card" style={{ padding: "42px 28px", textAlign: "center" }}>
              <p style={{ color: "rgba(168,146,192,0.82)", marginBottom: 20 }}>Your cart is empty.</p>
              <Link href="/products" className="btn-primary">
                Browse Products
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 0.8fr", gap: 24 }}>
              <div style={{ display: "grid", gap: 16 }}>
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="card"
                    style={{ padding: 20, display: "grid", gridTemplateColumns: "96px 1fr auto", gap: 18, alignItems: "center" }}
                  >
                    <div style={{ width: 96, height: 96, borderRadius: 14, overflow: "hidden", background: "rgba(255,255,255,0.03)" }}>
                      <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 10 }} />
                    </div>
                    <div>
                      <h2 style={{ fontFamily: "'Cinzel', serif", color: "#f5c842", fontSize: "1rem", marginBottom: 8 }}>
                        {item.title}
                      </h2>
                      <p style={{ color: "rgba(168,146,192,0.72)", fontSize: "0.88rem" }}>
                        {item.price > 0 ? `Rs. ${item.price}` : "Price on request"}
                      </p>
                    </div>
                    <div style={{ display: "grid", gap: 10, justifyItems: "end" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="btn-outline" style={{ padding: "8px 12px" }}>
                          -
                        </button>
                        <span style={{ minWidth: 24, textAlign: "center" }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="btn-outline" style={{ padding: "8px 12px" }}>
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        style={{ color: "rgba(240,232,255,0.7)", background: "transparent", border: "none", cursor: "pointer" }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="card" style={{ padding: 24, alignSelf: "start" }}>
                <h2 style={{ fontFamily: "'Cinzel', serif", color: "#f5c842", marginBottom: 18 }}>Summary</h2>
                <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(240,232,255,0.82)" }}>
                  <span>Subtotal</span>
                  <strong>{subtotal > 0 ? `Rs. ${subtotal}` : "Price on request"}</strong>
                </div>
                <p style={{ marginTop: 14, color: "rgba(168,146,192,0.74)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                  COD is available only when the cart total is Rs. 1000 or less. Online payment works when product prices are set in admin and Razorpay is configured.
                </p>
                <Link href="/checkout" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 18 }}>
                  Proceed to Checkout
                </Link>
              </aside>
            </div>
          )}
        </main>

        <style>{`
          @media (max-width: 900px) {
            main > div[style*="grid-template-columns: 1.5fr 0.8fr"] {
              grid-template-columns: 1fr !important;
            }
          }
          @media (max-width: 640px) {
            div[style*="grid-template-columns: 96px 1fr auto"] {
              grid-template-columns: 1fr !important;
              justify-items: start;
            }
          }
        `}</style>
      </PageWrapper>
      <Footer />
    </>
  );
}
