package com.anuj.Vita_Link.Repository;

import com.anuj.Vita_Link.Entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalRepo extends JpaRepository<Hospital,Long> {
    boolean existsByName(String name);
}
