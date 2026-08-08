package com.anuj.sihhospital.Dto;

import com.anuj.sihhospital.Entity.Enum.PaymentStatus;

public class MedicalRecordDTO {
    public Long appointmentId;
    public String diagnosis;
    public String prescription;
    public Double totalBill;
    public PaymentStatus paymentStatus;
}
