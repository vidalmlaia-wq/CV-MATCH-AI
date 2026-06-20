"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Loader2, Mic, Sparkles, X } from "lucide-react"

interface VoiceProfileProps {
  initial: string
}

export function VoiceProfile({ initial }: VoiceProfileProps) {
  const [value, setValue] = useState(initial)
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch("/api/user/voice", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voiceSamples: value }),
      })
      if (!res.ok) throw new Error()
      toast.success("Perfil de voz guardado")
    } catch {
      toast.error("Error al guardar")
    } finally {
      setSaving(false)
    }
  }

  const charCount = value.length
  const limit = 8000

  return (
    <div className="glass rounded-2xl p-6 border border-white/80">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-violet-100 to-pink-100 flex items-center justify-center">
            <Mic className="h-4 w-4 text-violet-600" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">Tu voz y estilo</h2>
            <p className="text-xs text-gray-400">La IA aprenderá a escribir como tú</p>
          </div>
        </div>
        <span className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full flex items-center gap-1">
          <Sparkles className="h-3 w-3" /> Nuevo
        </span>
      </div>

      {/* Explanation */}
      <div className="bg-gradient-to-r from-violet-50 to-pink-50 rounded-xl p-4 mb-4 border border-violet-100/60">
        <p className="text-xs text-gray-600 leading-relaxed">
          Pega aquí fragmentos de textos que tú hayas escrito — cartas anteriores, emails profesionales, tu CV actual, mensajes de LinkedIn...
          La IA analizará tu forma de escribir y la replicará en todas las cartas y optimizaciones.
          <span className="font-medium text-violet-700"> El resultado suena como tú, no como ChatGPT.</span>
        </p>
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={`Ejemplos de lo que puedes pegar aquí:\n\n— Cartas de presentación que ya hayas enviado\n— Emails que hayas escrito pidiendo trabajo\n— Fragmentos de tu CV actual (sección de experiencia o resumen)\n— Mensajes de LinkedIn que hayas enviado\n\nCuanto más texto mejor — mínimo un párrafo.`}
          rows={10}
          maxLength={limit}
          className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none leading-relaxed"
        />
        {value && (
          <button
            onClick={() => setValue("")}
            className="absolute top-2.5 right-2.5 h-6 w-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="h-3 w-3 text-gray-500" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className={`text-xs ${charCount > limit * 0.9 ? "text-amber-500" : "text-gray-300"}`}>
          {charCount.toLocaleString()} / {limit.toLocaleString()} caracteres
        </span>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
        >
          {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Mic className="h-3 w-3" />}
          {saving ? "Guardando..." : "Guardar voz"}
        </button>
      </div>
    </div>
  )
}
