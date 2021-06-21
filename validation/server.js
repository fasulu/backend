const express = require('express');
const cors = require("cors")
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const debug = require('./middlewares/debug')
const userModel = require('./model/userModel')
const router = require('./routes/userRoutes')


const app = express();

app.use(cors());
app.use(express.json());

const port = 8003;

// #region mongoose connection here

mongoose.connect("mongodb://localhost:27017/validation", { useNewUrlParser: true }, { useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log("I'm connected to the database");
    }
})

//#endregion

app.use("/users", router)

//#region get userlist here

// app.get("/users", debug, async (req, res) => {

//     console.log("Im in get user(Server)")

//     try {

//         const userlist = await userModel.find({})

//         res.json(userlist)

//     } catch (error) {
//         console.log("Error while getting user list", error)
//         res.json({
//             message: "test"
//         })
//     }


// })

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
            const newUser = await userModel.create(newuser)

            res.json({
                message: "New user added"
            })

        } catch (error) {
            console.log("Something went wrong while adding new user", error)
        }
    })

//#endregion

//#region get information by username, email or id

// app.get("/users/:userinput", debug, async (req, res) => {

//     console.log("IM IN GET USER INFO BY userinput", req.params.userinput)

//     const userRequest = req.params.userinput;

//     const emailExpression = /^\S+@\S+\.\S+$/; // for email this will also work === /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})+)$/;

//     const idExpression = /^([a-z0-9]+)$/;      // ----> only small letters and numbers for mongodb _id field validation ,  this is to check is the number mixed in the string ---->   /\d/ is number mixed in a string

//     const nameExpression = /^[a-z]+$/;    // only small letter alphabets

//     console.log(emailExpression.test(userRequest))
//     console.log(idExpression.test(userRequest))
//     console.log(nameExpression.test(userRequest))

//     try {

//         if (emailExpression.test(userRequest)) {    //if email true

//             console.log("Valid eMail", userRequest);

//             const emailFound = await userModel.findOne({ email: userRequest })

//             res.json({
//                 message: "User request is Valid eMail",
//                 userRequest,
//                 emailFound
//             })

//         } else if (/\d/.test(userRequest)) {    // if string with number(for id field)

//             console.log("Valid ID", userRequest);

//             searchFlag = "id";

//             const idFound = await userModel.findOne({ _id: userRequest })

//             res.json({
//                 message: "User request is Valid ID",
//                 userRequest,
//                 idFound
//             })

//         } else {

//             console.log("Valid name", userRequest);     // else it is only alphabets which is name field

//             const nameFound = await userModel.findOne({ name: userRequest })

//             res.json({
//                 message: "User request is Valid name",
//                 userRequest,
//                 nameFound
//             })
//         }
//     } catch (error) {
//         console.log("User request is not identified....", userRequest)
//         res.json({
//             message: "User request is not identified",
//             userRequest
//         })
//     }

// })

//#endregion

//#region server listen

app.listen(port, () => {
    console.log("The server is listing in the port: ", port)
})

//#endregion


//********************* different trail methods all working ********************/

//#region tried with leandro method :email(\\S+@\\S+) works fine

// app.get("/users/:email(\\S+@\\S+)", debug, async (req, res) => {        // give regex validation in the route itself ***IMPORTANT INCLUDE EXTRA BACKSLASH WITH EVER BACKSLASHES IF NOT WILL GIVE OS ERROR***

//     console.log("IM IN GET USER INFO BY NAME", req.params.email);

//     const userToFind = req.params.email;

//     const userFound = await userModel.findOne({ email: userToFind.trim() })

//     // console.log("username found in the collection", userFound);

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

//#region tried working

// app.get("/users/:name", debug, async (req, res) => {

    //     console.log("IM IN GET USER INFO BY NAME", req.body.name)

//     const userToFind = req.params.name;

//     const userFound = await userModel.findOne({ name: userToFind })

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

//#region tried working... get user details by id

// app.get("/users/:id", debug, async (req, res) => {

//     console.log("IM IN GET USER INFO BY id", req.body.email)


//     const emailToFind = req.params.email;

//     const emailFound = await userModel.findOne({ email: emailToFind })

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

//#region tried working ... another way to find username and email

// app.get("/users/:userinput", debug, async (req, res) => {

//     const userToFind = req.params.userinput;

//     console.log("IM IN USERINPUT USER INFO BY NAME", userToFind)

//     try {

//         const nameFound = await userModel.findOne({ name: userToFind })
//         const emailFound = await userModel.findOne({ email: userToFind })

//         if (nameFound) {

//             console.log(nameFound)

//             res.json({
//                 message: "name found",
//                 nameFound
//             })

//         } else if (emailFound) {

//             console.log(emailFound)

//             res.json({
//                 message: "email found",
//                 emailFound
//             })
//         } else {
//             res.json({
//                 message: "Not found"
//             })
//         }
//     } catch (error) {

//         console.log("Something went wrong while searching data")

//         res.json({
//             message: "Something went wrong while searching data"
//         })
//     }
// })

//#endregion

//#region tried working ... get information based on user id

// app.get("/users/:id", debug, async (req, res) => {

//     const userToFind = req.params.id;

//     console.log("IM IN GET ID INFO BY NAME", userToFind)

//     try {

//         const idFound = await userModel.findById(userToFind)

//         if (idFound) {

//             console.log(idFound)

//             res.json({
//                 message: "id found",
//                 idFound
//             })

//         } else {

//             res.json({
//                 message: "Not found"
//             })
//         }
//     } catch (error) {

//         console.log("Something went wrong while searching data")

//         res.json({
//             message: "Something went wrong while searching data"
//         })
//     }
// })

//#endregion

//#region tried working ...  get information based on username

//********************* ********************/