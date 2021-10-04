const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class DisconnectCommand extends BaseCommand {
  constructor() {
    super("disconnect", "music", ["dc", "leave"]);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Disconnect",
        message.author,
        message.channel,
        message.guild
      );
      const uservc = message.member.voice.channel;
      if (!uservc)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description: "Please join a voice channel to use this command.",
          },
        });
      const player = client.music.players.get(message.guild.id);
      if (!player)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description:
              "There was an error disconnecting Tess from the voice channel. Please disconnect Tess manually.",
          },
        });
      if (player && uservc == player.voiceChannel) {
        await client.music.players.destroy(message.guild.id);
        message.react("👌");
        return;
      }
      if (uservc != player.voiceChannel)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description: "You are not in the same channel that tess is in.",
          },
        });
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Disconnect"
      );
    }
  }
};
