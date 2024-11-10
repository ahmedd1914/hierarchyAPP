package com.example.hierarchy.services;

import com.example.hierarchy.models.Employee;
import com.example.hierarchy.models.Project;
import com.example.hierarchy.repositories.EmployeeRepository;
import com.example.hierarchy.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }

    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    public Optional<Project> updateProject(Long id, Project projectData) {
        // Find and update project if exists, otherwise return an empty Optional
        return projectRepository.findById(id).map(existingProject -> {
            // Update project fields
            existingProject.setName(projectData.getName());
            existingProject.setDescription(projectData.getDescription());
            existingProject.setStartDate(projectData.getStartDate());
            existingProject.setEndDate(projectData.getEndDate());
            existingProject.setStatus(projectData.getStatus());

            // Update assigned employees
            if (projectData.getEmployees() != null) {
                List<Employee> employees = employeeRepository.findAllById(
                        projectData.getEmployees().stream()
                                .map(Employee::getId)
                                .collect(Collectors.toList())
                );
                existingProject.setEmployees(employees);
            }

            return projectRepository.save(existingProject);
        });
    }
}
