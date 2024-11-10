package com.example.hierarchy;

import com.example.hierarchy.models.Employee;
import com.example.hierarchy.models.Position;
import com.example.hierarchy.models.Department;
import com.example.hierarchy.models.Project;
import com.example.hierarchy.models.ProjectStatus;
import com.example.hierarchy.repositories.EmployeeRepository;
import com.example.hierarchy.repositories.PositionRepository;
import com.example.hierarchy.repositories.DepartmentRepository;
import com.example.hierarchy.repositories.ProjectRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;
    private final PositionRepository positionRepository;
    private final DepartmentRepository departmentRepository;
    private final ProjectRepository projectRepository;

    public DataLoader(EmployeeRepository employeeRepository, PositionRepository positionRepository,
                      DepartmentRepository departmentRepository, ProjectRepository projectRepository) {
        this.employeeRepository = employeeRepository;
        this.positionRepository = positionRepository;
        this.departmentRepository = departmentRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        loadSampleData();
    }

    private void loadSampleData() {
        // Creating Departments
        Department engineering = new Department("Engineering");
        Department marketing = new Department("Marketing");
        Department hr = new Department("Human Resources");

        departmentRepository.saveAll(List.of(engineering, marketing, hr));

        // Creating Positions with ranks in each department
        Position ceo = new Position("CEO", engineering, true, 1);
        Position directorEng = new Position("Director", engineering, true, 2);
        Position managerEng = new Position("Manager", engineering, true, 3);
        Position staffEng = new Position("Staff", engineering, false, 4);

        Position headMarketing = new Position("Head of Marketing", marketing, true, 1);
        Position seniorManagerMarketing = new Position("Senior Marketing Manager", marketing, true, 2);
        Position managerMarketing = new Position("Marketing Manager", marketing, true, 3);
        Position staffMarketing = new Position("Marketing Staff", marketing, false, 4);

        Position headHr = new Position("Head of HR", hr, true, 1);
        Position seniorManagerHr = new Position("Senior Manager", hr, true, 2);
        Position managerHr = new Position("Manager", hr, true, 3);
        Position staffHr = new Position("Staff", hr, false, 4);

        positionRepository.saveAll(List.of(
                ceo, directorEng, managerEng, staffEng,
                headMarketing, seniorManagerMarketing, managerMarketing, staffMarketing,
                headHr, seniorManagerHr, managerHr, staffHr
        ));

        // Creating Employees with assigned Positions, Departments, Gender, and Hire Date
        Employee alice = new Employee("Alice Johnson", "female", LocalDate.of(2010, 5, 15), ceo, engineering);
        Employee bob = new Employee("Bob Smith", "male", LocalDate.of(2012, 6, 20), directorEng, engineering);
        Employee carol = new Employee("Carol White", "female", LocalDate.of(2015, 3, 10), managerEng, engineering);
        Employee diana = new Employee("Diana Brown", "female", LocalDate.of(2018, 8, 25), staffHr, hr);

        Employee emma = new Employee("Emma Green", "female", LocalDate.of(2011, 7, 10), headMarketing, marketing);
        Employee john = new Employee("John Doe", "male", LocalDate.of(2014, 9, 5), seniorManagerMarketing, marketing);
        Employee sophie = new Employee("Sophie Black", "female", LocalDate.of(2017, 4, 18), managerMarketing, marketing);
        Employee mike = new Employee("Mike Lee", "male", LocalDate.of(2020, 2, 13), staffMarketing, marketing);

        employeeRepository.saveAll(List.of(alice, bob, carol, diana, emma, john, sophie, mike));

        // Creating Projects and assigning employees
// Creating Projects with start and end dates, assigned employees, and status
        Project projectAlpha = new Project(1L, "Alpha", "Project Alpha description", LocalDate.of(2021, 1, 15), LocalDate.of(2021, 12, 15), ProjectStatus.IN_PROGRESS, List.of(alice, bob));
        Project projectBeta = new Project(2L, "Beta", "Project Beta description", LocalDate.of(2022, 3, 10), LocalDate.of(2022, 10, 10), ProjectStatus.NOT_STARTED, List.of(carol, diana));
        Project projectGamma = new Project(3L, "Gamma", "Project Gamma description", LocalDate.of(2020, 11, 5), LocalDate.of(2021, 5, 5), ProjectStatus.COMPLETED, List.of(emma, john));

        projectRepository.saveAll(List.of(projectAlpha, projectBeta, projectGamma));

        System.out.println("Sample data loaded into the database, including projects.");
    }
}
