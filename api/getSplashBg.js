const axios = require("axios");
let unSpalshUrl = process.env.UNSPLASH_CID;



module.exports.getSplashBg = (req, res) => {

    axios.get(unSpalshUrl).then((response)=>{
        return response;
    })
    .then((responseData)=>{
        res.send(responseData.data);
        
        
    })
    .catch((error) => {

            console.log("error", error)
    });
}