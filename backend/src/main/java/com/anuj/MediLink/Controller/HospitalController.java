package com.anuj.MediLink.Controller;

import com.anuj.MediLink.Dto.*;
import com.anuj.MediLink.Entity.*;
import com.anuj.MediLink.Service.HospitalService;
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

    @GetMapping("/hospitals/{id}")
    public ResponseEntity<Hospital> getHospitalById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getHospitalById(id));
    }

    @PutMapping("/hospitals/{id}")
    public ResponseEntity<Hospital> updateHospital(@PathVariable Long id, @RequestBody HospitalDTO dto) {
        return ResponseEntity.ok(service.updateHospital(id, dto));
    }

    @DeleteMapping("/hospitals/{id}")
    public ResponseEntity<String> deleteHospital(@PathVariable Long id) {
        service.deleteHospital(id);
        return ResponseEntity.ok("Hospital deleted successfully for ID: " + id);
    }
}