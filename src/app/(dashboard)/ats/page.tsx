import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ATSAnalyzer } from "@/components/ats/analyzer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import { TrendingUp } from "lucide-react"

export default async function ATSPage() {
  const session = await auth()
  const userId = session!.user!.id!

  const [resumes, analyses, subscription] = await Promise.all([
    prisma.resume.findMany({ where: { userId }, select: { id: true, title: true } }),
    prisma.aTSAnalysis.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.subscription.findUnique({ where: { userId } }),
  ])

  const isPro = subscription?.plan === "pro" && subscription.status === "active"

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Análisis ATS</h1>
        <p className="text-muted-foreground">
          Comprueba la compatibilidad de tu CV con los sistemas de selección automática.
        </p>
      </div>

      <ATSAnalyzer resumes={resumes} isPro={isPro} />

      {analyses.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Análisis anteriores</h2>
          <div className="grid gap-3">
            {analyses.map((a) => (
              <Card key={a.id}>
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium">{a.jobTitle}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(a.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <Badge
                      variant={a.score >= 80 ? "default" : a.score >= 60 ? "secondary" : "destructive"}
                      className="text-base px-3 py-1"
                    >
                      {a.score}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
