const fs = require("fs");
const config = require("../config.json");

module.exports = {
  name: "budama",
  description: "Bot mesajlarını budamayı aç veya kapa",
  execute(message) {
    config.PRUNING = !config.PRUNING;

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.log(err);
        return message.channel.send("Dosyayı yazarken bir sorun oluştu").catch(console.error);
      }

      return message.channel
        .send(`Mesaj Budaması ${config.PRUNING ? "**açıldı**" : "**kapandı**"}`)
        .catch(console.error);
    });
  }
};
