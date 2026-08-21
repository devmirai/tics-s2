# Pokédex

App React + Vite que consume [PokeAPI](https://pokeapi.co). Muestra los primeros 24 Pokémon con su sprite oficial.

## Scripts

| Comando           | Descripción                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Servidor de desarrollo                   |
| `npm run build`   | Build de producción en `dist/`           |
| `npm run preview` | Sirve el build localmente                |
| `npm run lint`    | ESLint                                   |
| `npm run doctor`  | React Doctor (análisis de código React)  |

## CI/CD

### Deploy (`.github/workflows/deploy.yml`)

En cada push a `main`: lint + build + deploy a GitHub Pages.

> Requiere activar Pages una sola vez: **Settings → Pages → Source: GitHub Actions**.

El `base` de Vite se resuelve solo: usa `/<nombre-del-repo>/` en CI y `/` en local.

### React Doctor (`.github/workflows/react-doctor.yml`)

- **En cada PR**: escanea los archivos cambiados y comenta los hallazgos directamente en el PR (comentario resumen + comentarios inline).
- **En cada push a `main`** (o manual vía *workflow_dispatch*): escaneo completo. Si hay problemas, abre un PR automático hacia `main` con el detalle en `react-doctor-report.md`.
- Con severidad `error`, el check falla y puede bloquear el merge si lo marcas como requerido en **Settings → Branches → Branch protection rules**.
