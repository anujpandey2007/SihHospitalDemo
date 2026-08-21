package com.anuj.Vita_Link.Controller;

import com.anuj.Vita_Link.Dto.PatientDTO;
import com.anuj.Vita_Link.Service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/patients")
public class PatientController {

    private final PatientService patientService;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    // CREATE: POST /api/v1/patients
    @PostMapping
    public ResponseEntity<PatientDTO> createPatient(@RequestBody PatientDTO patientDTO) {
        PatientDTO createdPatient = patientService.createPatient(patientDTO);
        System.out.println(createdPatient);
        return new ResponseEntity<>(createdPatient, HttpStatus.CREATED);
    }

    // READ ALL: GET /api/v1/patients
    @GetMapping
    public ResponseEntity<List<PatientDTO>> getAllPatients() {
        List<PatientDTO> patients = patientService.getAllPatients();
        return ResponseEntity.ok(patients);
    }

    // READ BY ID: GET /api/v1/patients/{id}
    @GetMapping("/{id}")
    public ResponseEntity<PatientDTO> getPatientById(@PathVariable Long id) {
        PatientDTO patient = patientService.getPatientById(id);
        return ResponseEntity.ok(patient);
    }

    // READ BY HOSPITAL: GET /api/v1/patients/hospital/{hospitalId}
    @GetMapping("/hospital/{hospitalId}")
    public ResponseEntity<List<PatientDTO>> getPatientsByHospital(@PathVariable Long hospitalId) {
        return ResponseEntity.ok(patientService.getPatientsByHospital(hospitalId));
    }

    // UPDATE: PUT /api/v1/patients/{id}
    @PutMapping("/{id}")
    public ResponseEntity<PatientDTO> updatePatient(
            @PathVariable Long id,
            @RequestBody PatientDTO patientDTO) {
        PatientDTO updatedPatient = patientService.updatePatient(id, patientDTO);
        return ResponseEntity.ok(updatedPatient);
    }

    // DELETE: DELETE /api/v1/patients/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.ok("Patient deleted successfully with ID: " + id);
    }
}
