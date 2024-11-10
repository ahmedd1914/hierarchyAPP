package com.example.hierarchy.services;

import com.example.hierarchy.models.Department;
import com.example.hierarchy.models.Employee;
import com.example.hierarchy.models.Position;
import com.example.hierarchy.repositories.DepartmentRepository;
import com.example.hierarchy.repositories.EmployeeRepository;
import com.example.hierarchy.repositories.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private PositionRepository positionRepository;

    // Other repositories as needed...

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    public List<Employee> getAllManagers() {
        return employeeRepository.findAll().stream()
                .filter(employee -> employee.getPosition() != null && employee.getPosition().isManager())
                .collect(Collectors.toList());
    }

    /**
     * Fetch employees by gender and years of experience within a specified range.
     *
     * @param gender   Gender to filter by (e.g., "male" or "female")
     * @param minYears Minimum years of experience
     * @param maxYears Maximum years of experience
     * @return List of employees matching the criteria
     */
    public List<Employee> getEmployeesByGenderAndExperience(String gender, int minYears, int maxYears) {
        return employeeRepository.findAll().stream()
                .filter(employee -> employee.getGender() != null && employee.getGender().equalsIgnoreCase(gender))
                .filter(employee -> {
                    int yearsOfExperience = employee.getYearsOfExperience();
                    return yearsOfExperience >= minYears && yearsOfExperience <= maxYears;
                })
                .collect(Collectors.toList());
    }
    public Optional<Employee> promoteEmployee(Long employeeId) {
        Optional<Employee> employeeOpt = employeeRepository.findById(employeeId);

        if (employeeOpt.isPresent()) {
            Employee employee = employeeOpt.get();
            Position currentPosition = employee.getPosition();
            Department department = employee.getDepartment();

            // Find the next position with a higher rank (lower rank value)
            Optional<Position> nextPositionOpt = positionRepository
                    .findFirstByDepartmentAndRankLessThanOrderByRankDesc(department, currentPosition.getRank());

            if (nextPositionOpt.isPresent()) {
                Position nextPosition = nextPositionOpt.get();
                employee.setPosition(nextPosition);
                employeeRepository.save(employee);
                return Optional.of(employee);
            } else {
                System.out.println("Employee is already at the highest rank in the department.");
                return Optional.empty();
            }
        }

        return Optional.empty(); // Employee not found or promotion not possible
    }




}
