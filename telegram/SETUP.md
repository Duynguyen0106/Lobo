# $LOBO Telegram Group — Complete Setup Guide

Everything you need to launch the official $LOBO Telegram community with buy bots, alerts, and moderation.

## Contract (save this)

```
k6BE8rsFShzuQ4t2Q5cfpjCdQFFerfqex8Me7Wupump
```

---

## Step 1 — Create the Telegram group

1. Open Telegram → **New Group**
2. Name: **$LOBO — The Black Maned Wolf** (or **LOBO Official**)
3. Add 1–2 trusted admins (you can add bots next)
4. **Group type:** Public recommended for memecoins
   - Tap group name → **Edit** → **Group Type** → **Public Group**
   - Set username: `@LoboWolfSol` or similar (check availability)
5. Upload group photo: use `assets/lobo-wolf.jpg` from this repo
6. Set description — copy from `content/group-description.txt`

---

## Step 2 — Buy bots (how members actually buy)

You do **not** build a custom buy bot for trading. Solana memecoins use established Telegram trading bots. Add these to your group **info** or **pinned message** so members know where to buy.

### Trojan (most popular on Solana)

1. Open **only** from official link: [@TrojanOnSolana](https://t.me/TrojanOnSolana)
2. Send `/start` — bot creates a Solana wallet
3. **Back up your private key** immediately
4. Send SOL to the bot wallet
5. Paste the LOBO CA in chat:

   ```
   k6BE8rsFShzuQ4t2Q5cfpjCdQFFerfqex8Me7Wupump
   ```

6. Tap a buy button (0.1 SOL, 0.5 SOL, etc.)

### Maestro (trading only — not group alerts)

**Trading bot:** [@Maestro](https://t.me/maestro) — `/start`, fund wallet, paste CA.

> ⚠️ **@MaestroBuyBot only supports ETH and BSC** for group buy alerts — not Solana. Use the bots in Step 3 instead.

### Jupiter (web, no bot wallet)

Share this link in the group — safest for members who use Phantom/Solflare:

https://jup.ag/swap/SOL-k6BE8rsFShzuQ4t2Q5cfpjCdQFFerfqex8Me7Wupump

---

## Step 3 — Live buy alerts in the group (Solana)

$LOBO is on **Solana**, so you need a Solana-specific buy bot. Maestro Buy Bot only shows ETH/BSC — skip it.

### Option A — Solana Buy Bot (recommended, free)

Made by [@MyroSOL](https://t.me/MyroSOL). Built specifically for Solana token buy alerts in groups.

1. Open [@OfficialSolanaBuyBot](https://t.me/OfficialSolanaBuyBot)
2. **Add to Group** → select your LOBO group
3. Make the bot a **group admin**
4. **Important:** You need at least **2 real members** in the group (not just bots) or features won't work — add a friend or second account
5. In the group, send `/start` to the bot
6. Send `/add` and paste the contract when prompted:

   ```
   k6BE8rsFShzuQ4t2Q5cfpjCdQFFerfqex8Me7Wupump
   ```

7. Send `/settings` → select LOBO → set **Min. Buy** threshold (e.g. `$10` or `$25` USD)

> If the bot doesn't respond, repeat the command quickly — Telegram bots time out if you wait too long between steps.

### Option B — RayBot (buy/sell + price alerts)

1. Open [@ray_red_bot](https://t.me/ray_red_bot)
2. Add it to your LOBO group
3. In the group send: `/start` then `/activate`
4. Add the token:

   ```
   /add k6BE8rsFShzuQ4t2Q5cfpjCdQFFerfqex8Me7Wupump
   ```

5. In DM with RayBot: **Tokens** → configure **Size** (min USD for buy/sell alerts) and **Price Change** %
6. Fine-tune in the [RayBot web panel](https://docs.raybot.app/start/web) under your group's destination

Free tier limits apply (token count varies by plan).

---

## Step 4 — LOBO community bot (price, CA, welcome)

This repo includes a lightweight **community bot** (not a trading bot). It handles `/price`, `/ca`, `/buy`, welcome messages, and quick links.

### Create the bot

1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Send `/newbot`
3. Name: `LOBO Wolf`
4. Username: `LoboWolfSol_bot` (or available variant)
5. Copy the **HTTP API token**

### Run locally

```bash
cd telegram/bot
cp .env.example .env
# Edit .env — paste your TELEGRAM_BOT_TOKEN

npm install
npm start
```

### Deploy (free options)

- **Railway** / **Render** / **Fly.io** — connect repo, set `telegram/bot` as root, add `TELEGRAM_BOT_TOKEN` env var
- Keep the process running 24/7 for welcome messages and commands

### Add to your group

1. Add `@YourBotUsername` to the LOBO group
2. Make it **admin** (post messages, delete messages optional)
3. Disable privacy mode in BotFather if commands should work in groups:
   - `/mybots` → your bot → **Bot Settings** → **Group Privacy** → **Turn off**
4. Test in group: `/price`, `/ca`, `/buy`

---

## Step 5 — Moderation & anti-spam

Add these bots to protect the group from scams and spam:

| Bot | Purpose | Link |
|-----|---------|------|
| **Rose** | Rules, warns, bans | [@MissRose_bot](https://t.me/MissRose_bot) |
| **Combot** | Analytics, anti-raid | [@combot](https://t.me/combot) |
| **Shieldy** | Captcha for new members | [@shieldy_bot](https://t.me/shieldy_bot) |

### Recommended Rose rules

After adding Rose as admin, send in group:

```
/setrules
1. No scam links or fake CA
2. Official CA only: k6BE8rsFShzuQ4t2Q5cfpjCdQFFerfqex8Me7Wupump
3. No DMing members (admins never DM first)
4. English only / be respectful
5. No shilling other tokens
```

---

## Step 6 — Pin the welcome message

Copy `content/pinned-message.txt` and pin it in the group.

Pin these links in group **description** or **topics**:

- Website (Vercel / GitHub Pages)
- [DexScreener](https://dexscreener.com/solana/k6BE8rsFShzuQ4t2Q5cfpjCdQFFerfqex8Me7Wupump)
- [X Community](https://x.com/i/communities/2034305559038472701)
- [Jupiter Buy](https://jup.ag/swap/SOL-k6BE8rsFShzuQ4t2Q5cfpjCdQFFerfqex8Me7Wupump)

---

## Step 7 — Admin checklist

- [ ] Public group created with photo + description
- [ ] Pinned message with CA and buy links
- [ ] Solana Buy Bot ([@OfficialSolanaBuyBot](https://t.me/OfficialSolanaBuyBot)) posting buy alerts — or RayBot
- [ ] LOBO community bot running (`/price`, `/ca`, welcome)
- [ ] Rose or Shieldy for moderation
- [ ] All admins verified — **never DM for "support"**
- [ ] Scam warning in pinned: only one official CA
- [ ] X Community linked in description

---

## Security warnings (pin these)

- **Admins will never DM you first** — any DM offering "support" or "airdrop" is a scam
- **Only one CA:** `k6BE8rsFShzuQ4t2Q5cfpjCdQFFerfqex8Me7Wupump`
- **Back up your Trojan/Maestro wallet key** — losing Telegram access = losing funds if no backup
- **Start small** — test with 0.01–0.1 SOL before larger buys

---

## Quick reference

| What | Where |
|------|-------|
| Buy (bot) | [@TrojanOnSolana](https://t.me/TrojanOnSolana) → paste CA |
| Buy (web) | [Jupiter](https://jup.ag/swap/SOL-k6BE8rsFShzuQ4t2Q5cfpjCdQFFerfqex8Me7Wupump) |
| Group buy alerts | [@OfficialSolanaBuyBot](https://t.me/OfficialSolanaBuyBot) or [@ray_red_bot](https://t.me/ray_red_bot) |
| Price chart | [DexScreener](https://dexscreener.com/solana/k6BE8rsFShzuQ4t2Q5cfpjCdQFFerfqex8Me7Wupump) |
| X Community | [Join](https://x.com/i/communities/2034305559038472701) |
