const express = require('express');
const app = express();
const cors = require('cors');
const { countries } = require('./dataCountries.js');

app.use(cors());

const port = 8000

app.get("/countries", (req, res) => {

    console.log("countries", countries);

    // console.log("countries", response.json({ countries }));

    res.json({
        countries
    })
})

app.listen(port, () => {
    console.log("Server à l'écoute dans le port 8000");
});

//********************* */

