const express = require("express");
const cors = require("cors");

const app = express()
app.use(cors())
app.use(express.json())

const port = 8000
const authorizeUser = true;

const superHeros = [
    {
        name: "Iron Man",
        power: ["money"],
        color: "red",
        isAlive: true,
        age: 46,
        image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
    },
    {
        name: "Thor",
        power: ["electricty", "worthy"],
        color: "blue",
        isAlive: true,
        age: 300,
        image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
    },
    {
        name: "Daredevil",
        power: ["blind"],
        color: "red",
        isAlive: false,
        age: 30,
        image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
    }
]

// following app.use is a middleware
// which shows the information about the connection when page refresh
// the next (middleware) will take to the next app.get
// if user not authorized gives error msg in webpage
app.use("/",(err, req, res, next) => {
    console.log("new conn request", req.hostname, req.path, req.method);
    if (authorizeUser) {
        next()    
    } else {
        res.send('<h1>Un authorised to visit the page</h1>')
    }
})

// following app.get request's info from server about heros
app.get("/heros", (req, res) => {
    res.json(superHeros)
})

// following app.get pick hero name as params and search using finds in the list
// of superHeros, and shows error is not found
app.get("/heros/:name", (req, res) => {
    const name = req.params.name            // take the params value from the address bar stores in name constant
    console.log(name)
    const heroFound = superHeros.find(elem => {         // search using find syntax
        console.log(elem.name)
        return elem.name.toLowerCase() === name.toLowerCase()   // dbase and user value made in to same lowercase to avoid comparison errors
    })
    if (heroFound) {
        console.log(heroFound)
        res.json(heroFound)     // response all details of hero found as json value 
    }else{
        // res.send('<h1>hero not found</h1>')
        console.log("Hero not found")
    }    
})

// function changeMiniscule(name, next){
//     const heroFound = superHeros.find(elem => {
//         console.log(elem.name)
//         if (elem.name.toLowerCase() === name.toLowerCase()){
//             next(heroFound)
//         }
//     })
// }


app.get("/heros/:name/power", (req, res) => {

    console.log(req)

    const name = req.params.name
    console.log(name)

    // changeMiniscule(name);
    
    const heroFound = superHeros.find(elem => {
        console.log(elem.name)
        return elem.name.toLowerCase() === name.toLowerCase()
    })
    if (heroFound) {
        console.log(heroFound)
        res.json(heroFound.power)

    }else{

        console.log("Hero power not found")

    }

    res.json("text")
})

// following app.post send info to add into server dbase,
// once added gives info that it is added
app.post("/heros", (req, res) => {
    const newHero = req.body    // take body of the value save in newHero constant
    superHeros.push(newHero)    // add the newHero value in the superHeros list
    res.json({
        message: "Hero added",  // show that the hero added
        newHero
    })

})

// following app.use is the middleware which reach if above app.get fails
// the following code will reach and display 404 error on the webpage if above routes fail to work
// app.use((req, res, next) => {
//     res.status(404).render('404', {title: 'Error 404, resource cant be reached'});
//     next()
// })

// app.get("*", (req, res) => {
//     res.json({
//         message: "This route does not exist"
//     })
// })

// app.use(errHandler)

app.listen(port, () => {
    console.log("server is listening in port", port)
})