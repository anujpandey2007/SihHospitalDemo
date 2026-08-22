package com.anuj.MediLink.Repository;

import com.anuj.MediLink.Entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepo extends JpaRepository<Doctor,Long> {
    List<Doctor> findByHospitalId(Long hospitalId);
}
