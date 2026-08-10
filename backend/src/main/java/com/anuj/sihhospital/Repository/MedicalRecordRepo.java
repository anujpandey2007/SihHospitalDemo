package com.anuj.sihhospital.Repository;

import com.anuj.sihhospital.Entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MedicalRecordRepo extends JpaRepository<MedicalRecord,Long> {
    Optional<MedicalRecord> findByAppointmentId(Long appointmentId);
}
