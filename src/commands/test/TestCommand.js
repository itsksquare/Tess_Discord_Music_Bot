const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const solenolyrics = require("solenolyrics");

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("test", "test", []);
  }

  async run(client, message, args) {
    if (message.author.id != client.owner) return;
    return;
  }
};
