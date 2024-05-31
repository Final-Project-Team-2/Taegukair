package org.taegukair.project.flight.dto;

import org.springframework.http.HttpStatus;

public class ResponseDTO {
    private HttpStatus status;
    private String message;
    private Object data;

    public ResponseDTO(String message, Object data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    // Getters and setters
    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
