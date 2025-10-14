package com.klef.library.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.klef.library.entity.LibraryItem;
import com.klef.library.service.LibraryService;

@RestController
@RequestMapping("/libraryapi/")
@CrossOrigin(origins = "*")
public class LibraryController {

    @Autowired
    private LibraryService service;

    @GetMapping("/")
    public String home() {
        return "Library Management API Running";
    }

    @PostMapping("/add")
    public ResponseEntity<LibraryItem> add(@RequestBody LibraryItem item) {
        LibraryItem saved = service.addItem(item);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<LibraryItem>> getAll() {
        return new ResponseEntity<>(service.getAllItems(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        LibraryItem item = service.getItemById(id);
        if (item != null) return new ResponseEntity<>(item, HttpStatus.OK);
        return new ResponseEntity<>("Item with ID " + id + " not found.", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody LibraryItem item) {
        LibraryItem existing = service.getItemById(item.getId());
        if (existing != null) {
            return new ResponseEntity<>(service.updateItem(item), HttpStatus.OK);
        }
        return new ResponseEntity<>("Cannot update. Item with ID " + item.getId() + " not found.", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        LibraryItem existing = service.getItemById(id);
        if (existing != null) {
            service.deleteItemById(id);
            return new ResponseEntity<>("Item with ID " + id + " deleted successfully.", HttpStatus.OK);
        }
        return new ResponseEntity<>("Cannot delete. Item with ID " + id + " not found.", HttpStatus.NOT_FOUND);
    }
}
