var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello sadsadasasd!');
});

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'saturn') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token ');
})

app.set('port',(process.env.PORT || 5000));
app.listen(app.get('port'),function() {
	console.log('running port' + app.get('port'));
})
