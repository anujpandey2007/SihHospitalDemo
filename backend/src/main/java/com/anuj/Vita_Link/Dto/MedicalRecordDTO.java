package com.anuj.Vita_Link.Dto;

import com.anuj.Vita_Link.Entity.Enum.PaymentStatus;
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
