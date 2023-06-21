import { Component, Output, EventEmitter } from '@angular/core';
import { BookServiceService } from '../book-service.service';
import { Book } from '../BookInterface';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  selectedBook?: Book;
  
  @Output() close = new EventEmitter<boolean>();

  constructor(private bookService: BookServiceService) {
    this.selectedBook = this.bookService.selectedBook;
  }

  closeModal() {
    this.close.emit(false);
  }
}
