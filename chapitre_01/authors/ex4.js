const express = require('express');
const app = express();

const port = 8000;

var authors =
    [
        {
            name: "Lawrence Nowell",
            nationality: "UK",
            books: ["Beowulf"]
        },
        {
            name: "William Shakespeare",
            nationality: "UK",
            books: ["Hamlet", "Othello", "Romeo and Juliet", "MacBeth"]
        },
        {
            name: "Charles Dickens",
            nationality: "US",
            books: ["Oliver Twistm A Christmas Carol"]
        },
        {
            name: "Oscar Wilde",
            nationality: "UK",
            books: ["The Picture of Dorian Gray", "The Importance of Being Earnest"]
        }
    ];

app.listen(port, () => {
    console.log('Server started on port : ' + port);
});

app.get("/json/authors/:id", function (req, res) {

    var indexArray = req.params.id - 1;

    var author = authors[indexArray];

    // to stop showing books object in the list we are doing the
    // following resultObj code

    var resultObj = {
        name: author.name,
        nationality: author.nationality
    }

    // res.json(author);

    res.json(resultObj);
});

app.get("/json/authors/:id/books",
    function (req, res) {

        var id = req.params.id;

        var author = authors[id - 1];

        // res.json({ message: "Testing json authors books" });

        res.json({
            books: author.books
        });
    }
);
