"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import { useCart } from "@/components/CartProvider";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

async function loadRazorpayScript() {
  if (window.Razorpay) return true;

  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "razorpay">("cod");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [paymentConfig, setPaymentConfig] = useState<{
    cod: { enabled: boolean; maxAmount: number; message: string };
    razorpay: { enabled: boolean; message: string };
  } | null>(null);
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    async function loadPaymentConfig() {
      const response = await fetch(`/api/payments/config?total=${subtotal}`, { cache: "no-store" });
      const data = (await response.json()) as {
        paymentMethods: {
          cod: { enabled: boolean; maxAmount: number; message: string };
          razorpay: { enabled: boolean; message: string };
        };
      };

      setPaymentConfig(data.paymentMethods);

      setPaymentMethod((current) => {
        if (!data.paymentMethods.cod.enabled && current === "cod" && data.paymentMethods.razorpay.enabled) {
          return "razorpay";
        }

        return current;
      });
    }

    loadPaymentConfig().catch(() => {
      setPaymentConfig(null);
    });
  }, [subtotal]);

  async function placeOrder(paymentStatus: "pending" | "paid" | "cod", razorpayOrderId?: string, razorpayPaymentId?: string) {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        items,
        totalAmount: subtotal,
        paymentMethod,
        paymentStatus,
        razorpayOrderId,
        razorpayPaymentId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to place order");
    }

    clearCart();
    router.push("/products");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      if (!items.length) {
        throw new Error("Your cart is empty.");
      }

      if (paymentMethod === "cod") {
        if (!paymentConfig?.cod.enabled) {
          throw new Error(`Cash on Delivery is only available up to Rs. ${paymentConfig?.cod.maxAmount || 1000}.`);
        }
        await placeOrder("cod");
        return;
      }

      if (!paymentConfig?.razorpay.enabled) {
        throw new Error("Razorpay is not configured yet.");
      }

      if (subtotal <= 0) {
        throw new Error("Set product prices in admin before using online payment.");
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || !window.Razorpay) {
        throw new Error("Razorpay checkout failed to load.");
      }

      const checkoutResponse = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(subtotal * 100),
          receipt: `kapis-${Date.now()}`,
        }),
      });

      const checkoutData = (await checkoutResponse.json()) as {
        error?: string;
        keyId?: string;
        order?: { id: string; amount: number; currency: string };
      };

      if (!checkoutResponse.ok || !checkoutData.order || !checkoutData.keyId) {
        throw new Error(checkoutData.error || "Unable to create Razorpay order.");
      }

      const razorpay = new window.Razorpay({
        key: checkoutData.keyId,
        amount: checkoutData.order.amount,
        currency: checkoutData.order.currency,
        name: "Kapis Lights",
        description: "Product purchase",
        order_id: checkoutData.order.id,
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string }) => {
          await placeOrder("paid", response.razorpay_order_id, response.razorpay_payment_id);
        },
        prefill: {
          name: form.customerName,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#f5c842",
        },
      });

      razorpay.open();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Checkout failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <PageWrapper>
        <main style={{ maxWidth: 1180, margin: "0 auto", padding: "70px 24px 100px" }}>
          <div style={{ textAlign: "center", marginBottom: 42 }}>
            <span className="badge" style={{ marginBottom: 18, display: "inline-block" }}>
              ✦ CHECKOUT
            </span>
            <h1 className="section-title" style={{ marginBottom: 10 }}>
              Complete Your Order
            </h1>
            <p className="section-sub" style={{ marginBottom: 0 }}>
              Enter customer details and choose a payment method
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 24 }}>
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  { key: "customerName", label: "Full Name" },
                  { key: "email", label: "Email" },
                  { key: "phone", label: "Phone" },
                  { key: "postalCode", label: "Postal Code" },
                  { key: "city", label: "City" },
                  { key: "state", label: "State" },
                ].map((field) => (
                  <label key={field.key} style={{ display: "grid", gap: 8 }}>
                    <span style={{ color: "rgba(240,232,255,0.82)" }}>{field.label}</span>
                    <input
                      required
                      value={form[field.key as keyof typeof form]}
                      onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                    />
                  </label>
                ))}
              </div>

              <label style={{ display: "grid", gap: 8, marginTop: 16 }}>
                <span style={{ color: "rgba(240,232,255,0.82)" }}>Address</span>
                <textarea
                  required
                  rows={5}
                  value={form.address}
                  onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
                />
              </label>

              <div style={{ marginTop: 20, display: "grid", gap: 10 }}>
                <label className="card" style={{ padding: 16, display: "flex", gap: 12, alignItems: "start", opacity: paymentConfig && !paymentConfig.cod.enabled ? 0.55 : 1 }}>
                  <input
                    type="radio"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    disabled={paymentConfig ? !paymentConfig.cod.enabled : false}
                  />
                  <span>
                    <strong style={{ display: "block" }}>Cash on Delivery / Manual fulfilment</strong>
                    <small style={{ color: "rgba(168,146,192,0.72)" }}>
                      {paymentConfig?.cod.message || "Cash on Delivery is available for eligible orders."}
                    </small>
                  </span>
                </label>
                <label className="card" style={{ padding: 16, display: "flex", gap: 12, alignItems: "start", opacity: paymentConfig && !paymentConfig.razorpay.enabled ? 0.55 : 1 }}>
                  <input
                    type="radio"
                    checked={paymentMethod === "razorpay"}
                    onChange={() => setPaymentMethod("razorpay")}
                    disabled={paymentConfig ? !paymentConfig.razorpay.enabled : false}
                  />
                  <span>
                    <strong style={{ display: "block" }}>Pay online with Razorpay</strong>
                    <small style={{ color: "rgba(168,146,192,0.72)" }}>
                      {paymentConfig?.razorpay.message || "Online payment."}
                    </small>
                  </span>
                </label>
              </div>

              {message && <p style={{ color: "#ffb6b6", marginTop: 16 }}>{message}</p>}
            </div>

            <aside className="card" style={{ padding: 24, alignSelf: "start" }}>
              <h2 style={{ fontFamily: "'Cinzel', serif", color: "#f5c842", marginBottom: 18 }}>Order Summary</h2>
              <div style={{ display: "grid", gap: 12 }}>
                {items.map((item) => (
                  <div key={item.productId} style={{ display: "flex", justifyContent: "space-between", gap: 12, color: "rgba(240,232,255,0.84)" }}>
                    <span>{item.title} × {item.quantity}</span>
                    <span>{item.price > 0 ? `Rs. ${item.price * item.quantity}` : "Quote"}</span>
                  </div>
                ))}
              </div>
              <div style={{ height: 1, background: "rgba(245,200,66,0.12)", margin: "18px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(240,232,255,0.9)", marginBottom: 18 }}>
                <strong>Total</strong>
                <strong>{subtotal > 0 ? `Rs. ${subtotal}` : "Price on request"}</strong>
              </div>
              {paymentConfig && !paymentConfig.cod.enabled && (
                <p style={{ color: "rgba(168,146,192,0.76)", fontSize: "0.86rem", marginBottom: 16 }}>
                  COD is disabled because the order total is above Rs. {paymentConfig.cod.maxAmount}.
                </p>
              )}
              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={submitting}>
                {submitting ? "Processing..." : paymentMethod === "cod" ? "Place Order" : "Pay Now"}
              </button>
            </aside>
          </form>
        </main>

        <style>{`
          @media (max-width: 900px) {
            form[style*="grid-template-columns: 1.2fr 0.8fr"] {
              grid-template-columns: 1fr !important;
            }
          }
          @media (max-width: 640px) {
            div[style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </PageWrapper>
      <Footer />
    </>
  );
}
