package com.anuj.sihhospital.Repository;

import com.anuj.sihhospital.Entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepo extends JpaRepository<Department,Long> {
}
