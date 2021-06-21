const express = require('express')
const router = express.Router();

const { getUserList, getUserByQuery, addNewUser } = require('../controllers/userController')


router.get("/", getUserList);

router.get("/user", getUserByQuery);

router.post("/", addNewUser)

router.all("*", (req, res) => {
    res.status(404).json({
        errorMessage: "The requested route is not found"
    })
})

module.exports = router;
