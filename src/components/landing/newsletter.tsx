"use client"

import { useState } from "react"
import { Mail, CheckCircle2, ArrowRight } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus("loading")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 mb-5">
          <Mail className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">
          Consejos de CV cada semana
        </h2>
        <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto leading-relaxed">
          Trucos ATS, plantillas, guías por sector y lo último en búsqueda de empleo. Sin spam. Cancela cuando quieras.
        </p>

        {status === "success" ? (
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-2xl px-6 py-4 text-emerald-700 font-semibold text-sm">
            <CheckCircle2 className="h-5 w-5" />
            ¡Apuntado! Revisa tu bandeja de entrada.
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-gray-300"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-2xl text-white text-sm transition-all disabled:opacity-60 shrink-0"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
            >
              {status === "loading" ? (
                <div className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>Suscribirme <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-rose-500 text-xs mt-2">Algo fue mal. Inténtalo de nuevo.</p>
        )}

        <p className="text-xs text-gray-300 mt-4">+2.400 profesionales ya suscritos · Sin spam</p>
      </div>
    </section>
  )
}
