
const gcl = require("./getGreatestConfidence");
class CheckEntityType  {
    constructor(wit_data){
        this.witDataObject = wit_data
    }

    getEntity(){
        const entity = this.witDataObject.entities;
        // inint class  
        const greatCl = gcl.getGcl(entity);
        //get greatest confidence
        
        let results = greatCl.results;
        let confidenceArr = [];
        for(let key in results){
            console.log("key", results[key][0]);
            confidenceArr.push(results[key][0] + ":" + results[key][0].confidence)
        }

        console.log("conf array", confidenceArr)

        // console.log("GCL object", lsq_confidence);
        return entity
    }

    getEntireObject(){
        return this.witDataObject;
    }

}

module.exports.checkEntityType = function(dataObject) {
    return new CheckEntityType(dataObject);
}