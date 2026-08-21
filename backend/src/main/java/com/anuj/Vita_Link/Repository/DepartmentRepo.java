package com.anuj.Vita_Link.Repository;

import com.anuj.Vita_Link.Entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentRepo extends JpaRepository<Department,Long> {
    List<Department> findByHospitalId(Long hospitalId);
}
