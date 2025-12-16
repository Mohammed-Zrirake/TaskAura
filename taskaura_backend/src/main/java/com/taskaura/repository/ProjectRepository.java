package com.taskaura.repository;

import com.taskaura.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

//    List<Project> findByUserId(Long userId);
Page<Project> findByUserIdAndTitleContainingIgnoreCase(Long userId, String title, Pageable pageable);
}