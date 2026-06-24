import { NextResponse } from "next/server"
import { z } from "zod"

const schema = z.object({
  email: z.string().email(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = schema.parse(body)

    // TODO: connect to Mailchimp / Resend / Brevo
    console.log("New newsletter subscriber:", email)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 })
  }
}
