package com.anuj.sihhospital.Service.impl;

import com.anuj.sihhospital.Dto.MedicalRecordDTO;
import com.anuj.sihhospital.Entity.Appointment;
import com.anuj.sihhospital.Entity.Enum.PaymentStatus;
import com.anuj.sihhospital.Entity.MedicalRecord;
import com.anuj.sihhospital.Repository.AppointmentRepo;
import com.anuj.sihhospital.Repository.MedicalRecordRepo;
import com.anuj.sihhospital.Service.MedicalRecordService;
import com.anuj.sihhospital.Exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
