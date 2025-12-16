
import React from "react";
import { Pagination } from "../ui/Pagination";
import { ProjectCard } from "./ProjectCard";
import { Project } from "../../types";
import { Sparkles } from "lucide-react";

interface ProjectsGridProps {
  projects: Project[];
  isLoading: boolean;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalProjects: number;
  searchTerm: string;
  onEditClick: (project: Project) => void;
  onDeleteClick: (id: number) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projects,
  isLoading,
  pageSize,
  currentPage,
  totalPages,
  totalProjects,
  searchTerm,
  onEditClick,
  onDeleteClick,
  onPageChange,
  onPageSizeChange,
}) => {
  // Loading skeletons
  if (isLoading && projects.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(pageSize)].map((_, i) => (
          <div
            key={i}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 animate-pulse"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
              <div className="flex gap-1">
                <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
              </div>
            </div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-3"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mb-6"></div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Header with project count */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {searchTerm ? "Search Results" : "Your Projects"}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            {searchTerm
              ? `Showing results for "${searchTerm}"`
              : projects.length > 0
              ? "Click on any project to view details and tasks"
              : "Create your first project to get started!"}
          </p>
        </div>

        {projects.length > 0 && (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{totalProjects.toLocaleString()} total</span>
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalProjects}
              pageSize={pageSize}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
            />
          )}
        </>
      ) : null}
    </>
  );
};
