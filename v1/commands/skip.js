const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "atla",
  aliases: ["a"],
  description: "Şuanki Şarkıyı Atla",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.reply("Sizin için atlayabileceğim hiçbir şey çalmıyor.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ Müzik atlandı`).catch(console.error);
  }
};
