const { Command } = require('discord-akairo');
const { oneLine } = require('common-tags');

module.exports = class ReloadCommand extends Command {
  constructor() {
    super('reload', {
      aliases: ['reload'],
      ownerOnly: true,
      description: 'Reloads modules. Takes one argument; either the id or the class name of the module can be used.',
      split: 'none',
      args: [{
        id: 'module',
        type: module => {
          let allModules = this.handler.modules.concat(this.client.listenerHandler.modules, 
            this.client.inhibitorHandler.modules);

          allModules = allModules.filter(m => m.id === module || m.constructor.name === module);

          return allModules.size !== 1 ? null : allModules.first();
        },
        prompt: {
          start: msg => `${msg.author}, what module would you like to reload?`,

          retry: msg => `${msg.author}, that's not a valid module (or there are two matching modules). Try again.`
        }
      }]
    });
  }

  async exec(msg, args) {
    try {

      args.module.reload();

      return msg.channel.send(`${msg.author}, I reloaded the ${args.module.constructor.name} module for you.`);

    } catch(e) {

      console.log(e);

      return msg.channel.send(oneLine`${msg.author}, I couldn't reload the ${args.module.constructor.name} module.
      Check the console for the error.`);

    }
  }
};