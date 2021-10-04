// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-warn
const BaseEvent = require("../utils/structures/BaseEvent");
const { WebhookClient } = require("discord.js");

module.exports = class WarnEvent extends BaseEvent {
  constructor() {
    super("warn");
  }

  async run(client, info) {
    try {
      const warnWH = new WebhookClient("Webhook-ID", "Webhook-token");
      warnWH.send(`<@${client.owner}>`, {
        embeds: [
          {
            title: "Warn Event Triggered",
            timestamp: new Date(),
            description: info,
          },
        ],
      });
    } catch (error) {
      client.oneventerror(error, "warn");
    }
  }
};
