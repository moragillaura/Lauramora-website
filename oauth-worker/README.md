# Worker de login (Sveltia CMS Authenticator)

Permite que Laura entre en `/admin` pulsando **«Sign in with GitHub»**, sin
manejar tokens. Es el worker OFICIAL de Sveltia (MIT), incluido en `src/index.js`.

## Desplegar (una vez)

1. **Crear una GitHub OAuth App**
   GitHub → Settings → Developer settings → **OAuth Apps → New**:
   - Homepage URL: `https://tudominio.com`
   - Authorization callback URL: `https://TU-WORKER.workers.dev/callback`
   Guarda el **Client ID** y genera un **Client Secret**.

2. **Ajustar dominios** en `wrangler.toml` → `ALLOWED_DOMAINS`
   (el dominio real de la web y, si usas la preview, `*.pages.dev`).

3. **Desplegar y cargar los secretos**
   ```bash
   npm install
   npx wrangler secret put GITHUB_CLIENT_ID       # pega el Client ID
   npx wrangler secret put GITHUB_CLIENT_SECRET   # pega el Client Secret
   npx wrangler deploy
   ```
   Wrangler te dará la URL del worker (`https://...workers.dev`).

4. **Conectar el panel**: en `public/admin/config.yml`, pon esa URL en
   `backend.base_url` y tu repo en `backend.repo`. Sube el cambio.

Listo: `/admin` mostrará el botón de inicio de sesión con GitHub.

## Alternativa sin worker (PAT)

Si prefieres no desplegar nada, Sveltia permite entrar con un **token personal
de GitHub** (PAT). Más simple de montar, pero Laura tendría que pegar un token
(y renovarlo cuando caduque). Para ella, el botón de GitHub del worker es más
cómodo; el PAT encaja mejor si solo edita alguien técnico.
