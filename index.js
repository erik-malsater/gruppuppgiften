import express from 'express';
import bodyParser from 'body-parser';
import Database from './lib/db';
import Animal from './lib/animal';

// Setup the server
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Setup the database
const db = new Database();
db.addCollection('cats', [
  { name: 'Fluffy', color: 'White', age: 3 },
  { name: 'Aslan', color: 'Gold', age: 11 },
  { name: 'Kitty', color: 'Grey', age: 1 },
]);
db.addCollection('dogs', []);
db.addCollection('pokemons', []);

for (let i = 0; i < db.collections.length; i += 1) {
  const animal = db.collections[i].substr(0, db.collections[i].length - 1);
  new Animal(app, db).postAnimal(animal);
  new Animal(app, db).getAnimals(animal);
  new Animal(app, db).searchAnimal(animal);
  new Animal(app, db).getAnimalById(animal);
}

// Start server
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
