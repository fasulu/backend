const express = require('express');
const app = express();

const port = 8000;
app.listen(port, () => {
    console.log('Server started on port : ' + port);
});

var authors =
    [
        "Lawrence Nowell",
        "William Shakespeare",
        "Charles Dickens",
        "Oscar Wilde"
    ];

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

app.get('/authors/1', (req, res) => {
    res.send(authors[0]);
});

app.get('/authors/2', (req, res) => {
    res.send(authors[1]);
});

app.get('/authors/3', (req, res) => {
    res.send(authors[2]);
});

app.get('/authors/4', (req, res) => {
    res.send(authors[3]);
});