package com.example.hierarchy.repositories;

import com.example.hierarchy.models.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
