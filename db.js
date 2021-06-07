const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/garage", (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log("I'm connected to the database");
    }
})

const carSchema = mongoose.Schema({
    marque: String,
    model: String,
    year: Number,
    date: { type: Date, default: Date.now }
})

const Car = mongoose.model("car", carSchema)
// const myCar = new Car({
//     marque: "Renault",
//     model: "Espace",
//     year: 1999
// })
// const myCar = new Car({
//     marque: "Renault",
//     model: "Scenic",
//     year: 2004
// })
// const myCar = new Car({
//     marque: "Peugeot",
//     model: "308",
//     year: 2017
// })
// const myCar = new Car({
//     marque: "Toyota",
//     model: "Corolla",
//     year: 2018
// })
// myCar.save();


// etape 4: -1 
// db.cars.find({ _id: ObjectId("60be2dda8320b27ae5cabc2e")})
// etape 4: -2

const idToFind = "60be39d65b110c867d7f5f58"
Car.findById(idToFind, (err, resp) => {
    try {
        if (err) {
            console.log(err)
        } else {
            console.log("Id data is:-", resp)
            console.log("Car make and model :-", resp.marque, resp.model)
        }
    } catch (error) {
        console.log("Error while getting car details")
    }
})

const carModel = "Espace";

Car.findOneAndUpdate(carModel, { year: 2000 }, (err, resp) => {
    try {
        if(err) {
            console.log("Something went wrong",err)
        }
        else{
            console.log("Data changed successfully", resp)
        }
    }catch(error) {
        console.log("Something went wrong")
    }
})


