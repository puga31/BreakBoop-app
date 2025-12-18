package com.finalproject.breakingbook.repository;

import com.finalproject.breakingbook.model.Round;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoundRepository extends JpaRepository<Round, Long> {
    List<Round> findByUserId(Long userId);
}
