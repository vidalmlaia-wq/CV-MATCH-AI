import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const schema = z.object({
  voiceSamples: z.string().max(8000),
})

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { voiceSamples: true },
  })

  return Response.json({ voiceSamples: user?.voiceSamples ?? "" })
}

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { voiceSamples } = schema.parse(body)

  await prisma.user.update({
    where: { id: session.user.id },
    data: { voiceSamples },
  })

  return Response.json({ ok: true })
}
