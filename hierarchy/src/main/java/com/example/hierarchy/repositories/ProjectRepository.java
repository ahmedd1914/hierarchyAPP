package com.example.hierarchy.repositories;

import com.example.hierarchy.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}
