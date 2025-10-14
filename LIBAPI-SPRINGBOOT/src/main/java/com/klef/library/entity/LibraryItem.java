package com.klef.library.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "library_item")
public class LibraryItem {
    @Id
    @Column(name = "item_id")
    private int id;

    @Column(name = "item_title", nullable = false, length = 120)
    private String title;

    @Column(name = "item_author", nullable = false, length = 80)
    private String author;

    @Column(name = "item_category", nullable = false, length = 50)
    private String category;

    @Column(name = "item_isbn", nullable = false, unique = true, length = 30)
    private String isbn;

    @Column(name = "item_price", nullable = false)
    private Double price;

    @Column(name = "item_publisher", nullable = false, length = 100)
    private String publisher;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getPublisher() { return publisher; }
    public void setPublisher(String publisher) { this.publisher = publisher; }

    @Override
    public String toString() {
        return "LibraryItem{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", category='" + category + '\'' +
                ", isbn='" + isbn + '\'' +
                ", price=" + price +
                ", publisher='" + publisher + '\'' +
                '}';
    }
}
