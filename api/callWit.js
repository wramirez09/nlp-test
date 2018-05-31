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

        if (entity.local_search_query){

            const where = getuserlocation(req, res, entity.local_search_query)
            let location = where.getLocation();

        }
        else if(entity.intent){

            console.log("this is intent", entity.intent);

            res.json(entity.intent);
        }


    })

    .catch(console.error);


    

}