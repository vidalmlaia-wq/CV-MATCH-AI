"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import {
  Upload, FileText, Zap, Target, CheckCircle2, XCircle,
  ArrowRight, Sparkles, AlertCircle, TrendingUp, BarChart3,
} from "lucide-react"

type AnalysisResult = {
  score: number
  found: string[]
  missing: string[]
  tips: string[]
  verdict: string
}

export function FreeATSAnalyzer() {
  const [cvText, setCvText] = useState("")
  const [jobText, setJobText] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState("")
  const [fileName, setFileName] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    const fd = new FormData()
    fd.append("file", file)
    try {
      const res = await fetch("/api/parse-file", { method: "POST", body: fd })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setCvText(data.text)
      setFileName(file.name)
    } catch {
      setError("No se pudo leer el archivo. Prueba pegando el texto directamente.")
    }
  }

  async function analyze() {
    if (!cvText.trim() || !jobText.trim()) {
      setError("Necesitas el CV y la descripción del puesto.")
      return
    }
    setLoading(true)
    setError("")
    setResult(null)

    try {
      const res = await fetch("/api/ats-free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText, jobText }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setResult(data)
    } catch {
      setError("Error al analizar. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const scoreColor = result
    ? result.score >= 70 ? "text-emerald-600" : result.score >= 45 ? "text-amber-500" : "text-rose-500"
    : ""
  const scoreBg = result
    ? result.score >= 70 ? "from-emerald-50 to-teal-50 border-emerald-100" : result.score >= 45 ? "from-amber-50 to-yellow-50 border-amber-100" : "from-rose-50 to-pink-50 border-rose-100"
    : ""

  return (
    <>
      {/* Nav */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 text-sm">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            CVMatch AI
          </Link>
          <Link href="/login" className="text-sm font-semibold bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
            Crear cuenta gratis →
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 text-xs font-semibold text-indigo-600 mb-5">
            <Sparkles className="h-3.5 w-3.5" /> 100% gratis · Sin registro
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Analiza tu CV para ATS<br />
            <span className="text-indigo-600">en segundos</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Sube tu CV y pega la oferta de trabajo. Te decimos tu puntuación ATS, qué palabras clave faltan y cómo mejorar.
          </p>
        </div>

        {!result ? (
          <div className="space-y-6">
            {/* CV Input */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-indigo-600" />
                </div>
                <h2 className="font-bold text-gray-900">Tu CV</h2>
              </div>

              {/* Upload zone */}
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
                className="border-2 border-dashed border-gray-200 hover:border-indigo-300 rounded-2xl p-6 text-center cursor-pointer transition-colors mb-4 group"
              >
                <Upload className="h-6 w-6 text-gray-300 group-hover:text-indigo-400 mx-auto mb-2 transition-colors" />
                <p className="text-sm text-gray-400">
                  {fileName ? (
                    <span className="text-indigo-600 font-medium">{fileName} ✓</span>
                  ) : (
                    <>Arrastra tu CV aquí o <span className="text-indigo-600 font-medium">selecciona archivo</span></>
                  )}
                </p>
                <p className="text-xs text-gray-300 mt-1">PDF, Word o TXT</p>
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.txt" className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} />
              </div>

              <p className="text-xs text-gray-400 text-center mb-3">O pega el texto directamente</p>
              <textarea
                value={cvText}
                onChange={e => setCvText(e.target.value)}
                placeholder="Pega aquí el contenido de tu CV..."
                className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none h-32 focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-gray-300"
              />
            </div>

            {/* Job Input */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-xl bg-pink-50 flex items-center justify-center">
                  <Target className="h-4 w-4 text-pink-600" />
                </div>
                <h2 className="font-bold text-gray-900">Descripción del puesto</h2>
              </div>
              <textarea
                value={jobText}
                onChange={e => setJobText(e.target.value)}
                placeholder="Pega aquí la descripción de la oferta de trabajo..."
                className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none h-40 focus:outline-none focus:ring-2 focus:ring-pink-200 placeholder-gray-300"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-xl p-3 text-sm text-rose-600">
                <AlertCircle className="h-4 w-4 shrink-0" /> {error}
              </div>
            )}

            <button
              onClick={analyze}
              disabled={loading || !cvText.trim() || !jobText.trim()}
              className="w-full py-4 rounded-2xl font-bold text-white text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Analizando tu CV…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Analizar gratis ahora
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400">No guardamos tu CV. Se elimina tras el análisis.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Score */}
            <div className={`rounded-3xl border p-8 bg-gradient-to-br ${scoreBg}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Puntuación ATS</p>
                  <div className="flex items-end gap-2">
                    <span className={`text-7xl font-black leading-none ${scoreColor}`}>{result.score}</span>
                    <span className="text-2xl text-gray-400 mb-2">/ 100</span>
                  </div>
                </div>
                <BarChart3 className={`h-12 w-12 opacity-20 ${scoreColor}`} />
              </div>
              <div className="h-3 bg-white/60 rounded-full overflow-hidden mb-3">
                <div className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${result.score}%`,
                    background: result.score >= 70 ? "linear-gradient(90deg, #10b981, #059669)" : result.score >= 45 ? "linear-gradient(90deg, #f59e0b, #d97706)" : "linear-gradient(90deg, #ef4444, #dc2626)"
                  }} />
              </div>
              <p className="text-sm font-medium text-gray-700">{result.verdict}</p>
            </div>

            {/* Keywords */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <h3 className="font-bold text-gray-900 text-sm">Palabras clave encontradas</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.found.map(k => (
                    <span key={k} className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full font-medium">{k}</span>
                  ))}
                  {result.found.length === 0 && <p className="text-xs text-gray-400">No se encontraron coincidencias claras</p>}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="h-4 w-4 text-rose-500" />
                  <h3 className="font-bold text-gray-900 text-sm">Palabras clave que faltan</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.missing.map(k => (
                    <span key={k} className="text-xs bg-rose-50 text-rose-600 border border-rose-100 px-2.5 py-1 rounded-full font-medium">{k}</span>
                  ))}
                  {result.missing.length === 0 && <p className="text-xs text-gray-400">¡Buen trabajo! Tienes las keywords principales</p>}
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-3">Consejos para mejorar</h3>
              <ul className="space-y-2">
                {result.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="rounded-3xl p-8 text-center text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #be185d)" }}>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 20%, #fff 0%, transparent 60%)" }} />
              <div className="relative">
                <p className="text-xs font-semibold text-indigo-200 uppercase tracking-widest mb-2">Quieres más</p>
                <h3 className="text-2xl font-black mb-2">Optimiza tu CV con IA</h3>
                <p className="text-indigo-200 text-sm mb-6 max-w-md mx-auto">
                  Con CVMatch AI Pro consigues el análisis completo, optimización automática del CV y cartas de presentación personalizadas.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/login" className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-bold px-6 py-3 rounded-2xl hover:bg-indigo-50 transition-colors text-sm">
                    Crear cuenta gratis <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => { setResult(null); setCvText(""); setJobText(""); setFileName("") }}
                    className="inline-flex items-center justify-center gap-2 bg-white/20 text-white font-semibold px-6 py-3 rounded-2xl hover:bg-white/30 transition-colors text-sm border border-white/30"
                  >
                    Nuevo análisis
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Social proof */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400 mb-6">Más de 10.000 profesionales ya han analizado su CV</p>
          <div className="grid md:grid-cols-3 gap-4 text-left">
            {[
              { text: "Me di cuenta de que me faltaban 8 keywords clave. Lo arreglé en 10 minutos y conseguí entrevista.", name: "Marta F.", role: "Diseñadora" },
              { text: "Tenía un 34% ATS sin saberlo. Esta herramienta me cambió la perspectiva completamente.", name: "Jordi M.", role: "Backend Dev" },
              { text: "Gratis y funciona mejor que otras herramientas de pago que he probado.", name: "Carmen L.", role: "Marketing" },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4">
                <p className="text-xs text-gray-600 mb-3">"{t.text}"</p>
                <p className="text-xs font-semibold text-gray-900">{t.name} · <span className="text-gray-400 font-normal">{t.role}</span></p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </>
  )
}
