import { DiscordSender } from 'kai-discord-sender';

import logger from './logger';

const sender = new DiscordSender({ botToken: process.env.BOT_TOKEN! });

function getAliases(): Record<string, string> {
  return Object.fromEntries(
    (process.env.ALIASES || '')
      .split(',')
      .map((pair) => pair.split(':').map((part) => part.trim()))
      .filter(([alias, id]) => alias && id),
  );
}

export async function notify(message: string, user?: string): Promise<void> {
  const noIdSpecified = !user;
  const alias = user ? getAliases()[user] : undefined;
  const id = alias || user || process.env.DEFAULT_DISCORD_USER_ID;

  if (!id) {
    throw new Error('No Discord user id set.');
  }

  await sender.send(id, message);

  const aliasSuffix = alias ? ` (${user})` : '';
  logger.info(`Sent message to ${id}${aliasSuffix}${noIdSpecified ? ' (default user)' : ''}: ${message}`);
}
