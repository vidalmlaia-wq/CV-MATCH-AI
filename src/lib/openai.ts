import OpenAI from "openai"

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function analyzeResumeATS(resumeText: string, jobDescription: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an expert ATS (Applicant Tracking System) analyzer. Analyze resumes against job descriptions and return a JSON response with:
- score: number 0-100 (ATS compatibility score)
- keywords: { found: string[], missing: string[] }
- suggestions: { category: string, issue: string, fix: string }[]
- summary: string`,
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

export async function optimizeResume(resumeText: string, jobDescription: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an expert resume writer. Optimize the resume for the job description, improving ATS compatibility while keeping it authentic. Return only the optimized resume text.",
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
  tone: "professional" | "enthusiastic" | "creative" = "professional"
) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an expert cover letter writer. Write compelling, personalized cover letters that highlight relevant experience. Tone: ${tone}.`,
      },
      {
        role: "user",
        content: `Write a cover letter for the position of ${position} at ${company}.\n\nRESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}`,
      },
    ],
    temperature: 0.7,
  })

  return response.choices[0].message.content!
}
