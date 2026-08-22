package com.anuj.MediLink.Controller;

import com.anuj.MediLink.Dto.MedicalRecordDTO;
import com.anuj.MediLink.Entity.Enum.PaymentStatus;
import com.anuj.MediLink.Service.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/medical-records")
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    @Autowired
    public MedicalRecordController(MedicalRecordService medicalRecordService) {
        this.medicalRecordService = medicalRecordService;
    }

    // CREATE: POST /api/v1/medical-records
    @PostMapping
    public ResponseEntity<MedicalRecordDTO> createMedicalRecord(@RequestBody MedicalRecordDTO medicalRecordDTO) {
        MedicalRecordDTO createdRecord = medicalRecordService.createMedicalRecord(medicalRecordDTO);
        return new ResponseEntity<>(createdRecord, HttpStatus.CREATED);
    }

    // READ ALL: GET /api/v1/medical-records
    @GetMapping
    public ResponseEntity<List<MedicalRecordDTO>> getAllMedicalRecords() {
        return ResponseEntity.ok(medicalRecordService.getAllMedicalRecords());
    }

    // READ BY ID: GET /api/v1/medical-records/{id}
    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecordDTO> getMedicalRecordById(@PathVariable Long id) {
        return ResponseEntity.ok(medicalRecordService.getMedicalRecordById(id));
    }

    // READ BY APPOINTMENT ID: GET /api/v1/medical-records/appointment/{appointmentId}
    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<MedicalRecordDTO> getMedicalRecordByAppointmentId(@PathVariable Long appointmentId) {
        return ResponseEntity.ok(medicalRecordService.getMedicalRecordByAppointmentId(appointmentId));
    }

    // UPDATE FULL RECORD: PUT /api/v1/medical-records/{id}
    @PutMapping("/{id}")
    public ResponseEntity<MedicalRecordDTO> updateMedicalRecord(
            @PathVariable Long id,
            @RequestBody MedicalRecordDTO medicalRecordDTO) {
        return ResponseEntity.ok(medicalRecordService.updateMedicalRecord(id, medicalRecordDTO));
    }

    // UPDATE PAYMENT STATUS ONLY: PATCH /api/v1/medical-records/{id}/payment-status
    @PatchMapping("/{id}/payment-status")
    public ResponseEntity<MedicalRecordDTO> updatePaymentStatus(
            @PathVariable Long id,
            @RequestParam PaymentStatus status) {
        return ResponseEntity.ok(medicalRecordService.updatePaymentStatus(id, status));
    }

    // DELETE: DELETE /api/v1/medical-records/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMedicalRecord(@PathVariable Long id) {
        medicalRecordService.deleteMedicalRecord(id);
        return ResponseEntity.ok("Medical record deleted successfully for ID: " + id);
    }
}
