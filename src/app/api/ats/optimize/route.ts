import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { optimizeResume } from "@/lib/openai"
import { z } from "zod"

const schema = z.object({
  analysisId: z.string().optional(),
  resumeText: z.string().min(50),
  jobDescription: z.string().min(50),
  lang: z.enum(["es", "en"]).default("es"),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  })
  const isPro = subscription?.plan === "pro" && subscription.status === "active"

  if (!isPro) {
    return Response.json(
      { error: "AI optimization requires a Pro plan. Upgrade to access this feature." },
      { status: 403 }
    )
  }

  const body = await req.json()
  const { analysisId, resumeText, jobDescription, lang } = schema.parse(body)

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { voiceSamples: true },
  })

  const optimized = await optimizeResume(resumeText, jobDescription, lang, user?.voiceSamples)

  if (analysisId) {
    await prisma.aTSAnalysis.updateMany({
      where: { id: analysisId, userId: session.user.id },
      data: { optimized },
    })
  }

  return Response.json({ optimized })
}
