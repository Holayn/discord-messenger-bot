# discord-bot-messenger

An npm-workspaces monorepo for sending Discord DMs to configured users, made up of:

- [packages/kai-discord-sender](packages/kai-discord-sender) — a standalone wrapper around discord.js for sending Discord DMs from a bot connection. See [packages/kai-discord-sender/README.md](packages/kai-discord-sender/README.md) for usage.
- [packages/service](packages/service) — the Express service, which depends on `kai-discord-sender` instead of talking to discord.js directly.

## Configuration

Ensure a `packages/service/.env` file is created (see `packages/service/sample.env`).

This file should contain users (can be any string) mapped to Discord user ids. These are used to notify the appropriate Discord user when calling the API - the Discord user id will be notified according to the passed user.

## Running

```
npm install
npm run build
npm start      # or: npm run dev
```
