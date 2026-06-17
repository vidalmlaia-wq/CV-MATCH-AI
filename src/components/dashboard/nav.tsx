"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Zap, FileText, Target, Mail, LayoutDashboard, LogOut, Settings, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/resumes", label: "Mis CVs", icon: FileText },
  { href: "/ats", label: "Análisis ATS", icon: Target },
  { href: "/cover-letters", label: "Cartas", icon: Mail },
]

export function DashboardNav({ user }: NavProps) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0d0d20]/95 backdrop-blur">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2.5 font-bold text-white">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow shadow-violet-500/30">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="hidden sm:inline">CVMatch <span className="text-violet-400">AI</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/")
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    active
                      ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
                      : "text-white/50 hover:text-white/90 hover:bg-white/5"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50">
            <Avatar className="h-8 w-8 border-2 border-violet-500/30">
              <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-xs font-bold">
                {user.name?.slice(0, 2).toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#111128] border-white/10">
            <div className="px-2 py-2">
              {user.name && <p className="font-medium text-sm text-white">{user.name}</p>}
              {user.email && (
                <p className="w-[200px] truncate text-xs text-white/40">{user.email}</p>
              )}
            </div>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              onClick={() => router.push("/settings")}
              className="text-white/70 hover:text-white focus:text-white focus:bg-white/5 cursor-pointer"
            >
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/pricing")}
              className="text-white/70 hover:text-white focus:text-white focus:bg-white/5 cursor-pointer"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Plan & Facturación
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10 cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
