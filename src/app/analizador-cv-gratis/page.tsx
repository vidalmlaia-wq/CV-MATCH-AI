import type { Metadata } from "next"
import { FreeATSAnalyzer } from "./analyzer"

export const metadata: Metadata = {
  title: "Analizador de CV Gratis — Puntúa tu CV para ATS en segundos | CVMatch AI",
  description: "Analiza tu CV gratis sin registrarte. Obtén tu puntuación ATS, palabras clave que faltan y consejos concretos para mejorar tu CV en segundos.",
  alternates: { canonical: "https://cvmatch.ai/analizador-cv-gratis" },
  openGraph: {
    title: "Analizador de CV Gratis — CVMatch AI",
    description: "Sube tu CV y recibe tu puntuación ATS al instante. Gratis, sin registro.",
  },
}

const schema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Analizador de CV Gratis",
  description: "Herramienta gratuita para analizar la compatibilidad de tu CV con sistemas ATS",
  applicationCategory: "BusinessApplication",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
}

export default function AnalizadorCVGratisPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <FreeATSAnalyzer />
    </div>
  )
}
