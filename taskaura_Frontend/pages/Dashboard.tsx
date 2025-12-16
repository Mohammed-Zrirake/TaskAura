// pages/Dashboard.tsx (Simplified)
import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { useProjects } from "../hooks/useProjects";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { StatsCards } from "../components/dashboard/StatsCards";
import { ProjectsGrid } from "../components/dashboard/ProjectGrid";
import { EmptyState } from "../components/dashboard/EmptyState";
import { CreateProjectModal } from "../components/dashboard/CreateProjectModal";
import { DeleteConfirmationModal } from "../components/dashboard/DeleteConfirmationModal";
import { BackgroundEffects } from "../components/dashboard/BackgroundEffects";
import { LoadingState } from "../components/dashboard/loadingState";
import { ErrorState } from "../components/dashboard/ErrorState";

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const {
    projects,
    isLoading,
    fetchError,
    isModalOpen,
    projectToDelete,
    editingId,
    formData,
    errors,
    serverError,
    isCreating,
    isUpdating,
    isDeleting,

    // Pagination
    currentPage,
    pageSize,
    totalProjects,
    totalPages,

    // Search
    searchTerm,

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
  } = useProjects();

  // Calculate statistics
  const totalTasks =
    projects?.reduce((sum, project) => sum + project.taskCount, 0) || 0;
  const completedTasks =
    projects?.reduce((sum, project) => sum + project.completedTaskCount, 0) ||
    0;
  const overallProgress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const averageProgress =
    projects?.length > 0
      ? Math.round(
          projects.reduce(
            (sum, project) => sum + project.progressPercentage,
            0
          ) / projects.length
        )
      : 0;

  // Loading state
  if (isLoading && currentPage === 1) {
    return <LoadingState />;
  }

  // Error state
  if (fetchError) {
    return <ErrorState onRetry={() => window.location.reload()} />;
  }

  return (
    <div className="relative min-h-screen">
      <BackgroundEffects />

      {/* Main Content */}
      <div className="relative">
        <DashboardHeader
          user={user}
          searchTerm={searchTerm}
          totalProjects={totalProjects}
          onSearch={handleSearch}
          onClearSearch={clearSearch}
          onCreateProject={handleOpenCreate}
        />

        <StatsCards
          totalProjects={totalProjects}
          averageProgress={averageProgress}
          completedTasks={completedTasks}
          totalTasks={totalTasks}
          searchTerm={searchTerm}
        />

        <div className="relative">
          <ProjectsGrid
            projects={projects}
            isLoading={isLoading}
            pageSize={pageSize}
            currentPage={currentPage}
            totalPages={totalPages}
            totalProjects={totalProjects}
            searchTerm={searchTerm}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            onPageChange={goToPage}
            onPageSizeChange={handlePageSizeChange}
          />

          {projects.length === 0 && !isLoading && (
            <EmptyState
              searchTerm={searchTerm}
              onClearSearch={clearSearch}
              onCreateProject={handleOpenCreate}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <CreateProjectModal
        isOpen={isModalOpen}
        editingId={editingId}
        formData={formData}
        errors={errors}
        serverError={serverError}
        isSubmitting={isCreating || isUpdating}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
      />

      <DeleteConfirmationModal
        isOpen={projectToDelete !== null}
        isDeleting={isDeleting}
        onCancel={handleCancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
