import { auth } from "@/lib/auth"
import { stripe, PLANS } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { absoluteUrl } from "@/lib/utils"

export async function POST() {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true },
  })

  if (!user) return Response.json({ error: "User not found" }, { status: 404 })

  let customerId = user.subscription?.stripeCustomerId

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name ?? undefined,
      metadata: { userId: user.id },
    })
    customerId = customer.id
    await prisma.subscription.upsert({
      where: { userId: user.id },
      create: { userId: user.id, stripeCustomerId: customerId },
      update: { stripeCustomerId: customerId },
    })
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: PLANS.pro.priceId!, quantity: 1 }],
    success_url: `${absoluteUrl("/dashboard")}?success=true`,
    cancel_url: `${absoluteUrl("/pricing")}?canceled=true`,
    metadata: { userId: user.id },
  })

  return Response.json({ url: checkoutSession.url })
}
