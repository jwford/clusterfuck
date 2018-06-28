const { Command } = require('discord-akairo');

module.exports = class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping'],
      description: 'Checks your ping to the bot.'
    });
  }

  async exec(msg) {
    const pingMsg = await msg.channel.send('Hello?');

    pingMsg.edit(`${msg.author}, your ping is ${pingMsg.createdTimestamp - msg.createdTimestamp}ms.`);
  }
};