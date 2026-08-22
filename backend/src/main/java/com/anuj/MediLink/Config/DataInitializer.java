package com.anuj.MediLink.Config;

import com.anuj.MediLink.Entity.*;
import com.anuj.MediLink.Entity.Enum.*;
import com.anuj.MediLink.Repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final HospitalRepo hospitalRepo;
    private final DepartmentRepo departmentRepo;
    private final DoctorRepo doctorRepo;
    private final ReceptionistRepo receptionistRepo;
    private final PatientRepo patientRepo;
    private final AppointmentRepo appointmentRepo;
    private final MedicalRecordRepo medicalRecordRepo;

    @Override
    @Transactional
    public void run(String... args) {
        if (hospitalRepo.count() > 0) {
            log.info("Database already contains data ({} hospitals found). Skipping seeding.", hospitalRepo.count());
            return;
        }

        log.info("Starting prototype data seeding...");

        // ==========================================
        // 1. SEED HOSPITALS
        // ==========================================
        Hospital h1 = new Hospital();
        h1.setName("AIIMS New Delhi");
        h1.setType(HospitalType.GOVT);
        h1.setAddress("Sri Aurobindo Marg, Ansari Nagar, New Delhi - 110029");

        Hospital h2 = new Hospital();
        h2.setName("Apollo Multispeciality Hospital");
        h2.setType(HospitalType.PVT);
        h2.setAddress("Sarita Vihar, Delhi Mathura Road, New Delhi - 110076");

        Hospital h3 = new Hospital();
        h3.setName("City Care Super Specialty Hospital");
        h3.setType(HospitalType.SEMI_GOVT);
        h3.setAddress("Sector 62, Institutional Area, Noida, Uttar Pradesh - 201309");

        h1 = hospitalRepo.save(h1);
        h2 = hospitalRepo.save(h2);
        h3 = hospitalRepo.save(h3);

        log.info("Seeded 3 Hospitals.");

        // ==========================================
        // 2. SEED DEPARTMENTS
        // ==========================================
        Department d1 = createDepartment("Cardiology", h1);
        Department d2 = createDepartment("Neurology", h1);
        Department d3 = createDepartment("Orthopedics", h1);
        Department d4 = createDepartment("Pediatrics", h1);
        Department d5 = createDepartment("Emergency Medicine", h1);

        Department d6 = createDepartment("Cardiology", h2);
        Department d7 = createDepartment("Oncology", h2);
        Department d8 = createDepartment("Dermatology", h2);
        Department d9 = createDepartment("General Medicine", h2);
        Department d10 = createDepartment("Radiology", h2);

        Department d11 = createDepartment("Orthopedics", h3);
        Department d12 = createDepartment("General Medicine", h3);
        Department d13 = createDepartment("Pediatrics", h3);

        List<Department> savedDepts = departmentRepo.saveAll(List.of(
                d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13
        ));
        log.info("Seeded {} Departments.", savedDepts.size());

        // ==========================================
        // 3. SEED DOCTORS
        // ==========================================
        Doctor doc1 = createDoctor("Dr. Rajesh Sharma", "Interventional Cardiologist", 500.0, h1, d1);
        Doctor doc2 = createDoctor("Dr. Sunita Mehra", "Senior Neurologist", 600.0, h1, d2);
        Doctor doc3 = createDoctor("Dr. Vikramaditya Rathore", "Joint Replacement Specialist", 500.0, h1, d3);
        Doctor doc4 = createDoctor("Dr. Priya Verma", "Consultant Pediatrician", 400.0, h1, d4);
        Doctor doc5 = createDoctor("Dr. Arvind Kejriwal", "Emergency Medicine Specialist", 300.0, h1, d5);

        Doctor doc6 = createDoctor("Dr. Amit Patel", "Senior Cardiac Surgeon", 1800.0, h2, d6);
        Doctor doc7 = createDoctor("Dr. Meenakshi Sundaram", "Medical Oncologist", 2200.0, h2, d7);
        Doctor doc8 = createDoctor("Dr. Neha Kapoor", "Clinical Dermatologist & Cosmetologist", 1200.0, h2, d8);
        Doctor doc9 = createDoctor("Dr. Sanjay Gupta", "Internal Medicine Consultant", 1000.0, h2, d9);

        Doctor doc10 = createDoctor("Dr. Rohan Joshi", "Trauma & Orthopedic Surgeon", 800.0, h3, d11);
        Doctor doc11 = createDoctor("Dr. Ananya Sen", "Pediatric Care Specialist", 750.0, h3, d13);
        Doctor doc12 = createDoctor("Dr. Harish Chandra", "General Physician", 650.0, h3, d12);

        List<Doctor> savedDoctors = doctorRepo.saveAll(List.of(
                doc1, doc2, doc3, doc4, doc5, doc6, doc7, doc8, doc9, doc10, doc11, doc12
        ));
        log.info("Seeded {} Doctors.", savedDoctors.size());

        // ==========================================
        // 4. SEED RECEPTIONISTS
        // ==========================================
        Receptionist rec1 = createReceptionist("Ramesh Kumar", Shift.MORNING, h1);
        Receptionist rec2 = createReceptionist("Pooja Singh", Shift.EVENING, h1);
        Receptionist rec3 = createReceptionist("Deepak Yadav", Shift.NIGHT, h1);

        Receptionist rec4 = createReceptionist("Sneha Rao", Shift.MORNING, h2);
        Receptionist rec5 = createReceptionist("Rahul Saxena", Shift.EVENING, h2);
        Receptionist rec6 = createReceptionist("Vikas Malhotra", Shift.NIGHT, h2);

        Receptionist rec7 = createReceptionist("Kavita Nair", Shift.MORNING, h3);
        Receptionist rec8 = createReceptionist("Manoj Tiwari", Shift.EVENING, h3);

        List<Receptionist> savedReceptionists = receptionistRepo.saveAll(List.of(
                rec1, rec2, rec3, rec4, rec5, rec6, rec7, rec8
        ));
        log.info("Seeded {} Receptionists.", savedReceptionists.size());

        // ==========================================
        // 5. SEED PATIENTS
        // ==========================================
        Patient p1 = createPatient("Aarav Sharma", 34, Gender.MALE, "9876543210", "O+");
        Patient p2 = createPatient("Ananya Desai", 28, Gender.FEMALE, "9876543211", "A+");
        Patient p3 = createPatient("Rahul Verma", 45, Gender.MALE, "9876543212", "B+");
        Patient p4 = createPatient("Sneha Kulkarni", 52, Gender.FEMALE, "9876543213", "AB+");
        Patient p5 = createPatient("Vikram Malhotra", 61, Gender.MALE, "9876543214", "O-");
        Patient p6 = createPatient("Priya Nair", 23, Gender.FEMALE, "9876543215", "A-");
        Patient p7 = createPatient("Amit Sen", 39, Gender.MALE, "9876543216", "B-");
        Patient p8 = createPatient("Tanvi Jain", 31, Gender.FEMALE, "9876543217", "AB-");
        Patient p9 = createPatient("Kiran Reddy", 42, Gender.OTHER, "9876543218", "O+");
        Patient p10 = createPatient("Rohit Mehra", 19, Gender.MALE, "9876543219", "B+");
        Patient p11 = createPatient("Divya Iyer", 37, Gender.FEMALE, "9876543220", "A+");
        Patient p12 = createPatient("Sandeep Gill", 56, Gender.MALE, "9876543221", "O+");

        List<Patient> savedPatients = patientRepo.saveAll(List.of(
                p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12
        ));
        log.info("Seeded {} Patients.", savedPatients.size());

        // ==========================================
        // 6. SEED APPOINTMENTS
        // ==========================================
        LocalDateTime now = LocalDateTime.now();

        // Past Completed Appointments (will have Medical Records)
        Appointment a1 = createAppointment(p1, doc1, h1, rec1, now.minusDays(5).withHour(10).withMinute(30), AppointmentStatus.COMPLETED);
        Appointment a2 = createAppointment(p2, doc8, h2, rec4, now.minusDays(4).withHour(14).withMinute(0), AppointmentStatus.COMPLETED);
        Appointment a3 = createAppointment(p3, doc3, h1, rec2, now.minusDays(3).withHour(11).withMinute(15), AppointmentStatus.COMPLETED);
        Appointment a4 = createAppointment(p4, doc9, h2, rec5, now.minusDays(2).withHour(16).withMinute(45), AppointmentStatus.COMPLETED);
        Appointment a5 = createAppointment(p5, doc6, h2, rec4, now.minusDays(1).withHour(9).withMinute(0), AppointmentStatus.COMPLETED);
        Appointment a6 = createAppointment(p6, doc12, h3, rec7, now.minusDays(1).withHour(12).withMinute(30), AppointmentStatus.COMPLETED);
        Appointment a7 = createAppointment(p7, doc2, h1, rec1, now.minusHours(4), AppointmentStatus.COMPLETED);

        // Upcoming Confirmed Appointments
        Appointment a8 = createAppointment(p8, doc7, h2, rec4, now.plusDays(1).withHour(10).withMinute(0), AppointmentStatus.CONFIRMED);
        Appointment a9 = createAppointment(p9, doc10, h3, rec7, now.plusDays(1).withHour(15).withMinute(30), AppointmentStatus.CONFIRMED);
        Appointment a10 = createAppointment(p10, doc4, h1, rec2, now.plusDays(2).withHour(11).withMinute(0), AppointmentStatus.CONFIRMED);
        Appointment a11 = createAppointment(p11, doc8, h2, rec5, now.plusDays(2).withHour(16).withMinute(0), AppointmentStatus.CONFIRMED);

        // Upcoming Scheduled Appointments
        Appointment a12 = createAppointment(p12, doc1, h1, rec1, now.plusDays(3).withHour(9).withMinute(30), AppointmentStatus.SCHEDULED);
        Appointment a13 = createAppointment(p1, doc9, h2, rec4, now.plusDays(4).withHour(14).withMinute(30), AppointmentStatus.SCHEDULED);
        Appointment a14 = createAppointment(p2, doc11, h3, rec8, now.plusDays(5).withHour(10).withMinute(15), AppointmentStatus.SCHEDULED);

        // Cancelled Appointments
        Appointment a15 = createAppointment(p3, doc6, h2, rec5, now.minusDays(2).withHour(17).withMinute(0), AppointmentStatus.CANCELLED);
        Appointment a16 = createAppointment(p4, doc2, h1, rec3, now.plusDays(1).withHour(19).withMinute(0), AppointmentStatus.CANCELLED);

        List<Appointment> savedAppointments = appointmentRepo.saveAll(List.of(
                a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16
        ));
        log.info("Seeded {} Appointments.", savedAppointments.size());

        // ==========================================
        // 7. SEED MEDICAL RECORDS (for Completed Appointments)
        // ==========================================
        MedicalRecord mr1 = createMedicalRecord(
                a1,
                "Stage 1 Essential Hypertension with mild resting sinus tachycardia.",
                "1. Tab. Telmisartan 40mg - 1 tablet once daily morning after breakfast (30 days)\n" +
                "2. Tab. Metoprolol Tartrate 25mg - 1 tablet OD morning (15 days)\n" +
                "3. Dietary advice: Low sodium diet, 30 mins brisk walking daily.",
                750.0,
                PaymentStatus.PAID
        );

        MedicalRecord mr2 = createMedicalRecord(
                a2,
                "Moderate Plaque Psoriasis on bilateral extensor surfaces (elbows, knees).",
                "1. Clobetasol Propionate 0.05% w/w cream - Apply twice daily for 2 weeks\n" +
                "2. Tab. Levocetirizine 5mg - 1 tablet at night for itching (10 days)\n" +
                "3. Intensive skin hydrating body lotion - Apply generously after bath.",
                1850.0,
                PaymentStatus.PAID
        );

        MedicalRecord mr3 = createMedicalRecord(
                a3,
                "Lumbar Spondylosis with L4-L5 mild disc protrusion and left leg radiculopathy.",
                "1. Tab. Etoricoxib 90mg - 1 tablet OD after food for 5 days\n" +
                "2. Tab. Pregabalin 75mg + Methylcobalamin 1500mcg - 1 capsule HS for 30 days\n" +
                "3. Tab. Pantoprazole 40mg - 1 tablet before breakfast (5 days)\n" +
                "4. Physical Therapy referral for core stabilization exercises.",
                1200.0,
                PaymentStatus.PARTIALLY_PAID
        );

        MedicalRecord mr4 = createMedicalRecord(
                a4,
                "Type 2 Diabetes Mellitus poorly controlled with elevated HbA1c (8.4%).",
                "1. Tab. Metformin 500mg + Glimepiride 1mg - 1 tablet BD before meals\n" +
                "2. Tab. Teneligliptin 20mg - 1 tablet OD before breakfast\n" +
                "3. Lifestyle: Diabetic diet chart followed, recheck Fasting/PP blood sugar after 14 days.",
                1500.0,
                PaymentStatus.PENDING
        );

        MedicalRecord mr5 = createMedicalRecord(
                a5,
                "Chronic Stable Angina with grade 2 dyspnea on exertion. Echo shows EF 55%.",
                "1. Tab. Aspirin 75mg + Atorvastatin 20mg - 1 capsule at bedtime\n" +
                "2. Tab. Isosorbide Mononitrate 30mg SR - 1 tablet morning\n" +
                "3. Tab. Ivabradine 5mg - 1 tablet BD\n" +
                "4. Follow-up Coronary Angiography suggested next week.",
                3200.0,
                PaymentStatus.PAID
        );

        MedicalRecord mr6 = createMedicalRecord(
                a6,
                "Acute Bacterial Gastroenteritis with moderate dehydration.",
                "1. WHO ORS solution - 1 sachet dissolved in 1L water, sip continuously\n" +
                "2. Tab. Ofloxacin 200mg + Ornidazole 500mg - 1 tablet BD for 5 days\n" +
                "3. Tab. Racecadotril 100mg - 1 capsule TID for 3 days\n" +
                "4. Probiotic capsule (Lactobacillus) - 1 BD for 7 days.",
                950.0,
                PaymentStatus.UNPAID
        );

        MedicalRecord mr7 = createMedicalRecord(
                a7,
                "Migraine without Aura triggered by stress and irregular sleep cycles.",
                "1. Tab. Naproxen Sodium 500mg + Domperidone 10mg - SOS during onset of headache\n" +
                "2. Tab. Propranolol 40mg SR - 1 tablet OD morning as prophylaxis (30 days)\n" +
                "3. Maintain headache diary, avoid skipping meals and excess caffeine.",
                800.0,
                PaymentStatus.PAID
        );

        List<MedicalRecord> savedRecords = medicalRecordRepo.saveAll(List.of(
                mr1, mr2, mr3, mr4, mr5, mr6, mr7
        ));
        log.info("Seeded {} Medical Records.", savedRecords.size());

        log.info("==================================================================");
        log.info("🎉 PROTOTYPE DATA SEEDING COMPLETED SUCCESSFULLY! 🎉");
        log.info("   - Hospitals:       {}", hospitalRepo.count());
        log.info("   - Departments:     {}", departmentRepo.count());
        log.info("   - Doctors:         {}", doctorRepo.count());
        log.info("   - Receptionists:   {}", receptionistRepo.count());
        log.info("   - Patients:        {}", patientRepo.count());
        log.info("   - Appointments:    {}", appointmentRepo.count());
        log.info("   - Medical Records: {}", medicalRecordRepo.count());
        log.info("==================================================================");
    }

    // --- Helper Creation Methods ---

    private Department createDepartment(String name, Hospital hospital) {
        Department d = new Department();
        d.setName(name);
        d.setHospital(hospital);
        return d;
    }

    private Doctor createDoctor(String name, String specialization, Double fee, Hospital hospital, Department department) {
        Doctor doc = new Doctor();
        doc.setName(name);
        doc.setSpecialization(specialization);
        doc.setFee(fee);
        doc.setHospital(hospital);
        doc.setDepartment(department);
        return doc;
    }

    private Receptionist createReceptionist(String name, Shift shift, Hospital hospital) {
        Receptionist r = new Receptionist();
        r.setName(name);
        r.setShift(shift);
        r.setHospital(hospital);
        return r;
    }

    private Patient createPatient(String name, Integer age, Gender gender, String phone, String bloodGroup) {
        Patient p = new Patient();
        p.setName(name);
        p.setAge(age);
        p.setGender(gender);
        p.setPhone(phone);
        p.setBloodGroup(bloodGroup);
        return p;
    }

    private Appointment createAppointment(Patient patient, Doctor doctor, Hospital hospital,
                                          Receptionist receptionist, LocalDateTime dateTime, AppointmentStatus status) {
        Appointment a = new Appointment();
        a.setPatient(patient);
        a.setDoctor(doctor);
        a.setHospital(hospital);
        a.setReceptionist(receptionist);
        a.setAppointmentDate(dateTime);
        a.setStatus(status);
        return a;
    }

    private MedicalRecord createMedicalRecord(Appointment appointment, String diagnosis,
                                              String prescription, Double totalBill, PaymentStatus status) {
        MedicalRecord mr = new MedicalRecord();
        mr.setAppointment(appointment);
        mr.setDiagnosis(diagnosis);
        mr.setPrescription(prescription);
        mr.setTotalBill(totalBill);
        mr.setPaymentStatus(status);
        return mr;
    }
}
