const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class LoopCommand extends BaseCommand {
  constructor() {
    super("loop", "music", ["loopqueue", "queueloop"]);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Loop",
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
      if (player.queueRepeat) {
        await player.setQueueRepeat(false);
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description: `Queue looping is now **disabled**.`,
          },
        });
      } else {
        await player.setQueueRepeat(true);
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description: `Queue looping is now **enabled**.`,
          },
        });
      }
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Loop"
      );
    }
  }
};
