import Link from "next/link"
import { ArrowRight, Quote, TrendingUp, Zap, Star } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Historias de Éxito — Profesionales que consiguieron trabajo con CVMatch AI",
  description: "Casos reales de profesionales que mejoraron su CV con IA y consiguieron entrevistas y ofertas. Lee sus historias y empieza la tuya.",
  alternates: { canonical: "https://cvmatch.ai/historias" },
}

const stories = [
  {
    name: "Laura Martínez",
    role: "Desarrolladora Frontend",
    company: "Banco Santander",
    location: "Madrid",
    avatar: "LM",
    color: "from-violet-400 to-indigo-500",
    timeToInterview: "11 días",
    atsImprovement: "+45 pts",
    quote: "Llevaba 3 meses enviando CVs sin respuesta. Empecé a usar CVMatch AI casi sin esperanza. El análisis ATS me mostró que mi CV tenía un 34% de compatibilidad con las ofertas que aplicaba. En 20 minutos añadí las keywords que faltaban y reescribí dos puntos clave de mi experiencia. A los 11 días tenía 5 entrevistas.",
    detail: "El perfil de voz fue lo que cambió las cartas de presentación. Antes las escribía yo y tardaba 45 minutos. Ahora las genero en 2 minutos y suenan exactamente como yo, pero mucho más claras.",
    result: "Oferta recibida · Subida salarial del 28%",
  },
  {
    name: "Carlos Ruiz",
    role: "Product Manager",
    company: "Glovo",
    location: "Barcelona",
    avatar: "CR",
    color: "from-pink-400 to-rose-500",
    timeToInterview: "8 días",
    atsImprovement: "+53 pts",
    quote: "Como PM sabía que los ATS eran un problema pero no cuánto. Mi puntuación inicial era 34%. Me faltaban términos como 'OKR', 'roadmap', 'stakeholder management' que usaba en el día a día pero no había puesto literalmente en el CV. La diferencia entre escribir 'gestión de objetivos' y 'OKR framework' es enorme para un ATS.",
    detail: "Lo que más me sorprendió fue la función de perfil de voz. Usualmente las cartas de IA suenan todas iguales. Pero con mi perfil las genera con mis tics de escritura reales. Mi manager en Glovo me dijo que la carta fue lo que le llamó la atención.",
    result: "Posición conseguida · Primer trimestre en rol",
  },
  {
    name: "Ana García",
    role: "Data Scientist",
    company: "Telefónica",
    location: "Madrid",
    avatar: "AG",
    color: "from-emerald-400 to-teal-500",
    timeToInterview: "14 días",
    atsImprovement: "+38 pts",
    quote: "Venía de un sector diferente (ingeniería industrial) y quería hacer la transición a Data Science. Tenía las habilidades pero no sabía cómo presentarlas. CVMatch AI me ayudó a identificar exactamente qué keywords usar y cómo reencuadrar mi experiencia técnica en términos que los reclutadores de data reconocen.",
    detail: "Generé versiones diferentes de mi CV para ofertas de distintos niveles. Para cada una, el análisis ATS me decía exactamente qué cambiar. En 3 semanas tenía 4 entrevistas. Telefónica fue la segunda.",
    result: "Transición de sector exitosa · +35% salario",
  },
  {
    name: "Miguel Torres",
    role: "UX Designer",
    company: "Cabify",
    location: "Madrid",
    avatar: "MT",
    color: "from-amber-400 to-orange-500",
    timeToInterview: "6 días",
    atsImprovement: "+29 pts",
    quote: "Siendo diseñador, asumí que mi portfolio hacía todo el trabajo. Pero primero tienes que pasar el ATS. Mi CV tenía mucho visual y poco texto, y por eso el sistema lo descartaba antes de que llegara a nadie. CVMatch AI me lo explicó con datos y me dio los pasos exactos para arreglarlo.",
    detail: "Ahora tengo dos versiones del CV: una visual para cuando me pasan a HR, y una optimizada para ATS. El analizador de CVMatch AI es parte de mi proceso cada vez que aplico a una posición nueva.",
    result: "Oferta en 3 semanas · Remote-first",
  },
  {
    name: "Sara Jiménez",
    role: "Especialista en Marketing Digital",
    company: "Mango",
    location: "Barcelona",
    avatar: "SJ",
    color: "from-blue-400 to-indigo-500",
    timeToInterview: "9 días",
    atsImprovement: "+41 pts",
    quote: "Trabajé como freelance 4 años y no sabía cómo presentarlo en un CV corporativo. La IA no solo me ayudó con las keywords sino con estructurar mi experiencia fragmentada como si fuera un historial lineal coherente. Fue una revelación.",
    detail: "Las cartas de presentación en inglés eran mi punto débil. Con el perfil de voz configurado en español, la IA genera versiones en inglés que mantienen mi personalidad. No suenan a traducción automática.",
    result: "De freelance a corporativo · Contrato indefinido",
  },
  {
    name: "Jordi Puig",
    role: "DevOps Engineer",
    company: "King",
    location: "Barcelona",
    avatar: "JP",
    color: "from-purple-400 to-violet-500",
    timeToInterview: "5 días",
    atsImprovement: "+62 pts",
    quote: "Soy malo escribiendo sobre mí mismo. Técnicamente estoy bien preparado pero el CV nunca lo reflejaba. Con CVMatch AI subí mi score de 28 a 90 en una tarde. La puntuación alta no es el objetivo, conseguir la entrevista sí. Y funcionó.",
    detail: "Lo recomiendo a todos mis compañeros de equipo. Cuando alguien dice que no consigue entrevistas lo primero que les pregunto es si han analizado su CV con ATS. Siempre hay algo que mejorar.",
    result: "5 entrevistas en 2 semanas · Gaming industry",
  },
]

export default function HistoriasPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff]">
      {/* Nav */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 text-sm">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            CVMatch AI
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">Blog</Link>
            <Link href="/login" className="text-sm font-semibold bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
              Empezar gratis →
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-full px-4 py-1.5 text-xs font-semibold text-amber-600 mb-5">
            <Star className="h-3.5 w-3.5 fill-amber-400" /> Casos reales · Sin inventar
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Ellos ya lo consiguieron
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Historias reales de profesionales que mejoraron su CV con CVMatch AI y consiguieron las entrevistas que merecían.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-16 text-center">
          {[
            { v: "87%", l: "Consiguen entrevistas en menos de 2 semanas" },
            { v: "+45 pts", l: "Mejora media en puntuación ATS" },
            { v: "4.9/5", l: "Valoración media de la herramienta" },
          ].map(s => (
            <div key={s.l} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="text-3xl font-black text-gray-900 mb-1">{s.v}</div>
              <div className="text-xs text-gray-400 leading-snug">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Stories */}
        <div className="space-y-8">
          {stories.map((s, i) => (
            <div key={s.name} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left */}
                <div className="md:w-56 shrink-0">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white font-black text-lg mb-4`}>
                    {s.avatar}
                  </div>
                  <h3 className="font-black text-gray-900 text-lg leading-tight">{s.name}</h3>
                  <p className="text-sm text-gray-500 mb-1">{s.role}</p>
                  <p className="text-xs text-indigo-600 font-semibold mb-4">{s.company} · {s.location}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                      ATS: <span className="font-bold text-emerald-600">{s.atsImprovement}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Zap className="h-3.5 w-3.5 text-violet-500" />
                      Primera entrevista: <span className="font-bold">{s.timeToInterview}</span>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex-1">
                  <Quote className="h-6 w-6 text-gray-200 mb-2" />
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm">{s.quote}</p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.detail}</p>
                  <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    ✓ {s.result}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl p-12 text-center text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)" }}>
          <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, #7c3aed, transparent)" }} />
          <div className="relative">
            <h2 className="text-3xl font-black mb-3">Escribe tu propia historia</h2>
            <p className="text-indigo-200 mb-8 max-w-md mx-auto text-sm">
              Únete a más de 10.000 profesionales. Empieza gratis, sin tarjeta de crédito.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/login" className="inline-flex items-center justify-center gap-2 bg-white text-indigo-900 font-bold px-6 py-3 rounded-2xl hover:bg-indigo-50 transition-colors text-sm">
                Empezar gratis <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/analizador-cv-gratis" className="inline-flex items-center justify-center gap-2 bg-white/20 text-white font-semibold px-6 py-3 rounded-2xl hover:bg-white/30 transition-colors text-sm border border-white/30">
                Analizar mi CV gratis
              </Link>
            </div>
          </div>
        </div>

      </main>

      <footer className="border-t border-gray-100 bg-white py-8 mt-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} CVMatch AI. Todos los derechos reservados.</span>
          <div className="flex gap-4">
            <Link href="/blog" className="hover:text-gray-600">Blog</Link>
            <Link href="/pricing" className="hover:text-gray-600">Precios</Link>
            <Link href="/analizador-cv-gratis" className="hover:text-gray-600">Analizador gratis</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
