const Slackbot = require("slackbots");
const axios = require("axios");
const config = require("config");
const _ = require("lodash");

const bot = new Slackbot({
  token: "xoxb-4886555281-406059636004-9D2cKYQOGDnU9pZpz4teVdmJ",
  name: "tradebot"
});

// Start Handler
bot.on("start", () => {
  const params = {
    icon_emoji: ":btc:"
  };
});

// Error Handling
bot.on("error", err => console.log(err));

// Message Handling
bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }

  handleMessage(data.text);
});

// Respond to user
function handleMessage(message) {
  if (message.includes(" 24 hour")) {
    sendMessage(true);
  } else if (message.includes(" btc") || message.includes(" bitcoin")) {
    sendMessage(false);
  }
}

// Actually send the message
function sendMessage(isTwentyFourHour) {
  const url = config.get("apiUrl");
  const ticker = "BTC";
  const base = "CAD";

  axios.get(url).then(res => {
    const selectedCurrency = _.find(res.data.quotes, {
      ticker: ticker,
      base: base
    });

    const ret24 = selectedCurrency.ret24 * 100;
    const lastPrice = selectedCurrency.last / 100;

    let message;

    isTwentyFourHour ? (message = ret24) : (message = lastPrice);

    const params = {
      icon_emoji: ":btc:"
    };

    bot.postMessageToChannel("trade-bot", message, params);
  });
}
