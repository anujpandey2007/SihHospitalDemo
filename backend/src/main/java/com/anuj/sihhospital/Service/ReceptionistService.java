package com.anuj.sihhospital.Service;

import com.anuj.sihhospital.Dto.ReceptionistDTO;
import org.jspecify.annotations.Nullable;

import java.util.List;

public interface ReceptionistService {
    ReceptionistDTO createReceptionist(ReceptionistDTO receptionistDTO);

    @Nullable List<ReceptionistDTO> getAllReceptionists();

    @Nullable ReceptionistDTO getReceptionistById(Long id);

    @Nullable List<ReceptionistDTO> getReceptionistsByHospital(Long hospitalId);

    @Nullable ReceptionistDTO updateReceptionist(Long id, ReceptionistDTO receptionistDTO);

    void deleteReceptionist(Long id);
}
