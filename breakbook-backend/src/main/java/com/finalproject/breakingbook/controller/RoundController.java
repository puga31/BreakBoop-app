package com.finalproject.breakingbook.controller;

import com.finalproject.breakingbook.dto.RoundCreateRequest;
import com.finalproject.breakingbook.model.Round;
import com.finalproject.breakingbook.service.RoundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rounds")
@CrossOrigin(origins = "http://localhost:4200")
public class RoundController {

    private final RoundService roundService;

    @Autowired
    public RoundController(RoundService roundService) {
        this.roundService = roundService;
    }

    // Para crear ronda
    @PostMapping("/create")
    public ResponseEntity<Round> createRound(@RequestBody RoundCreateRequest request) {
        Round round = roundService.createRound(
                request.getUserId(),
                request.getName(),
                request.getMoveIds()
        );
        return ResponseEntity.ok(round);
    }

    // Para obtener rondas por usuario
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Round>> getRoundsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(roundService.getRoundsByUser(userId));
    }

    // Para actualizar ronda
    @PutMapping("/update/{id}")
    public ResponseEntity<Round> updateRound(@PathVariable Long id, @RequestBody RoundCreateRequest request) {
        Round updatedRound = roundService.updateRound(
                id,
                request.getUserId(),
                request.getName(),
                request.getMoveIds()
        );
        return ResponseEntity.ok(updatedRound);
    }

    // Para eliminar ronda
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRound(@PathVariable Long id, @RequestParam Long userId) {
        roundService.deleteRound(id, userId);
        return ResponseEntity.ok("Ronda eliminada correctamente");
    }
}
