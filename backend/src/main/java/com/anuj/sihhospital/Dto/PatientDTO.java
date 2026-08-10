package com.anuj.sihhospital.Dto;

import com.anuj.sihhospital.Entity.Enum.Gender;
import lombok.Data;

@Data
public class PatientDTO {
    public Long Id;
    public String name;
    public Integer age;
    public Gender gender;
    public String phone;
    public String bloodGroup;
}
