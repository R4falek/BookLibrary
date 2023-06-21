package com.zadanie.bookLibrary;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Book {
    private int id;
    @NotEmpty(message = "title shouldn't be null")
    private String title;
    @NotEmpty (message = "author shouldn't be null")
    private String author;
    @NotEmpty (message = "category shouldn't be null")
    private String category;
    @Min(0)
    @Max(10)
    private int rating;
}
