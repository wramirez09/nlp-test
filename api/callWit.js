const { Wit, log } = require("node-wit");
const checkType = require("./checkEntityType");
const getuserlocation = require("./processLocation");



module.exports.gotToWitAi = function (req, res) {


    const client = new Wit({
        accessToken: "SOAPDPJ3EQB2LLHLTLUQ57YOSXTTEARL"
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
        console.log("this is an entity", entity);
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