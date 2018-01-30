var express = require('express');
var app = express();


app.use(express.static('src'));

app.listen(3105, function(req, res) {
    console.log('app listening on port 3105!')
});