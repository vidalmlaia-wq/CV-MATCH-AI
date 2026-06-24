import { RoleLanding } from "@/app/_components/landing-role"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CV sin Experiencia: Cómo Hacerlo y Conseguir tu Primer Trabajo | CVMatch AI",
  description: "Guía completa para hacer un CV sin experiencia laboral que consiga entrevistas. Estructura, consejos y palabras clave para recién graduados y cambios de sector.",
  alternates: { canonical: "https://cvmatch.ai/cv-sin-experiencia" },
  openGraph: { title: "CV sin Experiencia — CVMatch AI", description: "Cómo hacer un CV sin experiencia que consiga entrevistas." },
}

export default function CVSinExperienciaPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo hacer un CV sin experiencia laboral",
    description: "Guía paso a paso para crear un CV sin experiencia que consiga entrevistas",
    step: [
      { "@type": "HowToStep", name: "Empieza con un resumen profesional potente", text: "Resume tus habilidades y objetivos en 3-4 frases" },
      { "@type": "HowToStep", name: "Destaca proyectos y formación", text: "Proyectos académicos, voluntariado y prácticas cuentan" },
      { "@type": "HowToStep", name: "Incluye habilidades técnicas relevantes", text: "Herramientas, software y certificaciones del sector" },
    ],
  }

  return (
    <RoleLanding
      role="primer empleo"
      headline="CV sin experiencia que consigue entrevistas"
      subheadline="No tener experiencia laboral no significa tener un CV vacío. Guía completa para estructurar tu primer CV y destacar frente a otros candidatos."
      schema={schema}
      keywords={[
        "Recién graduado", "Junior", "Prácticas", "Formación universitaria",
        "Proyectos académicos", "Voluntariado", "Trabajo en equipo",
        "Habilidades digitales", "Office 365", "Google Workspace",
        "Inglés", "Comunicación", "Organización", "Resolución de problemas",
        "Proactividad", "Adaptabilidad", "Aprendizaje rápido",
      ]}
      tips={[
        {
          title: "El resumen profesional es tu primer impacto",
          desc: "Sin experiencia larga, el resumen hace el trabajo de convencer. Escribe 3-4 frases que expliquen qué sabes, qué buscas y cuál es tu mayor fortaleza. Sé específico.",
        },
        {
          title: "Proyectos antes que trabajos",
          desc: "Si tienes proyectos académicos, personales o de voluntariado relevantes, ponlos en una sección destacada. Un proyecto con resultados medibles vale más que meses en un trabajo sin logros.",
        },
        {
          title: "Formación con más detalle del habitual",
          desc: "Sin experiencia, la formación cobra peso. No te limites al título y fechas: añade especialización, proyectos de fin de grado, asignaturas clave y reconocimientos académicos.",
        },
        {
          title: "Prácticas, voluntariado y freelance sí cuentan",
          desc: "Todo trabajo con responsabilidades reales cuenta: prácticas de 2 meses, gestión de redes de una ONG, clases particulares, proyectos freelance pequeños. Preséntalo como experiencia real.",
        },
        {
          title: "Habilidades técnicas concretas con nivel",
          desc: "No pongas 'manejo de Office'. Pon 'Excel avanzado (tablas dinámicas, VLOOKUP)' o 'Figma (nivel intermedio, 1 año de uso)'. La especificidad demuestra honestidad y conocimiento real.",
        },
        {
          title: "La carta de presentación es imprescindible",
          desc: "Cuando el CV es más escaso, la carta hace el trabajo pesado. Explica tu motivación real, por qué ese puesto concreto, y qué aportarás. Una carta buena puede compensar un CV sin experiencia.",
        },
      ]}
      faqs={[
        {
          q: "¿Cuánto debe medir un CV sin experiencia?",
          a: "Una página. Sin excepción. Si no tienes suficiente para llenar una página con contenido relevante, es mejor tener media página bien escrita que una página rellena con información irrelevante.",
        },
        {
          q: "¿Incluyo el trabajo de verano o de hostelería si no es del sector?",
          a: "Sí, si demuestra responsabilidades relevantes: trabajo en equipo, atención al cliente, gestión de tiempo bajo presión. Cualquier experiencia que muestre habilidades transferibles tiene valor.",
        },
        {
          q: "¿Debo poner foto?",
          a: "Depende del país y sector. En España es habitual incluirla, pero no es obligatorio. Si la incluyes, que sea profesional: fondo neutro, buena iluminación, ropa apropiada.",
        },
        {
          q: "¿Cómo compito con candidatos con experiencia?",
          a: "Personalizando más. Un CV genérico de alguien con 5 años de experiencia pierde frente a un CV sin experiencia pero perfectamente adaptado a esa oferta. Lee la descripción, usa sus palabras clave exactas y demuestra que entiendes el puesto.",
        },
      ]}
    />
  )
}
