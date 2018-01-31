const { Wit, log } = require("node-wit");


// function checkResponseType(response) {
//     // console.log("entities", response.entities)
// }


module.exports.gotToWitAi = function (req, res) {


    const client = new Wit({
        accessToken: "SOAPDPJ3EQB2LLHLTLUQ57YOSXTTEARL"
    });

    client.message(req.query.q, {})

        .then((data) => {

            res.setHeader('Content-Type', 'application/json');
            res.json(data)
            return data

        })

        .then((response) => {

            // checkResponseType(response);
            
        })

        .catch(console.error);


    

}