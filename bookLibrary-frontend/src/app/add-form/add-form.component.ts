import { Component, Output, EventEmitter } from '@angular/core';
import { BookServiceService } from '../book-service.service';
import { Book } from '../BookInterface';
import { ErrorMessage } from '../ErrorMassage';


@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent {
  modalWindow: boolean = false;
  newBook: Book = {
    id: -1,
    title: "",
    author: "",
    category: "",
    rating: 0
  }
  @Output() close = new EventEmitter<Book>();
  errorMessage: ErrorMessage = {
    title: "",
    author: "",
    category: "",
    rating: ""
  };

  constructor(private bookService: BookServiceService) { }

  toggle() {
    this.modalWindow = !this.modalWindow
    this.newBook.title = ""
    this.newBook.author = ""
    this.newBook.category = ""
    this.newBook.rating = 0
    this.errorMessage.title = ""
    this.errorMessage.author = ""
    this.errorMessage.category = ""
    this.errorMessage.rating = ""
  }

  add() {
    const newBookToAdd: Book = {
      id: -1,
      title: this.newBook.title,
      author: this.newBook.author,
      category: this.newBook.category,
      rating: this.newBook.rating
    }
    this.bookService.add(newBookToAdd).subscribe(response => {
      if (response === 1) {
        console.log("Added new book")
        this.modalWindow = false
        this.close.emit(newBookToAdd);
      }
    },
      error => {
        Object.keys(error.error).forEach(key => {
          this.errorMessage = error.error;
        })
      }
    )
  }
}
