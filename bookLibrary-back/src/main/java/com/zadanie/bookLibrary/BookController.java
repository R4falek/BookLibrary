package com.zadanie.bookLibrary;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin("*")
public class BookController {

    @Autowired
    BookRepository bookRepository;

    @GetMapping("")
    public List<Book> getAll() {
        return bookRepository.getAll();
    }

    @GetMapping("/{id}")
    public Book getById(@PathVariable("id") int id) {
        return bookRepository.getById(id);
    }

    @PostMapping("")
    public int addBook(@RequestBody @Valid Book book) {
        return bookRepository.save(book);
    }


    @PutMapping("/{id}")
    public int update(@PathVariable("id") int id, @RequestBody @Valid Book updatedBook) {
        Book book = bookRepository.getById(id);

        if (book != null) {
            book.setTitle(updatedBook.getTitle());
            book.setAuthor(updatedBook.getAuthor());
            book.setCategory(updatedBook.getCategory());
            book.setRating(updatedBook.getRating());

            bookRepository.update(book);
            return 1;
        } else {
            return -1;
        }
    }

    @PatchMapping("/{id}")
    public int updatePartial(@PathVariable("id") int id, @RequestBody Book updatedBook) {
        Book book = bookRepository.getById(id);

        if (book != null){
            if (updatedBook.getTitle() != null && !updatedBook.getTitle().equals(""))
                book.setTitle(updatedBook.getTitle());
            if (updatedBook.getAuthor() != null && !updatedBook.getAuthor().equals(""))
                book.setAuthor(updatedBook.getAuthor());
            if (updatedBook.getCategory() != null  && !updatedBook.getCategory().equals(""))
                book.setCategory(updatedBook.getCategory());
            if (updatedBook.getRating() >= 0 && updatedBook.getRating() <= 10)
                book.setRating(updatedBook.getRating());

            bookRepository.update(book);
            return 1;
        } else {
            return -1;
        }
    }

    @DeleteMapping("/{id}")
    public int delete(@PathVariable("id") int id) {
        return bookRepository.delete(id);
    }
}
