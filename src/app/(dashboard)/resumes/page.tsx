import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { Plus, FileText } from "lucide-react"
import { formatDate, cn } from "@/lib/utils"
import { DeleteResumeButton } from "@/components/resumes/delete-button"

export default async function ResumesPage() {
  const session = await auth()
  const resumes = await prisma.resume.findMany({
    where: { userId: session!.user!.id! },
    orderBy: { updatedAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">Documentos</p>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Mis CVs</h1>
          <p className="text-gray-400 text-sm">
            {resumes.length} CV{resumes.length !== 1 ? "s" : ""} guardado{resumes.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/resumes/new" className={cn(buttonVariants(), "rounded-full")}>
          <Plus className="h-4 w-4 mr-2" /> Nuevo CV
        </Link>
      </div>

      {resumes.length === 0 ? (
        <div className="glass rounded-2xl border border-white/80 text-center py-16 px-6">
          <div className="h-14 w-14 rounded-2xl bg-[#e0e7ff] flex items-center justify-center mx-auto mb-4">
            <FileText className="h-7 w-7 text-indigo-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Aún no tienes CVs</h2>
          <p className="text-gray-400 text-sm mb-6">
            Crea tu primer CV profesional con ayuda de la IA.
          </p>
          <Link href="/resumes/new" className={cn(buttonVariants(), "rounded-full")}>
            <Plus className="h-4 w-4 mr-2" /> Crear primer CV
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumes.map((resume) => (
            <div key={resume.id} className="glass rounded-2xl p-5 border border-white/80 group hover:shadow-lg hover:shadow-gray-100 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="h-10 w-10 rounded-xl bg-[#e0e7ff] flex items-center justify-center">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <DeleteResumeButton id={resume.id} />
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{resume.title}</h3>
              <p className="text-xs text-gray-400 mb-4">
                Plantilla: {resume.template} · {formatDate(resume.updatedAt)}
              </p>
              <div className="flex gap-2">
                <Link
                  href={`/resumes/${resume.id}`}
                  className={cn(buttonVariants({ size: "sm" }), "flex-1 justify-center rounded-xl")}
                >
                  Editar
                </Link>
                <Link
                  href={`/resumes/${resume.id}/preview`}
                  className={cn(buttonVariants({ size: "sm", variant: "outline" }), "flex-1 justify-center rounded-xl")}
                >
                  Vista previa
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
