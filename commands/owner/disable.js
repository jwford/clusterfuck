const { Command } = require('discord-akairo');

module.exports = class DisableCommand extends Command {
  constructor() {
    super('disable', {
      aliases: ['disable'],
      ownerOnly: true,
      description: 'Disables modules. Either the id or the class name of the module can be used.',
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
          start: msg => `${msg.author}, what module would you like to disable?`,

          retry: msg => `${msg.author}, that's not a valid module (or there's more than one matching module).`
        }
      }]
    });
  }

  exec(msg, args) {
    try {
      
      args.module.disable();

      return msg.channel.send(`${msg.author}, I disabled the ${args.module.constructor.name} module.`);

    } catch(e) {
      
      console.log(e);

      return msg.channel.send(`${msg.author}, I couldn't disable the ${args.module.constructor.name} module.`);
    }
  }
};