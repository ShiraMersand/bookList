import { Component, OnInit, Input } from '@angular/core';
import { Books } from '../shared/books.model';
import { Ganre } from '../shared/ganre.model ';
import { BooksService } from '../../servise/books.service';
import { GanreService } from '../../servise/ganre.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditBookDialogComponent } from '../edit-book-dialog/edit-book-dialog.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  @Input() books: Books[]
  @Input() filteredBooks: Books[]
  filteredGenres = []
  ganres: Ganre[]
  showValidationErrors: boolean;

  selectedValue: string;

  constructor(
    private bookService: BooksService,
    private ganreService: GanreService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.retrieveBooks();
    this.retrieveGanres();

  }

  retrieveBooks(): void {
    this.bookService.getAllBooks()
      .subscribe(
        data => {
          this.books = data;
          this.filteredBooks = this.books
        },
        error => {
          console.log(error);
        });
  }
  retrieveGanres(): void {
    this.ganreService.getAllGanres()
      .subscribe(
        data => {
          this.ganres = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


  onFormSubmit(form: NgForm) {
    debugger
    if (form.invalid) return this.showValidationErrors = true

    this.bookService.addBook(new Books(null, form.value.text, form.value.ganre_id))
      .subscribe(
        data => {
          debugger
          for (let index = 0; index < this.ganres.length; index++) {
            if (data.ganre_id == this.ganres[index].ganre_id) {
              data.ganre_name=this.ganres[index].ganre_name

            }
          }
          this.books.push(data)
          console.log(data);
        },
        error => {
          debugger
          console.log(error);
        });

    this.showValidationErrors = false
    form.reset()
  }


  editBook(book: Books) {
    let dialogRef = this.dialog.open(EditBookDialogComponent, {
      width: '700px',
      data: book
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.bookService.updateBook(result.book_id, result)
          .subscribe(
            data => {
              debugger
              console.log(data);
              for (let index = 0; index < this.ganres.length; index++) {
                if (data.ganre_id == this.ganres[index].ganre_id) {
                  data.ganre_name=this.ganres[index].ganre_name
    
                }
              }
              this.books.filter(
                item => {
                  if (item.book_id == data.id) {
                    item.book_name = data.book_name;
                    item.ganre_id = data.ganre_id
                    item.ganre_name = data.ganre_name
                  }
                })
              console.log("books: ", this.books);

            },
            error => console.log(error)
          )
      }
    })

  }

  deleteBook(book: Books) {
    this.bookService.deleteBook(book.book_id)
      .subscribe(
        data => {
          debugger
          if (data.affectedRows == 1) {
            let ind;
            for (let index = 0; index < this.books.length; index++) {
              if (this.books[index].book_id == data.bookId) {
                ind = index
                break;
              }
            }
            this.books.splice(ind, 1)
          }
        },
        error => {
          console.log(error);
        });
  }

  onChange(event) {
    if (event.target.checked) {
      this.filteredGenres.push(parseInt(event.target.value));

    } else {
      let ind = this.filteredGenres.indexOf(event.target.value)
      this.filteredGenres.splice(ind, 1);
      if (this.filteredGenres.length == 0) {
        this.filteredBooks = this.books;
        return;
      }
    }
    this.filteredBooks = [];
    for (let index = 0; index < this.books.length; index++) {
      if (this.filteredGenres.includes(this.books[index].ganre_id)) {
        this.filteredBooks.push(this.books[index])
      }
    }
  }





}
