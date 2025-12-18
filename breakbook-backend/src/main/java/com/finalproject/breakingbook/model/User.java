package com.finalproject.breakingbook.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "iduser")
    private Long iduser;

    private String name;
    private String email;
    private String password;
    private String role;

    public User() {}

    public User(Long iduser, String name, String email, String password, String role) {
        this.iduser = iduser;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public Long getIduser() {
        return iduser;
    }

    public void setIduser(Long iduser) {
        this.iduser = iduser;
    }


    public Long getId() {
        return iduser;
    }

    public void setId(Long id) {
        this.iduser = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
