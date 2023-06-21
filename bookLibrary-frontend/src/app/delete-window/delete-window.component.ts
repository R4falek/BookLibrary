import { Component, Output, EventEmitter } from '@angular/core';
import { Book } from '../BookInterface';
import { BookServiceService } from '../book-service.service';

@Component({
  selector: 'app-delete-window',
  templateUrl: './delete-window.component.html',
  styleUrls: ['./delete-window.component.css']
})
export class DeleteWindowComponent {
  selectedBook?: Book;
  @Output() close = new EventEmitter<boolean>();

  constructor(private bookService: BookServiceService) {
    this.selectedBook = this.bookService.selectedBook;
  }

  closeModal(){
    this.close.emit(false);
  }

  delete() {
    this.close.emit(true);
    this.bookService.delete();
  }
}
