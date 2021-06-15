const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for user
const userSchema = new Schema({
    name: String,
    email: String,
    age: { type: Number, min: 1, max: 99},
    city: String
});

const User = mongoose.model("User", userSchema);

module.exports = User ;   // user export