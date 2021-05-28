const express = require("express")
const cors = require("cors")

// const { students } = require('./students')


const app = express()
app.use(cors())
app.use(express.json())


const port = 4000

const students = []

app.get("/students", (req, res) => {

    res.json(students)
})


app.post("/students", (req, res) => {
const newStudent = req.body

students.push(newStudent)

    res.json({
        message: "students added",
        newStudent
    })
})

app.get("*", (req, res) => {
    res.json({
        message: "The route does not exist"
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