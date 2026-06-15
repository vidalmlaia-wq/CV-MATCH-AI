import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { FileText, Target, Mail, Plus, TrendingUp } from "lucide-react"
import { formatDate, cn } from "@/lib/utils"

export default async function DashboardPage() {
  const session = await auth()
  const userId = session!.user!.id!

  const [resumes, analyses, coverLetters, subscription] = await Promise.all([
    prisma.resume.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.aTSAnalysis.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.coverLetter.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
    prisma.subscription.findUnique({ where: { userId } }),
  ])

  const isPro = subscription?.plan === "pro" && subscription.status === "active"
  const avgScore =
    analyses.length > 0
      ? Math.round(analyses.reduce((acc, a) => acc + a.score, 0) / analyses.length)
      : 0

  const stats = [
    { label: "CVs creados", value: resumes.length, icon: FileText, href: "/resumes" },
    { label: "Análisis ATS", value: analyses.length, icon: Target, href: "/ats" },
    { label: "Cartas", value: coverLetters.length, icon: Mail, href: "/cover-letters" },
    { label: "Puntuación media", value: avgScore ? `${avgScore}%` : "—", icon: TrendingUp, href: "/ats" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido, {session?.user?.name?.split(" ")[0]}
          </p>
        </div>
        {!isPro && (
          <Badge variant="secondary" className="text-sm py-1 px-3">
            Plan Gratuito –{" "}
            <Link href="/pricing" className="ml-1 underline">
              Actualizar a Pro
            </Link>
          </Badge>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" /> Mis CVs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {resumes.length === 0 ? (
              <p className="text-sm text-muted-foreground">Aún no tienes CVs creados.</p>
            ) : (
              resumes.slice(0, 3).map((r) => (
                <Link
                  key={r.id}
                  href={`/resumes/${r.id}`}
                  className="block text-sm hover:text-primary"
                >
                  {r.title} · <span className="text-muted-foreground">{formatDate(r.updatedAt)}</span>
                </Link>
              ))
            )}
            <Link
              href="/resumes/new"
              className={cn(buttonVariants({ size: "sm" }), "w-full mt-3 justify-center")}
            >
              <Plus className="h-3 w-3 mr-1" /> Nuevo CV
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4" /> Últimos análisis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {analyses.length === 0 ? (
              <p className="text-sm text-muted-foreground">No has analizado ningún CV.</p>
            ) : (
              analyses.slice(0, 3).map((a) => (
                <div key={a.id} className="flex justify-between text-sm">
                  <span className="truncate">{a.jobTitle}</span>
                  <Badge
                    variant={a.score >= 80 ? "default" : a.score >= 60 ? "secondary" : "destructive"}
                    className="ml-2 shrink-0"
                  >
                    {a.score}%
                  </Badge>
                </div>
              ))
            )}
            <Link
              href="/ats"
              className={cn(buttonVariants({ size: "sm", variant: "outline" }), "w-full mt-3 justify-center")}
            >
              <Plus className="h-3 w-3 mr-1" /> Nuevo análisis
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Mail className="h-4 w-4" /> Cartas recientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {coverLetters.length === 0 ? (
              <p className="text-sm text-muted-foreground">No has generado cartas aún.</p>
            ) : (
              coverLetters.slice(0, 3).map((c) => (
                <Link
                  key={c.id}
                  href={`/cover-letters/${c.id}`}
                  className="block text-sm hover:text-primary truncate"
                >
                  {c.title}
                </Link>
              ))
            )}
            <Link
              href="/cover-letters"
              className={cn(buttonVariants({ size: "sm", variant: "outline" }), "w-full mt-3 justify-center")}
            >
              <Plus className="h-3 w-3 mr-1" /> Generar carta
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
