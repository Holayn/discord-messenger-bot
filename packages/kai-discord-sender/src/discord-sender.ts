import { Client, GatewayIntentBits, type User as DiscordUser } from 'discord.js';

export interface DiscordSenderConfig {
  botToken: string;
}

/** Delivers a message to a Discord user by id. */
export type SendDiscordDM = (discordUserId: string, message: string) => Promise<void>;

/**
 * Sends Discord DMs using a single persistent bot connection.
 *
 * The bot must share a guild with the target user (or the user must allow
 * DMs from server members), or `send()` will reject with a Discord API
 * error — this is a Discord platform restriction, not something this
 * package can work around.
 */
export class DiscordSender {
  private _client: Client;
  private _ready: Promise<void>;

  constructor(config: DiscordSenderConfig) {
    this._client = new Client({ intents: [GatewayIntentBits.Guilds] });

    this._ready = new Promise<void>((resolve, reject) => {
      this._client.once('clientReady', () => resolve());
      this._client.once('error', reject);
      this._client.login(config.botToken).catch(reject);
    });
  }

  async send(discordUserId: string, message: string): Promise<void> {
    await this._ready;
    const user: DiscordUser = await this._client.users.fetch(discordUserId);
    await user.send(message);
  }

  /** Closes the bot connection. The instance cannot be reused after this. */
  async close(): Promise<void> {
    await this._client.destroy();
  }
}
