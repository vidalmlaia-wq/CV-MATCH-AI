import fs from "fs"
import path from "path"
import matter from "gray-matter"

const BLOG_DIR = path.join(process.cwd(), "content/blog")

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readTime: number
  content: string
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".mdx"))
  return files
    .map(file => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8")
      const { data, content } = matter(raw)
      return { ...data, content } as Post
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".mdx"))
  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8")
    const { data, content } = matter(raw)
    if (data.slug === slug) return { ...data, content } as Post
  }
  return null
}
