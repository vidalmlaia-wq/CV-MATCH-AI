import Link from "next/link"
import {
  FileText, Zap, Target, Mail, Download, BarChart3,
  CheckCircle2, ArrowRight, Sparkles, Star, Users,
  TrendingUp, Clock, Shield, Mic, Globe, X,
} from "lucide-react"
import type { Metadata } from "next"
import { NewsletterSection } from "@/components/landing/newsletter"
import { ExitIntent } from "@/components/landing/exit-intent"
import { CheckoutButton } from "@/components/stripe/checkout-button"

export const metadata: Metadata = {
  title: "CVMatch AI — Consigue más entrevistas con IA",
  description: "Crea CVs profesionales, analiza compatibilidad ATS y genera cartas de presentación personalizadas con IA. Disponible en español e inglés.",
}

const features = [
  { icon: FileText,  title: "Constructor de CV",       description: "Plantillas modernas optimizadas para superar los filtros ATS de cualquier empresa.",            iconBg: "#e0e7ff", iconColor: "#4338ca" },
  { icon: Target,    title: "Análisis ATS",             description: "Puntuación 0-100 y keywords exactas que te faltan. Análisis paso a paso con sugerencias.",       iconBg: "#fce7f3", iconColor: "#be185d" },
  { icon: Mic,       title: "Tu voz, no la de la IA",  description: "Pega tus textos anteriores y GPT-4o replica tu estilo exacto. Sin frases genéricas de chatbot.", iconBg: "#ede9fe", iconColor: "#6d28d9" },
  { icon: Sparkles,  title: "Optimización automática",  description: "GPT-4o reescribe tu CV para maximizar tu puntuación ATS en cada oferta concreta.",             iconBg: "#fef3c7", iconColor: "#92400e" },
  { icon: Mail,      title: "Cartas en 30 segundos",   description: "Genera cartas de presentación adaptadas a cada empresa y puesto, en español o inglés.",          iconBg: "#d1fae5", iconColor: "#065f46" },
  { icon: Globe,     title: "Español e inglés",        description: "Genera CVs y cartas en el idioma de la oferta. Perfecto para mercados internacionales.",          iconBg: "#e0f2fe", iconColor: "#0369a1" },
]

const steps = [
  { n: "01", title: "Crea tu CV",         body: "Rellena el formulario guiado. Listo en 2 minutos. Sin experiencia técnica." },
  { n: "02", title: "Analiza la oferta",  body: "Pega la descripción del puesto y recibe tu puntuación ATS con sugerencias exactas." },
  { n: "03", title: "Aplica con ventaja", body: "CV optimizado y carta personalizada que suena como tú la escribiste." },
]

const testimonials = [
  { name: "Laura M.",  role: "Dev Frontend · Madrid",    text: "Pasé de 3 meses sin respuestas a 5 entrevistas en 2 semanas. El análisis ATS me abrió los ojos.", color: "from-violet-400 to-indigo-500", initials: "LM" },
  { name: "Carlos R.", role: "Product Manager · Barcelona", text: "Mi puntuación ATS pasó de 42% a 87% en minutos. Lo mejor: las cartas suenan a mí, no a un robot.", color: "from-pink-400 to-rose-500", initials: "CR" },
  { name: "Ana G.",    role: "Data Scientist · Madrid", text: "La función de perfil de voz es diferencial. Pegué dos emails míos y las cartas que genera son increíbles.", color: "from-emerald-400 to-teal-500", initials: "AG" },
]

const faqs = [
  { q: "¿Qué es el perfil de voz?",          a: "Pegas textos que tú hayas escrito — emails, cartas anteriores, tu LinkedIn — y la IA aprende tu forma de escribir. Las cartas generadas suenan a ti, no a ChatGPT." },
  { q: "¿Funciona en inglés?",                a: "Sí. Puedes generar cartas y optimizar CVs en español o inglés según la oferta. Perfecto si aplicas a empresas internacionales." },
  { q: "¿Qué es el análisis ATS?",            a: "Los sistemas ATS filtran CVs antes de que lleguen a un humano. Analizamos la compatibilidad de tu CV con cada oferta y te damos la lista exacta de keywords que te faltan." },
  { q: "¿Cómo funciona la optimización IA?",  a: "GPT-4o lee tu CV y la descripción del puesto, y reescribe tu experiencia para maximizar la puntuación ATS manteniendo tu voz y tono." },
  { q: "¿Puedo cancelar cuando quiera?",       a: "Sí, cancelas en cualquier momento desde ajustes. Sin permanencias ni penalizaciones." },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#faf8ff]">

      {/* ── NAVBAR ── */}
      <header className="sticky top-0 z-50 glass border-b border-white/60">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-[15px] tracking-tight text-gray-900">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            CVMatch AI
          </Link>
          <nav className="hidden md:flex items-center gap-7">
            {[["#features","Funcionalidades"],["#how-it-works","Cómo funciona"],["#pricing","Precios"],["/analizador-cv-gratis","Analizador gratis"],["/historias","Historias"],["/blog","Blog"]].map(([h,l]) => (
              <Link key={h} href={h} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{l}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">Entrar</Link>
            <Link href="/login" className="text-sm font-semibold bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
              Empezar gratis →
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── HERO — fondo aurora ── */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden aurora-bg">

          {/* Blobs con color real */}
          <div className="absolute top-[-100px] left-[-120px] w-[620px] h-[620px] rounded-full opacity-65 animate-blob blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #a78bfa 0%, #7c3aed 40%, transparent 70%)" }} />
          <div className="absolute bottom-[-80px] right-[-100px] w-[520px] h-[520px] rounded-full opacity-50 animate-blob-delay blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #f9a8d4 0%, #ec4899 40%, transparent 70%)" }} />
          <div className="absolute top-[35%] left-[48%] w-[360px] h-[360px] rounded-full opacity-35 animate-blob-delay2 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #6ee7b7 0%, #10b981 40%, transparent 70%)" }} />

          <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full">
            <div className="grid lg:grid-cols-[1fr_480px] gap-16 items-center">

              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm text-gray-600 shadow-sm mb-8 border border-white/80">
                  <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                  Potenciado por GPT-4o · ES / EN
                </div>

                <h1 className="text-[58px] sm:text-[72px] font-black leading-[0.95] tracking-tight mb-6 text-gray-900">
                  Consigue más{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 text-indigo-600">entrevistas</span>
                    <span className="absolute -bottom-1 left-0 right-0 h-3.5 bg-indigo-100 rounded -z-0" />
                  </span>
                  <br />con tu CV perfecto.
                </h1>

                <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-xl">
                  Analiza compatibilidad ATS, optimiza tu CV con IA y genera cartas de presentación
                  que suenan exactamente como las escribirías tú.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  <Link href="/login" className="inline-flex items-center gap-2 bg-gray-900 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-gray-700 transition-all shadow-lg text-sm">
                    Empezar gratis <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/analizador-cv-gratis" className="inline-flex items-center gap-2 glass text-gray-700 font-medium px-6 py-3.5 rounded-full hover:bg-white/80 transition-all text-sm border border-white/80 shadow-sm">
                    Analizar mi CV gratis
                  </Link>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                  {["Sin tarjeta de crédito","Gratis para siempre","RGPD compliant"].map(t => (
                    <span key={t} className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — glass mock */}
              <div className="animate-float hidden lg:block">
                <div className="glass-strong rounded-3xl shadow-2xl shadow-violet-200/50 p-6 space-y-4">

                  {/* Score */}
                  <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #ede9fe 0%, #fce7f3 100%)" }}>
                    <p className="text-xs text-violet-500 uppercase tracking-widest font-semibold mb-1">Puntuación ATS</p>
                    <div className="flex items-end gap-2 mb-3">
                      <span className="text-7xl font-black text-gray-900 leading-none">87</span>
                      <span className="text-2xl text-gray-400 mb-2">%</span>
                      <span className="text-xs text-emerald-600 font-bold mb-3 ml-auto flex items-center gap-1 bg-white/70 px-2 py-1 rounded-full">
                        <TrendingUp className="h-3 w-3" /> +45 pts
                      </span>
                    </div>
                    <div className="h-2.5 bg-white/60 rounded-full overflow-hidden">
                      <div className="h-full w-[87%] rounded-full" style={{ background: "linear-gradient(90deg, #7c3aed, #db2777)" }} />
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-emerald-50 rounded-2xl p-3.5">
                      <p className="text-xs text-emerald-600 font-semibold mb-2">✓ Encontradas</p>
                      <div className="flex flex-wrap gap-1">
                        {["React","TypeScript","Node"].map(k => (
                          <span key={k} className="text-xs bg-white text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-medium">{k}</span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-rose-50 rounded-2xl p-3.5">
                      <p className="text-xs text-rose-500 font-semibold mb-2">✗ Faltantes</p>
                      <div className="flex flex-wrap gap-1">
                        {["Docker","AWS"].map(k => (
                          <span key={k} className="text-xs bg-white text-rose-600 border border-rose-100 px-2 py-0.5 rounded-full font-medium">{k}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Voice pill */}
                  <div className="rounded-2xl p-4 bg-gradient-to-r from-violet-50/80 to-pink-50/80 border border-violet-100">
                    <div className="flex items-start gap-3">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center shrink-0">
                        <Mic className="h-3 w-3 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-0.5">Perfil de voz activo</p>
                        <p className="text-xs text-gray-500">La carta usa tu tono habitual — directa, concisa, sin florituras.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── STATS — fondo blanco ── */}
        <section className="py-14 border-y border-gray-100 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { v: "12.847", l: "CVs analizados esta semana", icon: Users,     color: "text-violet-400" },
                { v: "87%",     l: "Más entrevistas",  icon: TrendingUp, color: "text-pink-400" },
                { v: "2 min",   l: "Para crear un CV", icon: Clock,     color: "text-emerald-400" },
                { v: "4.9/5",   l: "Valoración media", icon: Star,      color: "text-amber-400" },
              ].map(s => (
                <div key={s.l}>
                  <s.icon className={`h-5 w-5 mx-auto mb-2 ${s.color}`} />
                  <div className="text-3xl font-black text-gray-900">{s.v}</div>
                  <div className="text-sm text-gray-400 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VOICE FEATURE — fondo oscuro ── */}
        <section className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)" }}>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-20 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-15 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)" }} />

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-14 items-center">
              <div>
                <p className="text-xs font-semibold text-violet-300 uppercase tracking-widest mb-3">Funcionalidad estrella</p>
                <h2 className="text-4xl font-black text-white tracking-tight mb-5 leading-tight">
                  La IA aprende cómo<br />
                  <span className="text-violet-300">escribes tú.</span>
                </h2>
                <p className="text-indigo-200 leading-relaxed mb-7 text-sm">
                  Pega fragmentos de textos que tú hayas escrito — emails, cartas anteriores, tu LinkedIn.
                  GPT-4o extrae tu vocabulario, ritmo y personalidad, y los replica en todo lo que genera.
                  El resultado no parece IA.
                </p>
                <ul className="space-y-3">
                  {[
                    "Las cartas suenan exactamente como las escribirías tú",
                    "Sin frases genéricas tipo «soy una persona proactiva»",
                    "Funciona en español e inglés",
                    "Se actualiza cada vez que añades más muestras",
                  ].map(t => (
                    <li key={t} className="flex items-center gap-2.5 text-sm text-indigo-200">
                      <CheckCircle2 className="h-4 w-4 text-violet-300 shrink-0" />{t}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="inline-flex items-center gap-2 mt-8 bg-white text-indigo-900 font-semibold px-6 py-3 rounded-full hover:bg-indigo-50 transition-colors text-sm">
                  Configurar mi voz <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Mockup */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-7 w-7 rounded-xl bg-violet-500/30 flex items-center justify-center">
                    <Mic className="h-3.5 w-3.5 text-violet-200" />
                  </div>
                  <span className="text-sm font-bold text-white">Tu voz y estilo</span>
                  <span className="ml-auto text-xs text-violet-300 bg-violet-500/20 border border-violet-500/30 px-2 py-0.5 rounded-full">Nuevo</span>
                </div>
                <div className="bg-white/5 rounded-xl p-3.5 mb-4 border border-white/10">
                  <p className="text-xs text-indigo-200 leading-relaxed">Pega aquí fragmentos de textos que tú hayas escrito — cartas anteriores, emails profesionales, tu CV actual...</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-indigo-300 leading-relaxed h-28 font-mono">
                  Hola, me llamo Laura y llevo 4 años trabajando en React. Me enfocan los proyectos donde el código limpio marca la diferencia...
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-indigo-400">147 / 8.000 caracteres</span>
                  <div className="flex items-center gap-1.5 bg-violet-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    <Mic className="h-3 w-3" /> Guardar voz
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS — aurora suave ── */}
        <section id="how-it-works" className="py-28 relative overflow-hidden aurora-bg">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-25 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }} />
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">Proceso</p>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">De cero a entrevista en 3 pasos</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((s, i) => (
                <div key={s.n} className="glass-strong rounded-3xl p-8 shadow-xl shadow-gray-200/60 border border-white/90">
                  <div className={`text-6xl font-black mb-4 opacity-20 ${["text-violet-400","text-pink-400","text-emerald-400"][i]}`}>{s.n}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES — fondo oscuro ── */}
        <section id="features" className="py-28 relative overflow-hidden" style={{ background: "#0f172a" }}>
          <div className="absolute top-0 left-0 w-[400px] h-[400px] opacity-15 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #6ee7b7 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-15 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)" }} />
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">Funcionalidades</p>
              <h2 className="text-4xl font-black text-white tracking-tight">Todo lo que necesitas para destacar</h2>
              <p className="text-slate-400 mt-3 max-w-xl mx-auto text-sm">Herramientas con IA para cada etapa de tu búsqueda de empleo.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map(f => (
                <div key={f.title} className="group rounded-2xl p-6 border border-white/8 hover:border-white/20 transition-all bg-white/5 hover:bg-white/8 hover:-translate-y-0.5">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl mb-4" style={{ background: f.iconBg }}>
                    <f.icon className="h-5 w-5" style={{ color: f.iconColor }} />
                  </div>
                  <h3 className="font-bold text-white mb-2 text-sm">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS — aurora ── */}
        <section className="py-28 relative overflow-hidden aurora-bg">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-25 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #fbcfe8 0%, transparent 70%)" }} />
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">Testimonios</p>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">Ellas y ellos ya lo consiguieron</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map(t => (
                <div key={t.name} className="glass-strong rounded-3xl p-7 shadow-xl shadow-gray-100/60 border border-white/90">
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(5)].map((_,i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center font-bold text-xs text-white shrink-0`}>{t.initials}</div>
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

        {/* ── PRICING — oscuro ── */}
        <section id="pricing" className="py-28 relative overflow-hidden" style={{ background: "#0f172a" }}>
          <div className="absolute inset-0 opacity-10"
            style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, #7c3aed, transparent)" }} />
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-3">Precios</p>
              <h2 className="text-4xl font-black text-white tracking-tight">Simple y transparente</h2>
              <p className="text-slate-400 mt-3 text-sm">Empieza gratis. Actualiza cuando lo necesites.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 items-stretch">

              {/* Free */}
              <div className="rounded-3xl p-8 border border-white/10 bg-white/5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Gratis</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-5xl font-black text-white">€0</span>
                  <span className="text-slate-400 text-sm">/siempre</span>
                </div>
                <p className="text-sm text-slate-400 mb-7">Perfecto para empezar</p>
                <ul className="space-y-3 mb-8">
                  {["2 CVs guardados","3 análisis ATS","2 cartas de presentación","Perfil de voz","Exportación PDF","ES + EN"].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className="flex items-center justify-center w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3.5 rounded-2xl transition-colors text-sm border border-white/10">
                  Empezar gratis
                </Link>
              </div>

              {/* Pro */}
              <div className="rounded-3xl p-8 border border-violet-500/40 relative" style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(219,39,119,0.10) 100%)" }}>
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap" style={{ background: "linear-gradient(90deg, #7c3aed, #db2777)" }}>
                  MÁS POPULAR
                </div>
                <p className="text-xs font-semibold text-violet-300 uppercase tracking-widest mb-4">Pro</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-5xl font-black text-white">€9</span>
                  <span className="text-slate-400 text-sm">/mes</span>
                </div>
                <p className="text-sm text-slate-400 mb-7">Para profesionales activos</p>
                <ul className="space-y-3 mb-8">
                  {["CVs ilimitados","Análisis ATS ilimitados","Cartas ilimitadas","Perfil de voz avanzado","Optimización IA GPT-4o","Exportación PDF premium","ES + EN","Soporte prioritario"].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-200">
                      <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <CheckoutButton className="flex items-center justify-center gap-2 w-full font-semibold py-3.5 rounded-2xl transition-colors text-sm text-white" style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)" }}>
                  Empezar 7 días gratis
                </CheckoutButton>
              </div>
            </div>
            <p className="text-center text-xs text-slate-500 mt-6">Sin tarjeta de crédito · Cancela cuando quieras</p>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section className="py-28 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">Comparativa</p>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">CVMatch AI vs otras opciones</h2>
              <p className="text-gray-400 mt-3 text-sm max-w-xl mx-auto">Por qué miles de candidatos eligen CVMatch AI frente a las alternativas genéricas.</p>
            </div>
            <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left p-5 text-gray-500 font-medium w-52">Funcionalidad</th>
                    <th className="p-5 text-center">
                      <div className="inline-flex flex-col items-center gap-1">
                        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                          <Zap className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="font-bold text-gray-900 text-xs">CVMatch AI</span>
                      </div>
                    </th>
                    <th className="p-5 text-center text-gray-400 font-medium text-xs">LinkedIn CV</th>
                    <th className="p-5 text-center text-gray-400 font-medium text-xs">Europass</th>
                    <th className="p-5 text-center text-gray-400 font-medium text-xs">Canva</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Análisis ATS con puntuación", true, false, false, false],
                    ["Keywords exactas que faltan", true, false, false, false],
                    ["Cartas de presentación IA", true, "Básico", false, false],
                    ["Perfil de voz personalizado", true, false, false, false],
                    ["Optimización automática CV", true, false, false, false],
                    ["Plantillas modernas", true, "Limitado", false, true],
                    ["ES + EN", true, true, true, true],
                    ["Gratis para empezar", true, true, true, true],
                  ].map(([feature, cvmatch, linkedin, europass, canva], i) => (
                    <tr key={i} className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                      <td className="p-4 text-gray-700 font-medium text-xs">{feature as string}</td>
                      {[cvmatch, linkedin, europass, canva].map((val, j) => (
                        <td key={j} className="p-4 text-center">
                          {val === true ? (
                            <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full mx-auto ${j === 0 ? "bg-indigo-100" : "bg-emerald-50"}`}>
                              <CheckCircle2 className={`h-3.5 w-3.5 ${j === 0 ? "text-indigo-600" : "text-emerald-500"}`} />
                            </span>
                          ) : val === false ? (
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 mx-auto">
                              <X className="h-3.5 w-3.5 text-gray-300" />
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">{val as string}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-xs text-gray-300 mt-4">Comparativa basada en funcionalidades públicas a junio 2025.</p>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <NewsletterSection />

        {/* ── FAQ — aurora ── */}
        <section id="faq" className="py-28 relative overflow-hidden aurora-bg">
          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] opacity-20 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #6ee7b7 0%, transparent 70%)" }} />
          <div className="max-w-2xl mx-auto px-6 relative z-10">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-3">FAQ</p>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">Preguntas frecuentes</h2>
            </div>
            <div className="space-y-3">
              {faqs.map(f => (
                <div key={f.q} className="glass-strong rounded-2xl p-6 border border-white/90">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{f.q}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA — oscuro ── */}
        <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)" }}>
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(167,139,250,0.15) 0%, transparent 70%)" }} />
          <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
              ¿Lista para destacar?
            </h2>
            <p className="text-indigo-200 mb-8 text-sm leading-relaxed">
              Únete a más de 10.000 profesionales. Gratis para siempre en el plan básico.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/login" className="inline-flex items-center gap-2 bg-white text-indigo-900 font-bold px-8 py-4 rounded-full hover:bg-indigo-50 transition-all shadow-xl text-sm">
                Empezar gratis <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/analizador-cv-gratis" className="inline-flex items-center gap-2 bg-white/15 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/25 transition-all text-sm border border-white/30">
                Analizar mi CV gratis
              </Link>
            </div>
            <p className="text-xs text-indigo-300/70 mt-4">Sin tarjeta · Gratis para siempre en el plan básico</p>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-100 bg-white py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 mb-2">
                <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                  <Zap className="h-3 w-3 text-white" />
                </div>
                CVMatch AI
              </Link>
              <p className="text-sm text-gray-400 max-w-xs">Constructor de CV con IA que aprende tu voz. ES / EN.</p>
            </div>
            <div className="flex gap-10 text-sm">
              <div>
                <p className="font-semibold text-gray-900 mb-3 text-xs uppercase tracking-wider">Producto</p>
                <ul className="space-y-2 text-gray-400">
                  {[["#features","Funcionalidades"],["#pricing","Precios"],["#faq","FAQ"],["/analizador-cv-gratis","Analizador gratis"],["/historias","Historias de éxito"],["/referidos","Referidos"]].map(([h,l]) => (
                    <li key={h}><Link href={h} className="hover:text-gray-700 transition-colors">{l}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-3 text-xs uppercase tracking-wider">CV por perfil</p>
                <ul className="space-y-2 text-gray-400">
                  {[["/cv-programador","Programador"],["/cv-disenador","Diseñador"],["/cv-marketing","Marketing"],["/cv-product-manager","Product Manager"],["/cv-data-scientist","Data Scientist"],["/cv-comercial","Comercial"],["/cv-sin-experiencia","Sin experiencia"]].map(([h,l]) => (
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

      <ExitIntent />
    </div>
  )
}
