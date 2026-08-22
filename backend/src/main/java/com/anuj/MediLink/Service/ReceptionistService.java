package com.anuj.MediLink.Service;

import com.anuj.MediLink.Dto.ReceptionistDTO;
import java.util.List;

public interface ReceptionistService {
    ReceptionistDTO createReceptionist(ReceptionistDTO receptionistDTO);

    List<ReceptionistDTO> getAllReceptionists();

    ReceptionistDTO getReceptionistById(Long id);

    List<ReceptionistDTO> getReceptionistsByHospital(Long hospitalId);

    ReceptionistDTO updateReceptionist(Long id, ReceptionistDTO receptionistDTO);

    void deleteReceptionist(Long id);
}
