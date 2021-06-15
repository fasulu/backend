const express = require('express');
// const multer = require('multer');
const cors = require("cors")
const mongoose = require('mongoose');
const { User } = require('./src/controllers/user')

// const fs = require("fs");
// const path = require("path");
// const upload = multer({ dest: 'public/uploads/' });

const app = express();

app.use(cors())
const port = 8001


app.get("/users", async (req, res) => {
    
    console.log("Im in get")

    res.json({
        message: "test"
    })

})


//*************** */
// app.use(express.static('public'));

// app.post('/upload', upload.single('image'), (req, res) => {
//     console.log("req.body", req.body);
//     console.log("req.file", req.file);

//     fs.renameSync(req.file.path, path.join(req.file.destination, req.file.originalname));

//     res.send("ok");
// });
//****************** */

app.listen(port, () => {
    console.log("The server is listing in the port: ", port)
})