"use client"

import { useRef, useState, DragEvent } from "react"
import { cn } from "@/lib/utils"
import { Loader2, Upload, FileText, X, AlertCircle } from "lucide-react"
import { toast } from "sonner"

interface FileUploadProps {
  onText: (text: string) => void
  onFile?: (name: string, text: string) => void
  resetAfterUpload?: boolean
  label?: string
  hint?: string
  accept?: string
  className?: string
}

export function FileUpload({ onText, onFile, resetAfterUpload = false, label, hint, accept = ".pdf,.docx,.doc,.txt", className }: FileUploadProps) {
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function processFile(file: File) {
    setError(null)
    setFileName(file.name)
    setLoading(true)

    const fd = new FormData()
    fd.append("file", file)

    try {
      const res = await fetch("/api/parse-file", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      onText(data.text)
      if (onFile) onFile(file.name, data.text)
      toast.success(`${file.name} cargado — ${data.chars.toLocaleString()} caracteres`)
      if (resetAfterUpload) {
        setFileName(null)
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error al leer el archivo"
      setError(msg)
      setFileName(null)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    e.target.value = ""
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  function clear() {
    setFileName(null)
    setError(null)
    onText("")
  }

  return (
    <div className={cn("relative", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="sr-only"
        aria-label={label ?? "Subir archivo"}
      />

      {fileName ? (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-emerald-200 bg-emerald-50/60">
          <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
            <FileText className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-emerald-800 truncate">{fileName}</p>
            {!loading && <p className="text-xs text-emerald-600">Texto extraído correctamente</p>}
            {loading && <p className="text-xs text-emerald-600 flex items-center gap-1"><Loader2 className="h-3 w-3 animate-spin" /> Extrayendo texto...</p>}
          </div>
          <button onClick={clear} className="shrink-0 h-6 w-6 rounded-full hover:bg-emerald-200 flex items-center justify-center transition-colors">
            <X className="h-3.5 w-3.5 text-emerald-700" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          disabled={loading}
          className={cn(
            "w-full flex flex-col items-center justify-center gap-2 py-5 px-4 rounded-xl border-2 border-dashed transition-all cursor-pointer",
            dragging
              ? "border-indigo-400 bg-indigo-50/60"
              : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30 bg-gray-50/40",
            loading && "opacity-60 cursor-wait"
          )}
        >
          {loading ? (
            <Loader2 className="h-6 w-6 text-indigo-400 animate-spin" />
          ) : (
            <div className="h-10 w-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              <Upload className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">
              {loading ? "Procesando..." : label ?? "Arrastra aquí o haz clic para subir"}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{hint ?? "PDF, DOCX o TXT · máx 5 MB"}</p>
          </div>
        </button>
      )}

      {error && (
        <div className="flex items-center gap-2 mt-2 text-xs text-rose-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </div>
      )}
    </div>
  )
}
