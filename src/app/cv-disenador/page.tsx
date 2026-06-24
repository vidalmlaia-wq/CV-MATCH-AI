import { RoleLanding } from "@/app/_components/landing-role"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CV para Diseñador: Plantilla y Consejos para Pasar el ATS | CVMatch AI",
  description: "Crea un CV de diseñador optimizado para ATS con las palabras clave correctas. Guía completa con consejos, ejemplos y plantillas para diseñadores UX, UI y de producto.",
  alternates: { canonical: "https://cvmatch.ai/cv-disenador" },
  openGraph: { title: "CV para Diseñador — CVMatch AI", description: "Plantilla y consejos para el CV de diseñador UX/UI optimizado para ATS." },
}

export default function CVDisenadorPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo hacer un CV de Diseñador UX/UI",
    description: "Guía paso a paso para crear un CV de diseñador optimizado para ATS",
    step: [
      { "@type": "HowToStep", name: "Añade las palabras clave correctas", text: "Incluye herramientas como Figma, Sketch y metodologías UX" },
      { "@type": "HowToStep", name: "Destaca tu portfolio", text: "Enlaza tu portfolio en la cabecera del CV" },
      { "@type": "HowToStep", name: "Cuantifica tu impacto", text: "Incluye métricas de conversión, engagement o NPS" },
    ],
  }

  return (
    <RoleLanding
      role="Diseñador"
      headline="CV para Diseñador que pasa el filtro ATS"
      subheadline="Guía completa con palabras clave, estructura y consejos para que tu CV de diseñador llegue a manos del reclutador."
      schema={schema}
      keywords={[
        "Figma", "UX Design", "UI Design", "Sketch", "Adobe XD", "Prototyping",
        "User Research", "Usability Testing", "Design Systems", "Wireframing",
        "A/B Testing", "Accessibility", "WCAG", "Adobe Creative Suite",
        "Component Library", "Interaction Design", "Information Architecture",
        "Design Thinking", "Agile", "Product Design",
      ]}
      tips={[
        {
          title: "Enlaza tu portfolio en la cabecera",
          desc: "Un diseñador sin portfolio visible es invisible. Pon el enlace junto al email y el teléfono, bien visible. Asegúrate de que el enlace funciona antes de enviar.",
        },
        {
          title: "Cuantifica el impacto de tu trabajo",
          desc: "No pongas 'rediseñé el checkout'. Pon 'rediseñé el checkout, aumentando la tasa de conversión un 23% y reduciendo el abandono en un 31%'. Los números hacen tu CV memorable.",
        },
        {
          title: "Menciona las herramientas exactas",
          desc: "Los ATS buscan nombres específicos. Figma, Sketch, Adobe XD, Principle, Framer, Zeplin, Hotjar, Mixpanel. No pongas 'herramientas de diseño'.",
        },
        {
          title: "Incluye metodologías, no solo herramientas",
          desc: "Design Thinking, Double Diamond, Jobs To Be Done, Lean UX. Estos términos aparecen en las ofertas y el ATS los busca.",
        },
        {
          title: "Una sola página si tienes menos de 6 años",
          desc: "El portfolio ya muestra la profundidad de tu trabajo. El CV debe ser la síntesis, no la repetición. Dos páginas máximo para séniors.",
        },
        {
          title: "Adapta el CV al tipo de empresa",
          desc: "Un CV para una startup enfatiza velocidad, autonomía y ownership. Para una consultora, procesos y metodología. Para una corporación, escala e impacto transversal.",
        },
      ]}
      faqs={[
        {
          q: "¿Debo incluir mi portfolio en el CV o enviarlo por separado?",
          a: "Siempre incluye el enlace al portfolio directamente en el CV, en la sección de contacto. No lo envíes como documento adjunto separado — muchos ATS no procesan adjuntos adicionales y los reclutadores pueden no abrirlos.",
        },
        {
          q: "¿Qué formato de CV es mejor para un diseñador?",
          a: "Para el envío por candidatura: PDF con una sola columna para compatibilidad ATS. Si te piden un CV en papel o para una entrevista presencial, puedes usar un diseño más visual. Pero para pasar el filtro automático, prioriza legibilidad sobre creatividad.",
        },
        {
          q: "¿Cuántas habilidades de diseño debo incluir?",
          a: "Incluye todas las relevantes para el puesto, pero sé honesto con el nivel. Es mejor poner 10 habilidades que dominas que 25 donde apareces como principiante. Los reclutadores verifican en la entrevista.",
        },
        {
          q: "¿Cómo presento proyectos académicos si soy junior?",
          a: "Exactamente igual que proyectos reales: nombre del proyecto, tu rol, proceso y resultado. Si el resultado es académico (nota, premio, presentación), indícalo. Un buen proyecto académico con metodología clara vale más que un trabajo freelance sin proceso.",
        },
      ]}
    />
  )
}
