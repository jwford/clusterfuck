const { Listener } = require('discord-akairo');

module.exports = class CommandBlockedListener extends Listener {
  constructor() {
    super('commandBlocked', {
      emitter: 'commandHandler',
      eventName: 'commandBlocked'
    });
  }

  exec(msg) {
    return msg.react('🚫');
  }
};