package com.anuj.Vita_Link.Controller;

import com.anuj.Vita_Link.Dto.ReceptionistDTO;
import com.anuj.Vita_Link.Service.ReceptionistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/receptionists")
public class ReceptionistController {

    private final ReceptionistService receptionistService;

    @Autowired
    public ReceptionistController(ReceptionistService receptionistService) {
        this.receptionistService = receptionistService;
    }

    // CREATE: POST /api/v1/receptionists
    @PostMapping
    public ResponseEntity<ReceptionistDTO> createReceptionist(@RequestBody ReceptionistDTO receptionistDTO) {
        ReceptionistDTO createdReceptionist = receptionistService.createReceptionist(receptionistDTO);
        return new ResponseEntity<>(createdReceptionist, HttpStatus.CREATED);
    }

    // READ ALL: GET /api/v1/receptionists
    @GetMapping
    public ResponseEntity<List<ReceptionistDTO>> getAllReceptionists() {
        return ResponseEntity.ok(receptionistService.getAllReceptionists());
    }

    // READ BY ID: GET /api/v1/receptionists/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ReceptionistDTO> getReceptionistById(@PathVariable Long id) {
        return ResponseEntity.ok(receptionistService.getReceptionistById(id));
    }

    // READ BY HOSPITAL: GET /api/v1/receptionists/hospital/{hospitalId}
    @GetMapping("/hospital/{hospitalId}")
    public ResponseEntity<List<ReceptionistDTO>> getReceptionistsByHospital(@PathVariable Long hospitalId) {
        return ResponseEntity.ok(receptionistService.getReceptionistsByHospital(hospitalId));
    }

    // UPDATE: PUT /api/v1/receptionists/{id}
    @PutMapping("/{id}")
    public ResponseEntity<ReceptionistDTO> updateReceptionist(
            @PathVariable Long id,
            @RequestBody ReceptionistDTO receptionistDTO) {
        return ResponseEntity.ok(receptionistService.updateReceptionist(id, receptionistDTO));
    }

    // DELETE: DELETE /api/v1/receptionists/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReceptionist(@PathVariable Long id) {
        receptionistService.deleteReceptionist(id);
        return ResponseEntity.ok("Receptionist record deleted successfully for ID: " + id);
    }
}