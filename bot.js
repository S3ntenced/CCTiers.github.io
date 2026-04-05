const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = "TOKEN_HERE";

client.on("ready", () => {
  console.log(`Bot je online ako ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!tier")) {
    const args = message.content.split(" ");

    const username = args[1];
    const tier = args[2];

    if (!username || !tier) {
      return message.reply("Použitie: !tier meno HT1");
    }

    let data = JSON.parse(fs.readFileSync("tiers.json"));

    for (let t in data) {
      data[t] = data[t].filter(p => p !== username);
    }

    if (!data[tier]) {
      return message.reply("Neexistujúci tier");
    }

    data[tier].push(username);

    fs.writeFileSync("tiers.json", JSON.stringify(data, null, 2));

const { exec } = require("child_process");

exec("git add . && git commit -m \"update tiers\" && git push", (err, stdout, stderr) => {
  if (err) {
    console.error("Git chyba:", err);
    return;
  }
  console.log("Pushnuté na GitHub");
});

    message.reply(`${username} bol pridaný do ${tier}`);
  }
});

client.login("TOKEN_HERE");