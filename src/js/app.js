(function() {

    var typingTimer; //timer identifier
    var doneTypingInterval = 1000; //time in ms, 5 second for example
    var $input = $('#input');

    //on keyup, start the countdown
    $input.on('keyup', function() {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    //on keydown, clear the countdown 
    $input.on('keydown', function() {
        clearTimeout(typingTimer);
    });

    function doneTyping() {
        var userMessage = $input.val();
        apiCall(userMessage);
    }

    var $form = $('#form');

    function apiCall(msg) {

        $.ajax({
            url: 'https://api.wit.ai/message',
            data: {
                'q': msg,
                'v': '20170519',
                'access_token': 'SOAPDPJ3EQB2LLHLTLUQ57YOSXTTEARL'
            },
            dataType: 'jsonp',
            method: 'GET',
            success: function(response) {
                console.log("response", response)
                checkResponseType(response);

            }
        });
    }

    function checkForIntent(data) {
        var dataValue = data[0].value.trim();
        if (dataValue == "greeting") {
            $("#responde").html("Hello to you")

        } else if (dataValue == "farewell") {

            $("#responde").html("so long");

        } else if (dataValue == "weather") {
            console.log("asking for the weather");
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
        // debugger;
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather',
            data: {
                'lat': coords.latitude,
                'lon': coords.longitude,
                'appid': 'bc03930044b867aed3944e46500d822c'
            },
            success: function(data) {
                console.log("weather data object", data)


                $("#responde").html(data.name + " " + Math.round(convertTemp(data.main.temp)) + "<sup>o</sup>" + '<br />' + " " + data.weather[0].description);

            }
        });
    };

    function processLocation(pos) {
        var coords = pos.coords

        if (pos && pos.coords) {
            $("#responde").html(`<strong>Latitude:</strong> ${coords.latitude} <br /> <strong>Longitude:</strong> ${coords.longitude} `);
            getWeather(coords);
        } else {
            console.log("no location data");
        }

    };

    function getuserlocation(msg) {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(processLocation);
    };

    function checkResponseType(response) {

        if (response.entities.intent) {
            checkForIntent(response.entities.intent);

        } else if (response.entities.bye) {

            checkForBye(response);
        } else if (response.entities.datetime) {

            console.log("its a date time", response.entities.datetime[0].value.toString());

            var nowdate = new Date(response.entities.datetime[0].value.toString());

            $("#responde").html("time:" + " " + nowdate.toLocaleString())

        } else if (response.entities.location) {

            $("#responde").html("please wait while I retrieve that info")

            getuserlocation("test");
        }


    };



})();