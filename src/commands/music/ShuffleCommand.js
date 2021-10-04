const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class ShuffleCommand extends BaseCommand {
  constructor() {
    super("shuffle", "music", []);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Shuffle",
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
      await player.queue.shuffle();
      message.react("👌");
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Shuffle"
      );
    }
  }
};
