import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { CoverLetterGenerator } from "@/components/cover-letters/generator"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
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
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-1">IA</p>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Cartas de presentación</h1>
        <p className="text-gray-400 text-sm mt-1">Genera cartas personalizadas con IA en segundos.</p>
      </div>

      <CoverLetterGenerator isPro={isPro} />

      {letters.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Cartas guardadas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {letters.map((letter) => (
              <div key={letter.id} className="glass rounded-2xl p-5 border border-white/80">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{letter.title}</p>
                    <p className="text-sm text-gray-400">
                      {letter.company} · {formatDate(letter.updatedAt)}
                    </p>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-[#fce7f3] flex items-center justify-center">
                    <Mail className="h-4 w-4 text-pink-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-400 line-clamp-3 mb-4">{letter.content}</p>
                <Link
                  href={`/cover-letters/${letter.id}`}
                  className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
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
