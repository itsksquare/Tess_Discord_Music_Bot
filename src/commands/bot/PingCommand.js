const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super("ping", "bot", ["ms"]);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Ping",
        message.author,
        message.channel,
        message.guild
      );
      const pingmsg = await message.channel.send("Pinging...");
      await pingmsg.edit(" ", {
        embed: {
          color: client.color.tessorange,
          description: `**PING:** ${
            pingmsg.createdTimestamp - message.createdTimestamp
          } ms\n\n**WebSocket:** ${client.ws.ping} ms`,
          footer: {
            text: "TESS",
            icon_url: client.logo.nobglogo,
          },
        },
      });
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Ping"
      );
    }
  }
};
