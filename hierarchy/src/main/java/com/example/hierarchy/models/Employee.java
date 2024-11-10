package com.example.hierarchy.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String gender; // "male" or "female"
    private LocalDate hireDate;



    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "position_id")
    @JsonIgnoreProperties({"department"})
    private Position position;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id")
    @JsonIgnoreProperties({"department"})
    private Department department;

    public Employee() {
    }

    public Employee(String name, String gender, LocalDate hireDate, Position position, Department department) {
        this.name = name;
        this.gender = gender;
        this.hireDate = hireDate;
        this.position = position;
        this.department = department;
    }


    // Getters and Setters
    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getHireDate() {
        return hireDate;
    }

    public void setHireDate(LocalDate hireDate) {
        this.hireDate = hireDate;
    }

    public int getYearsOfExperience() {
        return LocalDate.now().getYear() - (hireDate != null ? hireDate.getYear() : 0);
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

}