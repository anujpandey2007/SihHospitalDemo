package com.anuj.sihhospital.Dto;

import com.anuj.sihhospital.Entity.Enum.AppointmentStatus;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class AppointmentDTO {
    public Long id;
    public Long patientId;
    public AppointmentStatus status;
    public Long doctorId;
    public Long hospitalId;
    public Long receptionistId;
    public LocalDateTime appointmentDate;


}
