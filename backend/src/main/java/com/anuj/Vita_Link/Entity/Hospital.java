package com.anuj.Vita_Link.Entity;

import com.anuj.Vita_Link.Entity.Enum.HospitalType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "hospitals")
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private HospitalType type;

    private String address;

    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Department> departments;

    @OneToMany(mappedBy = "hospital")
    @JsonIgnore
    private List<Receptionist> receptionists;
}