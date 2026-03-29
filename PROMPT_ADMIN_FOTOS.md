# Prompt: Panel Admin de Fotos — Rocío Masoterapia

## Contexto del proyecto

Landing page Next.js 15 (App Router) para "Rocío Masoterapia", servicio de masaje a domicilio en Santiago. Las imágenes del sitio están en `/public/images/` y se referencian directamente en `src/app/page.tsx`.

Imágenes actuales del sitio:
- **Hero**: `/public/images/hero.jpg` — fondo de la sección principal
- **Perfil "Sobre mí"**: `/public/images/616271293_17858492112595349_3059228116870493808_n.webp`
- **Galería 1**: `/public/images/564575294_18002891396827903_7842854950051613160_n.webp`
- **Galería 2**: misma que el perfil (segunda foto en galería)

---

## Tarea: Implementar panel admin para subir/reemplazar fotos

### Requisitos

1. **Ruta `/admin`** — panel protegido con contraseña simple (variable de entorno `ADMIN_PASSWORD`).
   - Sin sistema de autenticación complejo. Solo un formulario de login con contraseña que setea una cookie de sesión.
   - Si la cookie no está presente o es inválida, redirigir a `/admin/login`.

2. **Login** (`/admin/login`):
   - Formulario simple: campo de contraseña + botón "Entrar".
   - Si la contraseña coincide con `process.env.ADMIN_PASSWORD`, setear cookie `admin_session` (valor: hash simple o la misma contraseña encodeada en base64) con expiración de 24h.
   - Redirigir a `/admin`.

3. **Panel admin** (`/admin`):
   - Mostrar 3 tarjetas editables:
     - **Foto Hero** — preview actual + botón "Cambiar foto" (input file).
     - **Foto Perfil (Sobre mí)** — preview actual + botón "Cambiar foto".
     - **Galería** — preview de ambas fotos + botón "Cambiar foto" por cada una.
   - Cada tarjeta muestra la imagen actual del sitio.
   - Al seleccionar una nueva foto, se sube al servidor y reemplaza el archivo en `/public/images/`.

4. **API Route** (`/api/admin/upload`):
   - Recibe `multipart/form-data` con campos: `file` (la imagen) y `slot` (string: `"hero"` | `"profile"` | `"gallery1"` | `"gallery2"`).
   - Verifica que la cookie de sesión sea válida.
   - Valida que el archivo sea imagen (MIME: `image/jpeg`, `image/png`, `image/webp`) y no supere 10MB.
   - Guarda el archivo en `/public/images/` con el nombre fijo según el slot:
     - `hero` → `hero.jpg`
     - `profile` → `profile.webp`
     - `gallery1` → `gallery1.webp`
     - `gallery2` → `gallery2.webp`
   - **IMPORTANTE**: Actualizar las referencias en `src/app/page.tsx` para que usen los nombres fijos (`/images/hero.jpg`, `/images/profile.webp`, etc.) en lugar de los nombres largos actuales.

5. **Variable de entorno**:
   - Agregar `ADMIN_PASSWORD` al archivo `.env.local` (crear si no existe) con valor por defecto `rocio2024`.
   - Agregar `.env.local` al `.gitignore` si no está.

### Consideraciones técnicas

- Usar **Next.js App Router** (`src/app/admin/` y `src/app/api/admin/`).
- Para subir archivos usar el paquete nativo de Node.js `fs` (ya disponible en Next.js). NO usar `formidable` ni multer.
- Leer el body del multipart con `request.formData()` (disponible nativamente en Next.js 15).
- El panel admin NO necesita ser bonito — funcional y limpio con Tailwind es suficiente.
- Agregar botón "Cerrar sesión" que borra la cookie y redirige a `/admin/login`.
- Agregar enlace "Ver sitio →" en el panel para volver al landing.

### Archivos a crear/modificar

**Crear:**
- `src/app/admin/login/page.tsx` — formulario de login
- `src/app/admin/page.tsx` — panel con las tarjetas de fotos
- `src/app/admin/layout.tsx` — layout simple para el admin
- `src/app/api/admin/upload/route.ts` — API de subida de archivos
- `src/app/api/admin/logout/route.ts` — API para cerrar sesión
- `.env.local` — variable `ADMIN_PASSWORD=rocio2024`

**Modificar:**
- `src/app/page.tsx` — actualizar paths de imágenes a nombres fijos (`/images/profile.webp`, `/images/gallery1.webp`, `/images/gallery2.webp`)
- `.gitignore` — asegurar que `.env.local` esté ignorado

### Flujo de uso esperado

1. Rocío entra a `https://rocio-masoterapia.vercel.app/admin`
2. Ingresa la contraseña → cookie seteada → redirige al panel
3. Ve preview de cada foto del sitio
4. Hace clic en "Cambiar foto" en la tarjeta que quiere cambiar
5. Selecciona la nueva foto desde su celular/computador
6. La foto se sube, reemplaza la anterior y el preview se actualiza
7. Al volver al sitio principal, la nueva foto ya aparece

### Notas de seguridad

- La cookie debe ser `HttpOnly` y `SameSite=Strict`.
- Validar MIME type del archivo en el servidor (no solo en el cliente).
- Limitar tamaño máximo a 10MB.
- No exponer mensajes de error internos al usuario.

---

## Ejecución sugerida con agentes en paralelo

1. **Agente planner**: Revisar estructura actual y confirmar plan de archivos.
2. **Agente ui-designer**: Diseñar las tarjetas del panel admin con Tailwind.
3. **Agente security-reviewer**: Revisar la implementación de auth con cookies antes del commit.
4. **Agente code-reviewer**: Revisar el API route de upload.

Ejecutar secuencialmente: planner → implementación → security-reviewer → commit.
