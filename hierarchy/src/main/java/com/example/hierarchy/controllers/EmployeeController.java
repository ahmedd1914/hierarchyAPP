package com.example.hierarchy.controllers;

import com.example.hierarchy.models.Department;
import com.example.hierarchy.models.Employee;
import com.example.hierarchy.models.Position;
import com.example.hierarchy.services.EmployeeService;
import com.example.hierarchy.services.DepartmentService;
import com.example.hierarchy.services.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private PositionService positionService;




    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    // Get employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/managers")
    public ResponseEntity<List<Employee>> getAllManagers() {
        List<Employee> managers = employeeService.getAllManagers();
        return ResponseEntity.ok(managers);
    }
    @GetMapping("/filter")
    public ResponseEntity<List<Employee>> getEmployeesByGenderAndExperience(
            @RequestParam String gender,
            @RequestParam int minYears,
            @RequestParam int maxYears) {
        List<Employee> employees = employeeService.getEmployeesByGenderAndExperience(gender, minYears, maxYears);
        return ResponseEntity.ok(employees);
    }
    // Create a new employee
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        // Validate and set department
        if (employee.getDepartment() != null && employee.getDepartment().getId() != null) {
            Optional<Department> department = departmentService.getDepartmentById(employee.getDepartment().getId());
            if (department.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Department not found
            }
            employee.setDepartment(department.get());
        }

        // Validate and set position
        if (employee.getPosition() != null && employee.getPosition().getId() != null) {
            Optional<Position> position = positionService.getPositionById(employee.getPosition().getId());
            if (position.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Position not found
            }
            employee.setPosition(position.get());
        }

        // Save employee and return response
        Employee savedEmployee = employeeService.saveEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployee);
    }
    @PutMapping("/{id}/promote")
    public ResponseEntity<Employee> promoteEmployee(@PathVariable Long id) {
        Optional<Employee> promotedEmployee = employeeService.promoteEmployee(id);
        return promotedEmployee
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
    // Delete an employee by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        if (employeeService.getEmployeeById(id).isPresent()) {
            employeeService.deleteEmployee(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
