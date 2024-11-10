package com.example.hierarchy.repositories;

import com.example.hierarchy.models.Employee;
import com.example.hierarchy.models.Position;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {


}
