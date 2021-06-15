const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for user
const userSchema = new Schema({
    name: String,
    email: String,
    age: { type: Number, min: 1, max: 99},
    city: String
});

// schema for hotel room
const roomSchema = new Schema({
    people: Number,
    price: Number,
    hasBathroom: Boolean
})

const Hotel = mongoose.model("Hotel", hotelSchema);
const Room = mongoose.model("Room", roomSchema);

module.exports = { Hotel, Room };   // hotel and room export