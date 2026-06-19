import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { FileText, Target, Mail, Plus, TrendingUp, ArrowRight, Sparkles } from "lucide-react"
import { formatDate } from "@/lib/utils"

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
  const avgScore = analyses.length > 0
    ? Math.round(analyses.reduce((a, b) => a + b.score, 0) / analyses.length)
    : null

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Hola, {session?.user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-400 mt-0.5 text-sm">Aquí tienes un resumen de tu actividad.</p>
        </div>
        {!isPro && (
          <Link href="/pricing" className="hidden sm:inline-flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors shadow-sm">
            <Sparkles className="h-3.5 w-3.5" /> Actualizar a Pro
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "CVs creados",    value: resumes.length,               icon: FileText,  href: "/resumes",       bg: "#e0e7ff", color: "#4338ca" },
          { label: "Análisis ATS",   value: analyses.length,              icon: Target,    href: "/ats",           bg: "#fce7f3", color: "#be185d" },
          { label: "Cartas",         value: coverLetters.length,          icon: Mail,      href: "/cover-letters", bg: "#d1fae5", color: "#065f46" },
          { label: "Puntuación media", value: avgScore ? `${avgScore}%` : "—", icon: TrendingUp, href: "/ats",    bg: "#ffe4d6", color: "#9a3412" },
        ].map(s => (
          <Link key={s.label} href={s.href} className="glass rounded-2xl p-5 hover:shadow-lg hover:shadow-gray-100 transition-all group border border-white/80">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl mb-3" style={{ background: s.bg }}>
              <s.icon className="h-4 w-4" style={{ color: s.color }} />
            </div>
            <div className="text-2xl font-black text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              {s.label}
              <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* CVs */}
        <div className="glass rounded-2xl p-5 border border-white/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-xl flex items-center justify-center bg-[#e0e7ff]">
                <FileText className="h-3.5 w-3.5 text-indigo-700" />
              </div>
              <span className="text-sm font-semibold text-gray-900">Mis CVs</span>
            </div>
            <Link href="/resumes" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Ver todos</Link>
          </div>
          <div className="space-y-2.5 min-h-[64px] mb-4">
            {resumes.length === 0 ? (
              <p className="text-xs text-gray-400 py-3">Aún no tienes CVs.</p>
            ) : resumes.slice(0,3).map(r => (
              <Link key={r.id} href={`/resumes/${r.id}`} className="flex items-center justify-between group">
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors truncate">{r.title}</span>
                <span className="text-xs text-gray-300 shrink-0 ml-2">{formatDate(r.updatedAt)}</span>
              </Link>
            ))}
          </div>
          <Link href="/resumes/new" className="flex items-center justify-center gap-1.5 w-full bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 text-xs font-medium py-2 rounded-xl transition-colors">
            <Plus className="h-3.5 w-3.5" /> Nuevo CV
          </Link>
        </div>

        {/* ATS */}
        <div className="glass rounded-2xl p-5 border border-white/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-xl flex items-center justify-center bg-[#fce7f3]">
                <Target className="h-3.5 w-3.5 text-pink-700" />
              </div>
              <span className="text-sm font-semibold text-gray-900">Análisis ATS</span>
            </div>
            <Link href="/ats" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Ver todos</Link>
          </div>
          <div className="space-y-2.5 min-h-[64px] mb-4">
            {analyses.length === 0 ? (
              <p className="text-xs text-gray-400 py-3">No has analizado ningún CV.</p>
            ) : analyses.slice(0,3).map(a => (
              <div key={a.id} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 truncate">{a.jobTitle}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                  a.score >= 80 ? "bg-emerald-50 text-emerald-700" :
                  a.score >= 60 ? "bg-amber-50 text-amber-700" :
                  "bg-rose-50 text-rose-700"
                }`}>{a.score}%</span>
              </div>
            ))}
          </div>
          <Link href="/ats" className="flex items-center justify-center gap-1.5 w-full bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 text-xs font-medium py-2 rounded-xl transition-colors">
            <Plus className="h-3.5 w-3.5" /> Nuevo análisis
          </Link>
        </div>

        {/* Cartas */}
        <div className="glass rounded-2xl p-5 border border-white/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-xl flex items-center justify-center bg-[#d1fae5]">
                <Mail className="h-3.5 w-3.5 text-emerald-700" />
              </div>
              <span className="text-sm font-semibold text-gray-900">Cartas recientes</span>
            </div>
            <Link href="/cover-letters" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Ver todas</Link>
          </div>
          <div className="space-y-2.5 min-h-[64px] mb-4">
            {coverLetters.length === 0 ? (
              <p className="text-xs text-gray-400 py-3">No has generado cartas aún.</p>
            ) : coverLetters.slice(0,3).map(c => (
              <Link key={c.id} href={`/cover-letters/${c.id}`} className="flex items-center justify-between group">
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors truncate">{c.title}</span>
                <span className="text-xs text-gray-300 shrink-0 ml-2">{formatDate(c.updatedAt)}</span>
              </Link>
            ))}
          </div>
          <Link href="/cover-letters" className="flex items-center justify-center gap-1.5 w-full bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 text-xs font-medium py-2 rounded-xl transition-colors">
            <Plus className="h-3.5 w-3.5" /> Generar carta
          </Link>
        </div>
      </div>

      {/* Upsell */}
      {!isPro && (
        <div className="glass rounded-2xl p-6 border border-indigo-100 bg-gradient-to-r from-indigo-50/60 to-purple-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-indigo-500" /> Desbloquea todo el potencial
            </h3>
            <p className="text-gray-500 text-sm mt-1">CVs ilimitados, análisis ilimitados y optimización IA con GPT-4o por solo €9/mes.</p>
          </div>
          <Link href="/pricing" className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-sm whitespace-nowrap">
            Ver planes →
          </Link>
        </div>
      )}
    </div>
  )
}
