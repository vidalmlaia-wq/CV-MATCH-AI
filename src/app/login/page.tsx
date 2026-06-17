"use client"

import { signIn } from "next-auth/react"
import { Zap, Sparkles, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Blobs */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-indigo-600/15 rounded-full blur-[80px]" />

        <Link href="/" className="relative z-10 flex items-center gap-2.5 font-bold text-xl text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30">
            <Zap className="h-4 w-4 text-white" />
          </div>
          CVMatch <span className="text-violet-400">AI</span>
        </Link>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs px-3 py-1 rounded-full mb-6">
            <Sparkles className="h-3 w-3" /> Más de 10.000 profesionales confían en nosotros
          </div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Tu próximo trabajo<br />empieza aquí
          </h2>
          <p className="text-white/50 leading-relaxed mb-8 text-lg">
            Crea CVs que superan los filtros ATS, analiza tu compatibilidad con cada oferta y genera cartas de presentación en segundos.
          </p>
          <ul className="space-y-3">
            {[
              "Constructor de CV con IA",
              "Análisis ATS con puntuación 0-100",
              "Optimización automática con GPT-4o",
              "Cartas de presentación personalizadas",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-white/20 text-xs">
          © {new Date().getFullYear()} CVMatch AI
        </p>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-xl text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600">
                <Zap className="h-4 w-4 text-white" />
              </div>
              CVMatch <span className="text-violet-400">AI</span>
            </Link>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h1 className="text-2xl font-black text-white mb-1">Bienvenido de vuelta</h1>
            <p className="text-white/50 text-sm mb-8">Accede con tu cuenta de Google para continuar.</p>

            <button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-white/90 text-gray-800 font-semibold py-3.5 rounded-xl transition-colors shadow-lg mb-6"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continuar con Google
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs text-white/30">
                <span className="bg-[#111128] px-3">Inicio de sesión seguro</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-white/30">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-violet-400" />
                Sin tarjeta de crédito
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-violet-400" />
                Gratis para siempre
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-white/25 mt-6">
            Al continuar aceptas nuestros{" "}
            <Link href="/terms" className="underline hover:text-white/50 transition-colors">Términos</Link>
            {" "}y{" "}
            <Link href="/privacy" className="underline hover:text-white/50 transition-colors">Privacidad</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
