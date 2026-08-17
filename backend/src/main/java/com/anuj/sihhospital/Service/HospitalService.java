package com.anuj.sihhospital.Service;

import com.anuj.sihhospital.Dto.*;
import com.anuj.sihhospital.Entity.*;

import java.util.List;

public interface HospitalService {
    Hospital createHospital(HospitalDTO dto);

    List<Hospital> getAllHospitals();

    Department createDepartment(DepartmentDTO dto);

    Doctor createDoctor(DoctorDTO dto);

    List<Doctor> getDoctorsByHospital(Long hospitalId);

    Patient registerPatient(PatientDTO dto);

    Receptionist createReceptionist(ReceptionistDTO dto);

    Appointment bookAppointment(AppointmentDTO dto);

    MedicalRecord createMedicalRecord(MedicalRecordDTO dto);
}
