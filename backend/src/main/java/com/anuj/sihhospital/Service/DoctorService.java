package com.anuj.sihhospital.Service;

import com.anuj.sihhospital.Dto.DoctorDTO;
import org.jspecify.annotations.Nullable;

import java.util.List;

public interface DoctorService {
    DoctorDTO createDoctor(DoctorDTO doctorDTO);

    @Nullable List<DoctorDTO> getAllDoctors();

    @Nullable DoctorDTO getDoctorById(Long id);

    @Nullable List<DoctorDTO> getDoctorsByHospital(Long hospitalId);

    @Nullable DoctorDTO updateDoctor(Long id, DoctorDTO doctorDTO);

    void deleteDoctor(Long id);
}
