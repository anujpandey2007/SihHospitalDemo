package com.anuj.sihhospital.Dto;

import com.anuj.sihhospital.Entity.Enum.HospitalType;
import lombok.Data;

@Data
public class HospitalDTO {
    public String name;
    public HospitalType type;
    public String address;
}
