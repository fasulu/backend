
//  Bonus 3

// Vous avez possiblement remarqué que toutes ces données dans notre 
// fichier du serveur nous font perdre en lisibilité du code et separation 
// de taches, donc bougez les variables des exercices bonus 1 & 2 dans de 
// fichiers différents et importez les depuis votre fichier serveur.

var express = require("express");

var dataCountries = require("./dataCountries.js");

console.log(dataCountries);

var app = express();
var port = 8000;

app.get("/countries/all", function (req, res) {
    res.json(dataCountries);
});

app.listen(port, function (){
    console.log(`Server is listening in port ${port}` )
});