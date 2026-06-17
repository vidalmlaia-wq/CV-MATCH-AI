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
        <h1 className="text-3xl font-black text-white">Análisis ATS</h1>
        <p className="text-white/40">
          Comprueba la compatibilidad de tu CV con los sistemas de selección automática.
        </p>
      </div>

      <ATSAnalyzer resumes={resumes} isPro={isPro} />

      {analyses.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Análisis anteriores</h2>
          <div className="grid gap-3">
            {analyses.map((a) => (
              <div key={a.id} className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">{a.jobTitle}</p>
                  <p className="text-sm text-white/40">{formatDate(a.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-4 w-4 text-white/30" />
                  <span className={`text-base font-bold px-3 py-1 rounded-full ${
                    a.score >= 80 ? "bg-green-500/20 text-green-400" :
                    a.score >= 60 ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                  }`}>
                    {a.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
