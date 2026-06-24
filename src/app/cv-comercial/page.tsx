import { RoleLanding } from "@/app/_components/landing-role"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CV para Comercial y Ventas: Plantilla ATS | CVMatch AI",
  description: "Crea un CV de comercial o vendedor optimizado para ATS. Cuotas, métricas de ventas y estructura para perfiles B2B, B2C y KAM.",
  alternates: { canonical: "https://cvmatch.ai/cv-comercial" },
  openGraph: { title: "CV para Comercial — CVMatch AI", description: "Guía para el CV de ventas y comercial optimizado para ATS." },
}

export default function CVComercialPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo hacer un CV de Comercial o Ventas",
    description: "Guía para crear un CV de ventas optimizado para ATS",
    step: [
      { "@type": "HowToStep", name: "Incluye cuotas y resultados", text: "% de cuota alcanzado, facturación generada, cartera gestionada" },
    ],
  }

  return (
    <RoleLanding
      role="Comercial"
      headline="CV para Comercial y Ventas que genera entrevistas"
      subheadline="En ventas, los números lo son todo. Cómo estructurar tu CV para que las cifras hablen por ti y superes el filtro ATS."
      schema={schema}
      keywords={[
        "B2B", "B2C", "Ventas", "Comercial", "Key Account Manager",
        "Salesforce", "CRM", "Pipeline", "Prospección", "Negociación",
        "Cierre de ventas", "Cuota", "Comisión", "Fidelización",
        "Account Manager", "Business Development", "Cold Calling",
        "LinkedIn Sales Navigator", "Presentación comercial", "Seguimiento",
      ]}
      tips={[
        {
          title: "Las métricas de ventas son tu mejor argumento",
          desc: "Porcentaje de cuota alcanzado, facturación anual, número de cuentas gestionadas, ticket medio, ciclo de venta. Cada puesto que has tenido debe tener al menos dos números reales.",
        },
        {
          title: "Especifica el tipo de venta",
          desc: "B2B o B2C, ciclo largo o corto, enterprise o SMB, inbound o outbound — los recruiters buscan el perfil exacto que necesitan. Describe el tipo de venta que dominás.",
        },
        {
          title: "Incluye el CRM que manejas",
          desc: "Salesforce, HubSpot, Pipedrive, Zoho — muchas empresas filtran por el CRM que usan. Menciona los que has manejado y con qué profundidad.",
        },
        {
          title: "Destaca logros de prospección",
          desc: "Nuevas cuentas abiertas, tasa de conversión de prospección, volumen de pipeline generado. Los comerciales que saben huntar son escasos y muy valorados.",
        },
        {
          title: "El sector que conoces es un plus",
          desc: "Si llevas años vendiendo en tecnología, farmacia, industria o retail, ese conocimiento sectorial es valioso y acorta el tiempo de onboarding. Hazlo explícito.",
        },
        {
          title: "Idiomas con contexto de uso",
          desc: "No pongas 'inglés nivel B2'. Pon 'inglés fluido — gestión de cuentas internacionales en UK y Alemania'. La diferencia entre declarar y demostrar es enorme.",
        },
      ]}
      faqs={[
        {
          q: "¿Pongo la comisión que ganaba?",
          a: "No directamente, pero puedes indicar el volumen de ventas gestionado. 'Responsable de cartera de 2M€ anuales' da contexto sobre tu nivel sin revelar tu compensación.",
        },
        {
          q: "¿Cómo presento un año con cuota baja?",
          a: "Con contexto: 'En un año donde el equipo de 8 personas alcanzó el 72% de cuota, yo llegué al 89%'. O explica circunstancias externas como cambio de territorio o mercado en contracción.",
        },
        {
          q: "¿CV de una o dos páginas?",
          a: "Una página para menos de 8 años de experiencia. Para KAMs o directores comerciales con historial extenso, dos páginas es aceptable si todo el contenido es relevante.",
        },
        {
          q: "¿Incluyo los premios de ventas internos?",
          a: "Sí, si son verificables o aportan contexto. 'Top 3 comercial del año 3 veces consecutivas en empresa de 150 personas' es mucho más impactante que un certificado genérico.",
        },
      ]}
    />
  )
}
