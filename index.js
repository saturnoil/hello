var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var token = "CAAHZC09RuT5MBAMb9QtGkIIHEuszVKZAlAYOcu9G2iUGDxzJVtxPoRvSOD6Iugh5fhZCvauD33uetipkc6eqdhbyeWbF9Q4R5yqGomGzCU7JShpjjGMxsQzttc2ZAmFqUceu5vmAV9P8NH1Q6MbUZCMBuo8ulJF3ExvW80uCHRZC3rsGeB1nEge7DZChwrZBYxOSPStzMubSrgZDZD";

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello sadsadasasd!');
});

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'saturn') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token ');
})

app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      // Handle a text message from this sender
			console.log(text);
			sendTextMessage(sender, 'YO this is your message : ' + text)
    }
  }
  res.sendStatus(200);
});

app.set('port',(process.env.PORT || 5000));
app.listen(app.get('port'), function () {
	console.log('running port' + app.get('port'));
})
