const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const logger = require('./logger');

// Initialize the client with the required intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async readyClient => {
	logger.info(`Discord bot online (${readyClient.user.tag})`);
});

client.login(process.env.BOT_TOKEN);

async function notify(message, user) {
  if (!user) {
    throw new Error('No user provided');
  }
  if (!process.env[user]) {
    throw new Error(`No user id specified for ${user}.`);
  }

  try {
    const discordUser = await client.users.fetch(process.env[user]);
    if (!discordUser) {
      throw new Error(`No Discord user found for ${user} (${process.env[user]})`);
    }
    await discordUser.send(message);
    logger.info(`Sent message to ${discordUser.id}: ${message}`);
  } catch (err) {
    logger.error(err);
  }
}

module.exports = {
  notify,
}