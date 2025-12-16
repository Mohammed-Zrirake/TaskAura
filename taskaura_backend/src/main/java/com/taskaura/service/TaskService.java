package com.taskaura.service;

import com.taskaura.dto.TaskDTO;
import java.util.List;

public interface TaskService {
    TaskDTO createTask(Long projectId, TaskDTO taskDTO);
    List<TaskDTO> getTasksByProjectId(Long projectId);
    TaskDTO updateTask(Long taskId, TaskDTO taskDTO);
    void deleteTask(Long taskId);
}