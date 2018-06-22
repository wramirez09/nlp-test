const { Wit, log } = require("node-wit");
const checkType = require("./checkEntityType");
const getuserlocation = require("./processLocation");
require('dotenv').config();


module.exports.gotToWitAi = function (req, res) {


    const client = new Wit({
        accessToken: process.env.WIT_ACCESS_TOKEN
    });

    client.message(req.query.q, {})

    .then((data) => {
        // create object instance by passing in new data returned from wit promise 
        let checkdataType = checkType.checkEntityType(data);

        // grab entity from new object 
        let entity = checkdataType.getEntity();
        return entity

    })

    .then((entity) => {
        // console.log("returned entiy", entity);
    //     if (entity.bye) {
    //         console.log("bye", entity.bye);
    //         res.json(entity);
    //     }
    //    else if (entity.local_search_query){
    //         // create instance of object
    //         const where = getuserlocation(req, res, entity.local_search_query);
    //         // uses response object to send results
    //         where.getLocation();

    //     }
        
    //     else if(entity.greetings ){

    //         console.log("this is greeting", entity.greetings);

    //         res.json(entity.greetings);
    //     }

    })

    .catch(console.error);


    

}