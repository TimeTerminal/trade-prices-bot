const Slackbot = require("slackbots");
const axios = require("axios");
const config = require("config");

const bot = new Slackbot({
  token: "xoxb-4886555281-406059636004-9D2cKYQOGDnU9pZpz4teVdmJ",
  name: "tradebot"
});

// Start Handler
bot.on("start", () => {
  const params = {
    icon_emoji: ":btc:"
  };

  var url = config.get("apiUrl");

  // bot.postMessageToChannel("trade-bot", "My purpose is to give prices", params);
  console.log(url, "config");
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
  if (message.toLowercase().includes(" 24 hour")) {
    sendMessage(true);
  } else if (
    message.toLowercase().includes(" btc") ||
    message.toLowercase().includes(" bitcoin")
  ) {
    sendMessage(false);
  }
}

// Actually send the message
function sendMessage(isTwentyFourHour) {
  // axios.get()
  console.log("is it true or false", isTwentyFourHour);
}
