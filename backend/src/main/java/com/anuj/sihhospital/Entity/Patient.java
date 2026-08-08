package com.anuj.sihhospital.Entity;

import com.anuj.sihhospital.Entity.Enum.Gender;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private Integer age;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(unique = true, nullable = false)
    private String phone;

    private String bloodGroup;

    @OneToMany(mappedBy = "patient")
    private List<Appointment> appointments;


}
