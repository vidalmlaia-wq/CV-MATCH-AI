import { RoleLanding } from "@/app/_components/landing-role"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CV para Abogado/a: Plantilla ATS | CVMatch AI",
  description: "Crea un CV de abogado optimizado para ATS. Especialidades jurídicas, despachos, métricas y estructura para abogados corporativos, penalistas y mercantilistas.",
  alternates: { canonical: "https://cvmatch.ai/cv-abogado" },
  openGraph: { title: "CV para Abogado/a — CVMatch AI", description: "Guía para el CV de abogado optimizado para ATS." },
}

export default function CVAbogadoPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo hacer un CV de Abogado",
    description: "Guía para crear un CV jurídico optimizado para ATS",
    step: [
      { "@type": "HowToStep", name: "Especifica la rama del derecho", text: "Mercantil, penal, laboral, fiscal, administrativo, internacional" },
      { "@type": "HowToStep", name: "Incluye el tipo de clientes", text: "Corporativo, particulares, PYMES, administraciones" },
    ],
  }

  return (
    <RoleLanding
      role="Derecho"
      headline="CV para Abogado/a que llega a la entrevista"
      subheadline="Los despachos también usan ATS. Guía para estructurar tu CV jurídico, destacar tu especialización y superar el primer filtro automático."
      schema={schema}
      keywords={[
        "Derecho Mercantil", "Derecho Laboral", "Derecho Penal", "Derecho Fiscal",
        "Derecho Administrativo", "Derecho Civil", "Derecho Internacional",
        "Fusiones y adquisiciones", "M&A", "Due Diligence", "Contencioso",
        "Arbitraje", "Mediación", "Compliance", "Protección de datos", "GDPR",
        "Propiedad intelectual", "Startup", "Capital riesgo", "Private Equity",
        "Colegio de Abogados", "ICAM", "ICAB", "Máster de Acceso",
      ]}
      tips={[
        {
          title: "La especialización es tu diferenciador clave",
          desc: "El derecho tiene muchas ramas. Tu CV debe dejar claro en qué eres especialista desde el primer párrafo. Un abogado de M&A corporativo y un abogado laboralista tienen perfiles completamente distintos.",
        },
        {
          title: "Tipo de cliente y tamaño de operaciones",
          desc: "Fortune 500, IBEX35, pymes, startups, particulares, administraciones. El tipo de cliente habla de tu nivel y experiencia. Si has participado en operaciones de gran envergadura, menciona el volumen (sin violar confidencialidad).",
        },
        {
          title: "Idiomas con uso real en práctica jurídica",
          desc: "Para despachos internacionales, el inglés jurídico es imprescindible. No pongas 'inglés avanzado'. Pon 'inglés jurídico: redacción de contratos internacionales, negociación en M&A cross-border, due diligence en inglés'.",
        },
        {
          title: "Publicaciones y conferencias cuentan en academic law",
          desc: "Si aspiras a roles en grandes despachos o posiciones académicas, las publicaciones en revistas jurídicas indexadas y participación en congresos son relevantes. Cítalas correctamente.",
        },
        {
          title: "Herramientas tech-legal son un plus creciente",
          desc: "Thomson Reuters, Aranzadi, CENDOJ, Westlaw, Lexis+, Relativity para e-discovery, herramientas de contract management. Los despachos tech-forward valoran el dominio de estas plataformas.",
        },
        {
          title: "Número de causas o transacciones gestionadas",
          desc: "Si puedes: 'Gestión de cartera de 40-50 asuntos activos simultáneos' o 'Participación en 3 operaciones de M&A de más de 50M€ en 2023'. Los números concretos demuestran capacidad de trabajo.",
        },
      ]}
      faqs={[
        {
          q: "¿Cómo presento mis prácticas en un gran despacho?",
          a: "Con las áreas en las que trabajaste y el tipo de asuntos. 'Prácticas en práctica de M&A de Garrigues: due diligence, research jurídico, apoyo en transacciones cross-border' es mucho mejor que 'prácticas en Garrigues'.",
        },
        {
          q: "¿Menciono la nota del expediente?",
          a: "Sí, si es sobresaliente o si el despacho al que aplicas es muy selectivo. Los grandes despachos internacionales (Linklaters, Clifford, Freshfields) suelen filtrar por nota de carrera y máster.",
        },
        {
          q: "¿Incluyo el máster de acceso?",
          a: "Siempre, es obligatorio para ejercer. Incluye el año de colegiación y el número de colegiado si aplicas a España. Es información que los reclutadores legales esperan ver.",
        },
        {
          q: "¿Cómo compito con candidatos de despachos más prestigiosos?",
          a: "Con especialización y resultados concretos. Un abogado de un despacho mediano que puede articular exactamente qué ha hecho y qué impacto ha tenido suele ganar frente a uno de gran despacho con un CV genérico.",
        },
      ]}
    />
  )
}
