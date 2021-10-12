const Genre = require("../models/ganer.model");

// Create and Save a new genre
exports.create = (req, res) => {
  // Validate request
  console.log("and hellow to u");
  
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a genre
  const genre = new Genre({
    name: req.body.name,
  });

  // Save Book in the database
  Genre.create(genre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Genre."
      });
    else res.send(data);
  });
};

// Retrieve all Genres from the database.
exports.findAll = (req, res) => {
  Genre.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving books."
      });
    else res.send(data);
  });
};
