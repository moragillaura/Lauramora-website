# Laura Mora · Estética y micropigmentación · Sevilla

Web vitrina (landing page) hecha con [Astro](https://astro.build), con panel de
edición para Laura (Sveltia CMS) y despliegue automático en Cloudflare.

## Arrancar en local

```bash
npm install
npm run dev      # http://localhost:4321
```

`npm run build` genera la web en `dist/`.

---

## Probar el panel de edición en local (sin cuentas, sin GitHub)

Se puede editar todo el contenido en el ordenador antes de publicar nada,
sin GitHub ni Cloudflare. Sveltia CMS usa el navegador para leer y escribir
los archivos directamente.

1. Usa **Google Chrome o Microsoft Edge** (hace falta la File System Access API).
2. Con el servidor en marcha (`npm run dev`), abre
   **http://localhost:4321/admin/index.html**.
3. Pulsa **«Work with Local Repository»** y selecciona la carpeta del proyecto.
4. Edita servicios, precios, FAQ, opiniones, formaciones, contacto o la galería.
   Los cambios se guardan directamente en `src/data/*.json` y las fotos en
   `public/uploads/`.

Nota: en local la URL es `/admin/index.html`; ya publicada en Cloudflare,
la dirección limpia **`/tudominio.com/admin`** funciona igual.

---

## Cómo edita Laura el contenido (sin tocar código)

Una vez publicada la web, Laura entra en **https://tudominio.com/admin**,
inicia sesión con GitHub y edita desde un panel en español:

- **Contacto y datos del estudio** — WhatsApp, Instagram, dirección, horario.
- **Servicios y precios** — añadir, quitar o cambiar precios.
- **Preguntas frecuentes** — editar preguntas y respuestas.
- **Galería antes / después** — subir fotos arrastrándolas.

Al pulsar «Guardar», el cambio se guarda en GitHub y la web se actualiza sola
en Cloudflare en 1–2 minutos. No hace falta instalar nada.

El contenido editable vive en `src/data/*.json`. Si algún día se prefiere,
también se puede editar esos archivos a mano.

---

## Puesta en marcha (una sola vez, parte técnica)

### 1. Subir el proyecto a GitHub
Crear un repositorio (privado vale) y subir esta carpeta.

### 2. Desplegar la web en Cloudflare Pages
En el panel de Cloudflare → **Workers & Pages → Create → Pages → conectar
GitHub** y elegir el repo. Configuración de build:

- Framework preset: **Astro**
- Build command: `npm run build`
- Output directory: `dist`

A partir de aquí, cada cambio en la rama `main` se publica automáticamente.

### 3. Crear la GitHub OAuth App (para el login del panel)
GitHub → Settings → Developer settings → **OAuth Apps → New**:

- Homepage URL: `https://tudominio.com`
- Authorization callback URL: `https://TU-WORKER.workers.dev/callback`

Guarda el **Client ID** y genera un **Client Secret**.

### 4. Desplegar el worker de login
Es el worker oficial de Sveltia (en `oauth-worker/`). Antes de desplegar, abre
`oauth-worker/wrangler.toml` y ajusta `ALLOWED_DOMAINS` (tu dominio y, si usas
la preview de Pages, `*.pages.dev`) — esto evita que otra web use tu worker.

```bash
cd oauth-worker
npm install
npx wrangler secret put GITHUB_CLIENT_ID       # pega el Client ID
npx wrangler secret put GITHUB_CLIENT_SECRET   # pega el Client Secret
npx wrangler deploy
```
Wrangler te dará la URL del worker (`https://...workers.dev`).

> Alternativa sin worker: Sveltia también permite entrar con un token personal
> (PAT) de GitHub, sin desplegar nada. Más simple, pero hay que pegar y renovar
> el token. Ver `oauth-worker/README.md`.

### 5. Conectar el panel
En `public/admin/config.yml` edita las dos líneas marcadas `<< EDITAR >>`:

- `repo: USUARIO/REPOSITORIO`  (tu repo de GitHub)
- `base_url: https://TU-WORKER.workers.dev`  (la URL del paso 4)

Sube el cambio. Listo: **/admin** ya funciona.

### 6. Correo con Google Workspace
El correo (laura@tudominio.com) es aparte de la web. En Cloudflare → DNS,
añade los registros **MX** que indica Google Workspace al configurar el dominio.
Cloudflare solo enruta el DNS; los buzones los da Google.

---

## Qué es editable y qué no

Editable desde `/admin`: contacto, servicios/precios, FAQ, galería.
En código (diseño y textos estructurales): titulares, sección «Qué es»,
el proceso y «Sobre mí». Es intencionado — así el panel queda simple y la
web no se rompe.

## Fotos

Las fotos de la galería se suben desde `/admin` (van a `public/uploads/`).
Para el **retrato de Laura** del hero y de «Sobre mí», sustituye los marcos
`.frame__img` y `.portrait` en `Hero.astro` y `SobreMi.astro` por una imagen.

## Diseño

Concepto «el trazo»: los pelos dibujados a mano como identidad; el motivo SVG
se dibuja solo al cargar. Tipografías Fraunces + Jost. Colores y espaciado se
controlan desde las variables en `src/styles/global.css`.

## Estructura

```
src/
├─ data/                        contenido editable (JSON)  ← el CMS escribe aquí
├─ layouts/Layout.astro
├─ pages/index.astro
├─ styles/global.css
└─ components/                  secciones de la web
public/
├─ admin/                       panel de contenido (Sveltia CMS)
└─ uploads/                     fotos subidas desde el panel
oauth-worker/                   worker de Cloudflare para el login con GitHub
```
