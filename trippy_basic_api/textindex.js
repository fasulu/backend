const mongoose = require("mongoose");
const { uniqueNamesGenerator, names, colors, countries, adjectives, animals } = require("unique-names-generator");

const persons = [];
for (let i = 0; i < 99; i++) {
    const animal = uniqueNamesGenerator({ dictionaries: [adjectives, animals, colors, countries] })

    persons.push({
        name: uniqueNamesGenerator({ dictionaries: [names] }),
        favouriteAnimal: animal,
        nonIndexAnimal: animal,
    });
}

persons.push({
    name: "I'm using this document to test the index",
    favouriteAnimal: "Blackbird",
    nonIndexAnimal: "Blackbird",
})

mongoose.connect("mongodb://localhost:27017/testIndex", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("I'm connected to the database")
    }
});

const personSchema = new mongoose.Schema({
    name: { type: String },
    favouriteAnimal: { type: String, index: true },
    nonIndexAnimal: { type: String, index: false },
})

const Person = mongoose.model("Person", personSchema)

const deletedAllThenAdd = async () => {
    try {
        await Person.deleteMany({})

        console.log("All deleted")

        const dataAdded = await Person.insertMany(persons)

        console.log("OK, ", dataAdded.length);

        const result = await Person.aggregate([
            {
                $group: {
                    _id: "$favouriteAnimal",
                    num: { $sum: 1 }
                }
            },
            {
                $match: {
                    num: { $gt: 1 }
                }
            }
        ])

        console.log(result.length ? "There are repeted animals!!" : "No repeted animals")

        await mongoose.disconnect()     // this will disconnect database

        console.log("disconnected ok")
    } catch (error) {
        console.log(error)
    }
}

const testPerformance = async (numberOfTests, animal) => {
    try {

        console.time('Test find one by nonIndexAnimal')

        for (let index = 0; index < numberOfTests; index++) {

            await Person.findOne({ nonIndexAnimal: animal })
        }

        console.timeEnd('Test find one by nonIndexAnimal')

        console.time('Test find one by favouriteAnimal INDEX')

        for (let index = 0; index < numberOfTests; index++) {

            await Person.findOne({ favouriteAnimal: animal })
        }

        console.timeEnd('Test find one by favouriteAnimal INDEX')

        await mongoose.disconnect()
        
        console.log("disconnected ok")
    } catch (error) {
        console.log(error)
    }
}

// deletedAllThenAdd()

testPerformance(1000, "Blackbird")