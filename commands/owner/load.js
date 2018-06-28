const { Command } = require('discord-akairo');
const fs = require('fs');
const path = require('path');

module.exports = class LoadCommand extends Command {
  constructor() {
    super('load', {
      aliases: ['load'],
      ownerOnly: true,
      description: 'Loads modules. Only the module filepath (e.g. [type]/[category]/[id]) can be used.',
      split: 'none',
      args: [{
        id: 'filepath',
        type: filepath => {
          return fs.existsSync(path.join(__dirname, '../..', `${filepath}.js`)) ? true : null;
        },
        prompt: {
          start: msg => `${msg.author}, what is the filepath of the module you'd like to load?`,

          retry: msg => `${msg.author}, that's not a valid filepath. Try again.`
        }
      }]
    });
  }

  exec(msg, args) {
    let handler; 

    switch(args.filepath.split('/')[0]) {
    case 'commands':
      handler = this.handler;
      break;
    case 'listeners':
      handler = this.client.listenerHandler;
      break;
    case 'inhibitors':
      handler = this.client.inhibitorHandler;
      break;
    }

    try {

      const module = handler.load(path.join(__dirname, '../..', `${args.filepath}.js`));

      return msg.channel.send(`${msg.author}, I loaded the ${module.constructor.name} module.`);

    } catch (e) {

      console.log(e);

      return msg.channel.send(`${msg.author}, I couldn't load that module.`);

    }
  }
};