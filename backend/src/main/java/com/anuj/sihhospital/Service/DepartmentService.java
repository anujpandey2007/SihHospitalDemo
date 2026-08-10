package com.anuj.sihhospital.Service;

import com.anuj.sihhospital.Dto.DepartmentDTO;
import org.jspecify.annotations.Nullable;

import java.util.List;

public interface DepartmentService {
    DepartmentDTO createDepartment(DepartmentDTO departmentDTO);

    @Nullable List<DepartmentDTO> getAllDepartments();

    @Nullable DepartmentDTO getDepartmentById(Long id);

    @Nullable List<DepartmentDTO> getDepartmentsByHospital(Long hospitalId);

    @Nullable DepartmentDTO updateDepartment(Long id, DepartmentDTO departmentDTO);

    void deleteDepartment(Long id);
}
