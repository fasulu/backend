const express = require('express');
const cors = require("cors")
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const debug = require('./middlewares/debug')
const modelUser = require('./model/modelUser')
const route = require('./controllers/controllerUser')

const app = express();

app.use(cors());
app.use(express.json());

const port = 8002;

// #region mongoose connection here

mongoose.connect("mongodb://localhost:27017/validation", { useNewUrlParser: true }, { useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log("I'm connected to the database");
    }
})

//#endregion

app.use("/users", route)

//#region get userlist  here

app.get("/users", debug, async (req, res) => {

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

//#endregion

//#region add new user with express-validator in to the database

app.post("/users/add", debug,

    body("name").not().isEmpty().trim().escape().isLength({ min: 4, max: 20 }),
    body("email").isEmail().normalizeEmail(),
    body("age").toInt().isLength({ min: 1, max: 2 }),
    body("city").not().isEmpty().trim().isLength({ min: 3, max: 25 })

    , async (req, res, next) => {

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

            } else {
                next()
            }
        } catch (error) {
            console("Error while validating the request")
        }

    }, async (req, res) => {

        try {

            const newuser = req.body
            const newUser = await modelUser.create(newuser)

            res.json({
                message: "New user added"
            })

        } catch (error) {
            console.log("Something went wrong while adding new user", error)
        }
    })

//#endregion

//#region get information based on username

// app.get("/users/:username", debug, async (req, res) => {

//     console.log("IM IN GET USER INFO BY NAME", req.body.username)

//     const userToFind = req.params.username;

//     const userFound = await modelUser.findOne({ name: userToFind })

//     console.log("username found in the collection", userFound);

//     if (userFound) {

//         console.log("User found ", userFound)
//         res.json({
//             message: "User Found",
//             userFound
//         })
//     } else {
//         res.json({
//             message: `Couldn't found requested user ${userToFind} in the list`
//         })
//     }

// })

//#endregion

//#region get information by email

// app.get("/users/:email", debug, async (req, res) => {

//     console.log("IM IN GET USER INFO BY EMAIL", req.body.email)


//     const emailToFind = req.params.email;

//     const emailFound = await modelUser.findOne({ email: emailToFind })

//     console.log("user email found in the collection", emailFound);

//     if (emailFound) {

//         console.log("User found ", emailFound)
//         res.json({
//             message: "User details as per email ID",
//             emailFound
//         })
//     } else {
//         res.json({
//             message: `Couldn't found requested email ID ${emailToFind} in the list`
//         })
//     }

// })

//#endregion

//#region tried another way to find username and email

app.get("/users/:userinput", debug, async (req, res) => {

    const userToFind = req.params.userinput;

    console.log("IM IN USERINPUT USER INFO BY NAME", userToFind)

    try {

        const nameFound = await modelUser.findOne({ name: userToFind })
        const emailFound = await modelUser.findOne({ email: userToFind })

        if (nameFound) {

            console.log(nameFound)

            res.json({
                message: "name found",
                nameFound
            })

        } else if (emailFound) {

            console.log(emailFound)

            res.json({
                message: "email found",
                emailFound
            })
        } else {
            res.json({
                message: "Not found"
            })
        }
    } catch (error) {

        console.log("Something went wrong while searching data")

        res.json({
            message: "Something went wrong while searching data"
        })
    }
})

//#endregion

//#region get information based on user id

app.get("/users/id/:id", debug, async (req, res) => {

    const userToFind = req.params.id;

    console.log("IM IN GET ID INFO BY NAME", userToFind)

    try {

        const idFound = await modelUser.findById(userToFind)

        if (idFound) {

            console.log(idFound)

            res.json({
                message: "id found",
                idFound
            })

        } else {

            res.json({
                message: "Not found"
            })
        }
    } catch (error) {

        console.log("Something went wrong while searching data")

        res.json({
            message: "Something went wrong while searching data"
        })
    }
})

//#endregion

//#region server listen

app.listen(port, () => {
    console.log("The server is listing in the port: ", port)
})

//#endregion