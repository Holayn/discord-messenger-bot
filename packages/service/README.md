# service

Express service that sends Discord DMs, backed by [kai-discord-sender](../kai-discord-sender).

## Configuration

Ensure a `.env` file is created in this directory (see `sample.env`).

`DEFAULT_DISCORD_USER_ID` is used when `POST /api/notify` is called without a `user`.

## Running

From the repo root:

```
npm install
npm run build
npm start      # or: npm run dev
```

## API

### `POST /api/notify`

Request body:

| Field     | Type     | Required | Description                                                                |
| --------- | -------- | -------- | -------------------------------------------------------------------------- |
| `message` | `string` | yes      | The DM content to send.                                                    |
| `user`    | `string` | no       | Discord user id to DM. Falls back to `DEFAULT_DISCORD_USER_ID` if omitted. |

Responses:

- `200` — message sent.
- `500` — no `user` given and `DEFAULT_DISCORD_USER_ID` isn't set, or the send itself failed (e.g. the bot can't reach that user).
