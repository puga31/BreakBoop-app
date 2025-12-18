package com.finalproject.breakingbook.controller;

import com.finalproject.breakingbook.model.Move;
import com.finalproject.breakingbook.model.User;
import com.finalproject.breakingbook.repository.UserRepository;
import com.finalproject.breakingbook.service.MoveService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/moves")
@CrossOrigin(origins = "http://localhost:4200") // Permite solicitudes desde Angular
public class MoveController {

    private final MoveService moveService;
    private final UserRepository userRepository;

    @Autowired
    public MoveController(MoveService moveService, UserRepository userRepository) {
        this.moveService = moveService;
        this.userRepository = userRepository;
    }

    // Para btener todos los movimientos
    @GetMapping("/getall")
    public List<Move> getMoves() {
        return moveService.getMoves();
    }

    // Para gregar un nuevo movimiento
    @PostMapping("/add")
    public ResponseEntity<Move> addMove(@RequestBody Move move) {
        if (move.getUser() != null && move.getUser().getId() != null) {
            Optional<User> userOptional = userRepository.findById(move.getUser().getId());
            userOptional.ifPresent(move::setUser);
        }

        Move savedMove = moveService.addMove(move);
        return ResponseEntity.ok(savedMove);
    }

    // Para eliminar un movimiento por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMove(@PathVariable Long id) {
        boolean isRemoved = moveService.deleteMove(id);
        if (isRemoved) {
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }

    // para modificar un movimiento por ID
    @PutMapping("/{id}")
    public ResponseEntity<Move> updateMove(@PathVariable Long id, @RequestBody Move moveDetails) {
        Optional<Move> optionalMove = moveService.getMoveById(id);
        if (optionalMove.isPresent()) {
            Move move = optionalMove.get();
            move.setName(moveDetails.getName());
            move.setPhoto(moveDetails.getPhoto());
            move.setVideo(moveDetails.getVideo());
            move.setOrigin(moveDetails.getOrigin());
            move.setHistory(moveDetails.getHistory());
            move.setTutorial(moveDetails.getTutorial());
            move.setType(moveDetails.getType());

            if (moveDetails.getUser() != null && moveDetails.getUser().getId() != null) {
                Optional<User> userOptional = userRepository.findById(moveDetails.getUser().getId());
                userOptional.ifPresent(move::setUser);
            }

            Move updatedMove = moveService.updateMove(move);
            return ResponseEntity.ok(updatedMove);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
