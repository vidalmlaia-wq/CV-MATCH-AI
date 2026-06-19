import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    { label: "CVs", value: user?._count.resumes ?? 0, max: isPro ? null : 2, icon: FileText, bg: "#e0e7ff", color: "#4338ca" },
    { label: "Análisis ATS", value: user?._count.analyses ?? 0, max: isPro ? null : 3, icon: Target, bg: "#fce7f3", color: "#be185d" },
    { label: "Cartas", value: user?._count.coverLetters ?? 0, max: isPro ? null : 2, icon: Mail, bg: "#d1fae5", color: "#065f46" },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Configuración</h1>
        <p className="text-gray-400 mt-1 text-sm">Gestiona tu cuenta y preferencias.</p>
      </div>

      {/* Profile */}
      <div className="glass rounded-2xl p-6 border border-white/80">
        <h2 className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-5">Perfil</h2>
        <div className="flex items-center gap-5">
          <Avatar className="h-16 w-16 ring-2 ring-indigo-100">
            <AvatarImage src={user?.image ?? ""} />
            <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xl font-black">
              {user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-lg text-gray-900">{user?.name}</p>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <p className="text-gray-400 text-xs mt-1">
              Cuenta creada el {user?.createdAt ? formatDate(user.createdAt) : ""}
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          La información de perfil se gestiona a través de Google. Para cambiar nombre o foto, actualiza tu cuenta de Google.
        </p>
      </div>

      {/* Plan */}
      <div className="glass rounded-2xl p-6 border border-white/80">
        <h2 className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-5">Plan actual</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isPro ? (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow shadow-indigo-200">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">Plan Pro</span>
                    <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full font-medium">Activo</span>
                  </div>
                  {subscription?.currentPeriodEnd && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {subscription.cancelAtPeriodEnd
                        ? `Cancela el ${formatDate(subscription.currentPeriodEnd)}`
                        : `Se renueva el ${formatDate(subscription.currentPeriodEnd)}`}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                  <Sparkles className="h-5 w-5 text-gray-400" />
                </div>
                <div>
                  <span className="font-bold text-gray-900">Plan Gratuito</span>
                  <p className="text-xs text-gray-400 mt-0.5">Límites en CVs, análisis y cartas</p>
                </div>
              </>
            )}
          </div>
          {isPro ? <ManageBillingButton /> : <UpgradeButton />}
        </div>
      </div>

      {/* Usage */}
      <div className="glass rounded-2xl p-6 border border-white/80">
        <h2 className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-5">Uso</h2>
        <div className="grid grid-cols-3 gap-4">
          {usage.map((item) => (
            <div key={item.label} className="glass-subtle rounded-xl p-4 text-center border border-white/70">
              <div className="h-8 w-8 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ background: item.bg }}>
                <item.icon className="h-4 w-4" style={{ color: item.color }} />
              </div>
              <p className="text-2xl font-black text-gray-900">{item.value}</p>
              <p className="text-xs text-gray-400 mt-1">{item.label}</p>
              {item.max && (
                <>
                  <p className="text-xs text-gray-300 mt-0.5">de {item.max}</p>
                  <div className="h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-indigo-400 rounded-full transition-all"
                      style={{ width: `${Math.min(100, (item.value / item.max) * 100)}%` }}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
