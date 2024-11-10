package com.example.hierarchy;

import com.example.hierarchy.models.Department;
import com.example.hierarchy.models.Employee;
import com.example.hierarchy.models.Position; // Ensure to import Position if used
import com.example.hierarchy.repositories.DepartmentRepository;
import com.example.hierarchy.repositories.EmployeeRepository;
import com.example.hierarchy.repositories.PositionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Autowired;

@SpringBootApplication
public class HierarchyApplication {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private DepartmentRepository departmentRepository;

	@Autowired
	private PositionRepository positionRepository; // Make sure this is added

	public static void main(String[] args) {
		SpringApplication.run(HierarchyApplication.class, args);
	}


	}



