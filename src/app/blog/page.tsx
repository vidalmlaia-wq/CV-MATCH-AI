import { getAllPosts } from "@/lib/blog"
import Link from "next/link"
import { Clock, ArrowRight, BookOpen } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog — Consejos para tu CV y búsqueda de empleo | CVMatch AI",
  description: "Guías prácticas para optimizar tu CV, pasar los filtros ATS y escribir cartas de presentación que consigan entrevistas.",
}

const CATEGORY_COLORS: Record<string, string> = {
  "Consejos CV":           "bg-indigo-50 text-indigo-700 border-indigo-100",
  "Carta de presentación": "bg-pink-50 text-pink-700 border-pink-100",
  "Entrevistas":           "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Búsqueda de empleo":    "bg-amber-50 text-amber-700 border-amber-100",
}

export default function BlogPage() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  return (
    <div className="min-h-screen bg-[#faf8ff]">

      {/* Nav */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 text-sm">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs font-black">CV</span>
            </div>
            CVMatch AI
          </Link>
          <nav className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition-colors">Inicio</Link>
            <Link href="/blog" className="text-indigo-600 font-semibold">Blog</Link>
            <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-1.5 rounded-full transition-colors">
              Empezar gratis
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-16">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <BookOpen className="h-3.5 w-3.5" /> Blog
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">
            Consigue más entrevistas
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Guías prácticas sobre CV, cartas de presentación y búsqueda de empleo. Sin relleno, solo lo que funciona.
          </p>
        </div>

        {/* Featured post */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group block aurora-bg rounded-3xl border border-white/60 overflow-hidden hover:shadow-xl hover:shadow-indigo-100/50 transition-all"
          >
            <div className="p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[featured.category] ?? "bg-gray-50 text-gray-600 border-gray-100"}`}>
                    {featured.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {featured.readTime} min
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight group-hover:text-indigo-700 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-gray-500 leading-relaxed">{featured.description}</p>
                <span className="inline-flex items-center gap-2 text-indigo-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  Leer artículo <ArrowRight className="h-4 w-4" />
                </span>
              </div>
              {/* Mock article preview */}
              <div className="hidden md:flex justify-center">
                <div className="w-64 bg-white/80 rounded-2xl shadow-lg border border-white p-6 space-y-3">
                  <div className="h-2.5 bg-indigo-200 rounded-full w-3/4" />
                  <div className="h-2 bg-gray-100 rounded-full w-full" />
                  <div className="h-2 bg-gray-100 rounded-full w-5/6" />
                  <div className="h-2 bg-gray-100 rounded-full w-4/5" />
                  <div className="h-px bg-gray-100 my-2" />
                  <div className="h-2 bg-gray-100 rounded-full w-full" />
                  <div className="h-2 bg-gray-100 rounded-full w-3/4" />
                  <div className="h-2 bg-gray-100 rounded-full w-5/6" />
                  <div className="h-px bg-gray-100 my-2" />
                  <div className="h-2 bg-gray-100 rounded-full w-2/3" />
                  <div className="h-2 bg-gray-100 rounded-full w-full" />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-6">Más artículos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group glass rounded-2xl border border-white/80 p-6 hover:shadow-lg hover:shadow-gray-100 transition-all flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[post.category] ?? "bg-gray-50 text-gray-600 border-gray-100"}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.readTime} min
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 leading-snug mb-2 group-hover:text-indigo-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">{post.description}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 group-hover:gap-2.5 transition-all">
                    Leer <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="glass rounded-3xl border border-indigo-100 p-8 md:p-12 text-center bg-gradient-to-br from-indigo-50/60 to-violet-50/30">
          <h2 className="text-2xl font-black text-gray-900 mb-3">Optimiza tu CV con IA</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Analiza tu CV contra cualquier oferta en segundos y descubre exactamente qué mejorar.
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
