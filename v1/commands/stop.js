const { canModifyQueue } = require("../util/EvobotUtil");


module.exports = {
  name: "kapat",
  description: "Müziği kapatır",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    
    if (!queue) return message.reply("Şuan hiçbirşey çalmıyor.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ Müzik Kapatıldı`).catch(console.error);
  }
};
