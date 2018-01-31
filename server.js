var express = require('express');
var app = express();

const gotToWitAi = require("./api/callWit");
const getWeather = require("./api/getWeather");

app.use(express.static('src'));

app.listen(process.env.PORT || 3181, () => {
    console.log(`Listening on port ${process.env.PORT || 3181}`);
});

app.all("/goToWit/", gotToWitAi.gotToWitAi.bind(this));
app.all("/getWeather/", getWeather.getWeather.bind(this));