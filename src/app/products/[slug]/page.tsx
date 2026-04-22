import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import { getProductBySlug } from "@/lib/shop";
import ProductDetailClient from "./ProductDetailClient";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

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
        <ProductDetailClient product={product} />
      </PageWrapper>
      <Footer />
    </>
  );
}
