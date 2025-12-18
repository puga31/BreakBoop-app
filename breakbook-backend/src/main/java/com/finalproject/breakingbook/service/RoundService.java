package com.finalproject.breakingbook.service;

import com.finalproject.breakingbook.model.Move;
import com.finalproject.breakingbook.model.Round;
import com.finalproject.breakingbook.model.User;
import com.finalproject.breakingbook.repository.RoundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoundService {

    private final RoundRepository roundRepository;
    private final UserService userService;
    private final MoveService moveService;

    @Autowired
    public RoundService(RoundRepository roundRepository,
                        UserService userService,
                        MoveService moveService) {
        this.roundRepository = roundRepository;
        this.userService = userService;
        this.moveService = moveService;
    }

    // Para crear nueva ronda
    public Round createRound(Long userId, String roundName, List<Long> moveIds) {
        User user = userService.getUserById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        List<Move> moves = moveIds.stream()
                .map(moveService::findById)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        Round round = new Round();
        round.setName(roundName);
        round.setUser(user);
        round.setMoves(moves);

        return roundRepository.save(round);
    }

    // Para obtener todas las rondas de un usuario
    public List<Round> getRoundsByUser(Long userId) {
        return roundRepository.findByUserId(userId);
    }

    // Para actualizar una ronda existente
    public Round updateRound(Long id, Long userId, String name, List<Long> moveIds) {
        Round round = roundRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ronda no encontrada"));

        // Para verificar que la ronda pertenezca al usuario
        if (!round.getUser().getId().equals(userId)) {
            throw new RuntimeException("No tienes permiso para modificar esta ronda");
        }

        round.setName(name);
        List<Move> moves = moveIds.stream()
                .map(moveService::findById)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        round.setMoves(moves);

        return roundRepository.save(round);
    }

    // Para eliminar una ronda
    public String deleteRound(Long id, Long userId) {
        Optional<Round> roundOpt = roundRepository.findById(id);
        String toRet = "Ronda eliminada correctamente";

        if (roundOpt.isPresent()) {
            Round round = roundOpt.get();
            if (!round.getUser().getId().equals(userId)) {
                throw new RuntimeException("No tienes permiso para eliminar esta ronda");

            }
            roundRepository.delete(round);

        } else {
            throw new RuntimeException("Ronda no encontrada");
        }
        return toRet;
    }

}
