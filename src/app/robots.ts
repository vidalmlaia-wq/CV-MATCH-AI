import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/blog", "/blog/", "/pricing", "/cv-*"],
        disallow: ["/dashboard", "/resumes", "/ats", "/cover-letters", "/settings", "/api/"],
      },
    ],
    sitemap: "https://cvmatch.ai/sitemap.xml",
  }
}
