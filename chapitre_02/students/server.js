const express = require("express")
const cors = require("cors")

const { students } = require('./students')

const app = express()

app.use(express.json())
app.use(cors())

const port = 4000

app.get("/students", (req, res) => {

    res.json(students)
})


app.post("/students", (req, res) => {
const newStudent = req.body
students.push(newStudent)
    res.json({
        message: "students added"
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