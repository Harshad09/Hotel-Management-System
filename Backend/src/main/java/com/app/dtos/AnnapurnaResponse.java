package com.app.dtos;

import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(value = Include.NON_NULL)
public class AnnapurnaResponse {
	public static enum Status {
		SUCCESS, FAIL, ERROR
	}
	
	private Status status;
	private Object data;
	private String message;
	
	// success ctor
	public AnnapurnaResponse(Status status, Object data) {
		this.status = status;
		this.data = data;
	}
	
	// error ctor
	public AnnapurnaResponse(Status status, String message) {
		this.status = status;
		this.message = message;
	}
	
	// full ctor
	public AnnapurnaResponse(Status status, Object data, String message) {
		this.status = status;
		this.data = data;
		this.message = message;
	}

	// getters and setters
	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	public static ResponseEntity<AnnapurnaResponse> success() {
		return ResponseEntity.ok(new AnnapurnaResponse(Status.SUCCESS, null));
	}
	
	public static ResponseEntity<AnnapurnaResponse> success(Object data) {
		return ResponseEntity.ok(new AnnapurnaResponse(Status.SUCCESS, data));
	}
	
	public static ResponseEntity<AnnapurnaResponse> success(String message, Object data) {
		return ResponseEntity.ok(new AnnapurnaResponse(Status.SUCCESS, data, message));
	}
	
	public static ResponseEntity<AnnapurnaResponse> fail(Object data) {
		return ResponseEntity.ok(new AnnapurnaResponse(Status.FAIL, data));
	}

	public static ResponseEntity<AnnapurnaResponse> fail(String message, Object data) {
		return ResponseEntity.ok(new AnnapurnaResponse(Status.FAIL, data, message));
	}
	
	public static ResponseEntity<AnnapurnaResponse> error(String message) {
		return ResponseEntity.ok(new AnnapurnaResponse(Status.ERROR, message));
	}

	public static ResponseEntity<AnnapurnaResponse> error(String message, Object data) {
		return ResponseEntity.ok(new AnnapurnaResponse(Status.ERROR, data, message));
	}
	
}
