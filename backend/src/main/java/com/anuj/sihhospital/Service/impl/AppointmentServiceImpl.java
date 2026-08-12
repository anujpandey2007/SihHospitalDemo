package com.anuj.sihhospital.Service.impl;

import com.anuj.sihhospital.Dto.AppointmentDTO;
import com.anuj.sihhospital.Entity.*;
import com.anuj.sihhospital.Entity.Enum.AppointmentStatus;
import com.anuj.sihhospital.Repository.*;
import com.anuj.sihhospital.Service.AppointmentService;
import com.anuj.sihhospital.Exception.ResourceNotFoundException;
import com.anuj.sihhospital.Exception.BadRequestException;
import com.anuj.sihhospital.Exception.OperationNotAllowedException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepo appointmentRepo;
    private final PatientRepo patientRepository;
    private final DoctorRepo doctorRepository;
    private final HospitalRepo hospitalRepository;
    private final ReceptionistRepo receptionistRepository;


    // CREATE (Book Appointment)
    public AppointmentDTO createAppointment(AppointmentDTO dto) {
        if (dto.getAppointmentDate() == null) {
            throw new BadRequestException("Appointment date cannot be null");
        }

        Appointment appointment = convertToEntity(dto);
        if (appointment.getStatus() == null) {
            appointment.setStatus(AppointmentStatus.SCHEDULED);
        }
        Appointment savedAppointment = appointmentRepo.save(appointment);
        return convertToDTO(savedAppointment);
    }

    // READ ALL
    public List<AppointmentDTO> getAllAppointments() {
        return appointmentRepo.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // READ BY ID
    public AppointmentDTO getAppointmentById(Long id) {
        Appointment appointment = appointmentRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));
        return convertToDTO(appointment);
    }

    // READ BY PATIENT ID (Patient history)
    public List<AppointmentDTO> getAppointmentsByPatient(Long patientId) {
        return appointmentRepo.findByPatientId(patientId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // READ BY DOCTOR ID (Doctor schedule)
    public List<AppointmentDTO> getAppointmentsByDoctor(Long doctorId) {
        return appointmentRepo.findByDoctorId(doctorId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // UPDATE STATUS (e.g. COMPLETED or CANCELLED)
    public AppointmentDTO updateAppointmentStatus(Long id, AppointmentStatus status) {
        Appointment appointment = appointmentRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));

        if (appointment.getStatus() == AppointmentStatus.CANCELLED || appointment.getStatus() == AppointmentStatus.COMPLETED) {
            throw new OperationNotAllowedException("Cannot change status of an appointment that is already " + appointment.getStatus());
        }

        appointment.setStatus(status);
        Appointment updatedAppointment = appointmentRepo.save(appointment);
        return convertToDTO(updatedAppointment);
    }

    // FULL UPDATE
    public AppointmentDTO updateAppointment(Long id, AppointmentDTO dto) {
        Appointment appointment = appointmentRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", id));

        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", dto.getPatientId()));
        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", dto.getDoctorId()));
        Hospital hospital = hospitalRepository.findById(dto.getHospitalId())
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", dto.getHospitalId()));

        appointment.setAppointmentDate(dto.getAppointmentDate());
        appointment.setStatus(dto.getStatus());
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setHospital(hospital);

        if (dto.getReceptionistId() != null) {
            Receptionist receptionist = receptionistRepository.findById(dto.getReceptionistId())
                    .orElseThrow(() -> new ResourceNotFoundException("Receptionist", "id", dto.getReceptionistId()));
            appointment.setReceptionist(receptionist);
        }

        Appointment updatedAppointment = appointmentRepo.save(appointment);
        return convertToDTO(updatedAppointment);
    }

    // DELETE (Cancel/Remove record)
    public void deleteAppointment(Long id) {
        if (!appointmentRepo.existsById(id)) {
            throw new ResourceNotFoundException("Appointment", "id", id);
        }
        appointmentRepo.deleteById(id);
    }

    // Helper Mappers
    private AppointmentDTO convertToDTO(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(appointment.getId());
        dto.setAppointmentDate(appointment.getAppointmentDate());
        dto.setStatus(appointment.getStatus());

        if (appointment.getPatient() != null) {
            dto.setPatientId(appointment.getPatient().getId());
        }
        if (appointment.getDoctor() != null) {
            dto.setDoctorId(appointment.getDoctor().getId());
        }
        if (appointment.getHospital() != null) {
            dto.setHospitalId(appointment.getHospital().getId());
        }
        if (appointment.getReceptionist() != null) {
            dto.setReceptionistId(appointment.getReceptionist().getId());
        }

        return dto;
    }

    private Appointment convertToEntity(AppointmentDTO dto) {
        Appointment appointment = new Appointment();
        appointment.setAppointmentDate(dto.getAppointmentDate());
        appointment.setStatus(dto.getStatus());

        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient", "id", dto.getPatientId()));
        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", dto.getDoctorId()));
        Hospital hospital = hospitalRepository.findById(dto.getHospitalId())
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", dto.getHospitalId()));

        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setHospital(hospital);

        if (dto.getReceptionistId() != null) {
            Receptionist receptionist = receptionistRepository.findById(dto.getReceptionistId())
                    .orElseThrow(() -> new ResourceNotFoundException("Receptionist", "id", dto.getReceptionistId()));
            appointment.setReceptionist(receptionist);
        }

        return appointment;
    }
}



