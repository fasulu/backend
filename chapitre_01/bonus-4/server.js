var express = require("express");

var dataCountries = require("./dataCountries.js");

// console.log(dataCountries);

var app = express();
var port = 8000;

app.get("/countries/:id", function (req, res) {
    
    // console.log("id sent by user",req.params.id);

    var id = req.params.id;

    console.log(id.substring(1));

    var name = dataCountries[id.substring(1)];
    // console.log(name);

    res.json({name: dataCountries(id.substring(1))});

});

app.listen(port, function (){
    console.log(`Server is listening in port ${port}` )
});