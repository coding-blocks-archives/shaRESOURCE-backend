/**
 * Created by bhavyaagg on 7/10/17.
 */

const express = require('express')
  , bodyParser = require('body-parser');

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./addData');

app.use('/api', require('./api'));

app.use('/', express.static(__dirname + '/public'));
app.use('/profile/1', express.static(__dirname + '/public/proofile1.html'));
app.use('/profile/2', express.static(__dirname + '/public/profile2.html'));
app.use('/profile/3', express.static(__dirname + '/public/profile3.html'));

app.listen(8080, function () {
  console.log("Listening on 8080");
});