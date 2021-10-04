const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class InviteCommand extends BaseCommand {
  constructor() {
    super("invite", "bot", ["botinvite"]);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Invite",
        message.author,
        message.channel,
        message.guild
      );
      message.channel.send({
        embed: {
          color: client.color.tessorange,
          footer: {
            text: "TESS",
            icon_url: client.logo.nobglogo,
          },
          description: `Click __**[HERE](${await client.generateInvite(
            37084481
          )})**__ to invite TESS to your server for high quality music.`,
        },
      });
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Invite"
      );
    }
  }
};
