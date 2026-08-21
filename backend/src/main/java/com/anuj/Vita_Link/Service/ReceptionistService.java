package com.anuj.Vita_Link.Service;

import com.anuj.Vita_Link.Dto.ReceptionistDTO;
import java.util.List;

public interface ReceptionistService {
    ReceptionistDTO createReceptionist(ReceptionistDTO receptionistDTO);

    List<ReceptionistDTO> getAllReceptionists();

    ReceptionistDTO getReceptionistById(Long id);

    List<ReceptionistDTO> getReceptionistsByHospital(Long hospitalId);

    ReceptionistDTO updateReceptionist(Long id, ReceptionistDTO receptionistDTO);

    void deleteReceptionist(Long id);
}
