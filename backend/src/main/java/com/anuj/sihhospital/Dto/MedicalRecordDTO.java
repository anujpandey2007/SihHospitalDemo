package com.anuj.sihhospital.Dto;

import com.anuj.sihhospital.Entity.Enum.PaymentStatus;
import lombok.Data;

@Data
public class MedicalRecordDTO {
    public Long id;
    public Long appointmentId;
    public String diagnosis;
    public String prescription;
    public Double totalBill;
    public PaymentStatus paymentStatus;
}
