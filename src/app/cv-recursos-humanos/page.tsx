import { RoleLanding } from "@/app/_components/landing-role"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CV para Recursos Humanos: Plantilla ATS | CVMatch AI",
  description: "Crea un CV de RRHH optimizado para ATS. Palabras clave, métricas y estructura para técnicos de RRHH, HR Business Partners y directores de personas.",
  alternates: { canonical: "https://cvmatch.ai/cv-recursos-humanos" },
  openGraph: { title: "CV para Recursos Humanos — CVMatch AI", description: "Guía para el CV de RRHH optimizado para ATS." },
}

export default function CVRecursosHumanosPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo hacer un CV de Recursos Humanos",
    description: "Guía para crear un CV de RRHH optimizado para ATS",
    step: [
      { "@type": "HowToStep", name: "Incluye métricas de RRHH", text: "Time-to-hire, rotación, engagement score, posiciones cubiertas" },
    ],
  }

  return (
    <RoleLanding
      role="Recursos Humanos"
      headline="CV para RRHH que supera el filtro ATS"
      subheadline="Los profesionales de RRHH también necesitan optimizar su CV para ATS. Irónicamente, muchos técnicos de selección tienen CVs mal optimizados. Aquí te enseñamos cómo."
      schema={schema}
      keywords={[
        "Selección de personal", "Reclutamiento", "Talent Acquisition",
        "HR Business Partner", "HRBP", "People & Culture",
        "Workday", "SuccessFactors", "BambooHR", "ATS",
        "Onboarding", "Offboarding", "Performance Management",
        "Employee Engagement", "Employer Branding", "LinkedIn Recruiter",
        "Formación y desarrollo", "Gestión del cambio", "Relaciones laborales",
        "Nóminas", "Convenio colectivo", "GDPR", "Prevención de riesgos",
      ]}
      tips={[
        {
          title: "Métricas de RRHH son obligatorias",
          desc: "Time-to-hire, cost-per-hire, tasa de retención, NPS interno, posiciones cubiertas por año. Los profesionales de RRHH saben mejor que nadie que los datos importan — demuéstralo en tu CV.",
        },
        {
          title: "Diferencia generalista de especialista",
          desc: "Recruitment, learning & development, compensation & benefits, HRBP — son especialidades distintas. Tu CV debe reflejar claramente cuál es tu área principal y qué tipo de empresa buscas.",
        },
        {
          title: "Software de RRHH es diferenciador",
          desc: "Workday, SuccessFactors, BambooHR, Personio, Sage, SAP HR — muchas empresas filtran por el HRIS que usan. Lista los sistemas que has administrado con el nivel de acceso que tenías.",
        },
        {
          title: "Employer branding y redes son cada vez más relevantes",
          desc: "LinkedIn Recruiter, gestión de marca empleadora, presencia en ferias de empleo, estrategia de redes para talent attraction. Si tienes experiencia aquí, es un diferenciador creciente.",
        },
        {
          title: "Legislación laboral actualizada",
          desc: "Reforma laboral, LGTBI, igualdad, teletrabajo — menciona si tienes formación o experiencia en estos ámbitos legales. Las empresas buscan RRHH que navigate el marco legal actual.",
        },
        {
          title: "El soft side también es técnico",
          desc: "Mediación de conflictos, gestión de EREs, entrevistas de salida, programas de bienestar. Los RRHH que saben manejar situaciones difíciles con empatía y criterio son escasos.",
        },
      ]}
      faqs={[
        {
          q: "¿RRHH Generalista o especialista en el CV?",
          a: "Depende de tu trayectoria y del puesto. Para roles de HRBP o Head of People, el perfil generalista con visión estratégica es lo que buscan. Para roles específicos de recruitment o L&D, la especialización es una ventaja.",
        },
        {
          q: "¿Incluyo el número de posiciones que he gestionado?",
          a: "Sí, y con contexto: 'Responsable de la selección de 80 posiciones anuales para una empresa de 500 empleados, con time-to-hire medio de 21 días'. Eso habla de tu capacidad real.",
        },
        {
          q: "¿Cómo presento experiencia en consultoría de selección?",
          a: "Destaca la variedad de clientes, sectores y perfiles gestionados. 'Selección de perfiles tech y fintech para startups en fase seed a Series B' es mucho más específico que 'técnico de selección en consultora'.",
        },
        {
          q: "¿La psicología en el CV es un plus?",
          a: "Sí, especialmente en roles de L&D, bienestar organizacional y assessment centers. Menciona formación específica en psicología organizacional, coaching o evaluación de competencias si la tienes.",
        },
      ]}
    />
  )
}
