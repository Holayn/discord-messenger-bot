# kai-discord-sender

Minimal wrapper around [discord.js](https://discord.js.org/) for sending Discord DMs from a single persistent bot connection.

## Install

```
npm install kai-discord-sender
```

## Usage

```ts
import { DiscordSender } from 'kai-discord-sender';

const sender = new DiscordSender({ botToken: process.env.BOT_TOKEN! });

await sender.send('123456789012345678', 'Hello!');
```

- `new DiscordSender({ botToken })` opens a bot connection immediately; the constructor doesn't wait for it to become ready.
- `send(discordUserId, message)` awaits readiness internally, then fetches the user and sends the DM. Call it as many times as you like against the same `DiscordSender` instance — it reuses the one connection.
- `close()` closes the bot connection. The instance cannot be reused after calling it — construct a new `DiscordSender` if you need to send again.
- The bot must share a guild with the target user (or the user must allow DMs from server members), or `send()` rejects with a Discord API error — this is a Discord platform restriction, not something this package works around.

## API

- `DiscordSenderConfig` — `{ botToken: string }`
- `DiscordSender` — see above
- `SendDiscordDM` — `(discordUserId: string, message: string) => Promise<void>`, the type of `DiscordSender#send`, exported for typing your own wrappers/mocks

## Development

```
npm run build   # compile src/ -> dist/
npm run pack    # build, then produce an installable .tgz via `npm pack`
```
