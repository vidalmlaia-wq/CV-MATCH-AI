import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { DashboardNav } from "@/components/dashboard/nav"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  return (
    <div className="flex min-h-screen flex-col bg-[#fafafa]">
      <DashboardNav user={session.user} />
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">{children}</main>
    </div>
  )
}
