const sql = require("./db.js");

// constructor
const Genre = function(genre) {
  this.ganre_name = genre.name;
};

Genre.create = (newGenre, result) => {

  sql.query("INSERT INTO ganre_tbl SET ?", newGenre, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created genre: ", { id: res.insertId, ...newGenre });
    result(null, { id: res.insertId, ...newGenre });
  });
};



Genre.getAll = result => {
  sql.query("SELECT * FROM ganre_tbl", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("genres: ", res);
    result(null, res);
  });
};

module.exports = Genre;
