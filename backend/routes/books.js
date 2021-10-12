const router = require("express").Router();

  const books = require("../controllers/book.controller");

  router.post("/add", books.create);

  router.get("/getAll", books.findAll);
  router.delete("/deleteById/:id", books.delete);
  router.patch("/updateById/:id", books.update);


module.exports=router
