const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "atlat",
  
  description: "Seçilen Sıra numarasındaki şarkıya atla!",
  execute(message, args) {
    if (!args.length) return message.reply(`Kullanım: ${message.client.prefix}${module.exports.name} <Sıra Numarası>`);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Ortada bir sıra yok.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.songs = queue.songs.slice(args[0] - 2);
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ **${args[0] - 1}** adet şarkı atlandı`).catch(console.error);
  }
};
