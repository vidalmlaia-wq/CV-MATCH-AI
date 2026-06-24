import Link from "next/link"
import { Gift, Users, Zap, ArrowRight, CheckCircle2, Share2, Star } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Programa de Referidos — Gana 1 mes Pro gratis por cada amigo | CVMatch AI",
  description: "Comparte CVMatch AI con tus amigos y gana 1 mes Pro gratis por cada uno que se suscriba. Sin límite de referidos.",
  alternates: { canonical: "https://cvmatch.ai/referidos" },
}

const steps = [
  { n: "01", title: "Comparte tu enlace", body: "Copia tu enlace personal de referido desde tu panel de usuario y compártelo con quien quieras." },
  { n: "02", title: "Tu amigo se suscribe", body: "Cuando alguien se registra con tu enlace y activa un plan Pro, los dos ganáis." },
  { n: "03", title: "Los dos ganáis", body: "Tú recibes 1 mes Pro gratis. Tu amigo recibe su primer mes con descuento del 50%." },
]

export default function ReferidosPage() {
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
          <Link href="/login" className="text-sm font-semibold bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
            Entrar →
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Hero */}
        <div className="text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl mb-6" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
            <Gift className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Recomienda CVMatch AI<br />
            <span className="text-indigo-600">y gana Pro gratis</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-xl mx-auto">
            Por cada amigo que se suscriba a Pro con tu enlace, tú consigues 1 mes Pro completamente gratis. Sin límite.
          </p>
        </div>

        {/* Reward cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-indigo-100 p-8 text-center shadow-sm">
            <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
              <Share2 className="h-7 w-7 text-indigo-600" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Tú ganas</h3>
            <p className="text-4xl font-black text-indigo-600 mb-2">1 mes Pro</p>
            <p className="text-sm text-gray-500">gratis por cada amigo que active Pro</p>
          </div>
          <div className="bg-white rounded-3xl border border-violet-100 p-8 text-center shadow-sm">
            <div className="h-14 w-14 rounded-2xl bg-violet-50 flex items-center justify-center mx-auto mb-4">
              <Users className="h-7 w-7 text-violet-600" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Tu amigo gana</h3>
            <p className="text-4xl font-black text-violet-600 mb-2">50% dto</p>
            <p className="text-sm text-gray-500">en su primer mes de suscripción Pro</p>
          </div>
        </div>

        {/* Steps */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 text-center mb-10">Cómo funciona</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.n} className="text-center">
                <div className={`text-5xl font-black mb-4 opacity-15 ${["text-violet-400", "text-pink-400", "text-emerald-400"][i]}`}>{s.n}</div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terms */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8">
          <h2 className="text-lg font-black text-gray-900 mb-4">Condiciones del programa</h2>
          <ul className="space-y-2">
            {[
              "Sin límite de referidos — puedes conseguir meses gratis indefinidamente",
              "El mes gratis se acredita cuando el referido completa el primer pago",
              "El descuento del 50% aplica solo al primer mes del referido",
              "Los meses acumulados no caducan mientras tu cuenta esté activa",
              "Solo para cuentas personales. No aplicable a licencias de empresa",
              "CVMatch AI se reserva el derecho a modificar el programa con 30 días de aviso",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="rounded-3xl p-12 text-center text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #be185d)" }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 20%, #fff 0%, transparent 60%)" }} />
          <div className="relative">
            <Star className="h-8 w-8 text-white/60 mx-auto mb-4" />
            <h2 className="text-3xl font-black mb-3">Empieza a referir</h2>
            <p className="text-indigo-200 mb-8 max-w-md mx-auto text-sm">
              Crea tu cuenta gratuita para acceder a tu enlace personal de referido.
            </p>
            <Link href="/login" className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-bold px-8 py-4 rounded-2xl hover:bg-indigo-50 transition-colors text-sm">
              Crear cuenta gratis <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </main>

      <footer className="border-t border-gray-100 bg-white py-8 mt-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>© {new Date().getFullYear()} CVMatch AI.</span>
          <div className="flex gap-4">
            <Link href="/pricing" className="hover:text-gray-600">Precios</Link>
            <Link href="/historias" className="hover:text-gray-600">Historias de éxito</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
