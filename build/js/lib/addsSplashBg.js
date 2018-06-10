


class Addbg {

    constructor(apiEndpoint){
        this.apiEndpoint = apiEndpoint;
        this.init = this.init.bind(this);
        this.init();
    }

    init(){
        console.log("add bg class init");
        this.fetch(this.apiEndpoint);
    }

    fetch(url){
        this.fetch(url)
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            printBg(data);
        })
    }

    printBg(data){
        const body = document.getElementsByTagName("body");
        let number = Math.floor(Math.random() * 10) + 1;
        body.style.backgroundImage = data[number].url.full

    }


}

module.exports = function(){
    return new Addbg;
}


/**
 * //     function addSplashBg(params) {
//         let unsplashUrl = "/getSplashBg/";

//         fetch(unsplashUrl)
    
//         .then(function (response) {
//                 return response.json();
//             })

//         .then(function (returned_data) {

//             let number = Math.floor(Math.random() * 10) + 1;
//             $('body').css('background-image', 'url(' + returned_data[number].urls.full + ')');
//         });
//     }
 * 
 */