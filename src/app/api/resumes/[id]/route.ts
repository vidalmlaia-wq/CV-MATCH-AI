import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const resume = await prisma.resume.findFirst({
    where: { id, userId: session.user.id },
  })

  if (!resume) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json(resume)
}

export async function PUT(req: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const resume = await prisma.resume.updateMany({
    where: { id, userId: session.user.id },
    data: body,
  })

  if (resume.count === 0) return Response.json({ error: "Not found" }, { status: 404 })
  return Response.json({ success: true })
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  await prisma.resume.deleteMany({ where: { id, userId: session.user.id } })
  return Response.json({ success: true })
}
