import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import { getProducts } from "@/lib/shop";
import { PRODUCT_RANGES, groupProductsByRange, type ProductRecord } from "@/lib/shop-schema";

export const dynamic = "force-dynamic";

function ProductCard({ product }: { product: ProductRecord }) {
  return (
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
  );
}

export default async function ProductsPage() {
  const products = await getProducts({ activeOnly: true });
  const sections = groupProductsByRange(products);

  return (
    <>
      <Navbar />
      <PageWrapper>
        <main className="catalog-page">
          <div className="catalog-header">
            <span className="badge" style={{ marginBottom: 20, display: "inline-block" }}>
              ✦ COMPLETE CATALOGUE
            </span>
            <h1 className="catalog-header__title">Product Catalogue</h1>
            <p className="catalog-header__subtitle">From decorative to utility — lighting solutions for every need</p>
          </div>

          {sections.map((section) => {
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
                      {section.products.map((product) => (
                        <ProductCard key={product._id || product.slug} product={product} />
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
                      {section.products.map((product) => (
                        <ProductCard key={product._id || product.slug} product={product} />
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
