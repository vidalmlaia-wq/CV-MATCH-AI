"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Zap, FileText, Target, Mail, LayoutDashboard, LogOut, Settings, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavProps {
  user: { name?: string | null; email?: string | null; image?: string | null }
}

const navLinks = [
  { href: "/dashboard",     label: "Dashboard",    icon: LayoutDashboard },
  { href: "/resumes",       label: "Mis CVs",      icon: FileText },
  { href: "/ats",           label: "Análisis ATS", icon: Target },
  { href: "/cover-letters", label: "Cartas",       icon: Mail },
]

export function DashboardNav({ user }: NavProps) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900 text-sm">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap className="h-3.5 w-3.5 text-white" />
            </div>
            CVMatch AI
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/")
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all",
                    active
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
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
          <DropdownMenuTrigger className="outline-none">
            <Avatar className="h-8 w-8 ring-2 ring-indigo-100">
              <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
              <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-bold">
                {user.name?.slice(0,2).toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 bg-white">
            <div className="px-3 py-2.5">
              {user.name && <p className="font-semibold text-sm text-gray-900">{user.name}</p>}
              {user.email && <p className="truncate text-xs text-gray-400 w-[200px]">{user.email}</p>}
            </div>
            <DropdownMenuSeparator className="bg-gray-50" />
            <DropdownMenuItem onClick={() => router.push("/settings")} className="rounded-xl mx-1 cursor-pointer text-gray-600">
              <Settings className="mr-2 h-4 w-4" /> Configuración
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/pricing")} className="rounded-xl mx-1 cursor-pointer text-gray-600">
              <CreditCard className="mr-2 h-4 w-4" /> Plan & Facturación
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-50" />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="rounded-xl mx-1 mb-1 cursor-pointer text-red-500 focus:text-red-600 focus:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
