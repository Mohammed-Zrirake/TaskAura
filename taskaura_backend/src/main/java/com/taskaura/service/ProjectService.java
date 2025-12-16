package com.taskaura.service;

import com.taskaura.dto.ProjectDTO;
import org.springframework.data.domain.Page;


public interface ProjectService {
    ProjectDTO createProject(ProjectDTO projectDTO);
    Page<ProjectDTO> getUserProjects(int page, int size, String searchTerm);
    ProjectDTO getProjectById(Long id);
    void deleteProject(Long projectId);
    ProjectDTO updateProject(Long id, ProjectDTO projectDTO);
}