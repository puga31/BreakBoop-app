package com.finalproject.breakingbook.service;

import com.finalproject.breakingbook.model.User;
import com.finalproject.breakingbook.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User addUser(User user) {
        // Encriptar contraseña en hash
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        // Guardamos el usuario en la base de datos
        User savedUser = userRepository.save(user);

        // Para enviar email de bienvenida
        try {
            emailService.sendSimpleEmail(
                    savedUser.getEmail(),
                    "Registro en BreakingBook",
                    "Hola " + savedUser.getName() + ",\n\nGracias por registrarte en BreakingBook.\n\n¡Bienvenido!");
        } catch (Exception e) {

            System.err.println("Error enviando email: " + e.getMessage());
        }

        return savedUser;
    }

    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<User> login(String email, String rawPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(rawPassword, user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }
}
