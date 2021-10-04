const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const { Utils } = require("erela.js");

module.exports = class QueueCommand extends BaseCommand {
  constructor() {
    super("queue", "music", ["q"]);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Queue",
        message.author,
        message.channel,
        message.guild
      );
      const player = client.music.players.get(message.guild.id);
      if (!player)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description:
              "There is no music currently being played by Tess on this server.",
          },
        });
      if (player.queue.size === 0)
        return message.channel.send({
          embed: {
            description: "There are no songs in the queue at the moment.",
            color: client.color.tessorange,
          },
        });
      if (player.queue.size === 1)
        return message.channel.send({
          embed: {
            description: `**NOW PLAYING: [${player.queue[0].title}](${
              player.queue[0].uri
            })** \`${Utils.formatTime(player.queue[0].duration, true)}\` [${
              player.queue[0].requester
            }]\n\nNo other songs queued at the moment`,
            color: client.color.tessorange,
          },
        });
      let currentpage = 0;
      const embeds = generateQueueEmbed(player.queue);
      const queueEmbed = await message.channel.send(
        embeds[0].setFooter(
          `PAGE: ${currentpage + 1}/${
            embeds.length
          } | Queue Duration: ${Utils.formatTime(player.queue.duration, true)}`
        )
      );
      await queueEmbed.react("⏪");
      await queueEmbed.react("⏩");
      await queueEmbed.react("❌");

      const filter = (reaction, user) =>
        ["⏪", "⏩", "❌"].includes(reaction.emoji.name) &&
        message.author.id === user.id;
      const collector = queueEmbed.createReactionCollector(filter);

      collector.on("collect", async (reaction, user) => {
        if (reaction.emoji.name === "⏩") {
          if (currentpage < embeds.length - 1) {
            currentpage++;
            queueEmbed.edit(
              embeds[currentpage].setFooter(
                `PAGE: ${currentpage + 1}/${
                  embeds.length
                } | Queue Duration: ${Utils.formatTime(
                  player.queue.duration,
                  true
                )}`
              )
            );
          }
        } else if (reaction.emoji.name === "⏪") {
          if (currentpage !== 0) {
            --currentpage;
            queueEmbed.edit(
              embeds[currentpage].setFooter(
                `PAGE: ${currentpage + 1}/${
                  embeds.length
                } | Queue Duration: ${Utils.formatTime(
                  player.queue.duration,
                  true
                )}`
              )
            );
          }
        } else {
          collector.stop();
          await queueEmbed.delete();
        }
      });

      function generateQueueEmbed(queue) {
        const embeds = [];
        let k = 11;
        for (let i = 1; i < queue.length; i += 11) {
          const current = queue.slice(i, k);
          let j = i - 1;
          k += 11;
          const info = current
            .map(
              (track) =>
                `**${++j}. [${track.title}](${
                  track.uri
                })** \`${Utils.formatTime(track.duration, true)}\` [${
                  track.requester
                }]`
            )
            .join("\n");
          const embed = new MessageEmbed()
            .setAuthor("NOW PLAYING:")
            .setTitle(queue[0].title)
            .setURL(queue[0].uri)
            .setColor(client.color.tessorange);
          if (i === 1) {
            embed.setDescription(`**Up Next:**\n${info}`);
          } else embed.setDescription(`${info}`);
          embeds.push(embed);
        }
        return embeds;
      }
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Queue"
      );
    }
  }
};
