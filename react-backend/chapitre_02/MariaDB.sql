CREATE TABLE if not EXISTS students (
id int PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(30),
 ville VARCHAR (30)
 );

INSERT into students
(name, ville) 
VALUES 
('Nour', 'Lyon');

SELECT * from students

CREATE table if not EXISTS languages (
  id Int PRIMARY KEY AUTO_INCREMENT,
  ville varchar(30)
  );
  
INSERT into languages (name) VALUES 
  ('French'),
  ('English'),
  ('German'),
  ('Spanish'),
  ('Spanish'),
  ('Mandarin');
  
SELECT * from languages

CREATE table if not EXISTS favorites (
  id Int PRIMARY KEY AUTO_INCREMENT,
  student_id int,
  class varchar(30),
  sport varchar(30)
  );
  
    
INSERT into favorites (class, sport, student_id) VALUES
  ('literature', 'tennis', 3),
  ('computer science', 'tennis', 5),
  ('arts', 'baseball', 4);
  
  SELECT * FROM favorites
  
CREATE TABLE  if NOT EXISTS students_languages (
  id int PRIMARY KEY AUTO_INCREMENT,
  student_id int,
  language_id int  
);

INSERT into students_languages (student_id, language_id) VALUES
('1', '1'), ('1', '2'),('2', '1'),('2', '3'),('3', '1'),('4', '1'),('4', '2'),
('4', '4'),('4', '5'),('5', '1'),('5', '5'),('6', '1'),('6', '2'),('6', '3');

SELECT * from students_languages

Rapport lvl 1

-- Rappport lvl 1
-- 1. Récupérer toutes les colonnes de l’étudiant.e avec l’ID 3
SELECT * FROM students WHERE id = 3;
-- 2. Récupérer toutes les colonnes l’étudiant.e avec l’ID 6
SELECT * FROM students WHERE id = 6;
-- 3. Récupérer le nom et la ville de l’étudiant.e avec l’ID 1
SELECT name, city FROM students WHERE id = 1;
-- 4. Récupérer le nom de l’étudiant.e avec l’ID 2
SELECT name FROM students WHERE id = 2;
-- 5. Récupérer toutes les colonnes des étudiant.e.s de la ville de Paris
SELECT * FROM students WHERE city = 'Paris';
-- 6. Récupérer les noms des étudiant.es de la ville de Lyon
SELECT name FROM students WHERE city = 'Lyon';

Rapport lvl 2

--  Rapport lvl 2
-- 1. Pour l’étudiant.e d’ID 5, récupérer toutes les colonnes sur l’étudiant.e et ses activités favorites
SELECT * FROM students INNER JOIN favorites ON students.id = favorites.student_id WHERE students.id = 5;
-- 2. Pour l’étudiant.e d’ID 4, récupérer son nom et son sport préféré
SELECT name, sport FROM students INNER JOIN favorites ON students.id = favorites.student_id WHERE students.id = 4;
-- autre façon @Yeshi
SELECT students.name, favorites.sport FROM students, favorites WHERE students.id = 4 AND favorites.student_id = 4;
-- 3. Pour l’étudiant.e d’ID 1, récupérer son nom et sa matière préférée
SELECT name, class FROM students INNER JOIN favorites ON students.id = favorites.student_id WHERE students.id = 1;
-- 4. Récupérer toutes les colonnes de l’étudiant.e qui aime la musique
SELECT * FROM students INNER JOIN favorites ON students.id = favorites.student_id WHERE favorites.class = 'Music';
-- 5. Récupérer le nom des étudiant.e.s qui aime le tennis
SELECT name FROM students INNER JOIN favorites ON students.id = favorites.student_id WHERE favorites.sport = 'Tennis';
-- 6. Récupérer le nom des étudiant.e.s qui aime les matières artistiques
SELECT name FROM students INNER JOIN favorites ON students.id = favorites.student_id WHERE favorites.class = 'Arts';
-- 7. Récupérer le nombre d’étudiant.e.s de la ville de Paris
SELECT students.id, name, count(*) as languagesCount FROM students INNER JOIN students_languages ON students_languages.student_id = students.id group by students.id

-- Rapport lvl 3
-- 1. Récupérer les langues et toutes les colonnes de l’étudiant.e d’ID 1
SELECT * FROM students
INNER JOIN students_languages ON students_languages.student_id = students.id
INNER JOIN languages ON languages.id = students_languages.language_id
WHERE students.id = 1
-- 2. Récupérer les langues et toutes les colonnes de l’étudiant.e d’ID 4
SELECT * FROM students
INNER JOIN students_languages ON students_languages.student_id = students.id
INNER JOIN languages ON languages.id = students_languages.language_id
WHERE students.id = 4
-- 3. Récupérer la colonne langue et le nom de l’étudiant.e d’ID 5
SELECT students.name, languages.name FROM students
INNER JOIN students_languages ON students_languages.student_id = students.id
INNER JOIN languages ON languages.id = students_languages.language_id
WHERE students.id = 5
-- 4. Pour chaque étudiant.e.s (6), faîtes une requêtes pour récupérer le nombre de langues parlées par cet étudiant.e.s avec leurs noms et le nombres de langues
SELECT students.name, COUNT(*) as nbLanguages FROM students
INNER JOIN students_languages ON students_languages.student_id = students.id
INNER JOIN languages ON languages.id = students_languages.language_id
WHERE students.id = 1
GROUP BY students.name

-- Bonus
SELECT name FROM students WHERE name LIKE '%e%'
SELECT name, sport FROM students JOIN favorites ON students.id = favorites.student_id WHERE name LIKE '%e%'
SELECT name, class, city FROM students JOIN favorites ON students.id = favorites.student_id WHERE city LIKE '%i%'





