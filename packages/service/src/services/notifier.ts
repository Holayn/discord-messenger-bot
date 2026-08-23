import { DiscordSender } from 'kai-discord-sender';

import logger from './logger';

const sender = new DiscordSender({ botToken: process.env.BOT_TOKEN! });

export async function notify(message: string, user?: string): Promise<void> {
  const noIdSpecified = !user;
  const id = user || process.env.DEFAULT_DISCORD_USER_ID;

  if (!id) {
    throw new Error('No Discord user id set.');
  }

  await sender.send(id, message);

  logger.info(`Sent message to ${id}${noIdSpecified ? ' (default user)' : ''}: ${message}`);
}
