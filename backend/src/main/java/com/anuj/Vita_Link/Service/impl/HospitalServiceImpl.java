package com.anuj.Vita_Link.Service.impl;

import com.anuj.Vita_Link.Dto.*;
import com.anuj.Vita_Link.Entity.*;
import com.anuj.Vita_Link.Entity.Enum.AppointmentStatus;
import com.anuj.Vita_Link.Repository.*;
import com.anuj.Vita_Link.Service.HospitalService;
import com.anuj.Vita_Link.Exception.ResourceNotFoundException;
import com.anuj.Vita_Link.Exception.BadRequestException;
import com.anuj.Vita_Link.Exception.ResourceAlreadyExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HospitalServiceImpl implements HospitalService {
    @Autowired
    private HospitalRepo hospitalRepository;
    @Autowired
    private DepartmentRepo departmentRepository;
    @Autowired
    private DoctorRepo doctorRepository;
    @Autowired
    private PatientRepo patientRepository;
    @Autowired
    private ReceptionistRepo receptionistRepository;
    @Autowired
    private AppointmentRepo appointmentRepository;
    @Autowired
    private MedicalRecordRepo medicalRecordRepository;

    // --- Hospital ---
    public Hospital createHospital(HospitalDTO dto) {
        if (dto.name == null || dto.name.trim().isEmpty()) {
            throw new BadRequestException("Hospital name cannot be empty");
        }
        if (dto.address == null || dto.address.trim().isEmpty()) {
            throw new BadRequestException("Hospital address cannot be empty");
        }
        if (hospitalRepository.existsByName(dto.name)) {
            throw new ResourceAlreadyExistsException("Hospital", "name", dto.name);
        }

        Hospital h = new Hospital();
        h.setName(dto.name);
        h.setType(dto.type);
        h.setAddress(dto.address);
        return hospitalRepository.save(h);
    }
    public List<Hospital> getAllHospitals() { return hospitalRepository.findAll(); }

    public Hospital getHospitalById(Long id) {
        return hospitalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", id));
    }

    public Hospital updateHospital(Long id, HospitalDTO dto) {
        Hospital h = hospitalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", id));
        if (dto.name != null && !dto.name.trim().isEmpty()) {
            h.setName(dto.name);
        }
        if (dto.type != null) {
            h.setType(dto.type);
        }
        if (dto.address != null && !dto.address.trim().isEmpty()) {
            h.setAddress(dto.address);
        }
        return hospitalRepository.save(h);
    }

    public void deleteHospital(Long id) {
        if (!hospitalRepository.existsById(id)) {
            throw new ResourceNotFoundException("Hospital", "id", id);
        }
        hospitalRepository.deleteById(id);
    }

    // --- Department ---
    public Department createDepartment(DepartmentDTO dto) {
        Hospital hospital = hospitalRepository.findById(dto.hospitalId)
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", dto.hospitalId));
        Department d = new Department();
        d.setName(dto.name);
        d.setHospital(hospital);
        return departmentRepository.save(d);
    }

    // --- Doctor ---
    public Doctor createDoctor(DoctorDTO dto) {
        Hospital hospital = hospitalRepository.findById(dto.hospitalId)
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", dto.hospitalId));
        Department dept = departmentRepository.findById(dto.deptId)
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", dto.deptId));
        Doctor doc = new Doctor();
        doc.setName(dto.name);
        doc.setSpecialization(dto.specialization);
        doc.setFee(dto.fee);
        doc.setHospital(hospital);
        doc.setDepartment(dept);
        return doctorRepository.save(doc);
    }
    public List<Doctor> getDoctorsByHospital(Long hospitalId) {
        return doctorRepository.findByHospitalId(hospitalId);
    }

    // --- Patient ---
    public Patient registerPatient(PatientDTO dto) {
        Patient p = new Patient();
        p.setName(dto.name);
        p.setAge(dto.age);
        p.setGender(dto.gender);
        p.setPhone(dto.phone);
        p.setBloodGroup(dto.bloodGroup);
        return patientRepository.save(p);
    }
    public List<Patient> getPatientsByHospital(Long hospitalId) {
        if (!hospitalRepository.existsById(hospitalId)) {
            throw new ResourceNotFoundException("Hospital", "id", hospitalId);
        }
        return patientRepository.findByHospitalId(hospitalId);
    }

    // --- Receptionist ---
    public  Receptionist createReceptionist(ReceptionistDTO dto) {
        Hospital hospital = hospitalRepository.findById(dto.hospitalId)
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", dto.hospitalId));
        Receptionist r = new Receptionist();
        r.setName(dto.name);
        r.setShift(dto.shift);
        r.setHospital(hospital);
        return receptionistRepository.save(r);
    }

    // --- Appointment ---
    public Appointment bookAppointment(AppointmentDTO dto) {
        Patient patient = patientRepository.findById(dto.patientId)
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", dto.patientId));
        Doctor doctor = doctorRepository.findById(dto.doctorId)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", dto.doctorId));
        Hospital hospital = hospitalRepository.findById(dto.hospitalId)
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", dto.hospitalId));

        Appointment app = new Appointment();
        app.setPatient(patient);
        app.setDoctor(doctor);
        app.setHospital(hospital);
        app.setAppointmentDate(dto.appointmentDate);
        app.setStatus(AppointmentStatus.SCHEDULED);

        if (dto.receptionistId != null) {
            Receptionist receptionist = receptionistRepository.findById(dto.receptionistId).orElse(null);
            app.setReceptionist(receptionist);
        }

        return appointmentRepository.save(app);
    }

    // --- Medical Record ---
    public MedicalRecord createMedicalRecord(MedicalRecordDTO dto) {
        Appointment appointment = appointmentRepository.findById(dto.appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", dto.appointmentId));

        appointment.setStatus(AppointmentStatus.COMPLETED);
        appointmentRepository.save(appointment);

        MedicalRecord record = new MedicalRecord();
        record.setAppointment(appointment);
        record.setDiagnosis(dto.diagnosis);
        record.setPrescription(dto.prescription);
        record.setTotalBill(dto.totalBill);
        record.setPaymentStatus(dto.paymentStatus);

        return medicalRecordRepository.save(record);
    }
}

