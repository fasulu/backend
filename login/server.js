const express = require('express');
const cors = require("cors")
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const app = express();

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


//#region add new user with express-validator in to the database

app.post("/add",
    body("name").not().isEmpty().trim().escape().isLength({ min: 4, max: 20 }),
    body("passwd").not().isEmpty().trim().isLength({ min: 7, max: 25 }),

    async (req, res) => {

        console.log("Im in user post", req.body)
        const userName = req.body.name
        const userpwd = req.body.passwd

        const errorVal = validationResult(req)

        if(errorVal.isEmpty()){

                    const userAdded = await userModel.create({ name: userName, passwd: userpwd })
            
                    res.json({
                        message: "Iam in user post",
                        userAdded
                    })

        } else {
            res.json({
                message: `Error while processing your ${userName} as new user`,
            })
        }
    })
//#endregion


//#region server listen

app.listen(port, () => {
    console.log("The server is listing in the port: ", port)
})

//#endregion