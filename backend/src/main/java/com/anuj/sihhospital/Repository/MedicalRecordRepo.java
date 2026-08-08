package com.anuj.sihhospital.Repository;

import com.anuj.sihhospital.Entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicalRecordRepo extends JpaRepository<MedicalRecord,Long> {
}
