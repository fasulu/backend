const express = require('express')
const router = express.Router();

const { getUserList, getUserByID } = require('../controllers/userController')


router.get("/", getUserList);

router.get("/:userinput", getUserByID);

router.all("*", (req, res) => {
    res.status(404).json({
        errorMessage: "The requested route is not found"
    })
})


module.exports = router;
