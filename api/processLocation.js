const where = require('node-where');

class GetUserLocation {
    constructor(req, res, entity) {
        this.init()
        this.req = req
        this.res = res

        this.entity = entity;
    }

    init() {
        // console.log("GetUserLocation created");
    }

    getLocation() {

        if (where) {

            let searchThisLocation = this.entity[0].value;
            console.log("searchThisLocation", searchThisLocation);

            where.is(searchThisLocation, (error ,locationData) => {

                if (locationData){
                    this.res.json(locationData);
                }
                else if(error){
                    console.log("error", error)
                }

                

            })
        }
    }
}

module.exports = function getUserLocation(req, res, entity) {
    return new GetUserLocation(req, res, entity);
}