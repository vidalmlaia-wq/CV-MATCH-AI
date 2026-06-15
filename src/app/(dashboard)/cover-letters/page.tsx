import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CoverLetterGenerator } from "@/components/cover-letters/generator"
import { Card, CardContent } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { formatDate, cn } from "@/lib/utils"
import { Mail, Eye } from "lucide-react"

export default async function CoverLettersPage() {
  const session = await auth()
  const userId = session!.user!.id!

  const [letters, subscription] = await Promise.all([
    prisma.coverLetter.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.subscription.findUnique({ where: { userId } }),
  ])

  const isPro = subscription?.plan === "pro" && subscription.status === "active"

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Cartas de presentación</h1>
        <p className="text-muted-foreground">Genera cartas personalizadas con IA en segundos.</p>
      </div>

      <CoverLetterGenerator isPro={isPro} />

      {letters.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Cartas guardadas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {letters.map((letter) => (
              <Card key={letter.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">{letter.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {letter.company} · {formatDate(letter.updatedAt)}
                      </p>
                    </div>
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">{letter.content}</p>
                  <Link
                    href={`/cover-letters/${letter.id}`}
                    className={cn(buttonVariants({ size: "sm", variant: "outline" }), "mt-3")}
                  >
                    <Eye className="h-4 w-4 mr-1" /> Ver carta
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
