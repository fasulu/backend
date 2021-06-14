const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Hotel = require('../model/hotelSchema');

const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;

// connect to trippy database
mongoose.connect("mongodb://localhost:27017/trippy_basics", { useNewUrlParser: true }, { useUnifiedTopology: true }, (err) => {
    if (err) {

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

        return await Hotel.findOne({ _id: hotelID }) // search, if found return back to app.get(/hotels/:id)

    } catch (error) {

        console.log(error)

        return null
    }
}

// find hotel by Id

app.get("/hotels/:id", async (req, res) => {
    
            console.log("Im in get id")

    try {

        const hotelID = req.params.id           // get id from user

        console.log("Im in get id", hotelID)

        const id = await findHotelID(hotelID)   // send to findHotelID and get back if found

        console.log("Hotel Id found", id)

        if (id) {

            res.json({ id })      // show all details about the corresponding HotelID

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

    console.log("IAM IN POST REQUEST")
    
    try {

        const hotelBody = req.body                      // take body info
        const hotel = await findHotelID(hotelBody.name) // from body info find hotelID

        if (hotel) {

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
    } catch { err } {
        console.log(err)

        res.status(500).json({
            errorMessage: "there is a problem"
        })
    }
})

// update hotel using app.put

app.put("/hotels/:id", async (req, res, next) => {

    try {

        let requestid = req.params.id           // take hotelID params info
        const requestBody = req.body             // take hotelbody info

        console.log("hotel name from user", requestBody)

        console.log("hotelID from user", requestid)

        await Hotel.findById(requestid, (err, hotelUpdate) => {     // find given hotel id and update name field of the document with given hotel

            if (err) {
                res.json({ message: "Error while putting record" })
                next()
            }

            hotelUpdate.name = requestBody.name;    // hotel name in the body 

            hotelUpdate.save(function (err) {
                if (err) {
                    res.json({ message: "err", err })
                }
                res.json({ message: "Hotel updated" });
            })
        })

    } catch (error) {
        console.log("Something went wrong:-----", error)
    }
})

// delete record(document) using app.delete()

app.delete("/hotels/:id", async (req, res, next) => {

    console.log("IAM IN DELETE");

    try {

        let requestid = req.params.id           // take hotelID params info
        
        console.log("hotelID from user", requestid)

        const id = await findHotelID(requestid)   // send to findHotelID and get back if found

        console.log("Hotel Id found", id)   // hotel details found in document 

        if (id) {
            await Hotel.deleteOne({ _id: requestid}, (err, res) => {        // delete the entire document found in given hotelid 
                if(err){
                    console.log("error while deleting", err)
                }
            })

            res.json({ message: `${requestid} is deleted successfully` })

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

// Pagination

app.get("/hotels?limit=3", async (req, res) => {

    console.log("Im in pagination")

    const resultsPerPage = 3;
    

    try {

        const hotels = await Hotel.paginate({}, 1, 3)  // find all hotel details available in the collecion
        res.json(hotels)                            // list all hotel in json format

    } catch (error) {

        console.log(error)
        res.status(500).json({ errorMessage: "There was a problem :(" })    // on error show error message
    }
})

//************ */

app.get("*", (req, res) => {
    res.json({
        errorMessage: "The route was not found"
    }, 404)
})

app.listen(port, () => {
    console.log("Server is listening at port ", port);
})
