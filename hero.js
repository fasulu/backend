const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/hero", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("I'm connected to the database")
    }
});

const port = 8000;

const app = express();
app.use(cors);

app.use(express.json());
app.get("/", (req, res) => {
    res.json()
})

const heroSchema = new mongoose.Schema({
    name: String,
    power: [String],
    color: String,
    isAlive: Boolean,
    age: Number,
    image: String,
    created: { type: Date, default: Date.now() }
})

const Hero = mongoose.model("hero", heroSchema)

Hero.insertMany(
    [
        {
            name: "Iron Man",
            power: ["money"],
            color: "red",
            isAlive: "true",
            age: 46,
            image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
        },
        {
            name: "Thor",
            power: ["electricty", "worthy"],
            color: "blue",
            isAlive: "true",
            age: 300,
            image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
        },
        {
            name: "Daredevil",
            power: ["blind"],
            color: "red",
            isAlive: "false",
            age: 30,
            image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
        }
    ]).then(data => {
        console.log("data", data)
    }).catch(error => {
        console.log("Error", error)
    })

    app.listen(port, () => {
        console.log("Server is listenin at port ", port);
    })