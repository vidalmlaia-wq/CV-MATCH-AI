import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { generateCoverLetter } from "@/lib/openai"
import { z } from "zod"

const schema = z.object({
  resumeText: z.string().min(50),
  jobDescription: z.string().min(50),
  company: z.string().min(1),
  position: z.string().min(1),
  tone: z.enum(["professional", "enthusiastic", "creative"]).default("professional"),
})

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const letters = await prisma.coverLetter.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
  })

  return Response.json(letters)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  })
  const isPro = subscription?.plan === "pro" && subscription.status === "active"

  if (!isPro) {
    const count = await prisma.coverLetter.count({ where: { userId: session.user.id } })
    if (count >= 2) {
      return Response.json(
        { error: "Free plan limited to 2 cover letters. Upgrade to Pro." },
        { status: 403 }
      )
    }
  }

  const body = await req.json()
  const { resumeText, jobDescription, company, position, tone } = schema.parse(body)

  const content = await generateCoverLetter(resumeText, jobDescription, company, position, tone)

  const letter = await prisma.coverLetter.create({
    data: {
      userId: session.user.id,
      title: `${position} en ${company}`,
      company,
      position,
      content,
    },
  })

  return Response.json(letter, { status: 201 })
}
