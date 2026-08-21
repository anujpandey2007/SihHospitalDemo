package com.anuj.Vita_Link.Service.impl;

import com.anuj.Vita_Link.Dto.ReceptionistDTO;
import com.anuj.Vita_Link.Entity.Hospital;
import com.anuj.Vita_Link.Entity.Receptionist;
import com.anuj.Vita_Link.Repository.HospitalRepo;
import com.anuj.Vita_Link.Repository.ReceptionistRepo;
import com.anuj.Vita_Link.Service.ReceptionistService;
import com.anuj.Vita_Link.Exception.ResourceNotFoundException;
import com.anuj.Vita_Link.Exception.BadRequestException;
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
        validateReceptionistData(dto);

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
        validateReceptionistData(dto);

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
    private void validateReceptionistData(ReceptionistDTO dto) {
        if (dto.getName() == null || dto.getName().trim().isEmpty()) {
            throw new BadRequestException("Receptionist name cannot be empty");
        }
    }

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
