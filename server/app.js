const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

console.log('selected server port: ', port);
const app = express();

app.get('/', function (req, res) {
  res.send({});
});

app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(express.static(path.resolve(__dirname, 'static')));

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
}); 