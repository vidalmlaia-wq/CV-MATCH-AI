import { RoleLanding } from "@/app/_components/landing-role"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CV para Product Manager: Plantilla y Consejos ATS | CVMatch AI",
  description: "Crea un CV de Product Manager optimizado para ATS. Palabras clave, métricas de producto y estructura para PMs con experiencia.",
  alternates: { canonical: "https://cvmatch.ai/cv-product-manager" },
  openGraph: { title: "CV para Product Manager — CVMatch AI", description: "Guía completa para el CV de Product Manager optimizado para ATS." },
}

export default function CVProductManagerPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo hacer un CV de Product Manager",
    description: "Guía para crear un CV de PM optimizado para ATS",
    step: [
      { "@type": "HowToStep", name: "Incluye métricas de producto", text: "NPS, retención, DAU/MAU, revenue con números reales" },
      { "@type": "HowToStep", name: "Demuestra metodología", text: "OKRs, roadmap, discovery, Agile, stakeholder management" },
    ],
  }

  return (
    <RoleLanding
      role="Product Manager"
      headline="CV para Product Manager que supera el ATS"
      subheadline="Los recruiters de producto buscan métricas, frameworks y ownership. Guía para estructurar tu CV de PM y llegar a la entrevista técnica."
      schema={schema}
      keywords={[
        "Product Manager", "Product Owner", "Roadmap", "OKR", "KPI",
        "Agile", "Scrum", "Kanban", "User Story", "Backlog",
        "Stakeholder Management", "Go-to-Market", "A/B Testing", "Discovery",
        "NPS", "DAU", "MAU", "Churn", "LTV", "CAC", "Conversion Rate",
        "Jira", "Figma", "Amplitude", "Mixpanel", "SQL",
      ]}
      tips={[
        {
          title: "Las métricas de producto son tu moneda",
          desc: "Cada logro debe ir acompañado de una métrica: retención mejorada un X%, NPS subió Y puntos, feature que generó Z€ de revenue. Sin números, las declaraciones son vacías.",
        },
        {
          title: "Muestra el proceso, no solo el resultado",
          desc: "Los mejores PMs describen cómo tomaron decisiones: qué descubrieron en el discovery, cómo priorizaron, qué trade-offs eligieron. Esto diferencia a los buenos PMs de los que solo ejecutan.",
        },
        {
          title: "Incluye el stack de herramientas exacto",
          desc: "Jira, Notion, Figma, Amplitude, Mixpanel, SQL, Productboard, Linear — muchas empresas filtran por herramientas. Menciona las que dominas con ejemplos de uso real.",
        },
        {
          title: "Stakeholder management es una skill técnica",
          desc: "Describe situaciones donde alineaste a ingeniería, diseño, negocio y C-suite. Los PMs que saben comunicar hacia arriba y hacia los lados son más valiosos que los que solo gestionan el backlog.",
        },
        {
          title: "Contexto de la empresa importa",
          desc: "Un PM en startup B2C de 20 personas es diferente de un PM en enterprise B2B de 2000. Explica el tamaño del equipo, el tipo de producto y la etapa de la empresa para que el recruiter entienda tu nivel real.",
        },
        {
          title: "No confundas responsabilidades con logros",
          desc: "'Gestioné el roadmap del producto' es una responsabilidad. 'Rediseñé el proceso de priorización reduciendo el time-to-market en 3 semanas' es un logro. Los CVs de PM deben estar llenos de logros.",
        },
      ]}
      faqs={[
        {
          q: "¿PM o PO en el título del CV?",
          a: "Depende de la oferta. Product Manager es más amplio y estratégico. Product Owner viene del mundo Scrum y suele ser más táctico. Lee la descripción del puesto y usa el título exacto que usan ellos.",
        },
        {
          q: "¿Cuántas páginas debe tener un CV de PM?",
          a: "Una página para menos de 5 años de experiencia. Dos páginas para seniors. Los hiring managers de producto valoran la capacidad de síntesis — un CV de 3 páginas habla mal de tu capacidad para priorizar.",
        },
        {
          q: "¿Incluyo experiencia técnica si vengo de ingeniería?",
          a: "Sí, pero reencuádrada. No como 'programé en Python' sino como 'background técnico que me permite trabajar con ingeniería sin intermediarios, revisar PRs y tomar decisiones de arquitectura informadas'.",
        },
        {
          q: "¿Cómo presento un producto que fracasó?",
          a: "Con honestidad y aprendizaje. 'Lanzamos X, no alcanzamos los objetivos. Lo que aprendí: [insight concreto]. Apliqué ese aprendizaje en Y con resultado Z.' Los fracasos honestos con aprendizaje demuestran madurez.",
        },
      ]}
    />
  )
}
