import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://cvmatch.ai"

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "CVMatch AI – Constructor de CV con Inteligencia Artificial",
    template: "%s | CVMatch AI",
  },
  description:
    "Crea CVs profesionales, analiza compatibilidad ATS y genera cartas de presentación personalizadas con IA. Optimiza tu búsqueda de empleo con GPT-4.",
  keywords: [
    "constructor de CV",
    "curriculum vitae",
    "ATS",
    "inteligencia artificial",
    "carta de presentación",
    "búsqueda de empleo",
    "CV online",
    "optimizar CV",
    "GPT-4",
    "análisis ATS",
  ],
  authors: [{ name: "CVMatch AI" }],
  creator: "CVMatch AI",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: APP_URL,
    siteName: "CVMatch AI",
    title: "CVMatch AI – Constructor de CV con Inteligencia Artificial",
    description:
      "Crea CVs profesionales, analiza compatibilidad ATS y genera cartas de presentación con IA en minutos.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CVMatch AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CVMatch AI – Constructor de CV con IA",
    description:
      "Crea CVs profesionales y analiza compatibilidad ATS con inteligencia artificial.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: APP_URL },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
