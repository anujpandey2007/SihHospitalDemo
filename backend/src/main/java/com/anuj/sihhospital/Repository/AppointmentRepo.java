package com.anuj.sihhospital.Repository;

import com.anuj.sihhospital.Entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepo extends JpaRepository<Appointment,Long> {
}
