# Environment setup

## Local

1. Copy the example file:

   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` if you add any vars later. The app currently doesn’t require any.

## Vercel (production)

- Vercel injects `VERCEL`, `VERCEL_URL`, `VERCEL_ENV` automatically. No need to set them.
- Add any custom vars in **Vercel → Project → Settings → Environment Variables**.

## GitHub Actions (deploy-production)

For the deploy workflow you need these **repository secrets** (Settings → Secrets and variables → Actions):

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | [Vercel account → Tokens](https://vercel.com/account/tokens) — create a token with deploy access. |
| `VERCEL_ORG_ID` | From `apps/web/.vercel/project.json` after running `vercel link` in `apps/web`, or from Vercel project settings. |
| `VERCEL_PROJECT_ID` | Same as above from `project.json`. |

`.vercel/` is gitignored; keep org and project IDs only in GitHub secrets.
