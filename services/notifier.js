const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const logger = require('./logger');

// Initialize the client with the required intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async readyClient => {
	logger.info(`Discord bot online (${readyClient.user.tag})`);
});

client.login(process.env.BOT_TOKEN);

async function notify(message, notifyUser) {
  const noUserSpecified = !notifyUser;
  const user = notifyUser || process.env.DEFAULT_USER;

  if (!user) {
    throw new Error(`No user set.`);
  }
  if (!process.env[user]) {
    return {
      error: true,
      message: `No user id specified for ${user}.`,
    }
  }

  const discordUser = await client.users.fetch(process.env[user]);
  if (!discordUser) {
    return {
      error: true,
      message: `No Discord user found for ${user} (${process.env[user]})`,
    }
  }

  await discordUser.send(message);

  logger.info(`Sent message to ${discordUser.id} (${user})${noUserSpecified ? ' (default user)' : ''}: ${message}`);

  return {
    success: true,
  }
}

module.exports = {
  notify,
}