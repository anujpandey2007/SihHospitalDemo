package com.anuj.sihhospital.Service.impl;

import com.anuj.sihhospital.Repository.AppointmentRepo;
import com.anuj.sihhospital.Service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepo repo;


}
