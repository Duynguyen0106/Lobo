import { Telegraf, Markup } from 'telegraf';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const GROUP_ID = process.env.GROUP_ID;
const CA = 'k6BE8rsFShzuQ4t2Q5cfpjCdQFFerfqex8Me7Wupump';
const DEX_API = `https://api.dexscreener.com/latest/dex/tokens/${CA}`;

const LINKS = {
  jupiter: `https://jup.ag/swap/SOL-${CA}`,
  dexscreener: `https://dexscreener.com/solana/${CA}`,
  trojan: 'https://t.me/TrojanOnSolana',
  maestro: 'https://t.me/maestro',
  maestroBuyBot: 'https://t.me/MaestroBuyBot',
  rayBot: 'https://t.me/ray_red_bot',
  xCommunity: 'https://x.com/i/communities/2034305559038472701',
  xProfile: 'https://x.com/manewolf_lobo',
};

if (!TOKEN) {
  console.error('Missing TELEGRAM_BOT_TOKEN. Copy .env.example to .env and add your token.');
  process.exit(1);
}

const bot = new Telegraf(TOKEN);

function buyKeyboard() {
  return Markup.inlineKeyboard([
    [Markup.button.url('🛒 Buy on Jupiter', LINKS.jupiter)],
    [
      Markup.button.url('⚡ Trojan Bot', LINKS.trojan),
      Markup.button.url('🎯 Maestro', LINKS.maestro),
    ],
    [Markup.button.url('📊 DexScreener', LINKS.dexscreener)],
  ]);
}

function formatUsd(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return '—';
  if (n >= 1) return `$${n.toLocaleString('en-US', { maximumFractionDigits: 4 })}`;
  if (n >= 0.0001) return `$${n.toFixed(8)}`;
  return `$${n.toExponential(2)}`;
}

function formatCompact(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return '—';
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

async function fetchPrice() {
  const res = await fetch(DEX_API);
  if (!res.ok) throw new Error('Price API error');
  const data = await res.json();
  const pair = data.pairs?.[0];
  if (!pair) throw new Error('No pair data');
  return pair;
}

async function priceMessage() {
  const pair = await fetchPrice();
  const change = pair.priceChange?.h24;
  const changeStr = Number.isFinite(change)
    ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`
    : '—';
  const emoji = Number(change) >= 0 ? '🟢' : '🔴';

  return `${emoji} <b>$LOBO — The Black Maned Wolf</b>

💰 Price: <b>${formatUsd(pair.priceUsd)}</b>
📈 24h: <b>${changeStr}</b>
📊 MCap: ${formatCompact(pair.marketCap || pair.fdv)}
💧 Liquidity: ${formatCompact(pair.liquidity?.usd)}
📦 24h Vol: ${formatCompact(pair.volume?.h24)}

<i>Data from DexScreener</i>`;
}

const intro = `🐺 <b>$LOBO — The Black Maned Wolf</b>

The viral black maned wolf memecoin on Solana.

Use the commands below or tap the buttons.`;

bot.start(async (ctx) => {
  await ctx.reply(intro, {
    parse_mode: 'HTML',
    ...buyKeyboard(),
  });
});

bot.command('price', async (ctx) => {
  try {
    await ctx.reply(await priceMessage(), { parse_mode: 'HTML', ...buyKeyboard() });
  } catch {
    await ctx.reply('Could not fetch price. Check DexScreener:', {
      ...Markup.inlineKeyboard([[Markup.button.url('DexScreener', LINKS.dexscreener)]]),
    });
  }
});

bot.command('ca', async (ctx) => {
  await ctx.reply(
    `📋 <b>Official Contract Address</b>\n\n<code>${CA}</code>\n\n⚠️ Tap to copy. Verify before every buy.`,
    { parse_mode: 'HTML' }
  );
});

bot.command('buy', async (ctx) => {
  await ctx.reply(
    `🛒 <b>How to buy $LOBO</b>

<b>1. Trojan Bot</b> (easiest in Telegram)
Open @TrojanOnSolana → /start → fund with SOL → paste CA:
<code>${CA}</code>

<b>2. Jupiter</b> (use your own wallet)
Tap the button below.

<b>3. Maestro</b>
@maestro → paste CA`,
    { parse_mode: 'HTML', ...buyKeyboard() }
  );
});

bot.command('chart', async (ctx) => {
  await ctx.reply('📊 Live chart on DexScreener:', {
    ...Markup.inlineKeyboard([[Markup.button.url('Open Chart', LINKS.dexscreener)]]),
  });
});

bot.command('links', async (ctx) => {
  await ctx.reply('🔗 <b>$LOBO Links</b>', {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.url('🛒 Jupiter', LINKS.jupiter)],
      [Markup.button.url('📊 DexScreener', LINKS.dexscreener)],
      [Markup.button.url('⚡ Trojan', LINKS.trojan), Markup.button.url('🎯 Maestro', LINKS.maestro)],
      [Markup.button.url('🐦 X Community', LINKS.xCommunity)],
      [Markup.button.url('📢 Buy/Sell Alerts', LINKS.maestroBuyBot)],
      [Markup.button.url('📡 RayBot Tracker', LINKS.rayBot)],
    ]),
  });
});

bot.command('help', async (ctx) => {
  await ctx.reply(
    `<b>Commands</b>
/price — live price
/ca — contract address
/buy — how to buy
/chart — DexScreener
/links — all links
/help — this message`,
    { parse_mode: 'HTML' }
  );
});

bot.on('new_chat_members', async (ctx) => {
  if (GROUP_ID && String(ctx.chat.id) !== GROUP_ID) return;

  const members = ctx.message.new_chat_members.filter((m) => !m.is_bot);
  for (const member of members) {
    const name = member.first_name || 'wolf';
    await ctx.reply(
      `🐺 Welcome to the pack, <b>${name}</b>!

Read the <b>pinned message</b> for the official CA.

• /price — live price
• /buy — buy links
• /ca — contract address

⚠️ Admins never DM you.`,
      { parse_mode: 'HTML' }
    );
  }
});

bot.catch((err) => console.error('Bot error:', err));

bot.launch().then(() => console.log('🐺 LOBO bot running'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
