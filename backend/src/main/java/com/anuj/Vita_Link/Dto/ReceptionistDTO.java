package com.anuj.Vita_Link.Dto;

import com.anuj.Vita_Link.Entity.Enum.Shift;
import lombok.Data;

@Data
public class ReceptionistDTO {
    public Long id;
    public String name;
    public Shift shift;
    public Long hospitalId;
}
