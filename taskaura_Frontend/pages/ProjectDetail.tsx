import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useProjectDetail } from "../hooks/useProjectDetail";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Input } from "../components/ui/Input";
import {
  ArrowLeft,
  Trash2,
  Calendar,
  CheckCircle2,
  Circle,
  Plus,
  AlertCircle,
  Pencil,
} from "lucide-react";

export const ProjectDetail: React.FC = () => {
  const { t } = useTranslation();
  const {
    project,
    tasks,
    isLoading,
    projectError,
    tasksError,
    isTaskModalOpen,
    editingTaskId,
    newTask,
    errors,
    isTogglingTask,
    isCreatingTask,
    isUpdatingTask,
    handleOpenCreate,
    handleCloseModal,
    handleEditClick,
    handleInputChange,
    handleSubmit,
    handleToggleTask,
    handleDeleteTask,
    filteredTasks, 
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    searchTerm,
    setSearchTerm,
  } = useProjectDetail();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Error states
  if (projectError || tasksError) {
    return (
      <div className="max-w-6xl mx-auto py-12">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-slate-500 hover:text-primary-600 mb-4 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" /> {t("common.back")}
        </Link>
        <div className="text-center py-20">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {t("common.errorLoading")}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {projectError?.message || tasksError?.message || t("common.error")}
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-6xl mx-auto py-12">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-slate-500 hover:text-primary-600 mb-4 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" /> {t("common.back")}
        </Link>
        <div className="text-center py-20">
          <AlertCircle className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {t("project.notFound")}
          </h2>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const chartData = [
    { name: "Completed", value: project.completedTaskCount, color: "#10b981" },
    {
      name: "Pending",
      value: project.taskCount - project.completedTaskCount,
      color: "#64748b",
    },
  ];

  const hasData = project.taskCount > 0;

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Header Section */}
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-slate-500 hover:text-primary-600 mb-4 transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" /> {t("common.back")}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {project.title}
              </h1>
              <Button
                onClick={handleOpenCreate}
                className="flex items-center gap-2"
              >
                <Plus size={18} /> {t("task.add")}
              </Button>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {project.description}
            </p>

            <div className="bg-white dark:bg-slate-850 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t("project.progress")}
                </span>
                <span className="text-2xl font-bold text-primary-600">
                  {project.progressPercentage}%
                </span>
              </div>
              <ProgressBar progress={project.progressPercentage} size="lg" />
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white dark:bg-slate-850 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              {t("task.status")}
            </h3>
            {hasData ? (
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        borderColor: "#334155",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                      itemStyle={{ color: "#fff" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-40 w-full flex items-center justify-center text-slate-400 flex-col gap-2">
                <AlertCircle size={32} />
                <span className="text-xs">{t("task.noTasks")}</span>
              </div>
            )}
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>{" "}
                {t("task.completed")}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="w-2 h-2 rounded-full bg-slate-500"></div>{" "}
                {t("task.pending")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          {t("task.tasks")}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          {/* Search Input */}
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/3"
          />
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="w-full sm:w-auto p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All status </option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full sm:w-auto p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
          </select>

          {/* Sort Order */}
          <Button
            variant="outline"
            onClick={() =>
              setSortOrder((order) => (order === "asc" ? "desc" : "asc"))
            }
          >
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </Button>
        </div>

        {filteredTasks && filteredTasks.length > 0 ? (
          <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`
                    group flex items-center p-4 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors
                    ${
                      task.completed
                        ? "bg-slate-50/50 dark:bg-slate-900/50"
                        : ""
                    }
                 `}
              >
                {/* Toggle Button */}
                <button
                  onClick={() => handleToggleTask(task)}
                  className={`
                      flex-shrink-0 mr-4 transition-colors 
                      ${
                        task.completed
                          ? "text-emerald-500"
                          : "text-slate-300 hover:text-slate-400"
                      }
                   `}
                  disabled={isTogglingTask}
                >
                  {task.completed ? (
                    <CheckCircle2
                      size={24}
                      className="fill-emerald-500 text-white dark:text-slate-900"
                    />
                  ) : (
                    <Circle size={24} />
                  )}
                </button>

                {/* Task Info */}
                <div className="flex-grow min-w-0">
                  <h4
                    className={`text-base font-medium truncate transition-all ${
                      task.completed
                        ? "text-slate-400 line-through"
                        : "text-slate-900 dark:text-slate-100"
                    }`}
                  >
                    {task.title}
                  </h4>
                  {task.description && (
                    <p
                      className={`text-sm truncate mt-0.5 ${
                        task.completed
                          ? "text-slate-300"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {task.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                  {task.dueDate && (
                    <div
                      className={`flex items-center text-xs ${
                        task.completed ? "text-slate-300" : "text-slate-400"
                      } hidden sm:flex mr-2`}
                    >
                      <Calendar size={14} className="mr-1.5" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  )}

                  <button
                    onClick={() => handleEditClick(task)}
                    className="text-slate-300 hover:text-blue-500 transition-colors p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    title={t("common.edit")}
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-slate-300 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                    title={t("common.delete")}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-850 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">
              {t("task.noTasksFound")}
            </p>
            <Button
              variant="ghost"
              className="mt-2 text-primary-600"
              onClick={handleOpenCreate}
            >
              {t("task.addFirstTask")}
            </Button>
          </div>
        )}
      </div>

      {/* Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-850 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
              {editingTaskId ? t("task.edit") : t("task.add")}
            </h2>

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">
                <div>
                  <Input
                    label={t("task.title")}
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    required
                    autoFocus
                    className={
                      errors.title ? "border-red-500 focus:ring-red-500" : ""
                    }
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                  )}
                </div>
                <div>
                  <Input
                    label={t("task.dueDate")}
                    name="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={handleInputChange}
                    className={
                      errors.dueDate ? "border-red-500 focus:ring-red-500" : ""
                    }
                  />
                  {errors.dueDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.dueDate}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {t("task.description")}
                  </label>
                  <textarea
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    name="description"
                    rows={3}
                    value={newTask.description}
                    onChange={handleInputChange}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCloseModal}
                >
                  {t("common.cancel")}
                </Button>
                <Button
                  type="submit"
                  isLoading={isCreatingTask || isUpdatingTask}
                >
                  {t("common.save")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
