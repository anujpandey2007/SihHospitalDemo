package com.anuj.sihhospital.Service;

import com.anuj.sihhospital.Dto.AppointmentDTO;
import com.anuj.sihhospital.Entity.Enum.AppointmentStatus;
import org.jspecify.annotations.Nullable;

import java.util.List;

public interface AppointmentService {
    AppointmentDTO createAppointment(AppointmentDTO appointmentDTO);

    @Nullable List<AppointmentDTO> getAllAppointments();

    @Nullable AppointmentDTO getAppointmentById(Long id);

    @Nullable List<AppointmentDTO> getAppointmentsByPatient(Long patientId);

    @Nullable List<AppointmentDTO> getAppointmentsByDoctor(Long doctorId);

    @Nullable AppointmentDTO updateAppointment(Long id, AppointmentDTO appointmentDTO);

    @Nullable AppointmentDTO updateAppointmentStatus(Long id, AppointmentStatus status);

    void deleteAppointment(Long id);
}
