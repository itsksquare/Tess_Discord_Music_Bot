const BaseCommand = require("../../utils/structures/BaseCommand");
const { Utils } = require("erela.js");

module.exports = class NowplayingCommand extends BaseCommand {
  constructor() {
    super("nowplaying", "music", ["np"]);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Now Playing",
        message.author,
        message.channel,
        message.guild
      );
      const player = client.music.players.get(message.guild.id);
      if (!player || !player.queue[0])
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description: `There is no music currently being played by Tess on this server.`,
          },
        });
      const vidurl = player.queue[0].uri;
      const results = vidurl.match("[\\?&]v=([^&#]*)");
      const video = results === null ? url : results[1];
      const thumburl = `http://img.youtube.com/vi/${video}/0.jpg`;
      return message.channel.send({
        embed: {
          color: client.color.tessorange,
          description: `**[${player.queue[0].title}](${player.queue[0].uri})**`,
          title: `NOW PLAYING`,
          thumbnail: {
            url: thumburl,
          },
          fields: [
            {
              name: "**Author:**",
              value: player.queue[0].author,
              inline: true,
            },
            {
              name: "**Link:**",
              value: `[Link](${player.queue[0].uri})`,
              inline: true,
            },
            {
              name: "**Duration:**",
              value: Utils.formatTime(player.queue[0].duration),
              inline: true,
            },
            {
              name: "**Requested By:**",
              value: player.queue[0].requester,
              inline: true,
            },
          ],
        },
      });
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Now Playing"
      );
    }
  }
};
