package com.anuj.MediLink.Repository;

import com.anuj.MediLink.Entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalRepo extends JpaRepository<Hospital,Long> {
    boolean existsByName(String name);
}
