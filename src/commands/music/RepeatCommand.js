const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class RepeatCommand extends BaseCommand {
  constructor() {
    super("repeat", "music", []);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Report",
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
      const uservc = message.member.voice.channel;
      if (!uservc)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description: "Please join a voice channel to use this command.",
          },
        });
      if (uservc != player.voiceChannel)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description: "You are not in the same channel that tess is in.",
          },
        });
      if (player.trackRepeat) {
        await player.setTrackRepeat(false);
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description: `Repeat for the song is now **disabled**.`,
          },
        });
      } else {
        await player.setTrackRepeat(true);
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description: `Repeat for the song is now **enabled**.`,
          },
        });
      }
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Report"
      );
    }
  }
};
