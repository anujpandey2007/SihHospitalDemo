package com.anuj.sihhospital.Service;

import com.anuj.sihhospital.Dto.*;
import com.anuj.sihhospital.Entity.*;
import org.jspecify.annotations.Nullable;

import java.util.List;

public interface HospitalService {
    @Nullable Hospital createHospital(HospitalDTO dto);

    @Nullable List<Hospital> getAllHospitals();

    @Nullable Department createDepartment(DepartmentDTO dto);

    @Nullable Doctor createDoctor(DoctorDTO dto);

    @Nullable List<Doctor> getDoctorsByHospital(Long hospitalId);

    @Nullable Patient registerPatient(PatientDTO dto);

    @Nullable Receptionist createReceptionist(ReceptionistDTO dto);

    @Nullable Appointment bookAppointment(AppointmentDTO dto);

    @Nullable MedicalRecord createMedicalRecord(MedicalRecordDTO dto);
}
