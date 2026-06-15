import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const resumeSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.object({
    personalInfo: z.object({
      fullName: z.string(),
      email: z.string(),
      phone: z.string().optional(),
      location: z.string().optional(),
      website: z.string().optional(),
      linkedin: z.string().optional(),
      summary: z.string().optional(),
    }),
    experience: z
      .array(
        z.object({
          company: z.string(),
          position: z.string(),
          startDate: z.string(),
          endDate: z.string().optional(),
          current: z.boolean().optional(),
          description: z.string().optional(),
        })
      )
      .optional(),
    education: z
      .array(
        z.object({
          institution: z.string(),
          degree: z.string(),
          field: z.string().optional(),
          startDate: z.string(),
          endDate: z.string().optional(),
          gpa: z.string().optional(),
        })
      )
      .optional(),
    skills: z.array(z.string()).optional(),
    languages: z
      .array(z.object({ name: z.string(), level: z.string() }))
      .optional(),
  }),
  template: z.string().default("modern"),
})

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    select: { id: true, title: true, template: true, createdAt: true, updatedAt: true },
  })

  return Response.json(resumes)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  })
  const isPro = subscription?.plan === "pro" && subscription.status === "active"

  if (!isPro) {
    const count = await prisma.resume.count({ where: { userId: session.user.id } })
    if (count >= 2) {
      return Response.json(
        { error: "Free plan limited to 2 resumes. Upgrade to Pro." },
        { status: 403 }
      )
    }
  }

  const body = await req.json()
  const data = resumeSchema.parse(body)

  const resume = await prisma.resume.create({
    data: { userId: session.user.id, ...data },
  })

  return Response.json(resume, { status: 201 })
}
