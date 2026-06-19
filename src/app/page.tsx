import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import {
  FileText, Zap, Target, Mail, Download, BarChart3,
  CheckCircle2, ArrowRight, Sparkles, Star, Users,
  TrendingUp, Clock, Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Inicio",
  description: "Crea CVs profesionales, analiza compatibilidad ATS y genera cartas de presentación personalizadas con IA.",
}

const features = [
  { icon: FileText,  title: "Constructor de CV",        description: "Plantillas modernas optimizadas para superar los filtros ATS de cualquier empresa.", accent: "#e0e7ff" },
  { icon: Target,    title: "Análisis ATS",             description: "Puntuación 0-100 y lista exacta de palabras clave que te faltan para cada oferta.", accent: "#fce7f3" },
  { icon: Sparkles,  title: "Optimización con IA",      description: "GPT-4o reescribe tu CV automáticamente para maximizar tu puntuación ATS.", accent: "#d1fae5" },
  { icon: Mail,      title: "Cartas personalizadas",    description: "Genera cartas de presentación en 30 segundos adaptadas a cada empresa.", accent: "#ffe4d6" },
  { icon: Download,  title: "Exportación PDF",          description: "Descarga tu CV en PDF profesional con un solo clic, sin marcas de agua.", accent: "#e0e7ff" },
  { icon: BarChart3, title: "Dashboard completo",       description: "Gestiona todos tus CVs, análisis y cartas desde un panel centralizado.", accent: "#fce7f3" },
]

const steps = [
  { n: "01", title: "Crea tu CV",         body: "Rellena el formulario guiado con tu experiencia y habilidades. Listo en 2 minutos." },
  { n: "02", title: "Analiza la oferta",  body: "Pega la descripción del puesto y recibe tu puntuación ATS al instante." },
  { n: "03", title: "Aplica con ventaja", body: "Descarga el CV optimizado y una carta personalizada. Destaca entre los candidatos." },
]

const testimonials = [
  { name: "Laura M.", role: "Dev Frontend · Santander",      text: "Pasé de 3 meses sin respuestas a 5 entrevistas en 2 semanas. El análisis ATS me abrió los ojos.", initials: "LM", color: "#e0e7ff" },
  { name: "Carlos R.", role: "Product Manager · Glovo",      text: "Mi puntuación ATS pasó de 42% a 87% en minutos. Ya tengo oferta firmada.", initials: "CR", color: "#d1fae5" },
  { name: "Ana G.",   role: "Data Scientist · Telefónica",   text: "Las cartas de presentación me salvaron. Antes tardaba horas, ahora las genero en 30 segundos.", initials: "AG", color: "#fce7f3" },
]

const faqs = [
  { q: "¿Necesito experiencia técnica?", a: "No. El constructor está diseñado para cualquier persona. Solo rellenas los campos y nosotros nos encargamos del diseño." },
  { q: "¿Qué es el análisis ATS?", a: "Los sistemas ATS filtran CVs antes de que lleguen a un humano. Analizamos la compatibilidad de tu CV con cada oferta concreta." },
  { q: "¿Cómo funciona la optimización IA?", a: "GPT-4o lee tu CV y la descripción del puesto, luego reescribe tu experiencia para maximizar la puntuación ATS." },
  { q: "¿Puedo cancelar cuando quiera?", a: "Sí, cancelas en cualquier momento desde ajustes. Sin permanencias ni penalizaciones." },
  { q: "¿Mis datos están seguros?", a: "Sí. Datos cifrados, nunca compartidos con terceros. Cumplimos el RGPD." },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa] overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 glass border-b border-white/60">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-[15px] tracking-tight text-gray-900">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            CVMatch AI
          </Link>
          <nav className="hidden md:flex items-center gap-7">
            {[["#features","Funcionalidades"],["#how-it-works","Cómo funciona"],["#pricing","Precios"],["#faq","FAQ"]].map(([h,l]) => (
              <Link key={h} href={h} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{l}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors px-3 py-1.5">
              Entrar
            </Link>
            <Link href="/login" className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
              Empezar gratis →
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

          {/* Pastel blobs */}
          <div className="absolute top-[-80px] left-[-80px] w-[520px] h-[520px] rounded-full bg-[#ede9fe] opacity-60 animate-blob blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-60px] right-[-60px] w-[440px] h-[440px] rounded-full bg-[#fce7f3] opacity-50 animate-blob-delay blur-3xl pointer-events-none" />
          <div className="absolute top-[40%] left-[55%] w-[320px] h-[320px] rounded-full bg-[#d1fae5] opacity-40 animate-blob-delay2 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

            {/* Left copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-1.5 text-sm text-gray-500 shadow-sm mb-8">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                Potenciado por GPT-4o
              </div>

              <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
                Consigue más{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-indigo-600">entrevistas</span>
                  <span className="absolute -bottom-1 left-0 right-0 h-3 bg-indigo-100 rounded -z-0" />
                </span>
                <br />con tu CV perfecto.
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-lg">
                Crea CVs profesionales, analiza compatibilidad ATS y genera cartas personalizadas en minutos.
                Sin experiencia técnica.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/login" className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3.5 rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 text-sm">
                  Empezar gratis <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#how-it-works" className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-medium px-6 py-3.5 rounded-full hover:border-gray-300 transition-colors text-sm shadow-sm">
                  Ver cómo funciona
                </Link>
              </div>

              <div className="flex flex-wrap gap-5 text-sm text-gray-400">
                {["Sin tarjeta de crédito","Gratis para siempre","RGPD compliant"].map(t => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — glass mock */}
            <div className="animate-float">
              <div className="glass rounded-3xl shadow-2xl shadow-indigo-100/60 p-6 space-y-4">

                {/* Score */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Puntuación ATS</p>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-6xl font-black text-indigo-600 leading-none">87</span>
                    <span className="text-2xl text-gray-300 mb-1">%</span>
                    <span className="text-xs text-emerald-600 font-medium mb-2 flex items-center gap-0.5 ml-auto">
                      <TrendingUp className="h-3 w-3" /> +45 pts
                    </span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div className="h-full w-[87%] bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" />
                  </div>
                </div>

                {/* Keywords */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-emerald-50 rounded-2xl p-4">
                    <p className="text-xs text-emerald-600 font-medium mb-2">Encontradas</p>
                    <div className="flex flex-wrap gap-1">
                      {["React","TypeScript","Node.js"].map(k => (
                        <span key={k} className="text-xs bg-white text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full">{k}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-rose-50 rounded-2xl p-4">
                    <p className="text-xs text-rose-500 font-medium mb-2">Faltantes</p>
                    <div className="flex flex-wrap gap-1">
                      {["Docker","AWS"].map(k => (
                        <span key={k} className="text-xs bg-white text-rose-600 border border-rose-100 px-2 py-0.5 rounded-full">{k}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI tip */}
                <div className="glass-subtle rounded-2xl p-4 border border-indigo-100">
                  <div className="flex items-start gap-3">
                    <div className="h-7 w-7 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                      <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Añade <span className="font-medium text-gray-700">"Docker"</span> y <span className="font-medium text-gray-700">"AWS"</span> en habilidades. Aparecen en el 80 % de ofertas similares.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-12 border-y border-gray-100 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { v:"10.000+", l:"Profesionales",    icon: Users },
                { v:"87%",     l:"Más entrevistas",  icon: TrendingUp },
                { v:"2 min",   l:"Para crear un CV", icon: Clock },
                { v:"4.9/5",   l:"Valoración",       icon: Star },
              ].map(s => (
                <div key={s.l}>
                  <s.icon className="h-5 w-5 text-indigo-400 mx-auto mb-2" />
                  <div className="text-3xl font-black text-gray-900">{s.v}</div>
                  <div className="text-sm text-gray-400 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="py-28 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#ede9fe] opacity-40 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">Proceso</p>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">De cero a entrevista en 3 pasos</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((s, i) => (
                <div key={s.n} className="glass rounded-3xl p-8 shadow-xl shadow-gray-100/80">
                  <div className="text-5xl font-black text-indigo-100 mb-4">{s.n}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="py-28 bg-white relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[380px] h-[380px] bg-[#d1fae5] opacity-40 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">Funcionalidades</p>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">Todo lo que necesitas para destacar</h2>
              <p className="text-gray-400 mt-3 max-w-xl mx-auto">Herramientas con IA para cada etapa de tu búsqueda de empleo.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map(f => (
                <div key={f.title} className="group glass-subtle rounded-3xl p-6 hover:shadow-lg hover:shadow-gray-100 transition-all border border-white/80">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl mb-4" style={{ background: f.accent }}>
                    <f.icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-[#fce7f3] opacity-50 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">Testimonios</p>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">Ellos ya consiguieron su trabajo</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map(t => (
                <div key={t.name} className="glass rounded-3xl p-7 shadow-xl shadow-gray-100/60">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_,i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xs" style={{ background: t.color }}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-gray-900">{t.name}</div>
                      <div className="text-xs text-gray-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="py-28 bg-white relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-[#ede9fe] opacity-40 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">Precios</p>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">Simple y transparente</h2>
              <p className="text-gray-400 mt-3">Empieza gratis. Actualiza cuando lo necesites.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 items-start">

              {/* Free */}
              <div className="glass-subtle rounded-3xl p-8 border border-white/80">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Gratis</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-5xl font-black text-gray-900">€0</span>
                  <span className="text-gray-400 text-sm">/siempre</span>
                </div>
                <p className="text-sm text-gray-400 mb-7">Perfecto para empezar</p>
                <ul className="space-y-3 mb-8">
                  {["2 CVs guardados","3 análisis ATS","2 cartas de presentación","Exportación PDF"].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-2xl transition-colors text-sm">
                  Empezar gratis
                </Link>
              </div>

              {/* Pro */}
              <div className="glass rounded-3xl p-8 border-2 border-indigo-200 shadow-2xl shadow-indigo-100/60 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  MÁS POPULAR
                </div>
                <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-4">Pro</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-5xl font-black text-gray-900">€9</span>
                  <span className="text-gray-400 text-sm">/mes</span>
                </div>
                <p className="text-sm text-gray-400 mb-7">Para profesionales activos</p>
                <ul className="space-y-3 mb-8">
                  {["CVs ilimitados","Análisis ATS ilimitados","Cartas ilimitadas","Optimización IA con GPT-4o","Exportación PDF premium","Soporte prioritario"].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/login?plan=pro" className="flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-2xl transition-colors text-sm shadow-lg shadow-indigo-200">
                  Empezar 7 días gratis
                </Link>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-6">Sin tarjeta de crédito · Cancela cuando quieras</p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-28 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-[#d1fae5] opacity-40 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl mx-auto px-6 relative z-10">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">FAQ</p>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">Preguntas frecuentes</h2>
            </div>
            <div className="space-y-3">
              {faqs.map(f => (
                <div key={f.q} className="glass rounded-2xl p-6 border border-white/80">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{f.q}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 mx-6 mb-10">
          <div className="max-w-4xl mx-auto glass rounded-3xl p-14 text-center border border-white/80 shadow-2xl shadow-gray-100/80 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-[#ede9fe] opacity-60 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-[#fce7f3] opacity-60 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">¿Listo para destacar?</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">Únete a más de 10.000 profesionales que ya consiguen más entrevistas con CVMatch AI.</p>
              <Link href="/login" className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-4 rounded-full hover:bg-indigo-700 transition-colors shadow-xl shadow-indigo-200 text-sm">
                Empezar gratis ahora <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-xs text-gray-400 mt-4">Sin tarjeta · Gratis para siempre en el plan básico</p>
            </div>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-100 bg-white py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900 mb-2">
                <div className="h-6 w-6 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Zap className="h-3 w-3 text-white" />
                </div>
                CVMatch AI
              </Link>
              <p className="text-sm text-gray-400 max-w-xs">Constructor de CV con IA para profesionales que quieren destacar.</p>
            </div>
            <div className="flex gap-16 text-sm">
              <div>
                <p className="font-semibold text-gray-900 mb-3 text-xs uppercase tracking-wider">Producto</p>
                <ul className="space-y-2 text-gray-400">
                  {[["#features","Funcionalidades"],["#pricing","Precios"],["#faq","FAQ"]].map(([h,l]) => (
                    <li key={h}><Link href={h} className="hover:text-gray-700 transition-colors">{l}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-3 text-xs uppercase tracking-wider">Legal</p>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacidad</Link></li>
                  <li><Link href="/terms" className="hover:text-gray-700 transition-colors">Términos</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <span>© {new Date().getFullYear()} CVMatch AI. Todos los derechos reservados.</span>
            <span className="flex items-center gap-1.5"><Shield className="h-3 w-3" /> RGPD compliant · Hecho en España</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
