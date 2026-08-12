package com.anuj.sihhospital.Service.impl;

import com.anuj.sihhospital.Dto.DepartmentDTO;
import com.anuj.sihhospital.Entity.Department;
import com.anuj.sihhospital.Entity.Hospital;
import com.anuj.sihhospital.Repository.DepartmentRepo;
import com.anuj.sihhospital.Repository.HospitalRepo;
import com.anuj.sihhospital.Service.DepartmentService;
import com.anuj.sihhospital.Exception.ResourceNotFoundException;
import com.anuj.sihhospital.Exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepo departmentRepository;
    private final HospitalRepo hospitalRepository;



    // CREATE
    public DepartmentDTO createDepartment(DepartmentDTO dto) {
        validateDepartmentData(dto);

        Department department = convertToEntity(dto);
        Department savedDepartment = departmentRepository.save(department);
        return convertToDTO(savedDepartment);
    }

    // READ ALL
    public List<DepartmentDTO> getAllDepartments() {
        return departmentRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // READ BY ID
    public DepartmentDTO getDepartmentById(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", id));
        return convertToDTO(department);
    }

    // READ BY HOSPITAL ID
    public List<DepartmentDTO> getDepartmentsByHospital(Long hospitalId) {
        return departmentRepository.findByHospitalId(hospitalId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // UPDATE
    public DepartmentDTO updateDepartment(Long id, DepartmentDTO dto) {
        validateDepartmentData(dto);

        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Department", "id", id));

        Hospital hospital = hospitalRepository.findById(dto.getHospitalId())
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", dto.getHospitalId()));

        department.setName(dto.getName());
        department.setHospital(hospital);

        Department updatedDepartment = departmentRepository.save(department);
        return convertToDTO(updatedDepartment);
    }

    // DELETE
    public void deleteDepartment(Long id) {
        if (!departmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Department", "id", id);
        }
        departmentRepository.deleteById(id);
    }

    // Helper Mappers
    private void validateDepartmentData(DepartmentDTO dto) {
        if (dto.getName() == null || dto.getName().trim().isEmpty()) {
            throw new BadRequestException("Department name cannot be empty");
        }
    }

    private DepartmentDTO convertToDTO(Department department) {
        DepartmentDTO dto = new DepartmentDTO();
        dto.setId(department.getId());
        dto.setName(department.getName());

        if (department.getHospital() != null) {
            dto.setHospitalId(department.getHospital().getId());
        }
        return dto;
    }

    private Department convertToEntity(DepartmentDTO dto) {
        Department department = new Department();
        department.setName(dto.getName());

        Hospital hospital = hospitalRepository.findById(dto.getHospitalId())
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", dto.getHospitalId()));

        department.setHospital(hospital);
        return department;
    }
}
