package com.anuj.sihhospital.Service;

import com.anuj.sihhospital.Dto.MedicalRecordDTO;
import com.anuj.sihhospital.Entity.Enum.PaymentStatus;
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
