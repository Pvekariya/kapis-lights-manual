"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import { useState } from "react";

export default function Dealer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const res = await fetch("/api/dealer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      setForm({ name: "", email: "", message: "" });
      setSuccess(true);
    }
  };

  return (
    <>
      <Navbar />

      <PageWrapper>
        <main className="px-6 py-16">

          <h1 className="text-4xl font-bold text-yellow-300 text-center mb-12">
            Become a Dealer
          </h1>

          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">

            <input
              name="name"
              value={form.name}
              placeholder="Name"
              onChange={handleChange}
              className="w-full p-4 bg-purple-900 rounded"
            />

            <input
              name="email"
              value={form.email}
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-4 bg-purple-900 rounded"
            />

            <textarea
              name="message"
              value={form.message}
              placeholder="Message"
              onChange={handleChange}
              className="w-full p-4 bg-purple-900 rounded"
            />

            <button
              disabled={loading}
              className={`w-full py-4 rounded font-bold transition ${
                loading
                  ? "bg-gray-500"
                  : "bg-yellow-300 text-purple-900 hover:scale-105"
              }`}
            >
              {loading ? "Submitting..." : "Submit Inquiry"}
            </button>

            {success && (
              <p className="text-green-400 text-center mt-4">
                ✅ Inquiry submitted successfully!
              </p>
            )}

          </form>

        </main>
      </PageWrapper>

      <Footer />
    </>
  );
}