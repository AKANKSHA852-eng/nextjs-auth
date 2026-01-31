"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const signin = async () => {
    if (loading) return;
    setLoading(true);
    setMsg("");

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/dashboard");
    } else {
      setMsg(data.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>

        <input
          className="w-full mb-4 px-4 py-2 border text-black rounded-lg focus:ring-2 focus:ring-green-500"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 px-4 py-2 border text-black rounded-lg focus:ring-2 focus:ring-green-500"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={signin}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          {loading ? "Signing in..." : "Signin"}
        </button>

        {msg && <p className="mt-4 text-center text-red-500 text-sm">{msg}</p>}
      </div>
    </div>
  );
}