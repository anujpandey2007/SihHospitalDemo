package com.anuj.sihhospital.Service.impl;

import com.anuj.sihhospital.Dto.DoctorDTO;
import com.anuj.sihhospital.Entity.Department;
import com.anuj.sihhospital.Entity.Doctor;
import com.anuj.sihhospital.Entity.Hospital;
import com.anuj.sihhospital.Repository.DepartmentRepo;
import com.anuj.sihhospital.Repository.DoctorRepo;
import com.anuj.sihhospital.Repository.HospitalRepo;
import com.anuj.sihhospital.Service.DoctorService;
import com.anuj.sihhospital.Exception.ResourceNotFoundException;
import com.anuj.sihhospital.Exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepo doctorRepository;
    private final HospitalRepo hospitalRepository;
    private final DepartmentRepo departmentRepository;



    // CREATE
    public DoctorDTO createDoctor(DoctorDTO dto) {
        validateDoctorData(dto);

        Doctor doctor = convertToEntity(dto);
        Doctor savedDoctor = doctorRepository.save(doctor);
        return convertToDTO(savedDoctor);
    }

    // READ ALL
    public List<DoctorDTO> getAllDoctors() {
        return doctorRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // READ BY ID
    public DoctorDTO getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", id));
        return convertToDTO(doctor);
    }

    // READ BY HOSPITAL ID (Useful real-world query)
    public List<DoctorDTO> getDoctorsByHospital(Long hospitalId) {
        return doctorRepository.findByHospitalId(hospitalId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // UPDATE
    public DoctorDTO updateDoctor(Long id, DoctorDTO dto) {
        validateDoctorData(dto);

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", "id", id));

        Hospital hospital = hospitalRepository.findById(dto.getHospitalId())
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", dto.getHospitalId()));

        Department department = departmentRepository.findById(dto.getDeptId())
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", dto.getDeptId()));

        doctor.setName(dto.getName());
        doctor.setSpecialization(dto.getSpecialization());
        doctor.setFee(dto.getFee());
        doctor.setHospital(hospital);
        doctor.setDepartment(department);

        Doctor updatedDoctor = doctorRepository.save(doctor);
        return convertToDTO(updatedDoctor);
    }

    // DELETE
    public void deleteDoctor(Long id) {
        if (!doctorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Doctor", "id", id);
        }
        doctorRepository.deleteById(id);
    }

    // Helper Mappers
    private void validateDoctorData(DoctorDTO dto) {
        if (dto.getName() == null || dto.getName().trim().isEmpty()) {
            throw new BadRequestException("Doctor name cannot be empty");
        }
        if (dto.getSpecialization() == null || dto.getSpecialization().trim().isEmpty()) {
            throw new BadRequestException("Doctor specialization cannot be empty");
        }
        if (dto.getFee() != null && dto.getFee() < 0) {
            throw new BadRequestException("Consultation fee cannot be negative");
        }
    }

    private DoctorDTO convertToDTO(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();
        dto.setId(doctor.getId());
        dto.setName(doctor.getName());
        dto.setSpecialization(doctor.getSpecialization());
        dto.setFee(doctor.getFee());

        if (doctor.getHospital() != null) {
            dto.setHospitalId(doctor.getHospital().getId());
        }
        if (doctor.getDepartment() != null) {
            dto.setDeptId(doctor.getDepartment().getId());
        }
        return dto;
    }

    private Doctor convertToEntity(DoctorDTO dto) {
        Doctor doctor = new Doctor();
        doctor.setName(dto.getName());
        doctor.setSpecialization(dto.getSpecialization());
        doctor.setFee(dto.getFee());

        Hospital hospital = hospitalRepository.findById(dto.getHospitalId())
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", dto.getHospitalId()));

        Department department = departmentRepository.findById(dto.getDeptId())
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", dto.getDeptId()));

        doctor.setHospital(hospital);
        doctor.setDepartment(department);

        return doctor;
    }
}
