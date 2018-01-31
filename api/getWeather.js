const axios =  require("axios");

module.exports.getWeather = function (req, res) {
    


    axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
            'lat': req.query.lat,
            'lon': req.query.lon,
            'appid': 'bc03930044b867aed3944e46500d822c'
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