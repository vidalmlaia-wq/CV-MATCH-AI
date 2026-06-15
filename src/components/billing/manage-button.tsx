"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function ManageBillingButton() {
  const [loading, setLoading] = useState(false)

  async function handleManage() {
    setLoading(true)
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      window.location.href = data.url
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Error")
      setLoading(false)
    }
  }

  return (
    <Button variant="outline" onClick={handleManage} disabled={loading}>
      {loading ? "Cargando..." : "Gestionar suscripción"}
    </Button>
  )
}
