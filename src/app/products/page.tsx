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
                    <p className="text-gray-300 mt-2">
                      White, Yellow, Blue, Red, Green, Pink, Orange, Purple, Warm White, RGB
                    </p>
                  </div>
                </Link>

                <Link href="/products/half-2pin">
                  <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
                    <h3 className="text-xl font-bold text-yellow-300">
                      0.5 Watt 2-Pin Plug-in LED
                    </h3>
                    <p className="text-gray-300 mt-2">
                      Blue, Green, Orange, Pink, Red, RGB, Warm White, White, Yellow
                    </p>
                  </div>
                </Link>

                <Link href="/products/half-prism">
                  <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
                    <h3 className="text-xl font-bold text-yellow-300">
                      0.5 Watt Prism LED
                    </h3>
                    <p className="text-gray-300 mt-2">
                      Blue, Green, Orange, Pink, Red, RGB, White, Yellow
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
                    <p className="text-gray-300 mt-2">
                      9 Functions • Decorative Lighting
                    </p>
                  </div>
                </Link>

                <Link href="/products/jumbo">
                  <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
                    <h3 className="text-xl font-bold text-yellow-300">
                      12W Metallic Big Jumbo RGB
                    </h3>
                    <p className="text-gray-300 mt-2">
                      18 Functions • Smart IC PCB Rotating Bulb
                    </p>
                  </div>
                </Link>

                <Link href="/products/jumbomotor">
                  <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
                    <h3 className="text-xl font-bold text-yellow-300">
                      12W Big Jumbo With Motor RGB
                    </h3>
                    <p className="text-gray-300 mt-2">
                      High Rotation Decorative Lamp
                    </p>
                  </div>
                </Link>

                <Link href="/products/9-watt">
                  <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
                    <h3 className="text-xl font-bold text-yellow-300">
                      9W Metallic RGB Lamp
                    </h3>
                    <p className="text-gray-300 mt-2">
                      Color Rotating Premium Series
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
          <p className="text-gray-300 mt-2">
            Energy saving • Durable build • Rural series
          </p>
        </div>
      </Link>

      <Link href="/products/gramin-6w">
        <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
          <h3 className="text-xl font-bold text-yellow-300">
            6W Gramin LED Bulb
          </h3>
          <p className="text-gray-300 mt-2">
            High efficiency • Everyday lighting
          </p>
        </div>
      </Link>

      <Link href="/products/gramin-9w">
        <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
          <h3 className="text-xl font-bold text-yellow-300">
            9W Gramin LED Bulb
          </h3>
          <p className="text-gray-300 mt-2">
            Bright output • Rural lighting solution
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

                <Link href="/products/pixel-5w">
                  <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
                    <h3 className="text-xl font-bold text-yellow-300">
                      5W Pixel LED Bulb
                    </h3>
                    <p className="text-gray-300 mt-2">
                      Digital IC Control • Multi Pattern Lighting
                    </p>
                  </div>
                </Link>

                <Link href="/products/pixel-10w">
                  <div className="bg-[#1f0630] p-6 rounded-lg hover:scale-105 transition cursor-pointer glow">
                    <h3 className="text-xl font-bold text-yellow-300">
                      10W Pixel LED Bulb
                    </h3>
                    <p className="text-gray-300 mt-2">
                      High Brightness • Programmable Effects
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