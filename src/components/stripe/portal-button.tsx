"use client"

import { useState } from "react"
import { Loader2, Settings } from "lucide-react"

interface Props {
  className?: string
  children?: React.ReactNode
}

export function PortalButton({ className, children }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleClick} disabled={loading} className={className}>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        children ?? <><Settings className="h-4 w-4" /> Gestionar suscripción</>
      )}
    </button>
  )
}
