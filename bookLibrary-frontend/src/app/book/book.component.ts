import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../book-service.service';
import { Book } from '../BookInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books?: any;
  showDetails: boolean = false;
  deleteWindow: boolean = false;
  editWindow: boolean = false;
  sortBy: string = 'id';

  constructor(private bookService: BookServiceService, private router: Router) { }

  ngOnInit(): void {
    this.bookService.fetchBooks()
    this.bookService.books.subscribe((data: any) => this.books = data);
  }

  toggleInfo(book: any) {
    this.showDetails = true;
    this.bookService.chooseBook(book);
  }

  editBook(book: any) {
    this.editWindow = true;
    this.bookService.chooseBook(book);
  }

  deleteBook(book: any) {
    this.deleteWindow = true;
    this.bookService.chooseBook(book);
  }

  closeInfo(value: any) {
    this.showDetails = value;
  }

  closeDelete(value: any) {
    this.deleteWindow = false;
    if(value) 
    this.books = this.books.filter((book: any) => book.id !== this.bookService.selectedBook?.id);
  }

  closeEdit(value: any) {
    this.editWindow = value;
  }

  sortTable(field: string) {
    if (this.sortBy === field) {
      this.books.reverse();
    } else {
      this.books.sort((a: any, b: any) => (a[field] > b[field]) ? 1 : -1);
      this.sortBy = field;
    }
  }

  addBook(book: Book) {
    this.books.push(book);
  }

  filterBooks(books: any){
    this.books = books;
  }
}