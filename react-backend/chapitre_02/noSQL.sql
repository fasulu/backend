
// insert data into the collection
db.students.insert({ name: "Nour", ville: "lyon"});
db.students.insert({ Steeven: "", Paris: ""});
db.students.insert({ sophie: "", Paris: ""});
db.students.insert({ Marc: "", Marseille: ""});
db.students.insert({ Romain: "", Paris: ""});
db.students.insert({ veronique: "", Paris: ""});

// to see data in the table(collection)
db.students.find()


db.Languages.insert({ name: "French" });
db.Languages.insert({ name: "English" });
db.Languages.insert({ name: "Germain" });
db.Languages.insert({ name: "Spanish" });
db.Languages.insert({ name: "Mandarin" });

db.Languages.find()


db.Favorites.insert({class: "maths", sport: "cricket", studentID: "60ba39d753e412b1e8c892b7"})
db.Favorites.insert({class: "music", sport: "hip-hop", studentID: "60ba3a0f53e412b1e8c892bb"})
db.Favorites.insert({class: "arts", sport: "boxing", studentID: "60ba39c753e412b1e8c892b6"})
db.Favorites.insert({class: "literature", sport: "tennis", studentID: "60ba39df53e412b1e8c892b8"})
db.Favorites.insert({class: "computer science", sport: "tennis", studentID: "60ba3a0353e412b1e8c892ba"})
db.Favorites.insert({class: "arts", sport: "baseball", studentID: "60ba39eb53e412b1e8c892b9"})

db.Favorites.find()

db.Students_language.insert({studentID: "60ba39c753e412b1e8c892b6", LanguageID: "60ba3b8f53e412b1e8c892bc"})


