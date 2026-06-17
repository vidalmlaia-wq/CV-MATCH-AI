import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { FileText, Target, Mail, Plus, TrendingUp, ArrowRight, Sparkles } from "lucide-react"
import { formatDate, cn } from "@/lib/utils"

export default async function DashboardPage() {
  const session = await auth()
  const userId = session!.user!.id!

  const [resumes, analyses, coverLetters, subscription] = await Promise.all([
    prisma.resume.findMany({ where: { userId }, orderBy: { updatedAt: "desc" }, take: 5 }),
    prisma.aTSAnalysis.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.coverLetter.findMany({ where: { userId }, orderBy: { updatedAt: "desc" }, take: 5 }),
    prisma.subscription.findUnique({ where: { userId } }),
  ])

  const isPro = subscription?.plan === "pro" && subscription.status === "active"
  const avgScore =
    analyses.length > 0
      ? Math.round(analyses.reduce((acc, a) => acc + a.score, 0) / analyses.length)
      : null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">
            Hola, {session?.user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-white/40 mt-1">Aquí tienes un resumen de tu actividad.</p>
        </div>
        {!isPro && (
          <Link
            href="/pricing"
            className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20"
          >
            <Sparkles className="h-4 w-4" /> Actualizar a Pro
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "CVs creados", value: resumes.length, icon: FileText, href: "/resumes", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
          { label: "Análisis ATS", value: analyses.length, icon: Target, href: "/ats", color: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
          { label: "Cartas", value: coverLetters.length, icon: Mail, href: "/cover-letters", color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
          { label: "Puntuación media", value: avgScore ? `${avgScore}%` : "—", icon: TrendingUp, href: "/ats", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
        ].map((stat) => (
          <Link key={stat.label} href={stat.href} className={cn("group bg-white/5 border rounded-2xl p-5 hover:bg-white/8 transition-all", stat.bg)}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</p>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </div>
            <div className="text-3xl font-black text-white">{stat.value}</div>
            <div className={cn("text-xs mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity", stat.color)}>
              Ver detalle <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* CVs */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-400" /> Mis CVs
            </h2>
            <Link href="/resumes" className="text-xs text-white/30 hover:text-white/70 transition-colors">
              Ver todos
            </Link>
          </div>
          <div className="space-y-2 mb-4 min-h-[60px]">
            {resumes.length === 0 ? (
              <p className="text-sm text-white/30 py-3">Aún no tienes CVs.</p>
            ) : (
              resumes.slice(0, 3).map((r) => (
                <Link key={r.id} href={`/resumes/${r.id}`} className="flex items-center justify-between group">
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors truncate">{r.title}</span>
                  <span className="text-xs text-white/25 shrink-0 ml-2">{formatDate(r.updatedAt)}</span>
                </Link>
              ))
            )}
          </div>
          <Link href="/resumes/new" className="flex items-center justify-center gap-1.5 w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-sm py-2 rounded-lg transition-all">
            <Plus className="h-3.5 w-3.5" /> Nuevo CV
          </Link>
        </div>

        {/* ATS */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Target className="h-4 w-4 text-violet-400" /> Análisis ATS
            </h2>
            <Link href="/ats" className="text-xs text-white/30 hover:text-white/70 transition-colors">
              Ver todos
            </Link>
          </div>
          <div className="space-y-2 mb-4 min-h-[60px]">
            {analyses.length === 0 ? (
              <p className="text-sm text-white/30 py-3">No has analizado ningún CV.</p>
            ) : (
              analyses.slice(0, 3).map((a) => (
                <div key={a.id} className="flex items-center justify-between">
                  <span className="text-sm text-white/60 truncate">{a.jobTitle}</span>
                  <span className={cn(
                    "text-xs font-bold shrink-0 ml-2 px-2 py-0.5 rounded-full",
                    a.score >= 80 ? "bg-green-500/20 text-green-400" :
                    a.score >= 60 ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-red-500/20 text-red-400"
                  )}>
                    {a.score}%
                  </span>
                </div>
              ))
            )}
          </div>
          <Link href="/ats" className="flex items-center justify-center gap-1.5 w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-sm py-2 rounded-lg transition-all">
            <Plus className="h-3.5 w-3.5" /> Nuevo análisis
          </Link>
        </div>

        {/* Cartas */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <Mail className="h-4 w-4 text-pink-400" /> Cartas recientes
            </h2>
            <Link href="/cover-letters" className="text-xs text-white/30 hover:text-white/70 transition-colors">
              Ver todas
            </Link>
          </div>
          <div className="space-y-2 mb-4 min-h-[60px]">
            {coverLetters.length === 0 ? (
              <p className="text-sm text-white/30 py-3">No has generado cartas aún.</p>
            ) : (
              coverLetters.slice(0, 3).map((c) => (
                <Link key={c.id} href={`/cover-letters/${c.id}`} className="block text-sm text-white/60 hover:text-white transition-colors truncate">
                  {c.title}
                </Link>
              ))
            )}
          </div>
          <Link href="/cover-letters" className="flex items-center justify-center gap-1.5 w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-sm py-2 rounded-lg transition-all">
            <Plus className="h-3.5 w-3.5" /> Generar carta
          </Link>
        </div>
      </div>

      {/* Upsell banner for free users */}
      {!isPro && (
        <div className="bg-gradient-to-r from-violet-500/15 to-indigo-500/10 border border-violet-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-violet-400" /> Desbloquea todo el potencial
            </h3>
            <p className="text-white/50 text-sm mt-1">
              Pasa a Pro y obtén CVs ilimitados, análisis ilimitados y optimización IA con GPT-4o.
            </p>
          </div>
          <Link
            href="/pricing"
            className="shrink-0 bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20 whitespace-nowrap"
          >
            Ver planes →
          </Link>
        </div>
      )}
    </div>
  )
}
