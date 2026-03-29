# Rocío Masoterapia — Memoria del proyecto

## Negocio
- **Marca**: Rocío Masoterapia
- **Maseoterapeuta**: Rocío Abarzúa Torrealba
- **Servicio**: Masaje A DOMICILIO en Santiago (no centro físico)
- **WhatsApp**: +56 9 4214 2229 (todos los CTAs apuntan aquí)
- **Instagram**: @rocio.masoterapia
- **Horario**: Lunes a Sábado 09:00–20:00 (sin domingo)
- **Cancelaciones**: 24 horas de anticipación

## Precios
| Duración | 1 persona | 2 personas |
|---|---|---|
| 60 min | $42.000 | $80.000 |
| 90 min | $53.000 | $95.000 |

## Stack
- Next.js 15 · React · Tailwind CSS · TypeScript
- Deploy: Vercel (rama `main` → auto-deploy)
- Repo: `anomvlito/rocio_masoterapia`

## Archivos clave
- `src/app/page.tsx` — toda la página (single-page)
- `src/app/layout.tsx` — metadata SEO + JSON-LD schema
- `src/components/ui/SetmoreButton.tsx` — wrapper de link a WhatsApp
- `public/images/hero.jpg` — imagen principal (perrito en camilla)
- `public/images/616271293_*.webp` — foto de Rocío (sección "Sobre mí")
- `public/images/564575294_*.webp` — foto usada en galería

## Decisiones tomadas
- Setmore eliminado completamente (sin scripts externos)
- Sin dirección física, sin Google Maps, sin email
- Sin equipo — texto en singular (soy, llevo, etc.)
- Imagen hero: `hero.jpg` (extensión doble `.jpg.jpeg` causaba fallo de MIME)
- SEO keywords enfocadas en "masaje a domicilio Santiago"
