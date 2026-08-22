package com.anuj.MediLink.Dto;

import com.anuj.MediLink.Entity.Enum.Gender;
import lombok.Data;

@Data
public class PatientDTO {
    public Long id;
    public String name;
    public Integer age;
    public Gender gender;
    public String phone;
    public String bloodGroup;
}
