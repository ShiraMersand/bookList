const sql = require("./db.js");

// constructor
const Book = function(Book) {
  this.book_name = Book.book_name;
  this.ganre_id = Book.ganre_id;
};

Book.create = (newBook, result) => {
  
  sql.query("INSERT INTO book_tbl SET ?", newBook, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created book: ", { id: res.insertId, ...newBook });
    result(null, { id: res.insertId, ...newBook });
  });
};

Book.findById = (bookId, result) => {
  sql.query(`SELECT * FROM book_tbl WHERE id = ${bookId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found book: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Book with the id
    result({ kind: "not_found" }, null);
  });
};

Book.getAll = result => {
  sql.query(" SELECT * FROM book_tbl inner  JOIN ganre_tbl ON book_tbl.ganre_id = ganre_tbl.ganre_id", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Books: ", res);
    result(null, res);
  });
};

Book.updateById = (id, Book, result) => {
  sql.query(
    "UPDATE book_tbl SET book_name = ?, ganre_id = ? WHERE book_id = ?",
    [Book.book_name, Book.ganre_id, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Book with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Book: ", { id: id, ...Book });
      result(null, { id: id, ...Book });
    }
  );
};

Book.remove = (id, result) => {
  sql.query("DELETE FROM book_tbl WHERE book_id = ?  ", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Book with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Book with id: ", id);
    result(null, res);
  });
};


module.exports = Book;
