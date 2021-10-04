const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class UptimeCommand extends BaseCommand {
  constructor() {
    super("uptime", "bot", []);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Uptime",
        message.author,
        message.channel,
        message.guild
      );
      let days = Math.floor(client.uptime / 86400000);
      let hours = Math.floor(client.uptime / 3600000) % 24;
      let minutes = Math.floor(client.uptime / 60000) % 60;
      let seconds = Math.floor(client.uptime / 1000) % 60;
      message.channel.send({
        embed: {
          color: client.color.tessorange,
          description: `I have been online for \`${days}\` **days** \`${hours}\` **hours** \`${minutes}\` **minutes** \`${seconds}\` **seconds**`,
        },
      });
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Uptime"
      );
    }
  }
};
