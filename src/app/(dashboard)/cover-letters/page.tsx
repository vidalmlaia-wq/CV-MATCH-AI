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
        <h1 className="text-3xl font-black text-white">Cartas de presentación</h1>
        <p className="text-white/40">Genera cartas personalizadas con IA en segundos.</p>
      </div>

      <CoverLetterGenerator isPro={isPro} />

      {letters.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Cartas guardadas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {letters.map((letter) => (
              <div key={letter.id} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-white">{letter.title}</p>
                    <p className="text-sm text-white/40">
                      {letter.company} · {formatDate(letter.updatedAt)}
                    </p>
                  </div>
                  <Mail className="h-5 w-5 text-pink-400" />
                </div>
                <p className="text-sm text-white/40 line-clamp-3 mb-4">{letter.content}</p>
                <Link
                  href={`/cover-letters/${letter.id}`}
                  className="inline-flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300 transition-colors"
                >
                  <Eye className="h-4 w-4" /> Ver carta
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
