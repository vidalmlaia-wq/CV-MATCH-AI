import { auth } from "@/lib/auth"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get("file") as File | null

  if (!file) return Response.json({ error: "No file provided" }, { status: 400 })

  const MAX_MB = 5
  if (file.size > MAX_MB * 1024 * 1024) {
    return Response.json({ error: `File too large. Max ${MAX_MB}MB.` }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const name = file.name.toLowerCase()

  try {
    let text = ""

    if (name.endsWith(".pdf")) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mod = require("pdf-parse")
      const pdfParse = (mod.default ?? mod) as (buf: Buffer) => Promise<{ text: string }>
      const data = await pdfParse(buffer)
      text = data.text
    } else if (name.endsWith(".docx") || name.endsWith(".doc")) {
      const mammoth = await import("mammoth")
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    } else if (name.endsWith(".txt")) {
      text = buffer.toString("utf-8")
    } else {
      return Response.json({ error: "Format not supported. Use PDF, DOCX or TXT." }, { status: 400 })
    }

    text = text.replace(/\n{3,}/g, "\n\n").trim()

    if (text.length < 30) {
      return Response.json({ error: "Could not extract text from file. Try pasting manually." }, { status: 422 })
    }

    return Response.json({ text, chars: text.length })
  } catch (err) {
    console.error("[parse-file] error:", err)
    return Response.json({ error: "Error reading file. Make sure it is not password-protected." }, { status: 500 })
  }
}
