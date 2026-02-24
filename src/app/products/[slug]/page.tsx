"use client";

import { useState } from "react";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const rawSlug = params?.slug;

  // Ensure slug is always a string
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const product =
    slug && products[slug as keyof typeof products]
      ? products[slug as keyof typeof products]
      : null;

  if (!product) {
    return (
      <>
        <Navbar />
        <PageWrapper>
          <div className="p-20 text-center text-red-400 text-2xl">
            Product not found
          </div>
        </PageWrapper>
        <Footer />
      </>
    );
  }

  // 👇 index controls which image is active
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState(product.colors[0]);
  const [type, setType] = useState(product.types[0]);

  // Stable filtering by type + color (works with folders and filenames)
  let filteredImages = product.images.filter((img: string) => {
    const lowerImg = img.toLowerCase();

    // TYPE MATCH (checks full path, not just filename)
    const matchesType = type
      ? lowerImg.includes(type.toLowerCase())
      : true;

    // COLOR MATCH (strict white handling)
    let matchesColor = true;

    if (color) {
      const lowerColor = color.toLowerCase();

      if (lowerColor === "white") {
        matchesColor =
          lowerImg.endsWith("white.jpg") &&
          !lowerImg.includes("warm white");
      } else {
        matchesColor = lowerImg.includes(lowerColor);
      }
    }

    return matchesType && matchesColor;
  });

  // If nothing matched (for products without type in filename), fallback safely
  if (filteredImages.length === 0) {
    filteredImages = product.images.filter((img: string) => {
      const lowerImg = img.toLowerCase();

      if (!color) return true;

      const lowerColor = color.toLowerCase();

      if (lowerColor === "white") {
        return (
          lowerImg.endsWith("white.jpg") &&
          !lowerImg.includes("warm white")
        );
      }

      return lowerImg.includes(lowerColor);
    });
  }

  // Final safety fallback
  if (filteredImages.length === 0) {
    filteredImages = product.images;
  }

  const image = filteredImages[index] || filteredImages[0];

  return (
    <>
      <Navbar />

      <PageWrapper>
        <main className="px-6 py-16 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">

          {/* Images */}
          <div>
            <img
               src={image}
               className="w-full h-auto object-contain rounded-xl"
            />

            <div className="flex flex-wrap gap-3 mt-4">
              {filteredImages.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setIndex(i)}
                  className="w-16 h-16 object-cover rounded cursor-pointer border border-yellow-300 shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div>

            <h1 className="text-4xl font-bold text-yellow-300">
              {product.title}
            </h1>

            <p className="mt-4 text-gray-300">
              {product.description}
            </p>

            <div className="mt-6">
              <h3 className="font-bold">Color</h3>
              <div className="flex flex-wrap gap-3 mt-2">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setColor(c);
                      setIndex(0);
                    }}
                    className={`px-4 py-2 rounded border ${
                      color === c
                        ? "bg-yellow-300 text-purple-900"
                        : "border-gray-500"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-bold">Type</h3>
              <div className="flex gap-3 mt-2 flex-wrap">
                {product.types.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setType(t);
                      setIndex(0);
                    }}
                    className={`px-4 py-2 rounded border ${
                      type === t
                        ? "bg-yellow-300 text-purple-900"
                        : "border-gray-500"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <ul className="mt-6 space-y-2 text-gray-300">
              {product.specs.map((s, i) => (
                <li key={i}>• {s}</li>
              ))}
            </ul>

            <a
              href="/dealer"
              className="inline-block mt-8 bg-yellow-300 text-purple-900 px-8 py-4 rounded font-bold glow"
            >
              Get Quotation
            </a>

          </div>

        </main>
      </PageWrapper>

      <Footer />
    </>
  );
}