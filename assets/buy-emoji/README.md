# $LOBO Buy Emoji & Alert Media

Custom buy alert assets based on the black maned wolf photo (glowing orange eyes).

## Files

| File | Use |
|------|-----|
| `lobo-buy-emoji.png` | Main emoji (512×512) |
| `lobo-buy-emoji-64.png` | Small icon / favicon |
| `lobo-buy-emoji-128.png` | Telegram sticker size |
| `lobo-buy-emoji.svg` | Scalable web icon |
| `lobo-buy-alert-media.jpg` | Buy bot alert image (512×512 crop from photo) |

## Telegram buy bot setup

### Unicode emoji (Solana Buy Bot step emoji)

In **@OfficialSolanaBuyBot** → `/settings` → LOBO → set emoji to:

```
🐺
```

Or use the glowing wolf combo:

```
👁️‍🗨️🐺
```

Set **buy step** (e.g. `$10`) — each step adds another emoji to bigger buys.

### Custom image (BBBuyBot)

1. Open [@BBBuyBot](https://t.me/BBBuyBot) in your group
2. `/start` → **Media** → upload `lobo-buy-alert-media.jpg`
3. Set **Token** → paste LOBO CA
4. Set **Min buy** threshold

### RayBot

RayBot uses text alerts — add 🐺 in group topic name or pin the emoji PNG as group sticker.

## Website / branding

```html
<img src="assets/buy-emoji/lobo-buy-emoji-128.png" alt="$LOBO" width="32" height="32">
```

## Recommended buy tiers (emoji steps)

| Buy size (USD) | Display |
|----------------|---------|
| $10–$49 | 🐺 |
| $50–$199 | 🐺🐺 |
| $200–$499 | 🐺🐺🐺 |
| $500+ | 🐺🐺🐺🐺🔥 |

Configure step size in your buy bot settings to match.
