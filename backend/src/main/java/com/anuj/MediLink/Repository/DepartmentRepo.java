package com.anuj.MediLink.Repository;

import com.anuj.MediLink.Entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentRepo extends JpaRepository<Department,Long> {
    List<Department> findByHospitalId(Long hospitalId);
}
