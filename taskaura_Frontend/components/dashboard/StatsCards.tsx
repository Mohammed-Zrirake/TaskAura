
import React from "react";
import { ProgressBar } from "../ui/ProgressBar";
import { FolderKanban, TrendingUp, CheckCircle2, Clock } from "lucide-react";

interface StatsCardsProps {
  totalProjects: number;
  averageProgress: number;
  completedTasks: number;
  totalTasks: number;
  searchTerm?: string;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  totalProjects,
  averageProgress,
  completedTasks,
  totalTasks,
  searchTerm,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {/* Total Projects Card */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-5 border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
            <FolderKanban className="text-white h-5 w-5" />
          </div>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">
            {totalProjects.toLocaleString()}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
          Total Projects
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs">
          {searchTerm ? "Search results" : "All active projects"}
        </p>
      </div>

      {/* Average Progress Card */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-5 border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
            <TrendingUp className="text-white h-5 w-5" />
          </div>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">
            {averageProgress}%
          </span>
        </div>
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
          Avg Progress
        </h3>
        <div className="mt-2">
          <ProgressBar progress={averageProgress} size="xs" />
        </div>
      </div>

      {/* Tasks Completed Card */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-5 border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
            <CheckCircle2 className="text-white h-5 w-5" />
          </div>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">
            {completedTasks.toLocaleString()}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
          Tasks Completed
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs">
          {totalTasks > 0
            ? `${Math.round((completedTasks / totalTasks) * 100)}% of all tasks`
            : "No tasks yet"}
        </p>
      </div>

      {/* Total Tasks Card */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-5 border border-white/20 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
            <Clock className="text-white h-5 w-5" />
          </div>
          <span className="text-2xl font-bold text-slate-900 dark:text-white">
            {totalTasks.toLocaleString()}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
          Total Tasks
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs">
          Across all projects
        </p>
      </div>
    </div>
  );
};
