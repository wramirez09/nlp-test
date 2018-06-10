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
            console.log("url", returned_data[number].urls.full.toString());
            console.log("body tag", document.getElementsByTagName("body")[0]);
            // document.body.style.backgroundImage = "url(" + returned_data[number].urls.full.toString() + ' ")" ';
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
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
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

    };var submitButton = document.querySelector(config.selectors.submitButton);

    console.log(submitButton, "submit");

    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        // console.log("submit clicked");
        var inputFieldValue = document.querySelector(config.selectors.inputField).value;
        console.log("input value", inputFieldValue);
        callWitAi(inputFieldValue);
        toastr.success(inputFieldValue);
    });

    function callWitAi(msg) {
        $.ajax({
            url: '/goToWit/',
            data: {
                'q': msg
            },
            method: 'GET',
            success: function (response) {
                if (response.attributes) {
                    console.log(response.attributes);
                    // loader(false);
                    // for (key in response.attributes) {
                    //     console.log(response.attributes[key], key)
                    // print all the local info returned from the api
                    // $("#responde").append("<div class='panel panel-default'><p class='panel-body'>" + "<b>" + key + ":</b> " + response.attributes[key] + "</p></div>").fadeIn("slow");
                    // var responseDiv = document.querySelector("#responde");
                    // }
                } else if (response[0].value == "weather") {
                    console.log(response[0].value, "weather");
                    // var cords;
                    // isWeather = true;
                    // getuserlocation();
                } else if (response[0].value = "greeting") {
                    console.log(response[0].value, "greeting");
                    // $("#responde").append("<h1>hello</h1>")
                    // loader(false);
                    toastr.warning("how are you!");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfM2E5N2I0M2UuanMiXSwibmFtZXMiOlsiY29uZmlnIiwicGF0aHMiLCJhZGRTcGxhc2hCZ3VybCIsInNlbGVjdG9ycyIsInN1Ym1pdEJ1dHRvbiIsImlucHV0RmllbGQiLCJhZGRTcGxhc2hCZyIsInVybCIsInVuc3BsYXNoVXJsIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwicmV0dXJuZWRfZGF0YSIsIm51bWJlciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImNvbnNvbGUiLCJsb2ciLCJ1cmxzIiwiZnVsbCIsInRvU3RyaW5nIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImJvZHkiLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsInRvYXN0ciIsIm9wdGlvbnMiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJpbnB1dEZpZWxkVmFsdWUiLCJ2YWx1ZSIsImNhbGxXaXRBaSIsInN1Y2Nlc3MiLCJtc2ciLCIkIiwiYWpheCIsImRhdGEiLCJtZXRob2QiLCJhdHRyaWJ1dGVzIiwid2FybmluZyIsImVycm9yIl0sIm1hcHBpbmdzIjoiOztBQUdBLENBQUMsWUFBWTtBQUNULFFBQUlBLFNBQVE7QUFDUkMsZUFBTztBQUNIQyw0QkFBaUI7QUFEZCxTQURDO0FBSVJDLG1CQUFXO0FBQ1BDLDBCQUFjLHFCQURQO0FBRVBDLHdCQUFZO0FBRkw7O0FBSkgsS0FBWjs7QUFXQSxhQUFTQyxXQUFULENBQXFCQyxHQUFyQixFQUEwQjs7QUFFdEIsY0FBTUMsY0FBY0QsR0FBcEI7QUFDQUUsY0FBTUQsV0FBTixFQUVDRSxJQUZELENBRU0sVUFBVUMsUUFBVixFQUFvQjtBQUNsQixtQkFBT0EsU0FBU0MsSUFBVCxFQUFQO0FBQ0gsU0FKTCxFQU1DRixJQU5ELENBTU0sVUFBVUcsYUFBVixFQUF5Qjs7QUFFM0IsZ0JBQUlDLFNBQVNDLEtBQUtDLEtBQUwsQ0FBV0Qs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UUMsR0FBUixDQUFZLE9BQVosRUFBcUIwQixLQUFyQjtBQUNIO0FBakNFLFNBQVA7QUFtQ0g7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVDLENBOU1EIiwiZmlsZSI6ImZha2VfM2E5N2I0M2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuXG4oZnVuY3Rpb24gKCkge1xuICAgIGxldCBjb25maWc9IHtcbiAgICAgICAgcGF0aHM6IHtcbiAgICAgICAgICAgIGFkZFNwbGFzaEJndXJsIDogXCIvZ2V0U3BsYXNoQmcvXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2VsZWN0b3JzOiB7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b246IFwiLm5scC1hcHBfX3N1Ym1pdEJ0blwiLFxuICAgICAgICAgICAgaW5wdXRGaWVsZDogXCIubmxwX19pbnB1dFRleHRcIlxuICAgICAgICB9XG5cbiAgICB9O1xuICAgIFxuICAgIGZ1bmN0aW9uIGFkZFNwbGFzaEJnKHVybCkge1xuXG4gICAgICAgIGNvbnN0IHVuc3BsYXNoVXJsID0gdXJsO1xuICAgICAgICBmZXRjaCh1bnNwbGFzaFVybClcbiAgICBcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJldHVybmVkX2RhdGEpIHtcblxuICAgICAgICAgICAgbGV0IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInVybFwiLCByZXR1cm5lZF9kYXRhW251bWJlcl0udXJscy5mdWxsLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImJvZHkgdGFnXCIsIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXSlcbiAgICAgICAgICAgIC8vIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoXCIgKyByZXR1cm5lZF9kYXRhW251bWJlcl0udXJscy5mdWxsLnRvU3RyaW5nKCkgKyAnIFwiKVwiICc7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKFwiICsgcmV0dXJuZWRfZGF0YVtudW1iZXJdLnVybHMuZnVsbCArIFwiKVwiO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBhZGQgYmcgaW4gdGhlIGRvb3IgXG4gICAgYWRkU3BsYXNoQmcoY29uZmlnLnBhdGhzLmFkZFNwbGFzaEJndXJsKTtcblxuICAgIC8vIHRvYXN0ciBvcHRpb25zIFxuICAgIHRvYXN0ci5vcHRpb25zID0ge1xuICAgICAgICBcImNsb3NlQnV0dG9uXCI6IHRydWUsXG4gICAgICAgIFwiZGVidWdcIjogZmFsc2UsXG4gICAgICAgIFwibmV3ZXN0T25Ub3BcIjogZmFsc2UsXG4gICAgICAgIFwicHJvZ3Jlc3NCYXJcIjogZmFsc2UsXG4gICAgICAgIFwicG9zaXRpb25DbGFzc1wiOiBcInRvYXN0LXRvcC1jZW50ZXJcIixcbiAgICAgICAgXCJwcmV2ZW50RHVwbGljYXRlc1wiOiB0cnVlLFxuICAgICAgICBcIm9uY2xpY2tcIjogbnVsbCxcbiAgICAgICAgXCJzaG93RHVyYXRpb25cIjogXCIxMDAwXCIsXG4gICAgICAgIFwiaGlkZUR1cmF0aW9uXCI6IFwiMTAwMFwiLFxuICAgICAgICBcInRpbWVPdXRcIjogXCI1MDAwXCIsXG4gICAgICAgIFwiZXh0ZW5kZWRUaW1lT3V0XCI6IFwiMTAwMFwiLFxuICAgICAgICBcInNob3dFYXNpbmdcIjogXCJzd2luZ1wiLFxuICAgICAgICBcImhpZGVFYXNpbmdcIjogXCJsaW5lYXJcIixcbiAgICAgICAgXCJzaG93TWV0aG9kXCI6IFwiZmFkZUluXCIsXG4gICAgICAgIFwiaGlkZU1ldGhvZFwiOiBcImZhZGVPdXRcIlxuICAgIH1cblxuXG4vLyAgICAgdmFyIGlzV2VhdGhlciA9IGZhbHNlO1xuICAgICAgICBcbi8vICAgICBmdW5jdGlvbiBsb2FkZXIoaXNMb2FkZXJTaG93bil7XG4vLyAgICAgICAgIGlmKGlzTG9hZGVyU2hvd24peyAgIFxuLy8gICAgICAgICAgICAgJChcIi5sb2FkZXJcIikuc2hvdygpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2UgaWYoaXNMb2FkZXJTaG93biA9PT0gZmFsc2Upe1xuLy8gICAgICAgICAgICAgJChcIi5sb2FkZXJcIikuaGlkZSgpO1xuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gICAgIGZ1bmN0aW9uIGdldHVzZXJsb2NhdGlvbigpIHtcbi8vICAgICAgICAgZnVuY3Rpb24gc3VjY2Vzcyhwb3NpdGlvbikge1xuLy8gICAgICAgICAgICAgICAgIGlmKGlzV2VhdGhlcil7XG4vLyAgICAgICAgICAgICAgICAgICAgIGdldFdlYXRoZXIocG9zaXRpb24pO1xuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICBlbHNle1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb247XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gZXJyb3IoKSB7XG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmFibGUgdG8gcmV0cmlldmUgeW91ciBsb2NhdGlvblwiKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIHJldHVybiBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKHN1Y2Nlc3MsIGVycm9yKTtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgLy8gZXZlbnQgbGlzdGVuZXIgYW5kIGhhbmRsZXIgZm9yIHN1Ym1pdCBidXR0b25cblxuICAgIC8vICQoXCIubmxwLWFwcF9fc3VibWl0QnRuXCIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbihlKXtcbiAgICAvLyAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vICAgICB0b2FzdHIuc3VjY2VzcygkKFwiLm5scF9faW5wdXRUZXh0XCIpLnZhbCgpKVxuICAgIC8vICAgICBsb2FkZXIodHJ1ZSk7XG4gICAgLy8gICAgICQoXCIjcmVzcG9uZGVcIikuaHRtbChcIlwiKTtcbiAgICAvLyAgICAgY2FsbFdpdEFpKCQoXCIubmxwX19pbnB1dFRleHRcIikudmFsKCkpO1xuICAgICAgICBcbiAgICAvLyB9KVxuXG4gICAgdmFyIHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29uZmlnLnNlbGVjdG9ycy5zdWJtaXRCdXR0b24pO1xuICAgIFxuICAgIFxuICAgIGNvbnNvbGUubG9nKHN1Ym1pdEJ1dHRvbiwgXCJzdWJtaXRcIik7XG5cbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdWJtaXQgY2xpY2tlZFwiKTtcbiAgICAgICAgdmFyIGlucHV0RmllbGRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29uZmlnLnNlbGVjdG9ycy5pbnB1dEZpZWxkKS52YWx1ZTtcbiAgICAgICAgY29uc29sZS5sb2coXCJpbnB1dCB2YWx1ZVwiLCBpbnB1dEZpZWxkVmFsdWUpO1xuICAgICAgICBjYWxsV2l0QWkoaW5wdXRGaWVsZFZhbHVlKTtcbiAgICAgICAgdG9hc3RyLnN1Y2Nlc3MoaW5wdXRGaWVsZFZhbHVlKTtcbiAgICB9KVxuICAgIFxuICAgIGZ1bmN0aW9uIGNhbGxXaXRBaShtc2cpIHtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogJy9nb1RvV2l0LycsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgJ3EnOiBtc2dcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UuYXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxvYWRlcihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGZvciAoa2V5IGluIHJlc3BvbnNlLmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmF0dHJpYnV0ZXNba2V5XSwga2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJpbnQgYWxsIHRoZSBsb2NhbCBpbmZvIHJldHVybmVkIGZyb20gdGhlIGFwaVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gJChcIiNyZXNwb25kZVwiKS5hcHBlbmQoXCI8ZGl2IGNsYXNzPSdwYW5lbCBwYW5lbC1kZWZhdWx0Jz48cCBjbGFzcz0ncGFuZWwtYm9keSc+XCIgKyBcIjxiPlwiICsga2V5ICsgXCI6PC9iPiBcIiArIHJlc3BvbnNlLmF0dHJpYnV0ZXNba2V5XSArIFwiPC9wPjwvZGl2PlwiKS5mYWRlSW4oXCJzbG93XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIHJlc3BvbnNlRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZXNwb25kZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChyZXNwb25zZVswXS52YWx1ZSA9PSBcIndlYXRoZXJcIikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZVswXS52YWx1ZSwgXCJ3ZWF0aGVyXCIpXG4gICAgICAgICAgICAgICAgICAgIC8vIHZhciBjb3JkcztcbiAgICAgICAgICAgICAgICAgICAgLy8gaXNXZWF0aGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0dXNlcmxvY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYocmVzcG9uc2VbMF0udmFsdWUgPSBcImdyZWV0aW5nXCIpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZVswXS52YWx1ZSwgXCJncmVldGluZ1wiKVxuICAgICAgICAgICAgICAgICAgICAvLyAkKFwiI3Jlc3BvbmRlXCIpLmFwcGVuZChcIjxoMT5oZWxsbzwvaDE+XCIpXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvYWRlcihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHRvYXN0ci53YXJuaW5nKFwiaG93IGFyZSB5b3UhXCIpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIiwgZXJyb3IpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbi8vICAgICBmdW5jdGlvbiBjb252ZXJ0VGVtcCh0ZW1wKSB7XG4vLyAgICAgICAgIHJldHVybiAoOSAvIDUpICogKHRlbXAgLSAyNzMpICsgMjM7XG4vLyAgICAgfTtcbi8vICAgICBmdW5jdGlvbiBwcmludFZhbHVlcyhvYmopIHtcbi8vICAgICAgICAgbG9hZGVyKGZhbHNlKTtcbi8vICAgICAgICAgJChcIiNyZXNwb25kZVwiKS5odG1sKFwiXCIpO1xuLy8gICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4vLyAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialtrZXldID09PSBcIm9iamVjdFwiICYmIG9ialtrZXldICE9PSBudWxsKSB7XG4vLyAgICAgICAgICAgICAgICAgcHJpbnRPYmoob2JqW2tleV0pO1xuLy8gICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAkKFwiI3Jlc3BvbmRlXCIpLmFwcGVuZChrZXkgKyBcIjpcIiArIG9ialtrZXldICsgXCI8YnIvPlwiKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyAgICAgZnVuY3Rpb24gcHJpbnRPYmoob2JqKSB7XG4vLyAgICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbi8vICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09IFwib2JqZWN0XCIpIHtcbi8vICAgICAgICAgICAgICAgICBwcmludE9iaihvYmpba2V5XSk7XG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgICAgIC8vICQoXCIjcmVzcG9uZGVcIikuYXBwZW5kKGtleSArIFwiOlwiICsgb2JqW2tleV0gKyBcIjxici8+XCIpO1xuLy8gICAgICAgICAgICAgICAgIHRvYXN0ci5vcHRpb25zID0ge1xuLy8gICAgICAgICAgICAgICAgICAgICBcImNsb3NlQnV0dG9uXCI6IGZhbHNlLFxuLy8gICAgICAgICAgICAgICAgICAgICBcImRlYnVnXCI6IGZhbHNlLFxuLy8gICAgICAgICAgICAgICAgICAgICBcIm5ld2VzdE9uVG9wXCI6IGZhbHNlLFxuLy8gICAgICAgICAgICAgICAgICAgICBcInByb2dyZXNzQmFyXCI6IGZhbHNlLFxuLy8gICAgICAgICAgICAgICAgICAgICBcInBvc2l0aW9uQ2xhc3NcIjogXCJ0b2FzdC10b3AtbGVmdFwiLFxuLy8gICAgICAgICAgICAgICAgICAgICBcInByZXZlbnREdXBsaWNhdGVzXCI6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgICAgIFwib25jbGlja1wiOiBudWxsLFxuLy8gICAgICAgICAgICAgICAgICAgICBcInNob3dEdXJhdGlvblwiOiBcIjEwMDBcIixcbi8vICAgICAgICAgICAgICAgICAgICAgXCJoaWRlRHVyYXRpb25cIjogXCIxMDAwXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgIFwidGltZU91dFwiOiBcIjUwMDBcIixcbi8vICAgICAgICAgICAgICAgICAgICAgXCJleHRlbmRlZFRpbWVPdXRcIjogXCIxMDAwXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgIFwic2hvd0Vhc2luZ1wiOiBcInN3aW5nXCIsXG4vLyAgICAgICAgICAgICAgICAgICAgIFwiaGlkZUVhc2luZ1wiOiBcImxpbmVhclwiLFxuLy8gICAgICAgICAgICAgICAgICAgICBcInNob3dNZXRob2RcIjogXCJmYWRlSW5cIixcbi8vICAgICAgICAgICAgICAgICAgICAgXCJoaWRlTWV0aG9kXCI6IFwiZmFkZU91dFwiXG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIHRvYXN0ci53YXJuaW5nKGtleSArIFwiOlwiICsgb2JqW2tleV0pXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyAgICAgZnVuY3Rpb24gZ2V0V2VhdGhlcihjb29yZHMpIHtcbi8vICAgICAgICAgJC5hamF4KHtcbi8vICAgICAgICAgICAgIHVybDogJy9nZXRXZWF0aGVyLycsXG4vLyAgICAgICAgICAgICBkYXRhOiB7XG4vLyAgICAgICAgICAgICAgICAgJ2xhdCc6IGNvb3Jkcy5jb29yZHMubGF0aXR1ZGUsXG4vLyAgICAgICAgICAgICAgICAgJ2xvbic6IGNvb3Jkcy5jb29yZHMubG9uZ2l0dWRlLFxuLy8gICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4vLyAgICAgICAgICAgICAgICAgbGV0IGRhdGFPYmogPSBKU09OLnBhcnNlKGRhdGEpO1xuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwid2VhdGhlciBkYXRhIG9iamVjdFwiLCBkYXRhT2JqKVxuLy8gICAgICAgICAgICAgICAgIHByaW50VmFsdWVzKGRhdGFPYmopO1xuLy8gICAgICAgICAgICAgfSxcblxuLy8gICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnIpIHtcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIsIGVycik7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0pO1xuLy8gICAgIH07XG4vLyAgICAgZnVuY3Rpb24gcHJpbnRMb2NhdGlvbihjb29yZHMpIHtcbi8vICAgICAgICAgJChcIiNyZXNwb25kZVwiKS5odG1sKGA8c3Ryb25nPkxhdGl0dWRlOjwvc3Ryb25nPiAke2Nvb3Jkcy5sYXRpdHVkZX0gPGJyIC8+IDxzdHJvbmc+TG9uZ2l0dWRlOjwvc3Ryb25nPiAke2Nvb3Jkcy5sb25naXR1ZGV9IGApO1xuLy8gICAgIH1cblxufSkoKTsgIl19
},{}]},{},[1])
//# sourceMappingURL=app.js.map
