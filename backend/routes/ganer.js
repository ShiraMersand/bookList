const router = require("express").Router();

  const genres = require("../controllers/genre.controller ");

  // Create a new Customer
  router.post("/add", genres.create);

  // Retrieve all Customers
  router.get("/getAll", genres.findAll);


module.exports=router
