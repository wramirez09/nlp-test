



/**
 * @param  {} data
 */
class CheckEntityType  {
    constructor(wit_data){
        this.witDataObject = wit_data,
        this.init();
        
    }

    init(){
        
    }

    getEntity(){
        const entity = this.witDataObject.entities;
        return entity
    }

    getEntireObject(){
        return this.witDataObject;
    }

}

exports.checkEntityType = function(dataObject) {
    return new CheckEntityType(dataObject);
}