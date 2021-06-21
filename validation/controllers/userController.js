const express = require('express');
const router = express.Router();
const userModel = require('../model/userModel');
const debug = require('../middlewares/debug');

const getUserList = (debug, async (req, res) => {

    console.log("Im in get user userController")

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

const getUserByID = (debug, async (req, res) => {

    console.log("Im in get userController by ID");

    console.log("IM IN GET USER INFO BY userinput", req.params.userinput)

    const userRequest = req.params.userinput;

    const emailExpression = /^\S+@\S+\.\S+$/; // for email this will also work === /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})+)$/;

    const idExpression = /^([a-z0-9]+)$/;      // ----> only small letters and numbers for mongodb _id field validation ,  this is to check is the number mixed in the string ---->   /\d/ is number mixed in a string

    const nameExpression = /^[a-z]+$/;    // only small letter alphabets

    console.log(emailExpression.test(userRequest))
    console.log(idExpression.test(userRequest))
    console.log(nameExpression.test(userRequest))

    try {

        if (emailExpression.test(userRequest)) {    //if email true

            console.log("Valid eMail", userRequest);

            const emailFound = await userModel.findOne({ email: userRequest })

            res.json({
                message: "User request is Valid eMail",
                userRequest,
                emailFound
            })

        } else if (/\d/.test(userRequest)) {    // if string with number(for id field)

            console.log("Valid ID", userRequest);

            searchFlag = "id";

            const idFound = await userModel.findOne({ _id: userRequest })

            res.json({
                message: "User request is Valid ID",
                userRequest,
                idFound
            })

        } else {

            console.log("Valid name", userRequest);     // else it is only alphabets which is name field

            const nameFound = await userModel.findOne({ name: userRequest })

            res.json({
                message: "User request is Valid name",
                userRequest,
                nameFound
            })
        }
    } catch (error) {
        console.log("User request is not identified....", userRequest)
        res.json({
            message: "User request is not identified",
            userRequest
        })
    }
})

module.exports = {
    getUserList,
    getUserByID
}


// router.get("/", debug, async (req, res) => {

//     try {

//         const user = await userModel.find().exec();

//         res.json(user)

//     } catch (error) {

//         console.log("Error in get/users", error)

//         res.json({
//             message: "Error while searching user list"
//         })

//     }
// })

// module.exports = getUserList