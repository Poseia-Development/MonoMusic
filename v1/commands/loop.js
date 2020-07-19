const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "döngü",
 
  description: "Müzik döngüsünü tetikler",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("Şuan hiçbirşey çalmıyor.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel
      .send(`Döngü şuan  ${queue.loop ? "**açık**" : "**kapalı**"}`)
      .catch(console.error);
  }
};
