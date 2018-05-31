var express = require('express');
var app = express();

const gotToWitAi = require("./api/callWit");
const getWeather = require("./api/getWeather");
const getSplashBg = require("./api/getSplashBg");

app.use(express.static('public'));

app.listen(process.env.PORT || 3181, () => {
    console.log(`Listening on port ${process.env.PORT || 3181}`);
});

app.all("/goToWit/", gotToWitAi.gotToWitAi.bind(this));
app.all("/getWeather/", getWeather.getWeather.bind(this));
//getSplashBg
app.all("/getSplashBg/", getSplashBg.getSplashBg.bind(this));