const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  description: "Şuan çalan şarkının sözlerini al",
  async execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Şuan hiçbirşey çalmıyor.").catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `${queue.songs[0].title}'nin şarkı sözleri bulunamadı.`;
    } catch (error) {
      lyrics = `${queue.songs[0].title}'nin şarkı sözleri bulunamadı.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle("Şarkı Sözleri")
      .setDescription(lyrics)
      .setColor("#F8AA2A")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};
