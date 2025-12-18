package com.finalproject.breakingbook.model;

import jakarta.persistence.*;

@Entity
@Table(name = "move")
public class Move {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idmove;

    private String name;
    private String photo;
    private String video;
    private String tutorial;
    private String history;
    private String origin;
    private String type;

    @ManyToOne
    @JoinColumn(name = "fk_user")
    private User user;

    public Move() {}

    public Move(Long idmove, String name, String photo, String video, String tutorial,
                String history, String origin, String type, User user) {
        this.idmove = idmove;
        this.name = name;
        this.photo = photo;
        this.video = video;
        this.tutorial = tutorial;
        this.history = history;
        this.origin = origin;
        this.type = type;
        this.user = user;
    }

    public Long getIdmove() {
        return idmove;
    }

    public void setIdmove(Long idmove) {
        this.idmove = idmove;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public String getTutorial() {
        return tutorial;
    }

    public void setTutorial(String tutorial) {
        this.tutorial = tutorial;
    }

    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
