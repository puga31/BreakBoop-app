package com.finalproject.breakingbook.controller;

import com.finalproject.breakingbook.model.User;
import com.finalproject.breakingbook.model.LoginRequest;
import com.finalproject.breakingbook.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200") // Permite solicitudes CORS desde Angular
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Para obtener todos los usuarios
    @GetMapping("/getall")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    // Para agregar un nuevo usuario
    @PostMapping("/add")
    @PreAuthorize("permitAll()")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        try {
            User savedUser = userService.addUser(user); // Aquí se guarda y se envía email
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            // Manejo simple de errores, puedes mejorar según necesidad
            return ResponseEntity.badRequest().build();
        }
    }

    // Para eliminar un usuario por ID
    @DeleteMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        boolean isRemoved = userService.deleteUser(id);
        if (isRemoved) {
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found si el usuario no existe
        }
    }

    @PostMapping("/login")
    @PreAuthorize("permitAll()")
    public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOpt = userService.login(loginRequest.getEmail(), loginRequest.getPassword());
        return userOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(401).build());
    }
}
