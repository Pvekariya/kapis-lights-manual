"use client";

import { useState } from "react";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState<any[] | null>(null);
  const [error, setError] = useState("");

  async function login() {
    const res = await fetch("/api/admin", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setError("Wrong password");
      return;
    }

    const data = await res.json();
    setLeads(data.leads || []);
  }

  if (!leads) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">

        <div className="bg-purple-900 p-10 rounded-lg space-y-4">

          <h1 className="text-xl font-bold text-yellow-400">
            Admin Login
          </h1>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 w-64 text-black rounded"
          />

          <button
            onClick={login}
            className="bg-yellow-400 text-black px-6 py-2 rounded font-bold"
          >
            Login
          </button>

          {error && <p className="text-red-400">{error}</p>}

        </div>

      </main>
    );
  }

  return (
    <main className="p-10 bg-black min-h-screen text-white">

      <h1 className="text-3xl font-bold mb-8 text-yellow-400">
        Dealer Leads Dashboard
      </h1>

      <div className="space-y-4">
        {leads.map((lead, i) => (
          <div key={i} className="bg-purple-900 p-6 rounded">
            <p><b>Name:</b> {lead.name}</p>
            <p><b>Company:</b> {lead.company}</p>
            <p><b>Email:</b> {lead.email}</p>
            <p><b>Phone:</b> {lead.phone}</p>
            <p><b>City:</b> {lead.city}</p>
            <p><b>Message:</b> {lead.message}</p>
            <p className="text-gray-400 text-sm">
              {new Date(lead.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

    </main>
  );
}