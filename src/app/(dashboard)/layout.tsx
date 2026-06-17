import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { DashboardNav } from "@/components/dashboard/nav"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  return (
    <div className="flex min-h-screen flex-col bg-[#080815]">
      <DashboardNav user={session.user} />
      <main className="flex-1 container mx-auto px-4 py-8 text-white">{children}</main>
    </div>
  )
}
