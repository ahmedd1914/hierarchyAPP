package com.example.hierarchy.repositories;

import com.example.hierarchy.models.Department;
import com.example.hierarchy.models.Position;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PositionRepository extends JpaRepository<Position, Long> {
    Optional<Position> findFirstByDepartmentAndRankLessThanOrderByRankDesc(Department department, int rank);
    List<Position> findByDepartmentId(Long departmentId);
}
