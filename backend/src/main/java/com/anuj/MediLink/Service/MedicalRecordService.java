package com.anuj.MediLink.Service;

import com.anuj.MediLink.Dto.MedicalRecordDTO;
import com.anuj.MediLink.Entity.Enum.PaymentStatus;
import java.util.List;

public interface MedicalRecordService {
    MedicalRecordDTO createMedicalRecord(MedicalRecordDTO medicalRecordDTO);

    List<MedicalRecordDTO> getAllMedicalRecords();

    MedicalRecordDTO getMedicalRecordById(Long id);

    MedicalRecordDTO getMedicalRecordByAppointmentId(Long appointmentId);

    MedicalRecordDTO updateMedicalRecord(Long id, MedicalRecordDTO medicalRecordDTO);

    MedicalRecordDTO updatePaymentStatus(Long id, PaymentStatus status);

    void deleteMedicalRecord(Long id);
}
