class GreatCL {
    constructor(objectOfResults){
    //this.init();
    this.results = objectOfResults;
    }

    init(){
       
      //  this.getGreatCl();
    }

    getGreatCl(){
        const results = this.results;
        // console.log("results", results);
        console.log("GreatCL inits", this.results);
    }
}

module.exports.getGcl = function(gcl) {
    return new GreatCL(gcl);
}