const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "devamet",
  aliases: ["d"],
  description: "Şuan çalan şarkıyı devam ettir!",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Şuan hiçbirşey çalmıyor!").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} ▶ resumed the music!`).catch(console.error);
    }

    return message.reply("The queue is not paused.").catch(console.error);
  }
};
