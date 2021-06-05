
// insert data into the collection
db.students.insert({ id: 1, name: veronique: "", Paris: ""});
db.students.insert({ id: 2, name: "Nour", ville: "lyon"});
db.students.insert({ id: 3, name: "veronique", ville: "Paris"});
db.students.insert({ id: 4, name: sophie"", Paris: ""});
db.students.insert({ id: 5, name: Marc: "", Marseille: ""});
db.students.insert({ id: 6, name: Romain: "", Paris: ""});


// to see data in the table(collection)
db.students.find()


db.languages.insert({ id: 1, name: "French" });
db.languages.insert({ id: 2, name: "English" });
db.languages.insert({ id: 3, name: "German" });
db.languages.insert({ id: 4, name: "Spanish" });
db.languages.insert({ id: 5, name: "Mandarin" });

db.Languages.find()


db.favorites.insert({id: 1, class: 'maths', sport: 'cricket', studentid: 2})
db.favorites.insert({id: 2, class: 'music', sport: 'hip-hop', studentid: 6})
db.favorites.insert({id: 3, class: 'arts', sport: 'boxing', studentid: 1})
db.favorites.insert({id: 4, class: 'literature', sport: 'tennis', studentid:3})
db.favorites.insert({id: 5, class: 'computer science', sport: 'tennis', studentid: 5})
db.favorites.insert({id: 6, class: 'arts', sport: 'baseball', studentid: 4})

db.Favorites.find()

db.students_languages.insert({id: 1, studentsid: 1, languageid: 1})
db.students_languages.insert({id: 2, studentsid: 1, languageid: 2})
db.students_languages.insert({id: 3, studentsid: 2, languageid: 1})
db.students_languages.insert({id: 4, studentsid: 2, languageid: 3})
db.students_languages.insert({id: 5, studentsid: 3, languageid: 3})
db.students_languages.insert({id: 6, studentsid: 4, languageid: 1})
db.students_languages.insert({id: 7, studentsid: 4, languageid: 2})
db.students_languages.insert({id: 8, studentsid: 4, languageid: 4})
db.students_languages.insert({id: 9, studentsid: 4, languageid: 5})
db.students_languages.insert({id: 10, studentsid: 5, languageid: 1})
db.students_languages.insert({id: 11, studentsid: 5, languageid: 5})
db.students_languages.insert({id: 12, studentsid: 6, languageid: 1})
db.students_languages.insert({id: 13, studentsid: 6, languageid: 2})
db.students_languages.insert({id: 13, studentsid: 6, languageid: 3})



db.Students_language.find()

//
// Rapport lvl 1

db.students.find({id: 3}) 
db.getCollection('students').find({id: 3})

db.students.find({id: 6}) 
db.getCollection('students').find({id: 6})

db.students.find({id: 3}, {'_id': 0,'name': 1, 'ville':1})  // this will show(0 means dont display) name and ville with id 3

db.students.find({id: 2}, {'_id': 0,'name': 1})     // this will show(1 means display name field) name with id 2

db.students.find({ville: 'Paris'}, {'_id': 1, 'id': 1, 'name': 1,'ville': 1})
db.students.find({ville:'Paris'})

db.students.find({ville: 'Lyon'}, {'_id': 0, 'id': 1, 'name': 1,'ville': 1})
