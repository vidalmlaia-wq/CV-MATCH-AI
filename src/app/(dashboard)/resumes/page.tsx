import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
          <h1 className="text-3xl font-black text-white">Mis CVs</h1>
          <p className="text-white/40">
            {resumes.length} CV{resumes.length !== 1 ? "s" : ""} guardado{resumes.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/resumes/new" className={cn(buttonVariants())}>
          <Plus className="h-4 w-4 mr-2" /> Nuevo CV
        </Link>
      </div>

      {resumes.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <CardTitle className="mb-2">Aún no tienes CVs</CardTitle>
            <CardDescription className="mb-6">
              Crea tu primer CV profesional con ayuda de la IA.
            </CardDescription>
            <Link href="/resumes/new" className={cn(buttonVariants())}>
              <Plus className="h-4 w-4 mr-2" /> Crear primer CV
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resumes.map((resume) => (
            <Card key={resume.id} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DeleteResumeButton id={resume.id} />
                  </div>
                </div>
                <CardTitle className="text-lg">{resume.title}</CardTitle>
                <CardDescription>
                  Plantilla: {resume.template} · Actualizado {formatDate(resume.updatedAt)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Link
                    href={`/resumes/${resume.id}`}
                    className={cn(buttonVariants({ size: "sm" }), "flex-1 justify-center")}
                  >
                    Editar
                  </Link>
                  <Link
                    href={`/resumes/${resume.id}/preview`}
                    className={cn(buttonVariants({ size: "sm", variant: "outline" }), "flex-1 justify-center")}
                  >
                    Vista previa
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
