const express = require("express")
const cors = require("cors")
const { popularMovies } = require("./movielist")

const app = express()

app.use(cors())

const port = 4000

app.get("/popularMovies", (req, res) => {

    res.json({
        "results":popularMovies
    })
})

// app.get("/movie/:id", (req, res) => {
//     const id = parseInt(req.params.id)
//     const movieFound = popularMovies.find(elem => {
//         console.log("movie found",elem)
//     })
//     res.json(movieFound)
// })

app.listen(port, () => {
    console.log("Server à l'écoute dans le port " + port);
})