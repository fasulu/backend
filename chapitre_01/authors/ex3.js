// Backend - Chapitre_01 Exercice 3

// Créer les routes qui affichent les livres de chaque auteurs.

// `/authors/1/books/` Affichera dans le navigateur

// Beowulf

// ***

// `/authors/2/books/` Affichera dans le navigateur

// Hamlet, Othello, Romeo and Juliet, MacBeth

// ***

// `/authors/3/books/` Affichera dans le navigateur

// Oliver Twist, A Christmas Carol

// ***

// `/authors/4/books/` Affichera dans le navigateur

// The Picture of Dorian Gray, The Importance of Being Earnest

// ***

// Penser à utiliser un array comme pour l’exercice 1.



const express = require('express');
const app = express();

const port = 8000;
app.listen(port, () => {
    console.log('Server started on port : ' + port);
});

app.get("/authors/:id",

    function (req, res) {
        
        var id = req.params.id;

        var listAuthors =
            [
                "Lawrence Nowell, UK",
                "William Shakespeare, UK",
                "Charles Dickens, US",
                "Oscar Wilde, UK"
            ];

        var authors = listAuthors[id - 1];

        res.send(authors);

    }

);

app.get("/authors/:id/books",
    function (req, res) {

        var indexArray = req.params.id - 1;

        var listBooks =
            [
                'Beowulf',
                'Hamlet, Othello, Romeo and Juliet, MacBeth',
                'Oliver Twistm A Christmas Carol',
                'The Picture of Dorian Gray, The Importance of Being Earnest'
            ];

        var books = listBooks[indexArray];

        res.send(books);

    }
);



// app.get('/authors/1/books/', (req, res) => {
//     res.send('Beowulf');
// // });

// // app.get('/authors/2/books/', (req, res) => {
// //     res.send('Hamlet, Othello, Romeo and Juliet, MacBeth');
// // });

// // app.get('/authors/3/books/', (req, res) => {
// //     res.send('Oliver Twistm A Christmas Carol');
// // });

// // app.get('/authors/4/books/', (req, res) => {
// //     res.send('The Picture of Dorian Gray, The Importance of Being Earnest');
// // });

// app.get('/authors/1/books/', (req, res) => {
//     res.send(books[0]);
// });
// app.get('/authors/1/books/', (req, res) => {
//     res.send(books[1]);
// });
// app.get('/authors/1/books/', (req, res) => {
//     res.send(books[2]);
// });
// app.get('/authors/1/books/', (req, res) => {
//     res.send(books[3]);
// });

