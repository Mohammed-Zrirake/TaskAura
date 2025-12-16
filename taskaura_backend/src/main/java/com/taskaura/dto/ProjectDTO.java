package com.taskaura.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDateTime createdAt;

    private int taskCount;
    private int completedTaskCount;
    private int progressPercentage;
}