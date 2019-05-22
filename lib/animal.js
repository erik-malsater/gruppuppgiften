// Setup the routes
class Animal {
  constructor(app, db) {
    this.app = app;
    this.db = db;
  }

  postAnimal(animal) {
    const plural = `${animal}s`;
    this.app.post(`/${animal}`, (req, res) => {
      if (!req.body.name) {
        console.log(req.body);
        return res.status(400).send({
          success: false,
          message: 'Name is required for animal',
        });
      }
      const newAnimal = req.body;
      const newId = this.db[plural].push(newAnimal);
      return res.status(201).send({
        success: true,
        message: 'Animal added successfully',
        id: newId,
      });
    });
  }

  getAnimals(animal) {
    const plural = `${animal}s`;
    this.app.get(`/${plural}`, (req, res) => res.status(200).send({
      success: true,
      data: this.db[plural].all(),
    }));

    this.app.get(`/${animal}/:id`, (req, res) => {
      const id = parseInt(req.params.id, 10);
      const target = this.db.plural.find({ id });
      if (target) {
        return res.status(200).send({
          success: true,
          data: animal,
        });
      }
      return res.status(404).send({
        success: false,
        message: `${animal} not found`,
      });
    });
  }

  searchAnimal(animal) {
    this.app.get(`/${animal}Search/:key/:value`, (req, res) => {
      const animals = `${animal}s`;
      const { key, value } = req.params;
      const target = this.db[animals].find({ [key]: value });

      if (target) {
        return res.status(200).send({
          success: true,
          data: target,
        });
      }
      return res.status(404).send({
        success: false,
        message: `${target} not found.`,
      });
    });
  }
}

export default Animal;
