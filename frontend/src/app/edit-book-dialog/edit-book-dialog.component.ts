import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Books } from '../shared/books.model';
import { GanreService } from '../../servise/ganre.service';
import { Ganre } from '../shared/ganre.model ';


@Component({
  selector: 'app-edit-book-dialog',
  templateUrl: './edit-book-dialog.component.html',
  styleUrls: ['./edit-book-dialog.component.css']
})
export class EditBookDialogComponent implements OnInit {

  ganres: Ganre[]

  constructor(
    public dialogRef: MatDialogRef<EditBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public book: Books,
    private ganreService: GanreService,
    ) { }

  ngOnInit(): void {
    this.retrieveGanres();
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

  close() {
    this.dialogRef.close()
  }
  
  onFormSubmit(form: NgForm) {
    debugger

    if (form.invalid) return
    const updatedBook = {
      ...this.book,
      ...form.value
    }
    
    this.dialogRef.close(updatedBook)
  }


}
