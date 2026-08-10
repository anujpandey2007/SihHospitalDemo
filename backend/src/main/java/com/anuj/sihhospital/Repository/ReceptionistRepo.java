package com.anuj.sihhospital.Repository;

import com.anuj.sihhospital.Entity.Receptionist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ReceptionistRepo extends JpaRepository<Receptionist,Long> {
    List<Receptionist> findByHospitalId(Long hospitalId);
}
