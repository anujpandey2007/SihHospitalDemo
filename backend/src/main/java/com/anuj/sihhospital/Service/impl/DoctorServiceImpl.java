package com.anuj.sihhospital.Service.impl;

import com.anuj.sihhospital.Dto.DoctorDTO;
import com.anuj.sihhospital.Entity.Department;
import com.anuj.sihhospital.Entity.Doctor;
import com.anuj.sihhospital.Entity.Hospital;
import com.anuj.sihhospital.Repository.DepartmentRepo;
import com.anuj.sihhospital.Repository.DoctorRepo;
import com.anuj.sihhospital.Repository.HospitalRepo;
import com.anuj.sihhospital.Service.DoctorService;
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
        Doctor doctor = convertToEntity(dto);
        try{
            Doctor savedDoctor = doctorRepository.save(doctor);
            return convertToDTO(savedDoctor);

        }catch (Exception e){
            System.out.println(e.getMessage());
            throw e;
        }

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
                .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + id));
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
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + id));

        Hospital hospital = hospitalRepository.findById(dto.getHospitalId())
                .orElseThrow(() -> new RuntimeException("Hospital not found with ID: " + dto.getHospitalId()));

        Department department = departmentRepository.findById(dto.getDeptId())
                .orElseThrow(() -> new RuntimeException("Department not found with ID: " + dto.getDeptId()));

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
            throw new RuntimeException("Doctor not found with ID: " + id);
        }
        doctorRepository.deleteById(id);
    }

    // Helper Mappers
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
                .orElseThrow(() -> new RuntimeException("Hospital not found with ID: " + dto.getHospitalId()));

        Department department = departmentRepository.findById(dto.getDeptId())
                .orElseThrow(() -> new RuntimeException("Department not found with ID: " + dto.getDeptId()));

        doctor.setHospital(hospital);
        doctor.setDepartment(department);

        return doctor;
    }
}
