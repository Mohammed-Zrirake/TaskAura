package com.taskaura.service;

import com.taskaura.dto.ProjectDTO;
import com.taskaura.entity.Project;
import com.taskaura.entity.User;
import com.taskaura.repository.ProjectRepository;
import com.taskaura.util.AuthUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private AuthUtil authUtil;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private ProjectServiceImpl projectService;

    private User user;
    private Project project;
    private ProjectDTO projectDTO;

    @BeforeEach
    public void setup() {
        user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");

        project = new Project();
        project.setId(100L);
        project.setTitle("Test Project");
        project.setDescription("Description");
        project.setUser(user);

        projectDTO = new ProjectDTO();
        projectDTO.setId(100L);
        projectDTO.setTitle("Test Project");
        projectDTO.setDescription("Description");
    }

    @Test
    public void createProject_ShouldReturnSavedProjectDTO() {
        when(authUtil.loggedInUser()).thenReturn(user);
        when(modelMapper.map(projectDTO, Project.class)).thenReturn(project);
        when(projectRepository.save(any(Project.class))).thenReturn(project);
        when(modelMapper.map(project, ProjectDTO.class)).thenReturn(projectDTO);

        ProjectDTO savedProject = projectService.createProject(projectDTO);

        assertNotNull(savedProject);
        assertEquals("Test Project", savedProject.getTitle());
        verify(projectRepository).save(any(Project.class));
    }

    @Test
    public void getProjectById_ShouldReturnProjectDTO_WhenAuthorized() {
        when(authUtil.loggedInUserId()).thenReturn(1L);
        when(projectRepository.findById(100L)).thenReturn(Optional.of(project));
        when(modelMapper.map(project, ProjectDTO.class)).thenReturn(projectDTO);

        ProjectDTO foundProject = projectService.getProjectById(100L);

        assertNotNull(foundProject);
        assertEquals(100L, foundProject.getId());
    }

    @Test
    public void deleteProject_ShouldCallDelete_WhenAuthorized() {
        when(authUtil.loggedInUserId()).thenReturn(1L);
        when(projectRepository.findById(100L)).thenReturn(Optional.of(project));

        projectService.deleteProject(100L);

        verify(projectRepository).delete(project);
    }
}
