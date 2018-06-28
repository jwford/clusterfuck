const { Listener } = require('discord-akairo');

module.exports = class CommandCooldownListener extends Listener {
  constructor() {
    super('commandCooldown', {
      emitter: 'commandHandler',
      eventName: 'commandCooldown'
    });
  }

  exec(msg) {
    return msg.react('🕙');
  }
};