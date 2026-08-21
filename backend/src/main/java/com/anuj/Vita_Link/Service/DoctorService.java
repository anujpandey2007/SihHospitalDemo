package com.anuj.Vita_Link.Service;

import com.anuj.Vita_Link.Dto.DoctorDTO;

import java.util.List;

public interface DoctorService {
    DoctorDTO createDoctor(DoctorDTO doctorDTO);

    List<DoctorDTO> getAllDoctors();

    DoctorDTO getDoctorById(Long id);

    List<DoctorDTO> getDoctorsByHospital(Long hospitalId);

    DoctorDTO updateDoctor(Long id, DoctorDTO doctorDTO);

    void deleteDoctor(Long id);
}
