


(function () {
    let config= {
        paths: {
            addSplashBgurl : "/getSplashBg/"
        },
        selectors: {
            submitButton: ".nlp-app__submitBtn",
            inputField: ".nlp__inputText"
        }

    };
    
    function addSplashBg(url) {

        const unsplashUrl = url;
        fetch(unsplashUrl)
    
        .then(function (response) {
                return response.json();
            })

        .then(function (returned_data) {

            let number = Math.floor(Math.random() * 10) + 1;
            document.body.style.backgroundImage = "url(" + returned_data[number].urls.full + ")";
        });
    }

    // add bg in the door 
    addSplashBg(config.paths.addSplashBgurl);

    // toastr options 
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "0",
        "hideDuration": "0",
        "timeOut": "0",
        "extendedTimeOut": "0",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }


//     var isWeather = false;
        
//     function loader(isLoaderShown){
//         if(isLoaderShown){   
//             $(".loader").show();
//         }
//         else if(isLoaderShown === false){
//             $(".loader").hide();
//         }
//     }
//     function getuserlocation() {
//         function success(position) {
//                 if(isWeather){
//                     getWeather(position);
//                 }
//                 else{
//                     return position;
//                 }
//             }
//             function error() {
//                 console.log("Unable to retrieve your location");
//             }
//             return navigator.geolocation.getCurrentPosition(success, error);
//         }

//     // event listener and handler for submit button

    // $(".nlp-app__submitBtn").on("click",function(e){
    //     e.preventDefault();
    //     toastr.success($(".nlp__inputText").val())
    //     loader(true);
    //     $("#responde").html("");
    //     callWitAi($(".nlp__inputText").val());
        
    // })

    const submitButton = document.querySelector(config.selectors.submitButton);

    submitButton.addEventListener("click", function(event){
        event.preventDefault();
        // console.log("submit clicked");
        var inputFieldValue = document.querySelector(config.selectors.inputField).value;
        if(inputFieldValue){
            callWitAi(inputFieldValue);
            toastr.success(inputFieldValue);
        }
        else{
            console.log("no input value");
        }
        
    })
    
    function callWitAi(msg) {
        $.ajax({
            url: '/goToWit/',
            data: {
                'q': msg
            },
            method: 'GET',
            success: function (response) {

                console.log("response",response);

                if(response.bye){

                    console.log(response.bye);
                    toastr.warning("so long")
                }
                else if (response.greetings) {

                    console.log(response.greetings, "greetings")
                    toastr.warning("how are you?")
                }
                else if(response.attributes){

                    console.log(response.attributes, "attributes");

                    var content = "";
                    for (key in response.attributes){
                        //toastr.warning(key + ":" +  response.attributes[key]);
                        content += key + ":" +  response.attributes[key] + "<br />"

                    }

                    toastr.warning(content);

                    
                   
                }

            },
            error: function (error) {
                console.log("error", error)
            }
        });
    }
//     function convertTemp(temp) {
//         return (9 / 5) * (temp - 273) + 23;
//     };
//     function printValues(obj) {
//         loader(false);
//         $("#responde").html("");
//         for (var key in obj) {
//             if (typeof obj[key] === "object" && obj[key] !== null) {
//                 printObj(obj[key]);
//             } else {
//                 $("#responde").append(key + ":" + obj[key] + "<br/>");
              
                
//             }
//         }
//     }
//     function printObj(obj) {
//         for (var key in obj) {
//             if (typeof obj[key] === "object") {
//                 printObj(obj[key]);
//             } else {
//                 // $("#responde").append(key + ":" + obj[key] + "<br/>");
//                 toastr.options = {
//                     "closeButton": false,
//                     "debug": false,
//                     "newestOnTop": false,
//                     "progressBar": false,
//                     "positionClass": "toast-top-left",
//                     "preventDuplicates": true,
//                     "onclick": null,
//                     "showDuration": "1000",
//                     "hideDuration": "1000",
//                     "timeOut": "5000",
//                     "extendedTimeOut": "1000",
//                     "showEasing": "swing",
//                     "hideEasing": "linear",
//                     "showMethod": "fadeIn",
//                     "hideMethod": "fadeOut"
//                 }
//                 toastr.warning(key + ":" + obj[key])
//             }
//         }
//     }
//     function getWeather(coords) {
//         $.ajax({
//             url: '/getWeather/',
//             data: {
//                 'lat': coords.coords.latitude,
//                 'lon': coords.coords.longitude,
//             },
//             success: function (data) {
//                 let dataObj = JSON.parse(data);
//                 console.log("weather data object", dataObj)
//                 printValues(dataObj);
//             },

//             error: function (err) {
//                 console.log("error", err);
//             }
//         });
//     };
//     function printLocation(coords) {
//         $("#responde").html(`<strong>Latitude:</strong> ${coords.latitude} <br /> <strong>Longitude:</strong> ${coords.longitude} `);
//     }

})(); 