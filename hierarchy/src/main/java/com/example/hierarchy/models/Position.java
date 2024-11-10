package com.example.hierarchy.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
public class Position {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private int rank;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id", nullable = false)
    @JsonIgnoreProperties({"positions"})
    private Department department;


    private boolean isManager;

    public Position() {
    }

    public Position(String title, Department department, boolean isManager, int rank) {
        this.title = title;
        this.department = department;
        this.isManager = isManager;
        this.rank = rank;
    }



    // Getters and Setters
    public String getTitle() {
        return title;

    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getId() {
        return id;
    }


    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }
    public boolean isManager() {
        return isManager;
    }

    public void setManager(boolean manager) {
        isManager = manager;
    }
    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }
}