import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ATSAnalyzer } from "@/components/ats/analyzer"
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
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">Herramientas</p>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Análisis ATS</h1>
        <p className="text-gray-400 text-sm mt-1">
          Comprueba la compatibilidad de tu CV con los sistemas de selección automática.
        </p>
      </div>

      <ATSAnalyzer resumes={resumes} isPro={isPro} />

      {analyses.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Análisis anteriores</h2>
          <div className="grid gap-3">
            {analyses.map((a) => (
              <div key={a.id} className="glass rounded-xl px-5 py-4 flex items-center justify-between border border-white/80">
                <div>
                  <p className="font-medium text-gray-900">{a.jobTitle}</p>
                  <p className="text-sm text-gray-400">{formatDate(a.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-4 w-4 text-gray-300" />
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                    a.score >= 80 ? "bg-emerald-50 text-emerald-700" :
                    a.score >= 60 ? "bg-amber-50 text-amber-700" :
                    "bg-rose-50 text-rose-700"
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
