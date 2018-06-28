const { Listener } = require('discord-akairo');

module.exports = class CommandDisabledListener extends Listener {
  constructor() {
    super('commandDisabled', {
      emitter: 'commandHandler',
      eventName: 'commandDisabled'
    });
  }

  exec(msg) {
    return msg.react('🙊');
  }
};