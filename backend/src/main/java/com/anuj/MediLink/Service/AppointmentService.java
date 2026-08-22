package com.anuj.MediLink.Service;

import com.anuj.MediLink.Dto.AppointmentDTO;
import com.anuj.MediLink.Entity.Enum.AppointmentStatus;

import java.util.List;

public interface AppointmentService {
    AppointmentDTO createAppointment(AppointmentDTO appointmentDTO);

    List<AppointmentDTO> getAllAppointments();

    AppointmentDTO getAppointmentById(Long id);

    List<AppointmentDTO> getAppointmentsByPatient(Long patientId);

    List<AppointmentDTO> getAppointmentsByDoctor(Long doctorId);

    AppointmentDTO updateAppointment(Long id, AppointmentDTO appointmentDTO);

    AppointmentDTO updateAppointmentStatus(Long id, AppointmentStatus status);

    void deleteAppointment(Long id);
}
