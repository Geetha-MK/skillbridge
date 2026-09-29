package com.killbridge.exception;

import com.killbridge.exception.UserNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.killbridge.exception.SkillNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ErrorResponse handleValidationException(MethodArgumentNotValidException ex) {

	    ErrorResponse errorResponse = new ErrorResponse();

	    errorResponse.setStatus(400);
	    errorResponse.setMessage(
	        ex.getBindingResult()
	          .getFieldError()
	          .getDefaultMessage()
	    );

	    return errorResponse;
	}
	
	@ExceptionHandler(UserNotFoundException.class)
	public String handleUserNotFoundException(UserNotFoundException ex) {
	    return ex.getMessage();
	}
	
	@ExceptionHandler(SelfConnectionException.class)
	public ErrorResponse handleSelfConnectionException(SelfConnectionException ex) {

	    ErrorResponse errorResponse = new ErrorResponse();

	    errorResponse.setStatus(400);
	    errorResponse.setMessage(ex.getMessage());

	    return errorResponse;
	}
	@ExceptionHandler(IllegalStateException.class)
	public ErrorResponse handleIllegalStateException(IllegalStateException ex) {

	    ErrorResponse errorResponse = new ErrorResponse();

	    errorResponse.setStatus(400);
	    errorResponse.setMessage(ex.getMessage());

	    return errorResponse;
	}
	@ExceptionHandler(SkillNotFoundException.class)
	public ErrorResponse handleSkillNotFoundException(SkillNotFoundException ex) {

	    ErrorResponse errorResponse = new ErrorResponse();

	    errorResponse.setStatus(404);
	    errorResponse.setMessage(ex.getMessage());

	    return errorResponse;
	}
}