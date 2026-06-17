import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { ManageBillingButton } from "@/components/billing/manage-button"
import { UpgradeButton } from "@/components/billing/upgrade-button"
import { Sparkles, FileText, Target, Mail } from "lucide-react"

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

  const usage = [
    { label: "CVs", value: user?._count.resumes ?? 0, max: isPro ? null : 2, icon: FileText, color: "text-blue-400" },
    { label: "Análisis ATS", value: user?._count.analyses ?? 0, max: isPro ? null : 3, icon: Target, color: "text-violet-400" },
    { label: "Cartas", value: user?._count.coverLetters ?? 0, max: isPro ? null : 2, icon: Mail, color: "text-pink-400" },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white">Configuración</h1>
        <p className="text-white/40 mt-1">Gestiona tu cuenta y preferencias.</p>
      </div>

      {/* Profile */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-5">Perfil</h2>
        <div className="flex items-center gap-5">
          <Avatar className="h-16 w-16 border-2 border-violet-500/30">
            <AvatarImage src={user?.image ?? ""} />
            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-xl font-black">
              {user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-lg text-white">{user?.name}</p>
            <p className="text-white/50 text-sm">{user?.email}</p>
            <p className="text-white/30 text-xs mt-1">
              Cuenta creada el {user?.createdAt ? formatDate(user.createdAt) : ""}
            </p>
          </div>
        </div>
        <p className="text-xs text-white/25 mt-4">
          La información de perfil se gestiona a través de Google. Para cambiar nombre o foto, actualiza tu cuenta de Google.
        </p>
      </div>

      {/* Plan */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-5">Plan actual</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isPro ? (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow shadow-violet-500/30">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">Plan Pro</span>
                    <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 text-xs">Activo</Badge>
                  </div>
                  {subscription?.currentPeriodEnd && (
                    <p className="text-xs text-white/40 mt-0.5">
                      {subscription.cancelAtPeriodEnd
                        ? `Cancela el ${formatDate(subscription.currentPeriodEnd)}`
                        : `Se renueva el ${formatDate(subscription.currentPeriodEnd)}`}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <Sparkles className="h-5 w-5 text-white/40" />
                </div>
                <div>
                  <span className="font-bold text-white">Plan Gratuito</span>
                  <p className="text-xs text-white/40 mt-0.5">Límites en CVs, análisis y cartas</p>
                </div>
              </>
            )}
          </div>
          {isPro ? <ManageBillingButton /> : <UpgradeButton />}
        </div>
      </div>

      {/* Usage */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-5">Uso</h2>
        <div className="grid grid-cols-3 gap-4">
          {usage.map((item) => (
            <div key={item.label} className="bg-white/5 border border-white/8 rounded-xl p-4 text-center">
              <item.icon className={`h-5 w-5 mx-auto mb-2 ${item.color}`} />
              <p className="text-2xl font-black text-white">{item.value}</p>
              <p className="text-xs text-white/40 mt-1">{item.label}</p>
              {item.max && (
                <p className="text-xs text-white/25 mt-0.5">de {item.max}</p>
              )}
              {item.max && (
                <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all"
                    style={{ width: `${Math.min(100, (item.value / item.max) * 100)}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
