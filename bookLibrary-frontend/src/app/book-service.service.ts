import { Injectable } from '@angular/core';
import { Book } from './BookInterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  private booksSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  selectedBook?: Book;

  constructor(private http: HttpClient) {
  }

  get books(): BehaviorSubject<any[]> {
    return this.booksSubject;
  }

  chooseBook(book: any) {
    this.selectedBook = book;
  }

  fetchBooks() {
    const url = 'http://localhost:8080/books';
    this.http.get(url).subscribe(
      (data: any) => {
        this.booksSubject.next(data)
      });
  }

  delete() {
    const url = 'http://localhost:8080/books/' + this.selectedBook?.id;
    this.http.delete(url).subscribe(response => {
      if (response === 0) console.log("This book doesn't exist");
      if (response === 1) console.log("Deleted successfully");
    });
  }

  update(book: Book) {
    const url = 'http://localhost:8080/books/' + book.id;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(url, book, { headers });
  }

  add(book: Book) {
    const url = 'http://localhost:8080/books';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(url, book, { headers })
  }
}
