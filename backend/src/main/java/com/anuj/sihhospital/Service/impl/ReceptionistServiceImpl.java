package com.anuj.sihhospital.Service.impl;

import com.anuj.sihhospital.Dto.ReceptionistDTO;
import com.anuj.sihhospital.Entity.Hospital;
import com.anuj.sihhospital.Entity.Receptionist;
import com.anuj.sihhospital.Repository.HospitalRepo;
import com.anuj.sihhospital.Repository.ReceptionistRepo;
import com.anuj.sihhospital.Service.ReceptionistService;
import com.anuj.sihhospital.Exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReceptionistServiceImpl implements ReceptionistService {

    private final ReceptionistRepo receptionistRepository;
    private final HospitalRepo hospitalRepository;



    // CREATE
    public ReceptionistDTO createReceptionist(ReceptionistDTO dto) {
        Receptionist receptionist = convertToEntity(dto);
        Receptionist savedReceptionist = receptionistRepository.save(receptionist);
        return convertToDTO(savedReceptionist);
    }

    // READ ALL
    public List<ReceptionistDTO> getAllReceptionists() {
        return receptionistRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // READ BY ID
    public ReceptionistDTO getReceptionistById(Long id) {
        Receptionist receptionist = receptionistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Receptionist", "id", id));
        return convertToDTO(receptionist);
    }

    // READ BY HOSPITAL ID
    public List<ReceptionistDTO> getReceptionistsByHospital(Long hospitalId) {
        return receptionistRepository.findByHospitalId(hospitalId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // UPDATE
    public ReceptionistDTO updateReceptionist(Long id, ReceptionistDTO dto) {
        Receptionist receptionist = receptionistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Receptionist", "id", id));

        Hospital hospital = hospitalRepository.findById(dto.getHospitalId())
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", dto.getHospitalId()));

        receptionist.setName(dto.getName());
        receptionist.setShift(dto.getShift());
        receptionist.setHospital(hospital);

        Receptionist updatedReceptionist = receptionistRepository.save(receptionist);
        return convertToDTO(updatedReceptionist);
    }

    // DELETE
    public void deleteReceptionist(Long id) {
        if (!receptionistRepository.existsById(id)) {
            throw new ResourceNotFoundException("Receptionist", "id", id);
        }
        receptionistRepository.deleteById(id);
    }

    // Helper Mappers
    private ReceptionistDTO convertToDTO(Receptionist receptionist) {
        ReceptionistDTO dto = new ReceptionistDTO();
        dto.setId(receptionist.getId());
        dto.setName(receptionist.getName());
        dto.setShift(receptionist.getShift());

        if (receptionist.getHospital() != null) {
            dto.setHospitalId(receptionist.getHospital().getId());
        }
        return dto;
    }

    private Receptionist convertToEntity(ReceptionistDTO dto) {
        Receptionist receptionist = new Receptionist();
        receptionist.setName(dto.getName());
        receptionist.setShift(dto.getShift());

        Hospital hospital = hospitalRepository.findById(dto.getHospitalId())
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", "id", dto.getHospitalId()));

        receptionist.setHospital(hospital);
        return receptionist;
    }
}
