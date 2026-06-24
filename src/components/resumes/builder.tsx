"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Plus, Trash2, Save, User, Briefcase, GraduationCap, Zap, Languages, ChevronRight, Check } from "lucide-react"

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
    experience: z.array(z.object({
      company: z.string().min(1, "La empresa es obligatoria"),
      position: z.string().min(1, "El puesto es obligatorio"),
      startDate: z.string().min(1),
      endDate: z.string().optional(),
      current: z.boolean().optional(),
      description: z.string().optional(),
    })),
    education: z.array(z.object({
      institution: z.string().min(1),
      degree: z.string().min(1),
      field: z.string().optional(),
      startDate: z.string().min(1),
      endDate: z.string().optional(),
      gpa: z.string().optional(),
    })),
    skills: z.array(z.string()),
    languages: z.array(z.object({ name: z.string(), level: z.string() })),
  }),
})

type FormData = z.input<typeof schema>

const TABS = [
  { id: "personal",    label: "Personal",     icon: User },
  { id: "experience",  label: "Experiencia",  icon: Briefcase },
  { id: "education",   label: "Educación",    icon: GraduationCap },
  { id: "skills",      label: "Habilidades",  icon: Zap },
  { id: "languages",   label: "Idiomas",      icon: Languages },
] as const

type TabId = typeof TABS[number]["id"]

const TEMPLATES = [
  { id: "modern",     label: "Modern",     desc: "Limpio y actual",    accent: "bg-indigo-500" },
  { id: "classic",    label: "Classic",    desc: "Formal y elegante",  accent: "bg-gray-700" },
  { id: "minimalist", label: "Minimalist", desc: "Simple y directo",   accent: "bg-slate-400" },
]

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  )
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 bg-white/70 text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-shadow",
        className
      )}
      {...props}
    />
  )
}

function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 bg-white/70 text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none transition-shadow leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

interface ResumeBuilderProps {
  initialData?: Partial<FormData> & { id?: string }
}

export function ResumeBuilder({ initialData }: ResumeBuilderProps) {
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>("personal")
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

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: "content.experience" })
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: "content.education" })
  const { fields: langFields, append: appendLang, remove: removeLang } = useFieldArray({ control, name: "content.languages" })

  const skills = watch("content.skills") ?? []
  const template = watch("template")

  function addSkill() {
    const trimmed = skillInput.trim()
    if (trimmed && !skills.includes(trimmed)) {
      setValue("content.skills", [...skills, trimmed])
      setSkillInput("")
    }
  }

  function removeSkill(skill: string) {
    setValue("content.skills", skills.filter(s => s !== skill))
  }

  async function onSubmit(data: FormData) {
    setSaving(true)
    try {
      const method = initialData?.id ? "PUT" : "POST"
      const url = initialData?.id ? `/api/resumes/${initialData.id}` : "/api/resumes"
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error((await res.json()).error ?? "Error al guardar")
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

  const currentTabIdx = TABS.findIndex(t => t.id === activeTab)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* Top bar: título + guardar */}
      <div className="glass rounded-2xl border border-white/80 px-5 py-4 flex items-center gap-4">
        <div className="flex-1">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1">Nombre del CV</label>
          <input
            {...register("title")}
            className="w-full text-lg font-bold text-gray-900 bg-transparent focus:outline-none placeholder:text-gray-300 border-b-2 border-transparent focus:border-indigo-300 transition-colors pb-0.5"
            placeholder="Mi CV profesional"
          />
          {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title.message}</p>}
        </div>

        {/* Plantilla */}
        <div className="hidden sm:flex items-center gap-2">
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              type="button"
              onClick={() => setValue("template", t.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl border text-xs font-medium transition-all",
                template === t.id
                  ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                  : "border-gray-200 text-gray-400 hover:border-gray-300"
              )}
            >
              <div className={cn("h-2 w-8 rounded-full", t.accent)} />
              {t.label}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-sm shadow-indigo-200 shrink-0"
        >
          {saving
            ? <><span className="h-3.5 w-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Guardando...</>
            : <><Save className="h-3.5 w-3.5" /> Guardar CV</>
          }
        </button>
      </div>

      {/* Tabs */}
      <div className="glass rounded-2xl border border-white/80 overflow-hidden">
        {/* Tab nav */}
        <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-none">
          {TABS.map((tab, i) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px",
                  activeTab === tab.id
                    ? "border-indigo-600 text-indigo-700 bg-indigo-50/40"
                    : "border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-50/60"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:block">{tab.label}</span>
                <span className="sm:hidden">{i + 1}</span>
              </button>
            )
          })}
        </div>

        {/* Tab content */}
        <div className="p-6">

          {/* ── Personal ── */}
          {activeTab === "personal" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Nombre completo *" error={errors.content?.personalInfo?.fullName?.message}>
                <Input {...register("content.personalInfo.fullName")} placeholder="Ana García López" />
              </Field>
              <Field label="Email *" error={errors.content?.personalInfo?.email?.message}>
                <Input {...register("content.personalInfo.email")} type="email" placeholder="ana@email.com" />
              </Field>
              <Field label="Teléfono">
                <Input {...register("content.personalInfo.phone")} placeholder="+34 600 000 000" />
              </Field>
              <Field label="Ubicación">
                <Input {...register("content.personalInfo.location")} placeholder="Barcelona, España" />
              </Field>
              <Field label="LinkedIn">
                <Input {...register("content.personalInfo.linkedin")} placeholder="linkedin.com/in/tu-perfil" />
              </Field>
              <Field label="Portfolio / Web">
                <Input {...register("content.personalInfo.website")} placeholder="tuportfolio.com" />
              </Field>
              <div className="md:col-span-2">
                <Field label="Resumen profesional">
                  <Textarea
                    {...register("content.personalInfo.summary")}
                    placeholder="Describe tu perfil en 2-3 frases potentes. La IA puede ayudarte a mejorarlo."
                    rows={4}
                  />
                </Field>
              </div>
            </div>
          )}

          {/* ── Experiencia ── */}
          {activeTab === "experience" && (
            <div className="space-y-5">
              {expFields.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                  <Briefcase className="h-8 w-8 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Añade tu experiencia laboral</p>
                </div>
              )}
              {expFields.map((field, i) => (
                <div key={field.id} className="rounded-2xl border border-gray-100 bg-gray-50/40 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Experiencia {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeExp(i)}
                      className="h-7 w-7 rounded-full hover:bg-rose-50 text-gray-300 hover:text-rose-500 flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Empresa *">
                      <Input {...register(`content.experience.${i}.company`)} placeholder="Google, Glovo..." />
                    </Field>
                    <Field label="Puesto *">
                      <Input {...register(`content.experience.${i}.position`)} placeholder="Product Designer" />
                    </Field>
                    <Field label="Fecha inicio">
                      <Input {...register(`content.experience.${i}.startDate`)} placeholder="Ene 2022" />
                    </Field>
                    <Field label="Fecha fin">
                      <Input {...register(`content.experience.${i}.endDate`)} placeholder="Actualidad" />
                    </Field>
                    <div className="md:col-span-2">
                      <Field label="Descripción">
                        <Textarea
                          {...register(`content.experience.${i}.description`)}
                          placeholder="Describe responsabilidades y logros con métricas si es posible..."
                          rows={3}
                        />
                      </Field>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendExp({ company: "", position: "", startDate: "", endDate: "", description: "" })}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30 text-sm text-gray-400 hover:text-indigo-600 font-medium transition-all"
              >
                <Plus className="h-4 w-4" /> Añadir experiencia
              </button>
            </div>
          )}

          {/* ── Educación ── */}
          {activeTab === "education" && (
            <div className="space-y-5">
              {eduFields.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                  <GraduationCap className="h-8 w-8 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Añade tu formación académica</p>
                </div>
              )}
              {eduFields.map((field, i) => (
                <div key={field.id} className="rounded-2xl border border-gray-100 bg-gray-50/40 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Educación {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeEdu(i)}
                      className="h-7 w-7 rounded-full hover:bg-rose-50 text-gray-300 hover:text-rose-500 flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Institución *">
                      <Input {...register(`content.education.${i}.institution`)} placeholder="Universidad de Barcelona" />
                    </Field>
                    <Field label="Título *">
                      <Input {...register(`content.education.${i}.degree`)} placeholder="Grado en Diseño" />
                    </Field>
                    <Field label="Especialidad">
                      <Input {...register(`content.education.${i}.field`)} placeholder="Diseño de Interacción" />
                    </Field>
                    <Field label="Nota media">
                      <Input {...register(`content.education.${i}.gpa`)} placeholder="8.5 / 10" />
                    </Field>
                    <Field label="Año inicio">
                      <Input {...register(`content.education.${i}.startDate`)} placeholder="2018" />
                    </Field>
                    <Field label="Año fin">
                      <Input {...register(`content.education.${i}.endDate`)} placeholder="2022" />
                    </Field>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendEdu({ institution: "", degree: "", startDate: "", endDate: "" })}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30 text-sm text-gray-400 hover:text-indigo-600 font-medium transition-all"
              >
                <Plus className="h-4 w-4" /> Añadir educación
              </button>
            </div>
          )}

          {/* ── Habilidades ── */}
          {activeTab === "skills" && (
            <div className="space-y-5">
              <div className="flex gap-2">
                <input
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  placeholder="Ej: React, Figma, Python, SQL..."
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill() } }}
                  className="flex-1 px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 bg-white/70 text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  Añadir
                </button>
              </div>
              {skills.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Zap className="h-8 w-8 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Escribe una habilidad y pulsa Añadir o Enter</p>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium rounded-full"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-indigo-300 hover:text-indigo-600 transition-colors leading-none"
                    >×</button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── Idiomas ── */}
          {activeTab === "languages" && (
            <div className="space-y-4">
              {langFields.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                  <Languages className="h-8 w-8 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Añade los idiomas que hablas</p>
                </div>
              )}
              {langFields.map((field, i) => (
                <div key={field.id} className="flex items-end gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/40">
                  <div className="flex-1">
                    <Field label="Idioma">
                      <Input {...register(`content.languages.${i}.name`)} placeholder="Español, Inglés..." />
                    </Field>
                  </div>
                  <div className="flex-1">
                    <Field label="Nivel">
                      <Input {...register(`content.languages.${i}.level`)} placeholder="Nativo / C1 / B2..." />
                    </Field>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLang(i)}
                    className="h-10 w-10 rounded-xl hover:bg-rose-50 text-gray-300 hover:text-rose-500 flex items-center justify-center transition-colors shrink-0 mb-0.5"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendLang({ name: "", level: "" })}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30 text-sm text-gray-400 hover:text-indigo-600 font-medium transition-all"
              >
                <Plus className="h-4 w-4" /> Añadir idioma
              </button>
            </div>
          )}

        </div>

        {/* Tab footer navigation */}
        <div className="px-6 pb-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={() => setActiveTab(TABS[Math.max(0, currentTabIdx - 1)].id)}
            disabled={currentTabIdx === 0}
            className="text-sm text-gray-400 hover:text-gray-700 disabled:opacity-0 transition-colors"
          >
            ← Anterior
          </button>
          <div className="flex gap-1.5">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  t.id === activeTab ? "w-6 bg-indigo-600" : "w-1.5 bg-gray-200 hover:bg-gray-300"
                )}
              />
            ))}
          </div>
          {currentTabIdx < TABS.length - 1 ? (
            <button
              type="button"
              onClick={() => setActiveTab(TABS[currentTabIdx + 1].id)}
              className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
            >
              Siguiente <ChevronRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-1.5 rounded-full transition-colors"
            >
              <Check className="h-3.5 w-3.5" /> Guardar
            </button>
          )}
        </div>
      </div>

    </form>
  )
}
