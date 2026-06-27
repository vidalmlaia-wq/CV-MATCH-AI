import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, FileText, Clock, Sparkles, ArrowRight } from "lucide-react"
import { formatDate, cn } from "@/lib/utils"
import { DeleteResumeButton } from "@/components/resumes/delete-button"

const TEMPLATES = [
  { id: "modern",     label: "Modern",     color: "bg-indigo-500" },
  { id: "classic",    label: "Classic",    color: "bg-gray-700" },
  { id: "minimalist", label: "Minimalist", color: "bg-slate-400" },
]

export default async function ResumesPage() {
  const session = await auth()
  const userId = session?.user?.id

  const [resumes, subscription] = userId
    ? await Promise.all([
        prisma.resume.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } }).catch(() => []),
        prisma.subscription.findUnique({ where: { userId } }).catch(() => null),
      ])
    : [[], null]

  const isPro = subscription?.plan === "pro" && (subscription as { status: string } | null)?.status === "active"
  const maxFree = 2
  const canCreate = isPro || resumes.length < maxFree

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1">Documentos</p>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Mis CVs</h1>
          <p className="text-gray-400 text-sm mt-1">
            {resumes.length === 0
              ? "Crea tu primer CV profesional con ayuda de la IA."
              : `${resumes.length} CV${resumes.length !== 1 ? "s" : ""} guardado${resumes.length !== 1 ? "s" : ""}`}
            {!isPro && ` · Plan gratuito: ${resumes.length}/${maxFree}`}
          </p>
        </div>
        {canCreate ? (
          <Link
            href="/resumes/new"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors shadow-sm shadow-indigo-200"
          >
            <Plus className="h-4 w-4" /> Nuevo CV
          </Link>
        ) : (
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-opacity shadow-sm"
          >
            <Sparkles className="h-4 w-4" /> Actualizar a Pro
          </Link>
        )}
      </div>

      {/* Empty state */}
      {resumes.length === 0 && (
        <div className="aurora-bg rounded-2xl border border-white/60 py-20 px-6 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-2xl bg-white/80 border border-white shadow-sm flex items-center justify-center mb-5">
            <FileText className="h-8 w-8 text-indigo-500" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Aún no tienes CVs</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-xs">
            Crea tu primer CV rellenando tus datos. La IA te ayudará a redactar cada sección.
          </p>
          <Link
            href="/resumes/new"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-md shadow-indigo-200"
          >
            <Plus className="h-4 w-4" /> Crear mi primer CV
          </Link>
        </div>
      )}

      {/* Grid */}
      {resumes.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {resumes.map((resume: (typeof resumes)[number]) => {
            const tpl = TEMPLATES.find(t => t.id === resume.template) ?? TEMPLATES[0]
            return (
              <div
                key={resume.id}
                className="glass rounded-2xl border border-white/80 overflow-hidden group hover:shadow-lg hover:shadow-gray-100 transition-all"
              >
                {/* CV preview strip */}
                <div className="h-28 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                  {/* Mini mock doc */}
                  <div className="w-24 h-20 bg-white rounded shadow-sm border border-gray-200 p-2 flex flex-col gap-1">
                    <div className={cn("h-2 rounded-full w-3/4", tpl.color)} />
                    <div className="h-1 rounded-full bg-gray-200 w-full mt-1" />
                    <div className="h-1 rounded-full bg-gray-200 w-5/6" />
                    <div className="h-1 rounded-full bg-gray-200 w-4/6 mt-1" />
                    <div className="h-1 rounded-full bg-gray-200 w-full" />
                    <div className="h-1 rounded-full bg-gray-200 w-3/4" />
                  </div>
                  {/* Template badge */}
                  <span className="absolute top-2 right-2 text-[10px] font-semibold bg-white/80 border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {tpl.label}
                  </span>
                  {/* Delete hover */}
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DeleteResumeButton id={resume.id} />
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-1 truncate">{resume.title}</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mb-4">
                    <Clock className="h-3 w-3" /> Editado {formatDate(resume.updatedAt)}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/resumes/${resume.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 rounded-xl transition-colors"
                    >
                      Editar
                    </Link>
                    <Link
                      href={`/resumes/${resume.id}/preview`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2 rounded-xl transition-colors"
                    >
                      Vista previa
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}

          {/* New CV card */}
          {canCreate && (
            <Link
              href="/resumes/new"
              className="glass rounded-2xl border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/20 transition-all flex flex-col items-center justify-center gap-3 py-12 group"
            >
              <div className="h-12 w-12 rounded-2xl bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                <Plus className="h-6 w-6 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-500 group-hover:text-indigo-700 transition-colors">Nuevo CV</p>
                <p className="text-xs text-gray-400 mt-0.5">Empieza desde cero</p>
              </div>
            </Link>
          )}

          {/* Upgrade card si llegó al límite */}
          {!isPro && !canCreate && (
            <Link
              href="/pricing"
              className="glass rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/60 to-violet-50/40 flex flex-col items-center justify-center gap-3 py-12 group hover:shadow-md transition-all"
            >
              <div className="h-12 w-12 rounded-2xl bg-indigo-100 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="text-center px-4">
                <p className="text-sm font-bold text-indigo-700">CVs ilimitados con Pro</p>
                <p className="text-xs text-indigo-400 mt-0.5">desde €9/mes</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:gap-2 transition-all">
                Ver planes <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          )}
        </div>
      )}

    </div>
  )
}
