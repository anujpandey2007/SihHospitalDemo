package com.anuj.sihhospital.Dto;

import com.anuj.sihhospital.Entity.Enum.Shift;
import lombok.Data;

@Data
public class ReceptionistDTO {
    public Long id;
    public String name;
    public Shift shift;
    public Long hospitalId;
}
