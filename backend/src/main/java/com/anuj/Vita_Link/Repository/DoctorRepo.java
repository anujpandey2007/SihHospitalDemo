package com.anuj.Vita_Link.Repository;

import com.anuj.Vita_Link.Entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepo extends JpaRepository<Doctor,Long> {
    List<Doctor> findByHospitalId(Long hospitalId);
}
