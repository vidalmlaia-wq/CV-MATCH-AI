import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

export default async function SettingsPage() {
  const session = await auth()
  const userId = session!.user!.id!

  const [user, subscription] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      include: { _count: { select: { resumes: true, analyses: true, coverLetters: true } } },
    }),
    prisma.subscription.findUnique({ where: { userId } }),
  ])

  const isPro = subscription?.plan === "pro" && subscription.status === "active"

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">Gestiona tu cuenta y preferencias.</p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>Tu información de cuenta.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.image ?? ""} />
            <AvatarFallback className="text-xl">
              {user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-lg">{user?.name}</p>
            <p className="text-muted-foreground">{user?.email}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Cuenta creada el {user?.createdAt ? formatDate(user.createdAt) : ""}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Plan actual</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant={isPro ? "default" : "secondary"} className="text-sm px-3 py-1">
              {isPro ? "Pro" : "Gratuito"}
            </Badge>
            {subscription?.currentPeriodEnd && isPro && (
              <span className="text-sm text-muted-foreground">
                Se renueva el {formatDate(subscription.currentPeriodEnd)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Uso</CardTitle>
          <CardDescription>Resumen de tu actividad en la plataforma.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold">{user?._count.resumes ?? 0}</p>
            <p className="text-sm text-muted-foreground mt-1">CVs</p>
            {!isPro && <p className="text-xs text-muted-foreground">de 2</p>}
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{user?._count.analyses ?? 0}</p>
            <p className="text-sm text-muted-foreground mt-1">Análisis ATS</p>
            {!isPro && <p className="text-xs text-muted-foreground">de 3</p>}
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{user?._count.coverLetters ?? 0}</p>
            <p className="text-sm text-muted-foreground mt-1">Cartas</p>
            {!isPro && <p className="text-xs text-muted-foreground">de 2</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
