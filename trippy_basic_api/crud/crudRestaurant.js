const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Restaurant = require('../model/restaurantSchema');
const { findById } = require('../model/restaurantSchema');

const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;

// connect to trippy database
mongoose.connect("mongodb://localhost:27017/trippy_basics", { useNewUrlParser: true }, { useUnifiedTopology: true }, { useUnifiedTopology: true }, (err) => {
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

// shwow all restaurants in the collection

app.get("/restaurants", async (req, res) => {

    console.log("Im in get")

    try {

        const restaurants = await Restaurant.find({})  // find all restaurants details available in the collecion
        res.json(restaurants)                            // list all restaurants in json format

    } catch (error) {

        console.log(error)
        res.status(500).json({ errorMessage: "There was a problem :(" })    // on error show error message
    }
})

// find restaurant by Id

app.get("/restaurants/:id", async (req, res) => {

    console.log("I'm in get restaurant ID")

    try {

        console.log("User requested restaurant Id", req.params.id)

        console.log(await Restaurant.findById({ _id: req.params.id }))

        const restaurantDetail = await Restaurant.findById({ _id: req.params.id });

        if (restaurantDetail) {
            res.json({
                message: `${req.params.id} found in the restaurant list`,
                restaurantDetail
            })
        } else {
            res.json({

                message: `${req.params.id} is not found in the restaurant list`
            })
        }

    } catch (error) {
        console.log("Error while getting restaurant list", error)
    }
})

const findRestaurantID = async (restaurant) => {

    console.log("IAM IN findRestaurantID", restaurant)

    try {

        // console.log("Restaurant found ", await Restaurant.findOne({ _id: restaurant }))
        return await Restaurant.findOne({ _id: restaurant })

    } catch (error) {
        console.log(error)
        return null
    }
}

// add new restaurant

app.post("/restaurants", async (req, res, next) => {

    console.log("IAM IN POST REQUEST")

    try {

        console.log("Restaurant requested to add in the list ", req.body);

        const restaurant = req.body
        const newRestaurant = await findRestaurantID(restaurant.name)
        console.log("returned value", newRestaurant);

        if (newRestaurant) {
            res.status(400).json({
                message: "Restaurant already exist in the list"
            })
        } else {

            await Restaurant.create(restaurant)

            res.json({
                message: "Restaurant added to the list"

            })
        }

        next()

    } catch (error) {
        console.log(error)
    }
})

// update restaurant using app.put()

app.put("/restaurants/:id", async (req, res, next) => {

    try {

        let requestid = req.params.id
        const requestBody = req.body

        console.log("Restaurant name from user is ", requestBody)

        console.log("RestaurantId from user is ", requestid)

        await Restaurant.findById(requestid, (err, restaurantUpdate) => {

            if (err) {
                res.json({ message: "Error while putting record" })
                next()
            }

            restaurantUpdate.name = requestBody.name;

            restaurantUpdate.save(function (err) {
                if (err) {
                    res.json({ message: "error", err })
                }
                res.json({ message: "Restaurant updated" })
            })
        })

    } catch (error) {
        console.log("Something went wrong:-----", error)
    }
})

// delete record using app.delete()

app.delete("/restaurants/:id", async (req, res, next) => {

    console.log("IAM IN DELETE RESTAURANT");

    try {

        let requestId = req.params.id
        console.log("Restaurant ID received from user", requestId);

        const id = await findRestaurantID(requestId);

        console.log("Restaurant Id found", id);

        if (id) {
            await Restaurant.deleteOne({ _id: requestId }, (err, res) => {
                if (err) {
                    console.log("error while deleting record")
                }
            })

            res.json({ message: `${requestId} is deleted from restaurant list`})

        } else {
            res.json({ message: "ID not found" })
        }

    } catch (error) {
        console.log("Something went wrong...", error)
    }
})

// Pagination

// app.get("/restaurants?limit=3", async (req, res) => {
    const limit3PerPage = async () => {

        console.log("Im in pagination")
    
        try {
    
            const restaurants = await Restaurant.aggregate([
    
                {$limit: 3}                             // display 3 items per page
            
            ])  
            console.log(restaurants)
    
        } catch (error) {
    
            console.log(error)
            res.status(500).json({ errorMessage: "There was a problem :(" })    // on error show error message
        }
    }

    const limit2PageWith2PriceCategory = async () => {

        console.log("Im in pagination")
    
        try {
    
            const restaurants = await Restaurant.aggregate([
    
                {
                    // $match: { stars: { $gt : 4 } }    // display matches with greater than 4 stars
                    // $match: { stars: 4 }           // display matches with 4 stars
                    $match: { priceCategory: { $gt : 2 } }  // display matches with greater than 2 priceCategory
                },
    
                {$limit: 2}                             // display 2 items per page
            
            ])  
            console.log(restaurants)
    
        } catch (error) {
    
            console.log(error)
            res.status(500).json({ errorMessage: "There was a problem :(" })    // on error show error message
        }
    }

    limit3PerPage()

    limit2PageWith2PriceCategory()

//************* */

app.get("*", (req, res) => {
    res.json({
        errorMessage: "The route was not found"
    }, 404)
})

app.listen(port, () => {
    console.log("Server is listening at port ", port);
})