"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { toast } from "sonner"

export function UpgradeButton() {
  const [loading, setLoading] = useState(false)

  async function handleUpgrade() {
    setLoading(true)
    try {
      const res = await fetch("/api/stripe/create-checkout", { method: "POST" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      window.location.href = data.url
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Error al iniciar el pago")
      setLoading(false)
    }
  }

  return (
    <Button className="w-full" size="lg" onClick={handleUpgrade} disabled={loading}>
      <Zap className="h-4 w-4 mr-2" />
      {loading ? "Redirigiendo..." : "Actualizar a Pro – €12/mes"}
    </Button>
  )
}
