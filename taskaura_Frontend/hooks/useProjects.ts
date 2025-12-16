// hooks/useProjects.ts
import { useState, useEffect,React } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import api from "../lib/axios";
import { Project } from "../types";
import { projectSchema, ProjectSchema } from "../lib/validation";
import { useDebounce } from "./useDebounce";

type ProjectFormData = Pick<ProjectSchema, "title" | "description">;

interface ProjectsResponse {
  content: Project[]; 
  totalElements: number; 
  totalPages: number; 
  number: number;
  size: number;
  first: boolean; 
  last: boolean; 
}

export const useProjects = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProjectFormData, string>>
  >({});
  const [serverError, setServerError] = useState("");


  const [currentPage, setCurrentPage] = useState(0); 
  const [pageSize, setPageSize] = useState(6); 
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); 

  
  const {
    data: projectsResponse,
    isLoading,
    error: fetchError,
    refetch,
  } = useQuery({
    queryKey: ["projects", currentPage, pageSize, debouncedSearchTerm],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        size: pageSize.toString(), 
      });

      if (debouncedSearchTerm.trim()) {
        params.append("search", debouncedSearchTerm.trim());
      }

      const res = await api.get<ProjectsResponse>(
        `/projects?${params.toString()}`
      );
      return res.data;
    },
    keepPreviousData: true, 
  });


  const projects = projectsResponse?.content || [];

 
  useEffect(() => {
    if (projectsResponse) {
    
      setTotalProjects(projectsResponse.totalElements);
      setTotalPages(projectsResponse.totalPages);
    }
  }, [projectsResponse]);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(0);
  }, [debouncedSearchTerm]);

  // Pagination handlers
  const goToPage = (page: number) => {
    // Convert to 0-based for Spring
    const springPage = page - 1;
    if (springPage >= 0 && springPage < totalPages) {
      setCurrentPage(springPage);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0); 
  };

 
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Convert 0-based page to 1-based for UI display
  const getDisplayPage = () => currentPage + 1;

  // Mutations (same as before but updated to work with your backend)
  const createMutation = useMutation({
    mutationFn: async (data: ProjectFormData) =>
      await api.post("/projects", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      handleCloseModal();
    },
    onError: (err: any) =>
      setServerError(err.response?.data?.message || t("common.error")),
  });

  const updateMutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      if (!editingId) return;
      await api.put(`/projects/${editingId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      handleCloseModal();
    },
    onError: (err: any) =>
      setServerError(err.response?.data?.message || t("common.error")),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => await api.delete(`/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setProjectToDelete(null);
    },
  });

  // Handlers (same as before)
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: "", description: "" });
    setErrors({});
    setServerError("");
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({ title: "", description: "" });
    setErrors({});
    setServerError("");
    setIsModalOpen(true);
  };

  const handleEditClick = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description || "",
    });
    setErrors({});
    setServerError("");
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setProjectToDelete(id);
  };

  const handleCancelDelete = () => {
    setProjectToDelete(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name as keyof ProjectFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    // Validation
    const result = projectSchema
      .pick({ title: true, description: true })
      .safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ProjectFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof ProjectFormData;
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    if (editingId) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      deleteMutation.mutate(projectToDelete);
    }
  };

  return {
    // Data
    projects,
    isLoading,
    fetchError,
    projectsResponse,

    // UI State
    isModalOpen,
    projectToDelete,
    editingId,
    formData,
    errors,
    serverError,

    // Pagination state
    currentPage: getDisplayPage(), // Return 1-based for UI
    pageSize,
    totalProjects,
    totalPages,

    // Search state
    searchTerm,
    debouncedSearchTerm,

    // Mutations status
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    // Handlers
    handleOpenCreate,
    handleCloseModal,
    handleEditClick,
    handleDeleteClick,
    handleCancelDelete,
    handleInputChange,
    handleSubmit,
    confirmDelete,

    // Pagination handlers
    goToPage,
    goToNextPage,
    goToPreviousPage,
    handlePageSizeChange,

    // Search handlers
    handleSearch,
    clearSearch,

    // Internal functions for pagination
    getActualPage: () => currentPage, // Returns 0-based page

    // Setters
    setIsModalOpen,
    setProjectToDelete,
    setEditingId,
    setFormData,
  };
};
