import { Component, Output, EventEmitter } from '@angular/core';
import { Book } from '../BookInterface';
import { BookServiceService } from '../book-service.service';
import { Title } from '@angular/platform-browser';
import { ErrorMessage } from '../ErrorMassage';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent {
  selectedBook: any;
  @Output() close = new EventEmitter<boolean>();
  newTitle: String;
  newAuthor: String;
  newCategory: String;
  newRating: Number;
  errorMessage: ErrorMessage = {
    title: "",
    author: "",
    category: "",
    rating: ""
  };

  constructor(private bookService: BookServiceService) {
    this.selectedBook = this.bookService.selectedBook;
    this.newTitle = this.selectedBook?.title
    this.newAuthor = this.selectedBook?.author
    this.newCategory = this.selectedBook?.category
    this.newRating = this.selectedBook?.rating
  }

  closeModal() {
    this.close.emit(false);
  }

  edit() {
    const editedBook: Book = {
      id: this.selectedBook.id,
      title: this.newTitle,
      author: this.newAuthor,
      category: this.newCategory,
      rating: this.newRating
    }

    this.bookService.update(editedBook).subscribe(response => {
      if (response === 1) {
        console.log("Edited");
        this.close.emit(false);
        this.selectedBook.title = editedBook.title
        this.selectedBook.author = editedBook.author
        this.selectedBook.category = editedBook.category
        this.selectedBook.rating = editedBook.rating
      }
    },
      error => {
        console.error(error.error)
        Object.keys(error.error).forEach(key => {
          this.errorMessage = error.error;
        })
      }
    )
  }
}
