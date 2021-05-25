const express = require("express")
const cors = require("cors")
// const movies = require("./movies.json")
const movies = require('./movielist.json');

const app = express()

app.use(cors())

const port = 3000

app.get("/movies", (req, res) => {

    res.json(movies)
})

app.listen(port, () => {
    console.log("Server à l'écoute dans le port " + port);
})