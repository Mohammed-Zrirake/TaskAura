package com.taskaura.service;

import com.taskaura.dto.TaskDTO;
import com.taskaura.entity.Project;
import com.taskaura.entity.Task;
import com.taskaura.exception.APIException;
import com.taskaura.repository.ProjectRepository;
import com.taskaura.repository.TaskRepository;
import com.taskaura.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import com.taskaura.exception.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final AuthUtil authUtil;
    private final ModelMapper modelMapper;

    @Override
    public TaskDTO createTask(Long projectId, TaskDTO taskDTO) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", projectId));
        if (!project.getUser().getId().equals(authUtil.loggedInUserId())) {
            throw new APIException("Unauthorized access to this resource");
        }
        Task task = modelMapper.map(taskDTO, Task.class);
        task.setProject(project);

        Task savedTask = taskRepository.save(task);
        return modelMapper.map(savedTask, TaskDTO.class);
    }

    @Override
    public List<TaskDTO> getTasksByProjectId(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", projectId));

        if (!project.getUser().getId().equals(authUtil.loggedInUserId())) {
            throw new APIException("Unauthorized access to this resource");
        }
        List<Task> tasks = taskRepository.findByProjectId(projectId);
        return tasks.stream()
                .map(task -> modelMapper.map(task, TaskDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public TaskDTO updateTask(Long taskId, TaskDTO taskDTO) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));
        if (!task.getProject().getUser().getId().equals(authUtil.loggedInUserId())) {
            throw new APIException("Unauthorized access to this resource");
        }
        task.setTitle(taskDTO.getTitle());
        task.setDescription(taskDTO.getDescription());
        task.setDueDate(taskDTO.getDueDate());
        task.setCompleted(taskDTO.isCompleted());
        Task updatedTask = taskRepository.save(task);
        return modelMapper.map(updatedTask, TaskDTO.class);
    }

    @Override
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));

        if (!task.getProject().getUser().getId().equals(authUtil.loggedInUserId())) {
            throw new APIException("Unauthorized access to this resource");
        }

        taskRepository.delete(task);
    }
}