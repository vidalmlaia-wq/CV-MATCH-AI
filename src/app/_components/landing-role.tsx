import Link from "next/link"
import { ArrowRight, Check, Star } from "lucide-react"

interface RoleLandingProps {
  role: string
  headline: string
  subheadline: string
  keywords: string[]
  tips: { title: string; desc: string }[]
  faqs: { q: string; a: string }[]
  schema: object
}

export function RoleLanding({ role, headline, subheadline, keywords, tips, faqs, schema }: RoleLandingProps) {
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
            <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-1.5 rounded-full transition-colors">
              Crear CV gratis
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">

        {/* Hero */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            CV optimizado para ATS · {role}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            {headline}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">{subheadline}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors shadow-lg shadow-indigo-200 text-sm"
            >
              Crear mi CV ahora <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-xs text-gray-400">Gratis · Sin tarjeta</p>
          </div>
        </div>

        {/* Keywords ATS */}
        <div className="glass rounded-3xl border border-white/80 p-8 md:p-10">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Palabras clave ATS para {role}</h2>
          <p className="text-gray-500 text-sm mb-6">Asegúrate de que estas palabras aparecen en tu CV para pasar los filtros automáticos.</p>
          <div className="flex flex-wrap gap-2">
            {keywords.map(kw => (
              <span key={kw} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
                <Check className="h-3 w-3" /> {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-8">Consejos para el CV de {role}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {tips.map((tip, i) => (
              <div key={i} className="glass rounded-2xl border border-white/80 p-6">
                <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-3">
                  <span className="text-xs font-black text-indigo-600">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <div className="aurora-bg rounded-3xl border border-white/60 p-8 text-center">
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
          </div>
          <p className="text-lg font-semibold text-gray-900 mb-1">"Conseguí 3 entrevistas en una semana"</p>
          <p className="text-gray-500 text-sm">Optimicé mi CV con CVMatch AI y el ATS score pasó de 42% a 89%. Las respuestas llegaron inmediatamente.</p>
          <p className="text-xs text-gray-400 mt-2">— Usuario de CVMatch AI</p>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-8">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="glass rounded-2xl border border-white/80 p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div className="glass rounded-3xl border border-indigo-100 p-8 md:p-12 text-center bg-gradient-to-br from-indigo-50/60 to-violet-50/30">
          <h2 className="text-2xl font-black text-gray-900 mb-3">Crea tu CV de {role} ahora</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">
            Genera un CV optimizado para ATS en minutos, con análisis de compatibilidad y carta de presentación incluida.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow-md shadow-indigo-200"
          >
            Empezar gratis <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </main>
    </div>
  )
}
