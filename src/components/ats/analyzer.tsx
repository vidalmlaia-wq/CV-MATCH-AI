"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import {
  Loader2, CheckCircle, XCircle, AlertCircle, Sparkles,
  ChevronRight, FileText, Briefcase, BarChart3, Globe,
  Copy, Check, ArrowRight, TrendingUp, TrendingDown, Minus,
} from "lucide-react"
import Link from "next/link"

interface ATSResult {
  id: string
  score: number
  summary: string
  keywords: { found: string[]; missing: string[] }
  suggestions: { category: string; issue: string; fix: string }[]
}

interface ATSAnalyzerProps {
  resumes: { id: string; title: string }[]
  isPro: boolean
}

const LANGS = [
  { value: "es", label: "Español", flag: "🇪🇸" },
  { value: "en", label: "English", flag: "🇬🇧" },
] as const

type Lang = "es" | "en"

const t = {
  es: {
    step1: "Tu CV",
    step2: "La oferta",
    step3: "Resultado",
    pasteCV: "Pega el texto de tu CV aquí",
    pasteCVPlaceholder: "Copia y pega el contenido completo de tu CV en texto plano — experiencia, habilidades, formación...",
    pasteJob: "Pega la descripción del puesto",
    pasteJobPlaceholder: "Copia y pega la oferta de trabajo completa tal como aparece en LinkedIn, InfoJobs u otras plataformas...",
    jobTitle: "Título del puesto",
    jobTitlePlaceholder: "Ej: Desarrollador Frontend React",
    next: "Continuar",
    analyze: "Analizar compatibilidad ATS",
    analyzing: "Analizando con IA...",
    score: "Compatibilidad ATS",
    found: "Palabras clave encontradas",
    missing: "Palabras clave faltantes",
    suggestions: "Sugerencias de mejora",
    optimizeTitle: "Optimizar CV con IA",
    optimizeDesc: "GPT-4o reescribe tu CV automáticamente para esta oferta, respetando tu voz.",
    optimizeBtn: "Optimizar con IA",
    optimizing: "Optimizando...",
    optimizedTitle: "CV Optimizado por IA",
    copyBtn: "Copiar",
    copied: "Copiado",
    upgradeBtn: "Actualizar a Pro",
    proRequired: "Requiere plan Pro.",
    noCV: "Mínimo 50 caracteres",
    noJob: "Mínimo 50 caracteres",
    noTitle: "Indica el puesto",
    back: "Volver",
    cvLength: (n: number) => `${n} caracteres`,
    tip: "Tip: cuanto más texto, mejor análisis",
  },
  en: {
    step1: "Your CV",
    step2: "The Job",
    step3: "Results",
    pasteCV: "Paste your CV text here",
    pasteCVPlaceholder: "Copy and paste your full CV content in plain text — experience, skills, education...",
    pasteJob: "Paste the job description",
    pasteJobPlaceholder: "Copy and paste the full job posting as it appears on LinkedIn, Indeed or other platforms...",
    jobTitle: "Job title",
    jobTitlePlaceholder: "e.g. Frontend React Developer",
    next: "Continue",
    analyze: "Analyse ATS compatibility",
    analyzing: "Analysing with AI...",
    score: "ATS Compatibility",
    found: "Keywords found",
    missing: "Missing keywords",
    suggestions: "Improvement suggestions",
    optimizeTitle: "Optimise CV with AI",
    optimizeDesc: "GPT-4o rewrites your CV automatically for this role, keeping your voice intact.",
    optimizeBtn: "Optimise with AI",
    optimizing: "Optimising...",
    optimizedTitle: "AI-Optimised CV",
    copyBtn: "Copy",
    copied: "Copied!",
    upgradeBtn: "Upgrade to Pro",
    proRequired: "Requires Pro plan.",
    noCV: "Minimum 50 characters",
    noJob: "Minimum 50 characters",
    noTitle: "Enter job title",
    back: "Back",
    cvLength: (n: number) => `${n} characters`,
    tip: "Tip: more text = better analysis",
  },
}

function ScoreDial({ score }: { score: number }) {
  const color = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444"
  const label = score >= 80 ? "Excelente" : score >= 60 ? "Mejorable" : "Bajo"
  const Icon = score >= 80 ? TrendingUp : score >= 60 ? Minus : TrendingDown

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-36 w-36">
        <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" strokeWidth="10" />
          <circle
            cx="60" cy="60" r="50" fill="none" stroke={color} strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - score / 100)}`}
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-gray-900">{score}</span>
          <span className="text-sm text-gray-400 font-medium">/ 100</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-3">
        <Icon className="h-4 w-4" style={{ color }} />
        <span className="text-sm font-semibold" style={{ color }}>{label}</span>
      </div>
    </div>
  )
}

export function ATSAnalyzer({ resumes, isPro }: ATSAnalyzerProps) {
  const [lang, setLang] = useState<Lang>("es")
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [resumeText, setResumeText] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [optimizing, setOptimizing] = useState(false)
  const [result, setResult] = useState<ATSResult | null>(null)
  const [optimized, setOptimized] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const tx = t[lang]

  function goToStep2() {
    if (resumeText.trim().length < 50) { toast.error(tx.noCV); return }
    setStep(2)
  }

  async function handleAnalyze() {
    if (jobDescription.trim().length < 50) { toast.error(tx.noJob); return }
    if (!jobTitle.trim()) { toast.error(tx.noTitle); return }
    setAnalyzing(true)
    setResult(null)
    setOptimized(null)
    try {
      const res = await fetch("/api/ats/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobTitle, jobDescription, lang }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data)
      setStep(3)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error"
      if (msg.includes("Pro")) {
        toast.error(msg, { action: { label: tx.upgradeBtn, onClick: () => window.open("/pricing") } })
      } else {
        toast.error(msg)
      }
    } finally {
      setAnalyzing(false)
    }
  }

  async function handleOptimize() {
    if (!result) return
    setOptimizing(true)
    try {
      const res = await fetch("/api/ats/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysisId: result.id, resumeText, jobDescription, lang }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setOptimized(data.optimized)
      toast.success(lang === "es" ? "CV optimizado" : "CV optimised")
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error"
      toast.error(msg)
    } finally {
      setOptimizing(false)
    }
  }

  async function handleCopy(text: string) {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success(lang === "es" ? "Copiado al portapapeles" : "Copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">

      {/* Lang + Step header */}
      <div className="flex items-center justify-between">

        {/* Steps */}
        <div className="flex items-center gap-2">
          {([1, 2, 3] as const).map((n, i) => (
            <div key={n} className="flex items-center gap-2">
              <button
                onClick={() => { if (n < step || (n === 2 && resumeText.length >= 50)) setStep(n) }}
                className={cn(
                  "h-7 w-7 rounded-full text-xs font-bold transition-all",
                  step === n ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" :
                  n < step ? "bg-indigo-100 text-indigo-600 hover:bg-indigo-200" :
                  "bg-gray-100 text-gray-400 cursor-not-allowed"
                )}
              >{n}</button>
              <span className={cn("text-xs font-medium hidden sm:block", step === n ? "text-gray-900" : "text-gray-400")}>
                {[tx.step1, tx.step2, tx.step3][i]}
              </span>
              {n < 3 && <ChevronRight className="h-3 w-3 text-gray-300" />}
            </div>
          ))}
        </div>

        {/* Language toggle */}
        <div className="flex items-center gap-1 glass rounded-full px-1.5 py-1 border border-white/80">
          <Globe className="h-3.5 w-3.5 text-gray-400 ml-1" />
          {LANGS.map(l => (
            <button
              key={l.value}
              onClick={() => setLang(l.value)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold transition-all",
                lang === l.value ? "bg-indigo-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
              )}
            >
              {l.flag} {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── STEP 1: CV ── */}
      {step === 1 && (
        <div className="glass rounded-2xl border border-white/80 overflow-hidden">
          <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center">
              <FileText className="h-4.5 w-4.5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{tx.pasteCV}</h3>
              <p className="text-xs text-gray-400">{tx.tip}</p>
            </div>
            <span className={cn("ml-auto text-xs font-medium px-2 py-0.5 rounded-full", resumeText.length >= 50 ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-400")}>
              {tx.cvLength(resumeText.length)}
            </span>
          </div>
          <textarea
            value={resumeText}
            onChange={e => setResumeText(e.target.value)}
            placeholder={tx.pasteCVPlaceholder}
            rows={14}
            className="w-full px-6 py-5 text-sm text-gray-700 placeholder:text-gray-300 bg-transparent resize-none focus:outline-none leading-relaxed"
          />
          <div className="border-t border-gray-100 px-6 py-4 flex justify-end">
            <button
              onClick={goToStep2}
              disabled={resumeText.length < 50}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              {tx.next} <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: JOB ── */}
      {step === 2 && (
        <div className="glass rounded-2xl border border-white/80 overflow-hidden">
          <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-pink-50 flex items-center justify-center">
              <Briefcase className="h-4.5 w-4.5 text-pink-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{tx.pasteJob}</h3>
              <p className="text-xs text-gray-400">{lang === "es" ? "Copia la oferta completa" : "Paste the full job posting"}</p>
            </div>
          </div>

          <div className="px-6 pt-5 pb-2">
            <input
              value={jobTitle}
              onChange={e => setJobTitle(e.target.value)}
              placeholder={tx.jobTitlePlaceholder}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white/70 text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 mb-4"
            />
          </div>

          <textarea
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            placeholder={tx.pasteJobPlaceholder}
            rows={12}
            className="w-full px-6 pb-4 text-sm text-gray-700 placeholder:text-gray-300 bg-transparent resize-none focus:outline-none leading-relaxed"
          />

          <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
            <button onClick={() => setStep(1)} className="text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1">
              ← {tx.back}
            </button>
            <button
              onClick={handleAnalyze}
              disabled={analyzing || jobDescription.length < 50 || !jobTitle.trim()}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              {analyzing ? (
                <><Loader2 className="h-3.5 w-3.5 animate-spin" /> {tx.analyzing}</>
              ) : (
                <><BarChart3 className="h-3.5 w-3.5" /> {tx.analyze}</>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: RESULTS ── */}
      {step === 3 && result && (
        <div className="space-y-5">

          {/* Score + summary */}
          <div className="glass rounded-2xl border border-white/80 p-6">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <ScoreDial score={result.score} />
              <div className="flex-1">
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2">{tx.score}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{result.summary}</p>
                <button
                  onClick={() => { setStep(2); setResult(null) }}
                  className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ← {lang === "es" ? "Cambiar oferta" : "Change job posting"}
                </button>
              </div>
            </div>
          </div>

          {/* Keywords */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass rounded-2xl border border-white/80 p-5">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-bold text-gray-900">{tx.found}</span>
                <span className="ml-auto text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-semibold">{result.keywords.found.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.keywords.found.map(k => (
                  <span key={k} className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full font-medium">{k}</span>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl border border-white/80 p-5">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="h-4 w-4 text-rose-400" />
                <span className="text-sm font-bold text-gray-900">{tx.missing}</span>
                <span className="ml-auto text-xs bg-rose-50 text-rose-500 px-2 py-0.5 rounded-full font-semibold">{result.keywords.missing.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.keywords.missing.map(k => (
                  <span key={k} className="text-xs bg-rose-50 text-rose-600 border border-rose-100 px-2.5 py-1 rounded-full font-medium">{k}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Suggestions */}
          {result.suggestions.length > 0 && (
            <div className="glass rounded-2xl border border-white/80 p-5">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-bold text-gray-900">{tx.suggestions}</span>
              </div>
              <div className="space-y-4">
                {result.suggestions.map((s, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-amber-50/60 rounded-xl border border-amber-100/60">
                    <div className="shrink-0 h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-600">{i+1}</div>
                    <div>
                      <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">{s.category}</span>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">{s.issue}</p>
                      <p className="text-sm text-gray-500 mt-1 flex items-start gap-1.5">
                        <span className="text-indigo-400 shrink-0 mt-0.5">→</span> {s.fix}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optimize CTA */}
          {!optimized && (
            <div className="glass rounded-2xl border border-indigo-100 p-6 bg-gradient-to-r from-indigo-50/60 to-violet-50/40">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4 text-indigo-500" /> {tx.optimizeTitle}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{tx.optimizeDesc}{!isPro && ` ${tx.proRequired}`}</p>
                </div>
                {isPro ? (
                  <button
                    onClick={handleOptimize}
                    disabled={optimizing}
                    className="shrink-0 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors whitespace-nowrap"
                  >
                    {optimizing ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> {tx.optimizing}</> : <><Sparkles className="h-3.5 w-3.5" /> {tx.optimizeBtn}</>}
                  </button>
                ) : (
                  <Link href="/pricing" className="shrink-0 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors whitespace-nowrap">
                    {tx.upgradeBtn} →
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Optimized CV */}
          {optimized && (
            <div className="glass rounded-2xl border border-white/80 overflow-hidden">
              <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                  <span className="font-bold text-gray-900 text-sm">{tx.optimizedTitle}</span>
                </div>
                <button
                  onClick={() => handleCopy(optimized)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? tx.copied : tx.copyBtn}
                </button>
              </div>
              <textarea
                value={optimized}
                readOnly
                rows={18}
                className="w-full px-6 py-5 text-sm text-gray-700 bg-transparent resize-none focus:outline-none font-mono leading-relaxed"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
