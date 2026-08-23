import { DiscordSender } from 'kai-discord-sender';

import logger from './logger';

const sender = new DiscordSender({ botToken: process.env.BOT_TOKEN! });

export interface NotifyResult {
  error?: boolean;
  success?: boolean;
  message?: string;
}

export async function notify(message: string, notifyUser?: string): Promise<NotifyResult> {
  const noUserSpecified = !notifyUser;
  const user = notifyUser || process.env.DEFAULT_USER;

  if (!user) {
    throw new Error('No user set.');
  }

  const discordUserId = process.env[user];
  if (!discordUserId) {
    return {
      error: true,
      message: `No user id specified for ${user}.`,
    };
  }

  await sender.send(discordUserId, message);

  logger.info(`Sent message to ${discordUserId} (${user})${noUserSpecified ? ' (default user)' : ''}: ${message}`);

  return {
    success: true,
  };
}
