const BaseCommand = require("../../utils/structures/BaseCommand");

module.exports = class SkipCommand extends BaseCommand {
  constructor() {
    super("skip", "music", ["s"]);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Skip",
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
      let uservc = message.member.voice.channel;
      if (!uservc)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description:
              "Please join a voice channel and then use this command.",
          },
        });
      if (uservc != player.voiceChannel)
        return message.channel.send({
          embed: {
            color: client.color.tessorange,
            description:
              "You are not in the same voice channel that Tess is in.",
          },
        });
      const usersinvc = uservc.members.filter((m) => !m.user.bot);
      if (usersinvc >= 3) {
        const rqdVotes = Math.ceil(usersinvc.size * 0.6);
        const voteMsg = await message.channel.send({
          embed: {
            color: client.color.tessorange,
            footer: {
              text: `Requested by : ${message.author.username}`,
            },
            description: `**Voting Required to skip [${player.queue[0].title}](${player.queue[0].uri})**\n Required votes: \`${rqdVotes}\``,
          },
        });
        await voteMsg.react("⏭️");

        const filter = (reaction, user) => {
          if (user.bot) return false;
          const reactorVC = message.guild.members.cache.get(user.id).voice
            .channel;
          if (reactorVC) {
            if (reactorVC.id === player.voiceChannel.id) {
              return ["⏭️"].includes(reaction.emoji.name);
            }
            return false;
          } else {
            return false;
          }
        };

        const reactions = await voteMsg.awaitReactions(filter, {
          max: rqdVotes,
        });
        const totalvotes = reactions
          .get("⏭️")
          .users.cache.filter((u) => !u.bot);
        if (totalvotes.size >= rqdVotes) {
          await player.stop();
          message.react("👌");
          voteMsg.delete();
        }
      } else {
        await player.stop();
        message.react("👌");
        return;
      }
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Skip"
      );
    }
  }
};
