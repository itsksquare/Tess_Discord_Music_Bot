const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class StopCommand extends BaseCommand {
  constructor() {
    super("stop", "music", ["clear"]);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Stop",
        message.author,
        message.channel,
        message.guild
      );
      const player = client.music.players.get(message.guild.id);
      if (!player)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description:
              "There is no music currently being played by Tess on this server.",
          },
        });
      let uservc = message.member.voice.channel;
      if (!uservc)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description:
              "Please join a voice channel and then use this command.",
          },
        });
      if (uservc != player.voiceChannel)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description:
              "You are not in the same voice channel that Tess is in.",
          },
        });
      await client.music.players.destroy(message.guild.id);
      message.react("🛑");
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Stop"
      );
    }
  }
};
