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

    // --- 2. Department APIs ---
    @PostMapping("/departments")
    public ResponseEntity<Department> createDepartment(@RequestBody DepartmentDTO dto) {
        return ResponseEntity.ok(service.createDepartment(dto));
    }

    // --- 3. Doctor APIs ---
    @PostMapping("/doctors")
    public ResponseEntity<Doctor> createDoctor(@RequestBody DoctorDTO dto) {
        return ResponseEntity.ok(service.createDoctor(dto));
    }

    @GetMapping("/doctors/hospital/{hospitalId}")
    public ResponseEntity<List<Doctor>> getDoctorsByHospital(@PathVariable Long hospitalId) {
        return ResponseEntity.ok(service.getDoctorsByHospital(hospitalId));
    }

    // --- 4. Patient APIs ---
    @PostMapping("/patients")
    public ResponseEntity<Patient> registerPatient(@RequestBody PatientDTO dto) {
        return ResponseEntity.ok(service.registerPatient(dto));
    }

    // --- 5. Receptionist APIs ---
    @PostMapping("/receptionists")
    public ResponseEntity<Receptionist> createReceptionist(@RequestBody ReceptionistDTO dto) {
        return ResponseEntity.ok(service.createReceptionist(dto));
    }

    // --- 6. Appointment APIs ---
    @PostMapping("/appointments")
    public ResponseEntity<Appointment> bookAppointment(@RequestBody AppointmentDTO dto) {
        return ResponseEntity.ok(service.bookAppointment(dto));
    }

    // --- 7. Medical Record APIs ---
    @PostMapping("/medical-records")
    public ResponseEntity<MedicalRecord> createMedicalRecord(@RequestBody MedicalRecordDTO dto) {
        return ResponseEntity.ok(service.createMedicalRecord(dto));
    }
}