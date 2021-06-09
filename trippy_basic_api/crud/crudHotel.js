const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Hotel = require('../model/hotel');
const Restaurant = require('../model/restaurant');

const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;

// connect to trippy database
mongoose.connect("mongodb://localhost:27017/trippy_basics", (err) => {
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

app.get("/hotels", async (req, res) => {    

    console.log("Im in get")

    try {

        const hotels = await Hotel.find({}) // find all hotel details available in the collecion
        res.json(hotels)                    // list all hotel in json format

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

app.get("*", (req, res) => {
    res.json({
        errorMessage: "The route was not found"
    }, 404)
})

app.listen(port, () => {
    console.log("Server is listening at port ", port);
})
