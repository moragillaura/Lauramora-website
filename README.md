# Laura Mora · Estética y micropigmentación · Sevilla

Web vitrina (landing page) hecha con [Astro](https://astro.build), con panel de
edición para Laura (Sveltia CMS) y despliegue automático en **GitHub Pages**.

- Repositorio: `moragillaura/Lauramora-website`
- Web publicada: <https://lauramoramicropigmentacion.com>
- Panel de edición: <https://lauramoramicropigmentacion.com/admin>

---

## Arrancar en local

```bash
npm install
npm run dev      # http://localhost:4321
```

`npm run build` genera la web en `dist/`.

---

## Cómo se publica

Cada push a la rama `main` dispara el workflow
[`.github/workflows/astro.yml`](.github/workflows/astro.yml), que compila el
sitio y lo publica en GitHub Pages. No hay que hacer nada más: en 1–2 minutos
los cambios están online.

El dominio propio está configurado en **Settings → Pages → Custom domain**.
El archivo `public/CNAME` lo acompaña dentro del sitio compilado para que la
configuración sobreviva aunque se reinicie ese ajuste.

---

## Entrar en el panel (`/admin`)

El acceso es con un **token personal de GitHub**. No hay servidor de login que
mantener; el panel habla directamente con la API de GitHub desde el navegador.

### Crear el token (una vez)

1. GitHub → **Settings → Developer settings → Personal access tokens →
   Fine-grained tokens → Generate new token**.
2. Configurar:
   - **Repository access**: *Only select repositories* → `Lauramora-website`
   - **Permissions → Repository permissions → Contents**: *Read and write*
   - **Expiration**: hasta 1 año (hay que renovarlo al caducar)
3. Copiar el token (solo se muestra una vez) y guardarlo en un gestor de
   contraseñas.

### Usarlo

Abrir <https://lauramoramicropigmentacion.com/admin>, elegir la opción de
**token de acceso personal** y pegarlo. El navegador lo recuerda; solo hay que
volver a pegarlo cuando el token caduque o se cambie de dispositivo.

### Qué pasa al guardar

Sveltia hace un commit en `main` con el cambio. Eso dispara el workflow y la web
se actualiza sola. Las fotos subidas van a `public/uploads/`.

---

## Editar el panel en local (sin GitHub)

Se puede tocar todo el contenido en el ordenador antes de publicar nada:

1. Usar **Google Chrome o Microsoft Edge** (hace falta la File System Access API).
2. Con el servidor en marcha (`npm run dev`), abrir
   **http://localhost:4321/admin/index.html**.
3. Pulsar **«Work with Local Repository»** y seleccionar la carpeta del proyecto.
4. Los cambios se guardan directamente en `src/data/*.json` y las fotos en
   `public/uploads/`.

Nota: en local la URL es `/admin/index.html`; ya publicada, `/admin` funciona
igual.

---

## Qué es editable y qué no

Editable desde `/admin`: contacto y datos del estudio, servicios y precios,
preguntas frecuentes, formaciones, opiniones de clientas y galería antes/después.

En código (diseño y textos estructurales): titulares, sección «Qué es», el
proceso y «Sobre mí». Es intencionado — así el panel queda simple y la web no
se rompe.

## Fotos

Las fotos de la galería se suben desde `/admin` (van a `public/uploads/`).
Los retratos de Laura del hero y de «Sobre mí» viven en `src/assets/`; ver
`src/assets/LEEME.txt`.

## Diseño

Concepto «el trazo»: los pelos dibujados a mano como identidad; el motivo SVG
se dibuja solo al cargar. Tipografías Cormorant Garamond + Jost. Colores y
espaciado se controlan desde las variables en `src/styles/global.css`.

## Estructura

```
src/
├─ data/                        contenido editable (JSON)  ← el CMS escribe aquí
├─ assets/                      retratos (optimizados por Astro)
├─ layouts/Layout.astro
├─ pages/index.astro
├─ styles/global.css
└─ components/                  secciones de la web
public/
├─ admin/                       panel de contenido (Sveltia CMS)
├─ uploads/                     fotos subidas desde el panel
└─ CNAME                        dominio propio de GitHub Pages
.github/workflows/astro.yml     build + deploy a GitHub Pages
```
