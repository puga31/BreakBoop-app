package com.finalproject.breakingbook.service;

import com.finalproject.breakingbook.model.Move;
import com.finalproject.breakingbook.repository.MoveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MoveService {

    private final MoveRepository moveRepository;

    @Autowired
    public MoveService(MoveRepository moveRepository) {
        this.moveRepository = moveRepository;
    }

    // Para obtener todos los movimientos
    public List<Move> getMoves() {
        return moveRepository.findAll();
    }

    // Para obtener un movimiento por ID
    public Optional<Move> getMoveById(Long id) {
        return moveRepository.findById(id);
    }

    // Para agregar o actualizar un movimiento
    public Move addMove(Move move) {
        return moveRepository.save(move);
    }

    // Para eliminar un movimiento por ID
    public boolean deleteMove(Long id) {
        if (moveRepository.existsById(id)) {
            moveRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Para actualizar un movimiento existente
    public Move updateMove(Move move) {
        return moveRepository.save(move);
    }

    // Para buscar movimiento por ID, si no existe nos devolverá null
    public Move findById(Long id) {
        return moveRepository.findById(id).orElse(null);
    }
}
