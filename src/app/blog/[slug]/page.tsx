import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { notFound } from "next/navigation"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Clock, ArrowLeft, ArrowRight, BookOpen } from "lucide-react"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | CVMatch AI Blog`,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article" },
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  "Consejos CV":           "bg-indigo-50 text-indigo-700 border-indigo-100",
  "Carta de presentación": "bg-pink-50 text-pink-700 border-pink-100",
  "Entrevistas":           "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Búsqueda de empleo":    "bg-amber-50 text-amber-700 border-amber-100",
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "CVMatch AI", url: "https://cvmatch.ai" },
    publisher: { "@type": "Organization", name: "CVMatch AI", url: "https://cvmatch.ai" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://cvmatch.ai/blog/${post.slug}` },
  }

  const allPosts = getAllPosts()
  const idx = allPosts.findIndex(p => p.slug === slug)
  const prev = allPosts[idx + 1] ?? null
  const next = allPosts[idx - 1] ?? null

  return (
    <div className="min-h-screen bg-[#faf8ff]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

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
            <Link href="/blog" className="hover:text-gray-900 transition-colors">Blog</Link>
            <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-1.5 rounded-full transition-colors">
              Empezar gratis
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-indigo-600 transition-colors mb-8">
          <ArrowLeft className="h-3.5 w-3.5" /> Volver al blog
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[post.category] ?? "bg-gray-50 text-gray-600 border-gray-100"}`}>
              {post.category}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.readTime} min de lectura
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">{post.description}</p>
        </div>

        {/* Article body */}
        <article className="prose prose-gray prose-lg max-w-none
          prose-headings:font-black prose-headings:text-gray-900 prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-lg prose-h3:mt-7 prose-h3:mb-3
          prose-p:text-gray-600 prose-p:leading-relaxed
          prose-strong:text-gray-900 prose-strong:font-bold
          prose-ul:space-y-1 prose-li:text-gray-600
          prose-blockquote:border-l-4 prose-blockquote:border-indigo-200 prose-blockquote:bg-indigo-50/40 prose-blockquote:rounded-r-xl prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:not-italic prose-blockquote:text-gray-700
          prose-hr:border-gray-100
          prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
        ">
          <MDXRemote source={post.content} />
        </article>

        {/* CTA inline */}
        <div className="mt-12 glass rounded-2xl border border-indigo-100 p-6 bg-gradient-to-r from-indigo-50/60 to-violet-50/30 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-bold text-gray-900 text-sm flex items-center gap-2 mb-1">
              <BookOpen className="h-4 w-4 text-indigo-500" /> Pon en práctica lo que acabas de leer
            </p>
            <p className="text-xs text-gray-500">Analiza tu CV con IA y obtén sugerencias personalizadas en segundos.</p>
          </div>
          <Link
            href="/login"
            className="shrink-0 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors shadow-md shadow-indigo-100"
          >
            Empezar gratis <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <div className="mt-12 grid grid-cols-2 gap-4">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="group glass rounded-xl border border-white/80 p-4 hover:border-indigo-200 transition-all">
                <p className="text-xs text-gray-400 mb-1 flex items-center gap-1"><ArrowLeft className="h-3 w-3" /> Anterior</p>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-indigo-700 transition-colors line-clamp-2">{prev.title}</p>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/blog/${next.slug}`} className="group glass rounded-xl border border-white/80 p-4 hover:border-indigo-200 transition-all text-right">
                <p className="text-xs text-gray-400 mb-1 flex items-center gap-1 justify-end">Siguiente <ArrowRight className="h-3 w-3" /></p>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-indigo-700 transition-colors line-clamp-2">{next.title}</p>
              </Link>
            ) : <div />}
          </div>
        )}

      </main>
    </div>
  )
}
