"use client"

import { useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"

interface Props {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

export function CheckoutButton({ className, style, children }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch("/api/stripe/create-checkout", { method: "POST" })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else if (res.status === 401) {
        window.location.href = "/login?plan=pro"
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleClick} disabled={loading} className={className} style={style}>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        children ?? <>Empezar Pro <ArrowRight className="h-4 w-4" /></>
      )}
    </button>
  )
}
