"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xpwzgkqb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
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
            Have a project in mind? Fill out the form and I&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {status === "success" ? (
          <div
            className="text-center py-12 px-8 rounded-2xl border"
            style={{ background: "rgba(74,222,128,0.06)", borderColor: "rgba(74,222,128,0.2)" }}
          >
            <div className="text-4xl mb-4">✅</div>
            <p className="text-base font-bold mb-2" style={{ color: "#4ade80" }}>
              Message sent!
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Thanks for reaching out. I&apos;ll reply within 24 hours.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-xs rounded-full px-5 py-2 border font-semibold transition-colors duration-200 hover:text-white"
              style={{ borderColor: "#333", color: "#aaaaaa" }}
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                  placeholder="Ahmed Ibrahim"
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
                  placeholder="you@example.com"
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
              <p className="text-xs font-semibold" style={{ color: "#f87171" }}>
                Something went wrong. Please try again or email me directly.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative rounded-full text-sm px-8 py-4 font-bold transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #89AACC, #4E85BF)",
                color: "#ffffff",
                boxShadow: "0 0 20px rgba(137,170,204,0.3)",
              }}
            >
              {status === "sending" ? "Sending…" : "Send Message →"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
