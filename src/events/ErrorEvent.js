const BaseEvent = require("../utils/structures/BaseEvent");
const { WebhookClient } = require("discord.js");

module.exports = class ErrorEvent extends BaseEvent {
  constructor() {
    super("error");
  }

  async run(client, error) {
    try {
      const errWH = new WebhookClient("Webhook-ID", "Webhook-token");
      errWH.send(`<@${client.owner}>`, {
        embeds: [
          {
            title: "Bot Error Event Triggered",
            description: error.message,
            timestamp: new Date(),
          },
        ],
      });
    } catch (error) {
      client.oneventerror(error, "error");
    }
  }
};
