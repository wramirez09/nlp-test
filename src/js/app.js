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
        } else {}


    };

    function checkForBye(data) {
        console.log(data.entities.bye[0].value, "bye data");
        if (data.entities.bye[0].value !== false) {
            $("#responde").html("good bye");
        }
    };

    function checkResponseType(response) {

        if (response.entities.intent) {
            checkForIntent(response.entities.intent);

        } else if (response.entities.bye) {

            checkForBye(response);
        } else if (response.entities.datetime) {

            console.log("its a date time", response.entities.datetime[0].value.toString());
            var nowdate = new Date(response.entities.datetime[0].value.toString());
            $("#responde").html("time:" + " " + nowdate)
        }
    };



})();