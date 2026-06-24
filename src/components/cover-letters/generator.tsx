"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import {
  Loader2, Mail, Copy, Check, Globe, Mic, ArrowRight,
  FileText, Briefcase, Sparkles, Upload, ClipboardPaste, Plus, X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { FileUpload } from "@/components/ui/file-upload"

type Lang = "es" | "en"
type Tone = "professional" | "enthusiastic" | "creative"

const LANGS = [
  { value: "es" as Lang, label: "Español", flag: "🇪🇸" },
  { value: "en" as Lang, label: "English", flag: "🇬🇧" },
]

const t = {
  es: {
    step1: "Tu CV", step2: "La oferta", step3: "Carta",
    uploadCV: "Subir CV", pasteCV: "Pegar texto",
    cvLabel: "Arrastra tu CV o haz clic para subir",
    cvHint: "PDF, DOCX o TXT · máx 5 MB",
    cvPlaceholder: "Copia y pega el contenido completo de tu CV en texto plano — experiencia, habilidades, formación...",
    prevLettersTitle: "Cartas anteriores",
    prevLettersDesc: "Sube cartas que hayas escrito antes. La IA copiará tu tono, vocabulario y forma de expresarte.",
    addLetter: "Añadir carta anterior",
    addLetterHint: "PDF, DOCX o TXT · la IA extraerá tu voz",
    noLetters: "Sin cartas anteriores — la IA usará el perfil de voz de Ajustes si lo tienes configurado.",
    company: "Empresa", companyPlaceholder: "Google, BBVA, Glovo...",
    position: "Puesto", positionPlaceholder: "Product Manager, Developer...",
    tone: "Tono",
    tones: { professional: "Profesional", enthusiastic: "Entusiasta", creative: "Creativo" },
    pasteJob: "Descripción del puesto",
    pasteJobPlaceholder: "Pega aquí la descripción de la oferta completa...",
    next: "Continuar", generate: "Generar carta", generating: "Generando...",
    result: "Carta generada", copy: "Copiar", copied: "Copiada", back: "Volver",
    voiceActive: "Perfil de voz activo", voiceInactive: "Sin perfil de voz",
    voiceHint: "Configúralo en Ajustes para que suene más a ti",
    savedAuto: "Guardada automáticamente", generateAnother: "Generar otra",
    limitNote: "Plan gratuito: máx 2 cartas.",
    upgrade: "Actualizar a Pro", freeLimitHint: "para cartas ilimitadas.",
    extractedText: "Texto extraído",
    letterN: (n: number) => `Carta ${n}`,
  },
  en: {
    step1: "Your CV", step2: "The Job", step3: "Letter",
    uploadCV: "Upload CV", pasteCV: "Paste text",
    cvLabel: "Drag your CV here or click to upload",
    cvHint: "PDF, DOCX or TXT · max 5 MB",
    cvPlaceholder: "Copy and paste your full CV content in plain text — experience, skills, education...",
    prevLettersTitle: "Previous letters",
    prevLettersDesc: "Upload cover letters you've written before. The AI will copy your tone, vocabulary and style.",
    addLetter: "Add previous letter",
    addLetterHint: "PDF, DOCX or TXT · AI will extract your voice",
    noLetters: "No previous letters — the AI will use your voice profile from Settings if configured.",
    company: "Company", companyPlaceholder: "Google, Stripe, Amazon...",
    position: "Position", positionPlaceholder: "Product Manager, Developer...",
    tone: "Tone",
    tones: { professional: "Professional", enthusiastic: "Enthusiastic", creative: "Creative" },
    pasteJob: "Job description",
    pasteJobPlaceholder: "Paste the full job description here...",
    next: "Continue", generate: "Generate letter", generating: "Generating...",
    result: "Generated letter", copy: "Copy", copied: "Copied!", back: "Back",
    voiceActive: "Voice profile active", voiceInactive: "No voice profile",
    voiceHint: "Set it up in Settings to sound more like you",
    savedAuto: "Saved automatically", generateAnother: "Generate another",
    limitNote: "Free plan: max 2 letters.",
    upgrade: "Upgrade to Pro", freeLimitHint: "for unlimited letters.",
    extractedText: "Extracted text",
    letterN: (n: number) => `Letter ${n}`,
  },
}

interface GeneratorProps {
  isPro: boolean
  hasVoice?: boolean
}

export function CoverLetterGenerator({ isPro, hasVoice = false }: GeneratorProps) {
  const [lang, setLang] = useState<Lang>("es")
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [cvMode, setCvMode] = useState<"upload" | "paste">("upload")
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [tone, setTone] = useState<Tone>("professional")
  // Previous letters for voice extraction
  const [prevLetters, setPrevLetters] = useState<{ id: number; name: string; text: string }[]>([])
  const [letterCounter, setLetterCounter] = useState(0)
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  const tx = t[lang]

  function addPrevLetter(name: string, text: string) {
    const id = letterCounter + 1
    setLetterCounter(id)
    setPrevLetters(prev => [...prev, { id, name, text }])
  }

  function removePrevLetter(id: number) {
    setPrevLetters(prev => prev.filter(l => l.id !== id))
  }

  async function handleGenerate() {
    if (!company || !position || !resumeText || !jobDescription) {
      toast.error(lang === "es" ? "Rellena todos los campos" : "Fill in all fields")
      return
    }
    setGenerating(true)
    setResult(null)

    // Build voice context from uploaded previous letters
    const prevLettersContext = prevLetters.length > 0
      ? prevLetters.map((l, i) => `--- ${tx.letterN(i + 1)} (${l.name}) ---\n${l.text}`).join("\n\n")
      : null

    try {
      const res = await fetch("/api/cover-letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company, position, resumeText, jobDescription, tone, lang,
          prevLettersContext,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data.content)
      setStep(3)
      router.refresh()
      toast.success(lang === "es" ? "Carta generada y guardada" : "Letter generated and saved")
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error"
      if (msg.includes("Pro")) {
        toast.error(msg, { action: { label: tx.upgrade, onClick: () => window.open("/pricing") } })
      } else {
        toast.error(msg)
      }
    } finally {
      setGenerating(false)
    }
  }

  async function handleCopy() {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    toast.success(lang === "es" ? "Copiado al portapapeles" : "Copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-5">

      {/* Steps + lang + voice */}
      <div className="flex flex-wrap items-center justify-between gap-3">
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
              {n < 3 && <span className="text-gray-200">›</span>}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className={cn(
            "hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium",
            hasVoice ? "bg-violet-50 border-violet-100 text-violet-600" : "bg-gray-50 border-gray-200 text-gray-400"
          )}>
            <Mic className="h-3 w-3" />
            {hasVoice ? tx.voiceActive : tx.voiceInactive}
          </div>
          <div className="flex items-center gap-1 glass rounded-full px-1.5 py-1 border border-white/80">
            <Globe className="h-3.5 w-3.5 text-gray-400 ml-1" />
            {LANGS.map(l => (
              <button key={l.value} onClick={() => setLang(l.value)}
                className={cn("px-3 py-1 rounded-full text-xs font-semibold transition-all",
                  lang === l.value ? "bg-indigo-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >{l.flag} {l.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── STEP 1: CV + cartas anteriores ── */}
      {step === 1 && (
        <div className="space-y-4">
          {/* CV card */}
          <div className="glass rounded-2xl border border-white/80 overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center">
                <FileText className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{lang === "es" ? "Tu CV" : "Your CV"}</h3>
                <p className="text-xs text-gray-400">{lang === "es" ? "Base para la carta" : "Base for the letter"}</p>
              </div>
              {/* Upload / paste toggle */}
              <div className="ml-auto flex items-center gap-0.5 bg-gray-100 rounded-full p-0.5">
                <button onClick={() => setCvMode("upload")}
                  className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all",
                    cvMode === "upload" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                  )}
                >
                  <Upload className="h-3 w-3" /> {tx.uploadCV}
                </button>
                <button onClick={() => setCvMode("paste")}
                  className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all",
                    cvMode === "paste" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                  )}
                >
                  <ClipboardPaste className="h-3 w-3" /> {tx.pasteCV}
                </button>
              </div>
            </div>

            {cvMode === "upload" ? (
              <div className="px-6 py-5">
                <FileUpload
                  onText={text => setResumeText(text)}
                  label={tx.cvLabel}
                  hint={tx.cvHint}
                />
                {resumeText.length >= 50 && (
                  <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50/60">
                    <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-medium">{tx.extractedText}</span>
                      <span className="text-xs text-emerald-600">{resumeText.length.toLocaleString()} {lang === "es" ? "car." : "chars"}</span>
                    </div>
                    <textarea
                      value={resumeText}
                      onChange={e => setResumeText(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 text-xs text-gray-600 bg-transparent resize-none focus:outline-none leading-relaxed font-mono"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <textarea
                  value={resumeText}
                  onChange={e => setResumeText(e.target.value)}
                  placeholder={tx.cvPlaceholder}
                  rows={10}
                  className="w-full px-6 py-5 text-sm text-gray-700 placeholder:text-gray-300 bg-transparent resize-none focus:outline-none leading-relaxed"
                />
                <span className={cn("absolute bottom-3 right-4 text-xs font-medium px-2 py-0.5 rounded-full",
                  resumeText.length >= 50 ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-400"
                )}>
                  {resumeText.length} {lang === "es" ? "car." : "chars"}
                </span>
              </div>
            )}
          </div>

          {/* Cartas anteriores card */}
          <div className="glass rounded-2xl border border-white/80 overflow-hidden">
            <div className="border-b border-gray-100 px-6 py-4 flex items-start gap-3">
              <div className="h-9 w-9 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                <Mic className="h-4 w-4 text-violet-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm">{tx.prevLettersTitle}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mt-0.5">{tx.prevLettersDesc}</p>
              </div>
              <span className="shrink-0 text-xs bg-violet-50 text-violet-600 border border-violet-100 px-2 py-0.5 rounded-full font-medium">
                {lang === "es" ? "Opcional" : "Optional"}
              </span>
            </div>

            <div className="px-6 py-5 space-y-3">
              {prevLetters.length === 0 && (
                <p className="text-xs text-gray-400 italic">{tx.noLetters}</p>
              )}

              {prevLetters.map((letter, i) => (
                <div key={letter.id} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-violet-100 bg-violet-50/40">
                  <div className="h-7 w-7 rounded-lg bg-violet-100 flex items-center justify-center shrink-0">
                    <Mail className="h-3.5 w-3.5 text-violet-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-violet-800 truncate">{letter.name}</p>
                    <p className="text-xs text-violet-500">{tx.letterN(i + 1)} · {letter.text.length.toLocaleString()} {lang === "es" ? "caracteres" : "characters"}</p>
                  </div>
                  <button
                    onClick={() => removePrevLetter(letter.id)}
                    className="shrink-0 h-6 w-6 rounded-full hover:bg-violet-200 flex items-center justify-center transition-colors"
                  >
                    <X className="h-3.5 w-3.5 text-violet-500" />
                  </button>
                </div>
              ))}

              {prevLetters.length < 3 ? (
                <FileUpload
                  onText={() => {}}
                  onFile={(name, text) => addPrevLetter(name, text)}
                  resetAfterUpload
                  label={tx.addLetter}
                  hint={tx.addLetterHint}
                  className="mt-1"
                />
              ) : (
                <p className="text-xs text-gray-400">{lang === "es" ? "Máximo 3 cartas anteriores." : "Maximum 3 previous letters."}</p>
              )}
            </div>
          </div>

          {/* Continue */}
          <div className="flex justify-end">
            <button
              onClick={() => { if (resumeText.length >= 50) setStep(2); else toast.error(lang === "es" ? "Mínimo 50 caracteres en el CV" : "Min 50 characters in CV") }}
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
              <Briefcase className="h-4 w-4 text-pink-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">{tx.pasteJob}</h3>
          </div>

          <div className="px-6 pt-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">{tx.company}</label>
                <input value={company} onChange={e => setCompany(e.target.value)} placeholder={tx.companyPlaceholder}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 bg-white/70 text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">{tx.position}</label>
                <input value={position} onChange={e => setPosition(e.target.value)} placeholder={tx.positionPlaceholder}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 bg-white/70 text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">{tx.tone}</label>
              <div className="flex gap-2">
                {(["professional", "enthusiastic", "creative"] as Tone[]).map(t => (
                  <button key={t} onClick={() => setTone(t)}
                    className={cn("flex-1 py-2 text-xs font-semibold rounded-xl border transition-all",
                      tone === t ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" : "bg-white/70 text-gray-500 border-gray-200 hover:border-gray-300"
                    )}
                  >{tx.tones[t]}</button>
                ))}
              </div>
            </div>

            {prevLetters.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-50 border border-violet-100 text-xs text-violet-600">
                <Mic className="h-3.5 w-3.5 shrink-0" />
                {lang === "es"
                  ? `${prevLetters.length} carta${prevLetters.length > 1 ? "s" : ""} anterior${prevLetters.length > 1 ? "es" : ""} cargada${prevLetters.length > 1 ? "s" : ""} — la IA copiará tu voz`
                  : `${prevLetters.length} previous letter${prevLetters.length > 1 ? "s" : ""} loaded — AI will copy your voice`}
              </div>
            )}

            <textarea
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              placeholder={tx.pasteJobPlaceholder}
              rows={8}
              className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-white/70 text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none leading-relaxed"
            />
          </div>

          <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
            <button onClick={() => setStep(1)} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">← {tx.back}</button>
            <button
              onClick={handleGenerate}
              disabled={generating || !company || !position || jobDescription.length < 50}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              {generating
                ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> {tx.generating}</>
                : <><Sparkles className="h-3.5 w-3.5" /> {tx.generate}</>
              }
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: RESULT ── */}
      {step === 3 && result && (
        <div className="glass rounded-2xl border border-white/80 overflow-hidden">
          <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" />
              <span className="font-bold text-gray-900 text-sm">{tx.result}</span>
              {(hasVoice || prevLetters.length > 0) && (
                <span className="text-xs bg-violet-50 text-violet-600 border border-violet-100 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <Mic className="h-3 w-3" /> {tx.voiceActive}
                </span>
              )}
            </div>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? tx.copied : tx.copy}
            </button>
          </div>
          <textarea
            value={result}
            readOnly
            rows={22}
            className="w-full px-6 py-5 text-sm text-gray-700 bg-transparent resize-none focus:outline-none leading-relaxed"
          />
          <div className="border-t border-gray-100 px-6 py-3 flex items-center justify-between">
            <button onClick={() => { setStep(2); setResult(null) }} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              ← {tx.generateAnother}
            </button>
            <span className="text-xs text-gray-300">{tx.savedAuto}</span>
          </div>
        </div>
      )}

      {!isPro && (
        <p className="text-xs text-gray-400 text-center">
          {tx.limitNote}{" "}
          <a href="/pricing" className="text-indigo-600 font-semibold hover:underline">{tx.upgrade}</a>
          {" "}{tx.freeLimitHint}
        </p>
      )}
    </div>
  )
}
