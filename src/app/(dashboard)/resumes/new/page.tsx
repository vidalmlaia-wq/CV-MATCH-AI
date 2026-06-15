import { ResumeBuilder } from "@/components/resumes/builder"

export default function NewResumePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Crear nuevo CV</h1>
        <p className="text-muted-foreground">Completa la información para generar tu CV profesional.</p>
      </div>
      <ResumeBuilder />
    </div>
  )
}
