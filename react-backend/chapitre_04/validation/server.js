const express = require('express');
const cors = require("cors")
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const debug = require('./src/middlewares/debug');
const { modelUser } = require('./src/model/modelUser')
const route = require('./src/controllers/controllerUser');

const app = express();

app.use(cors());
app.use(express.json());

const port = 8001;

mongoose.connect("mongodb://localhost:27017/validation", { useNewUrlParser: true }, { useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log("I'm connected to the database");
    }
})

app.use("/users", route)

app.get("/users", debug, async (req, res) => {

    console.log("Im in get user")


    try {

        const userlist = await User.find({})

        res.json(userlist)

    } catch (error) {
        console.log("Error while getting user list", error)
    }
    res.json({
        message: "test"
    })

})

// add new user and express-validator

app.post("/users",
    [

        body("name").not().isEmpty().trim().escape().isLength({ min: 4, max: 20 }),
        body("email").isEmail().normalizeEmail(),
        body("age").toInt().isLength({ min: 1, max: 2 }),
        body("city").not().isEmpty().trim().isLength({ min: 3, max: 25 })

    ], async (req, res, next) => {

        try {

            console.log("IM IN NEW USER POST");
            const reqBody = req.body;
            console.log(reqBody);

            // verify is there any errors in validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({
                    message: "validation error",
                    errors: errors.array()
                })
            }

            res.json(reqBody)

        } catch (error) {
            console("Error while validating the request")
        }
        next()

    }, async (req, res) => {

        try {

            const newuser = req.body
            const newUser  = await modelUser.create(newuser)

            res.json({
                message: "New user added"
            })

        } catch (error) {
            console.log("Something went wrong while adding new user", error)
        }
    })


app.listen(port, () => {
    console.log("The server is listing in the port: ", port)
})