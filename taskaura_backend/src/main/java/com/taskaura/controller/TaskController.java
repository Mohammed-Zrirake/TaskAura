package com.taskaura.controller;

import com.taskaura.dto.TaskDTO;
import com.taskaura.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping("/projects/{projectId}/tasks")
    public ResponseEntity<TaskDTO> createTask(@PathVariable Long projectId,
                                              @Valid @RequestBody TaskDTO taskDTO) {
        return ResponseEntity.ok(taskService.createTask(projectId, taskDTO));
    }
    @GetMapping("/projects/{projectId}/tasks")
    public ResponseEntity<List<TaskDTO>> getTasksByProject(@PathVariable Long projectId) {
        return ResponseEntity.ok(taskService.getTasksByProjectId(projectId));
    }
    @PutMapping("/tasks/{taskId}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long taskId, @Valid @RequestBody TaskDTO taskDTO) {
        return ResponseEntity.ok(taskService.updateTask(taskId, taskDTO));
    }
    @DeleteMapping("/tasks/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.noContent().build();
    }
}