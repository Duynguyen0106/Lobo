# LOBO Community Telegram Bot

Lightweight community bot for the $LOBO group. **Not a trading bot** — members use Trojan/Maestro/Jupiter to buy.

## Features

- `/price` — live price from DexScreener
- `/ca` — contract address
- `/buy` — buy instructions + Jupiter/Trojan buttons
- `/chart` — DexScreener link
- `/links` — all official links
- Welcome message when new members join

## Setup

1. Create bot with [@BotFather](https://t.me/BotFather) → `/newbot`
2. Copy token to `.env`:

```bash
cp .env.example .env
# TELEGRAM_BOT_TOKEN=123456:ABC...
```

3. Install and run:

```bash
npm install
npm start
```

4. Add bot to your Telegram group
5. In BotFather: **Group Privacy → Turn off** (so `/price` works in groups)
6. Make bot a group admin (for welcome messages)

## Deploy

Set `TELEGRAM_BOT_TOKEN` as an environment variable on Railway, Render, or Fly.io. Point the service root to `telegram/bot`.

## Full group setup

See [../SETUP.md](../SETUP.md) for buy bots, Maestro Buy Bot alerts, moderation, and pinned messages.
