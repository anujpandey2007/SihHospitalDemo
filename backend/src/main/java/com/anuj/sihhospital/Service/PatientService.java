package com.anuj.sihhospital.Service;

import com.anuj.sihhospital.Dto.PatientDTO;

import java.util.List;

public interface PatientService {
    void deletePatient(Long id);

    PatientDTO updatePatient(Long id, PatientDTO patientDTO);

    PatientDTO getPatientById(Long id);

    List<PatientDTO> getAllPatients();

    PatientDTO createPatient(PatientDTO patientDTO);
}
