// TO DO : add in babel refactor using es6 classes 



(function () {

    // add bg in the door 
    addSplashBg();



    var typingTimer, //timer identifier
        doneTypingInterval = 1000, //time in ms, 5 second for example
        $input = $('#input'),
        isWeather = false;
    function loader(isLoaderShown){
        if(isLoaderShown){   
            $(".loader").show();
        }
        else if(isLoaderShown === false){
            $(".loader").hide();
        }
    }
    function getuserlocation() {
        function success(position) {
                if(isWeather){
                    getWeather(position);
                }
                else{
                    return position;
                }
            }
            function error() {
                console.log("Unable to retrieve your location");
            }
            return navigator.geolocation.getCurrentPosition(success, error);
        }

    // event listener and handler for submit button
    $(".nlp-app__submitBtn").on("click",function(e){
        e.preventDefault();
        loader(true);
        $("#responde").html("");
        callWitAi($(".nlp__inputText").val());
    })
    
    function callWitAi(msg) {
        $.ajax({
            url: '/goToWit/',
            data: {
                'q': msg
            },
            method: 'GET',
            success: function (response) {
                if (response.attributes) {
                    loader(false);
                    for (key in response.attributes) {
                        // print all the local info returned from the api
                        $("#responde").append("<div class='panel panel-default'><p class='panel-body'>" + "<b>" + key + ":</b> " + response.attributes[key] + "</p></div>").fadeIn("slow");
                    }
                }
                else if (response[0].value == "weather") {
                    var cords;
                    isWeather = true;
                    getuserlocation();
                }
                else if(response[0].value = "greeting"){
                    console.log("response", response[0]);
                    $("#responde").append("<h1>hello</h1>")
                    loader(false);
                }

            },
            error: function (error) {
                console.log("error", error)
            }
        });
    }
    function convertTemp(temp) {
        return (9 / 5) * (temp - 273) + 23;
    };
    function printValues(obj) {
        loader(false);
        $("#responde").html("");
        for (var key in obj) {
            if (typeof obj[key] === "object" && obj[key] !== null) {
                printObj(obj[key]);
            } else {
                $("#responde").append(key + ":" + obj[key] + "<br/>");
                
            }
        }
    }
    function printObj(obj) {
        for (var key in obj) {
            if (typeof obj[key] === "object") {
                printObj(obj[key]);
            } else {
                $("#responde").append(key + ":" + obj[key] + "<br/>");
            }
        }
    }
    function getWeather(coords) {
        $.ajax({
            url: '/getWeather/',
            data: {
                'lat': coords.coords.latitude,
                'lon': coords.coords.longitude,
            },
            success: function (data) {
                let dataObj = JSON.parse(data);
                console.log("weather data object", dataObj)
                printValues(dataObj);
            },

            error: function (err) {
                console.log("error", err);
            }
        });
    };
    function printLocation(coords) {
        $("#responde").html(`<strong>Latitude:</strong> ${coords.latitude} <br /> <strong>Longitude:</strong> ${coords.longitude} `);
    }


    function addSplashBg(params) {
        let unsplashUrl = "/getSplashBg/";

        fetch(unsplashUrl)
    
        .then(function (response) {
                return response.json();
            })

        .then(function (returned_data) {

            let number = Math.floor(Math.random() * 10) + 1;
            $('body').css('background-image', 'url(' + returned_data[number].urls.full + ')');
        });
    }
})();