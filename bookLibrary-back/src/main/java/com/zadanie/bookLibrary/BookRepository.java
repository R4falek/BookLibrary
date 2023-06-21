package com.zadanie.bookLibrary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;
    private int requestCount = 0;

    public List<Book> getAll() {
        requestCount++;
        this.logRequestCount();
        return jdbcTemplate.query("SELECT * FROM book",
                BeanPropertyRowMapper.newInstance(Book.class));
    }

    public Book getById(int id){
        requestCount++;
        this.logRequestCount();
        return jdbcTemplate.queryForObject("SELECT id, title, author, category, rating from book where " +
                "id = ?", BeanPropertyRowMapper.newInstance(Book.class), id);
    }

    public int save(Book book) {
        requestCount++;
        this.logRequestCount();
        jdbcTemplate.update("INSERT INTO book(title, author, category, rating) VALUES(?, ?, ?, ?)",
                book.getTitle(), book.getAuthor(), book.getCategory(), book.getRating());
        return 1;
    }

    public int update(Book book) {
        requestCount++;
        this.logRequestCount();
        return jdbcTemplate.update("UPDATE book SET title=?, author=?, category=?, rating=? where id=?",
                book.getTitle(), book.getAuthor(), book.getCategory(), book.getRating(), book.getId());
    }

    public int delete(int id) {
        requestCount++;
        this.logRequestCount();
        return jdbcTemplate.update("DELETE FROM book WHERE id=?", id);
    }

    public void logRequestCount() {
        System.out.println("Request count: " + requestCount);
    }
}
