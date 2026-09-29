package com.killbridge.exception;

public class SelfConnectionException extends RuntimeException {

    public SelfConnectionException(String message) {
        super(message);
    }
}