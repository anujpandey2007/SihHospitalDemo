package com.anuj.Vita_Link.Service.impl;

import com.anuj.Vita_Link.Dto.MedicalRecordDTO;
import com.anuj.Vita_Link.Entity.Appointment;
import com.anuj.Vita_Link.Entity.Enum.PaymentStatus;
import com.anuj.Vita_Link.Entity.MedicalRecord;
import com.anuj.Vita_Link.Repository.AppointmentRepo;
import com.anuj.Vita_Link.Repository.MedicalRecordRepo;
import com.anuj.Vita_Link.Service.MedicalRecordService;
import com.anuj.Vita_Link.Exception.ResourceNotFoundException;
import com.anuj.Vita_Link.Exception.ResourceAlreadyExistsException;
import com.anuj.Vita_Link.Exception.OperationNotAllowedException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicalRecordServiceImpl implements MedicalRecordService {

    private final MedicalRecordRepo medicalRecordRepository;
    private final AppointmentRepo appointmentRepository;



    // CREATE
    public MedicalRecordDTO createMedicalRecord(MedicalRecordDTO dto) {
        if (dto.getAppointmentId() != null && medicalRecordRepository.existsByAppointmentId(dto.getAppointmentId())) {
            throw new ResourceAlreadyExistsException("MedicalRecord", "appointmentId", dto.getAppointmentId());
        }

        MedicalRecord medicalRecord = convertToEntity(dto);
        if (medicalRecord.getPaymentStatus() == null) {
            medicalRecord.setPaymentStatus(PaymentStatus.UNPAID);
        }
        MedicalRecord savedRecord = medicalRecordRepository.save(medicalRecord);
        return convertToDTO(savedRecord);
    }

    // READ ALL
    public List<MedicalRecordDTO> getAllMedicalRecords() {
        return medicalRecordRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // READ BY ID
    public MedicalRecordDTO getMedicalRecordById(Long id) {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MedicalRecord", "id", id));
        return convertToDTO(record);
    }

    // READ BY APPOINTMENT ID
    public MedicalRecordDTO getMedicalRecordByAppointmentId(Long appointmentId) {
        MedicalRecord record = medicalRecordRepository.findByAppointmentId(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("MedicalRecord", "appointmentId", appointmentId));
        return convertToDTO(record);
    }

    // UPDATE RECORD
    public MedicalRecordDTO updateMedicalRecord(Long id, MedicalRecordDTO dto) {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MedicalRecord", "id", id));

        if (record.getPaymentStatus() == PaymentStatus.PAID) {
            throw new OperationNotAllowedException("Cannot modify a medical record after payment is complete (record is sealed).");
        }

        record.setDiagnosis(dto.getDiagnosis());
        record.setPrescription(dto.getPrescription());
        record.setTotalBill(dto.getTotalBill());
        record.setPaymentStatus(dto.getPaymentStatus());

        MedicalRecord updatedRecord = medicalRecordRepository.save(record);
        return convertToDTO(updatedRecord);
    }

    // UPDATE PAYMENT STATUS ONLY (e.g. Patient pays bill)
    public MedicalRecordDTO updatePaymentStatus(Long id, PaymentStatus status) {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("MedicalRecord", "id", id));

        if (record.getPaymentStatus() == PaymentStatus.PAID) {
            throw new OperationNotAllowedException("Payment is already processed for this medical record.");
        }

        record.setPaymentStatus(status);
        MedicalRecord updatedRecord = medicalRecordRepository.save(record);
        return convertToDTO(updatedRecord);
    }

    // DELETE
    public void deleteMedicalRecord(Long id) {
        if (!medicalRecordRepository.existsById(id)) {
            throw new ResourceNotFoundException("MedicalRecord", "id", id);
        }
        medicalRecordRepository.deleteById(id);
    }

    // Helper Mappers
    private MedicalRecordDTO convertToDTO(MedicalRecord record) {
        MedicalRecordDTO dto = new MedicalRecordDTO();
        dto.setId(record.getId());
        dto.setDiagnosis(record.getDiagnosis());
        dto.setPrescription(record.getPrescription());
        dto.setTotalBill(record.getTotalBill());
        dto.setPaymentStatus(record.getPaymentStatus());

        if (record.getAppointment() != null) {
            dto.setAppointmentId(record.getAppointment().getId());
        }
        return dto;
    }

    private MedicalRecord convertToEntity(MedicalRecordDTO dto) {
        MedicalRecord record = new MedicalRecord();
        record.setDiagnosis(dto.getDiagnosis());
        record.setPrescription(dto.getPrescription());
        record.setTotalBill(dto.getTotalBill());
        record.setPaymentStatus(dto.getPaymentStatus());

        Appointment appointment = appointmentRepository.findById(dto.getAppointmentId())
                .orElseThrow(() -> new ResourceNotFoundException("Appointment", "id", dto.getAppointmentId()));

        record.setAppointment(appointment);
        return record;
    }
}
