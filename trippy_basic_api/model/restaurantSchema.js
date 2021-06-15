const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create new schema for restaurant

const restaurantSchema = new Schema({
    name: String,
    address: String,
    city: String,
    country: String,
    stars: { type: Number, min: 1, max: 5},
    cuisine: String,
    priceCategory: { type: Number, min:1, max: 3 },
    tableId: { type: Array, String }
});

//create new schema for restaurant table

const tableSchema = new Schema({
    seat: Number,
    iSVIP: Boolean
})

const Restaurant = mongoose.model("Restaurant", restaurantSchema);  // create Restaurant mode from restaurantSchema
const Tables = mongoose.model("Tables", tableSchema);               // create Tables mode from tableSchema

module.exports = { Restaurant, Tables };    // export restaurant and table modules