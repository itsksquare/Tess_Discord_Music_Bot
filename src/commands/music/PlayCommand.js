const BaseCommand = require("../../utils/structures/BaseCommand");
const { Utils } = require("erela.js");

module.exports = class PlayCommand extends BaseCommand {
  constructor() {
    super("play", "music", ["p"]);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Play",
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

      const query = args.join(" ");
      if (!query)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description:
              "Please provide the name or the link of the song you would link to play.",
          },
        });

      try {
        const searchresult = await client.manager.search(query, message.author);
        const tracks = searchresult.tracks.slice(0, 5);
        const track = tracks[0];
        var player = client.manager.players.get(message.guild.id);
        if (!player) {
          var player;
          player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: uservc.id,
            textChannel: message.channel.id,
          });
        }
        if (player && uservc != player.voiceChannel)
          return message.channel.send({
            embed: {
              color: client.color.tessorange,
              description:
                "You are not in the same voice channel that Tess is playing music in.",
            },
          });
        await player.connect();
        await player.queue.add(track);
        if (player.playing)
          return message.channel.send({
            embed: {
              color: client.color.tessorange,
              description: `**[${track.title}](${
                track.uri
              })**  \`${Utils.formatTime(
                player.queue[0].duration,
                true
              )}\` has been added to the queue.`,
            },
          });
        if (!player.playing) player.play();
      } catch (error) {
        console.log(error);
        message.channel.send({
          embed: {
            color: client.color.tessorange,
            description:
              "Couldn't find the song you searched for. Please try again using a different keyword.",
          },
        });
      }
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Play"
      );
    }
  }
};
