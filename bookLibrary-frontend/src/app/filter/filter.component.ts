import { Component, Output, EventEmitter } from '@angular/core';
import { Book } from '../BookInterface';
import { BookServiceService } from '../book-service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  books: any;
  filteredBooks?: Book[];
  @Output() filteredBooksEmiter = new EventEmitter<any>();

  titleFilter?: string;
  authorFilter?: string;
  categoryFilter?: string;
  ratingFilter?: string;
  toggle: boolean = false;
  titleOptions: String[] = []
  authorOptions: String[] = []
  categoryOptions: String[] = []
  ratingOptions: Number[] = []


  constructor(private bookService: BookServiceService) {
    this.bookService.books.subscribe((data: any) => {
      this.books = data
      this.filteredBooks = this.books;
    });
    this.clearFilters()
  }

  applyFilter(toggle: boolean) {
    this.filteredBooks = this.books.filter((book: any) => {
      const titleMatch = book.title.toLowerCase().includes(this.titleFilter?.toLowerCase() || '');
      const authorMatch = book.author.toLowerCase().includes(this.authorFilter?.toLowerCase() || '');
      const categoryMatch = book.category.toLowerCase().includes(this.categoryFilter?.toLowerCase() || '');
      const ratingMatch = book.rating.toString().includes(this.ratingFilter?.toLowerCase() || '');
      return titleMatch && authorMatch && categoryMatch && ratingMatch;
    });
    this.filteredBooksEmiter.emit(this.filteredBooks);
    if (toggle)
      this.toggleFilter()
  }

  toggleFilter(){ 
    this.toggle = !this.toggle;
    this.getFilterOptions();
  }

  getFilterOptions() {
    this.clearOptions()
    this.filteredBooks?.forEach(book => {
      if(!this.titleOptions.includes(book.title))
        this.titleOptions.push(book.title)
      if(!this.authorOptions.includes(book.author))
        this.authorOptions.push(book.author)
      if(!this.categoryOptions.includes(book.category))
        this.categoryOptions.push(book.category)
      if(!this.ratingOptions.includes(book.rating))
        this.ratingOptions.push(book.rating)
    })
    this.sortOptions()
  }

  getAllOptions() {
    this.clearOptions()
    this.books?.forEach((book: any) => {
      if(!this.titleOptions.includes(book.title))
        this.titleOptions.push(book.title)
      if(!this.authorOptions.includes(book.author))
        this.authorOptions.push(book.author)
      if(!this.categoryOptions.includes(book.category))
        this.categoryOptions.push(book.category)
      if(!this.ratingOptions.includes(book.rating))
        this.ratingOptions.push(book.rating)
    })
    this.sortOptions()
  }

  clearFilters() {
    this.titleFilter = ""
    this.authorFilter = ""
    this.categoryFilter = ""
    this.ratingFilter = ""
    this.getAllOptions()
    this.applyFilter(false)
  }

  sortOptions(){
    this.titleOptions.sort()
    this.authorOptions.sort()
    this.categoryOptions.sort()
    this.ratingOptions.sort()
  }

  clearOptions(){
    this.titleOptions = [];
    this.authorOptions = [];
    this.categoryOptions = [];
    this.ratingOptions = [];
  }

  onChangeSelect(){
    this.applyFilter(false)
    this.getFilterOptions()
  }
}