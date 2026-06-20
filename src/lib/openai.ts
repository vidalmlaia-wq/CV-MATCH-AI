import OpenAI from "openai"

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function analyzeResumeATS(
  resumeText: string,
  jobDescription: string,
  lang: "es" | "en" = "es"
) {
  const langNote = lang === "en"
    ? "Respond with all text fields (summary, category, issue, fix) in English."
    : "Respond with all text fields (summary, category, issue, fix) in Spanish."

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an expert ATS (Applicant Tracking System) analyzer. Analyze resumes against job descriptions and return a JSON response with:
- score: number 0-100 (ATS compatibility score)
- keywords: { found: string[], missing: string[] }
- suggestions: { category: string, issue: string, fix: string }[]
- summary: string (2-3 sentences)
${langNote}`,
      },
      {
        role: "user",
        content: `RESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
  })

  return JSON.parse(response.choices[0].message.content!)
}

export async function optimizeResume(
  resumeText: string,
  jobDescription: string,
  lang: "es" | "en" = "es",
  voiceSamples?: string | null
) {
  const voiceInstruction = voiceSamples?.trim()
    ? `\n\nVOICE MATCHING: Mirror the vocabulary, style, and personality from these writing samples — keep the result sounding human and authentic:\n${voiceSamples}`
    : ""

  const langNote = lang === "en"
    ? "Write the optimized resume in English."
    : "Escribe el CV optimizado en español."

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an expert resume writer. Optimize the resume for the job description, improving ATS compatibility while keeping it authentic. Return only the optimized resume text. ${langNote}${voiceInstruction}`,
      },
      {
        role: "user",
        content: `ORIGINAL RESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}\n\nPlease optimize this resume for ATS compatibility and the specific job requirements.`,
      },
    ],
    temperature: 0.5,
  })

  return response.choices[0].message.content!
}

export async function generateCoverLetter(
  resumeText: string,
  jobDescription: string,
  company: string,
  position: string,
  tone: "professional" | "enthusiastic" | "creative" = "professional",
  lang: "es" | "en" = "es",
  voiceSamples?: string | null
) {
  const voiceInstruction = voiceSamples?.trim()
    ? `\n\nIMPORTANT — VOICE MATCHING: The user has provided writing samples below. Study them carefully: vocabulary, sentence length, level of formality, use of punctuation, personality, and rhythm. Mirror this exact voice in the cover letter so it sounds unmistakably like the user wrote it themselves — not like AI.\n\nUSER'S WRITING SAMPLES:\n${voiceSamples}`
    : ""

  const langNote = lang === "en"
    ? "Write the cover letter in English."
    : "Escribe la carta de presentación en español."

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an expert cover letter writer. Write compelling, personalized cover letters that highlight relevant experience. Tone: ${tone}. ${langNote}${voiceInstruction}`,
      },
      {
        role: "user",
        content: `Write a cover letter for the position of ${position} at ${company}.\n\nRESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}`,
      },
    ],
    temperature: 0.75,
  })

  return response.choices[0].message.content!
}
