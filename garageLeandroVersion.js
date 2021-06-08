const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/garage", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("I'm connected to the database")
    }
})

const carSchema = new mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    created: { type: Date, default: Date.now }
})

const Car = mongoose.model("Car", carSchema)

Car.insertMany([
    {
        brand: "Renault",
        model: "Espace",
        year: "1999"
    },
    {
        brand: "Renault",
        model: "Scenic",
        year: "2004"
    },
    {
        brand: "Peugeot",
        model: "308",
        year: "2017"
    },
]).then(data => {
    console.log(data);
}).catch(err => {
    console.error("Error insertMany Card: ", err);
})

const findCarById = async () => {

    try {
        // const car = await Car.findOne({ _id: "60bf6ba05af23a21ebedc0ac" })
        const car = await Car.findById("60bf6ba05af23a21ebedc0ac")

        console.log("findCar", car)
    } catch (err) {
        console.error(err)
    }
}

// findCarById()

const updateCarByID = async (newValues) => {

    try {
        const car =  await Car.findByIdAndUpdate("60bf6ba05af23a21ebedc0ac", newValues)
        
        console.log("updateCarByID", car);
    } catch (err) {
        console.error(err)
    }
}

// updateCarByID({
//     year: 2001
// })

const updateCar = async (newValues) => {

    try {
        const car =  await Car.findById("60bf6ba05af23a21ebedc0ac")

        car.model = "Espace 2"

        await car.save()
        
        console.log("updateCar", car);
    } catch (err) {
        console.error(err)
    }
}

// updateCar()

const deleteManyCars = async () => {

    try {

        await Car.deleteMany({ brand: "Renault" })

    } catch (err) {
        console.error(err)
    }

}

// deleteManyCars()