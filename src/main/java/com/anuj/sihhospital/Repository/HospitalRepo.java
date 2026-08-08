package com.anuj.sihhospital.Repository;

import com.anuj.sihhospital.Entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalRepo extends JpaRepository<Hospital,Long> {
}
