package com.taskaura.service;

import com.taskaura.dto.ProjectDTO;
import com.taskaura.entity.Project;
import com.taskaura.entity.Task;
import com.taskaura.entity.User;
import com.taskaura.exception.APIException;
import com.taskaura.exception.ResourceNotFoundException;
import com.taskaura.repository.ProjectRepository;
import com.taskaura.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final AuthUtil authUtil;
    private final ModelMapper modelMapper;

    @Override
    public ProjectDTO createProject(ProjectDTO projectDTO) {
        User currentUser = authUtil.loggedInUser();
        Project project = modelMapper.map(projectDTO, Project.class);
        project.setUser(currentUser);
        Project savedProject = projectRepository.save(project);
        return modelMapper.map(savedProject, ProjectDTO.class);
    }

//    @Override
//    @Transactional
//    public List<ProjectDTO> getUserProjects() {
//        Long userId = authUtil.loggedInUserId();
//        List<Project> projects = projectRepository.findByUserId(userId);
//
//        return projects.stream()
//                .map(this::mapToDTO)
//                .collect(Collectors.toList());
//    }

    @Override
    @Transactional
    public Page<ProjectDTO> getUserProjects(int page, int size, String searchTerm) {
        Long userId = authUtil.loggedInUserId();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Project> projectPage = projectRepository.findByUserIdAndTitleContainingIgnoreCase(userId, searchTerm, pageable);
        return projectPage.map(this::mapToDTO);
    }

    @Override
    @Transactional
    public ProjectDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));

        if (!project.getUser().getId().equals(authUtil.loggedInUserId())) {
            throw new APIException("Unauthorized access to this project");
        }

        return mapToDTO(project);
    }

    private ProjectDTO mapToDTO(Project project) {
        ProjectDTO dto = modelMapper.map(project, ProjectDTO.class);

        List<Task> tasks = project.getTasks();
        if (tasks == null || tasks.isEmpty()) {
            dto.setTaskCount(0);
            dto.setCompletedTaskCount(0);
            dto.setProgressPercentage(0);
            return dto;
        }

        int total = tasks.size();
        int completed = (int) tasks.stream().filter(Task::isCompleted).count();
        int percentage = (int) Math.round(((double) completed / total) * 100);
        dto.setTaskCount(total);
        dto.setCompletedTaskCount(completed);
        dto.setProgressPercentage(percentage);

        return dto;
    }

    @Override
    public void deleteProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", projectId));
        if (!project.getUser().getId().equals(authUtil.loggedInUserId())) {
            throw new APIException("Unauthorized access to delete this project");
        }
        projectRepository.delete(project);
    }

    @Override
    public ProjectDTO updateProject(Long id, ProjectDTO projectDTO) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));

        if (!project.getUser().getId().equals(authUtil.loggedInUserId())) {
            throw new APIException("Unauthorized access to update this project");
        }

        project.setTitle(projectDTO.getTitle());
        project.setDescription(projectDTO.getDescription());

        Project updatedProject = projectRepository.save(project);
        return modelMapper.map(updatedProject, ProjectDTO.class);
    }
}




