const mongoose = require('mongoose');
const Hotel = require("./model/hotel");
const Restaurant = require("./model/restaurant");

mongoose.connect("mongodb://localhost:27017/trippy_basics", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("I'm connected to the database")
    }
})



const addHotels = async () => {

    try {
        await Hotel.deleteMany({})

        await Hotel.insertMany([
            {
                name: "Hotel Le Royal Monceau",
                address: "37 Ave Hoche",
                city: "Paris 75008",
                country: "France",
                stars: 5,
                hasSpa: true,
                hasPool: true,
                priceCategory: 3
            },
            {
                name: "Maison Souquet",
                address: "10 Rue de Bruxelles",
                city: "Paris 75009",
                country: "France",
                stars: 5,
                hasSpa: false,
                hasPool: true,
                priceCategory: 3
            },
            {
                nname: "Hotel Parister",
                address: "19 Rue Saulnier",
                city: "Paris 75009",
                country: "France",
                stars: 5,
                hasSpa: true,
                hasPool: true,
                priceCategory: 2
            },
            {
                nname: "Mandarin Oriental Hyde Park",
                address: "66 Knightbridge",
                city: "London SW1X",
                country: "England",
                stars: 5,
                hasSpa: true,
                hasPool: true,
                priceCategory: 3
            },
            {
                nname: "Four Seasons Hotel London",
                address: "Hamilton Place, Park Lane",
                city: "London W1J",
                country: "England",
                stars: 5,
                hasSpa: true,
                hasPool: true,
                priceCategory: 2
            },
            {
                nname: "Kimpton Fitzroy",
                address: "1-8 Russell Square",
                city: "London WC1B",
                country: "England",
                stars: 5,
                hasSpa: false,
                hasPool: false,
                priceCategory: 2
            },
            {
                nname: "The Plaza",
                address: "5th Ave Central Park",
                city: "New York 10022",
                country: "US",
                stars: 5,
                hasSpa: true,
                hasPool: true,
                priceCategory: 2
            }
        ])

        console.log("The collection of Hotels are recreated with the database");

    } catch (err) {
        console.log(err)
    }
}

//************ */

const addRestaurants = async () => {

    try {
        await Restaurant.deleteMany({})

        await Restaurant.insertMany([
            {
                name: "Brasserie Printemps",
                address: "58 Boulevard Haussmann",
                city: "Paris 75009",
                country: "France",
                stars: 5,
                cuisine: "French",
                priceCategory: 3
            },
            {
                name: "Truffes Folies",
                address: "37 Rue Malar",
                city: "Paris 75007",
                country: "France",
                stars: 5,
                cuisine: "French",
                priceCategory: 3
            },
            {
                nname: "Le Bouclard",
                address: "1 Rue Cavallotti",
                city: "Paris 75018",
                country: "France",
                stars: 3,
                cuisine: "French",
                priceCategory: 2
            },
            {
                nname: "La Cantine de Meme",
                address: "11 Rue Brochant",
                city: "Paris 75017",
                country: "France",
                stars: 4,
                cuisine: "French",
                priceCategory: 3
            },
            {
                nname: "L'Arcane",
                address: "52 Rue Lamarck",
                city: "Paris 75018",
                country: "France",
                stars: 5,
                cuisine: "French",
                priceCategory: 3
            },
            {
                nname: "JJ Beaumarchais",
                address: "92 Boulevard Beaumarchais",
                city: "Paris 75011",
                country: "France",
                stars: 4,
                cuisine: "French",
                priceCategory: 2
            },
            {
                nname: "Guy Savoy",
                address: "11 Quai de Conti",
                city: "Paris 75006",
                country: "France",
                stars: 5,
                cuisine: "French",
                priceCategory: 3
            }
        ])

        console.log("The collection of Restaurants are recreated with the database");

    } catch (err) {
        console.log(err)
    }
}

addHotels();    // if need (to add db and hotel collection) execute this line 

addRestaurants();   // if need (to add db and restaurant collection) execute this line 
