const { Command } = require('discord-akairo');

module.exports = class HelpCommand extends Command {
  constructor() {
    super('help', {
      aliases: ['help'],
      description: 'Provides info about the bot\'s commands.'
    });
  }

  async exec(msg) {
    const cmdFilter = cmd => {
      return (cmd.ownerOnly && !this.client.ownerID.includes(msg.author.id)) ? false : true;
    };

    const commands = this.handler.modules.filter(cmdFilter).sort();
    
    let helpMsg = '';

    for (let [id, cmd] of commands) { //eslint-disable-line no-unused-vars
      
      helpMsg += `__**${cmd.aliases[0][0].toUpperCase()}${cmd.aliases[0].slice(1)}**__\n`;

      helpMsg += `Aliases: ${cmd.aliases.join(', ')}\n`;

      helpMsg += `Category: ${cmd.category}\nDescription: ${cmd.description}\n`;

      let format = '';

      for (let i = 0; i < cmd.args.length; i++) {

        format += `<${cmd.args[i].id}> `;

      }

      helpMsg += `Format: \`${this.handler.prefix(msg)}${cmd.aliases[0]} ${format}\`\n\n`;

    }

    helpMsg += 'Note: Do not use angle brackets (`<>`) when sending a command.';

    // helpMsg = require('discord.js').Util.splitMessage(helpMsg);

    try {

      // for (let i = 0; i < helpMsg.length; i++) { await msg.author.send(helpMsg[i]); }
      await msg.author.send(helpMsg);

      return msg.channel.send(`${msg.author.username}, I sent you a DM.`);

    } catch(e) {
      
      console.log(e);

      return msg.channel.send(`${msg.author.username}, I couldn't send you a DM. Are your settings okay?`);
      
    }
  }
};