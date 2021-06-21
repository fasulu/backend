const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../model/userModel');
const debug = require('../middlewares/debug');

const getUserList = (debug, async (req, res) => {

    console.log("Im in get user userController", req.body)

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

const getUserByQuery = (debug, async (req, res) => {

    const userQuery = req.query; 
    // console.log("Im in get userController getUserByQuery1", Object.keys(userQuery)[0]);
    // console.log("Im in get userController getUserByQuery name", userQuery.name);
    
    try {
        
        if (Object.keys(userQuery)[0] === '_id') {

            // console.log( userQuery._id);

            const userId = await userModel.findOne({ _id: userQuery._id })
            
            res.json({
                message: "Im in getUserByQuery ID",
                userId
            })

        } else if (Object.keys(userQuery)[0] === "name") {
            
            // console.log( userQuery.name);
            
            const userName = await userModel.findOne({ name: userQuery.name })
            console.log( userName);
            
            res.json({
                message: "Im in getUserByQuery Name",
                userName
            })
            
        } else if (Object.keys(userQuery)[0] === "email") {

            // console.log( userQuery.email);
            
            const userEmail = await userModel.findOne({ email: userQuery.email })
            
            res.json({
                message: "Im in getUserByQuery Email",
                userEmail
            })
            
        } else {
            res.json({
                message: "Invalid user request",
                userQuery,
            })
        }

    } catch (error) {
        console.log("Something went wrong in getUserByQuery", userQuery)
        res.json({
            message: "Something went wrong in getUserByQuery",
            userQuery,
            
        })
    }
})

const addNewUser = (debug,
    
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

module.exports = {
    getUserList,
    getUserByQuery,
    addNewUser
}

// const getUserByID = (debug, async (req, res) => {

//     console.log("Im in get userController by ID", req.params);

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
