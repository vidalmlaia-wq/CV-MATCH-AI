import { RoleLanding } from "@/app/_components/landing-role"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CV para Programador: Plantilla y Consejos ATS | CVMatch AI",
  description: "Crea un CV de programador o desarrollador optimizado para ATS. Palabras clave, estructura y consejos para frontend, backend y fullstack.",
  alternates: { canonical: "https://cvmatch.ai/cv-programador" },
  openGraph: { title: "CV para Programador — CVMatch AI", description: "Guía completa para el CV de desarrollador optimizado para ATS." },
}

export default function CVProgramadorPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo hacer un CV de Programador/Desarrollador",
    description: "Guía paso a paso para crear un CV de desarrollador optimizado para ATS",
    step: [
      { "@type": "HowToStep", name: "Lista tus tecnologías con precisión", text: "Especifica lenguajes, frameworks y herramientas con nivel de dominio" },
      { "@type": "HowToStep", name: "Incluye proyectos con GitHub", text: "Enlaza repositorios con proyectos relevantes" },
      { "@type": "HowToStep", name: "Cuantifica el impacto técnico", text: "Incluye métricas de rendimiento, escala y mejoras" },
    ],
  }

  return (
    <RoleLanding
      role="Programador"
      headline="CV para Desarrollador que supera el filtro ATS"
      subheadline="Las empresas tech usan ATS igual que el resto. Guía completa para que tu CV de programador llegue al equipo técnico."
      schema={schema}
      keywords={[
        "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "Go",
        "Next.js", "Vue.js", "Angular", "REST API", "GraphQL", "SQL", "PostgreSQL",
        "MongoDB", "Docker", "Kubernetes", "AWS", "CI/CD", "Git", "Agile", "Scrum",
        "Microservices", "TDD", "Clean Code", "DevOps",
      ]}
      tips={[
        {
          title: "Sección de habilidades técnicas al inicio",
          desc: "Los reclutadores técnicos escanean las tecnologías primero. Pon una sección clara de 'Tech Stack' o 'Habilidades técnicas' cerca de la cabecera, organizada por categorías.",
        },
        {
          title: "GitHub / portfolio técnico visible",
          desc: "Enlaza tu GitHub o portfolio en la cabecera junto al email. Si tienes proyectos relevantes, menciónalos en la experiencia con el enlace al repo.",
        },
        {
          title: "Especifica el nivel en cada tecnología",
          desc: "No pongas una lista de 40 tecnologías sin contexto. Organízalas por nivel (avanzado / intermedio / básico) o por años de uso. La honestidad evita situaciones incómodas en la entrevista técnica.",
        },
        {
          title: "Cuantifica el impacto técnico",
          desc: "Reducción de latencia en X ms, mejora de rendimiento del Y%, manejo de Z peticiones por segundo. Los números técnicos demuestran comprensión real del impacto de tu trabajo.",
        },
        {
          title: "Incluye metodologías y procesos",
          desc: "Agile, Scrum, code reviews, pair programming, TDD, CI/CD. Estas palabras aparecen en casi todas las ofertas tech y el ATS las busca.",
        },
        {
          title: "Proyectos personales cuentan",
          desc: "Un side project bien ejecutado puede compensar falta de experiencia profesional, especialmente para juniors. Explica qué problema resuelve, qué stack usaste y cuántos usuarios tiene si aplica.",
        },
      ]}
      faqs={[
        {
          q: "¿Debo poner todas las tecnologías que conozco?",
          a: "No. Pon las que dominas y las que son relevantes para el puesto. Una lista de 50 tecnologías con nivel básico en muchas genera desconfianza. Prioriza calidad sobre cantidad.",
        },
        {
          q: "¿CV de una o dos páginas para desarrolladores?",
          a: "Una página para juniors y mid (menos de 5 años). Dos páginas para seniors con experiencia extensa. Los equipos técnicos prefieren CVs concisos que demuestran capacidad de síntesis.",
        },
        {
          q: "¿Incluyo la nota de la carrera si es buena?",
          a: "Si tienes menos de 3 años de experiencia y la nota es relevante (por encima de 8/10 o equivalente), sí. Con más experiencia, la nota académica pierde peso frente a los proyectos reales.",
        },
        {
          q: "¿Cómo presento experiencia con tecnologías legacy?",
          a: "Incluye el contexto: 'Mantuve y modernizé una aplicación Java 8 legacy, migrando componentes críticos a Spring Boot 3'. Esto muestra que puedes trabajar con código real, no solo proyectos nuevos.",
        },
      ]}
    />
  )
}
