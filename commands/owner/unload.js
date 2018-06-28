const { Command } = require('discord-akairo');

module.exports = class UnloadCommand extends Command {
  constructor() {
    super('unload', {
      aliases: ['unload'],
      ownerOnly: true,
      description: 'Unloads modules. The id or the class name of the module can be used.',
      split: 'none',
      args: [{
        id: 'module',
        type: module => {
          let allModules = this.handler.modules.concat(this.client.listenerHandler.modules, 
            this.client.inhibitorHandler.modules);

          allModules = allModules.filter(m => m.id === module.toLowerCase() || m.constructor.name === module);

          return allModules.size !== 1 ? null : allModules.first();
        },
        prompt: {
          start: msg => `${msg.author}, what module would you like to unload?`,

          retry: msg => `${msg.author}, that's not a valid module (or there's more than one matching module.`
        }
      }]
    });
  }

  exec(msg, args) {
    try {

      args.module.remove();

      return msg.channel.send(`${msg.author}, I unloaded the ${args.module.constructor.name} module.`);

    } catch(e) {

      console.log(e);

      return msg.channel.send(`${msg.author}, I couldn't unload the ${args.module.constructor.name} module.`);
    }
  }
};