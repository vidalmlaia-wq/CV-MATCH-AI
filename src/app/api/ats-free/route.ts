import { NextResponse } from "next/server"
import { z } from "zod"
import OpenAI from "openai"

const schema = z.object({
  cvText: z.string().min(50).max(8000),
  jobText: z.string().min(30).max(4000),
})

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { cvText, jobText } = schema.parse(body)

    const prompt = `Eres un experto en sistemas ATS (Applicant Tracking Systems). Analiza la compatibilidad entre este CV y esta oferta de trabajo.

CV:
${cvText.slice(0, 4000)}

OFERTA:
${jobText.slice(0, 2000)}

Responde SOLO con JSON válido con esta estructura exacta:
{
  "score": <número 0-100>,
  "found": [<lista de hasta 10 keywords del puesto que SÍ aparecen en el CV>],
  "missing": [<lista de hasta 10 keywords importantes del puesto que NO están en el CV>],
  "tips": [<3-4 consejos concretos y accionables para mejorar la puntuación>],
  "verdict": "<una frase corta describiendo el resultado, ej: 'Buen punto de partida, pero le faltan skills técnicas clave'>"
}`

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      response_format: { type: "json_object" },
    })

    const text = response.choices[0].message.content ?? "{}"
    const result = JSON.parse(text)

    return NextResponse.json(result)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 })
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
