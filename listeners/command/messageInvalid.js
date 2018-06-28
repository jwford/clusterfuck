const { Listener } = require('discord-akairo');

module.exports = class MessageInvalidListener extends Listener {
  constructor() {
    super('messageInvalid', {
      emitter: 'commandHandler',
      eventName: 'messageInvalid'
    });
  }

  exec(msg) {
    if (msg.content.startsWith(this.client.commandHandler.prefix(msg))) return msg.react('❓');
  }
};