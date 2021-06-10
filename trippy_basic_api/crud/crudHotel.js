const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Hotel = require('../model/hotelSchema');
const Restaurant = require('../model/restaurantSchema');

const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;

// connect to trippy database
mongoose.connect("mongodb://localhost:27017/trippy_basics", { useNewUrlParser: true }, { useUnifiedTopology: true },  (err) => {
    if(err) {

        console.log(err);

    } else {
        console.log("I'm connected to the database")
    }
});

const debug = (req, res, next) => {

    console.log("I received a request!"),
    next();

}

// shwow all hotels in the collection
app.get("/hotels", async (req, res) => {    

    console.log("Im in get")

    try {

        const hotels = await Hotel.find({})  // find all hotel details available in the collecion
        res.json(hotels)                            // list all hotel in json format

    } catch (error) {

        console.log(error)
        res.status(500).json({ errorMessage: "There was a problem :(" })    // on error show error message
    }   
})

const findHotelID = async (hotelID) => {

    console.log("Im in findHotelid", hotelID)   // show the the received hotelID from app.get(/hotels/:id)

    try {

        return await Hotel.findOne({_id: hotelID }) // search, if found return back to app.get(/hotels/:id)

    } catch(error) {

        console.log(error)

        return null
    }
}

// find hotel Id
app.get("/hotels/:id", async (req, res) => {
    try {

        console.log("Im in get id") 

        const hotelID = req.params.id           // get id from user

        console.log("Im in get id",hotelID)

        const id = await findHotelID(hotelID)   // send to findHotelID and get back if found

        console.log("Hotel Id found", id)

        if(id) {

            res.json({id})      // show all details about the corresponding HotelID

        } else {

            res.json({
                message: "ID not found" // exit with json error message
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ errorMessage: "There was a problem :(" })
    }
})

// add new hotel
app.post("/hotels", async (req, res, next) => {

    try {
        
        const hotelBody = req.body                      // take body info
        const hotel = await findHotelID(hotelBody.name) // from body info find hotelID

        if(hotel) {

            res.status(400).json({
                message: "The hotel already exist"

            })
        } else {

            next()

        }
    } catch (error) {

        console.log(error)

        res.status(500).json({
            errorMessage: "There is a problem"
        })
    }
}, async (req, res) => {

    try {
        
        const hotel = req.body
        const newHotel = await Hotel.create(hotel)  // take hotel info from body and add it into hotel collection 

        res.json({
            message: "Hotel created",
        
        })
    } catch{err} {
        console.log(err)

        res.status(500).json({
            errorMessage: "there is a problem"
        })
    }
})

// update hotel using app.put

app.put("/hotels", async (req, res, next) => {

    try {

        const hotelBody = req.body                      // take body info
        console.log("hotelID from user", hotelBody)
        const hotel = await findHotelID(hotelBody) // from body info find hotelID

        if(hotel) {

            res.status(400).json({
                message: "The hotel already exist"
            })

            next()

        } else {
            res.status(400).json({
                message: "The hotel not exist in the list"
            })
        }   
    } catch (error) {
        console.log(error)
    }
})


app.get("*", (req, res) => {
    res.json({
        errorMessage: "The route was not found"
    }, 404)
})

app.listen(port, () => {
    console.log("Server is listening at port ", port);
})
