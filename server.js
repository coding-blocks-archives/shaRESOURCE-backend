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

app.use('/api', apirouter);

app.listen(8080, function () {
  console.log("Listening on 8080");
});