const axios =  require("axios");

module.exports.getWeather = function (req, res) {
    


    axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: req.query
    })
    .then((response)=>{

        console.log("response", response.data);
        

        let jsondata = JSON.stringify(response.data)
        res.send(jsondata);

    })
    .catch((error)=>{

        console.log("error", error)
    })
}