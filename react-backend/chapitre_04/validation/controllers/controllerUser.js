const express = require('express');
const router = express.Router();
const modelUser = require("../model/modelUser");
const debug = require('../middlewares/debug');


router.get("/", debug, async (req, res) => {

    try {

        const user = await modelUser.find().exec();

        res.json(user)
        
    } catch (error) {

        console.log("Error in get/users", error)

        res.json({
            message: "Error while searching user list"
        })
        
    }
})

module.exports = router