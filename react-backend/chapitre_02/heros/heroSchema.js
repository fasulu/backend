const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const heroSchema = new Schema({
    name: String,
    power: [String],
    color: String,
    isAlive: String,
    age: Number,
    image: String,
    created: { type: Date, default: Date.now() }
});

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;