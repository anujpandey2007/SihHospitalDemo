package com.anuj.MediLink.Repository;

import com.anuj.MediLink.Entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PatientRepo extends JpaRepository<Patient, Long> {
    boolean existsByPhone(String phone);

    @Query("SELECT DISTINCT p FROM Patient p JOIN p.appointments a WHERE a.hospital.id = :hospitalId")
    List<Patient> findByHospitalId(@Param("hospitalId") Long hospitalId);
}
