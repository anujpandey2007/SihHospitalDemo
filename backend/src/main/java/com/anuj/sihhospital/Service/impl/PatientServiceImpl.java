package com.anuj.sihhospital.Service.impl;

import com.anuj.sihhospital.Dto.PatientDTO;
import com.anuj.sihhospital.Entity.Patient;
import com.anuj.sihhospital.Repository.PatientRepo;
import com.anuj.sihhospital.Service.PatientService;
import com.anuj.sihhospital.Exception.ResourceNotFoundException;
import com.anuj.sihhospital.Exception.ResourceAlreadyExistsException;
import com.anuj.sihhospital.Exception.BadRequestException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientService {

    private final PatientRepo patientRepository;



    // CREATE
    public PatientDTO createPatient(PatientDTO dto) {
        if (dto.getName() == null || dto.getName().trim().isEmpty()) {
            throw new BadRequestException("Patient name cannot be empty");
        }
        if (dto.getPhone() != null && patientRepository.existsByPhone(dto.getPhone())) {
            throw new ResourceAlreadyExistsException("Patient", "phone", dto.getPhone());
        }

        Patient patient = convertToEntity(dto);
        Patient savedPatient = patientRepository.save(patient);
        return convertToDTO(savedPatient);
    }

    // READ ALL
    public List<PatientDTO> getAllPatients() {
        return patientRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // READ BY ID
    public PatientDTO getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", id));
        return convertToDTO(patient);
    }

    // UPDATE
    public PatientDTO updatePatient(Long id, PatientDTO dto) {
        if (dto.getName() == null || dto.getName().trim().isEmpty()) {
            throw new BadRequestException("Patient name cannot be empty");
        }

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", id));

        patient.setName(dto.getName());
        patient.setAge(dto.getAge());
        patient.setGender(dto.getGender());
        patient.setPhone(dto.getPhone());
        patient.setBloodGroup(dto.getBloodGroup());

        Patient updatedPatient = patientRepository.save(patient);
        return convertToDTO(updatedPatient);
    }

    // DELETE
    public void deletePatient(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new ResourceNotFoundException("Patient", "id", id);
        }
        patientRepository.deleteById(id);
    }

    // Helper Mappers
    private PatientDTO convertToDTO(Patient patient) {
        PatientDTO dto = new PatientDTO();
        dto.setId(patient.getId());
        dto.setName(patient.getName());
        dto.getAge();
        dto.setAge(patient.getAge());
        dto.setGender(patient.getGender());
        dto.setPhone(patient.getPhone());
        dto.setBloodGroup(patient.getBloodGroup());
        return dto;
    }

    private Patient convertToEntity(PatientDTO dto) {
        Patient patient = new Patient();
        patient.setName(dto.getName());
        patient.setAge(dto.getAge());
        patient.setGender(dto.getGender());
        patient.setPhone(dto.getPhone());
        patient.setBloodGroup(dto.getBloodGroup());
        return patient;
    }
}
