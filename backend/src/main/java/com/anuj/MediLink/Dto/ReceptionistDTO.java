package com.anuj.MediLink.Dto;

import com.anuj.MediLink.Entity.Enum.Shift;
import lombok.Data;

@Data
public class ReceptionistDTO {
    public Long id;
    public String name;
    public Shift shift;
    public Long hospitalId;
}
