const { Client, Events, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const logger = require('./logger');

// Initialize the client with the required intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async readyClient => {
	logger.info(`Discord bot online (${readyClient.user.tag})`);
});

client.login(process.env.BOT_TOKEN);

async function notify(message) {
  if (!process.env.USER_ID) {
    throw new Error('No user id specified.');
  }

  try {
    const user = await client.users.fetch(process.env.USER_ID);
    await user.send(message);
    logger.info(`Sent message to ${user.id}: ${message}`);
  } catch (err) {
    logger.error(err);
  }
}

module.exports = {
  notify,
}