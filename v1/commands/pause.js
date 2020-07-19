const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "durdur",
  description: "Şuan çalan müziği durdurur",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Hiçbirşey çalmıyor.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      return queue.textChannel.send(`${message.author} ⏸ Müzik durduldu.`).catch(console.error);
    }
  }
};
