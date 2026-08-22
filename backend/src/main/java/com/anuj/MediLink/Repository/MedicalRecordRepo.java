package com.anuj.MediLink.Repository;

import com.anuj.MediLink.Entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MedicalRecordRepo extends JpaRepository<MedicalRecord,Long> {
    Optional<MedicalRecord> findByAppointmentId(Long appointmentId);
    boolean existsByAppointmentId(Long appointmentId);
}
