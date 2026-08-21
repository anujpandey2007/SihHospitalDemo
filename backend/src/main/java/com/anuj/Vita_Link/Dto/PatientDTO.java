package com.anuj.Vita_Link.Dto;

import com.anuj.Vita_Link.Entity.Enum.Gender;
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
