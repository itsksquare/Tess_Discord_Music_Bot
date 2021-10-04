const BaseCommand = require("../../utils/structures/BaseCommand");
const os = require("os");

module.exports = class AboutCommand extends BaseCommand {
  constructor() {
    super("about", "bot", ["bi", "botinfo", "aboutbot"]);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "About",
        message.author,
        message.channel,
        message.guild
      );
      let days = Math.floor(client.uptime / 86400000);
      let hours = Math.floor(client.uptime / 3600000) % 24;
      let minutes = Math.floor(client.uptime / 60000) % 60;
      let seconds = Math.floor(client.uptime / 1000) % 60;
      message.channel.send({
        embed: {
          color: client.color.tessorange,
          footer: {
            text: "TESS",
            icon_url: client.logo.nobglogo,
          },
          title: "About TESS",
          thumbnail: {
            url: client.logo.nobglogo,
          },
          description: `Hello there <@${message.author.id}>, Below is all the information I have on myself.`,
          fields: [
            {
              name: `Library`,
              value: `Discord.js V12.x`,
              inline: true,
            },
            {
              name: `Node Version`,
              value: process.version,
              inline: true,
            },
            {
              name: `Created On`,
              value: client.user.createdAt.toDateString(),
              inline: true,
            },
            {
              name: `CPU`,
              value: os.cpus().map((i) => i.model)[0],
              inline: true,
            },
            {
              name: `Memory Usage`,
              value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
                0
              )} MBs`,
              inline: true,
            },
            {
              name: `Platform`,
              value: os.platform,
              inline: true,
            },
            {
              name: `API Latency`,
              value: `${Math.round(client.ws.ping)}ms`,
              inline: true,
            },
            {
              name: `Total Users`,
              value: client.users.cache.size,
              inline: true,
            },
            {
              name: `Total servers`,
              value: client.guilds.cache.size,
              inline: true,
            },
            {
              name: `Current Uptime`,
              value: `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`,
              inline: true,
            },
            {
              name: `Developer`,
              value: `<@${client.owner}> ${
                client.users.cache.get(client.owner).tag
              }`,
              inline: false,
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
        "About"
      );
    }
  }
};
