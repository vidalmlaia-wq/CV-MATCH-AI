import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ResumeBuilder } from "@/components/resumes/builder"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { Eye, Download } from "lucide-react"
import { cn } from "@/lib/utils"

type Params = { params: Promise<{ id: string }> }

export default async function ResumeEditPage({ params }: Params) {
  const session = await auth()
  const { id } = await params

  const resume = await prisma.resume.findFirst({
    where: { id, userId: session!.user!.id! },
  })

  if (!resume) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{resume.title}</h1>
          <p className="text-muted-foreground">Editar CV</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/resumes/${id}/preview`}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <Eye className="h-4 w-4 mr-2" /> Vista previa
          </Link>
        </div>
      </div>

      <ResumeBuilder
        initialData={{
          id: resume.id,
          title: resume.title,
          template: resume.template,
          content: resume.content as Parameters<typeof ResumeBuilder>[0]["initialData"] extends infer T
            ? T extends { content: infer C }
              ? C
              : never
            : never,
        }}
      />
    </div>
  )
}
