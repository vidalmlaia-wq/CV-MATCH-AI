"use client"

import { useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Loader2, CheckCircle, XCircle, AlertCircle, Sparkles } from "lucide-react"
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

export function ATSAnalyzer({ resumes, isPro }: ATSAnalyzerProps) {
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [resumeText, setResumeText] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [optimizing, setOptimizing] = useState(false)
  const [result, setResult] = useState<ATSResult | null>(null)
  const [optimized, setOptimized] = useState<string | null>(null)

  async function handleAnalyze() {
    if (!resumeText.trim() || !jobDescription.trim() || !jobTitle.trim()) {
      toast.error("Rellena todos los campos antes de analizar")
      return
    }

    setAnalyzing(true)
    setResult(null)
    setOptimized(null)

    try {
      const res = await fetch("/api/ats/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobTitle, jobDescription }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error en el análisis"
      if (msg.includes("Pro")) {
        toast.error(msg, {
          action: { label: "Actualizar", onClick: () => window.open("/pricing") },
        })
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
        body: JSON.stringify({ analysisId: result.id, resumeText, jobDescription }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setOptimized(data.optimized)
      toast.success("CV optimizado con IA")
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error optimizando"
      toast.error(msg)
    } finally {
      setOptimizing(false)
    }
  }

  const scoreColor =
    result && result.score >= 80
      ? "text-green-600"
      : result && result.score >= 60
      ? "text-yellow-600"
      : "text-red-600"

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label>Puesto de trabajo *</Label>
            <Input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Ej: Desarrollador Frontend React"
            />
          </div>
          <div>
            <Label>Descripción del trabajo *</Label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Pega aquí la descripción completa del puesto..."
              rows={10}
            />
          </div>
        </div>
        <div>
          <Label>Tu CV (texto) *</Label>
          <Textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Pega aquí el contenido de tu CV en texto plano..."
            rows={16}
          />
        </div>
      </div>

      <Button onClick={handleAnalyze} disabled={analyzing} size="lg">
        {analyzing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analizando...
          </>
        ) : (
          "Analizar compatibilidad ATS"
        )}
      </Button>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          <Separator />

          {/* Score */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Puntuación ATS</h3>
                  <p className="text-muted-foreground text-sm">{result.summary}</p>
                </div>
                <span className={`text-5xl font-bold ${scoreColor}`}>{result.score}%</span>
              </div>
              <Progress value={result.score} className="h-3" />
            </CardContent>
          </Card>

          {/* Keywords */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Palabras clave encontradas ({result.keywords.found.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.found.map((k) => (
                    <Badge key={k} variant="secondary" className="bg-green-50 text-green-700">
                      {k}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500" />
                  Palabras clave faltantes ({result.keywords.missing.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.keywords.missing.map((k) => (
                    <Badge key={k} variant="destructive" className="bg-red-50 text-red-700 border-red-200">
                      {k}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suggestions */}
          {result.suggestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  Sugerencias de mejora
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.suggestions.map((s, i) => (
                  <div key={i} className="border-l-4 border-yellow-400 pl-4">
                    <Badge variant="outline" className="mb-1 text-xs">{s.category}</Badge>
                    <p className="text-sm font-medium">{s.issue}</p>
                    <p className="text-sm text-muted-foreground mt-1">→ {s.fix}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Optimize CTA */}
          {!optimized && (
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Optimizar CV con IA</h3>
                    <p className="text-sm text-muted-foreground">
                      Deja que GPT-4 mejore tu CV automáticamente para esta oferta.
                      {!isPro && " Requiere plan Pro."}
                    </p>
                  </div>
                  {isPro ? (
                    <Button onClick={handleOptimize} disabled={optimizing}>
                      {optimizing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Optimizando...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" /> Optimizar con IA
                        </>
                      )}
                    </Button>
                  ) : (
                    <Link href="/pricing" className={cn(buttonVariants())}>
                      Actualizar a Pro
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Optimized CV */}
          {optimized && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  CV Optimizado por IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea value={optimized} rows={20} readOnly className="font-mono text-sm" />
                <Button
                  className="mt-3"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(optimized)
                    toast.success("Copiado al portapapeles")
                  }}
                >
                  Copiar
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
