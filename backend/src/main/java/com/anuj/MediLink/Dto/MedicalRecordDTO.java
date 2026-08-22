package com.anuj.MediLink.Dto;

import com.anuj.MediLink.Entity.Enum.PaymentStatus;
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
