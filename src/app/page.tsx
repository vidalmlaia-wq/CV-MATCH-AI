import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileText,
  Zap,
  Target,
  Mail,
  Download,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: FileText,
    title: "Constructor de CV",
    description: "Crea CVs profesionales con plantillas modernas optimizadas para ATS.",
  },
  {
    icon: Target,
    title: "Análisis ATS",
    description: "Obtén una puntuación de compatibilidad y detecta palabras clave faltantes.",
  },
  {
    icon: Sparkles,
    title: "Optimización IA",
    description: "GPT-4 reescribe y mejora tu CV para cada oferta de trabajo.",
  },
  {
    icon: Mail,
    title: "Cartas de Presentación",
    description: "Genera cartas personalizadas en segundos para cada empresa.",
  },
  {
    icon: Download,
    title: "Exportación PDF",
    description: "Descarga tu CV en PDF listo para enviar con un solo clic.",
  },
  {
    icon: BarChart3,
    title: "Dashboard",
    description: "Gestiona todos tus CVs, análisis y cartas desde un solo lugar.",
  },
]

const pricingPlans = [
  {
    name: "Gratis",
    price: "€0",
    period: "siempre",
    description: "Perfecto para empezar",
    features: ["2 CVs", "3 análisis ATS", "2 cartas de presentación", "Exportación PDF"],
    cta: "Empezar gratis",
    href: "/login",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "€12",
    period: "mes",
    description: "Para profesionales activos",
    features: [
      "CVs ilimitados",
      "Análisis ATS ilimitados",
      "Cartas ilimitadas",
      "Optimización IA avanzada",
      "Exportación PDF premium",
      "Soporte prioritario",
    ],
    cta: "Empezar Pro",
    href: "/login?plan=pro",
    highlighted: true,
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Zap className="h-6 w-6 text-primary" />
            CVMatch AI
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
              Funcionalidades
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Precios
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className={cn(buttonVariants({ variant: "ghost" }))}>
              Iniciar sesión
            </Link>
            <Link href="/login" className={cn(buttonVariants())}>
              Empezar gratis
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="container mx-auto px-4 py-24 text-center">
          <Badge variant="secondary" className="mb-6">
            Potenciado por GPT-4
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
            Tu CV perfecto con{" "}
            <span className="text-primary">inteligencia artificial</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground mb-10">
            Crea CVs profesionales, analiza su compatibilidad ATS y genera cartas de presentación
            personalizadas en minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Empezar gratis <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="#features" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              Ver funcionalidades
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Sin tarjeta de crédito
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Configuración en 2 minutos
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Cancela cuando quieras
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="bg-muted/50 py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Todo lo que necesitas para destacar</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Herramientas impulsadas por IA para cada etapa de tu búsqueda de empleo.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="border-0 shadow-sm">
                  <CardHeader>
                    <feature.icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Precios simples y transparentes</h2>
              <p className="text-muted-foreground text-lg">
                Empieza gratis. Actualiza cuando lo necesites.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {pricingPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={plan.highlighted ? "border-primary shadow-lg scale-105" : ""}
                >
                  <CardHeader>
                    {plan.highlighted && (
                      <Badge className="w-fit mb-2">Más popular</Badge>
                    )}
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={plan.href}
                      className={cn(
                        buttonVariants({
                          variant: plan.highlighted ? "default" : "outline",
                        }),
                        "w-full justify-center"
                      )}
                    >
                      {plan.cta}
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>CVMatch AI © {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground">Privacidad</Link>
            <Link href="/terms" className="hover:text-foreground">Términos</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
