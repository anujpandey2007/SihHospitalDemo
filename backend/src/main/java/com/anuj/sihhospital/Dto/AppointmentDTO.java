package com.anuj.sihhospital.Dto;

import java.time.LocalDateTime;

public class AppointmentDTO {
    public Long patientId;
    public Long doctorId;
    public Long hospitalId;
    public Long receptionistId;
    public LocalDateTime appointmentDate;
}
