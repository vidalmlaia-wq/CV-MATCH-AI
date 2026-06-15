import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { formatDate, cn } from "@/lib/utils"
import { CopyButton } from "@/components/cover-letters/copy-button"

type Params = { params: Promise<{ id: string }> }

export default async function CoverLetterDetailPage({ params }: Params) {
  const session = await auth()
  const { id } = await params

  const letter = await prisma.coverLetter.findFirst({
    where: { id, userId: session!.user!.id! },
  })

  if (!letter) notFound()

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/cover-letters"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Volver
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-2xl">{letter.title}</CardTitle>
            <p className="text-muted-foreground text-sm mt-1">
              {letter.company} · {letter.position} · {formatDate(letter.updatedAt)}
            </p>
          </div>
          <CopyButton text={letter.content} />
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap text-sm leading-relaxed font-sans border rounded-lg p-6 bg-muted/30">
            {letter.content}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
