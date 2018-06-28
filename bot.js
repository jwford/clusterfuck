require('dotenv').config();
const { AkairoClient } = require('discord-akairo');

const bot = new AkairoClient({
  ownerID: [],
  prefix: '',
  commandDirectory: './commands',
  listenerDirectory: './listeners',
  inhibitorDirectory: './inhibitors', //remember to create this directory manually
  automateCategories: true
});

bot.login(process.env.TOKEN);

process.on('unhandledRejection', console.error);