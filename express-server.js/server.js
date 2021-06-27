const express = require('express');
const cors = require("cors")
const mongoose = require('mongoose');
const app = express();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');     // to crypt sensible datas
const jwt = require('jsonwebtoken');    // to create jsonwebtoken

app.use(cors());
app.use(express.json());

const port = 8000;

mongoose.connect("mongodb://localhost:27017/exp-server", { useNewUrlParser: true }, { useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log("I'm connected to the database");
    }
})

//#endregion

//#region get userlist here

app.get("/users", async (req, res) => {

    console.log("Im in users route")

    try {

        res.json({
            message: "You must login to view details"
        })

    } catch (error) {
        console.log("Error while getting user list", error)

        res.json({
            message: "test"
        })
    }
})

//#endregion

//#region loginModel schema

const loginSchema = new mongoose.Schema({
    email: { type: String, require, unique: true },
    password: { type: String, require },
    firstname: { type: String, require },
    surname: { type: String, require },
    dateofbirth: { type: String, require },
    role: { type: String, require }
})

const loginModel = mongoose.model("Login", loginSchema);

//#endregion

//#region add new user with with post/signup
// body("dateofbirth").not().isEmpty().trim().isDate(),

app.post("/signup",

    body("email").isEmail().normalizeEmail(),
    body("password").not().isEmpty().trim().isLength({ min: 7, max: 25 }),
    body("firstname").not().isEmpty().trim().escape().isLength({ min: 4, max: 20 }),
    body("surname").not().isEmpty().trim().escape().isLength({ min: 4, max: 20 }),
    body("role").isIn(["admin", "employee"]),

    async (req, res) => {

        console.log("Im in user signup", req.body)

        const useremail = req.body.email
        const userpwd = req.body.password
        const userFName = req.body.firstname
        const userSName = req.body.surname
        const userDOB = req.body.dateofbirth
        const userRole = req.body.role

        const errorVal = validationResult(req)

        try {

            const emailExist = await loginModel.findOne({ email: req.body.email }).lean()
            // console.log("userfound", emailExist)

            if (emailExist) {

                res.json({
                    message: "Email already registered, choose different email",
                    emailExist
                })

            } else {

                if (errorVal.isEmpty()) {

                    const password = bcrypt.hashSync(userpwd)       // crypts the given password in to Bearer Token

                    const userAdded = await loginModel.create(
                        {
                            email: useremail,
                            password: password,
                            firstname: userFName,
                            surname: userSName,
                            dateofbirth: userDOB,
                            role: userRole
                        })
                    res.json({
                        message: "User successfully added",
                        userAdded
                    })

                } else {

                    console.log("Please verify your details matches the regulation");

                    res.json({
                        message: `Error while processing your ${useremail} as new user`,
                        useremail
                    })
                }
            }

        } catch (error) {
            console.error("Error while checking email already exist?", error)
        }


        try {


        } catch (error) {

            console.log(`Error while adding new user :- ${useremail}`, error);

            res.json({
                message: `Error while processing your ${useremail} as new user`,
                error
            })
        }
    })

//#endregion

//#region login user with post/login

app.post("/login", async (req, res) => {

    console.log("Im in post login")

    const tokenExpire = "300s"
    const userEmail = req.body.email;
    const userPwd = req.body.password;

    console.log(userEmail, userPwd)

    try {

        // console.log("givenPwd", userPwd)

        const givenPwd = bcrypt.hashSync(userPwd);       // crypts the given password in to Bearer Token

        // console.log("givenPwd changed", givenPwd)

        const userDetail = await loginModel.findOne({ email: userEmail })

        console.log("UserDetails from database:-", `${userDetail.firstname}, ${userDetail.password}, ${userDetail._id}`)

        const isValidUser = bcrypt.compareSync(req.body.password, userDetail.password)        // comparer crypted password with the database's crypted value, 
        // stores true or false in the isValidUser constant.
        // console.log(isValidUser)

        if (isValidUser) {          // if it is true

            const validToken = await jwt.sign({     // creates token using jwt with "secret" code and time to expires the token
                id: userDetail.id
            }, "secret", {
                expiresIn: tokenExpire       // token expires in 300s(5 minutes)
            })

            res.json({
                message: `${userDetail._id}, ${userEmail} is logged in`,
                userDetail,
                validToken,
                tokenExpire
            })
        } else {
            res.json({
                message: `${userEmail} is not identified user`
            })
        }

    } catch (error) {

        res.json({
            message: "Something went wrong",
        })
    }
})

//#endregion

//#region login as public user

app.post("/public", async (req, res) => {

    console.log("im in public access")

    try {

        const userlist = await loginModel.find({})

        let nameList = []

        const names = () => {                               // pick only names to show in public access
            for (let i = 0; i < userlist.length; i++) {
                console.log(userlist[i].email)
                nameList.push(userlist[i].email)
            }
            return
        }

        names();

        res.json({
            message: "Loged in as public user with limited access",
            userlist
        })

    } catch (error) {
        console.log("Something went wrong, contact administrator")
    }
})
//#endregion

//#region login as private for token use

app.get("/private", async (req, res) => {

    console.log("Im in private user")

    try {

        const verifyToken = (req.headers.authorization.split(" ")[1])   // split toke type(Bearer) from the token code

        const result = jwt.verify(verifyToken, "secret")                // verify the validity

        const personName = await loginModel.findOne({ _id: result.id }).lean()

        console.log(personName.email)

        res.json({
            message: `${personName.email} is seeing this message`
        })

    } catch (error) {
        console.log("Something went wrong")

        res.json({
            message: "Token expired, need to login"
        })
    }
})

//#endregion

//#region find user by email

app.post("/email/:email", async (req, res) => {

    console.log("im in find user by email address")

    try {

        console.log("user entered email", req.body.email)

        const userfound = await loginModel.findOne({ email: req.body.email }).lean()
        console.log("userfound", userfound)

        res.json({
            message: "Loged in as public user with limited access",
            userfound
        })

    } catch (error) {
        console.log("Something went wrong, contact administrator", error)
    }
})

//#endregion

//#region server listen

app.listen(port, () => {
    console.log("The server is listing in the port: ", port)
})

//#endregion