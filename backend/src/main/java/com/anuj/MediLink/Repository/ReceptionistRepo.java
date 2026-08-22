package com.anuj.MediLink.Repository;

import com.anuj.MediLink.Entity.Receptionist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceptionistRepo extends JpaRepository<Receptionist,Long> {
    List<Receptionist> findByHospitalId(Long hospitalId);
}
