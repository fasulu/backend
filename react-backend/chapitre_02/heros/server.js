const express = require("express");
const cors = require("cors");

// import { superHeros } from 'dataHeros.mjs'

// const fs = require('fs');
// const filePath = 'errorLog.txt'

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

// app.use("/", (err, req, res, next) => {
app.use(function(req, res, next){
    console.log("new conn request", req.hostname);
    console.log("Path", req.path);
    console.log("Request method", req.method);
    if (authorizeUser) {
        console.log("Authorized User")
        next()                          // goes to next funtion
    } else {        
        res.send('<h1>Un authorised to visit the page</h1>')     // wll appear error message direct on webpage
        next()                          // goes to next funtion
    }
})

//****** a type of middleware  */

const call = (res, req, next) => {
    console.log("app.get() called me")
    next()                           // goes to next funtion
}

//****** */

const transformName = (req, res, next) => {       // middleware to change into lower case
    
    if (req.body === undefined){
        console.log("Im in transformName", req.body.name)
        res.json({
            errorMessage: "Required data missing"
        })
    } else {
        req.body.name = req.body.name.toLowerCase()   
        next()     
    }
    
}
//******************* */

// following app.get request's info from server about heros
app.get("/heros", call, (req, res, next) => {        // this is a example how to call a middleware("call") for a specific job
    try {
        res.json(superHeros)

    } catch {
        console.log(err)
    }
})

// following app.get pick hero name as params and search using finds in the list
// of superHeros, and shows error is not found
// app.get("/heros/:name", transformName, (req, res) => {
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
    } else {
        
        console.log("Hero not found")
        res.send('<h1>hero not found</h1>')
    }
})

//***************** */

// Delete a hero from the list
// app.delete('/', (req, res) => {
//     res.send("DELETE Request Called")
//   })

// app.delete('/heros/:name', transformName, (req,res) => {
app.delete('/heros/:name', (req,res) => {

    console.log("Im params name in app.delete(name)", req.params.name)

    for(i=0; i<=superHeros.length-1;i++) {

        console.log(" delete superheros",superHeros[i])

        if(superHeros[i].name.toLowerCase() === req.params.name.toLowerCase()){

            console.log("hero found", superHeros[i].name.toLowerCase(), req.params.name.toLowerCase())

            res.json({               
                
                message:"Deleted"
            })
        }
    }
})

app.delete('/heros/:name/power/:power', (req,res) => {

    console.log("Im params name in app.delete(name)", req.params.name)
    console.log("Im params name in app.delete(power)", req.params.power)

    for(i=0; i<=superHeros.length-1;i++) {

        console.log("delete power superheros",superHeros[i])

        if(superHeros[i].name.toLowerCase() === req.params.name.toLowerCase()){

            console.log("hero found", superHeros[i].name.toLowerCase(), req.params.name.toLowerCase())

            res.json({               
                
                message:"Deleted"
            })
        }
    }
})


//******************* */

// function changeMiniscule(name, next){
//     const heroFound = superHeros.find(elem => {
//         console.log(elem.name)
//         if (elem.name.toLowerCase() === name.toLowerCase()){
//             next(heroFound)      // passing result in this way can make data crush or lost
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

    } else {

        console.log("Hero power not found")

    }

    res.json("text")
})

//******************* */

// // following app.post send data to add into server dbase without verification,
// // once added gives info that it is added
// app.post("/heros", (req, res) => {
//     const newHero = req.body    // take body of the value save in newHero constant
//     superHeros.push(newHero)    // add the newHero value in the superHeros list
//     res.json({
//         message: "Hero added",  // show that the hero added
//         newHero
//     })

// })

// the following code verifies before saving the new hero in the database
app.post("/heros", (req, res, next) => {
    const newHero = req.body    // take body of the value save in newHero constant
    console.log("newHero is", newHero)
    //************* */
    // check is the superhero already in the database
    // if found, stores the hero object in heroFound else stores 'undefined' in the const
    const heroFound = superHeros.find(elem => {
        console.log(elem.name)

        return elem.name.toLowerCase() === newHero.name.toLowerCase()

    })
    console.log("hero found in db is ",typeof heroFound)
    console.log("user entered hero is ",typeof newHero)

    if(heroFound === undefined) {   // verify if the heroFound has an object or not (if not it stores as 'undefined' in the const heroFound)
        
        console.log("hero not found in the list")
        
        superHeros.push(newHero)    // add the newHero value in the superHeros list
        
        res.json({
            message: "Hero added",  // show that the hero added
            newHero                 // display new hero details
        })

    } else {
        console.log("hero found in the list")
    }

    next()

})


//******************* */

// following app.use is the middleware which reach if above app.get fails
// the following code will reach and display 404 error on the webpage if above routes fail to work
// app.use((req, res, next) => {
//     res.status(404).render('404', {title: 'Error 404, resource cant be reached'});
//     next()
// })

// the following code executes any request other than mentioned above
app.get("*", (req, res) => {
    res.json({
        message: "This route does not exist"
    })
})

// app.use(errHandler)

app.listen(port, () => {
    console.log("server is listening in port", port)
})
