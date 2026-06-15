# CVMatch AI

SaaS de construcción de CVs con análisis ATS e inteligencia artificial.

## Stack tecnológico

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui (Base UI)
- **Base de datos**: PostgreSQL + Prisma 7 con adaptador `@prisma/adapter-pg`
- **Autenticación**: Auth.js v5 (next-auth@beta) con Google OAuth
- **Pagos**: Stripe SDK v2026 (API `2026-05-27.dahlia`)
- **IA**: OpenAI GPT-4o-mini
- **PDF**: jsPDF + html2canvas (exportación client-side)

## Funcionalidades

### Plan Free
- Hasta 2 CVs guardados
- Hasta 3 análisis ATS
- Hasta 2 cartas de presentación
- Constructor de CV multi-tab
- Exportación PDF

### Plan Pro (9€/mes)
- CVs y análisis ilimitados
- Optimización automática de CV con IA
- Cartas de presentación ilimitadas
- Gestión de suscripción (Stripe Billing Portal)

## Requisitos previos

- Node.js 18+
- PostgreSQL (local o Supabase/Neon)
- Cuenta Google Cloud (OAuth credentials)
- Cuenta Stripe
- API Key de OpenAI

## Instalación

```bash
git clone <repo>
cd cvmatch-ai
npm install
cp .env.example .env
# Editar .env con tus credenciales
npx prisma migrate dev
npm run dev
```

## Variables de entorno

Ver [.env.example](.env.example) para la lista completa.

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | Cadena de conexión PostgreSQL |
| `NEXTAUTH_SECRET` | Secret aleatorio para Auth.js |
| `GOOGLE_CLIENT_ID` | OAuth 2.0 Client ID de Google |
| `GOOGLE_CLIENT_SECRET` | OAuth 2.0 Client Secret de Google |
| `STRIPE_SECRET_KEY` | API Key secreta de Stripe |
| `STRIPE_WEBHOOK_SECRET` | Secret del webhook de Stripe |
| `STRIPE_PRO_PRICE_ID` | ID del precio del plan Pro en Stripe |
| `OPENAI_API_KEY` | API Key de OpenAI |
| `NEXT_PUBLIC_APP_URL` | URL pública de la app (ej: https://tudominio.com) |

## Arquitectura

```
src/
├── app/
│   ├── (dashboard)/         # Rutas protegidas por Auth.js
│   │   ├── dashboard/       # Panel principal con estadísticas
│   │   ├── resumes/         # Constructor y listado de CVs
│   │   ├── ats/             # Análisis ATS + optimización IA
│   │   ├── cover-letters/   # Generador de cartas
│   │   ├── pricing/         # Planes y checkout Stripe
│   │   └── settings/        # Perfil y suscripción
│   ├── api/
│   │   ├── auth/            # Auth.js handlers
│   │   ├── resumes/         # CRUD de CVs
│   │   ├── ats/             # Análisis y optimización
│   │   ├── cover-letters/   # Generación y guardado
│   │   └── stripe/          # Checkout, portal y webhook
│   ├── login/
│   └── page.tsx             # Landing page pública
├── components/
│   ├── ui/                  # Componentes shadcn/base-ui
│   ├── dashboard/           # Navbar y layout
│   ├── resumes/             # Builder, preview, PDF export
│   ├── ats/                 # Analyzer con resultados
│   ├── cover-letters/       # Generator form
│   └── billing/             # Upgrade card
├── lib/
│   ├── prisma.ts            # Singleton PrismaClient + PrismaPg adapter
│   ├── auth.ts              # Configuración Auth.js v5
│   ├── stripe.ts            # Instancia Stripe
│   ├── openai.ts            # Funciones IA (analyze, optimize, coverLetter)
│   └── utils.ts             # cn(), formatDate(), absoluteUrl()
├── middleware.ts             # Protección de rutas dashboard
└── types/
    └── next-auth.d.ts       # Augmentación Session con user.id
```

## Despliegue en Vercel

1. Conecta el repositorio en [vercel.com](https://vercel.com)
2. Añade todas las variables de entorno del `.env.example`
3. Configura el webhook de Stripe apuntando a `https://tudominio.com/api/stripe/webhook`
4. Ejecuta las migraciones de Prisma con `npx prisma migrate deploy`

## Notas técnicas importantes

- **Prisma 7**: No incluye `url` en el datasource del schema. La URL se pasa vía `prisma.config.ts` y el adaptador `PrismaPg`.
- **shadcn/ui base-ui**: No soporta la prop `asChild`. Usar `buttonVariants()` + `<Link>` para botones-enlace.
- **Stripe 2026**: `current_period_end` → `billing_cycle_anchor`. `Invoice.subscription` → `invoice.parent.subscription_details.subscription`.
- **Auth.js v5**: Estrategia JWT + `PrismaAdapter`. El `user.id` se propaga via callbacks `jwt` y `session`.
