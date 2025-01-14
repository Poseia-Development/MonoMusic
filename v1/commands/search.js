const { MessageEmbed } = require("discord.js");
const { YOUTUBE_API_KEY } = require("../config.json");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

module.exports = {
  name: "ara",
  description: "Oynatılacak videoları arayın ve seçin",
  async execute(message, args) {
    if (!args.length)
      return message.reply(`Kullanım: ${message.client.prefix}${module.exports.name} <Video adı>`).catch(console.error);
    if (message.channel.activeCollector)
      return message.reply("Bu kanalda bir mesaj toplayıcı zaten etkin.");
    if (!message.member.voice.channel)
      return message.reply("Öncelikle bir ses kanalına girmeniz gerekmektedir!").catch(console.error);

    const search = args.join(" ");

    let resultsEmbed = new MessageEmbed()
      .setTitle(`**Çalmak istediğiniz şarkı numarasını yanıtlayın**`)
      .setDescription(`${search} için arama sonuçları`)
      .setColor("#F8AA2A");

    try {
      const results = await youtube.searchVideos(search, 10);
      results.map((video, index) => resultsEmbed.addField(video.shortURL, `${index + 1}. ${video.title}`));

      var resultsMessage = await message.channel.send(resultsEmbed);

      function filter(msg) {
        const pattern = /(^[1-9][0-9]{0,1}$)/g;
        return pattern.test(msg.content) && parseInt(msg.content.match(pattern)[0]) <= 10;
      }

      message.channel.activeCollector = true;
      const response = await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] });
      const choice = resultsEmbed.fields[parseInt(response.first()) - 1].name;

      message.channel.activeCollector = false;
      message.client.commands.get("play").execute(message, [choice]);
      resultsMessage.delete().catch(console.error);
    } catch (error) {
      console.error(error);
      message.channel.activeCollector = false;
    }
  }
};
