const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class JoinCommand extends BaseCommand {
  constructor() {
    super("join", "music", ["j"]);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Join",
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
      if (player && player.playing && uservc != player.voiceChannel)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description:
              "Tess is already playing music in a different channel.",
          },
        });
      if (player && player.playing && uservc == player.voiceChannel)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description: "Tess is already playing music in your channel.",
          },
        });
      if (!uservc.viewable)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description: "I do not have permissions to view this channel.",
          },
        });
      if (!uservc.joinable)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description: "I do not have permissions to join this channel.",
          },
        });
      if (!uservc.speakable)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description: "I do not have permissions to speak in this channel.",
          },
        });
      if (!player) {
        const player = client.music.players.spawn({
          guild: message.guild,
          voiceChannel: uservc,
          textChannel: message.channel,
        });
      }
      await message.react("👌");
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Join"
      );
    }
  }
};
