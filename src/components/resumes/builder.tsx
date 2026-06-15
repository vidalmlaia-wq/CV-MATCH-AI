"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Plus, Trash2, Save } from "lucide-react"

const schema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  template: z.string().min(1).default("modern"),
  content: z.object({
    personalInfo: z.object({
      fullName: z.string().min(1, "El nombre es obligatorio"),
      email: z.string().email("Email inválido"),
      phone: z.string().optional(),
      location: z.string().optional(),
      website: z.string().optional(),
      linkedin: z.string().optional(),
      summary: z.string().optional(),
    }),
    experience: z.array(
      z.object({
        company: z.string().min(1, "La empresa es obligatoria"),
        position: z.string().min(1, "El puesto es obligatorio"),
        startDate: z.string().min(1),
        endDate: z.string().optional(),
        current: z.boolean().optional(),
        description: z.string().optional(),
      })
    ),
    education: z.array(
      z.object({
        institution: z.string().min(1),
        degree: z.string().min(1),
        field: z.string().optional(),
        startDate: z.string().min(1),
        endDate: z.string().optional(),
        gpa: z.string().optional(),
      })
    ),
    skills: z.array(z.string()),
    languages: z.array(z.object({ name: z.string(), level: z.string() })),
  }),
})

type FormData = z.input<typeof schema>

interface ResumeBuilderProps {
  initialData?: Partial<FormData> & { id?: string }
}

export function ResumeBuilder({ initialData }: ResumeBuilderProps) {
  const [saving, setSaving] = useState(false)
  const [skillInput, setSkillInput] = useState("")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData ?? {
      title: "Mi CV",
      template: "modern",
      content: {
        personalInfo: { fullName: "", email: "" },
        experience: [],
        education: [],
        skills: [],
        languages: [],
      },
    },
  })

  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({ control, name: "content.experience" })

  const {
    fields: eduFields,
    append: appendEdu,
    remove: removeEdu,
  } = useFieldArray({ control, name: "content.education" })

  const {
    fields: langFields,
    append: appendLang,
    remove: removeLang,
  } = useFieldArray({ control, name: "content.languages" })

  const skills = watch("content.skills") ?? []

  function addSkill() {
    const trimmed = skillInput.trim()
    if (trimmed && !skills.includes(trimmed)) {
      setValue("content.skills", [...skills, trimmed])
      setSkillInput("")
    }
  }

  function removeSkill(skill: string) {
    setValue("content.skills", skills.filter((s) => s !== skill))
  }

  async function onSubmit(data: FormData) {
    setSaving(true)
    try {
      const method = initialData?.id ? "PUT" : "POST"
      const url = initialData?.id ? `/api/resumes/${initialData.id}` : "/api/resumes"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error ?? "Error al guardar")
      }

      const saved = await res.json()
      toast.success("CV guardado correctamente")
      if (!initialData?.id) router.push(`/resumes/${saved.id}`)
      else router.refresh()
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Error al guardar")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Label htmlFor="title">Título del CV</Label>
          <Input id="title" {...register("title")} placeholder="Ej: CV Desarrollador Frontend" />
          {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message}</p>}
        </div>
        <Button type="submit" disabled={saving} className="mt-5">
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Guardando..." : "Guardar CV"}
        </Button>
      </div>

      <Tabs defaultValue="personal">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experiencia</TabsTrigger>
          <TabsTrigger value="education">Educación</TabsTrigger>
          <TabsTrigger value="skills">Habilidades</TabsTrigger>
          <TabsTrigger value="languages">Idiomas</TabsTrigger>
        </TabsList>

        {/* Personal Info */}
        <TabsContent value="personal">
          <Card>
            <CardHeader><CardTitle>Información personal</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Nombre completo *</Label>
                <Input {...register("content.personalInfo.fullName")} placeholder="Ana García López" />
              </div>
              <div>
                <Label>Email *</Label>
                <Input {...register("content.personalInfo.email")} type="email" placeholder="ana@email.com" />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input {...register("content.personalInfo.phone")} placeholder="+34 600 000 000" />
              </div>
              <div>
                <Label>Ubicación</Label>
                <Input {...register("content.personalInfo.location")} placeholder="Madrid, España" />
              </div>
              <div>
                <Label>LinkedIn</Label>
                <Input {...register("content.personalInfo.linkedin")} placeholder="linkedin.com/in/tu-perfil" />
              </div>
              <div>
                <Label>Sitio web / Portfolio</Label>
                <Input {...register("content.personalInfo.website")} placeholder="tuportfolio.com" />
              </div>
              <div className="md:col-span-2">
                <Label>Resumen profesional</Label>
                <Textarea
                  {...register("content.personalInfo.summary")}
                  placeholder="Describe tu perfil profesional en 2-3 frases..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Experience */}
        <TabsContent value="experience" className="space-y-4">
          {expFields.map((field, i) => (
            <Card key={field.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Experiencia {i + 1}</CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExp(i)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Empresa *</Label>
                  <Input {...register(`content.experience.${i}.company`)} placeholder="Empresa S.L." />
                </div>
                <div>
                  <Label>Puesto *</Label>
                  <Input {...register(`content.experience.${i}.position`)} placeholder="Desarrollador Frontend" />
                </div>
                <div>
                  <Label>Fecha inicio</Label>
                  <Input {...register(`content.experience.${i}.startDate`)} placeholder="Ene 2022" />
                </div>
                <div>
                  <Label>Fecha fin</Label>
                  <Input {...register(`content.experience.${i}.endDate`)} placeholder="Actualidad" />
                </div>
                <div className="md:col-span-2">
                  <Label>Descripción</Label>
                  <Textarea
                    {...register(`content.experience.${i}.description`)}
                    placeholder="Describe tus responsabilidades y logros..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() =>
              appendExp({ company: "", position: "", startDate: "", endDate: "", description: "" })
            }
          >
            <Plus className="h-4 w-4 mr-2" /> Añadir experiencia
          </Button>
        </TabsContent>

        {/* Education */}
        <TabsContent value="education" className="space-y-4">
          {eduFields.map((field, i) => (
            <Card key={field.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Educación {i + 1}</CardTitle>
                <Button type="button" variant="ghost" size="icon" onClick={() => removeEdu(i)} className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Institución *</Label>
                  <Input {...register(`content.education.${i}.institution`)} placeholder="Universidad..." />
                </div>
                <div>
                  <Label>Título *</Label>
                  <Input {...register(`content.education.${i}.degree`)} placeholder="Grado en..." />
                </div>
                <div>
                  <Label>Campo de estudio</Label>
                  <Input {...register(`content.education.${i}.field`)} placeholder="Ingeniería Informática" />
                </div>
                <div>
                  <Label>Nota media</Label>
                  <Input {...register(`content.education.${i}.gpa`)} placeholder="8.5 / 10" />
                </div>
                <div>
                  <Label>Año inicio</Label>
                  <Input {...register(`content.education.${i}.startDate`)} placeholder="2018" />
                </div>
                <div>
                  <Label>Año fin</Label>
                  <Input {...register(`content.education.${i}.endDate`)} placeholder="2022" />
                </div>
              </CardContent>
            </Card>
          ))}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => appendEdu({ institution: "", degree: "", startDate: "", endDate: "" })}
          >
            <Plus className="h-4 w-4 mr-2" /> Añadir educación
          </Button>
        </TabsContent>

        {/* Skills */}
        <TabsContent value="skills">
          <Card>
            <CardHeader><CardTitle>Habilidades técnicas</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Ej: React, Python, SQL..."
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill() } }}
                />
                <Button type="button" onClick={addSkill}>Añadir</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
                  >
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="text-muted-foreground hover:text-foreground ml-1">×</button>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Languages */}
        <TabsContent value="languages" className="space-y-4">
          {langFields.map((field, i) => (
            <Card key={field.id}>
              <CardContent className="flex gap-4 pt-6">
                <div className="flex-1">
                  <Label>Idioma</Label>
                  <Input {...register(`content.languages.${i}.name`)} placeholder="Español" />
                </div>
                <div className="flex-1">
                  <Label>Nivel</Label>
                  <Input {...register(`content.languages.${i}.level`)} placeholder="Nativo / C1 / B2..." />
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => removeLang(i)} className="text-destructive mt-5">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => appendLang({ name: "", level: "" })}
          >
            <Plus className="h-4 w-4 mr-2" /> Añadir idioma
          </Button>
        </TabsContent>
      </Tabs>
    </form>
  )
}
