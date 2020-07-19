const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "ses",
  aliases: ["s"],
  description: "Çalan müziğin sesini yükselt veya azalt!",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Şuan hiçbirşey çalmıyor.").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("Öncelikle bir ses kanalında olmalısın!").catch(console.error);

    if (!args[0]) return message.reply(`🔊 Şuanki Ses Seviyesi: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Lütfen geçerli bir sayı belirtiniz!").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.reply("Lütfen 0 ile 100 arasında bir sayı kullanınız!").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`Yeni Ses Seviyesi: **${args[0]}%**`).catch(console.error);
  }
};
