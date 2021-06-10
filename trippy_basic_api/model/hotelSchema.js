const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name: String,
    address: String,
    city: String,
    country: String,
    stars: { type: Number, min: 1, max: 5},
    hasSpa: Boolean,
    hasPool: Boolean,
    priceCategory: { type: Number, min:1, max: 3 } 
});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;

// const restaurantSchema = new Schema({
//     name: String,
//     address: String,
//     city: String,
//     country: String,
//     stars: { type: Number, min: 1, max: 5},
//     cuisine: String,
//     priceCategory: { type: Number, min:1, max: 3 } 
// });

// const Restaurant = mongoose.model("Restaurant", restaurantSchema);
// module.exports = Restaurant ;

// module.exports = { Hotel, Restaurant }