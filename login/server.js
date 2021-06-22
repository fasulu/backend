const express = require('express');
const cors = require("cors")
const mongoose = require('mongoose');
const app = express();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    console.log("Im in get userlist")

    try {

        const userlist = await userModel.find({})

        res.json(userlist)

    } catch (error) {
        console.log("Error while getting user list", error)
        res.json({
            message: "test"
        })
    }
})

//#endregion


//#region userModel

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
                
                const password = bcrypt.hashSync(userpwd)

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

    console.log("Im in post login")

    const userName = req.body.name;
    const userPwd = req.body.passwd;

    console.log(userName, userPwd)
    try {
        
        const givenPwd = bcrypt.hashSync(userPwd);
    
        const userDetail = await findOne({ name: userName })
    
        const isValidUser = bcrypt.compareSync(givenPwd, userDetail.passwd)
    
        console.log(isValidUser)

    } catch (error) {
        
    }
    res.json({

        message:"Im in post login"
    })
})

//#endregion

//#region server listen

app.listen(port, () => {
    console.log("The server is listing in the port: ", port)
})

//#endregion