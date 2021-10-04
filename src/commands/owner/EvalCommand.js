const BaseCommand = require("../../utils/structures/BaseCommand");
const { inspect } = require("util");

module.exports = class EvalCommand extends BaseCommand {
  constructor() {
    super("eval", "owner", []);
  }

  async run(client, message, args) {
    try {
      client.oncommandused(
        "Eval",
        message.author,
        message.channel,
        message.guild
      );
      if (message.author.id != client.owner) return;
      const toeval = args.join(" ");
      if (!toeval) return message.channel.send("Nothing to evaluate.");
      let evaluated = inspect(eval(toeval, { depth: 0 }));
      let hrStart = process.hrtime();
      let hrDiff;
      hrDiff = process.hrtime(hrStart);
      message.channel.send(
        `*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ""}${
          hrDiff[1] / 1000000
        }ms.*\`\`\`javascript\n${evaluated}\n\`\`\``,
        { maxLength: 1900 }
      );
    } catch (error) {
      client.oncommanderror(
        error,
        message.author,
        message.guild,
        message.channel,
        "Eval"
      );
    }
  }
};
