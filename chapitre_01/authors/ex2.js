// Backend Chapitre1 - Exercice 2

// Créer les routes qui affichent les auteurs et leurs nationalités par leur ID :

// `/authors/1/` Affichera sur le navigateur

// Lawrence Nowell, UK

// ***

// `/authors/2/` Affichera sur le navigateur

// William Shakespeare, UK

// ***

// `/authors/3/` Affichera sur le navigateur

// Charles Dickens, US

// ***

// `/authors/4/` Affichera sur le navigateur

// Oscar Wilde, UK

// ***

// Soyez smart ! imaginez que vous avez 200 auteurs à afficher vous n'allez pas écrire 200 routes... pensez aux routes avec paramètres et aux tableaux



const express = require('express');
const app = express();

const port = 8000;
app.listen(port, () => {
    console.log('Server started on port : ' + port);
});

app.get("/authors/:id", function (req, res) {
    var id = req.params.id;

    var listAuthors =
    [
        "Lawrence Nowell, uk",
        "William Shakespeare, uk",
        "Charles Dickens, us",
        "Oscar Wilde, uk"
    ];
    var authors = listAuthors[id - 1];

    res.send(authors);

});








// app.get('/authors/1', (req, res) => {
//     res.send('Lowrence Lowell, UK');
// });

// app.get('/authors/2', (req, res) => {
//     res.send('William Shakespeare, UK');
// });

// app.get('/authors/3', (req, res) => {
//     res.send('Charles Dickens, UK');
// });

// app.get('/authors/4', (req, res) => {
//     res.send('Oscar Wilde, UK');
// });

// app.get('/authors/1', (req, res) => {
//     res.send(authors[0]);
// });

// app.get('/authors/2', (req, res) => {
//     res.send(authors[1]);
// });

// app.get('/authors/3', (req, res) => {
//     res.send(authors[2]);
// });

// app.get('/authors/4', (req, res) => {
//     res.send(authors[3]);
// });