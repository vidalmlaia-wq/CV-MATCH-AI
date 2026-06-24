import { RoleLanding } from "@/app/_components/landing-role"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CV para Enfermero/a: Plantilla y Consejos ATS | CVMatch AI",
  description: "Crea un CV de enfermería optimizado para ATS. Especialidades, competencias clínicas y estructura para enfermeros/as hospitalarios y de atención primaria.",
  alternates: { canonical: "https://cvmatch.ai/cv-enfermero" },
  openGraph: { title: "CV para Enfermero/a — CVMatch AI", description: "Guía para el CV de enfermería optimizado para ATS." },
}

export default function CVEnfermeroPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo hacer un CV de Enfermero/a",
    description: "Guía para crear un CV de enfermería optimizado para ATS",
    step: [
      { "@type": "HowToStep", name: "Especifica la unidad y especialidad", text: "UCI, urgencias, pediatría, oncología — sé específico" },
      { "@type": "HowToStep", name: "Incluye formación continuada", text: "Cursos, acreditaciones, máster en especialidades" },
    ],
  }

  return (
    <RoleLanding
      role="Enfermería"
      headline="CV para Enfermero/a que consigue entrevistas"
      subheadline="Los ATS hospitalarios y de servicios de salud también filtran candidatos. Guía para estructurar tu CV de enfermería y destacar en las oposiciones y convocatorias privadas."
      schema={schema}
      keywords={[
        "Diplomado/a en Enfermería", "Graduado/a en Enfermería",
        "UCI", "Urgencias", "Atención Primaria", "Pediatría", "Oncología",
        "Cardiología", "Geriatría", "Quirófano", "Neonatos",
        "Cuidados paliativos", "Hospitalización", "Consulta externa",
        "RCP", "Soporte vital avanzado", "Cateterismo", "Sondaje",
        "Historia clínica", "SAP", "DIRAYA", "OMI-AP",
        "Vacunación", "Curas", "Triaje", "Dolor crónico",
      ]}
      tips={[
        {
          title: "Especifica la unidad y el tipo de paciente",
          desc: "'Experiencia en urgencias' es genérico. 'Urgencias hospitalarias de nivel III con 300 urgencias/día, triaje Manchester, soporte vital avanzado' es específico y demuestra el nivel de complejidad que manejas.",
        },
        {
          title: "Formación continuada bien detallada",
          desc: "En enfermería, los cursos acreditados cuentan mucho. Lista horas, entidad acreditadora y año: 'Soporte Vital Avanzado — 16h, SEMES, 2024'. Sin esos datos, los cursos no valen nada en una valoración formal.",
        },
        {
          title: "Idiomas con certificado oficial",
          desc: "Para hospitales privados internacionales o posiciones en el extranjero, el inglés con certificado oficial (Cambridge, IELTS) es un diferenciador claro. Los hospitales en zonas turísticas lo valoran especialmente.",
        },
        {
          title: "Oposiciones: adapta el CV al baremo",
          desc: "Para el sistema público, tu CV debe estar organizado siguiendo el baremo de méritos de la convocatoria específica: experiencia, formación, publicaciones. Consulta el baremo antes de estructurarlo.",
        },
        {
          title: "Habilidades técnicas específicas con equipos",
          desc: "Menciona los equipos con los que has trabajado: 'ventilación mecánica invasiva e no invasiva, bombas de infusión, monitores Philips IntelliVue'. La especificidad demuestra experiencia real.",
        },
        {
          title: "Investigación y publicaciones si las tienes",
          desc: "Pósters en congresos, coautoría en papers, participación en protocolos — en entornos universitarios o de referencia, la producción científica añade valor diferencial al perfil.",
        },
      ]}
      faqs={[
        {
          q: "¿CV diferente para pública y privada?",
          a: "Sí. Para la pública, sigue el baremo y sé exhaustivo con acreditaciones y horas. Para la privada, prioriza experiencia relevante, habilidades interpersonales y adaptabilidad. Son audiencias y criterios diferentes.",
        },
        {
          q: "¿Incluyo la nota del expediente académico?",
          a: "Para los primeros años de carrera, sí. Para oposiciones, solo si el baremo lo incluye. Para sector privado con más de 3 años de experiencia, la nota académica pierde peso frente a la experiencia clínica.",
        },
        {
          q: "¿Cómo presento la práctica en residencia?",
          a: "Con unidades y rotaciones específicas, no solo el hospital. 'Rotaciones en UCI pediátrica, urgencias pediátricas y neonatos durante el MIR/EIR' aporta mucho más contexto.",
        },
        {
          q: "¿Pongo referencias de supervisores?",
          a: "Solo si te las piden o si estás seguro de que darán una referencia positiva. 'Referencias disponibles a petición' al final del CV es suficiente y profesional.",
        },
      ]}
    />
  )
}
