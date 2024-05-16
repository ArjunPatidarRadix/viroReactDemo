require("dotenv").config();

const Twilio = require("twilio");
const express = require("express");

const app = express();

const AccessToken = Twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

app.get("/token/:identity", (req, res) => {
  const identity = req.params.identity;
  const token = new AccessToken(
    (accountSid = process.env.TWILIO_ACCOUNT_SID),
    (keySid = process.env.TWILIO_API_KEY),
    (secret = process.env.TWILIO_API_SECRET),
    (options = { identity })
  );

  token.identity = identity;
  token.addGrant(
    new ChatGrant({
      serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
    })
  );

  res.send({
    identity: token.identity,
    jwt: token.toJwt(),
  });
});

app.listen(3001, function () {
  console.log("Programmable Chat server running on port 3001!");
});
