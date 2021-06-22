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

mongoose.connect("mongodb://localhost:27017/login", { useNewUrlParser: true }, { useUnifiedTopology: true }, (err) => {
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

//#region userModel schema

const userSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    passwd: { type: String }
})

const userModel = mongoose.model("User", userSchema);

//#endregion

//#region add new user with with post/signup

app.post("/signup",
    body("name").not().isEmpty().trim().escape().isLength({ min: 4, max: 20 }),
    body("passwd").not().isEmpty().trim().isLength({ min: 7, max: 25 }),

    async (req, res) => {

        console.log("Im in user signup", req.body)

        const userName = req.body.name
        const userpwd = req.body.passwd

        const errorVal = validationResult(req)

        try {

            if (errorVal.isEmpty()) {

                const password = bcrypt.hashSync(userpwd)       // crypts the given password in to Bearer Token

                const userAdded = await userModel.create({ name: userName, passwd: password })

                res.json({
                    message: "Iam in user post",
                    userAdded
                })

            } else {

                console.log("Please verify your user name and password matches the regulation");

                res.json({
                    message: `Error while processing your ${userName} as new user`
                })
            }

        } catch (error) {

            console.log(`Error while adding new user :- ${userName}`, error);

            res.json({
                message: `Error while processing your ${userName} as new user`,
            })
        }
    })
//#endregion

//#region login user with post/login

app.post("/login", async (req, res) => {

    console.log("Im in post login1")

    const userName = req.body.name;
    const userPwd = req.body.passwd;

    console.log(userName, userPwd)

    try {

        // console.log("givenPwd", userPwd)

        const givenPwd = bcrypt.hashSync(userPwd);       // crypts the given password in to Bearer Token

        // console.log("givenPwd changed", givenPwd)

        const userDetail = await userModel.findOne({ name: userName })

        // console.log("databasePwd", userDetail.name, userDetail.passwd)

        const isValidUser = bcrypt.compareSync(req.body.passwd, userDetail.passwd)        // comparer crypted password with the database's crypted value, 
        // stores true or false in the isValidUser constant.
        // console.log(isValidUser)

        if (isValidUser) {          // if it is true

            const validToken = await jwt.sign({     // creates token using jwt with "secret" code and time to expires the token
                id: userDetail.id
            }, "secret", {
                expiresIn: "120s"       // token expires in 120s(2 minutes)
            })

            res.json({
                message: `${req.body.name} is logged in`,
                validToken
            })
        } else {
            res.json({
                message: `${req.body.name} is not identified user`
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

    try {

        const userlist = await userModel.find()

        let nameList = []

        const names = () => {                               // pick only names to show in public access
            for (let i = 0; i < userlist.length; i++) {
                console.log(userlist[i].name)
                nameList.push(userlist[i].name)
            }
        }

        names();

        res.json({
            message: "Loged in as public user with limited access",
            nameList
        })

    } catch (error) {
        console.log("Something went wrong, contact administrator")
    }
})
//#endregion

//#region login as private for token use

app.get("/private", (req, res) => {

    try {
        
        const verifyToken = (req.headers.authorization.split(" ")[1])   // split toke type(Bearer) from the token code

        const result = jwt.verify(verifyToken, "secret")                // verify the validity

        res.json(result)

    } catch (error) {
        console.log("Something went wrong")
        
        res.json({
            message: "Token expired, need to login"
        })
    }
})

//#endregion

//#region server listen

app.listen(port, () => {
    console.log("The server is listing in the port: ", port)
})

//#endregion