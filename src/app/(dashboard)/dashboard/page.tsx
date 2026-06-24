import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { FileText, Target, Mail, Plus, TrendingUp, ArrowRight, Sparkles, Mic, ChevronRight, Clock } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default async function DashboardPage() {
  const session = await auth()
  const userId = session?.user?.id

  const [resumes, analyses, coverLetters, subscription] = userId
    ? await Promise.all([
        prisma.resume.findMany({ where: { userId }, orderBy: { updatedAt: "desc" }, take: 5 }).catch(() => []),
        prisma.aTSAnalysis.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 5 }).catch(() => []),
        prisma.coverLetter.findMany({ where: { userId }, orderBy: { updatedAt: "desc" }, take: 5 }).catch(() => []),
        prisma.subscription.findUnique({ where: { userId } }).catch(() => null),
      ])
    : [[], [], [], null]

  const isPro = subscription?.plan === "pro" && (subscription as { status: string } | null)?.status === "active"
  const avgScore = analyses.length > 0
    ? Math.round(analyses.reduce((a, b) => a + b.score, 0) / analyses.length)
    : null

  const firstName = session?.user?.name?.split(" ")[0] ?? "Hola"
  const isNew = resumes.length === 0 && analyses.length === 0 && coverLetters.length === 0

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1">Dashboard</p>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Hola, {firstName} 👋
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            {isNew ? "Bienvenida a CVMatch AI. Empieza creando tu primer CV." : "Aquí tienes un resumen de tu actividad."}
          </p>
        </div>
        {!isPro && (
          <Link
            href="/pricing"
            className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity shadow-md shadow-indigo-200"
          >
            <Sparkles className="h-3.5 w-3.5" /> Actualizar a Pro
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "CVs creados",      value: resumes.length,                    icon: FileText,   href: "/resumes",       bg: "bg-indigo-50",  iconColor: "text-indigo-600",  border: "border-indigo-100" },
          { label: "Análisis ATS",     value: analyses.length,                   icon: Target,     href: "/ats",           bg: "bg-pink-50",    iconColor: "text-pink-600",    border: "border-pink-100" },
          { label: "Cartas generadas", value: coverLetters.length,               icon: Mail,       href: "/cover-letters", bg: "bg-emerald-50", iconColor: "text-emerald-600", border: "border-emerald-100" },
          { label: "Puntuación media", value: avgScore != null ? `${avgScore}%` : "—", icon: TrendingUp, href: "/ats",           bg: "bg-amber-50",   iconColor: "text-amber-600",   border: "border-amber-100" },
        ].map(s => (
          <Link
            key={s.label}
            href={s.href}
            className="glass rounded-2xl p-5 border border-white/80 hover:shadow-lg hover:shadow-gray-100 transition-all group"
          >
            <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl mb-3 ${s.bg} border ${s.border}`}>
              <s.icon className={`h-4 w-4 ${s.iconColor}`} />
            </div>
            <div className="text-2xl font-black text-gray-900 tabular-nums">{s.value}</div>
            <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
              {s.label}
              <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-60 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>

      {/* Getting started — solo si no tiene nada */}
      {isNew && (
        <div className="aurora-bg rounded-2xl p-6 border border-white/60">
          <h2 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-500" /> Empieza aquí
          </h2>
          <p className="text-sm text-gray-500 mb-5">Sigue estos pasos para sacar el máximo partido a CVMatch AI.</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { n: "01", title: "Crea tu CV",         desc: "Rellena tus datos y genera un CV profesional en minutos.",        href: "/resumes/new",    cta: "Crear CV",        color: "indigo" },
              { n: "02", title: "Analiza con ATS",    desc: "Pega una oferta y descubre cuánto coincide tu CV.",               href: "/ats",             cta: "Analizar ahora",  color: "pink" },
              { n: "03", title: "Genera tu carta",    desc: "La IA escribe una carta de presentación personalizada por ti.",   href: "/cover-letters",  cta: "Generar carta",   color: "emerald" },
            ].map(step => (
              <Link
                key={step.n}
                href={step.href}
                className="glass rounded-xl p-4 border border-white/80 group hover:shadow-md transition-all"
              >
                <span className={`text-xs font-black tracking-widest text-${step.color}-400 uppercase`}>{step.n}</span>
                <h3 className="font-bold text-gray-900 mt-1 mb-1 text-sm">{step.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">{step.desc}</p>
                <span className={`inline-flex items-center gap-1 text-xs font-semibold text-${step.color}-600 group-hover:gap-2 transition-all`}>
                  {step.cta} <ChevronRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Actividad reciente — solo si tiene datos */}
      {!isNew && (
        <div className="grid md:grid-cols-3 gap-4">

          {/* Mis CVs */}
          <div className="glass rounded-2xl border border-white/80 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <FileText className="h-3.5 w-3.5 text-indigo-600" />
                </div>
                <span className="text-sm font-bold text-gray-900">Mis CVs</span>
              </div>
              <Link href="/resumes" className="text-xs text-gray-400 hover:text-indigo-600 transition-colors">Ver todos</Link>
            </div>
            <div className="px-5 py-3 space-y-1 min-h-[80px]">
              {resumes.length === 0 ? (
                <p className="text-xs text-gray-400 py-4 text-center">Aún no tienes CVs.</p>
              ) : resumes.slice(0, 4).map(r => (
                <Link
                  key={r.id}
                  href={`/resumes/${r.id}`}
                  className="flex items-center justify-between py-2 group rounded-lg hover:bg-gray-50 -mx-1 px-1 transition-colors"
                >
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors truncate mr-2">{r.title}</span>
                  <span className="text-[11px] text-gray-300 shrink-0 flex items-center gap-1">
                    <Clock className="h-3 w-3" />{formatDate(r.updatedAt)}
                  </span>
                </Link>
              ))}
            </div>
            <div className="px-5 pb-4">
              <Link
                href="/resumes/new"
                className="flex items-center justify-center gap-1.5 w-full bg-gray-50 hover:bg-indigo-50 hover:text-indigo-700 text-gray-500 text-xs font-semibold py-2.5 rounded-xl transition-colors border border-dashed border-gray-200 hover:border-indigo-200"
              >
                <Plus className="h-3.5 w-3.5" /> Nuevo CV
              </Link>
            </div>
          </div>

          {/* ATS */}
          <div className="glass rounded-2xl border border-white/80 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center">
                  <Target className="h-3.5 w-3.5 text-pink-600" />
                </div>
                <span className="text-sm font-bold text-gray-900">Análisis ATS</span>
              </div>
              <Link href="/ats" className="text-xs text-gray-400 hover:text-pink-600 transition-colors">Ver todos</Link>
            </div>
            <div className="px-5 py-3 space-y-1 min-h-[80px]">
              {analyses.length === 0 ? (
                <p className="text-xs text-gray-400 py-4 text-center">No has analizado ningún CV.</p>
              ) : analyses.slice(0, 4).map(a => (
                <div key={a.id} className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600 truncate mr-2">{a.jobTitle}</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                    a.score >= 80 ? "bg-emerald-50 text-emerald-700" :
                    a.score >= 60 ? "bg-amber-50 text-amber-700" :
                    "bg-rose-50 text-rose-700"
                  }`}>{a.score}%</span>
                </div>
              ))}
            </div>
            <div className="px-5 pb-4">
              <Link
                href="/ats"
                className="flex items-center justify-center gap-1.5 w-full bg-gray-50 hover:bg-pink-50 hover:text-pink-700 text-gray-500 text-xs font-semibold py-2.5 rounded-xl transition-colors border border-dashed border-gray-200 hover:border-pink-200"
              >
                <Plus className="h-3.5 w-3.5" /> Nuevo análisis
              </Link>
            </div>
          </div>

          {/* Cartas */}
          <div className="glass rounded-2xl border border-white/80 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <Mail className="h-3.5 w-3.5 text-emerald-600" />
                </div>
                <span className="text-sm font-bold text-gray-900">Cartas recientes</span>
              </div>
              <Link href="/cover-letters" className="text-xs text-gray-400 hover:text-emerald-600 transition-colors">Ver todas</Link>
            </div>
            <div className="px-5 py-3 space-y-1 min-h-[80px]">
              {coverLetters.length === 0 ? (
                <p className="text-xs text-gray-400 py-4 text-center">No has generado cartas aún.</p>
              ) : coverLetters.slice(0, 4).map(c => (
                <Link
                  key={c.id}
                  href={`/cover-letters/${c.id}`}
                  className="flex items-center justify-between py-2 group rounded-lg hover:bg-gray-50 -mx-1 px-1 transition-colors"
                >
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors truncate mr-2">{c.title}</span>
                  <span className="text-[11px] text-gray-300 shrink-0 flex items-center gap-1">
                    <Clock className="h-3 w-3" />{formatDate(c.updatedAt)}
                  </span>
                </Link>
              ))}
            </div>
            <div className="px-5 pb-4">
              <Link
                href="/cover-letters"
                className="flex items-center justify-center gap-1.5 w-full bg-gray-50 hover:bg-emerald-50 hover:text-emerald-700 text-gray-500 text-xs font-semibold py-2.5 rounded-xl transition-colors border border-dashed border-gray-200 hover:border-emerald-200"
              >
                <Plus className="h-3.5 w-3.5" /> Generar carta
              </Link>
            </div>
          </div>

        </div>
      )}

      {/* Upsell */}
      {!isPro && (
        <div className="relative overflow-hidden glass rounded-2xl border border-indigo-100 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/60 via-violet-50/30 to-pink-50/20 pointer-events-none" />
          <div className="relative">
            <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-indigo-500" /> Desbloquea todo el potencial
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              CVs ilimitados, análisis sin límite, optimización IA con GPT-4o y perfil de voz por solo <span className="font-semibold text-gray-700">€9/mes</span>.
            </p>
          </div>
          <Link
            href="/pricing"
            className="relative shrink-0 bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-opacity shadow-md shadow-indigo-200 whitespace-nowrap"
          >
            Ver planes →
          </Link>
        </div>
      )}

      {/* Voice profile nudge */}
      {!isPro && (
        <Link
          href="/settings"
          className="flex items-center gap-3 glass rounded-2xl px-5 py-3.5 border border-violet-100 hover:border-violet-200 transition-colors group"
        >
          <div className="h-8 w-8 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
            <Mic className="h-4 w-4 text-violet-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">Configura tu perfil de voz</p>
            <p className="text-xs text-gray-400">La IA aprenderá a escribir exactamente como tú.</p>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-violet-400 transition-colors shrink-0" />
        </Link>
      )}

    </div>
  )
}
