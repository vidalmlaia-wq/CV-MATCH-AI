"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface ResumeData {
  id: string
  title: string
  content: {
    personalInfo: {
      fullName: string
      email: string
      phone?: string
      location?: string
      website?: string
      linkedin?: string
      summary?: string
    }
    experience?: Array<{
      company: string
      position: string
      startDate: string
      endDate?: string
      description?: string
    }>
    education?: Array<{
      institution: string
      degree: string
      field?: string
      startDate: string
      endDate?: string
      gpa?: string
    }>
    skills?: string[]
    languages?: Array<{ name: string; level: string }>
  }
}

export function ResumePreview({ resume }: { resume: { id: string; title: string; content: unknown } }) {
  const data = resume.content as ResumeData["content"]

  async function downloadPDF() {
    const { default: html2canvas } = await import("html2canvas")
    const { default: jsPDF } = await import("jspdf")

    const element = document.getElementById("resume-preview")!
    const canvas = await html2canvas(element, { scale: 2, useCORS: true })
    const imgData = canvas.toDataURL("image/png")

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgProps = pdf.getImageProperties(imgData)
    const imgHeight = (imgProps.height * pageWidth) / imgProps.width

    let position = 0
    pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight)

    if (imgHeight > pageHeight) {
      let remainingHeight = imgHeight - pageHeight
      while (remainingHeight > 0) {
        position -= pageHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight)
        remainingHeight -= pageHeight
      }
    }

    pdf.save(`${resume.title}.pdf`)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end print:hidden">
        <Button onClick={downloadPDF}>
          <Download className="h-4 w-4 mr-2" /> Descargar PDF
        </Button>
      </div>

      <div
        id="resume-preview"
        className="bg-white text-black shadow-lg mx-auto"
        style={{ maxWidth: "794px", minHeight: "1123px", padding: "48px" }}
      >
        {/* Header */}
        <div className="border-b-2 border-slate-800 pb-6 mb-6">
          <h1 className="text-3xl font-bold text-slate-900">{data.personalInfo.fullName}</h1>
          <div className="flex flex-wrap gap-3 mt-2 text-sm text-slate-600">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>· {data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>· {data.personalInfo.location}</span>}
            {data.personalInfo.linkedin && <span>· {data.personalInfo.linkedin}</span>}
            {data.personalInfo.website && <span>· {data.personalInfo.website}</span>}
          </div>
          {data.personalInfo.summary && (
            <p className="mt-4 text-slate-700 leading-relaxed">{data.personalInfo.summary}</p>
          )}
        </div>

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-4">
              Experiencia Profesional
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-slate-900">{exp.position}</p>
                      <p className="text-slate-700">{exp.company}</p>
                    </div>
                    <span className="text-sm text-slate-500 shrink-0">
                      {exp.startDate} – {exp.endDate || "Actualidad"}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-4">
              Educación
            </h2>
            <div className="space-y-3">
              {data.education.map((edu, i) => (
                <div key={i} className="flex justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{edu.degree}{edu.field ? ` en ${edu.field}` : ""}</p>
                    <p className="text-slate-700">{edu.institution}{edu.gpa ? ` · Nota: ${edu.gpa}` : ""}</p>
                  </div>
                  <span className="text-sm text-slate-500 shrink-0">
                    {edu.startDate} – {edu.endDate || ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-4">
              Habilidades
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-4">
              Idiomas
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {data.languages.map((lang, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="font-medium text-slate-900">{lang.name}</span>
                  <span className="text-slate-600">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
