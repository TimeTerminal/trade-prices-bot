const Slackbot = require("slackbots");
const axios = require("axios");

const bot = new Slackbot({
  token: "xoxb-4886555281-406059636004-9D2cKYQOGDnU9pZpz4teVdmJ",
  name: "tradebot"
});

// Start Handler
bot.on("start", () => {
  const params = {
    icon_emoji: ":btc:"
  };

  bot.postMessageToChannel("trade-bot", "My purpose is to give prices", params);
});
