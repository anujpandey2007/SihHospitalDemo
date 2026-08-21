package com.anuj.Vita_Link.Dto;

import com.anuj.Vita_Link.Entity.Enum.HospitalType;
import lombok.Data;

@Data
public class HospitalDTO {
    public Long id;
    public String name;
    public HospitalType type;
    public String address;
}
