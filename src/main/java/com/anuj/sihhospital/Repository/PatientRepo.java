package com.anuj.sihhospital.Repository;

import com.anuj.sihhospital.Entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepo extends JpaRepository <Patient,Long> {
}
