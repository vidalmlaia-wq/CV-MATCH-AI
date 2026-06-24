import { RoleLanding } from "@/app/_components/landing-role"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CV para Contable y Finanzas: Plantilla ATS | CVMatch AI",
  description: "Crea un CV de contabilidad o finanzas optimizado para ATS. Palabras clave, software contable y estructura para contables, controllers y CFOs.",
  alternates: { canonical: "https://cvmatch.ai/cv-contable" },
  openGraph: { title: "CV para Contable y Finanzas — CVMatch AI", description: "Guía para el CV de contabilidad optimizado para ATS." },
}

export default function CVContablePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo hacer un CV de Contabilidad y Finanzas",
    description: "Guía para crear un CV contable optimizado para ATS",
    step: [
      { "@type": "HowToStep", name: "Software contable específico", text: "SAP, Navision, Sage, A3, ContaPlus" },
      { "@type": "HowToStep", name: "Volumen de operaciones", text: "Número de facturas, volumen de cartera, tamaño de empresa" },
    ],
  }

  return (
    <RoleLanding
      role="Finanzas"
      headline="CV para Contable y Finanzas que pasa el ATS"
      subheadline="Los departamentos financieros buscan precisión, software específico y experiencia con volúmenes reales. Guía para estructurar tu CV contable y destacar."
      schema={schema}
      keywords={[
        "Contabilidad general", "Contabilidad analítica", "SAP", "Navision",
        "Sage", "A3", "ContaPlus", "Oracle Financials", "Holded",
        "Balance de situación", "Cuenta de pérdidas y ganancias",
        "Cierre contable", "Consolidación", "NIIF", "PGC", "IFRS",
        "Impuesto de sociedades", "IVA", "IRPF", "Modelo 200", "Modelo 303",
        "Tesorería", "Cash flow", "Financial Controller", "CFO",
        "Excel avanzado", "Power BI", "Auditoría",
      ]}
      tips={[
        {
          title: "Software contable es lo primero que miran",
          desc: "SAP FI, Microsoft Dynamics/Navision, Sage, A3, ContaPlus, Oracle — muchas empresas tienen su ERP y buscan personas que ya lo conocen. Menciona los sistemas con los que has trabajado y el nivel de uso.",
        },
        {
          title: "Volumen de operaciones da contexto",
          desc: "'Contabilización de facturas' no dice nada. 'Gestión de 800 facturas mensuales para empresa con facturación de 15M€' habla de tu capacidad y nivel de exigencia real.",
        },
        {
          title: "Cierres contables: mensual, trimestral, anual",
          desc: "La experiencia con cierres es muy valorada. Especifica si has llevado cierres mensuales completos, consolidaciones de grupos, o si has participado en auditorías externas.",
        },
        {
          title: "Conocimiento fiscal actualizado",
          desc: "Modelos de declaración, cambios normativos recientes, SII (Suministro Inmediato de Información). El fisco cambia constantemente y las empresas valoran profesionales al día.",
        },
        {
          title: "Excel y herramientas de análisis",
          desc: "Excel avanzado (tablas dinámicas, VLOOKUP, Power Query), Power BI, VBA. Los contables que pueden automatizar reporting y crear dashboards tienen mucha más demanda.",
        },
        {
          title: "Distingue entre contabilidad y control de gestión",
          desc: "Contabilidad registra el pasado. Control de gestión analiza y proyecta. Si tienes experiencia en presupuestación, análisis de desviaciones y forecasting, ponlo explícitamente como controlling.",
        },
      ]}
      faqs={[
        {
          q: "¿Qué título pongo: Contable, Controller o Finance Manager?",
          a: "El que mejor describe el puesto al que aplicas. Contable para roles de registro y ciclo completo. Financial Controller para roles de análisis y control. Finance Manager si tienes equipo a cargo.",
        },
        {
          q: "¿Menciono el tamaño de las empresas donde he trabajado?",
          a: "Sí, siempre. Una empresa de 10 personas con un contable general vs. una empresa de 500 con departamento financiero completo son niveles de complejidad completamente diferentes.",
        },
        {
          q: "¿Incluyo el ACCA o CPA si lo tengo?",
          a: "Absolutamente. El ACCA, CPA o CFA son credenciales internacionales muy valoradas, especialmente en multinacionales y empresas con operaciones en varios países.",
        },
        {
          q: "¿Cómo presento experiencia en gestoría o asesoría?",
          a: "Destaca la variedad: tipos de empresas clientes, sectores, volumen de clientes gestionados. 'Gestión contable y fiscal de 50 empresas clientes en sectores retail e industrial' es muy informativo.",
        },
      ]}
    />
  )
}
