
import { useState,React,useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import api from "../lib/axios";
import { Project, Task, TaskCreateRequest } from "../types";
import { taskSchema, TaskSchema } from "../lib/validation";
import { useDebounce } from "./useDebounce";

export const useProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const queryClient = useQueryClient();
  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [newTask, setNewTask] = useState<TaskCreateRequest>({
    title: "",
    description: "",
    dueDate: "",
    projectId: Number(projectId),
  });
   const [filterStatus, setFilterStatus] = useState<
     "all" | "completed" | "pending"
   >("all");
   const [sortBy, setSortBy] = useState<"name" | "date">("date");
   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
   const [searchTerm, setSearchTerm] = useState("");
   const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [errors, setErrors] = useState<
    Partial<Record<keyof TaskSchema, string>>
  >({});


  const {
    data: project,
    isLoading: isProjectLoading,
    error: projectError,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const res = await api.get<Project>(`/projects/${projectId}`);
      return res.data;
    },
    enabled: !!projectId,
  });

  const {
    data: tasks,
    isLoading: isTasksLoading,
    error: tasksError,
  } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: async () => {
      const res = await api.get<Task[]>(`/projects/${projectId}/tasks`);
      return res.data;
    },
    enabled: !!projectId,
  });


  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    queryClient.invalidateQueries({ queryKey: ["project", projectId] });
  };

  const filteredAndSortedTasks = useMemo(() => {
     if (!tasks) return [];

     let processedTasks = [...tasks];

     // 1. Filter by Status
     if (filterStatus === "completed") {
       processedTasks = processedTasks.filter((task) => task.completed);
     } else if (filterStatus === "pending") {
       processedTasks = processedTasks.filter((task) => !task.completed);
     }

     // 2. Filter by Search Term
     if (debouncedSearchTerm) {
       processedTasks = processedTasks.filter((task) =>
         task.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
       );
     }

     // 3. Sort
     processedTasks.sort((a, b) => {
       let compare = 0;
       if (sortBy === "date") {
         // Handle null/empty dates
         const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
         const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
         compare = dateA - dateB;
       } else {
         // sortBy === 'name'
         compare = a.title.localeCompare(b.title);
       }
       return sortOrder === "asc" ? compare : -compare;
     });

     return processedTasks;
   }, [tasks, filterStatus, debouncedSearchTerm, sortBy, sortOrder]); 
  
  const toggleTaskMutation = useMutation({
    mutationFn: async (task: Task) => {
      const updatedTask = { ...task, completed: !task.completed };
      await api.put(`/tasks/${task.id}`, updatedTask);
    },
    onSuccess: refreshData,
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: number) => {
      await api.delete(`/tasks/${taskId}`);
    },
    onSuccess: () => {
      refreshData();
      handleCloseDeleteModal();
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: async (data: TaskCreateRequest) => {
      await api.post(`/projects/${projectId}/tasks`, data);
    },
    onSuccess: () => {
      refreshData();
      handleCloseModal();
    },
  });

  const editTaskMutation = useMutation({
    mutationFn: async (data: TaskCreateRequest) => {
      if (!editingTaskId) return;
      const currentTask = tasks?.find((t) => t.id === editingTaskId);
      const payload = { ...data, completed: currentTask?.completed || false };
      await api.put(`/tasks/${editingTaskId}`, payload);
    },
    onSuccess: () => {
      refreshData();
      handleCloseModal();
    },
  });


  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
    setEditingTaskId(null);
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      projectId: Number(projectId),
    });
    setErrors({});
  };

  const handleOpenCreate = () => {
    setEditingTaskId(null);
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      projectId: Number(projectId),
    });
    setErrors({});
    setIsTaskModalOpen(true);
  };

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setNewTask({
      title: task.title,
      description: task.description || "",
      dueDate: task.dueDate || "",
      projectId: Number(projectId),
    });
    setErrors({});
    setIsTaskModalOpen(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof TaskSchema]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = taskSchema.safeParse(newTask);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof TaskSchema, string>> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof TaskSchema;
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    if (editingTaskId) {
      editTaskMutation.mutate(newTask);
    } else {
      createTaskMutation.mutate(newTask);
    }
  };

  const handleToggleTask = (task: Task) => {
    toggleTaskMutation.mutate(task);
  };

  const handleOpenDeleteTask = (taskId: number) => {
    setTaskToDelete(taskId);
  };

  const handleCloseDeleteModal = () => {
    setTaskToDelete(null);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      deleteTaskMutation.mutate(taskToDelete);
    }
  };

  const handleDeleteTask = (taskId: number) => {
     handleOpenDeleteTask(taskId);
  };



  
  return {
    project,
    tasks,
    isProjectLoading,
    isTasksLoading,
    projectError,
    tasksError,
    isTaskModalOpen,
    editingTaskId,
    newTask,
    errors,
    projectId: projectId ? Number(projectId) : null,

    isLoading: isProjectLoading || isTasksLoading,
    isTogglingTask: toggleTaskMutation.isPending,
    isDeletingTask: deleteTaskMutation.isPending,
    taskToDelete,
    handleOpenDeleteTask,
    handleCloseDeleteModal,
    confirmDeleteTask,
    isCreatingTask: createTaskMutation.isPending,
    isUpdatingTask: editTaskMutation.isPending,

    filteredTasks: filteredAndSortedTasks,
        filterStatus,
        setFilterStatus,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        searchTerm,
        setSearchTerm,

    handleOpenCreate,
    handleCloseModal,
    handleEditClick,
    handleInputChange,
    handleSubmit,
    handleToggleTask,
    handleDeleteTask,
    setIsTaskModalOpen,
  };
};
