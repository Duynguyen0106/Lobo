# $LOBO — The Black Maned Wolf

Promotional website for **$LOBO**, the Solana memecoin inspired by the viral black maned wolf.

## Contract Address

```
k6BE8rsFShzuQ4t2Q5cfpjCdQFFerfqex8Me7Wupump
```

## Run Locally

```bash
# Python
python3 -m http.server 8080

# or Node
npx serve .
```

Then open [http://localhost:8080](http://localhost:8080).

## Deploy

### GitHub Pages (recommended)

1. Enable Pages: [Repo Settings → Pages](https://github.com/Duynguyen0106/Lobo/settings/pages) → Source: **GitHub Actions**
2. Push to `main` — the workflow deploys automatically
3. Live at: **https://duynguyen0106.github.io/Lobo/**

### Vercel

**Do not use "Redeploy" on the old prebuilt deployment** — create a new one instead:

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Open your **Lobo** project → **Settings** → **Git**
3. Click **Connect Git Repository** → select **Duynguyen0106/Lobo**
4. Set **Production Branch** to `main`, leave **Build Command** empty, **Output Directory** as `.`
5. Go to **Deployments** → **Create Deployment** → choose branch `main` → **Deploy**

Or delete the old project and re-import: [vercel.com/new](https://vercel.com/new) → Import **Duynguyen0106/Lobo** → Deploy.

**CLI (from your machine):**
```bash
git clone https://github.com/Duynguyen0106/Lobo.git && cd Lobo
npx vercel login
npx vercel link
npx vercel deploy --prod
```

## Links

- [Jupiter Swap](https://jup.ag/swap/SOL-k6BE8rsFShzuQ4t2Q5cfpjCdQFFerfqex8Me7Wupump)
- [DexScreener](https://dexscreener.com/solana/k6BE8rsFShzuQ4t2Q5cfpjCdQFFerfqex8Me7Wupump)

## Telegram

Full group setup guide (buy bots, alerts, moderation): [telegram/SETUP.md](telegram/SETUP.md)

Community bot: [telegram/bot](telegram/bot)
