"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />

      <PageWrapper>
        <main className="px-6 py-28 text-center">

          <h1 className="text-6xl md:text-7xl font-bold text-yellow-300">
            Premium Decorative & Utility LED Lighting Manufacturer
          </h1>

          <p className="mt-6 text-xl max-w-3xl mx-auto text-gray-200">
           Kapis Lights is a fast-growing LED manufacturer delivering decorative and utility lighting for the Indian market.

           </p>
           
           <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-300">
           Our products combine innovation, durability, and energy efficiency for homes, commercial spaces, and festive environments. 
           With a strong dealer network and modern manufacturing, we ensure consistent quality, competitive pricing, and reliable supply.
          </p>

          <a
            href="/dealer"
            className="inline-block mt-10 bg-yellow-300 text-purple-900 px-10 py-4 rounded-lg font-bold glow hover:scale-105 transition"
          >
            Become a Dealer
          </a>

          <section className="mt-24 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            <div className="bg-[#2b083d] p-8 rounded-xl">
              <h3 className="text-xl font-bold text-yellow-300">Manufacturing Excellence</h3>
              <p className="mt-3 text-gray-300">
                Modern production infrastructure designed for scale, precision, and quality consistency.
              </p>
            </div>

            <div className="bg-[#2b083d] p-8 rounded-xl">
              <h3 className="text-xl font-bold text-yellow-300">Energy Efficient Technology</h3>
              <p className="mt-3 text-gray-300">
                Smart IC design ensures long life, low power consumption, and stable performance.
              </p>
            </div>

            <div className="bg-[#2b083d] p-8 rounded-xl">
              <h3 className="text-xl font-bold text-yellow-300">Dealer-Centric Growth</h3>
              <p className="mt-3 text-gray-300">
                Built for distributors, retailers, and wholesalers with strong margin opportunities.
              </p>
            </div>

          </section>

        </main>
      </PageWrapper>

      <Footer />
    </>
  );
}