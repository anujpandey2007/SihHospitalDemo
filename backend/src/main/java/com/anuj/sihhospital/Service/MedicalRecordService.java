package com.anuj.sihhospital.Service;

import com.anuj.sihhospital.Dto.MedicalRecordDTO;
import com.anuj.sihhospital.Entity.Enum.PaymentStatus;
import org.jspecify.annotations.Nullable;

import java.util.List;

public interface MedicalRecordService {
    MedicalRecordDTO createMedicalRecord(MedicalRecordDTO medicalRecordDTO);

    @Nullable List<MedicalRecordDTO> getAllMedicalRecords();

    @Nullable MedicalRecordDTO getMedicalRecordById(Long id);

    @Nullable MedicalRecordDTO getMedicalRecordByAppointmentId(Long appointmentId);

    @Nullable MedicalRecordDTO updateMedicalRecord(Long id, MedicalRecordDTO medicalRecordDTO);

    @Nullable MedicalRecordDTO updatePaymentStatus(Long id, PaymentStatus status);

    void deleteMedicalRecord(Long id);
}
