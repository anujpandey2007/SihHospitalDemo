package com.anuj.sihhospital.Controller;

import com.anuj.sihhospital.Dto.*;
import com.anuj.sihhospital.Entity.*;
import com.anuj.sihhospital.Service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class HospitalController {

    @Autowired
    private HospitalService service;

    // --- 1. Hospital APIs ---
    @PostMapping("/hospitals")
    public ResponseEntity<Hospital> createHospital(@RequestBody HospitalDTO dto) {
        return ResponseEntity.ok(service.createHospital(dto));
    }

    @GetMapping("/hospitals")
    public ResponseEntity<List<Hospital>> getAllHospitals() {
        return ResponseEntity.ok(service.getAllHospitals());
    }

    // Redundant endpoints removed to fix ambiguous mapping
}