"use client";

import { motion } from "framer-motion";

export default function ContactContent() {
  return (
    <main className="relative px-6 py-16 md:py-20 max-w-4xl mx-auto">
      <div className="led-chips">
        <div className="led-chip led-chip--cyan" style={{ top: "18%", left: "10%" }} />
        <div className="led-chip led-chip--pink" style={{ top: "76%", right: "10%" }} />
      </div>
      <div className="scanlines" />

      <motion.header
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-10 md:mb-12"
      >
        <p className="text-xs md:text-sm tracking-[0.18em] uppercase text-gray-300/80 mb-3">
          Get in touch
        </p>
        <h1 className="headline-neon text-3xl md:text-4xl font-bold">
          Contact Kapis Lights.
        </h1>
        <p className="mt-3 text-sm md:text-base text-gray-200/85 max-w-2xl mx-auto">
          Reach out for dealership, bulk orders, or product questions. We typically
          respond within one working day.
        </p>
      </motion.header>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="feature-card p-7 md:p-8 space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6 text-sm md:text-base text-gray-200 text-left">
          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gray-300/80 mb-1.5">
                Address
              </p>
              <p>
                <span className="font-semibold">Kapis Lights</span>
                <br />
                DLF Industrial Area, Moti Nagar,
                <br />
                New Delhi - 110015
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gray-300/80 mb-1.5">
                Phone
              </p>
              <p className="font-semibold text-yellow-200">+91 99530 84555</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gray-300/80 mb-1.5">
                Email
              </p>
              <p className="font-semibold text-yellow-200">
                kapislights@gmail.com
              </p>
            </div>

            <p className="pt-2 text-xs md:text-sm text-gray-300/85">
              You can also use the WhatsApp button on the screen for quick queries,
              photos, or order follow-ups.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-300/80">
              Visit us
            </p>
            <div className="rounded-xl overflow-hidden h-64 md:h-72 border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24260.925604437518!2d77.16453863935692!3d28.643617498708174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1770808591858!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}

