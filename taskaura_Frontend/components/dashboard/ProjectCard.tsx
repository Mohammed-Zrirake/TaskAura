
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProgressBar } from "../ui/ProgressBar";
import { Project } from "../../types";
import { FolderKanban, Trash2, Pencil, FileText } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onEditClick: (project: Project) => void;
  onDeleteClick: (id: number) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEditClick,
  onDeleteClick,
}) => {
  const { t } = useTranslation();

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border border-white/40 dark:border-slate-700/50 shadow-lg hover:shadow-2xl hover:border-primary-500/30 dark:hover:border-primary-500/30 transition-all duration-300 hover:scale-[1.02] flex flex-col"
    >
      {/* Project card gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/0 via-primary-500/5 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative flex-grow">
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            <FolderKanban className="text-white h-7 w-7" />
          </div>

          <div className="flex gap-1 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEditClick(project);
              }}
              className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50/80 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 hover:scale-110"
              title="Edit Project"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDeleteClick(project.id);
              }}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50/80 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 hover:scale-110"
              title={t("common.delete")}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>

        {/* Project Description */}
        <div className="mb-6 min-h-[4.5rem]">
          {project.description ? (
            <div className="relative">
              <div className="flex items-start gap-2 mb-1">
                <FileText className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 mt-0.5 flex-shrink-0" />
                <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3">
                  {project.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center h-12">
              <span className="italic text-slate-400 dark:text-slate-500 text-sm">
                No description provided
              </span>
            </div>
          )}
        </div>

        {/* Progress Section */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-center text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">
            <span>Progress</span>
            <span className="font-bold text-primary-600 dark:text-primary-400">
              {project.progressPercentage}%
            </span>
          </div>

          <ProgressBar
            progress={project.progressPercentage}
            size="sm"
            className="mb-4"
          />

          <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <div
                className={`h-2 w-2 rounded-full ${
                  project.completedTaskCount > 0
                    ? "bg-emerald-500"
                    : "bg-slate-300"
                }`}
              ></div>
              <span>
                {t("project.tasks", {
                  completed: project.completedTaskCount,
                  total: project.taskCount,
                })}
              </span>
            </div>
            <span
              className={`font-medium px-2 py-0.5 rounded ${
                project.progressPercentage === 100
                  ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                  : "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
              }`}
            >
              {project.progressPercentage === 100 ? "Complete!" : "In Progress"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
