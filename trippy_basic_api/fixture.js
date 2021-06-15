const mongoose = require('mongoose');
const { Hotel, Room }  = require("./model/hotelSchema");
const { Restaurant, Tables } = require("./model/restaurantSchema");

// connect to database

mongoose.connect("mongodb://localhost:27017/trippy_basics", (err) => {  
    if (err) {
        console.log(err);
    } else {
        console.log("I'm connected to the database")
    }
})

// create collection of documents in hotel 

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
                name: "Hotel Parister",
                address: "19 Rue Saulnier",
                city: "Paris 75009",
                country: "France",
                stars: 5,
                hasSpa: true,
                hasPool: true,
                priceCategory: 2
            },
            {
                name: "Mandarin Oriental Hyde Park",
                address: "66 Knightbridge",
                city: "London SW1X",
                country: "England",
                stars: 5,
                hasSpa: true,
                hasPool: true,
                priceCategory: 3
            },
            {
                name: "Four Seasons Hotel London",
                address: "Hamilton Place, Park Lane",
                city: "London W1J",
                country: "England",
                stars: 5,
                hasSpa: true,
                hasPool: true,
                priceCategory: 2
            },
            {
                name: "Kimpton Fitzroy",
                address: "1-8 Russell Square",
                city: "London WC1B",
                country: "England",
                stars: 5,
                hasSpa: false,
                hasPool: false,
                priceCategory: 2
            },
            {
                name: "The Plaza",
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

// create collection of documents in room 

const addRooms = async () => {

    try {
        await Room.deleteMany({})

        await Room.insertMany([
            {
                people: 3,
                price: 199.99,
                hasBathroom: true,
                
            },
            {
                people: 2,
                price: 149.99,
                hasBathroom: true,
                
            },
            {
                people: 1,
                price: 99.99,
                hasBathroom: true,
                
            },
            {
                people: 1,
                price: 49.99,
                hasBathroom: false,
                
            },
            {
                people: 2,
                price: 299.99,
                hasBathroom: true,
                
            },
            {
                people: 3,
                price: 499.99,
                hasBathroom: true,
                
            }
        ])

        console.log("The collection of Rooms are recreated with the database");

    } catch (err) {
        console.log(err)
    }
}

//************ */

// create collection of documents in restaurant 

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
                name: "Le Bouclard",
                address: "1 Rue Cavallotti",
                city: "Paris 75018",
                country: "France",
                stars: 3,
                cuisine: "French",
                priceCategory: 2
            },
            {
                name: "La Cantine de Meme",
                address: "11 Rue Brochant",
                city: "Paris 75017",
                country: "France",
                stars: 4,
                cuisine: "French",
                priceCategory: 3
            },
            {
                name: "L'Arcane",
                address: "52 Rue Lamarck",
                city: "Paris 75018",
                country: "France",
                stars: 5,
                cuisine: "French",
                priceCategory: 3
            },
            {
                name: "JJ Beaumarchais",
                address: "92 Boulevard Beaumarchais",
                city: "Paris 75011",
                country: "France",
                stars: 4,
                cuisine: "French",
                priceCategory: 2
            },
            {
                name: "Guy Savoy",
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

// create collection of documents in table

const addTables = async () => {

    try {

        await Tables.deleteMany({})

        await Tables.insertMany([
            {
                seat: 3,
                iSVIP: false,
                
            },
            {
                seat: 2,
                iSVIP: true,
                
            },
            {
                seat: 4,
                iSVIP: true,
                
            },
            {
                seat: 5,
                iSVIP: true,
                
            },
            {
                seat: 6,
                iSVIP: false,
                
            },
            {
                seat: 7,
                iSVIP: true,
                
            },
            {
                seat: 8,
                iSVIP: false,
                
            },
            {
                seat: 9,
                iSVIP: false,
                
            },
            {
                seat: 10,
                iSVIP: false,
                
            }
            
        ])
        
        console.log("The collection of Tables are recreated with the database");

    } catch (error) {
        console.log("Something went wrong...", error)
    }
}

// addHotels();    // if need (to add db and hotel collection) execute this line 

// addRestaurants();   // if need (to add db and restaurant collection) execute this line 

// addRooms();   // if need (to add db and room collection) execute this line 

// addTables();     // if need (to add db and table collection) execute this line 

