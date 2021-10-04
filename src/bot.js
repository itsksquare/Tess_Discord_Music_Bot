const { Client } = require("discord.js");
const { registerCommands, registerEvents } = require("./utils/registry");
const client = new Client();

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = "!";
  client.owner = "OWNER'S-ID-HERE";
  client.logo = require("./extras/logo");
  client.color = require("./extras/color");
  client.config = require("../config");
  client.suppserver = "SUPPORT-SERVER-LINK-HERE";
  require("./utils/functions")(client);
  await registerCommands(client, "../commands");
  await registerEvents(client, "../events");
  await client.login(client.config.token);
})();
