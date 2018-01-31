(function () {

    var typingTimer, //timer identifier
        doneTypingInterval = 1000, //time in ms, 5 second for example
        $input = $('#input'),
        isWeather = false;

    //on keyup, start the countdown
    $input.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    //on keydown, clear the countdown 
    $input.on('keydown', function () {
        clearTimeout(typingTimer);
    });

    function doneTyping() {
        var userMessage = $input.val();
        callWitAi(userMessage);
    }

    var $form = $('#form');

    function callWitAi(msg) {

        $.ajax({
            url: '/goToWit/',
            data: {
                'q': msg
            },
            method: 'GET',
            success: function (response) {
                console.log(response, "response")
                checkResponseType(response);

            },
            error: function (error) {
                console.log("error", error)
            }
        });
    }


    function checkForIntent(data) {



        var dataValue = data[0].value.trim();
        console.log("data value ", dataValue)

        if (dataValue == "greeting") {

            $("#responde").html("Hello to you")

        } else if (dataValue == "farewell") {

            $("#responde").html("so long");

        } else if (dataValue == "weather") {

            isWeather = true;

            $("#responde").html("please wait while I retrieve that info");

            getuserlocation();

        }
    };

    function checkForBye(data) {

        console.log(data.entities.bye[0].value, "bye data");

        if (data.entities.bye[0].value !== false) {

            $("#responde").html("good bye");
        }
    };

    function convertTemp(temp) {
        return (9 / 5) * (temp - 273) + 23;
    };

    function getWeather(coords) {

        console.log("getting the wheather", coords);

        $.ajax({
            url: '/getWeather/',
            data: {
                'lat': coords.latitude,
                'lon': coords.longitude,
                'appid': 'bc03930044b867aed3944e46500d822c'
            },
            success: function (data) {

                let dataObj = JSON.parse(data)
                console.log("weather data object", dataObj)
                
                $("#responde").html(dataObj.name + " " + Math.round(convertTemp(dataObj.main.temp)) + "<sup>o</sup>" + '<br />' + " " + dataObj.weather[0].description);

            },

            error: function (err) {
                console.log("error", err);
            }
        });
    };

    function processLocation(pos, msg) {
        var coords = pos.coords

        if (pos && pos.coords && isWeather) {

            getWeather(coords);

        } else if (pos && pos.coords) {

            printLocation(coords);
        }

    };


    function printLocation(coords) {
        $("#responde").html(`<strong>Latitude:</strong> ${coords.latitude} <br /> <strong>Longitude:</strong> ${coords.longitude} `);
    }

    function getuserlocation(cb) {

        var options = {
            enableHighAccuracy: true,
            timeout: 0,
            maximumAge: 0
        };

        if (!navigator.geolocation) {

            alert("please update your browser");


        } else {

            return navigator.geolocation.getCurrentPosition(processLocation);

        }

    };

    function checkResponseType(response) {
        console.log("checkResponseType", response)
        if (response.entities.intent) {
            console.log("intent", response.entities.intent);
            checkForIntent(response.entities.intent);

        } else if (response.entities.bye) {

            checkForBye(response);
        } else if (response.entities.datetime) {

            console.log("its a date time", response.entities.datetime[0].value.toString());

            var nowdate = new Date(response.entities.datetime[0].value.toString());

            $("#responde").html("time:" + " " + nowdate.toLocaleString())

        } else if (response.entities.local_search_query) {
            isWeather = false;
            $("#responde").html("please wait while I retrieve that info")

            getuserlocation();
        }


    };



})();