import { RoleLanding } from "@/app/_components/landing-role"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CV para Marketing: Plantilla y Consejos ATS | CVMatch AI",
  description: "Crea un CV de marketing optimizado para ATS. Palabras clave, métricas y estructura para especialistas en marketing digital, SEO, SEM y growth.",
  alternates: { canonical: "https://cvmatch.ai/cv-marketing" },
  openGraph: { title: "CV para Marketing — CVMatch AI", description: "Guía completa para el CV de marketing digital optimizado para ATS." },
}

export default function CVMarketingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo hacer un CV de Marketing Digital",
    description: "Guía para crear un CV de marketing optimizado para ATS",
    step: [
      { "@type": "HowToStep", name: "Incluye métricas de campañas", text: "ROAS, CAC, CTR, conversiones con números reales" },
      { "@type": "HowToStep", name: "Menciona herramientas específicas", text: "Google Ads, Meta Ads, HubSpot, Mailchimp, etc." },
    ],
  }

  return (
    <RoleLanding
      role="Marketing"
      headline="CV para Marketing Digital que supera el ATS"
      subheadline="Los reclutadores de marketing buscan métricas, herramientas y resultados. Guía completa para estructurar tu CV y pasar el filtro automático."
      schema={schema}
      keywords={[
        "SEO", "SEM", "Google Ads", "Meta Ads", "Google Analytics 4",
        "Email Marketing", "Marketing Automation", "HubSpot", "Mailchimp",
        "Content Marketing", "CRO", "A/B Testing", "Performance Marketing",
        "ROAS", "CAC", "LTV", "CTR", "Conversion Rate", "Paid Social",
        "Copywriting", "Growth Hacking", "Inbound Marketing", "Salesforce",
      ]}
      tips={[
        {
          title: "Las métricas son tu mejor argumento",
          desc: "En marketing, los números lo son todo. Cada experiencia debería tener al menos una métrica: presupuesto gestionado, ROAS conseguido, leads generados, crecimiento de audiencia, tasa de conversión mejorada.",
        },
        {
          title: "Menciona las herramientas exactas con contexto",
          desc: "No pongas 'gestión de campañas digitales'. Pon 'gestión de campañas en Google Ads (presupuesto 50k€/mes) y Meta Ads (presupuesto 30k€/mes), optimizando hacia ROAS >4'.",
        },
        {
          title: "Diferencia canales de marketing claramente",
          desc: "SEO, SEM, Paid Social, Email, Afiliados, Influencers son canales distintos. Si dominas varios, organízalos claramente. Si eres especialista en uno, profundiza en ese.",
        },
        {
          title: "Adapta según el tipo de empresa",
          desc: "Un ecommerce busca performance y ROAS. Una startup en crecimiento busca growth y CAC. Una corporación busca brand awareness y procesos. El mismo perfil puede presentarse de forma muy diferente.",
        },
        {
          title: "Incluye certificaciones reconocidas",
          desc: "Google Ads Certified, Meta Blueprint, HubSpot Certifications, Google Analytics. Son señales de credibilidad que los ATS y reclutadores valoran.",
        },
        {
          title: "Portfolio de campañas si es posible",
          desc: "Si puedes compartir ejemplos de campañas (respetando la confidencialidad), un enlace a un portfolio o un deck de resultados puede ser tu diferenciador más potente.",
        },
      ]}
      faqs={[
        {
          q: "¿Cómo presento resultados si estaban bajo NDA?",
          a: "Usa porcentajes en lugar de cifras absolutas: 'aumenté el ROAS un 45%' en lugar de 'el ROAS pasó de 2.1 a 3.05'. O menciona la escala sin el cliente: 'gestión de presupuesto mensual de 6 cifras en paid media'.",
        },
        {
          q: "¿Marketing generalista o especialista en el CV?",
          a: "Depende de la oferta. Para startups pequeñas, un perfil generalista (T-shaped marketer) es muy valorado. Para empresas grandes o agencias, la especialización en un canal suele ser preferida.",
        },
        {
          q: "¿Incluyo el blog o newsletter personal?",
          a: "Sí, si es relevante y activo. Un blog de marketing con audiencia real o una newsletter con X suscriptores demuestra que realmente dominas lo que vendes. Un blog con 3 artículos de 2019 es mejor no mencionarlo.",
        },
        {
          q: "¿Cómo presento experiencia en agencia vs. empresa?",
          a: "La agencia demuestra variedad de clientes, agilidad y gestión multitarea. La empresa demuestra profundidad, ownership y visión a largo plazo. Ambas son valiosas — enfatiza lo que busca la empresa a la que aplicas.",
        },
      ]}
    />
  )
}
