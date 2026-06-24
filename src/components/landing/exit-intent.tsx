"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { X, Sparkles, ArrowRight } from "lucide-react"

export function ExitIntent() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const fired = useRef(false)

  useEffect(() => {
    if (dismissed) return
    const handler = (e: MouseEvent) => {
      if (fired.current) return
      if (e.clientY <= 5) {
        fired.current = true
        setShow(true)
      }
    }
    document.addEventListener("mouseleave", handler)
    return () => document.removeEventListener("mouseleave", handler)
  }, [dismissed])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => { setShow(false); setDismissed(true) }}
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>

        <div className="text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-4" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Antes de irte…</h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Analiza tu CV gratis en 30 segundos. Sin registro, sin tarjeta. Descubre qué keywords te faltan para pasar el filtro ATS.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/analizador-cv-gratis"
              onClick={() => setShow(false)}
              className="inline-flex items-center justify-center gap-2 font-bold py-3.5 rounded-2xl text-white text-sm transition-colors"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
            >
              Analizar mi CV gratis <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              onClick={() => { setShow(false); setDismissed(true) }}
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors py-1"
            >
              No, gracias
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
