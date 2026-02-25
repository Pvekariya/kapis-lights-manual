"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import Link from "next/link";

export default function Products() {
  return (
    <>
      <Navbar />

      <PageWrapper>
        <main className="px-6 py-16 max-w-6xl mx-auto">

          <h1 className="text-5xl font-bold text-yellow-300 text-center mb-16">
            Products List
          </h1>

          {/* Standard LED Section */}
          <section className="space-y-10">

            <Link href="/products/fridge">
              <div className="bg-[#2b083d] p-8 rounded-xl hover:scale-105 transition cursor-pointer glow">
                <h2 className="text-2xl font-bold text-yellow-300">
                  1W Fridge LED Bulb
                </h2>
                <p className="mt-2 text-gray-300">
                  50 pcs jar • 1800 pcs master carton
                </p>
                <p className="mt-2 text-gray-400">
                  E-12 Crystal, E-12 Milky, E-14 Crystal, E-14 Milky
                </p>
              </div>
            </Link>

            <Link href="/products/candle">
              <div className="bg-[#2b083d] p-8 rounded-xl hover:scale-105 transition cursor-pointer glow">
                <h2 className="text-2xl font-bold text-yellow-300">
                  5W Candle LED Bulb
                </h2>
                <p className="mt-2 text-gray-300">
                  20 pcs box • 300 pcs master carton
                </p>
                <p className="mt-2 text-gray-400">
                  B-22 Warm White, B-22 White, E-14 Warm White, E-14 White
                </p>
              </div>
            </Link>

          </section>

          {/* 0.5 Watt Range */}
          <section className="mt-20">

            <div className="bg-gradient-to-r from-purple-900 to-purple-700 p-10 rounded-xl border border-yellow-300/30">

              <h2 className="text-4xl font-bold text-yellow-300 text-center">
                0.5 Watt Range
              </h2>

              <p className="text-center text-gray-300 mt-3">
                Decorative mini lighting series
              </p>

              <div className="mt-10 grid md:grid-cols-2 gap-8">

                <Link href="/products/half">
                  <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
                    <h3 className="text-xl font-bold text-yellow-300">
                      0.5 Watt LED Bulb
                    </h3>
                    <p className="mt-2 text-gray-300">
                      6 pcs Blister Pack • 360 pcs Master Carton
                    </p>
                    <p className="mt-2 text-gray-400">
                      B22, E27
                    </p>
                  </div>
                </Link>

                <Link href="/products/half-2pin">
                  <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
                    <h3 className="text-xl font-bold text-yellow-300">
                      0.5 Watt 2-Pin Plug-in LED
                    </h3>
                    <p className="mt-2 text-gray-300">
                      10 pcs Box • 300 pcs Master Carton
                    </p>
                  </div>
                </Link>

                <Link href="/products/half-prism">
                  <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
                    <h3 className="text-xl font-bold text-yellow-300">
                      0.5 Watt Prism LED
                    </h3>
                    <p className="mt-2 text-gray-300">
                      6 pcs Blister Packing • 360 pcs Master Carton
                    </p>
                  </div>
                </Link>

              </div>

            </div>

          </section>

          {/* Nakshatra Range Highlight */}
          <section className="mt-20">

            <div className="bg-gradient-to-r from-purple-900 to-purple-700 p-10 rounded-xl border border-yellow-300/30">

              <h2 className="text-4xl font-bold text-yellow-300 text-center">
                Nakshatra Range
              </h2>

              <p className="text-center text-gray-300 mt-3">
                Our New Products Launch — India First Time
              </p>

              <div className="mt-10 grid md:grid-cols-2 gap-8">

                <Link href="/products/flower">
                  <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
                    <h3 className="text-xl font-bold text-yellow-300">
                      5W Metallic Flower RGB Lamp
                    </h3>
                    <p className="mt-2 text-gray-300">
                      1 pcs Box • 20 pcs Outer Box • 200 pcs Master Carton
                    </p>
                  </div>
                </Link>

                <Link href="/products/jumbo">
                  <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
                    <h3 className="text-xl font-bold text-yellow-300">
                      12W Metallic Big Jumbo RGB
                    </h3>
                    <p className="mt-2 text-gray-300">
                      1 pcs Box • 60 pcs Master Carton
                    </p>
                  </div>
                </Link>

                <Link href="/products/jumbomotor">
                  <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
                    <h3 className="text-xl font-bold text-yellow-300">
                      12W Big Jumbo With Motor RGB
                    </h3>
                    <p className="mt-2 text-gray-300">
                      1 pcs Box • 60 pcs Master Carton
                    </p>
                  </div>
                </Link>

                <Link href="/products/9-watt">
                  <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
                    <h3 className="text-xl font-bold text-yellow-300">
                      9W Metallic RGB Lamp
                    </h3>
                    <p className="mt-2 text-gray-300">
                      1 pcs Box • 25 pcs Master Carton
                    </p>
                  </div>
                </Link>

              </div>

            </div>

          </section>
          {/* Gramin Range */}
<section className="mt-20">

  <div className="bg-gradient-to-r from-purple-900 to-purple-700 p-10 rounded-xl border border-yellow-300/30">

    <h2 className="text-4xl font-bold text-yellow-300 text-center">
      Gramin Range
    </h2>

    <p className="text-center text-gray-300 mt-3">
      Affordable high-efficiency rural lighting solutions
    </p>

    <div className="mt-10 grid md:grid-cols-2 gap-8">

      <Link href="/products/gramin-4w">
        <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
          <h3 className="text-xl font-bold text-yellow-300">
            4W Gramin LED Bulb
          </h3>
          <p className="mt-2 text-gray-300">
            1 pcs Box • 20 pcs Outer Box • 300 pcs Master Carton
          </p>
        </div>
      </Link>

      <Link href="/products/gramin-6w">
        <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
          <h3 className="text-xl font-bold text-yellow-300">
            6W Gramin LED Bulb
          </h3>
          <p className="mt-2 text-gray-300">
            1 pcs Box • 20 pcs Outer Box • 180 pcs Master Carton
          </p>
        </div>
      </Link>

      <Link href="/products/gramin-9w">
        <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
          <h3 className="text-xl font-bold text-yellow-300">
            9W Gramin LED Bulb
          </h3>
          <p className="mt-2 text-gray-300">
            1 pcs Box • 20 pcs Outer Box • 200 pcs Master Carton
          </p>
        </div>
      </Link>

    </div>

  </div>

      </section>
          {/* Pixel LED Range */}
          <section className="mt-20">

            <div className="bg-gradient-to-r from-purple-900 to-purple-700 p-10 rounded-xl border border-yellow-300/30">

              <h2 className="text-4xl font-bold text-yellow-300 text-center">
                Pixel LED Range
              </h2>

              <p className="text-center text-gray-300 mt-3">
                Advanced digital decorative lighting solutions
              </p>

              <div className="mt-10 grid md:grid-cols-2 gap-8">

                <Link href="/products/pixel-10w-warmwhite">
                  <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
                    <h3 className="text-xl font-bold text-yellow-300">
                      Pixel LED Bulb 10W Warm White
                    </h3>
                    <p className="text-gray-300 mt-2">
                      1 pcs Box • 20 pcs Outer Box • 300 pcs Master Carton
                    </p>
                  </div>
                </Link>

                <Link href="/products/pixel-ws2811-12w">
                  <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
                    <h3 className="text-xl font-bold text-yellow-300">
                      Pixel LED Bulb WS2811 RGB/Warm White  (12W / 12V DC)
                    </h3>
                    <p className="text-gray-300 mt-2">
                      1 pcs Box • 20 pcs Outer Box • 300 pcs Master Carton
                    </p>
                  </div>
                </Link>

              </div>

            </div>

          </section>
        </main>
      </PageWrapper>

      <Footer />
    </>
  );
}