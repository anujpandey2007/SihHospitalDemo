package com.anuj.MediLink.Dto;

import com.anuj.MediLink.Entity.Enum.HospitalType;
import lombok.Data;

@Data
public class HospitalDTO {
    public Long id;
    public String name;
    public HospitalType type;
    public String address;
}
