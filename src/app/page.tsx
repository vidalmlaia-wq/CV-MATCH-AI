import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  FileText, Zap, Target, Mail, Download, BarChart3,
  CheckCircle2, ArrowRight, Sparkles, Star, Users,
  TrendingUp, Clock, Shield, ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Crea CVs profesionales, analiza compatibilidad ATS y genera cartas de presentación personalizadas con IA. Más de 10.000 profesionales ya confían en CVMatch AI.",
}

const features = [
  { icon: FileText, title: "Constructor de CV", description: "Plantillas modernas optimizadas para superar los filtros ATS de cualquier empresa.", color: "from-blue-500 to-cyan-400" },
  { icon: Target, title: "Análisis ATS", description: "Puntuación 0-100 y lista exacta de palabras clave que te faltan para cada oferta.", color: "from-violet-500 to-purple-400" },
  { icon: Sparkles, title: "Optimización IA", description: "GPT-4o reescribe tu CV automáticamente para maximizar tu puntuación ATS.", color: "from-pink-500 to-rose-400" },
  { icon: Mail, title: "Cartas personalizadas", description: "Genera cartas de presentación en 30 segundos adaptadas a cada empresa.", color: "from-orange-500 to-amber-400" },
  { icon: Download, title: "Exportación PDF", description: "Descarga tu CV en PDF profesional con un solo clic, sin marcas de agua.", color: "from-green-500 to-emerald-400" },
  { icon: BarChart3, title: "Dashboard", description: "Gestiona todos tus CVs, análisis y cartas desde un panel centralizado.", color: "from-sky-500 to-blue-400" },
]

const steps = [
  { number: "1", title: "Crea tu CV", description: "Rellena el formulario guiado con tu experiencia y habilidades. Listo en minutos." },
  { number: "2", title: "Analiza la oferta", description: "Pega la descripción del puesto y recibe tu puntuación ATS al instante." },
  { number: "3", title: "Aplica con ventaja", description: "Descarga el CV optimizado y una carta personalizada. Destaca entre los candidatos." },
]

const testimonials = [
  { name: "Laura M.", role: "Dev Frontend · Santander", text: "Pasé de 3 meses sin respuestas a 5 entrevistas en 2 semanas. El análisis ATS me abrió los ojos.", rating: 5 },
  { name: "Carlos R.", role: "Product Manager · Glovo", text: "Mi puntuación ATS pasó de 42% a 87% en minutos. Ya tengo oferta firmada.", rating: 5 },
  { name: "Ana G.", role: "Data Scientist · Telefónica", text: "Las cartas de presentación me salvaron. Antes tardaba horas; ahora las genero en 30 segundos.", rating: 5 },
]

const faqs = [
  { q: "¿Necesito experiencia técnica?", a: "No. El constructor está diseñado para cualquier persona. Solo rellenas los campos y nosotros nos encargamos del diseño." },
  { q: "¿Qué es el análisis ATS?", a: "Los sistemas ATS filtran CVs antes de que lleguen a un humano. Analizamos la compatibilidad de tu CV con cada oferta concreta." },
  { q: "¿Cómo funciona la optimización IA?", a: "GPT-4o lee tu CV y la descripción del puesto, luego reescribe tu experiencia para maximizar la puntuación ATS." },
  { q: "¿Puedo cancelar cuando quiera?", a: "Sí, cancelas en cualquier momento desde ajustes. Sin permanencias ni penalizaciones." },
  { q: "¿Mis datos están seguros?", a: "Sí. Datos cifrados, nunca compartidos con terceros. Cumplimos el RGPD." },
]

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CVMatch AI",
    applicationCategory: "BusinessApplication",
    description: "Constructor de CV con inteligencia artificial. Análisis ATS, optimización con GPT-4 y generación de cartas de presentación.",
    operatingSystem: "Web",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "EUR", name: "Plan Gratis" },
      { "@type": "Offer", price: "9", priceCurrency: "EUR", name: "Plan Pro" },
    ],
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1243" },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="flex min-h-screen flex-col bg-white">

        {/* Navbar */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a1a]/95 backdrop-blur">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-xl text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30">
                <Zap className="h-4 w-4 text-white" />
              </div>
              CVMatch <span className="text-violet-400">AI</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              {["#features", "#how-it-works", "#pricing", "#faq"].map((href, i) => (
                <Link key={href} href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                  {["Funcionalidades", "Cómo funciona", "Precios", "FAQ"][i]}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm text-white/70 hover:text-white transition-colors px-3 py-1.5">
                Iniciar sesión
              </Link>
              <Link href="/login" className="text-sm font-medium bg-gradient-to-r from-violet-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/30">
                Empezar gratis
              </Link>
            </div>
          </div>
        </header>

        {/* ─── HERO ─── */}
        <section className="relative bg-[#0a0a1a] overflow-hidden pt-24 pb-32">
          {/* Background blobs */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm px-4 py-1.5 rounded-full mb-8">
                <Sparkles className="h-3.5 w-3.5" />
                Potenciado por GPT-4o · Más de 10.000 usuarios
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight">
                Consigue más{" "}
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-x">
                  entrevistas
                </span>
                <br />con tu CV perfecto
              </h1>

              <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
                Crea CVs profesionales, analiza compatibilidad ATS y genera cartas de presentación personalizadas.{" "}
                <span className="text-white/90">Sin experiencia técnica. En minutos.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
                <Link href="/login" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity shadow-2xl shadow-violet-500/30 text-base">
                  Empezar gratis ahora <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#how-it-works" className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white font-medium px-8 py-4 rounded-xl transition-all text-base">
                  Ver cómo funciona
                </Link>
              </div>

              {/* Trust */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
                {["Sin tarjeta de crédito", "Gratis para siempre", "RGPD compliant", "Cancela cuando quieras"].map(t => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-violet-400" /> {t}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Mock UI ── */}
            <div className="mt-20 max-w-3xl mx-auto animate-float">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-1 shadow-2xl shadow-violet-500/10">
                <div className="bg-[#111128] rounded-xl overflow-hidden">
                  {/* Mock toolbar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500/60" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                      <div className="h-3 w-3 rounded-full bg-green-500/60" />
                    </div>
                    <div className="flex-1 mx-4 bg-white/5 rounded-md h-5 text-xs text-white/30 flex items-center justify-center">
                      cvmatch.ai/ats
                    </div>
                  </div>
                  {/* Mock content */}
                  <div className="p-6 grid md:grid-cols-2 gap-4">
                    {/* Score card */}
                    <div className="bg-white/5 rounded-xl p-5 animate-pulse-glow">
                      <div className="text-white/50 text-xs mb-3 uppercase tracking-wider">Puntuación ATS</div>
                      <div className="flex items-end gap-3 mb-4">
                        <span className="text-6xl font-black text-transparent bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text">87</span>
                        <span className="text-white/40 text-2xl mb-2">%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[87%] bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" />
                      </div>
                      <div className="mt-3 text-xs text-green-400 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> +45 puntos vs versión anterior
                      </div>
                    </div>
                    {/* Keywords */}
                    <div className="space-y-3">
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-white/50 text-xs mb-2 uppercase tracking-wider">Keywords encontradas</div>
                        <div className="flex flex-wrap gap-1.5">
                          {["React", "TypeScript", "Node.js", "API REST"].map(k => (
                            <span key={k} className="text-xs bg-green-500/20 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full">{k}</span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <div className="text-white/50 text-xs mb-2 uppercase tracking-wider">Keywords faltantes</div>
                        <div className="flex flex-wrap gap-1.5">
                          {["Docker", "CI/CD", "AWS"].map(k => (
                            <span key={k} className="text-xs bg-red-500/20 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full">{k}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Suggestion */}
                    <div className="md:col-span-2 bg-violet-500/10 border border-violet-500/20 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Sparkles className="h-4 w-4 text-violet-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-white/80 text-sm font-medium mb-1">Sugerencia IA</div>
                          <div className="text-white/50 text-xs leading-relaxed">
                            Añade "Docker" y "CI/CD" en tu sección de habilidades. Estas tecnologías aparecen en el 80% de ofertas similares.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── STATS ─── */}
        <section className="bg-[#0d0d20] border-y border-white/5 py-14">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "10.000+", label: "Profesionales", icon: Users, color: "text-violet-400" },
                { value: "87%", label: "Más entrevistas", icon: TrendingUp, color: "text-green-400" },
                { value: "2 min", label: "Para crear un CV", icon: Clock, color: "text-sky-400" },
                { value: "4.9/5", label: "Valoración media", icon: Star, color: "text-amber-400" },
              ].map(s => (
                <div key={s.label}>
                  <s.icon className={cn("h-6 w-6 mx-auto mb-2", s.color)} />
                  <div className="text-3xl font-black text-white">{s.value}</div>
                  <div className="text-sm text-white/40 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section id="how-it-works" className="py-28 bg-[#0a0a1a]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs px-3 py-1 rounded-full mb-5 uppercase tracking-wider">
                Proceso
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                De cero a entrevista en 3 pasos
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto">
                Sin complicaciones. Empiezas a aplicar el mismo día.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {steps.map((step, i) => (
                <div key={step.number} className="relative bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/8 hover:border-violet-500/30 transition-all group">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-2xl font-black mb-5 shadow-xl shadow-violet-500/30 group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  {i < 2 && (
                    <ChevronRight className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 h-6 w-6 text-violet-500/40 z-10" />
                  )}
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section id="features" className="py-28 bg-[#0d0d20]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs px-3 py-1 rounded-full mb-5 uppercase tracking-wider">
                Funcionalidades
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Todo lo que necesitas para destacar
              </h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">
                Herramientas impulsadas por IA para cada etapa de tu búsqueda de empleo.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature) => (
                <div key={feature.title} className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500/40 hover:bg-white/8 transition-all">
                  <div className={cn("inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br mb-5 shadow-lg", feature.color)}>
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="py-28 bg-[#0a0a1a]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs px-3 py-1 rounded-full mb-5 uppercase tracking-wider">
                Testimonios
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Ellos ya consiguieron su trabajo
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-all">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">{t.name}</div>
                      <div className="text-white/40 text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section id="pricing" className="py-28 bg-[#0d0d20]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs px-3 py-1 rounded-full mb-5 uppercase tracking-wider">
                Precios
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Precios simples y transparentes
              </h2>
              <p className="text-white/50 text-lg">Empieza gratis. Actualiza cuando lo necesites.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Free */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="text-white/60 text-sm uppercase tracking-wider mb-4">Gratis</div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-black text-white">€0</span>
                  <span className="text-white/40">/siempre</span>
                </div>
                <p className="text-white/40 text-sm mb-8">Perfecto para empezar</p>
                <ul className="space-y-3 mb-8">
                  {["2 CVs guardados", "3 análisis ATS", "2 cartas de presentación", "Exportación PDF"].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/60">
                      <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="flex items-center justify-center w-full bg-white/10 hover:bg-white/15 text-white font-medium py-3 rounded-xl transition-colors border border-white/10">
                  Empezar gratis
                </Link>
              </div>
              {/* Pro */}
              <div className="relative bg-gradient-to-b from-violet-500/20 to-indigo-500/10 border border-violet-500/40 rounded-2xl p-8 shadow-2xl shadow-violet-500/10">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                  MÁS POPULAR
                </div>
                <div className="text-violet-300 text-sm uppercase tracking-wider mb-4">Pro</div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-black text-white">€9</span>
                  <span className="text-white/40">/mes</span>
                </div>
                <p className="text-white/40 text-sm mb-8">Para profesionales activos</p>
                <ul className="space-y-3 mb-8">
                  {["CVs ilimitados", "Análisis ATS ilimitados", "Cartas ilimitadas", "Optimización IA avanzada", "Exportación PDF premium", "Soporte prioritario"].map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/80">
                      <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/login?plan=pro" className="flex items-center justify-center w-full bg-gradient-to-r from-violet-500 to-indigo-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-opacity shadow-lg shadow-violet-500/30">
                  Empezar 7 días gratis
                </Link>
              </div>
            </div>
            <p className="text-center text-sm text-white/30 mt-6">
              Plan Pro incluye 7 días de prueba gratuita · Sin tarjeta de crédito
            </p>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section id="faq" className="py-28 bg-[#0a0a1a]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs px-3 py-1 rounded-full mb-5 uppercase tracking-wider">
                FAQ
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Preguntas frecuentes</h2>
            </div>
            <div className="max-w-2xl mx-auto space-y-3">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-violet-500/30 transition-all">
                  <h3 className="font-semibold text-white mb-2 text-sm">{faq.q}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="py-28 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-5 leading-tight">
              ¿Listo para destacar?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Únete a más de 10.000 profesionales que ya optimizan su búsqueda de empleo con CVMatch AI.
            </p>
            <Link href="/login" className="inline-flex items-center gap-2 bg-white text-violet-700 font-black px-10 py-4 rounded-xl hover:bg-white/90 transition-colors shadow-2xl text-base">
              Empezar gratis <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-white/50 text-sm mt-4">Sin tarjeta de crédito · Gratis para siempre en el plan básico</p>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="bg-[#050510] border-t border-white/5 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
              <div>
                <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white mb-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
                    <Zap className="h-3.5 w-3.5 text-white" />
                  </div>
                  CVMatch <span className="text-violet-400">AI</span>
                </Link>
                <p className="text-sm text-white/30 max-w-xs leading-relaxed">
                  Constructor de CV con inteligencia artificial para profesionales que quieren destacar.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-12 text-sm">
                <div>
                  <div className="font-semibold text-white/60 mb-3 uppercase text-xs tracking-wider">Producto</div>
                  <ul className="space-y-2 text-white/40">
                    {[["#features", "Funcionalidades"], ["#pricing", "Precios"], ["#faq", "FAQ"]].map(([href, label]) => (
                      <li key={href}><Link href={href} className="hover:text-white/80 transition-colors">{label}</Link></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-white/60 mb-3 uppercase text-xs tracking-wider">Legal</div>
                  <ul className="space-y-2 text-white/40">
                    <li><Link href="/privacy" className="hover:text-white/80 transition-colors">Privacidad</Link></li>
                    <li><Link href="/terms" className="hover:text-white/80 transition-colors">Términos</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t border-white/5 pt-6 text-xs text-white/20 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>© {new Date().getFullYear()} CVMatch AI. Todos los derechos reservados.</span>
              <div className="flex items-center gap-1.5">
                <Shield className="h-3 w-3" /> RGPD compliant · Hecho en España
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
