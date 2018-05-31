const axios =  require("axios");
require('dotenv').config();

module.exports.getWeather = function (req, res) {
    
    axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
            'lat': req.query.lat,
            'lon': req.query.lon,
            'appid': process.env.WEATHER_API_KEY
        }
    })
    .then((response)=>{

        let jsondata = JSON.stringify(response.data)
        res.send(jsondata);

    })
    .catch((error)=>{

        console.log("error", error)
    })
}