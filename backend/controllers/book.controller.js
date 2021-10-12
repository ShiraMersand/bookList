const Book = require("../models/book.model");

// Create and Save a new Book
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Book
  const book = new Book({
    book_name: req.body.book_name,
    ganre_id: req.body.ganre_id,
  });

  // Save Book in the database
  Book.create(book, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Book."
      });
    else res.send(data);
  });
};

// Retrieve all Books from the database.
exports.findAll = (req, res) => {
  Book.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving books."
      });
    else res.send(data);
  });
};

// Find a single Book with a bookId
exports.findOne = (req, res) => {
  Book.findById(req.params.bookId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Book with id ${req.params.bookId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Book with id " + req.params.bookId
        });
      }
    } else res.send(data);
  });
};

// Update a Book identified by the bookId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Book can not be empty!"
    });
  }

  console.log(req.body);

  Book.updateById(
    req.params.id,
    new Book(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Book with id ${req.params.bookId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Book with id " + req.params.bookId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Book with the specified bookId in the request
exports.delete = (req, res) => {
  
  Book.remove(req.params.id, (err, data) => {
    console.log("Angular");

    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Book with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Book with id " + req.params.id
        });
      }
    } else{
      data.bookId=req.params.id
      res.send(data);;
    }
  });
};

