const express = require('express')
const router = express.Router();

const getUserList = require('../controllers/controllerUser')

router.get("/", getUserList)

router.all("*", (req, res) => {
    res.status(404).json({
        errorMessage: "The requested route is not found"
    })
})

module.exports = getUserList



