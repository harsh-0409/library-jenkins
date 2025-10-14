package com.klef.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.library.entity.LibraryItem;

@Repository
public interface LibraryItemRepository extends JpaRepository<LibraryItem, Integer> {
    LibraryItem findByIsbn(String isbn);
}
