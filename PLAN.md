# CVMatch AI — Plan de desarrollo

## Estado: ✅ Fase 1 completada

---

## FASE 1: Infraestructura base ✅

- [x] Scaffolding Next.js 15 con TypeScript, Tailwind, App Router
- [x] Configuración shadcn/ui (base-ui)
- [x] Esquema Prisma (User, Account, Session, Resume, ATSAnalysis, CoverLetter, Subscription)
- [x] PrismaClient con adaptador pg (Prisma 7)
- [x] Auth.js v5 con Google OAuth
- [x] Stripe SDK configurado
- [x] OpenAI SDK configurado
- [x] Variables de entorno documentadas (.env.example)
- [x] Middleware de autenticación

## FASE 2: Funcionalidades core ✅

- [x] Landing page con hero, features y pricing
- [x] Página de login con OAuth Google
- [x] Dashboard con estadísticas y accesos rápidos
- [x] Navbar con dropdown de usuario

### Constructor de CV ✅
- [x] API GET/POST /api/resumes
- [x] API GET/PUT/DELETE /api/resumes/[id]
- [x] Formulario multi-tab (Personal, Experiencia, Educación, Skills, Idiomas)
- [x] Vista previa renderizada en HTML/CSS
- [x] Exportación PDF con jsPDF + html2canvas

### Análisis ATS ✅
- [x] API POST /api/ats/analyze (OpenAI GPT-4o-mini)
- [x] Puntuación 0-100
- [x] Keywords encontradas/faltantes
- [x] Sugerencias de mejora por categoría
- [x] Historial de análisis

### Optimización IA ✅
- [x] API POST /api/ats/optimize (solo Pro)
- [x] Reescritura del CV con GPT-4o-mini
- [x] Integrado en el flujo ATS

### Cartas de presentación ✅
- [x] API GET/POST /api/cover-letters
- [x] Generación con GPT-4o-mini (tono configurable)
- [x] Guardado automático en DB
- [x] Vista detalle con botón copiar

## FASE 3: Monetización ✅

- [x] Stripe Checkout para plan Pro
- [x] Webhook para eventos de Stripe
- [x] Billing Portal para gestión de suscripción
- [x] Límites por plan (Free: 2 CVs / 3 análisis / 2 cartas)
- [x] Página de pricing con comparativa de planes
- [x] Upgrade prompts en features gated

## FASE 4: Despliegue ✅

- [x] Build de Next.js sin errores
- [x] TypeScript sin errores
- [x] Configuración lista para Vercel
- [x] README completo
- [x] .env.example documentado

---

## Pendiente (mejoras futuras)

- [ ] Más plantillas de CV (minimalista, creativo, académico)
- [ ] Importación de CV desde PDF/Word
- [ ] Análisis batch de múltiples ofertas
- [ ] Email con Resend (bienvenida, factura)
- [ ] Tests E2E con Playwright
- [ ] Analytics con PostHog
- [ ] Soporte multiidioma (i18n)
- [ ] App móvil con React Native

---

## Arquitectura

```
src/
├── app/
│   ├── (dashboard)/         # Rutas protegidas
│   │   ├── dashboard/
│   │   ├── resumes/
│   │   ├── ats/
│   │   ├── cover-letters/
│   │   ├── pricing/
│   │   └── settings/
│   ├── api/                 # Route Handlers
│   │   ├── auth/
│   │   ├── resumes/
│   │   ├── ats/
│   │   ├── cover-letters/
│   │   └── stripe/
│   ├── login/
│   └── page.tsx             # Landing
├── components/
│   ├── ui/                  # shadcn/base-ui
│   ├── dashboard/
│   ├── resumes/
│   ├── ats/
│   ├── cover-letters/
│   └── billing/
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── stripe.ts
│   ├── openai.ts
│   └── utils.ts
├── middleware.ts
└── types/
    └── next-auth.d.ts
```
