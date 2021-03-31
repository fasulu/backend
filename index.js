const express = require('express');
const app = express();

const port = 8000;
app.listen(port, () => {
    console.log('Server started on port : ' + port);
});

app.get('/', (req, res) => {
    res.send('Beautiful homepage');
});


app.get('/hello', (req, res) => {
    res.send('hello world');
});

app.get('/hello', (req, res) => {
    res.send('hello world');
});


app.get('/', (req, res) => {
    res.send('Authors API');
});

app.get('/authors/1', (req, res) => {
    res.send('Lowrence Lowell, UK');
});

app.get('/authors/2', (req, res) => {
    res.send('William Shakespeare, UK');
});

app.get('/authors/3', (req, res) => {
    res.send('WCharles Dickens, UK');
});

app.get('/authors/4', (req, res) => {
    res.send('Oscar Wilde, UK');
});

app.get('/authors/1/books/', (req, res) => {
    res.send('Beowulf');
});

app.get('/authors/2/books/', (req, res) => {
    res.send('Hamlet, Othello, Romeo and Juliet, MacBeth');
});

app.get('/authors/3/books/', (req, res) => {
    res.send('Oliver Twistm A Christmas Carol');
});

app.get('/authors/4/books/', (req, res) => {
    res.send('The Picture of Dorian Gray, The Importance of Being Earnest');
});