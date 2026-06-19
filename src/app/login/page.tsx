"use client"

import { signIn } from "next-auth/react"
import { Zap, CheckCircle2, Sparkles } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden flex items-center justify-center px-4">

      {/* Blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#ede9fe] opacity-60 rounded-full blur-3xl animate-blob pointer-events-none" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[420px] h-[420px] bg-[#fce7f3] opacity-50 rounded-full blur-3xl animate-blob-delay pointer-events-none" />
      <div className="absolute top-[40%] right-[15%] w-[280px] h-[280px] bg-[#d1fae5] opacity-40 rounded-full blur-3xl animate-blob-delay2 pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold text-gray-900 text-lg">
            <div className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
              <Zap className="h-4 w-4 text-white" />
            </div>
            CVMatch AI
          </Link>
        </div>

        {/* Card glass */}
        <div className="glass rounded-3xl p-8 shadow-2xl shadow-indigo-100/40 border border-white/90">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-1 text-center">Bienvenida</h1>
          <p className="text-sm text-gray-400 text-center mb-8">Accede con tu cuenta de Google para continuar.</p>

          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md text-gray-700 font-semibold py-3.5 rounded-2xl transition-all text-sm shadow-sm"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continuar con Google
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-300">inicio seguro</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <ul className="space-y-2">
            {["Sin tarjeta de crédito","Gratis para siempre en el plan básico","Cancela cuando quieras"].map(t => (
              <li key={t} className="flex items-center gap-2 text-xs text-gray-400">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />{t}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          Al continuar aceptas los{" "}
          <Link href="/terms" className="underline hover:text-gray-600 transition-colors">Términos</Link>
          {" "}y la{" "}
          <Link href="/privacy" className="underline hover:text-gray-600 transition-colors">Privacidad</Link>.
        </p>

      </div>
    </div>
  )
}
