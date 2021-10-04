const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class ResumeCommand extends BaseCommand {
  constructor() {
    super("resume", "music", []);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Resume",
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
      if (player.playing)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description: "The song is already playing.",
          },
        });
      player.pause(player.playing);
      await message.react("▶️");
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Resume"
      );
    }
  }
};
