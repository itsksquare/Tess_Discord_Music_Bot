const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class LeaveserverCommand extends BaseCommand {
  constructor() {
    super("leaveserver", "owner", []);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Leave Server",
        message.author,
        message.channel,
        message.guild
      );
      if (message.author.id != client.owner) return;
      if (!args[0]) return message.guild.leave();
      const server = client.guilds.cache.get(args[0]);
      if (!server) return message.reply("That server was not found.");
      server.leave();
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Leave Server"
      );
    }
  }
};
