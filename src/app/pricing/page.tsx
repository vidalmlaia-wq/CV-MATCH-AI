import Link from "next/link"
import { Check, Zap, ArrowRight, Star } from "lucide-react"
import type { Metadata } from "next"
import { CheckoutButton } from "@/components/stripe/checkout-button"

export const metadata: Metadata = {
  title: "Precios — CVMatch AI | Gratis o Pro desde €9/mes",
  description: "Plan gratuito para empezar y plan Pro para usuarios serios. CVs ilimitados, análisis ATS ilimitado y cartas de presentación con IA por €9/mes.",
  alternates: { canonical: "https://cvmatch.ai/pricing" },
  openGraph: { title: "Precios — CVMatch AI", description: "Plan gratuito y Pro desde €9/mes. Sin compromisos." },
}

const FREE_FEATURES = [
  "2 CVs",
  "5 análisis ATS",
  "2 cartas de presentación",
  "Perfil de voz básico",
  "ES / EN",
]

const PRO_FEATURES = [
  "CVs ilimitados",
  "Análisis ATS ilimitados",
  "Cartas ilimitadas",
  "Perfil de voz avanzado",
  "Optimización CV con GPT-4o",
  "Descarga en PDF",
  "Soporte prioritario",
  "ES / EN",
]

const schema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "CVMatch AI Pro",
  description: "Plan Pro de CVMatch AI para CVs ilimitados, análisis ATS y cartas de presentación con IA",
  offers: [
    {
      "@type": "Offer",
      name: "Plan Gratuito",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Plan Pro",
      price: "9",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "9", priceCurrency: "EUR", billingIncrement: 1, unitCode: "MON" },
    },
  ],
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Nav */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 text-sm">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs font-black">CV</span>
            </div>
            CVMatch AI
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/blog" className="text-gray-500 hover:text-gray-900 transition-colors">Blog</Link>
            <Link href="/login" className="text-gray-500 hover:text-gray-900 transition-colors">Entrar</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-16">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Precios simples y sin sorpresas
          </h1>
          <p className="text-xl text-gray-500">Empieza gratis. Actualiza cuando lo necesites.</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">

          {/* Free */}
          <div className="glass rounded-3xl border border-white/80 p-8 flex flex-col">
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Gratuito</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-black text-gray-900">€0</span>
                <span className="text-gray-400 mb-2">/mes</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">Para probar y empezar.</p>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {FREE_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-gray-500" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/login"
              className="w-full inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 rounded-2xl transition-colors"
            >
              Empezar gratis
            </Link>
          </div>

          {/* Pro */}
          <div className="relative rounded-3xl p-8 flex flex-col overflow-hidden" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #be185d)" }}>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 20%, #fff 0%, transparent 60%)" }} />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm font-semibold text-indigo-200 uppercase tracking-wide mb-1">Pro</p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black text-white">€9</span>
                    <span className="text-indigo-200 mb-2">/mes</span>
                  </div>
                  <p className="text-sm text-indigo-200 mt-2">Para tomarte la búsqueda en serio.</p>
                </div>
                <div className="h-10 w-10 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
              </div>
              <ul className="space-y-3 flex-1 mb-8">
                {PRO_FEATURES.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white">
                    <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <CheckoutButton className="w-full inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-bold py-3 rounded-2xl hover:bg-indigo-50 transition-colors">
                Empezar con Pro <ArrowRight className="h-4 w-4" />
              </CheckoutButton>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { text: "En 3 días de usar Pro tuve 2 entrevistas. El análisis ATS me cambió cómo envío candidaturas.", name: "María G.", role: "Diseñadora UX" },
            { text: "Las cartas de presentación son increíbles. Suenan exactamente como yo pero mucho mejor escritas.", name: "Carlos M.", role: "Desarrollador Frontend" },
            { text: "El perfil de voz es lo que más me ha sorprendido. La IA realmente aprende cómo escribes.", name: "Laura P.", role: "Product Manager" },
          ].map((t, i) => (
            <div key={i} className="glass rounded-2xl border border-white/80 p-5">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">"{t.text}"</p>
              <div>
                <p className="text-xs font-semibold text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-black text-gray-900 text-center mb-8">Preguntas frecuentes</h2>
          {[
            { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Sin permanencia ni penalizaciones. Cancelas cuando quieras desde tu panel de usuario." },
            { q: "¿Qué pasa con mis datos si cancelo?", a: "Tus CVs y cartas guardadas siguen accesibles en modo gratuito (con los límites del plan gratuito). No borramos nada." },
            { q: "¿Hay descuento anual?", a: "Próximamente. Si te interesa un plan anual con descuento, escríbenos y te avisamos cuando esté disponible." },
            { q: "¿La IA usa GPT-4?", a: "Sí, usamos GPT-4o de OpenAI tanto en el plan gratuito (limitado) como en Pro (sin límite). La calidad del output es igual — la diferencia es el número de usos." },
          ].map((faq, i) => (
            <div key={i} className="glass rounded-2xl border border-white/80 p-5">
              <h3 className="font-bold text-gray-900 mb-1.5 text-sm">{faq.q}</h3>
              <p className="text-sm text-gray-500">{faq.a}</p>
            </div>
          ))}
        </div>

      </main>
    </div>
  )
}
