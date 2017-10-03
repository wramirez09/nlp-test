var express = require('express');
var app = express();
// var api = require('./api/api');

app.use(express.static('src'));

app.listen(3100, function(req, res) {
    console.log('app listening on port 3100!')
});
