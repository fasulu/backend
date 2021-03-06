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
const myCar = async () => {
    try {
        const myCar = new Car({
            marque: "Renault",
            model: "R5",
            year: 1991
        })
        const savedResult = await myCar.save()
        console.log("Data saved", savedResult);
    } catch (error) {
        console.log("Error while saving data")
    }
}
myCar();

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
// const myCar = new Car({
//         marque: "Toyota",
//         model: "Prius",
//         year: 2018
// })

// try{

//     myCar.save();

// } catch(error) {
//     console.log("Error while saving data", error)
// }


// etape 4: -1 
// db.cars.find({ _id: ObjectId("60be2dda8320b27ae5cabc2e")})
// etape 4: -2

const idToFind = "60be39d65b110c867d7f5f58"
// try {
//     Car.findById(idToFind, (err, resp) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log("Id data is:-", resp)
//             console.log("Car make and model :-", resp.marque, resp.model)
//         }

//     })
// } catch (error) {
//     console.log("Error while getting car details")
// }

// etape 5:

const carModel = "Espace";

// try {
//     Car.findOneAndUpdate(carModel, { year: 2000 }, (err, resp) => {
//         if (err) {
//             console.log("Something went wrong", err)
//         }
//         else {
//             console.log("Data changed successfully", resp)
//         }
//     })
// } catch (error) {
//     console.log("Something went wrong")
// }

// etape 6:
const carDelete = "Renault"

// try {
//     Car.findOneAndDelete(carDelete, (err, resp) => {     // to delete first find result
//         if (err) {
//             console.log("Error while deleting record", carDelete)
//         } else {
//             console.log(`${carDelete}, deleted successfully`)
//         }
//     })
// } catch (error) {
//     console.log("Error while deleting record", carDelete)
// }

// try {
//     Car.deleteMany({ marque: carDelete }, (err, resp) => {     // to delete all marque given in carDelete
//         if (err) {
//             console.log("Error while deleting record", carDelete)
//         } else {
//             console.log(`${carDelete}, deleted successfully`)
//         }

//     })
// } catch (error) {
//     console.log("Error while deleting record", carDelete)
// }

// etape Bonus

// try {
//     Car.insertMany([

//         { marque: "Aston Martin", model: "D89", year: 2010 },
//         { marque: "Range Rover", model: "Discovery Sport", year: 2017 }

//     ]).then(console.log("Cars inserted successfully"))

// } catch (error) {
//     console.log("Something went wrong while inserting record", err)
// }