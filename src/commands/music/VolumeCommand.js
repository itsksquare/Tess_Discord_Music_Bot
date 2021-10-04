const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class VolumeCommand extends BaseCommand {
  constructor() {
    super("volume", "music", ["v", "vol"]);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Volume",
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
      if (!args[0])
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description: `**Volume: **\`${player.volume}\``,
          },
        });
      if (Number(args[0]) <= 0 || Number(args[0]) > 100)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description: "The volume may only be set from `1` to `100`",
          },
        });
      await player.setVolume(Number(args[0]));
      message.react("👌");
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Volume"
      );
    }
  }
};
