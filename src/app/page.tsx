"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";

const featureCards = [
  {
    title: "Manufacturing Excellence",
    description:
      "Modern production infrastructure designed for scale, precision, and quality consistency.",
  },
  {
    title: "Energy Efficient Technology",
    description:
      "Smart IC design ensures long life, low power consumption, and stable performance.",
  },
  {
    title: "Dealer-Centric Growth",
    description:
      "Built for distributors, retailers, and wholesalers with strong margin opportunities.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <main className="home-layout">
          <section className="home-layout__hero">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="home-layout__hero-inner"
            >
              <h1 className="home-layout__title">
                Premium Decorative &amp; Utility LED Lighting Manufacturer
              </h1>

              <p className="home-layout__lead">
                Kapis Lights is a fast-growing LED manufacturer delivering decorative and utility
                lighting for the Indian market.
              </p>

              <p className="home-layout__copy">
                Our products combine innovation, durability, and energy efficiency for homes,
                commercial spaces, and festive environments. With a strong dealer network and modern
                manufacturing, we ensure consistent quality, competitive pricing, and reliable supply.
              </p>

              <div className="home-layout__actions">
                <Link href="/dealer" className="btn-primary animate-pulse-glow">
                  Become a Dealer
                </Link>
              </div>
            </motion.div>

            <div className="home-layout__cards">
              {featureCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="card home-layout__card"
                >
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                </motion.article>
              ))}
            </div>
          </section>
        </main>
      </PageWrapper>
      <Footer />
    </>
  );
}
