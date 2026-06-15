"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, Mail, Copy, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface GeneratorProps {
  isPro: boolean
}

export function CoverLetterGenerator({ isPro }: GeneratorProps) {
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [resumeText, setResumeText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [tone, setTone] = useState<"professional" | "enthusiastic" | "creative">("professional")
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  async function handleGenerate() {
    if (!company || !position || !resumeText || !jobDescription) {
      toast.error("Rellena todos los campos")
      return
    }

    setGenerating(true)
    setResult(null)

    try {
      const res = await fetch("/api/cover-letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, position, resumeText, jobDescription, tone }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data.content)
      router.refresh()
      toast.success("Carta generada y guardada")
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error generando"
      if (msg.includes("Pro")) {
        toast.error(msg, {
          action: { label: "Actualizar", onClick: () => window.open("/pricing") },
        })
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
    toast.success("Copiado al portapapeles")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Empresa *</Label>
              <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Google" />
            </div>
            <div>
              <Label>Puesto *</Label>
              <Input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Product Manager" />
            </div>
          </div>
          <div>
            <Label>Tono</Label>
            <Select value={tone} onValueChange={(v) => setTone(v as typeof tone)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Profesional</SelectItem>
                <SelectItem value="enthusiastic">Entusiasta</SelectItem>
                <SelectItem value="creative">Creativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Descripción del trabajo *</Label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Pega la descripción del puesto..."
              rows={8}
            />
          </div>
        </div>
        <div>
          <Label>Tu CV (texto) *</Label>
          <Textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Pega el contenido de tu CV..."
            rows={14}
          />
        </div>
      </div>

      {!isPro && (
        <p className="text-sm text-muted-foreground">
          Plan gratuito: máximo 2 cartas.{" "}
          <Link href="/pricing" className="underline text-primary">
            Actualiza a Pro
          </Link>{" "}
          para cartas ilimitadas.
        </p>
      )}

      <Button onClick={handleGenerate} disabled={generating} size="lg">
        {generating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generando carta...
          </>
        ) : (
          <>
            <Mail className="h-4 w-4 mr-2" /> Generar carta de presentación
          </>
        )}
      </Button>

      {result && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Carta generada</CardTitle>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? (
                <><Check className="h-4 w-4 mr-1" /> Copiado</>
              ) : (
                <><Copy className="h-4 w-4 mr-1" /> Copiar</>
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <Textarea value={result} rows={20} readOnly className="text-sm" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
