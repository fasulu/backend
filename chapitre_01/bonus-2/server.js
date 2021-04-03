// Bonus 2

// Créez un nouveau dossier `bonus-2` dans `chapitre_01` pour cet exercice

// Comme pour le Bonus 1, refaites l'exercice 3 du `jour 8` du module JS, 
// mais en créant vous même une version très simplifié de cet API.

// Pour éviter de faire 900 requêtes, une pour chaque Pokemon, copiez 
// seulement les données de certains pour tester (minimum 3). Si vous choisissez 
// cette option, il suffira pas tout simplement de copier le contenu et de le 
// coller dans une variable.

// Une autre façon de faire serait de utiliser la requête que l'API `pokeapi` 
// nous donne avec les paramètres `limit` et `offset` pour obtenir toute la 
// liste de Pokemons.

// Votre API devrait renvoyer le nom du pokemon selon son id (qu'on recevra 
// dans la requête). Félicitations!

// Une fois que vous avez testé votre nouvel API dans le navigateur, 
// créez un autre fichier JS pour l'appeler à l'aide du package `request` 
// et affichez le résultat dans le terminal.

var express = require("express");

var getNamePokemon = require("./dataPokemon.js");

// console.log(getNamePokemon);

var app = express();
var port = 8000;

app.get("/pokemon/:id", function (req, res) {
    
    // console.log("id sent by user",req.params.id);

    var id = req.params.id;

    // var name = getNamePokemon[id];

    res.json({name: getNamePokemon(id)});

});

app.listen(port, function (){
    console.log(`Server is listening in port ${port}` )
});