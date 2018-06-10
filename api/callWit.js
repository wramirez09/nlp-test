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
        console.log("data", data);
        // create object instance by passing in new data returned from wit promise 
        let checkdataType = checkType.checkEntityType(data);

        // grab entity from new object 
        let entity = checkdataType.getEntity();
        console.log("new entity", entity);
        return entity

    })

    .then((entity) => {

        if (entity.local_search_query && !entity.greetings){

            const where = getuserlocation(req, res, entity.local_search_query)
            let location = where.getLocation();

        }
        else if(entity.greetings && !entity.local_search_query){

            console.log("this is intent", entity.greetings);

            res.json(entity);
        }


    })

    .catch(console.error);


    

}