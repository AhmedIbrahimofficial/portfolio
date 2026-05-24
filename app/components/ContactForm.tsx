"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

// ─────────────────────────────────────────────
// HOW TO GET YOUR WEB3FORMS KEY (one-time, free):
//   1. Go to https://web3forms.com
//   2. Enter: funandentertainmentwithus@gmail.com
//   3. Click "Create Access Key"
//   4. Check your Gmail — copy the key
//   5. Replace WEB3FORMS_KEY below with that key
// ─────────────────────────────────────────────
const WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

// Your WhatsApp number (international format, no +)
const WHATSAPP_NUMBER = "923067060074";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // ── 1. Send to Gmail via Web3Forms ──
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New Portfolio Message from ${form.name}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
          // Extra context
          botcheck: "",
        }),
      });

      const data = await res.json();

      if (data.success) {
        // ── 2. Also ping WhatsApp (opens silently via hidden link trick) ──
        const waText = encodeURIComponent(
          `📩 *New Portfolio Message*\n\n*Name:* ${form.name}\n*Email:* ${form.email}\n\n*Message:*\n${form.message}`
        );
        // Use wa.me API — opens in background tab then closes
        const waLink = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${waText}`;
        const waWindow = window.open(waLink, "_blank", "width=1,height=1,left=-1000,top=-1000");
        // Close the tiny window after 3s
        if (waWindow) setTimeout(() => waWindow.close(), 3000);

        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    color: "#ffffff",
    padding: "12px 16px",
    fontSize: "14px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  };

  return (
    <section id="contact-form" className="py-20 md:py-28 px-6" style={{ background: "#0d0d0d" }}>
      <div className="max-w-[640px] mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <div className="w-8 h-px" style={{ background: "#333" }} />
            <span className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: "#aaaaaa" }}>
              Contact
            </span>
            <div className="w-8 h-px" style={{ background: "#333" }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#ffffff" }}>
            Send a{" "}
            <em
              className="font-display not-italic italic font-normal"
              style={{ fontFamily: "'Instrument Serif', serif", color: "#89AACC" }}
            >
              Message
            </em>
          </h2>
          <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
            Fill the form — message goes straight to my inbox. No email app needed.
          </p>
        </div>

        {/* ── Success State ── */}
        {status === "success" ? (
          <div
            className="text-center py-14 px-8 rounded-2xl border"
            style={{ background: "rgba(74,222,128,0.05)", borderColor: "rgba(74,222,128,0.2)" }}
          >
            <div className="text-5xl mb-5">✅</div>
            <p className="text-lg font-bold mb-2" style={{ color: "#4ade80" }}>
              Message Sent!
            </p>
            <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>
              I&apos;ve received your message and will reply within 24 hours.
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              Check your email for a confirmation.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-8 text-xs rounded-full px-6 py-2.5 border font-semibold transition-all duration-200 hover:text-white hover:border-[#89AACC]"
              style={{ borderColor: "#333", color: "#aaaaaa" }}
            >
              Send another message
            </button>
          </div>
        ) : (
          /* ── Form ── */
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Web3Forms key not set warning */}
            {WEB3FORMS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY" && (
              <div
                className="text-xs rounded-xl px-4 py-3 border font-semibold"
                style={{ background: "rgba(251,191,36,0.08)", borderColor: "rgba(251,191,36,0.25)", color: "#fbbf24" }}
              >
                ⚠️ Setup needed: Go to{" "}
                <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer"
                  className="underline">web3forms.com</a>
                , enter your email, get the key, and replace{" "}
                <code>YOUR_WEB3FORMS_ACCESS_KEY</code> in ContactForm.tsx
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "#aaaaaa" }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#89AACC")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "#aaaaaa" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#89AACC")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "#aaaaaa" }}>
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about your project..."
                style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                onFocus={(e) => (e.target.style.borderColor = "#89AACC")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            {status === "error" && (
              <p className="text-xs font-semibold rounded-xl px-4 py-3 border"
                style={{ color: "#f87171", background: "rgba(248,113,113,0.06)", borderColor: "rgba(248,113,113,0.2)" }}>
                ❌ Something went wrong. Please try again in a moment.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full text-sm px-8 py-4 font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #89AACC, #4E85BF)",
                color: "#ffffff",
                boxShadow: "0 0 20px rgba(137,170,204,0.3)",
              }}
            >
              {status === "sending" ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin inline-block" />
                  Sending…
                </span>
              ) : (
                "Send Message →"
              )}
            </button>

            <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
              Message delivered to Gmail &amp; WhatsApp instantly
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
