package com.finalproject.breakingbook.repository;

import com.finalproject.breakingbook.model.Move;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoveRepository extends JpaRepository<Move, Long> {


}
