var request = require("request");

request.get(
    'http://localhost:8000/countries', 

    function (err, response, data) {

        console.log("err", err);

        console.log(typeof 'data', data);  //output is in string but looks like array ["France","Japan","India","Tunisia","Argentina","Morocco"] // 

        var countries = JSON.parse(data);   // to change into object

        // console.log(typeof data);

        console.log(typeof countries);
        console.log(countries);
        console.log(countries.reverse());   // tried to reverse the order of given countries

});