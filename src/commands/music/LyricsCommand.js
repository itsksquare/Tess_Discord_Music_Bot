const BaseCommand = require("../../utils/structures/BaseCommand");
const solenolyrics = require("solenolyrics");

module.exports = class LyricsCommand extends BaseCommand {
  constructor() {
    super("lyrics", "music", []);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Lyrics",
        message.author,
        message.channel,
        message.guild
      );
      const song = args.join(" ");
      if (!song)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description:
              "Please provide the name of a song for which you would like to get the lyrics for.",
          },
        });
      var lyrics = await solenolyrics.requestLyricsFor(song);
      if (lyrics.length > 2048) {
        const newlyrics = lyrics.slice(0, 2048);
        return message.channel.send({
          embed: {
            title: `Lyrics for ${await solenolyrics.requestTitleFor(song)}`,
            footer: {
              text: "Couldn't display complete lyrics.",
            },
            description: newlyrics,
            color: client.color.tessorange,
          },
        });
      } else {
        return message.channel.send({
          embed: {
            title: `Lyrics for ${await solenolyrics.requestTitleFor(song)}`,
            description: lyrics,
            color: client.color.tessorange,
          },
        });
      }
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Lyrics"
      );
    }
  }
};
