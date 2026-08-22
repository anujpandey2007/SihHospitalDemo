package com.anuj.MediLink.Dto;

import lombok.Data;

@Data
public class DoctorDTO {
    public Long id;
    public String name;
    public String specialization;
    public Double fee;
    public Long hospitalId;
    public Long deptId;



}
