import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ResumePreview } from "@/components/resumes/preview"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

type Params = { params: Promise<{ id: string }> }

export default async function PreviewPage({ params }: Params) {
  const session = await auth()
  const { id } = await params

  const resume = await prisma.resume.findFirst({
    where: { id, userId: session!.user!.id! },
  })

  if (!resume) notFound()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 print:hidden">
        <Link
          href={`/resumes/${id}`}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Editar
        </Link>
      </div>
      <ResumePreview resume={resume} />
    </div>
  )
}
