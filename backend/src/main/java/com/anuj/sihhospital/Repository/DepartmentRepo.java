package com.anuj.sihhospital.Repository;

import com.anuj.sihhospital.Entity.Appointment;
import com.anuj.sihhospital.Entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface DepartmentRepo extends JpaRepository<Department,Long> {
    List<Department> findByHospitalId(Long hospitalId);
}
