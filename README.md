# discord-bot-messenger

An npm-workspaces monorepo for sending Discord DMs to configured users, made up of:

- [packages/kai-discord-sender](packages/kai-discord-sender) — a standalone wrapper around discord.js for sending Discord DMs from a bot connection. See [packages/kai-discord-sender/README.md](packages/kai-discord-sender/README.md) for usage.
- [packages/service](packages/service) — the Express service, which depends on `kai-discord-sender` instead of talking to discord.js directly. See [packages/service/README.md](packages/service/README.md) for configuration and API docs.

## Running

```
npm install
npm run build
npm start      # or: npm run dev
```
