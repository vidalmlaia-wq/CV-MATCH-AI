import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Zap } from "lucide-react"
import { UpgradeButton } from "@/components/billing/upgrade-button"
import { ManageBillingButton } from "@/components/billing/manage-button"
import { formatDate } from "@/lib/utils"

const features = {
  free: [
    "2 CVs",
    "3 análisis ATS",
    "2 cartas de presentación",
    "Exportación PDF",
    "Plantillas básicas",
  ],
  pro: [
    "CVs ilimitados",
    "Análisis ATS ilimitados",
    "Cartas de presentación ilimitadas",
    "Optimización IA con GPT-4",
    "Exportación PDF premium",
    "Plantillas premium",
    "Soporte prioritario",
  ],
}

export default async function PricingPage() {
  const session = await auth()
  const userId = session!.user!.id!

  const subscription = await prisma.subscription.findUnique({ where: { userId } })
  const isPro = subscription?.plan === "pro" && subscription.status === "active"

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Plan & Facturación</h1>
        <p className="text-muted-foreground">Gestiona tu suscripción y plan actual.</p>
      </div>

      {/* Current plan status */}
      {isPro && subscription && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="pt-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-semibold text-lg">Plan Pro activo</span>
                <Badge>Activo</Badge>
              </div>
              {subscription.currentPeriodEnd && (
                <p className="text-sm text-muted-foreground">
                  {subscription.cancelAtPeriodEnd
                    ? `Cancela el ${formatDate(subscription.currentPeriodEnd)}`
                    : `Se renueva el ${formatDate(subscription.currentPeriodEnd)}`}
                </p>
              )}
            </div>
            <ManageBillingButton />
          </CardContent>
        </Card>
      )}

      {/* Plans */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Free */}
        <Card className={!isPro ? "border-primary" : ""}>
          <CardHeader>
            {!isPro && <Badge className="w-fit mb-2">Plan actual</Badge>}
            <CardTitle className="text-xl">Gratuito</CardTitle>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">€0</span>
              <span className="text-muted-foreground">/siempre</span>
            </div>
            <CardDescription>Para empezar tu búsqueda de empleo.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              {features.free.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Pro */}
        <Card className={isPro ? "border-primary" : ""}>
          <CardHeader>
            {isPro && <Badge className="w-fit mb-2">Plan actual</Badge>}
            <CardTitle className="text-xl">Pro</CardTitle>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">€12</span>
              <span className="text-muted-foreground">/mes</span>
            </div>
            <CardDescription>Para profesionales activos en búsqueda.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              {features.pro.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            {!isPro && <UpgradeButton />}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
