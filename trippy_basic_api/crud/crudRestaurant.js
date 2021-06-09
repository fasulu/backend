const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Restaurant = require('../model/restaurant');

const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;

mongoose.connect("mongodb://localhost:27017/trippy_basics", (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("I'm connected to the database")
    }
});
