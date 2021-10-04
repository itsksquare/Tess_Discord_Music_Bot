const BaseCommand = require("../../utils/structures/BaseCommand");
const { WebhookClient } = require("discord.js");

module.exports = class ReportCommand extends BaseCommand {
  constructor() {
    super("report", "user", []);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Report",
        message.author,
        message.channel,
        message.guild
      );
      const report = args.join(" ");
      if (!report)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            title: "Report Command",
            description: `__**Description:**__ Report an issue/bug you might have noticed in the bot.\n__**Usage:**__ report <bug/report in detail>`,
            footer: {
              text: "TESS",
              icon_url: client.logo.nobglogo,
            },
          },
        });
      const reportWH = new WebhookClient("Webhook-ID", "Webhook-token");
      reportWH.send(`<@${client.owner}>`, {
        embeds: [
          {
            title: "New Report",
            description: `__**Report:**__\n\`\`\`${report}\`\`\``,
            fields: [
              {
                name: "By user",
                value: `${message.author.username}\nID: ${message.author.id}`,
                inline: true,
              },
              {
                name: "In Server",
                value: `${message.guild.name}\nID: ${message.guild.id}`,
                inline: true,
              },
              {
                name: "In Channel",
                value: `${message.channel.name}\nID: ${message.channel.id}`,
                inline: true,
              },
            ],
          },
        ],
      });
      message.channel.send({
        embed: {
          color: client.color.tessorange,
          description:
            "Sorry to see that you had to use this command. Your report has been sent to the developer and it will be solved as soon as possible.",
        },
      });
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Report"
      );
    }
  }
};
