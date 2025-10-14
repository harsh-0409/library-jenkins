package com.klef.library.service;

import java.util.List;
import com.klef.library.entity.LibraryItem;

public interface LibraryService {
    LibraryItem addItem(LibraryItem item);
    List<LibraryItem> getAllItems();
    LibraryItem getItemById(int id);
    LibraryItem updateItem(LibraryItem item);
    void deleteItemById(int id);
}
