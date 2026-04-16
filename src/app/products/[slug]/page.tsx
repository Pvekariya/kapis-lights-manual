"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import { useCart } from "@/components/CartProvider";
import type { ProductRecord } from "@/lib/shop-schema";

export default function ProductPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;
  const { addItem } = useCart();

  const [product, setProduct] = useState<ProductRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      setLoading(true);
      const response = await fetch("/api/products", { cache: "no-store" });
      const data = (await response.json()) as { products: ProductRecord[] };
      const nextProduct = data.products.find((item) => item.slug === slug) || null;
      setProduct(nextProduct);
      setColor(nextProduct?.colors[0] || "");
      setType(nextProduct?.types[0] || "");
      setIndex(0);
      setLoading(false);
    }

    loadProduct().catch(() => setLoading(false));
  }, [slug]);

  const filteredImages = useMemo(() => {
    if (!product) return [];

    const shouldSkipType = product.types.length <= 1;

    let images = product.images.filter((img) => {
      const lowerImg = img.toLowerCase();
      const matchesType =
        !shouldSkipType && type ? lowerImg.includes(type.toLowerCase()) : true;

      let matchesColor = true;
      if (color) {
        const lowerColor = color.toLowerCase();
        if (lowerColor === "white") {
          matchesColor = lowerImg.endsWith("white.jpg") && !lowerImg.includes("warm white");
        } else {
          matchesColor = lowerImg.includes(lowerColor);
        }
      }

      return matchesType && matchesColor;
    });

    if (!images.length) {
      images = product.images;
    }

    return images;
  }, [product, type, color]);

  const activeImage = filteredImages[index] || filteredImages[0];

  if (loading) {
    return (
      <>
        <Navbar />
        <PageWrapper>
          <div style={{ padding: "120px 24px", textAlign: "center", color: "rgba(168,146,192,0.8)" }}>
            Loading product...
          </div>
        </PageWrapper>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <PageWrapper>
          <div style={{ padding: "120px 24px", textAlign: "center" }}>
            <p style={{ fontFamily: "'Cinzel', serif", color: "#f5c842", fontSize: "1.5rem" }}>
              Product not found
            </p>
            <Link href="/products" className="btn-outline" style={{ marginTop: 24, display: "inline-flex" }}>
              ← Back to Products
            </Link>
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
        <main style={{ padding: "60px 24px 100px", maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 40, display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="/products" style={{ color: "rgba(168,146,192,0.6)", textDecoration: "none", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
              Products
            </Link>
            <span style={{ color: "rgba(168,146,192,0.3)", fontSize: "0.8rem" }}>›</span>
            <span style={{ color: "rgba(168,146,192,0.9)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif" }}>
              {product.title}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
            <div>
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(245,200,66,0.12)",
                  borderRadius: 20,
                  overflow: "hidden",
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 24,
                  position: "relative",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    src={activeImage}
                    alt={product.title}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                  />
                </AnimatePresence>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
                {filteredImages.map((img, imageIndex) => (
                  <button
                    key={img}
                    onClick={() => setIndex(imageIndex)}
                    style={{
                      width: 64,
                      height: 64,
                      padding: 4,
                      borderRadius: 10,
                      border: index === imageIndex ? "2px solid #f5c842" : "1px solid rgba(245,200,66,0.15)",
                      background: "rgba(255,255,255,0.02)",
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                  >
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 7 }} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="badge" style={{ marginBottom: 20, display: "inline-block" }}>
                ✦ KAPIS LIGHTS
              </span>

              <h1
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  color: "#f5c842",
                  lineHeight: 1.3,
                  marginBottom: 16,
                }}
              >
                {product.title}
              </h1>

              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, flexWrap: "wrap" }}>
                <span style={{ color: "#f5c842", fontSize: "1.25rem", fontFamily: "'Cinzel', serif" }}>
                  {product.price > 0 ? `Rs. ${product.price}` : "Price on request"}
                </span>
                <span style={{ color: "rgba(168,146,192,0.75)", fontSize: "0.88rem" }}>
                  Stock: {product.stock}
                </span>
              </div>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "rgba(168,146,192,0.85)",
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  fontStyle: "italic",
                  marginBottom: 32,
                  paddingBottom: 32,
                  borderBottom: "1px solid rgba(245,200,66,0.1)",
                }}
              >
                {product.description}
              </p>

              {product.colors.length > 0 && (
                <div style={{ marginBottom: 28 }}>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.8rem", letterSpacing: "0.08em", color: "rgba(168,146,192,0.7)", marginBottom: 12 }}>
                    COLOUR
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {product.colors.map((entry) => (
                      <button
                        key={entry}
                        onClick={() => {
                          setColor(entry);
                          setIndex(0);
                        }}
                        style={{
                          padding: "8px 18px",
                          borderRadius: 99,
                          border: color === entry ? "1.5px solid #f5c842" : "1px solid rgba(245,200,66,0.2)",
                          background: color === entry ? "rgba(245,200,66,0.15)" : "rgba(255,255,255,0.03)",
                          color: color === entry ? "#f5c842" : "rgba(168,146,192,0.75)",
                          fontSize: "0.85rem",
                          fontFamily: "'DM Sans', sans-serif",
                          cursor: "pointer",
                        }}
                      >
                        {entry}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.types.length > 1 && (
                <div style={{ marginBottom: 32 }}>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.8rem", letterSpacing: "0.08em", color: "rgba(168,146,192,0.7)", marginBottom: 12 }}>
                    TYPE
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {product.types.map((entry) => (
                      <button
                        key={entry}
                        onClick={() => {
                          setType(entry);
                          setIndex(0);
                        }}
                        style={{
                          padding: "8px 18px",
                          borderRadius: 99,
                          border: type === entry ? "1.5px solid #f5c842" : "1px solid rgba(245,200,66,0.2)",
                          background: type === entry ? "rgba(245,200,66,0.15)" : "rgba(255,255,255,0.03)",
                          color: type === entry ? "#f5c842" : "rgba(168,146,192,0.75)",
                          fontSize: "0.85rem",
                          fontFamily: "'DM Sans', sans-serif",
                          cursor: "pointer",
                        }}
                      >
                        {entry}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(245,200,66,0.1)",
                  borderRadius: 16,
                  padding: "24px 28px",
                  marginBottom: 24,
                }}
              >
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.8rem", letterSpacing: "0.08em", color: "rgba(168,146,192,0.7)", marginBottom: 16 }}>
                  SPECIFICATIONS
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {product.specs.map((spec) => (
                    <li key={spec} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ color: "#f5c842", fontSize: "0.6rem", marginTop: 6, flexShrink: 0 }}>✦</span>
                      <span style={{ color: "rgba(168,146,192,0.85)", fontSize: "0.9rem" }}>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                <button
                  onClick={() => {
                    if (!product._id) return;
                    addItem({
                      productId: product._id,
                      slug: product.slug,
                      title: product.title,
                      image: activeImage,
                      price: product.price,
                      quantity: 1,
                    });
                    setMessage(product.price > 0 ? "Added to cart." : "Added to cart. Set a price in admin before online payment.");
                  }}
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Add to Cart
                </button>
                <Link href="/cart" className="btn-outline" style={{ width: "100%", justifyContent: "center" }}>
                  Go to Cart
                </Link>
                <Link href="/dealer" className="btn-outline" style={{ width: "100%", justifyContent: "center" }}>
                  Get Quotation
                </Link>
              </div>

              {message && <p style={{ marginTop: 16, color: "rgba(168,146,192,0.8)" }}>{message}</p>}
            </div>
          </div>
        </main>

        <style>{`
          @media (max-width: 768px) {
            main > div[style*="grid-template-columns"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </PageWrapper>
      <Footer />
    </>
  );
}
