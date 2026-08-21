package com.anuj.Vita_Link.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
public class OperationNotAllowedException extends RuntimeException {
    
    public OperationNotAllowedException(String message) {
        super(message);
    }
}
