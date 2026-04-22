"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.1 * i,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function AboutContent() {
  return (
    <main className="relative px-6 py-16 md:py-20 max-w-5xl mx-auto">
      <div className="led-chips">
        <div className="led-chip" style={{ top: "18%", left: "6%" }} />
        <div
          className="led-chip led-chip--cyan"
          style={{ top: "78%", right: "10%" }}
        />
      </div>
      <div className="scanlines" />

      <motion.header
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0, y: 24 },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            },
          },
        }}
        className="text-center mb-12 md:mb-16"
      >
        <p className="text-xs md:text-sm tracking-[0.18em] uppercase text-gray-300/80 mb-3">
          Manufacturer story
        </p>
        <h1 className="headline-neon text-3xl md:text-4xl lg:text-5xl font-bold">
          Behind every LED, a promise of reliability.
        </h1>
      </motion.header>

      <motion.section
        className="space-y-6 text-gray-200 text-base md:text-lg relative z-10"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
      >
        <motion.p variants={fadeUp}>
          Kapis Lights is a specialized LED lighting manufacturer focused on
          decorative and utility lighting solutions for the Indian market. We
          design products that balance performance, visual appeal, and
          affordability for homes, commercial spaces, and festive environments.
        </motion.p>

        <motion.p variants={fadeUp}>
          Every product is built with strict quality standards and modern
          manufacturing practices to ensure durability, safety, and consistent
          performance. Our growing dealer network reflects our commitment to
          long-term partnerships and reliable supply across regions.
        </motion.p>
      </motion.section>

      <motion.section
        className="mt-14 md:mt-16 feature-card p-8 md:p-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        custom={1}
      >
        <h2 className="text-2xl font-bold text-yellow-300 mb-3">
          Our mission
        </h2>
        <p className="text-gray-200 text-base md:text-lg">
          To provide smart, affordable, and reliable lighting solutions while
          building strong partnerships with dealers and distributors across the
          market.
        </p>
      </motion.section>

      <motion.section
        className="mt-10 md:mt-12 feature-card p-8 md:p-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
        custom={2}
      >
        <h2 className="text-2xl font-bold text-yellow-300 mb-3">
          MSME registered
        </h2>
        <p className="text-gray-200 text-base md:text-lg">
          Kapis Lights is a Government of India registered Micro Enterprise
          (Udyam Registration No: UDYAM-DL-11-0041596) under the Ministry of
          MSME.
        </p>
      </motion.section>

      <motion.section
        className="mt-14 md:mt-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 24 },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              staggerChildren: 0.16,
            },
          },
        }}
      >
        <h2 className="text-2xl font-bold text-yellow-300 mb-6 text-center">
          Certifications & quality
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          {[
            {
              title: "ISO certified",
              desc: "Quality management compliance",
            },
            {
              title: "Energy efficient",
              desc: "Low power consumption design",
            },
            {
              title: "Safety tested",
              desc: "Reliable performance standards",
            },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              className="feature-card px-6 py-7"
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.55,
                    delay: 0.05 * idx,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  },
                },
              }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <h3 className="font-semibold text-lg text-white">{item.title}</h3>
              <p className="text-gray-300 mt-2 text-sm md:text-base">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}