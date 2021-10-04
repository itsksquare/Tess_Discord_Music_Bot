const BaseCommand = require("../../utils/structures/BaseCommand");
const { WebhookClient } = require("discord.js");

module.exports = class SuggestCommand extends BaseCommand {
  constructor() {
    super("suggest", "user", []);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Suggest",
        message.author,
        message.channel,
        message.guild
      );
      const suggestion = args.join(" ");
      if (!suggestion)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            title: "Suggest Command",
            description: `__**Description:**__ Suggest a new feature or improvements to current you would like to see in the bot.\n__**Usage:**__ report <bug/report in detail>`,
            footer: {
              text: "TESS",
              icon_url: client.logo.nobglogo,
            },
          },
        });
      const suggestWH = new WebhookClient("Webhook-ID", "Webhook-token");
      suggestWH.send(`<@${client.owner}>`, {
        embeds: [
          {
            title: "New Suggestion",
            description: `__**Suggestion:**__\n\`\`\`${suggestion}\`\`\``,
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
            "Thank You so much for your valuable suggestion. This has been forwarded to the developer.",
        },
      });
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Suggest"
      );
    }
  }
};
