const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

const app = express();

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../build/index.html'));
});

app.get(['/admin', '/mandatory-1', '/mandatory-2', '/mandatory-3'], function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../build/index.html'));
});

const static = express.static(path.resolve(__dirname, '../build'));

app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(static);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
}); 