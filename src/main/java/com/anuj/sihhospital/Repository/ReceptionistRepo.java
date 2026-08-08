package com.anuj.sihhospital.Repository;

import com.anuj.sihhospital.Entity.Receptionist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReceptionistRepo extends JpaRepository<Receptionist,Long> {
}
