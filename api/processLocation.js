const where = require('node-where');

class GetUserLocation {
    constructor(req, res, entity) {
        this.req = req
        this.res = res

        this.entity = entity;
    }

    getLocation() {

        if (where) {
            let searchThisLocation = this.entity[0].value;

            where.is(searchThisLocation, (error, locationData) => {

                if (locationData) {
                this.res.json(locationData);
                }
                else if (error) {
                    console.log("error", error)
                }
            })
        }
    }
}

module.exports = function getUserLocation(req, res, entity) {
    return new GetUserLocation(req, res, entity);
}