package com.finalproject.breakingbook.dto;

import java.util.List;

public class RoundCreateRequest {
    private Long userId;
    private String name;
    private List<Long> moveIds;

    public RoundCreateRequest() {}

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Long> getMoveIds() {
        return moveIds;
    }

    public void setMoveIds(List<Long> moveIds) {
        this.moveIds = moveIds;
    }
}
