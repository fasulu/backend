// Backend - Chapitre_01 - exercice Bonus-1

// Créez un nouveau dossier `bonus-1` dans `chapitre_01` pour cet exercice

// Refaites l'exercice  1 du `jour 8` du module JS, mais en créant vous même une version très simplifié de cet API. Mais, comment on pourrait le faire?

// Petite piste, vous pouvez copier le JSON de la réponse de l'API que vous voyez dans votre navigateur et le coller créer une variable avec ça dans votre fichier du serveur.

// Vous pouvez utiliser le site [https://jsonformatter.org/](https://jsonformatter.org/) avant de le coller dans votre fichier pour mieux comprendre ce JSON.

// Si vous utilisez l'extension `JSONView` , vous voyez une version converti de ce JSON, pour voir la version originale, et donc celle qu'il faut utiliser pour que le serveur marche, faites click droite sur le JSON dans le navigateur et "voir la source de la page" ou utilisez le raccourci `ctrl + u`

// Votre API devrait renvoyer le même contenu que l'URL utilisé pour l'exercice. Félicitations!

// Une fois que vous avez testé votre nouvel API dans le navigateur, créez un autre fichier JS pour l'appeler à l'aide du package `request` et affichez le résultat dans le terminal.

var request = require("request");

function getcountries() {
  request.get(
    // "http://restcountries.eu/rest/v2/all",
    "http://localhost:8000/country/all",
    function (error, response, body) {

      var countries = JSON.parse(body);

      var countryName = countries.map(function (element) {
        return element.name;
      });

      console.log(countryName.join(", "));

    });
}

getcountries();