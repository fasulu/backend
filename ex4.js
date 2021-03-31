const express = require('express');
const app = express();

const port = 8000;
app.listen(port, () => {
    console.log('Server started on port : ' + port);
});

var authors =
    [
        { name: "Lawrence Nowell", nationality: "UK" },
        { name: "William Shakespeare", nationality: "UK" },
        { name: "Charles Dickens", nationality: "UK" },
        { name: "William Shakespeare", nationality: "UK" }
    ]

// app.get('/authors/1/books/', (req, res) => {
//     res.send('Beowulf');
// });

// app.get('/authors/2/books/', (req, res) => {
//     res.send('Hamlet, Othello, Romeo and Juliet, MacBeth');
// });

// app.get('/authors/3/books/', (req, res) => {
//     res.send('Oliver Twistm A Christmas Carol');
// });

// app.get('/authors/4/books/', (req, res) => {
//     res.send('The Picture of Dorian Gray, The Importance of Being Earnest');
// });

app.get('/authors/name/', (req, res) => {
    res.send(authors.name);
});


