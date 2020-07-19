const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "kaldır",
  description: "Seçilen şarkıyı sıradan kaldır",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Ortada bir sıra yok.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    
    if (!args.length) return message.reply(`Kullanım: ${message.client.prefix}kaldır <Sıra numarası>`);
    if (isNaN(args[0])) return message.reply(`Usage: ${message.client.prefix}kaldır <Sıra numarası>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} ❌ **${song[0].title}** isimli şarkı sıradan kaldırıldı!`);
  }
};
