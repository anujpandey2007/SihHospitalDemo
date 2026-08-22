package com.anuj.MediLink.Service;

import com.anuj.MediLink.Dto.*;
import com.anuj.MediLink.Entity.*;

import java.util.List;

public interface HospitalService {
    Hospital createHospital(HospitalDTO dto);

    List<Hospital> getAllHospitals();

    Hospital getHospitalById(Long id);

    Hospital updateHospital(Long id, HospitalDTO dto);

    void deleteHospital(Long id);

    Department createDepartment(DepartmentDTO dto);

    Doctor createDoctor(DoctorDTO dto);

    List<Doctor> getDoctorsByHospital(Long hospitalId);

    Patient registerPatient(PatientDTO dto);

    List<Patient> getPatientsByHospital(Long hospitalId);

    Receptionist createReceptionist(ReceptionistDTO dto);

    Appointment bookAppointment(AppointmentDTO dto);

    MedicalRecord createMedicalRecord(MedicalRecordDTO dto);
}
