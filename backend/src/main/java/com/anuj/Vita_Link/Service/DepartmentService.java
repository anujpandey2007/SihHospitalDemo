package com.anuj.Vita_Link.Service;

import com.anuj.Vita_Link.Dto.DepartmentDTO;

import java.util.List;

public interface DepartmentService {
    DepartmentDTO createDepartment(DepartmentDTO departmentDTO);

    List<DepartmentDTO> getAllDepartments();

    DepartmentDTO getDepartmentById(Long id);

    List<DepartmentDTO> getDepartmentsByHospital(Long hospitalId);

    DepartmentDTO updateDepartment(Long id, DepartmentDTO departmentDTO);

    void deleteDepartment(Long id);
}
