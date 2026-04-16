"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import { PRODUCT_RANGES, type OrderRecord, type ProductRangeKey, type ProductRecord } from "@/lib/shop-schema";

type PaymentConfig = {
  paymentMethods: {
    cod: {
      enabled: boolean;
      label: string;
      maxAmount: number;
    };
    razorpay: {
      enabled: boolean;
      keyIdPreview: string | null;
      secretConfigured: boolean;
    };
  };
};

type ProductFormState = {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  rangeKey: ProductRangeKey;
  price: string;
  stock: string;
  cardMeta: string;
  cardDetail: string;
  images: string;
  colors: string;
  types: string;
  specs: string;
  active: boolean;
};

const EMPTY_FORM: ProductFormState = {
  slug: "",
  title: "",
  description: "",
  rangeKey: "standard-led",
  price: "0",
  stock: "0",
  cardMeta: "",
  cardDetail: "",
  images: "",
  colors: "",
  types: "",
  specs: "",
  active: true,
};

function toMultiline(value: string[]) {
  return value.join("\n");
}

function parseMultiline(value: string) {
  return value
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function mapProductToForm(product: ProductRecord): ProductFormState {
  return {
    _id: product._id,
    slug: product.slug,
    title: product.title,
    description: product.description,
    rangeKey: product.rangeKey,
    price: String(product.price),
    stock: String(product.stock),
    cardMeta: product.cardMeta,
    cardDetail: product.cardDetail || "",
    images: toMultiline(product.images),
    colors: toMultiline(product.colors),
    types: toMultiline(product.types),
    specs: toMultiline(product.specs),
    active: product.active,
  };
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig | null>(null);
  const [form, setForm] = useState<ProductFormState>(EMPTY_FORM);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [orderSavingId, setOrderSavingId] = useState<string | null>(null);

  async function refreshData() {
    const [productsResponse, ordersResponse, paymentsResponse] = await Promise.all([
      fetch("/api/products", { cache: "no-store" }),
      fetch("/api/orders", { cache: "no-store" }),
      fetch("/api/admin/payments", { cache: "no-store" }),
    ]);

    const productsData = (await productsResponse.json()) as { products: ProductRecord[] };
    const ordersData = (await ordersResponse.json()) as { orders?: OrderRecord[] };
    const paymentsData = (await paymentsResponse.json()) as PaymentConfig;
    setProducts(productsData.products);
    setOrders(ordersData.orders || []);
    setPaymentConfig(paymentsData);
  }

  useEffect(() => {
    async function bootstrap() {
      const response = await fetch("/api/admin/session", { cache: "no-store" });
      const data = (await response.json()) as { authenticated: boolean };
      setAuthenticated(data.authenticated);
      setCheckingSession(false);

      if (data.authenticated) {
        await refreshData();
      }
    }

    bootstrap().catch(() => setCheckingSession(false));
  }, []);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      setMessage("Invalid admin password.");
      return;
    }

    setAuthenticated(true);
    setPassword("");
    await refreshData();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setProducts([]);
    setOrders([]);
    setForm(EMPTY_FORM);
  }

  async function handleSaveProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const payload = {
      slug: form.slug,
      title: form.title,
      description: form.description,
      rangeKey: form.rangeKey,
      price: Number(form.price),
      stock: Number(form.stock),
      cardMeta: form.cardMeta,
      cardDetail: form.cardDetail,
      images: parseMultiline(form.images),
      colors: parseMultiline(form.colors),
      types: parseMultiline(form.types),
      specs: parseMultiline(form.specs),
      active: form.active,
    };

    const response = await fetch(form._id ? `/api/products/${form._id}` : "/api/products", {
      method: form._id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!response.ok) {
      setMessage("Unable to save product.");
      return;
    }

    setForm(EMPTY_FORM);
    setMessage("Product saved.");
    await refreshData();
  }

  async function handleDeleteProduct(id: string) {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setMessage("Unable to delete product.");
      return;
    }

    if (form._id === id) {
      setForm(EMPTY_FORM);
    }

    await refreshData();
  }

  async function handleOrderUpdate(orderId: string, updates: Partial<OrderRecord>) {
    setOrderSavingId(orderId);
    setMessage("");

    const response = await fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    setOrderSavingId(null);

    if (!response.ok) {
      setMessage("Unable to update order.");
      return;
    }

    await refreshData();
  }

  const paidOrders = orders.filter((order) => order.paymentStatus === "paid").length;
  const pendingPayments = orders.filter((order) => (order.paymentStatus || "cod") === "pending").length;
  const newOrders = orders.filter((order) => (order.orderStatus || "new") === "new").length;

  if (checkingSession) {
    return (
      <>
        <Navbar />
        <PageWrapper>
          <div style={{ padding: "120px 24px", textAlign: "center", color: "rgba(168,146,192,0.8)" }}>
            Loading admin...
          </div>
        </PageWrapper>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <PageWrapper>
        <main style={{ maxWidth: 1320, margin: "0 auto", padding: "70px 24px 100px" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span className="badge" style={{ marginBottom: 18, display: "inline-block" }}>
              ✦ ADMIN DASHBOARD
            </span>
            <h1 className="section-title" style={{ marginBottom: 10 }}>
              Catalogue Control Panel
            </h1>
            <p className="section-sub" style={{ marginBottom: 0 }}>
              Manage products, prices, images, and incoming orders
            </p>
          </div>

          {!authenticated ? (
            <form onSubmit={handleLogin} className="card" style={{ maxWidth: 460, margin: "0 auto", padding: 28 }}>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ color: "rgba(240,232,255,0.85)" }}>Admin Password</span>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              </label>
              {message && <p style={{ marginTop: 14, color: "#ffb6b6" }}>{message}</p>}
              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 18 }}>
                Sign In
              </button>
            </form>
          ) : (
            <div style={{ display: "grid", gap: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <div style={{ color: "rgba(168,146,192,0.82)" }}>
                  Products: {products.length} • Orders: {orders.length}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button onClick={() => void refreshData()} className="btn-outline">
                    Refresh Data
                  </button>
                  <button onClick={handleLogout} className="btn-outline">
                    Logout
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16 }}>
                {[
                  { label: "Active Products", value: products.filter((product) => product.active).length },
                  { label: "New Orders", value: newOrders },
                  { label: "Pending Payments", value: pendingPayments },
                  { label: "Paid Orders", value: paidOrders },
                ].map((item) => (
                  <div key={item.label} className="card" style={{ padding: 20 }}>
                    <div style={{ color: "#f5c842", fontFamily: "'Cinzel', serif", fontSize: "1.25rem" }}>{item.value}</div>
                    <div style={{ color: "rgba(168,146,192,0.8)", fontSize: "0.85rem", marginTop: 6 }}>{item.label}</div>
                  </div>
                ))}
              </div>

              <section className="card" style={{ padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "start", flexWrap: "wrap" }}>
                  <div>
                    <h2 style={{ fontFamily: "'Cinzel', serif", color: "#f5c842", marginBottom: 10 }}>Payments</h2>
                    <p style={{ color: "rgba(168,146,192,0.78)", fontSize: "0.9rem" }}>
                      COD is available by default. Razorpay becomes usable when both production keys are configured.
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <a href="https://dashboard.razorpay.com/" target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: "10px 16px" }}>
                      Razorpay Dashboard
                    </a>
                    <a href="https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/" target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: "10px 16px" }}>
                      Setup Docs
                    </a>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 18 }}>
                  <div style={{ border: "1px solid rgba(245,200,66,0.12)", borderRadius: 14, padding: 18 }}>
                    <strong style={{ color: "#f5c842" }}>Cash on Delivery</strong>
                    <p style={{ marginTop: 8, color: "rgba(168,146,192,0.78)", fontSize: "0.88rem" }}>
                      {paymentConfig?.paymentMethods.cod.enabled ? "Enabled" : "Disabled"} • {paymentConfig?.paymentMethods.cod.label}
                    </p>
                    <p style={{ marginTop: 6, color: "rgba(168,146,192,0.66)", fontSize: "0.82rem" }}>
                      COD is accepted only when site checkout total is Rs. {paymentConfig?.paymentMethods.cod.maxAmount || 1000} or less.
                    </p>
                  </div>
                  <div style={{ border: "1px solid rgba(245,200,66,0.12)", borderRadius: 14, padding: 18 }}>
                    <strong style={{ color: "#f5c842" }}>Razorpay</strong>
                    <p style={{ marginTop: 8, color: "rgba(168,146,192,0.78)", fontSize: "0.88rem" }}>
                      {paymentConfig?.paymentMethods.razorpay.enabled ? "Configured" : "Not configured"}
                    </p>
                    <p style={{ marginTop: 6, color: "rgba(168,146,192,0.66)", fontSize: "0.82rem" }}>
                      Key: {paymentConfig?.paymentMethods.razorpay.keyIdPreview || "Missing"} • Secret: {paymentConfig?.paymentMethods.razorpay.secretConfigured ? "Present" : "Missing"}
                    </p>
                  </div>
                </div>
              </section>

              <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24 }}>
                <form onSubmit={handleSaveProduct} className="card" style={{ padding: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 18 }}>
                    <h2 style={{ fontFamily: "'Cinzel', serif", color: "#f5c842" }}>
                      {form._id ? "Edit Product" : "Add Product"}
                    </h2>
                    {form._id && (
                      <button type="button" className="btn-outline" style={{ padding: "10px 16px" }} onClick={() => setForm(EMPTY_FORM)}>
                        New Product
                      </button>
                    )}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <label style={{ display: "grid", gap: 8 }}>
                      <span>Title</span>
                      <input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} required />
                    </label>
                    <label style={{ display: "grid", gap: 8 }}>
                      <span>Slug</span>
                      <input value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))} required />
                    </label>
                    <label style={{ display: "grid", gap: 8 }}>
                      <span>Range</span>
                      <select value={form.rangeKey} onChange={(event) => setForm((current) => ({ ...current, rangeKey: event.target.value as ProductRangeKey }))}>
                        {PRODUCT_RANGES.map((range) => (
                          <option key={range.key} value={range.key}>
                            {range.title}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label style={{ display: "grid", gap: 8 }}>
                      <span>Price (INR)</span>
                      <input type="number" min="0" value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} />
                    </label>
                    <label style={{ display: "grid", gap: 8 }}>
                      <span>Stock</span>
                      <input type="number" min="0" value={form.stock} onChange={(event) => setForm((current) => ({ ...current, stock: event.target.value }))} />
                    </label>
                    <label style={{ display: "grid", gap: 8 }}>
                      <span>Active</span>
                      <select value={form.active ? "yes" : "no"} onChange={(event) => setForm((current) => ({ ...current, active: event.target.value === "yes" }))}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </label>
                  </div>

                  <label style={{ display: "grid", gap: 8, marginTop: 16 }}>
                    <span>Description</span>
                    <textarea rows={4} value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} required />
                  </label>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
                    <label style={{ display: "grid", gap: 8 }}>
                      <span>Card Meta</span>
                      <input value={form.cardMeta} onChange={(event) => setForm((current) => ({ ...current, cardMeta: event.target.value }))} required />
                    </label>
                    <label style={{ display: "grid", gap: 8 }}>
                      <span>Card Detail</span>
                      <input value={form.cardDetail} onChange={(event) => setForm((current) => ({ ...current, cardDetail: event.target.value }))} />
                    </label>
                  </div>

                  <div style={{ display: "grid", gap: 16, marginTop: 16 }}>
                    {[
                      { key: "images", label: "Image URLs", hint: "One image path or URL per line" },
                      { key: "colors", label: "Colors", hint: "One color per line" },
                      { key: "types", label: "Types", hint: "One type per line" },
                      { key: "specs", label: "Specifications", hint: "One spec per line" },
                    ].map((field) => (
                      <label key={field.key} style={{ display: "grid", gap: 8 }}>
                        <span>{field.label}</span>
                        <textarea
                          rows={field.key === "images" ? 5 : 4}
                          value={form[field.key as keyof ProductFormState] as string}
                          onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
                        />
                        <small style={{ color: "rgba(168,146,192,0.66)" }}>{field.hint}</small>
                      </label>
                    ))}
                  </div>

                  {message && <p style={{ color: "rgba(240,232,255,0.84)", marginTop: 16 }}>{message}</p>}
                  <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 18 }} disabled={saving}>
                    {saving ? "Saving..." : form._id ? "Update Product" : "Create Product"}
                  </button>
                </form>

                <div style={{ display: "grid", gap: 24 }}>
                  <section className="card" style={{ padding: 24 }}>
                    <h2 style={{ fontFamily: "'Cinzel', serif", color: "#f5c842", marginBottom: 18 }}>Products</h2>
                    <div style={{ display: "grid", gap: 12, maxHeight: 620, overflowY: "auto" }}>
                      {products.map((product) => (
                        <div key={product._id} style={{ border: "1px solid rgba(245,200,66,0.12)", borderRadius: 14, padding: 16 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                            <div>
                              <h3 style={{ color: "#f5c842", fontFamily: "'Cinzel', serif", fontSize: "0.95rem" }}>{product.title}</h3>
                              <p style={{ color: "rgba(168,146,192,0.72)", fontSize: "0.82rem", marginTop: 6 }}>
                                {product.slug} • Rs. {product.price} • Stock {product.stock}
                              </p>
                            </div>
                            <div style={{ display: "flex", gap: 8 }}>
                              <button type="button" className="btn-outline" style={{ padding: "8px 14px" }} onClick={() => setForm(mapProductToForm(product))}>
                                Edit
                              </button>
                              {product._id && (
                                <button type="button" className="btn-outline" style={{ padding: "8px 14px" }} onClick={() => handleDeleteProduct(product._id!)}>
                                  Delete
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="card" style={{ padding: 24 }}>
                    <h2 style={{ fontFamily: "'Cinzel', serif", color: "#f5c842", marginBottom: 18 }}>Orders</h2>
                    <p style={{ color: "rgba(168,146,192,0.72)", fontSize: "0.86rem", marginBottom: 14 }}>
                      These orders are received live from the website checkout flow.
                    </p>
                    <div style={{ display: "grid", gap: 12, maxHeight: 420, overflowY: "auto" }}>
                      {orders.length === 0 && <p style={{ color: "rgba(168,146,192,0.75)" }}>No orders yet.</p>}
                      {orders.map((order, index) => {
                        const paymentMethodLabel = (order.paymentMethod || "cod").toUpperCase();
                        const paymentStatusLabel = order.paymentStatus || (order.paymentMethod === "razorpay" ? "pending" : "cod");
                        const orderStatusLabel = order.orderStatus || "new";
                        const itemsLabel = Array.isArray(order.items)
                          ? order.items.map((item) => `${item.title} × ${item.quantity}`).join(", ")
                          : "No items recorded";

                        return (
                        <div key={order._id || `${order.email}-${index}`} style={{ border: "1px solid rgba(245,200,66,0.12)", borderRadius: 14, padding: 16 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                            <strong style={{ color: "#f5c842" }}>{order.customerName}</strong>
                            <span style={{ color: "rgba(168,146,192,0.72)", fontSize: "0.82rem" }}>
                              {paymentMethodLabel} • {paymentStatusLabel} • {orderStatusLabel}
                            </span>
                          </div>
                          <p style={{ color: "rgba(168,146,192,0.82)", fontSize: "0.88rem", marginTop: 8 }}>
                            {order.email} • {order.phone}
                          </p>
                          <p style={{ color: "rgba(168,146,192,0.82)", fontSize: "0.88rem", marginTop: 6 }}>
                            Total: Rs. {order.totalAmount}
                          </p>
                          {(order.razorpayOrderId || order.razorpayPaymentId) && (
                            <p style={{ color: "rgba(168,146,192,0.66)", fontSize: "0.82rem", marginTop: 6 }}>
                              {order.razorpayOrderId ? `Razorpay Order: ${order.razorpayOrderId}` : ""}
                              {order.razorpayOrderId && order.razorpayPaymentId ? " • " : ""}
                              {order.razorpayPaymentId ? `Payment: ${order.razorpayPaymentId}` : ""}
                            </p>
                          )}
                          <p style={{ color: "rgba(168,146,192,0.66)", fontSize: "0.82rem", marginTop: 6 }}>
                            {itemsLabel}
                          </p>
                          <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                              <label style={{ display: "grid", gap: 6 }}>
                                <span style={{ color: "rgba(168,146,192,0.72)", fontSize: "0.78rem" }}>Payment Status</span>
                                <select
                                  value={paymentStatusLabel}
                                  onChange={(event) => {
                                    void handleOrderUpdate(order._id || "", { paymentStatus: event.target.value as OrderRecord["paymentStatus"] });
                                  }}
                                  disabled={!order._id || orderSavingId === order._id}
                                >
                                  <option value="cod">cod</option>
                                  <option value="pending">pending</option>
                                  <option value="paid">paid</option>
                                  <option value="failed">failed</option>
                                </select>
                              </label>
                              <label style={{ display: "grid", gap: 6 }}>
                                <span style={{ color: "rgba(168,146,192,0.72)", fontSize: "0.78rem" }}>Order Status</span>
                                <select
                                  value={orderStatusLabel}
                                  onChange={(event) => {
                                    void handleOrderUpdate(order._id || "", { orderStatus: event.target.value as OrderRecord["orderStatus"] });
                                  }}
                                  disabled={!order._id || orderSavingId === order._id}
                                >
                                  <option value="new">new</option>
                                  <option value="confirmed">confirmed</option>
                                  <option value="processing">processing</option>
                                  <option value="shipped">shipped</option>
                                  <option value="delivered">delivered</option>
                                  <option value="cancelled">cancelled</option>
                                </select>
                              </label>
                            </div>
                            <label style={{ display: "grid", gap: 6 }}>
                              <span style={{ color: "rgba(168,146,192,0.72)", fontSize: "0.78rem" }}>Admin Note</span>
                              <textarea
                                rows={2}
                                defaultValue={order.adminNote || ""}
                                placeholder="Payment confirmation, dispatch notes, follow-up remarks..."
                                onBlur={(event) => {
                                  if (!order._id) return;
                                  if ((order.adminNote || "") === event.target.value) return;
                                  void handleOrderUpdate(order._id, { adminNote: event.target.value });
                                }}
                              />
                            </label>
                            <div style={{ color: "rgba(168,146,192,0.6)", fontSize: "0.78rem" }}>
                              {order.createdAt ? `Created: ${new Date(order.createdAt).toLocaleString()}` : ""}
                              {order.updatedAt ? ` • Updated: ${new Date(order.updatedAt).toLocaleString()}` : ""}
                            </div>
                          </div>
                        </div>
                      )})}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}
        </main>

        <style>{`
          @media (max-width: 1100px) {
            div[style*="grid-template-columns: repeat(4, minmax(0, 1fr))"] {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
            div[style*="grid-template-columns: 1fr 1fr"][style*="margin-top: 18px"] {
              grid-template-columns: 1fr !important;
            }
          }
          @media (max-width: 960px) {
            div[style*="grid-template-columns: 1.1fr 0.9fr"] {
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
