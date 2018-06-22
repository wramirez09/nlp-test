(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


(function () {
    let config = {
        paths: {
            addSplashBgurl: "/getSplashBg/"
        },
        selectors: {
            submitButton: ".nlp-app__submitBtn",
            inputField: ".nlp__inputText"
        }

    };

    function addSplashBg(url) {

        const unsplashUrl = url;
        fetch(unsplashUrl).then(function (response) {
            return response.json();
        }).then(function (returned_data) {

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

    };const submitButton = document.querySelector(config.selectors.submitButton);

    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        // console.log("submit clicked");
        var inputFieldValue = document.querySelector(config.selectors.inputField).value;
        if (inputFieldValue) {
            callWitAi(inputFieldValue);
            toastr.success(inputFieldValue);
        } else {
            console.log("no input value");
        }
    });

    function callWitAi(msg) {
        $.ajax({
            url: '/goToWit/',
            data: {
                'q': msg
            },
            method: 'GET',
            success: function (response) {

                console.log("response", response);

                if (response.bye) {

                    console.log(response.bye);
                    toastr.warning("so long");
                } else if (response.greetings) {

                    console.log(response.greetings, "greetings");
                    toastr.warning("how are you?");
                } else if (response.attributes) {

                    console.log(response.attributes, "attributes");

                    var content = "";
                    for (key in response.attributes) {
                        //toastr.warning(key + ":" +  response.attributes[key]);
                        content += key + ":" + response.attributes[key] + "<br />";
                    }

                    toastr.warning(content);
                }
            },
            error: function (error) {
                console.log("error", error);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfNGNmMzhjZmMuanMiXSwibmFtZXMiOlsiY29uZmlnIiwicGF0aHMiLCJhZGRTcGxhc2hCZ3VybCIsInNlbGVjdG9ycyIsInN1Ym1pdEJ1dHRvbiIsImlucHV0RmllbGQiLCJhZGRTcGxhc2hCZyIsInVybCIsInVuc3BsYXNoVXJsIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwicmV0dXJuZWRfZGF0YSIsIm51bWJlciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImRvY3VtZW50IiwiYm9keSIsInN0eWxlIiwiYmFja2dyb3VuZEltYWdlIiwidXJscyIsImZ1bGwiLCJ0b2FzdHIiLCJvcHRpb25zIiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiaW5wdXRGaWVsZFZhbHVlIiwidmFsdWUiLCJjYWxsV2l0QWkiLCJzdWNjZXNzIiwiY29uc29sZSIsImxvZyIsIm1zZyIsIiQiLCJhamF4IiwiZGF0YSIsIm1ldGhvZCIsImJ5ZSIsIndhcm5pbmciLCJncmVldGluZ3MiLCJhdHRyaWJ1dGVzIiwiY29udGVudCIsImtleSIsImVycm9yIl0sIm1hcHBpbmdzIjoiOztBQUdBLENBQUMsWUFBWTtBQUNULFFBQUlBLFNBQVE7QUFDUkMsZUFBTztBQUNIQyw0QkFBaUI7QUFEZCxTQURDO0FBSVJDLG1CQUFXO0FBQ1BDLDBCQUFjLHFCQURQO0FBRVBDLHdCQUFZO0FBRkw7O0FBSkgsS0FBWjs7QUFXQSxhQUFTQyxXQUFULENBQXFCQyxHQUFyQixFQUEwQjs7QUFFdEIsY0FBTUMsY0FBY0QsR0FBcEI7QUFDQUUsY0FBTUQsV0FBTixFQUVDRSxJQUZELENBRU0sVUFBVUMsUUFBVixFQUFvQjtBQUNsQixtQkFBT0EsU0FBU0MsSUFBVCxFQUFQO0FBQ0gsU0FKTCxFQU1DRixJQU5ELENBTU0sVUFBVUcsYUFBVixFQUF5Qjs7QUFFM0IsZ0JBQUlDLFNBQVNDLEtBQUtDLEtBQUwsQ0FBV0Qs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Q0g7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVDLENBcE5EIiwiZmlsZSI6ImZha2VfNGNmMzhjZmMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuXG4oZnVuY3Rpb24gKCkge1xuICAgIGxldCBjb25maWc9IHtcbiAgICAgICAgcGF0aHM6IHtcbiAgICAgICAgICAgIGFkZFNwbGFzaEJndXJsIDogXCIvZ2V0U3BsYXNoQmcvXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0b3JzOiB7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b246IFwiLm5scC1hcHBfX3N1Ym1pdEJ0blwiLFxuICAgICAgICAgICAgaW5wdXRGaWVsZDogXCIubmxwX19pbnB1dFRleHRcIlxuICAgICAgICB9XG5cbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIGFkZFNwbGFzaEJnKHVybCkge1xuXG4gICAgICAgIGNvbnN0IHVuc3BsYXNoVXJsID0gdXJsO1xuICAgICAgICBmZXRjaCh1bnNwbGFzaFVybClcbiAgICBcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldHVybmVkX2RhdGEpIHtcblxuICAgICAgICAgICAgbGV0IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKFwiICsgcmV0dXJuZWRfZGF0YVtudW1iZXJdLnVybHMuZnVsbCArIFwiKVwiO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBhZGQgYmcgaW4gdGhlIGRvb3IgXG4gICAgYWRkU3BsYXNoQmcoY29uZmlnLnBhdGhzLmFkZFNwbGFzaEJndXJsKTtcblxuICAgIC8vIHRvYXN0ciBvcHRpb25zIFxuICAgIHRvYXN0ci5vcHRpb25zID0ge1xuICAgICAgICBcImNsb3NlQnV0dG9uXCI6IHRydWUsXG4gICAgICAgIFwiZGVidWdcIjogZmFsc2UsXG4gICAgICAgIFwibmV3ZXN0T25Ub3BcIjogZmFsc2UsXG4gICAgICAgIFwicHJvZ3Jlc3NCYXJcIjogZmFsc2UsXG4gICAgICAgIFwicG9zaXRpb25DbGFzc1wiOiBcInRvYXN0LXRvcC1jZW50ZXJcIixcbiAgICAgICAgXCJwcmV2ZW50RHVwbGljYXRlc1wiOiB0cnVlLFxuICAgICAgICBcIm9uY2xpY2tcIjogbnVsbCxcbiAgICAgICAgXCJzaG93RHVyYXRpb25cIjogXCIwXCIsXG4gICAgICAgIFwiaGlkZUR1cmF0aW9uXCI6IFwiMFwiLFxuICAgICAgICBcInRpbWVPdXRcIjogXCIwXCIsXG4gICAgICAgIFwiZXh0ZW5kZWRUaW1lT3V0XCI6IFwiMFwiLFxuICAgICAgICBcInNob3dFYXNpbmdcIjogXCJzd2luZ1wiLFxuICAgICAgICBcImhpZGVFYXNpbmdcIjogXCJsaW5lYXJcIixcbiAgICAgICAgXCJzaG93TWV0aG9kXCI6IFwiZmFkZUluXCIsXG4gICAgICAgIFwiaGlkZU1ldGhvZFwiOiBcImZhZGVPdXRcIlxuICAgIH1cblxuXG4vLyAgICAgdmFyIGlzV2VhdGhlciA9IGZhbHNlO1xuICAgICAgICBcbi8vICAgICBmdW5jdGlvbiBsb2FkZXIoaXNMb2FkZXJTaG93bil7XG4vLyAgICAgICAgIGlmKGlzTG9hZGVyU2hvd24peyAgIFxuLy8gICAgICAgICAgICAgJChcIi5sb2FkZXJcIikuc2hvdygpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2UgaWYoaXNMb2FkZXJTaG93biA9PT0gZmFsc2Upe1xuLy8gICAgICAgICAgICAgJChcIi5sb2FkZXJcIikuaGlkZSgpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gICAgIGZ1bmN0aW9uIGdldHVzZXJsb2NhdGlvbigpIHtcbi8vICAgICAgICAgZnVuY3Rpb24gc3VjY2Vzcyhwb3NpdGlvbikge1xuLy8gICAgICAgICAgICAgICAgIGlmKGlzV2VhdGhlcil7XG4vLyAgICAgICAgICAgICAgICAgICAgIGdldFdlYXRoZXIocG9zaXRpb24pO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICBlbHNle1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb247XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gZXJyb3IoKSB7XG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmFibGUgdG8gcmV0cmlldmUgeW91ciBsb2NhdGlvblwiKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIHJldHVybiBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHN1Y2Nlc3MsIGVycm9yKTtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgLy8gZXZlbnQgbGlzdGVuZXIgYW5kIGhhbmRsZXIgZm9yIHN1Ym1pdCBidXR0b25cblxuICAgIC8vICQoXCIubmxwLWFwcF9fc3VibWl0QnRuXCIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbihlKXtcbiAgICAvLyAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vICAgICB0b2FzdHIuc3VjY2VzcygkKFwiLm5scF9faW5wdXRUZXh0XCIpLnZhbCgpKVxuICAgIC8vICAgICBsb2FkZXIodHJ1ZSk7XG4gICAgLy8gICAgICQoXCIjcmVzcG9uZGVcIikuaHRtbChcIlwiKTtcbiAgICAvLyAgICAgY2FsbFdpdEFpKCQoXCIubmxwX19pbnB1dFRleHRcIikudmFsKCkpO1xuICAgICAgICBcbiAgICAvLyB9KVxuXG4gICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb25maWcuc2VsZWN0b3JzLnN1Ym1pdEJ1dHRvbik7XG5cbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdWJtaXQgY2xpY2tlZFwiKTtcbiAgICAgICAgdmFyIGlucHV0RmllbGRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29uZmlnLnNlbGVjdG9ycy5pbnB1dEZpZWxkKS52YWx1ZTtcbiAgICAgICAgaWYoaW5wdXRGaWVsZFZhbHVlKXtcbiAgICAgICAgICAgIGNhbGxXaXRBaShpbnB1dEZpZWxkVmFsdWUpO1xuICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MoaW5wdXRGaWVsZFZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJubyBpbnB1dCB2YWx1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9KVxuICAgIFxuICAgIGZ1bmN0aW9uIGNhbGxXaXRBaShtc2cpIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogJy9nb1RvV2l0LycsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgJ3EnOiBtc2dcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlXCIscmVzcG9uc2UpO1xuXG4gICAgICAgICAgICAgICAgaWYocmVzcG9uc2UuYnllKXtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5ieWUpO1xuICAgICAgICAgICAgICAgICAgICB0b2FzdHIud2FybmluZyhcInNvIGxvbmdcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocmVzcG9uc2UuZ3JlZXRpbmdzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuZ3JlZXRpbmdzLCBcImdyZWV0aW5nc1wiKVxuICAgICAgICAgICAgICAgICAgICB0b2FzdHIud2FybmluZyhcImhvdyBhcmUgeW91P1wiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHJlc3BvbnNlLmF0dHJpYnV0ZXMpe1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmF0dHJpYnV0ZXMsIFwiYXR0cmlidXRlc1wiKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIHJlc3BvbnNlLmF0dHJpYnV0ZXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy90b2FzdHIud2FybmluZyhrZXkgKyBcIjpcIiArICByZXNwb25zZS5hdHRyaWJ1dGVzW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudCArPSBrZXkgKyBcIjpcIiArICByZXNwb25zZS5hdHRyaWJ1dGVzW2tleV0gKyBcIjxiciAvPlwiXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0ci53YXJuaW5nKGNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIsIGVycm9yKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4vLyAgICAgZnVuY3Rpb24gY29udmVydFRlbXAodGVtcCkge1xuLy8gICAgICAgICByZXR1cm4gKDkgLyA1KSAqICh0ZW1wIC0gMjczKSArIDIzO1xuLy8gICAgIH07XG4vLyAgICAgZnVuY3Rpb24gcHJpbnRWYWx1ZXMob2JqKSB7XG4vLyAgICAgICAgIGxvYWRlcihmYWxzZSk7XG4vLyAgICAgICAgICQoXCIjcmVzcG9uZGVcIikuaHRtbChcIlwiKTtcbi8vICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuLy8gICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpba2V5XSA9PT0gXCJvYmplY3RcIiAmJiBvYmpba2V5XSAhPT0gbnVsbCkge1xuLy8gICAgICAgICAgICAgICAgIHByaW50T2JqKG9ialtrZXldKTtcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgJChcIiNyZXNwb25kZVwiKS5hcHBlbmQoa2V5ICsgXCI6XCIgKyBvYmpba2V5XSArIFwiPGJyLz5cIik7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gICAgIGZ1bmN0aW9uIHByaW50T2JqKG9iaikge1xuLy8gICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4vLyAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialtrZXldID09PSBcIm9iamVjdFwiKSB7XG4vLyAgICAgICAgICAgICAgICAgcHJpbnRPYmoob2JqW2tleV0pO1xuLy8gICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAvLyAkKFwiI3Jlc3BvbmRlXCIpLmFwcGVuZChrZXkgKyBcIjpcIiArIG9ialtrZXldICsgXCI8YnIvPlwiKTtcbi8vICAgICAgICAgICAgICAgICB0b2FzdHIub3B0aW9ucyA9IHtcbi8vICAgICAgICAgICAgICAgICAgICAgXCJjbG9zZUJ1dHRvblwiOiBmYWxzZSxcbi8vICAgICAgICAgICAgICAgICAgICAgXCJkZWJ1Z1wiOiBmYWxzZSxcbi8vICAgICAgICAgICAgICAgICAgICAgXCJuZXdlc3RPblRvcFwiOiBmYWxzZSxcbi8vICAgICAgICAgICAgICAgICAgICAgXCJwcm9ncmVzc0JhclwiOiBmYWxzZSxcbi8vICAgICAgICAgICAgICAgICAgICAgXCJwb3NpdGlvbkNsYXNzXCI6IFwidG9hc3QtdG9wLWxlZnRcIixcbi8vICAgICAgICAgICAgICAgICAgICAgXCJwcmV2ZW50RHVwbGljYXRlc1wiOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgICAgICBcIm9uY2xpY2tcIjogbnVsbCxcbi8vICAgICAgICAgICAgICAgICAgICAgXCJzaG93RHVyYXRpb25cIjogXCIxMDAwXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgIFwiaGlkZUR1cmF0aW9uXCI6IFwiMTAwMFwiLFxuLy8gICAgICAgICAgICAgICAgICAgICBcInRpbWVPdXRcIjogXCI1MDAwXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgIFwiZXh0ZW5kZWRUaW1lT3V0XCI6IFwiMTAwMFwiLFxuLy8gICAgICAgICAgICAgICAgICAgICBcInNob3dFYXNpbmdcIjogXCJzd2luZ1wiLFxuLy8gICAgICAgICAgICAgICAgICAgICBcImhpZGVFYXNpbmdcIjogXCJsaW5lYXJcIixcbi8vICAgICAgICAgICAgICAgICAgICAgXCJzaG93TWV0aG9kXCI6IFwiZmFkZUluXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgIFwiaGlkZU1ldGhvZFwiOiBcImZhZGVPdXRcIlxuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICB0b2FzdHIud2FybmluZyhrZXkgKyBcIjpcIiArIG9ialtrZXldKVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gICAgIGZ1bmN0aW9uIGdldFdlYXRoZXIoY29vcmRzKSB7XG4vLyAgICAgICAgICQuYWpheCh7XG4vLyAgICAgICAgICAgICB1cmw6ICcvZ2V0V2VhdGhlci8nLFxuLy8gICAgICAgICAgICAgZGF0YToge1xuLy8gICAgICAgICAgICAgICAgICdsYXQnOiBjb29yZHMuY29vcmRzLmxhdGl0dWRlLFxuLy8gICAgICAgICAgICAgICAgICdsb24nOiBjb29yZHMuY29vcmRzLmxvbmdpdHVkZSxcbi8vICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuLy8gICAgICAgICAgICAgICAgIGxldCBkYXRhT2JqID0gSlNPTi5wYXJzZShkYXRhKTtcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIndlYXRoZXIgZGF0YSBvYmplY3RcIiwgZGF0YU9iailcbi8vICAgICAgICAgICAgICAgICBwcmludFZhbHVlcyhkYXRhT2JqKTtcbi8vICAgICAgICAgICAgIH0sXG5cbi8vICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyKSB7XG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvclwiLCBlcnIpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9KTtcbi8vICAgICB9O1xuLy8gICAgIGZ1bmN0aW9uIHByaW50TG9jYXRpb24oY29vcmRzKSB7XG4vLyAgICAgICAgICQoXCIjcmVzcG9uZGVcIikuaHRtbChgPHN0cm9uZz5MYXRpdHVkZTo8L3N0cm9uZz4gJHtjb29yZHMubGF0aXR1ZGV9IDxiciAvPiA8c3Ryb25nPkxvbmdpdHVkZTo8L3N0cm9uZz4gJHtjb29yZHMubG9uZ2l0dWRlfSBgKTtcbi8vICAgICB9XG5cbn0pKCk7ICJdfQ==
},{}]},{},[1])
//# sourceMappingURL=app.js.map
