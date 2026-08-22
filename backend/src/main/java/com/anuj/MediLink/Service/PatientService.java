package com.anuj.MediLink.Service;

import com.anuj.MediLink.Dto.PatientDTO;

import java.util.List;

public interface PatientService {
    void deletePatient(Long id);

    PatientDTO updatePatient(Long id, PatientDTO patientDTO);

    PatientDTO getPatientById(Long id);

    List<PatientDTO> getPatientsByHospital(Long hospitalId);

    List<PatientDTO> getAllPatients();

    PatientDTO createPatient(PatientDTO patientDTO);
}
