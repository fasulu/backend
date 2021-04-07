var express = require('express');
var app = express();

var port = 8000;

app.get('/countries', function (req, res) {
    var listCountries = [
        "France",
        "Japan",
        "India",
        "Tunisia",
        "Argentina",
        "Morocco"
    ]

    res.json(listCountries);
})

app.listen(port, function () {
    console.log(`Server is listening in port number ${8000}`);
});

