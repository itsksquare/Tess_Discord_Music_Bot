const BaseEvent = require("../../utils/structures/BaseEvent");
const { Manager } = require("erela.js");
const { WebhookClient } = require("discord.js");

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super("ready");
  }
  async run(client) {
    console.log(
      `${client.user.tag} is now online in ${client.guilds.cache.size} servers with ${client.users.cache.size} users !`
    );

    const nodes = [
      {
        host: "localhost",
        port: 7000,
        password: "password",
      },
    ];
    try {
      client.manager = new Manager({
        nodes,
        send: (id, payload) => {
          const guild = client.guilds.cache.get(id);
          if (guild) guild.shard.send(payload);
        },
      });

      client.manager.init(client.user.id);

      client.manager.on("nodeConnect", (node) => {
        console.log("New Node Connected");
      });
      client.manager.on("nodeError", (node, error) => {
        console.log(error);
      });
      client.manager.on("trackStart", (player, track) => {
        const channel = client.channels.cache.get(player.textChannel);
        channel.send({
          embed: {
            title: "Now Playing",
            color: client.color.tessorange,
            description: `**[${track.title}](${track.uri})  [${track.requester}]`,
          },
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
};
