var request = require("request");

request.get(
    'http://localhost:8000/countries', 

    function (err, response, data) {

        console.log('data', data);

});