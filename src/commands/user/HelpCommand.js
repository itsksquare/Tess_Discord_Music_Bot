const BaseCommand = require("../../utils/structures/BaseCommand");
const { stripIndents } = require("common-tags");

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super("help", "user", []);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Help",
        message.author,
        message.channel,
        message.guild
      );
      return message.channel.send({
        embed: {
          color: client.color.tessorange,
          thumbnail: {
            url: client.logo.nobglogo,
          },
          title: "TESS HELP",
          footer: {
            text: "TESS",
            icon_url: client.logo.nobglogo,
          },
          timestamp: new Date(),
          description: `Hey ${message.member}, Here is a list of all my commands.\nMy prefix for this server is ${client.prefix}`,
          fields: [
            {
              name: `__**Music Commands:**__`,
              value: stripIndents`
              **disconnect:** Disconnects the bot from the VC.
              **join:** Makes the bot join the user's Voice Channel
              **loop:** Puts the current queue on a loop.
              **lyrics:** Get the lyrics of the searched song.
              **nowplaying:** Returns information about the currently playing song.
              **pause:** Pauses the currently playing song.
              **play:** Searches for the provided song and starts playing it.
              **queue:** Shows the list of songs queued.
              **repeat:** Enables repeat for the current playing song.
              **resume:** Resumes the currently paused song.
              **shuffle:** Shuffles the current queue of the bot.
              **skip:** Skips the current playing song.
              **stop:** Stops the current playing queue.
              **volume:** Adjusts the bot's volume.
              `,
            },
            {
              name: `__**User Commands:**__`,
              value: stripIndents`
              **about:** Shows all the information about Tess.
              **help** Get a list of all the commands.
              **invite:** Get an invite link for the bot.
              **ping:** Get the bot's ping.
              **report** Report a bug/issue in the bot.
              **suggest** Suggest a new feature for the bot.
              **uptime:** Get the bot's uptime.
              `,
            },
            {
              name: `__**Admin Commands:**__`,
              value: stripIndents`**prefix:** Set a custom prefix for the server.`,
            },
            {
              name: `Some Usefull Links`,
              value: `**[SUPPORT SERVER](${
                client.suppserver
              }) • [INVITE LINK](${await client.generateInvite(37084481)})**`,
              inline: false,
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
        "Help"
      );
    }
  }
};
