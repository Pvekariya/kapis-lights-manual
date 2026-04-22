"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import { PRODUCT_RANGES, groupProductsByRange, type ProductRecord } from "@/lib/shop-schema";

function ProductCard({ product, delay = 0 }: { product: ProductRecord; delay?: number }) {
  const image = product.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Link href={`/products/${product.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <div
          className="card"
          style={{
            padding: "28px 24px",
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            height: "100%",
          }}
        >
          {image && (
            <div
              style={{
                aspectRatio: "4 / 3",
                margin: "-12px -8px 20px",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(245,200,66,0.12)",
                background: "rgba(0,0,0,0.16)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={product.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          )}
          <h3
            style={{
              fontFamily: "'Cinzel', serif",
              color: "#f5c842",
              fontSize: "0.95rem",
              marginBottom: 10,
              lineHeight: 1.4,
            }}
          >
            {product.title}
          </h3>
          <p style={{ color: "rgba(168,146,192,0.8)", fontSize: "0.85rem", marginBottom: product.cardDetail ? 8 : 0 }}>
            {product.cardMeta}
          </p>
          {product.cardDetail && (
            <p style={{ color: "rgba(168,146,192,0.55)", fontSize: "0.8rem" }}>{product.cardDetail}</p>
          )}
          <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
            <span
              style={{
                display: "inline-block",
                color: "rgba(245,200,66,0.6)",
                fontSize: "0.8rem",
                fontFamily: "'Cinzel', serif",
                letterSpacing: "0.05em",
              }}
            >
              View Details →
            </span>
            <span style={{ color: "rgba(240,232,255,0.72)", fontSize: "0.82rem" }}>
              {product.price > 0 ? `Rs. ${product.price}` : "Price on request"}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch("/api/products", { cache: "no-store" });
      const data = (await response.json()) as { products: ProductRecord[] };
      setProducts(data.products.filter((product) => product.active));
      setLoading(false);
    }

    loadProducts().catch(() => setLoading(false));
  }, []);

  const sections = groupProductsByRange(products);

  return (
    <>
      <Navbar />
      <PageWrapper>
        <main className="catalog-page">
          <div className="catalog-header">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="badge" style={{ marginBottom: 20, display: "inline-block" }}>
              ✦ COMPLETE CATALOGUE
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="catalog-header__title">
              Product Catalogue
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="catalog-header__subtitle">
              From decorative to utility — lighting solutions for every need
            </motion.p>
          </div>

          {loading && <p style={{ textAlign: "center", color: "rgba(168,146,192,0.8)" }}>Loading products...</p>}

          {!loading &&
            sections.map((section, sectionIndex) => {
              if (!section.products.length) return null;

              const sectionIsStandard = section.key === PRODUCT_RANGES[0].key;
              const gridClass =
                section.products.length >= 4
                  ? "catalog-grid catalog-grid--four"
                  : section.products.length === 2
                    ? "catalog-grid catalog-grid--two"
                    : "catalog-grid catalog-grid--three";

              return (
                <section key={section.key} className={`catalog-section ${sectionIsStandard ? "catalog-section--tight" : ""}`}>
                  {sectionIsStandard ? (
                    <>
                      <div className="divider"><span className="divider-icon">✦</span></div>
                      <h2 className="section-title">{section.title}</h2>
                      <p className="section-sub">{section.subtitle}</p>
                      <div className={`${gridClass} ${section.products.length === 2 ? "catalog-grid--centered" : ""}`}>
                        {section.products.map((product, index) => (
                          <ProductCard key={product._id || product.slug} product={product} delay={index * 0.08} />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="range-banner catalog-range">
                      <div className="catalog-range__header">
                        <span className="badge" style={{ marginBottom: 16, display: "inline-block" }}>
                          ✦ PRODUCT RANGE
                        </span>
                        <h2 className="catalog-range__title">{section.title}</h2>
                        <p className="catalog-range__subtitle">{section.subtitle}</p>
                      </div>
                      <div className={gridClass}>
                        {section.products.map((product, index) => (
                          <ProductCard
                            key={product._id || product.slug}
                            product={product}
                            delay={sectionIndex * 0.04 + index * 0.08}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              );
            })}
        </main>
      </PageWrapper>
      <Footer />
    </>
  );
}
