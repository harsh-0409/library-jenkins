package com.klef.library.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.library.entity.LibraryItem;
import com.klef.library.repository.LibraryItemRepository;

@Service
public class LibraryServiceImpl implements LibraryService {

    @Autowired
    private LibraryItemRepository repository;

    @Override
    public LibraryItem addItem(LibraryItem item) {
        return repository.save(item);
    }

    @Override
    public List<LibraryItem> getAllItems() {
        return repository.findAll();
    }

    @Override
    public LibraryItem getItemById(int id) {
        Optional<LibraryItem> opt = repository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public LibraryItem updateItem(LibraryItem item) {
        return repository.save(item);
    }

    @Override
    public void deleteItemById(int id) {
        repository.deleteById(id);
    }
}
