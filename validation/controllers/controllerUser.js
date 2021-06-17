const express = require('express');
const router = express.Router();
const modelUser = require('../model/modelUser');
const debug = require('../middlewares/debug');

const getUserList = (debug, async (req, res) => {

    console.log("Im in get user")

    try {

        const userlist = await modelUser.find({})

        res.json(userlist)

    } catch (error) {
        console.log("Error while getting user list", error)
    }
    res.json({
        message: "test"
    })
})

// module.exports = getUserList


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