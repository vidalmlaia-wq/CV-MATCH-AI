import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { analyzeResumeATS } from "@/lib/openai"
import { z } from "zod"

const analyzeSchema = z.object({
  resumeId: z.string().optional(),
  resumeText: z.string().min(50),
  jobTitle: z.string().min(1),
  jobDescription: z.string().min(50),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  })
  const isPro = subscription?.plan === "pro" && subscription.status === "active"

  if (!isPro) {
    const count = await prisma.aTSAnalysis.count({ where: { userId: session.user.id } })
    if (count >= 3) {
      return Response.json(
        { error: "Free plan limited to 3 analyses. Upgrade to Pro." },
        { status: 403 }
      )
    }
  }

  const body = await req.json()
  const { resumeId, resumeText, jobTitle, jobDescription } = analyzeSchema.parse(body)

  const result = await analyzeResumeATS(resumeText, jobDescription)

  const analysis = await prisma.aTSAnalysis.create({
    data: {
      userId: session.user.id,
      resumeId: resumeId ?? null,
      jobTitle,
      jobDesc: jobDescription,
      score: result.score,
      keywords: result.keywords,
      suggestions: result.suggestions,
    },
  })

  return Response.json({ ...result, id: analysis.id })
}
