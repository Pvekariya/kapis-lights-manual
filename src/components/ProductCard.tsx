"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  watt: string;
  desc: string;
  image: string;
};

export default function ProductCard({ title, watt, desc, image }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-[#2b083d] rounded-xl overflow-hidden shadow-lg glow transition duration-300"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-52 object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-bold text-yellow-300">{title}</h3>
        <p className="text-sm mt-1 text-gray-400">{watt}</p>
        <p className="mt-3 text-gray-300 text-sm">{desc}</p>

        <button className="mt-4 bg-yellow-300 text-purple-900 px-4 py-2 rounded font-bold hover:opacity-90">
          Inquiry
        </button>
      </div>
    </motion.div>
  );
}